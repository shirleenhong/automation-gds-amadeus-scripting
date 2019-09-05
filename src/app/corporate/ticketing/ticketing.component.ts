import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StaticValuesService } from '../../service/static-values.services';
import { PnrService } from '../../service/pnr.service';
import { SelectItem } from 'src/app/models/select-item.model';
import { TicketModel } from 'src/app/models/pnr/ticket.model';

@Component({
    selector: 'app-ticketing',
    templateUrl: './ticketing.component.html',
    styleUrls: ['./ticketing.component.scss']
})
export class TicketingComponent implements OnInit {

    oidDisplay: string;
    isOnHoldChecked: boolean = false;
    ticketForm: FormGroup;
    tkList: Array<SelectItem> = null;

    constructor(private staticValues: StaticValuesService, private pnrService: PnrService) {
        this.ticketForm = new FormGroup({
            officeId: new FormControl('', [Validators.required]),
            ticketDate: new FormControl('', [Validators.required]),
            pnrOnHold: new FormControl('', []),
            tk: new FormControl('', [Validators.required])
        });

    }

    ngOnInit() {
        this.loadOid();
        this.loadTKList();
        this.checkSegments();
    }

    private loadOid(): void {
        const extractedOid = this.extractOidFromBookRemark();
        this.ticketForm.get('officeId').setValue(extractedOid);
        this.oidDisplay = extractedOid;
    }

    private extractOidFromBookRemark(): string {
        // const remarks = this.pnrService.getRemarksFromGDSByRegex(/BOOK-/g);
        const BOOK_REMARK_PREFIX = 'BOOK-';
        const TKT_PREFIX = 'TKT-';

        const remarks = this.pnrService.getRemarkText(BOOK_REMARK_PREFIX);
        let oid = null;

        const remarkSplitted: Array<string> = remarks.split('/');
        for (let i = 0; i < remarkSplitted.length; i++) {
            let ctrRemarkSplit = remarkSplitted[i];
            if (ctrRemarkSplit.match(TKT_PREFIX)) {
                oid = ctrRemarkSplit.replace(TKT_PREFIX, '');
                break;
            }
        }

        return oid;
    }

    private loadTKList(): void {
        this.tkList = this.staticValues.getTKList();
    }

    private checkSegments(): void {
        this.presetSegmentFee();
        this.presetSegmentCancelled();
    }

    private presetSegmentFee() {
        const segmentDetails = this.pnrService.getSegmentTatooNumber();
        segmentDetails.forEach((segments) => {
            let segmentText = segments.freetext;
            let hasSegmentMatch = segmentText.includes('TYP-CWT/FEE ONLY');

            if (hasSegmentMatch) {
                this.updateTkDropdown('FEE');
            }
        });
    }

    private presetSegmentCancelled() {
        const misIndex = this.pnrService.getmisCancel();
        const hasSegmentMatch = misIndex > 0;

        if (hasSegmentMatch) {
            this.updateTkDropdown('CXL');
        }
    }

    private updateTkDropdown(newValue: string) {
        this.ticketForm.get('tk').setValue(newValue);
    }

    public getTicketingDetails(): TicketModel {
        const ticketRemark = new TicketModel();
        ticketRemark.oid = this.ticketForm.get('officeId').value;
        ticketRemark.tktDate = this.ticketForm.get('ticketDate').value;
        ticketRemark.pnrOnHold = this.ticketForm.get('pnrOnHold').value;
        ticketRemark.tkLine = this.ticketForm.get('tk').value;

        return ticketRemark;
    }

    public onChangePnrOnHold(): void {
        this.isOnHoldChecked = this.ticketForm.get('pnrOnHold').value;

        if (this.isOnHoldChecked) {
            this.updateTkDropdown('');
        }
    }
}
