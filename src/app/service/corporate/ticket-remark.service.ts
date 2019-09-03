import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

import { RemarksManagerService } from './remarks-manager.service';
import { RemarkGroup } from '../../models/pnr/remark.group.model';
import { TicketModel } from '../../models/pnr/ticket.model';


@Injectable({
    providedIn: 'root'
})
export class TicketRemarkService {

    DATE_PIPE = new DatePipe('en-US');

    constructor(private remarksManagerSvc: RemarksManagerService) { }

    public writeTicketRemark(ticketRemark: TicketModel) {

        const remGroup = new RemarkGroup();
        const remark = 'TKTL' + this.transformTicketDate(ticketRemark.tktDate) + '/' +
            ticketRemark.oid + '/Q8C1' + this.appendTkLine(ticketRemark.pnrOnHold, ticketRemark.tkLine);

        remGroup.cryptics.push(remark);

        this.writeOnHoldRemark(ticketRemark.pnrOnHold);

        return remGroup;
    }

    private transformTicketDate(tktDate: string): string {
        let transformedDate: string;

        if (tktDate) {
            transformedDate = this.DATE_PIPE.transform(new Date(tktDate), 'ddMMM').toUpperCase();
        } else {
            transformedDate = '';
        }

        return transformedDate;
    }

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

    private writeOnHoldRemark(pnrOnHold: boolean): void {
        if (pnrOnHold) {
            const staticRemarksCondition = new Map<string, string>();
            staticRemarksCondition.set('isOnHold', 'true');

            this.remarksManagerSvc.createPlaceholderValues(null, staticRemarksCondition, null, null, 'ONHOLD:AWAITING APPROVAL');
        }
    }

}


