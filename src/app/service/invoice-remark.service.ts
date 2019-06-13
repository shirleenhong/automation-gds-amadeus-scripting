import { Injectable } from '@angular/core';
import { RemarkGroup } from '../models/pnr/remark.group.model';
import { RemarkModel } from '../models/pnr/remark.model';
import { PnrService } from './pnr.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  formGroup: FormGroup;
  remGroup: RemarkGroup;
  constructor(private pnrService: PnrService) {}

  public getMatrixInvoice(fg: FormGroup) {
    this.remGroup = new RemarkGroup();
    this.remGroup.group = 'Matrix Invoice';
    this.remGroup.remarks = new Array<RemarkModel>();
    this.formGroup = fg;
    if (this.formGroup.get('selection').value === 'itinerary') {
      this.setItineraryOnlyRemarks();
    } else if (this.formGroup.get('selection').value === 'invoice') {
      this.setInvoicePnrRemarks();
    }
    this.remGroup.cryptics.push('RT' + this.pnrService.recordLocator());
    return this.remGroup;
  }

  public setItineraryOnlyRemarks() {
    this.remGroup.cryptics.push('BT');
  }

  public setInvoicePnrRemarks() {
    const passengers = this.formGroup.controls.passengerNo.value;
    const segments = this.formGroup.controls.segmentNo.value;
    const pax = this.pnrService.getPassengers().length;
    if (this.pnrService.checkTst()) {
      if (pax === 1) {
        this.remGroup.cryptics.push('inv/nofare');
      }
      if (pax > 1) {
        this.remGroup.cryptics.push('invj/nofare');
      }
    } else {
      if (passengers === '' && segments === '' && pax === 1) {
        this.remGroup.cryptics.push('inv');
      }
      if (passengers === '' && segments === '' && pax > 1) {
        this.remGroup.cryptics.push('invj');
      }
      if (passengers === '' && segments !== '' && pax === 1) {
        this.remGroup.cryptics.push('inv/s' + segments);
      }
      if (passengers === '' && segments !== '' && pax > 1) {
        this.remGroup.cryptics.push('invj/s' + segments);
      }
      if (passengers !== '' && segments === '' && pax > 1) {
        this.remGroup.cryptics.push('invj/p' + passengers);
      }
      if (passengers !== '' && segments !== '' && pax > 1) {
        this.remGroup.cryptics.push('invj/p' + passengers + '/s' + segments);
      }
    }
  }
}
