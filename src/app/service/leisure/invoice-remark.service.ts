import { Injectable } from '@angular/core';
import { RemarkGroup } from '../../models/pnr/remark.group.model';
import { RemarkModel } from '../../models/pnr/remark.model';
import { PnrService } from '../pnr.service';
import { FormGroup, FormArray } from '@angular/forms';
import { RemarkHelper } from 'src/app/helper/remark-helper';
import { ResendInvoiceComponent } from 'src/app/corporate/send-invoice-itinerary/resend-invoice/resend-invoice.component';
import { AmadeusQueueService } from '../amadeus-queue.service';
import { QueuePlaceModel } from 'src/app/models/pnr/queue-place.model';

declare var smartScriptSession: any;

@Injectable({
  providedIn: 'root'
})
export class InvoiceRemarkService {
  formGroup: FormGroup;
  remGroup: RemarkGroup;

  constructor(private pnrService: PnrService, private remarkHelper: RemarkHelper, private queService: AmadeusQueueService) { }

  public async GetMatrixInvoice(fg: FormGroup) {
    this.remGroup = new RemarkGroup();
    this.remGroup.group = 'Matrix Invoice';
    this.remGroup.remarks = new Array<RemarkModel>();
    this.formGroup = fg;
    let invSent = true;
    await this.setInvoicePNRRemarks(this.formGroup.get('selection').value).then(async (x) => {
      invSent = x;
    });

    this.remGroup.cryptics.push('RT' + this.pnrService.recordLocator());
    return { remgroup: this.remGroup, invSent };
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
      const segmentsinpnr = this.pnrService.getSegmentList();
      const segmentsSelected = this.formGroup.controls.segmentNo.value ? this.formGroup.controls.segmentNo.value.split(',') : '';

      segments = segmentsinpnr.length === segmentsSelected.length ? '' : segments;

      // Push cryptic commands for the Invoice to Matrix feature. Refer to DE2183.
      if (pax === 1 && !this.hasAirSegmentSelected()) {
        invoiceCryptic = 'inv' + (segments ? '/S' + segments : '');
      }
      if (pax > 1 && !this.hasAirSegmentSelected()) {
        invoiceCryptic = 'invj' + (passengers ? '/P' + passengers : '') + (segments ? '/S' + segments : '');
      }
      if (pax === 1 && this.hasAirSegmentSelected()) {
        invoiceCryptic = 'inv/nofare' + (segments ? '/S' + segments : '');
      }
      if (pax > 1 && this.hasAirSegmentSelected()) {
        invoiceCryptic = 'invj/nofare' + (passengers ? '/P' + passengers : '') + (segments ? '/S' + segments : '');
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
    const segmentsSelected = this.formGroup.controls.segmentNo.value ? this.formGroup.controls.segmentNo.value.split(',') : '';
    const segments = this.pnrService.getSegmentList();
    const airSegments = segments.filter((segment) => {
      return segment.segmentType === 'AIR';
    });

    for (let i = 0; i < airSegments.length; i++) {
      for (let j = 0; j < segmentsSelected.length; j++) {
        if (segmentsSelected[j] === airSegments[i].lineNo) {
          return true;
        }
      }
    }
    return false;
  }

  public getResendInvoice(comp: ResendInvoiceComponent) {
    const frmGroup = comp.invoiceFormGroup;
    const remGroup = new RemarkGroup();
    remGroup.group = 'Resend Invoice';
    remGroup.remarks = new Array<RemarkModel>();
    remGroup.deleteRemarkByIds = [];
    this.pnrService.getRemarkLineNumbers('CONF*SEND TO MAIL', 'RM').forEach((d) => remGroup.deleteRemarkByIds.push(d));

    /// ---> addEmailRemarks
    const arr = frmGroup.get('emailAddresses') as FormArray;
    for (const c of arr.controls) {
      const email = c.get('emailAddress').value;
      if (email) {
        remGroup.remarks.push(this.remarkHelper.createRemark('CONF*SEND TO MAIL ' + email, 'RM', 'Z'));
      }
    }

    // --->  getDeletedInvoiceLines
    const selectedInvoices = comp.selectedElementsUI.selectedInvoice;
    if (selectedInvoices !== 'All') {
      //   return deletedInvoices;
      // } else {
      for (const invoice of comp.invoiceList) {
        if (invoice.lineNo !== 'All' && !invoice.isChecked) {
          remGroup.deleteRemarkByIds.push(invoice.lineNo);
        }
      }
    }

    // --->  addETicketRemarks
    const selectedETickets = comp.selectedElementsUI.selectedETickets;
    if (selectedETickets === 'All') {
      for (const eTicket of comp.eTicketsList) {
        if (eTicket.lineNo !== 'All' && eTicket.lineNo !== 'None') {
          remGroup.remarks.push(this.remarkHelper.createRemark('SPCL-TKT-' + eTicket.freeText, 'RM', 'Z'));
        }
      }
    } else if (selectedETickets === 'None') {
      remGroup.remarks.push(this.remarkHelper.createRemark('SPCL-TKT0', 'RM', 'Z'));
    } else {
      const splitSelectedVals = selectedETickets.split(',');
      for (const selectedEle of splitSelectedVals) {
        const ticketNum = this.getTicketNum(selectedEle, comp.eTicketsList);
        if (ticketNum !== '') {
          remGroup.remarks.push(this.remarkHelper.createRemark('SPCL-TKT-' + ticketNum, 'RM', 'Z'));
        }
      }
    }
    // --- > addFeeLinesRemarks
    const selectedFeeLines = comp.selectedElementsUI.selectedFeeLines.split(',');
    for (const line of selectedFeeLines) {
      for (const rmk of comp.feeRemarks) {
        let segAssociations = [];
        if (rmk.associations) {
          segAssociations = this.getSegmentAssociations(rmk.associations);
        }
        if (line === rmk.ticketline && rmk.remarkText.indexOf('FEE/-') > -1) {
          remGroup.remarks.push(this.remarkHelper.createRemark(rmk.remarkText, 'RM', '*', segAssociations));
        } else if (line === rmk.ticketline && rmk.remarkText.indexOf('SFC/-') > -1) {
          remGroup.remarks.push(this.remarkHelper.createRemark(rmk.remarkText, 'RM', '*', segAssociations));
        }
      }
    }
    // ---> NonBspRemarks
    const selectedNonBspLines = comp.selectedElementsUI.selectedNonBspLines.split(',');
    for (const line of selectedNonBspLines) {
      for (const rmk of comp.nonBspRemarks) {
        if (line === rmk.nonBspLineNum) {
          let segAssociations = [];
          if (rmk.associations) {
            segAssociations = this.getSegmentAssociations(rmk.associations);
          }
          remGroup.remarks.push(this.remarkHelper.createRemark(rmk.nonBspRmk.replace('RM*', ''), 'RM', '*', segAssociations));
        }
      }
    }

    this.deleteRmzRemarks(remGroup);
    this.queService.addQueueCollection(new QueuePlaceModel('PARWL2877', 62));
    return remGroup;
  }

  deleteRmzRemarks(rmGroup: RemarkGroup) {
    const rirRemark = 'SPCL-TKT(?<tkt>(.*))';
    const regx = new RegExp(rirRemark);
    const rems = this.pnrService.getRemarksFromGDSByRegex(regx, 'RM');
    if (rems.length > 0) {
      rems.forEach((r) => {
        rmGroup.deleteRemarkByIds.push(r.lineNo);
      });
    }
  }

  getSegmentAssociations(associations) {
    const segAssociations = [];
    for (const assc of associations) {
      if (assc.segmentType === 'ST') {
        segAssociations.push(assc.tatooNumber);
      }
    }
    return segAssociations;
  }

  getTicketNum(selectedEle, eTicketsList) {
    let ticketNum = '';
    for (const eTicket of eTicketsList) {
      if (eTicket.lineNo.toString() === selectedEle) {
        ticketNum = eTicket.freeText;
      }
    }
    return ticketNum;
  }
}
