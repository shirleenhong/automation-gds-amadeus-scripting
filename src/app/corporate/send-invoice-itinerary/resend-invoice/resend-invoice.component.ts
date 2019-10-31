import { Component, OnInit } from '@angular/core';
import { PnrService } from 'src/app/service/pnr.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { InvoiceRemarkService } from 'src/app/service/corporate/invoice-remark.service';
@Component({
  selector: 'app-resend-invoice',
  templateUrl: './resend-invoice.component.html',
  styleUrls: ['./resend-invoice.component.scss']
})
export class ResendInvoiceComponent implements OnInit {
  invoiceFormGroup: FormGroup;
  constructor(private pnrService: PnrService,
              private invoiceRmkService: InvoiceRemarkService,
              private formBuilder: FormBuilder) { }
  showSegments = true;
  showInvoiceList = false;
  segmentNum = '';
  invoiceList = [];
  feeAccountingList = [];
  nonBspAccountingList = [];
  eTicketsList = [];
  remove = false;
  add = true;
  listEmail: Array<string>;
  invoiceGroup: FormGroup;
  ngOnInit() {
    this.invoiceFormGroup = new FormGroup({
      segmentNo: new FormControl('', [Validators.required, Validators.pattern('[0-9]+(,[0-9]+)*')]),
      invoiceNo: new FormControl('', [Validators.required, Validators.pattern('[0-9]+(,[0-9]+)*')]),
      feesAccountingNo: new FormControl('', []),
      nonBspAccountingNo: new FormControl('', []),
      emailAddresses: new FormArray([this.createFormGroup()]),
    });
    this.resendInvoiceProcess();
  }
  async resendInvoiceProcess() {
    await this.getInvoicesFromPNR();
    await this.getAllETickets();
    this.getFeeAccountingLines();
    this.listEmail = this.pnrService.getEmailAddressesFromGds();
  }
  async getInvoicesFromPNR() {
    const fiElements = this.pnrService.pnrObj.fiElements;
    if (fiElements.length > 0) {
      this.showInvoiceList = true;
      const selectAllObj = {
        lineNo: 'All',
        freeText: 'Select All',
        isChecked: false
      };
      this.invoiceList.push(selectAllObj);
      this.addInvoicesToList(fiElements);
      console.log(fiElements);
      // show the invoice elements in UI
    } else {
      await this.invoiceProcess();
    }
  }
  async invoiceProcess() {
    const invCommand = 'INV/ZX/RT';
    const invResponse = await this.invoiceRmkService.sendINVCommand(invCommand);
    const rtfRes = await this.invoiceRmkService.sendRTFCommand();
    console.log(invResponse);
    console.log(rtfRes);
  }
  async getAllETickets() {
    const rttnCmd = 'RTTN/H';
    const rttnResponse = await this.invoiceRmkService.sendINVCommand(rttnCmd);
    const eTickets = this.getAllTickets(rttnResponse);
    this.makeETicketsListUI(eTickets);
    console.log(eTickets);
  }
  addInvoicesToList(fiElements) {
    const regex = /PAX|INF|INS|CHD/g;
    for (const fiElement of fiElements) {
      const invoiceObj = {
        lineNo: '',
        freeText: '',
        isChecked: false
      };
      let freeText = fiElement.fullNode.otherDataFreetext.longFreetext;
      const match = freeText.match(regex);
      if (match && match[0]) {
        freeText = freeText.replace(match[0], '').trim();
      }
      invoiceObj.lineNo = fiElement.elementNumber;
      invoiceObj.freeText = freeText;
      this.invoiceList.push(invoiceObj);
    }
  }
  createFormGroup(): FormGroup {
    const group = this.formBuilder.group({
      emailAddress: new FormControl('',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[A-Z0-9.-]+?\\.[A-Z]{2,3}$')])
    });
    return group;
  }
  removeItems(i, type) {
    let items;
    switch (type) {
      case 'email':
        items = this.invoiceFormGroup.controls.emailAddresses as FormArray;
        items.removeAt(i);
        if (items.length > 1) {
          this.remove = true;
        } else {
          this.remove = false;
        }
        break;
      default:
        break;
    }
  }
  addItems(type) {
    let items;
    switch (type) {
      case 'email':
        items = this.invoiceFormGroup.controls.emailAddresses as FormArray;
        items.push(this.createFormGroup());
        if (items.length < 6) {
          this.add = true;
          this.remove = true;
        } else {
          this.add = false;
        }
        break;
    }
  }
  getFeeAccountingLines() {
    const rmElements = this.pnrService.pnrObj.rmElements;
    for (const rmElement of rmElements) {
      if (rmElement.category === 'F') {
      }
    }
  }
  generateInvoice() {
    console.log(this.segmentNum);
  }
  checkSelectedInvoice(data: any) {
    if (data.lineNo === 'All') {
      const newVal = !data.isChecked;
      for (const ele of this.invoiceList) {
        ele.isChecked = newVal;
      }
    } else {
      for (const ele of this.invoiceList) {
        if (data.lineNo === ele.lineNo) {
          ele.isChecked = !ele.isChecked;
        }
      }
      if (this.checkForAllSelectionInvoice()) {
        this.invoiceList[0].isChecked = true;
      } else {
        this.invoiceList[0].isChecked = false;
      }
    }
  }
  checkSelectedTickets(data: any) {
    if(data.lineNo === 'All') {
      const newVal = !data.isChecked;
      for (const ele of this.eTicketsList) {
        ele.isChecked = newVal;
      }
    } else {
      for (const ele of this.eTicketsList) {
        if (data.lineNo === ele.lineNo) {
          ele.isChecked = !ele.isChecked;
        }
      }
      if (this.checkForAllSelectionTickets()) {
        this.eTicketsList[0].isChecked = true;
      } else {
        this.eTicketsList[0].isChecked = false;
      }
    }
  }
  private checkForAllSelectionInvoice() {
    let isAllSelected = true;
    this.invoiceList.forEach((ele, index) => {
      if (index !== 0 && !ele.isChecked) {
        isAllSelected = false;
      }
    });
    return isAllSelected;
  }
  private checkForAllSelectionTickets() {
    let isAllSelected = true;
    this.eTicketsList.forEach((ele, index) => {
      if (index !== 0 && !ele.isChecked) {
        isAllSelected = false;
      }
    });
    return isAllSelected;
  }
  private getAllTickets(response) {
    const eTickets = [];
    const resregex = /[A-Z]{2}\/{1}[A-Z]{2}[ 0-9-]{4}[-]{1}[0-9]{10}\/{1}[A-Z]{4}/g;
    const match = response.match(resregex);
    if (match) {
      const ticketTypeRegex = /[A-Z]{4}/g;
      const ticketNumRegex = /[0-9-]{4}[0-9]{10}/g;
      for (const matchEle of match) {
        const typeMatch = matchEle.match(ticketTypeRegex);
        if (typeMatch && typeMatch[0].indexOf('ET') > -1) {
          const ticketNumMatch = matchEle.match(ticketNumRegex);
          if (ticketNumMatch && ticketNumMatch[0]) {
            eTickets.push(ticketNumMatch[0].replace('-', '').trim());
          }
        }
      }
    }
    return eTickets;
  }
  makeETicketsListUI(eTickets) {
    const selectAllObj = {
      lineNo: 'All',
      freeText: 'Send All E-tickets listed in PNR',
      isChecked: false
    };
    this.eTicketsList.push(selectAllObj);
    eTickets.forEach((ticket, index) => {
      const ticketObj = {
        lineNo: index + 1,
        freeText: ticket,
        isChecked: false
      };
      this.eTicketsList.push(ticketObj);
    });
    const selectNoneObj = {
      lineNo: 'None',
      freeText: 'No E-tickets Required',
      isChecked: false
    };
    this.eTicketsList.push(selectNoneObj);
  }
}
