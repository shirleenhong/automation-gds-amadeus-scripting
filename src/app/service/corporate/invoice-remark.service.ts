import { Injectable } from '@angular/core';
import { PnrService } from '../pnr.service';
import { RemarksManagerService } from './remarks-manager.service';
import { MatrixReportingComponent } from 'src/app/corporate/reporting/matrix-reporting/matrix-reporting.component';
import { EscRemarksComponent } from 'src/app/corporate/corp-remarks/esc-remarks/esc-remarks.component';
import { DatePipe } from '@angular/common';
import { AddContactComponent } from '../../corporate/corp-remarks/add-contact/add-contact.component';
import { FormArray, FormGroup } from '@angular/forms';
import { AmadeusQueueService } from '../amadeus-queue.service';
import { QueuePlaceModel } from 'src/app/models/pnr/queue-place.model';
import { RemarkModel } from '../../models/pnr/remark.model';
import { RemarkHelper } from '../../helper/remark-helper';
declare var smartScriptSession: any;

@Injectable({
  providedIn: 'root'
})
export class InvoiceRemarkService {
  DATE_PIPE = new DatePipe('en-US');

  constructor(
    private pnrService: PnrService,
    private queService: AmadeusQueueService,
    private rms: RemarksManagerService,
    private remarkHelper: RemarkHelper
  ) {}
  sendU70Remarks(): any {
    if (this.checkAquaComplianceRemarks()) {
      console.log('send u70 remark');
      const u70map = new Map<string, string>();
      u70map.set('RecordLocator', this.pnrService.pnrObj.header.recordLocator);
      this.rms.createPlaceholderValues(u70map);
    }
  }
  checkAquaComplianceRemarks(): any {
    let createRemark = false;
    if (this.pnrService.pnrObj.header.recordLocator) {
      const u70 = this.pnrService.getRemarkText('U70/-');
      if (!u70) {
        createRemark = true;
      }
    }
    return createRemark;
  }

