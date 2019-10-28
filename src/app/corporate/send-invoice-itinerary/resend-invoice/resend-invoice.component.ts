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
  remove = false;
  add = true;
  listEmail: Array<string>;
  invoiceGroup: FormGroup;
  ngOnInit() {
    this.invoiceFormGroup = new FormGroup({
      invoiceNo: new FormControl('', [Validators.required, Validators.pattern('[0-9]+(,[0-9]+)*')]),
      emailAddresses: new FormArray([this.createFormGroup()]),
    });
    this.getInvoicesFromPNR();
    this.listEmail = this.pnrService.getEmailAddressesFromGds();
  }
  getInvoicesFromPNR() {
    const fiElements = this.pnrService.pnrObj.fiElements;
    if (fiElements.length > 0) {
      this.showInvoiceList = true;
      const selectAllObj = {
        freeText: 'Select All',
        isChecked: false
      };
      this.invoiceList.push(selectAllObj);
      this.addInvoicesToList(fiElements);
      console.log(fiElements);
      // show the invoice elements in UI
    } else {
      this.invoiceProcess();
    }
  }
  async invoiceProcess() {
    const invCommand = 'INV/ZX/RT';
    const invResponse = await this.invoiceRmkService.sendINVCommand(invCommand);
    const rtfRes = await this.invoiceRmkService.sendRTFCommand();
    console.log(invResponse);
    console.log(rtfRes);
  }
  addInvoicesToList(fiElements) {
    const regex = /PAX|INF|INS|CHD/g;
    for (const fiElement of fiElements) {
      const invoiceObj = {
        freeText : '',
        isChecked : false
      };
      let freeText = fiElement.fullNode.otherDataFreetext.longFreetext;
      const match = freeText.match(regex);
      if (match && match[0]) {
        freeText = freeText.replace(match[0], '').trim();
      }
      invoiceObj.freeText = freeText;
      this.invoiceList.push(invoiceObj);
    }
  }
  createFormGroup(): FormGroup {
    const group = this.formBuilder.group({
      emailAddress: new FormControl('',
        // tslint:disable-next-line:max-line-length
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
}
