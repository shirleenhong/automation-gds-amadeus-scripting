import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

import { RemarksManagerService } from './remarks-manager.service';
import { PnrService } from '../pnr.service'
import { RemarkGroup } from '../../models/pnr/remark.group.model';
import { TicketModel } from '../../models/pnr/ticket.model';

declare var smartScriptSession: any;

@Injectable({
    providedIn: 'root'
})
export class TicketRemarkService {

    DATE_PIPE = new DatePipe('en-US');
    ONHOLD_KEYWORD = 'ONHOLD:AWAITING APPROVAL';

    constructor(private remarksManagerSvc: RemarksManagerService,
        private pnrService: PnrService) { }

    /**
     * Method that cleansup existing TK remark, then invokes another method to write new.
     * @returns RemarkGroup - the remark group for the new TKTL remark
     */
    public submitTicketRemark(ticketRemark: TicketModel): RemarkGroup {
        this.cleanupTicketRemark();

        return this.writeTicketRemark(ticketRemark);
    }

    /**
     * Cleans up existing TK remark (as well as RIR if on hold).
     */
    private cleanupTicketRemark(): void {
        const linesToDelete: Array<number> = new Array();

        const existingTkLineNum = this.pnrService.getTkLineNumber();

        if (existingTkLineNum >= 0) {
            linesToDelete.push(existingTkLineNum);

            const existingRirLineNum = this.pnrService.getRIRLineNumber(this.ONHOLD_KEYWORD);
            if (existingRirLineNum && existingRirLineNum >= 0) {
                linesToDelete.push(existingRirLineNum);
            }
        }

        if (linesToDelete.length > 0) {
            smartScriptSession.send('XE' + linesToDelete.join(','));
        }
    }

    /**
     * Writes the ticketing remark, as well as onhold remark (if on hold).
     * @param ticketRemark The ticket data from screen.
     * @returns RemarkGroup - the remark group for the new TKTL remark
     */
    private writeTicketRemark(ticketRemark: TicketModel): RemarkGroup {

        const remGroup = new RemarkGroup();
        const remark = 'TKTL' + this.transformTicketDate(ticketRemark.tktDate) + '/' +
            ticketRemark.oid + '/Q8C1' + this.appendTkLine(ticketRemark.pnrOnHold, ticketRemark.tkLine);

        remGroup.cryptics.push(remark);

        this.writeOnHoldRemark(ticketRemark.pnrOnHold);

        return remGroup;
    }

    /**
     * Reformats the given date on screen to ddMMM.
     * @param tktDate The date from screen.
     */
    private transformTicketDate(tktDate: string): string {
        let transformedDate: string;

        if (tktDate) {
            transformedDate = this.DATE_PIPE.transform(new Date(tktDate), 'ddMMM').toUpperCase();
        } else {
            transformedDate = '';
        }

        return transformedDate;
    }

    /**
     * Appends the respective suffix for TK line.
     */
    private appendTkLine(pnrOnHold: boolean, tkLine: string): string {
        let tkSuffix = '';

        if (pnrOnHold) {
            tkSuffix = '-ONHOLD';
        } else if (tkLine) {
            if ('ISS' !== tkLine && 'INV' !== tkLine) {
                tkSuffix = '-' + tkLine;
            }
        }

        return tkSuffix;
    }

    /**
     * Creates a placeholder value in remarks manager service (if on hold).
     * @param pnrOnHold 
     */
    private writeOnHoldRemark(pnrOnHold: boolean): void {
        if (pnrOnHold) {
            const staticRemarksCondition = new Map<string, string>();
            staticRemarksCondition.set('isOnHold', 'true');

            this.remarksManagerSvc.createPlaceholderValues(null, staticRemarksCondition, null, null, 'ONHOLD:AWAITING APPROVAL');
        }
    }

}