  WriteInvoiceRemark(mrc: MatrixReportingComponent) {
    if (mrc.isMatrixPnr) {
      const backOfficeIdentifier = new Map<string, string>();
      const staticRemarksCondition = new Map<string, string>();
      if (mrc.invoiceMessageForm.get('cicNumber').value !== undefined) {
        backOfficeIdentifier.set('BackOfficeAgentIdentifier', mrc.invoiceMessageForm.get('cicNumber').value);
        this.rms.createPlaceholderValues(backOfficeIdentifier);
      }
      staticRemarksCondition.set('IsNuc', 'true');
      this.rms.createPlaceholderValues(null, staticRemarksCondition, null, null, 'NUC');
    }
  }
  writeESCRemarks(escComp: EscRemarksComponent) {
    const esc = escComp.escRemarksForm;
    let currentDate: any = new Date();
    const currentTime =
      currentDate.getHours() + ':' + (currentDate.getMinutes() <= 9 ? '0' + currentDate.getMinutes() : currentDate.getMinutes());
    currentDate = this.DATE_PIPE.transform(new Date(), 'ddMMM'); // DDOCT

    if (esc.controls.isESCRead.value === 'Y') {
      this.rms.createEmptyPlaceHolderValue(['CurrentTimeN', 'CurrentDateN'], null, 'ESC AGENT DID NOT HAVE TIME TO READ ESC REMARKS');
      const escMap = new Map<string, string>();
      escMap.set('CurrentDateY', currentDate);
      escMap.set('CurrentTimeY', currentTime);
      this.rms.createPlaceholderValues(escMap);
    }
    if (esc.controls.isESCRead.value === 'N') {
      this.rms.createEmptyPlaceHolderValue(['CurrentTimeY', 'CurrentDateY'], null, 'ESC AGENT READ ESC REMARKS');
      const escMap = new Map<string, string>();
      escMap.set('CurrentDateN', currentDate);
      escMap.set('CurrentTimeN', currentTime);
      this.rms.createPlaceholderValues(escMap);
    }
  }
  async deleteSSRLines(addConact: AddContactComponent) {
    const deleteLines = addConact.deleteSRline.join(',');
    await smartScriptSession.send('XE' + deleteLines);
  }
  getSSRCommandsForContact(addConact: AddContactComponent) {
    const formCommandArr = [];
    let formCommand = '';
    if (addConact.addContactForm) {
      const arr = addConact.addContactForm.get('items') as FormArray;
      for (const c of arr.controls) {
        const name = c.get('name').value;
        const countryCode = c.get('countryCode').value;
        const phone = c.get('phone').value;
        const freeFlow = c.get('freeFlowText').value;
        const pax = c.get('passengers').value;
        if (name && countryCode && phone) {
          formCommand = 'SR PCTC YY HK/' + name + '/' + countryCode + phone + '.' + freeFlow + '/' + pax;
          formCommandArr.push(formCommand);
        }
      }
    }
    return formCommandArr;
  }
  async sendRTFCommand() {
    const tempRTFRes = await smartScriptSession.send('RTF');
    return await smartScriptSession.getFullCryptic(tempRTFRes.Response);
  }
  async sendINVCommand(command) {
    const tempINVRes = await smartScriptSession.send(command);
    return await smartScriptSession.getFullCryptic(tempINVRes.Response);
  }
  async sendRTTNCommand(command) {
    const tempRTTNRes = await smartScriptSession.send(command);
    return await smartScriptSession.getFullCryptic(tempRTTNRes.Response);
  }
  async sendRFCommand(command) {
    return await smartScriptSession.send(command);
  }
  addETicketRemarks(selectedUIElements, eTicketsList) {
    const selectedETickets = selectedUIElements.selectedETickets;
    if (selectedETickets === 'All') {
      this.rms.createEmptyPlaceHolderValue([], null, 'SPCL-TKT0');
      // create placeholder for all values
      for (const eTicket of eTicketsList) {
        if (eTicket.lineNo !== 'All' && eTicket.lineNo !== 'None') {
          const ticketMap = new Map<string, string>();
          ticketMap.set('TicketNum', eTicket.freeText);
          this.rms.createPlaceholderValues(ticketMap);
        }
      }
    } else if (selectedETickets === 'None') {
      this.rms.createEmptyPlaceHolderValue(['TicketNum']);
      // create placeholder for no ticket
      const ticketMap = new Map<string, string>();
      ticketMap.set('EticketNone', 'true');
      this.rms.createPlaceholderValues(null, ticketMap, null, null, 'SPCL-TKT0');
    } else {
      this.rms.createEmptyPlaceHolderValue([], null, 'SPCL-TKT0');
      const splitSelectedVals = selectedETickets.split(',');
      for (const selectedEle of splitSelectedVals) {
        const ticketNum = this.getTicketNum(selectedEle, eTicketsList);
        if (ticketNum !== '') {
          const ticketMap = new Map<string, string>();
          ticketMap.set('TicketNum', ticketNum);
          this.rms.createPlaceholderValues(ticketMap);
        }
      }
    }
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
  addFeeLinesRemarks(selectedUIElements, feeRemarks) {
    const selectedFeeLines = selectedUIElements.selectedFeeLines.split(',');
    for (const line of selectedFeeLines) {
      for (const rmk of feeRemarks) {
        const feeMap = new Map<string, string>();
        let segAssociations = [];
        if (rmk.associations) {
          segAssociations = this.getSegmentAssociations(rmk.associations);
        }
        if (line === rmk.ticketline && rmk.remarkText.indexOf('FEE/-') > -1) {
          rmk.remarkText = rmk.remarkText.replace('FEE/-', '').trim();
          feeMap.set('FeesPlaceholder', rmk.remarkText);
          this.rms.createPlaceholderValues(feeMap, null, segAssociations);
        } else if (line === rmk.ticketline && rmk.remarkText.indexOf('SFC/-') > -1) {
          rmk.remarkText = rmk.remarkText.replace('SFC/-', '').trim();
          feeMap.set('SfcPlaceholder', rmk.remarkText);
          this.rms.createPlaceholderValues(feeMap, null, segAssociations);
        }
      }
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
  addNonBspRemarks(selectedUIElements, nonBspRemarks) {
    const selectedNonBspLines = selectedUIElements.selectedNonBspLines.split(',');
    for (const line of selectedNonBspLines) {
      for (const rmk of nonBspRemarks) {
        const nonBspMap = new Map<string, string>();
        if (line === rmk.nonBspLineNum) {
          rmk.nonBspRmk = rmk.nonBspRmk.replace('MAC/-', '').trim();
          nonBspMap.set('MacLinePlaceholder', rmk.nonBspRmk.replace('RM*', ''));
          let segAssociations = [];
          if (rmk.associations) {
            segAssociations = this.getSegmentAssociations(rmk.associations);
          }
          this.rms.createPlaceholderValues(nonBspMap, null, segAssociations);
        }
      }
    }
    this.queService.addQueueCollection(new QueuePlaceModel('YTOWL210E', 66, 1));
  }
  getDeletedInvoiceLines(selectedUIElements, invoiceList) {
    const deletedInvoices = new Array<string>();
    const selectedInvoices = selectedUIElements.selectedInvoice;
    if (selectedInvoices === 'All') {
      return deletedInvoices;
    } else {
      for (const invoice of invoiceList) {
        if (invoice.lineNo !== 'All' && !invoice.isChecked) {
          deletedInvoices.push(invoice.lineNo);
        }
      }
    }
    return deletedInvoices;
  }
  addEmailRemarks(frmGroup: FormGroup) {
    const arr = frmGroup.get('emailAddresses') as FormArray;
    for (const c of arr.controls) {
      const email = c.get('emailAddress').value;
      if (email) {
        const emailAddresses = new Map<string, string>();
        emailAddresses.set('CWTItineraryEmailRecipient', email);
        this.rms.createPlaceholderValues(emailAddresses);
      }
    }
  }
  getFeeDetailsUI(freeFlowText) {
    const feeObj = {
      lineNo: '',
      freeText: '',
      isChecked: false
    };
    const ticketRegex = /TKT[0-9]{1,2}/g;
    const ticketMatch = freeFlowText.match(ticketRegex);
    if (ticketMatch && ticketMatch[0]) {
      feeObj.freeText = ticketMatch[0];
      feeObj.lineNo = ticketMatch[0].replace('TKT', '').trim();
    }
    return feeObj;
  }
  getInvoiceElements(rtfResponse) {
    const invoiceElements = [];
    const splitRes = rtfResponse.split('\n');
    for (const ele of splitRes) {
      if (ele.indexOf('FI') > -1) {
        invoiceElements.push(ele);
      }
    }
    return invoiceElements;
  }
  getInvoiceDetails(invoiceEle) {
    const invoiceObj = {
      lineNo: '',
      freeText: '',
      isChecked: false
    };
    const invoice = invoiceEle.trim();
    const lineRegex = /[0-9]{1,2}/;
    const invoiceRegex = /[0-9]{10} [A-Z]{3} [0-9]{10}/g;
    const lineMatch = invoice.match(lineRegex);
    if (lineMatch && lineMatch[0]) {
      invoiceObj.lineNo = lineMatch[0];
    }
    const invoiceMatch = invoice.match(invoiceRegex);
    if (invoiceMatch && invoiceMatch[0]) {
      invoiceObj.freeText = invoiceMatch[0];
    }
    return invoiceObj;
  }

  // getAllTickets(response) {
  //
  //   const eTickets = [];
  //   const resregex = /[A-Z]{2}\/{1}[A-Z]{2}[ 0-9-]{4}[-]{1}[0-9]{10}\/{1}[A-Z]{4}/g;
  //   const match = response.match(resregex);
  //   if (match) {
  //     const ticketTypeRegex = /[A-Z]{4}/g;
  //     const ticketNumRegex = /[0-9-]{4}[0-9]{10}/g;
  //     for (const matchEle of match) {
  //       const typeMatch = matchEle.match(ticketTypeRegex);
  //       if (typeMatch && typeMatch[0].indexOf('ET') > -1 && ) {
  //         const ticketNumMatch = matchEle.match(ticketNumRegex);
  //         if (ticketNumMatch && ticketNumMatch[0]) {
  //           eTickets.push(ticketNumMatch[0].replace('-', '').trim());
  //         }
  //       }
  //     }
  //   }
  //   return eTickets;
  // }

  getAllTickets() {
    const eTickets = [];
    for (const ticketed of this.pnrService.pnrObj.faElements) {
      const regex = new RegExp('[0-9]{3}-[0-9]+');
      const match = regex.exec(ticketed.freeFlowText);
      regex.lastIndex = 0;
      if (match !== null && ticketed.freeFlowText.indexOf('/EVAC/') === -1) {
        eTickets.push(match[0].replace('-', '').trim());
      }
    }
    return eTickets;
  }

  getFeeDetails(rmElement) {
    const feeLineObj = {
      ticketline: '',
      remarkText: '',
      associations: []
    };
    const ticketRegex = /TKT[0-9]{1,2}/g;
    let freeText = rmElement.freeFlowText;
    const ticketMatch = freeText.match(ticketRegex);
    if (ticketMatch && ticketMatch[0]) {
      feeLineObj.ticketline = ticketMatch[0].replace('TKT', '').trim();
      freeText = freeText.replace(ticketMatch[0] + '-', '').trim();
      feeLineObj.remarkText = freeText;
      feeLineObj.associations = rmElement.associations;
    }
    return feeLineObj;
  }
  writeIrdRateRequestRemarks(irdForm: FormGroup) {
    const map1 = new Map<string, string>();
    map1.set('ConsultantName', irdForm.controls.name.value);
    map1.set('CNNumber', irdForm.controls.cnNumber.value);
    this.rms.createEmptyPlaceHolderValue(['ConsultantName', 'CNNumber']);
    this.rms.createPlaceholderValues(map1);
    const map2 = new Map<string, string>();
    map2.set('IrdDate', irdForm.controls.date.value);
    map2.set('ConsultantOid', irdForm.controls.officeId.value);
    map2.set('IrdRateQueue', irdForm.controls.queue.value);
    map2.set('CFANumber', irdForm.controls.cfa.value);
    this.rms.createEmptyPlaceHolderValue(['IrdDate', 'ConsultantOid', 'IrdRateQueue', 'CFANumber']);
    this.rms.createPlaceholderValues(map2);
    const map3 = new Map<string, string>();
    map3.set('FareRequest', irdForm.controls.fareRequest.value);
    this.rms.createEmptyPlaceHolderValue(['FareRequest']);
    this.rms.createPlaceholderValues(map3);
    const map4 = new Map<string, string>();
    map4.set('AirFlexibility', irdForm.controls.airFlexibility.value ? 'Y' : 'N');
    this.rms.createEmptyPlaceHolderValue(['AirFlexibility']);
    this.rms.createPlaceholderValues(map4);
    const map5 = new Map<string, string>();
    map5.set('DateFlexibilty', irdForm.controls.dateFlexibility.value ? 'Y' : 'N');
    this.rms.createEmptyPlaceHolderValue(['DateFlexibilty']);
    this.rms.createPlaceholderValues(map5);
    const map6 = new Map<string, string>();
    map6.set('ScheduleFlexibility', irdForm.controls.scheduleFlexibility.value ? 'Y' : 'N');
    this.rms.createEmptyPlaceHolderValue(['ScheduleFlexibility']);
    this.rms.createPlaceholderValues(map6);
    const map7 = new Map<string, string>();
    const arr = irdForm.get('stops') as FormArray;
    let stopValue = '';
    for (const c of arr.controls) {
      stopValue = stopValue + c.get('stops').value + (c === arr.controls[arr.controls.length - 1] ? '' : ' * ');
    }
    if (stopValue) {
      map7.set('Stops', stopValue);
      this.rms.createEmptyPlaceHolderValue(['Stops']);
      this.rms.createPlaceholderValues(map7);
    }
    const map8 = new Map<string, string>();
    if (irdForm.controls.isTravel.value) {
      map8.set('TravelQueue', irdForm.controls.isTravel.value === 'Y' ? '40C250' : '40C240');
      this.rms.createEmptyPlaceHolderValue(['TravelQueue']);
      this.rms.createPlaceholderValues(map8);
    }
  }

  buildIrdCommentsRemarks(comments: FormGroup) {
    let remText = '';
    const remarkList = new Array<RemarkModel>();

    const arr = comments.get('comments') as FormArray;
    for (const c of arr.controls) {
      remText = c.get('comments').value;
      if (remText) {
        remarkList.push(this.remarkHelper.createRemark(remText, 'RM', 'F'));
      }
    }
    return remarkList;
  }

  addTravelTicketingQueue(form: FormGroup) {
    const isTravel = form.controls.isTravel.value;

    if (isTravel === 'Y') {
      this.queService.addQueueCollection(new QueuePlaceModel('YTOWL210N', 40, 250));
    }
    if (isTravel === 'N') {
      this.queService.addQueueCollection(new QueuePlaceModel('YTOWL210N', 40, 240));
    }
  }
}
