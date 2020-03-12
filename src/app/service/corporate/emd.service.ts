import { Injectable } from '@angular/core';
import { EmdComponent } from 'src/app/corporate/emd/emd.component';
import { RemarkGroup } from 'src/app/models/pnr/remark.group.model';
import { RemarkModel } from 'src/app/models/pnr/remark.model';
import { RemarkHelper } from 'src/app/helper/remark-helper';
import { AmadeusQueueService } from '../amadeus-queue.service';
import { QueuePlaceModel } from 'src/app/models/pnr/queue-place.model';

@Injectable({
  providedIn: 'root'
})
export class EmdService {

  constructor(private remarkHelper: RemarkHelper, private queService: AmadeusQueueService) { }

  writeEmdRemarks(emdComponent: EmdComponent) {
    const emdList = emdComponent.emdList;
    const rmGroup = new RemarkGroup();
    rmGroup.group = 'Routing';
    rmGroup.remarks = new Array<RemarkModel>();
    rmGroup.cryptics = new Array<string>();
    rmGroup.deleteRemarkByIds = new Array<string>();

    emdList.forEach(emdRemarks => {
      rmGroup.remarks.push(this.remarkHelper.getRemark('*TICKET**' + emdRemarks.emdType + ' CHARGES *', 'RI', 'R'));
      rmGroup.remarks.push(this.remarkHelper.getRemark('*TICKET**' + emdRemarks.passengerName +
        ' ' + emdRemarks.ticketNumber + ' ' + emdRemarks.carrierCode + ' *', 'RI', 'R'));
      rmGroup.remarks.push(this.remarkHelper.getRemark('*TICKET**BASE: ' + emdRemarks.currency +
        ' ' + emdRemarks.baseAmount + ' *', 'RI', 'R'));
      rmGroup.remarks.push(this.remarkHelper.getRemark('*TICKET**OTHER TAXES: ' + emdRemarks.otherTaxes + ' *', 'RI', 'R'));
      rmGroup.remarks.push(this.remarkHelper.getRemark('*TICKET**V.A.T/HST/GST: ' + emdRemarks.taxes + ' *', 'RI', 'R'));
      rmGroup.remarks.push(this.remarkHelper.getRemark('*TICKET**TOTAL CHARGE: ' +
        emdRemarks.totalCurrency + ' ' + emdRemarks.totalCharge + ' *', 'RI', 'R'));
      rmGroup.remarks.push(this.remarkHelper.getRemark('*TICKET**FORM OF PAYMENT: ' + emdRemarks.fop + ' *', 'RI', 'R'));
      rmGroup.remarks.push(this.remarkHelper.getRemark('*TICKET**INVOICE NUMBER-' + emdRemarks.invoiceNumber + ' *', 'RI', 'R'));
      rmGroup.remarks.push(this.remarkHelper.getRemark('*TICKET**PLEASE NOTE TOTAL AMOUNT BELOW *', 'RI', 'R'));
      rmGroup.remarks.push(this.remarkHelper.getRemark('*TICKET**WILL NOT REFLECT THIS CHARGE *', 'RI', 'R'));
    });

    this.queService.addQueueCollection(new QueuePlaceModel('PARWL2877', 63, 0));
    return rmGroup;
  }
}
