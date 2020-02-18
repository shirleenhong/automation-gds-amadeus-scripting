import { Injectable } from '@angular/core';
import { RemarksManagerService } from './remarks-manager.service';
import { RemarkGroup } from 'src/app/models/pnr/remark.group.model';
import { FormGroup, FormArray } from '@angular/forms';
import { formatDate } from '@angular/common';
import { RemarkModel } from 'src/app/models/pnr/remark.model';
import { RemarkHelper } from 'src/app/helper/remark-helper';
import { AmadeusQueueService } from '../amadeus-queue.service';
import { QueuePlaceModel } from 'src/app/models/pnr/queue-place.model';
import { PnrService } from '../pnr.service';

@Injectable({
  providedIn: 'root'
})
export class CorpCancelRemarkService {
  constructor(
    private remarksManager: RemarksManagerService,
    private remarkHelper: RemarkHelper,
    private queService: AmadeusQueueService,
    private pnrService: PnrService
  ) {}

  WriteNonBspTicketCredit(group: FormGroup) {
    const curDate = formatDate(new Date(), 'ddMMM', 'en-US');
    const remarkList = new Array<RemarkModel>();
    if (group.get('hasU14').value) {
      if (group.get('isReCredit').value === 'N') {
        this.createRemarks(['VendorName', 'BackOfficeAgentIdentifier'], [group.get('vendor').value, group.get('officeId').value]);
        this.createRemarks(
          ['CurrentDate', 'CounselorLastName', 'CounselorFirstName'],
          [curDate, group.get('lastName').value, group.get('firstName').value]
        );

        this.createRemarks(
          ['PartialFull', 'CurrentDate'],
          [group.get('partialFull').value === 'full' ? 'FULL' : 'PART', curDate],
          'RECREDIT'
        );

        if (group.get('partialFull').value !== 'full') {
          this.createRemarks(
            ['BaseAmt', 'Gst', 'Tax'],
            [group.get('baseAmount').value, group.get('gst').value, group.get('tax').value],
            'RECREDIT'
          );
          this.createRemarks(['Commission'], [group.get('commission').value]);
          if (group.get('freeFlow1').value) {
            remarkList.push(this.remarkHelper.createRemark('.  ' + group.get('freeFlow1').value, 'RM', 'X'));
          }
          if (group.get('freeFlow2').value) {
            remarkList.push(this.remarkHelper.createRemark('.  ' + group.get('freeFlow2').value, 'RM', 'X'));
          }
        }
        this.queueNonBspTicket();
        return { remarks: remarkList, commands: [] };
      }
    } else {
      this.createRemarks(['CurrentDate', 'DocTicketNum'], [curDate, group.get('ticketNum').value]);
    }
    this.queueNonBspTicket();
    return null;
  }

  buildVoidRemarks(cancel: any) {
    const dateToday = formatDate(new Date(), 'ddMMM', 'en-US');
    let remarkSet = new Map<string, string>();

    const rmGroup = new RemarkGroup();
    rmGroup.group = 'Void';
    rmGroup.remarks = new Array<RemarkModel>();

    if (cancel.value.followUpOption === 'Void BSP') {
      remarkSet = new Map<string, string>();
      remarkSet.set('VoidDate', dateToday);
      if (cancel.value.authorization) {
        remarkSet.set('Auth', cancel.value.authorization);
        this.remarksManager.createPlaceholderValues(remarkSet, null, null);
      }

      let ctr = 0;
      for (const tickets of cancel.value.ticketVoidList) {
        if (tickets) {
          let tkt: string;
          remarkSet = new Map<string, string>();
          tkt = cancel.value.ticketList[ctr].freeFlowText.split('/')[0].split(' ')[1];
          remarkSet.set('VTkt', tkt);
          this.remarksManager.createPlaceholderValues(remarkSet, null, null);
        }
        ctr = ctr + 1;
      }

      remarkSet = new Map<string, string>();
      remarkSet.set('VoidDate', dateToday);
      if (cancel.value.cFirstInitial.trim !== '' && cancel.value.cLastName.trim !== '') {
        remarkSet.set('CounselorFirstName', cancel.value.cFirstInitial);
        remarkSet.set('CounselorLastName', cancel.value.cLastName);
        this.remarksManager.createPlaceholderValues(remarkSet, null, null);
      }
      remarkSet = new Map<string, string>();

      if (cancel.value.vRsnOption) {
        remarkSet.set('VRsn', cancel.value.vRsnOption);
      }
      this.remarksManager.createPlaceholderValues(remarkSet, null, null);
    } else if (cancel.value.followUpOption === 'Void Non BSP') {
      remarkSet = new Map<string, string>();
      remarkSet.set('RevType', cancel.value.reverseItem);
      this.remarksManager.createPlaceholderValues(remarkSet, null, null);
      remarkSet = new Map<string, string>();
      remarkSet.set('VoidDate', dateToday);
      if (cancel.value.cFirstInitial.trim !== '' && cancel.value.cLastName.trim !== '') {
        remarkSet.set('CounselorFirstName', cancel.value.cFirstInitial);
        remarkSet.set('CounselorLastName', cancel.value.cLastName);
        this.remarksManager.createPlaceholderValues(remarkSet, null, null);
      }
      if (cancel.value.otherDetails1.trim !== '') {
        rmGroup.remarks.push(this.getRemarksModel(cancel.value.otherDetails1, 'RM', 'X'));
      }
      if (cancel.value.otherDetails2.trim !== '') {
        rmGroup.remarks.push(this.getRemarksModel(cancel.value.otherDetails2, 'RM', 'X'));
      }
    }
    let OID = '';
    if (this.pnrService.pnrObj.tkElements.length > 0) {
      OID = this.pnrService
        .getRemarkText('BOOK-')
        .split('/')[1]
        .split('-')[1];
      if (OID === '') {
        OID = this.pnrService.pnrObj.tkElements[0].ticketingOfficeID;
      }
    }

    this.queService.addQueueCollection(new QueuePlaceModel(OID, 60, 1));
    this.queService.addQueueCollection(new QueuePlaceModel('YTOWL2106', 41, 85));
    return rmGroup;
  }

