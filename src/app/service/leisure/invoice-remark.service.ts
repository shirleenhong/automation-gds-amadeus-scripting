import { Injectable } from '@angular/core';
import { RemarkGroup } from '../../models/pnr/remark.group.model';
import { RemarkModel } from '../../models/pnr/remark.model';
import { PnrService } from '../pnr.service';
import { FormGroup } from '@angular/forms';


declare var smartScriptSession: any;

@Injectable({
  providedIn: 'root'
})
export class InvoiceRemarkService {
  formGroup: FormGroup;
  remGroup: RemarkGroup;

  constructor(private pnrService: PnrService) { }

  public async GetMatrixInvoice(fg: FormGroup) {
    this.remGroup = new RemarkGroup();
    this.remGroup.group = 'Matrix Invoice';
    this.remGroup.remarks = new Array<RemarkModel>();
    this.formGroup = fg;
    let invSent = true;
    await this.setInvoicePNRRemarks(this.formGroup.get('selection').value).then(
      async (x) => {
        invSent = x;
      }
    );

    this.remGroup.cryptics.push('RT' + this.pnrService.recordLocator());
    return { 'remgroup': this.remGroup, 'invSent': invSent };
  }

  public setItineraryOnlyRemarks() {
    this.remGroup.cryptics.push('BT');
  }

  async getInvoiceResponse(command: string) {
    let value = '';
    await smartScriptSession.send(command).then((res) => {
      value = res.Response;
    });
    return value;
  }

  public async setInvoicePNRRemarks(selection: string) {
    let invoiceCryptic = '';
    let invoicesent = true;

    if (selection === 'itinerary') {
      invoiceCryptic = 'BT';
    } else {
      const passengers = this.formGroup.controls.passengerNo.value;
      let segments = this.formGroup.controls.segmentNo.value;
      const pax = this.pnrService.getPassengers().length;
      const segmentsinpnr = this.pnrService.getSegmentTatooNumber();
      const segmentsSelected = (this.formGroup.controls.segmentNo.value ? this.formGroup.controls.segmentNo.value.split(",") : '');

      segments = (segmentsinpnr.length === segmentsSelected.length ? '' : segments);

      // Push cryptic commands for the Invoice to Matrix feature. Refer to DE2183.
      if (pax === 1 && !this.hasAirSegmentSelected()) {
        invoiceCryptic = 'inv' + ((segments) ? '/S' + segments : '');
      }
      if (pax > 1 && !this.hasAirSegmentSelected()) {
        invoiceCryptic = 'invj' + ((passengers) ? '/P' + passengers : '') + ((segments) ? '/S' + segments : '');
      }
      if (pax === 1 && this.hasAirSegmentSelected()) {
        invoiceCryptic = 'inv/nofare' + ((segments) ? '/S' + segments : '');
      }
      if (pax > 1 && this.hasAirSegmentSelected()) {
        invoiceCryptic = 'invj/nofare' + ((passengers) ? '/P' + passengers : '') + ((segments) ? '/S' + segments : '');
      }
    }

    const invresponse = await this.getInvoiceResponse(invoiceCryptic);
    if (invresponse.indexOf('OK') === -1 || invresponse.indexOf('SENT') === -1) {
      await this.getInvoiceResponse(invoiceCryptic);
      invoicesent = false;
    }
    return invoicesent;
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
    return false;
  }
}
