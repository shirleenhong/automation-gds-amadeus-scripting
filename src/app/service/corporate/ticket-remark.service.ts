import { Injectable } from '@angular/core';
import { RemarkGroup } from '../../models/pnr/remark.group.model';
import { RemarkModel } from '../../models/pnr/remark.model';
import { TicketModel } from '../../models/pnr/ticket.model';


@Injectable({
    providedIn: 'root'
})
export class TicketRemarkService {

    constructor() { }

    writeTicketRemark(ticketRemark: TicketModel) {

        const remGroup = new RemarkGroup();
        remGroup.group = 'Ticketing Remark';
        remGroup.remarks = new Array<RemarkModel>();

        // FIXME: Use DatePipe for ticketRemark.tktDate to make it DDMMM format
        // FIXME: The ticketRemark.tkLine should have logic depending on the selected on the dropdown
        const remark = 'TKTL' + ticketRemark.tktDate + '/' + ticketRemark.oid + '/Q8C1-' + ticketRemark.tkLine;
        remGroup.remarks.push(this.getRemarksModel(remark, '*'));

        return remGroup;

    }

    public getRemarksModel(remText, cat) {

        const rem = new RemarkModel();
        rem.category = cat;
        rem.remarkText = remText;

        return rem;
    }

}