  public getRemarksModel(remText, type, cat, segment?: string) {
    let segmentrelate = [];
    if (segment) {
      segmentrelate = segment.split(',');
    }
    const rem = new RemarkModel();
    rem.category = cat;
    rem.remarkText = remText;
    rem.remarkType = type;
    rem.relatedSegments = segmentrelate;
    return rem;
  }

  writeAquaTouchlessRemark(cancel: any) {
    if (
      cancel.value.followUpOption === 'BSPKT' ||
      cancel.value.followUpOption === 'NONBSPKT' ||
      cancel.value.followUpOption === 'NONBSPREFUND' ||
      cancel.value.followUpOption === 'HOTELCARLIMO'
    ) {
      const bbExist = this.remarksManager.getMatchedPlaceHoldersWithKey('MatrixLineBB');
      const remarkText = this.pnrService.getRemarkText('AQUA CHG-RM*BB/-');
      let value = '';
      if (bbExist) {
        if (remarkText !== '') {
          const regex = /(?<BB>\d(.*))/g;
          const match = regex.exec(remarkText);
          regex.lastIndex = 0;
          if (match !== null) {
            value = match[0];
            this.createRemarks(['MatrixLineBB'], [value]);
          }
        }
      }
      this.queService.addQueueCollection(new QueuePlaceModel(this.pnrService.extractOidFromBookRemark(), 70, 1));
      if (cancel.value.followUpOption === 'HOTELCARLIMO') {
        this.queService.addQueueCollection(new QueuePlaceModel('YTOWL210E', '70', '1'));
      }
    }
  }

  private queueNonBspTicket() {
    this.queService.addQueueCollection(new QueuePlaceModel('YTOWL210O', 41, 98));
    this.queService.addQueueCollection(new QueuePlaceModel('YTOWL210E', 60, 1));
  }

  private createRemarks(keys, values, statictext?) {
    const map = new Map<string, string>();
    keys.forEach((key, i) => {
      map.set(key, values[i]);
    });
    this.remarksManager.createPlaceholderValues(map, null, null, null, statictext);
  }
  sendEBRemarks(cancelForm: FormGroup) {
    const map = new Map<string, string>();
    map.set('TouchCode', cancelForm.controls.ebR.value);
    map.set('BookingToolCode', cancelForm.controls.ebT.value);
    map.set('ReasonType', cancelForm.controls.ebN.value);
    map.set('ReasonCode', cancelForm.controls.ebC.value);
    this.remarksManager.createPlaceholderValues(map);
  }

  WriteTicketRefund(group: FormGroup, refundType: string) {
    const curDate = formatDate(new Date(), 'ddMMM', 'en-US');
    const remarkList = new Array<RemarkModel>();

    if (refundType === 'bsp') {
      const arr = group.controls.tickets as FormArray;
      for (let i = 0; i < arr.length; i++) {
        const t = arr.at(i);
        this.createRemarks(['TicketNumber'], [t.get('ticketNum').value], 'REFUND PROCESSED');
        this.createRemarks(['TicketNumber', 'CouponNumber'], [t.get('ticketNum').value, t.get('coupon').value]);
      }
      this.queService.addQueueCollection(new QueuePlaceModel('YTOWL210O', 41, 94));
      let bb = this.pnrService.getRemarkText('AQUA UPDATED THE BB FROM');
      if (bb !== '') {
        bb = bb.substr(bb.length - 6);
      }
      const bb2 = this.pnrService.getRemarkText('BB/-').replace('BB/-', '');
      if (bb !== '' && bb2 !== '' && bb !== bb2) {
        this.createRemarks(['MatrixLineBB'], [bb]);
      }
      return { SendTicket: true };
    } else {
      this.createRemarks(['VendorName', 'BackOfficeAgentIdentifier'], [group.get('supplier').value, group.get('officeId').value]);
      this.createRemarks(['PartialFull', 'CurrentDate'], [group.get('partialFull').value === 'full' ? 'FULL' : 'PART', curDate], 'REFUND');
      if (group.get('freeFlow1').value) {
        remarkList.push(this.remarkHelper.createRemark('.  ' + group.get('freeFlow1').value, 'RM', 'X'));
      }
      if (group.get('freeFlow2').value) {
        remarkList.push(this.remarkHelper.createRemark('.  ' + group.get('freeFlow2').value, 'RM', 'X'));
      }
      let invoice = group.get('invoice').value;
      if (invoice && invoice.trim() !== '') {
        invoice = '- ORIG INV ' + group.get('invoice').value;
      }
      const refundAmt = group.get('refundAmount').value;
      if (refundAmt && Number(refundAmt) > 0) {
        this.createRemarks(['RefundAmount', 'Commission', 'InvoiceNumber'], [refundAmt, group.get('commission').value, invoice]);
      } else {
        this.createRemarks(['Commission', 'InvoiceNumber'], [group.get('commission').value, invoice]);
      }
      if (group.get('partialFull').value !== 'full') {
        this.createRemarks(
          ['BaseAmt', 'Gst', 'Tax'],
          [group.get('baseAmount').value, group.get('gst').value, group.get('tax').value],
          'REFUND'
        );
      }
      this.queueNonBspTicket();
      return { remarks: remarkList, commands: [] };
    }
  }
}
