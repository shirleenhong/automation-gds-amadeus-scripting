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
    }

    loadOid() {
        const extractedOid = this.extractOidFromBookRemark();
        this.ticketForm.get('officeId').setValue(extractedOid);
    }

    extractOidFromBookRemark() {
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

    loadTKList() {
        this.tkList = this.staticValues.getTKList();
    }

    getTicketingDetails(): TicketModel {
        const ticketRemark = new TicketModel();
        ticketRemark.oid = this.ticketForm.get('officeId').value;
        ticketRemark.tktDate = this.ticketForm.get('ticketDate').value;
        ticketRemark.tkLine = this.ticketForm.get('tk').value;

        return ticketRemark;
    }
}
