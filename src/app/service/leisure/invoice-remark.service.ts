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
  constructor(private pnrService: PnrService) { }

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
    const segmentsinpnr = this.pnrService.getSegmentTatooNumber();
    const segmentsSelected = (this.formGroup.controls.segmentNo.value ? this.formGroup.controls.segmentNo.value.split(",") : '');

    segments = (segmentsinpnr.length === segmentsSelected.length ? '' : segments);

    // Push cryptic commands for the Invoice to Matrix feature. Refer to DE2183.
    if (pax === 1 && !this.hasAirSegmentSelected()) {
      this.remGroup.cryptics.push("inv" + ((segments) ? "/S" + segments : ""));
    }
    if (pax > 1 && !this.hasAirSegmentSelected()) {
      this.remGroup.cryptics.push("invj" + ((passengers) ? "/P" + passengers : "") + ((segments) ? "/S" + segments : ""));
    }
    if (pax === 1 && this.hasAirSegmentSelected()) {
      this.remGroup.cryptics.push("inv/nofare" + ((segments) ? "/S" + segments : ""));
    }
    if (pax > 1 && this.hasAirSegmentSelected()) {
      this.remGroup.cryptics.push("invj/nofare" + ((passengers) ? "/P" + passengers : "") + ((segments) ? "/S" + segments : ""));
    }
  }

  /**
   * Check whether the user selected an Air-type segment.
   * 
   * Return boolan
   */
  public hasAirSegmentSelected(): boolean {
    const segmentsSelected = (this.formGroup.controls.segmentNo.value ? this.formGroup.controls.segmentNo.value.split(",") : '');
    const segments = this.pnrService.getSegmentTatooNumber();
    const airSegments = segments.filter(segment => {
      return segment.segmentType === 'AIR';
    });

    for (let i = 0; i < airSegments.length; i++) {
      for (let j = 0; j < segmentsSelected.length; j++) {
        if (segmentsSelected[j] == airSegments[i].lineNo) {
          return true;
        }
      }

    }

    if (segments.length === segmentsSelected.length) {
      return true;
    }

    return false;
  }
}
