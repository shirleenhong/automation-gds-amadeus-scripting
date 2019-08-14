import { Injectable } from '@angular/core';
import { RemarkGroup } from '../../models/pnr/remark.group.model';
import { RemarkModel } from '../../models/pnr/remark.model';
import { PnrService } from '../pnr.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class InvoiceRemarkService {
  formGroup: FormGroup;
  remGroup: RemarkGroup;
  constructor(private pnrService: PnrService) {}

  public GetMatrixInvoice(fg: FormGroup) {
    this.remGroup = new RemarkGroup();
    this.remGroup.group = 'Matrix Invoice';
    this.remGroup.remarks = new Array<RemarkModel>();
    this.formGroup = fg;
    if (this.formGroup.get('selection').value === 'itinerary') {
      this.setItineraryOnlyRemarks();
    } else if (this.formGroup.get('selection').value === 'invoice') {
      this.setInvoicePNRRemarks();
    }
    this.remGroup.cryptics.push('RT' + this.pnrService.recordLocator());
    return this.remGroup;
  }

  public setItineraryOnlyRemarks() {
    this.remGroup.cryptics.push('BT');
  }

  public setInvoicePNRRemarks() {
    const passengers = this.formGroup.controls.passengerNo.value;
    const segments = this.formGroup.controls.segmentNo.value;
    const pax = this.pnrService.getPassengers().length;
    const airSegments = this.pnrService.getSegmentTatooNumber()
      .filter(segment => {
        return segment.segmentType === 'AIR';
      });
    const nonAirSegments = this.pnrService.getSegmentTatooNumber()
    .filter(segment => {
      return segment.segmentType != 'AIR';
    });

    // Push cryptic commands for the Invoice to Matrix feature. Refer to DE2183.
    if (pax === 1 && nonAirSegments.length && !airSegments.length) {
      this.remGroup.cryptics.push("inv");
    }
    if (pax === 1 && airSegments.length) {
      this.remGroup.cryptics.push("inv/nofare");
    }
    if (pax > 1 && nonAirSegments.length && !airSegments.length) {
      this.remGroup.cryptics.push("invj" + ((passengers) ? "/P" + passengers : "") + ((segments) ? "/S" + segments : ""));
    }
    if (pax > 1 && airSegments.length) {
      this.remGroup.cryptics.push("invj/nofare" + ((passengers) ? "/P" + passengers : "") + ((segments) ? "/S" + segments : ""));
    }
  }
}
