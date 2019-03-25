import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatrixAccountingModel } from 'src/app/models/pnr/matrix-accounting.model';

import { SelectItem } from 'src/app/models/select-item.model';
import { PnrService } from 'src/app/service/pnr.service';
import { DDBService } from 'src/app/service/ddb.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-update-accounting-remark',
  templateUrl: './update-accounting-remark.component.html',
  styleUrls: ['./update-accounting-remark.component.scss']
})
export class UpdateAccountingRemarkComponent implements OnInit {

  title: string;

  @Input()
  accountingRemarks: MatrixAccountingModel;

  // // TODO: Via service
  accountingRemarkList: Array<SelectItem>;
  formOfPaymentList: Array<SelectItem>;
  vendorCodeList: Array<SelectItem>;
  supplierCodeList: Array<any>;
  filterSupplierCodeList: Array<any>;
  passengerList: Array<any>;

  matrixAccountingForm: FormGroup;
  isSubmitted: boolean;
  // PaymentModeList: Array<SelectItem>;

  // @ViewChild('bankAccount') bankAccEl: ElementRef;

  constructor(public activeModal: BsModalService, private pnrService: PnrService, public modalRef: BsModalRef, private ddbService: DDBService) {
    this.accountingRemarkList = new Array<SelectItem>();
    this.formOfPaymentList = new Array<SelectItem>();
    this.accountingRemarks = new MatrixAccountingModel();
    // this.loadAccountingRemarkList();
    // this.loadFormOfPaymentList();
    this.loadVendorCode();
    this.loadPassengerList();
    this.matrixAccountingForm = new FormGroup({
      accountingTypeRemark: new FormControl('', [Validators.required]),
      segmentNo: new FormControl('', [Validators.required, Validators.maxLength(7)]),
      supplierCodeName: new FormControl('', [Validators.required, Validators.maxLength(3)]),
      passengerNo: new FormControl('', [Validators.required]),
      supplierConfirmatioNo: new FormControl('', [Validators.required]),
      baseAmount: new FormControl('', [Validators.required, Validators.pattern('^\\s*(?=.*[1-9])\\d*(?:\\.\\d{1,2})?\\s*$')]),
      commisionWithoutTax: new FormControl('', [Validators.required, Validators.pattern('^\\s*(?=.*[1-9])\\d*(?:\\.\\d{1,2})?\\s*$')]),
      gst: new FormControl('', [Validators.required, Validators.pattern('^\\s*(?=.*[1-9])\\d*(?:\\.\\d{1,2})?\\s*$')]),
      hst: new FormControl('', [Validators.required, Validators.pattern('^\\s*(?=.*[1-9])\\d*(?:\\.\\d{1,2})?\\s*$')]),
      qst: new FormControl('', [Validators.required, Validators.pattern('^\\s*(?=.*[1-9])\\d*(?:\\.\\d{1,2})?\\s*$')]),
      otherTax: new FormControl('', [Validators.required, Validators.pattern('^\\s*(?=.*[1-9])\\d*(?:\\.\\d{1,2})?\\s*$')]),
      fop: new FormControl('', [Validators.required]),
      vendorCode: new FormControl('', [Validators.required]),
      cardNumber: new FormControl('', [Validators.required]),
      expDate: new FormControl('', [Validators.required]),
      tktLine: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    }, { updateOn: 'blur' });

  }

  ngOnInit() {

    //  this.passengerList = this.pnrService.getPassengers();
    //  this.passengerList.push({fullname: 'All',  id:'ALL'})
    this.supplierCodeList = this.ddbService.getSupplierCode();
  }

  IsBSP(testvalue) {
    if (testvalue === "1") {
      this.loadAccountingRemarkList(testvalue);
      this.loadFormOfPaymentList(testvalue);
      this.enableFormControls(['tktLine'], false);
      this.enableFormControls(['description'], true);
      this.accountingRemarks.bsp = true;
    }
    else {
      this.loadAccountingRemarkList(testvalue);
      this.loadFormOfPaymentList(testvalue);
      this.enableFormControls(['tktLine'], true);
      this.enableFormControls(['description'], false);
      this.accountingRemarks.bsp = false;
    }
    // return true;
  }

  loadPassengerList() {
    this.passengerList = [{ itemText: '', itemValue: '' },
    { itemText: 'ALL Passenger', itemValue: 'ALL' },
    { itemText: 'PER Passenger', itemValue: 'PER' }];
  }

  loadFormOfPaymentList(testvalue) {
    if (testvalue === "1") {
      this.formOfPaymentList = [{ itemText: '', itemValue: '' },
      { itemText: 'Credit Card', itemValue: 'CC' },
      { itemText: 'Cash', itemValue: 'CA' },
      { itemText: 'Cheque', itemValue: 'CK' },
      { itemText: 'Agency Plastic Card', itemValue: 'ACC' }
      ];
    } else {
      this.formOfPaymentList = [{ itemText: '', itemValue: '' },
      { itemText: 'Credit Card', itemValue: 'CC' },
      { itemText: 'Agency Plastic Card', itemValue: 'ACC' },
      { itemText: 'RBC Points', itemValue: 'CK' }
      ];
    }



  }

  loadVendorCode() {

    this.vendorCodeList = [{ itemText: '', itemValue: '' },
    { itemText: 'VI- Visa', itemValue: 'VI' },
    { itemText: 'MC - Mastercard', itemValue: 'MC' },
    { itemText: 'AX - American Express', itemValue: 'AX' },
    { itemText: 'DI -Diners', itemValue: 'DC' }
    ];
  }

  loadAccountingRemarkList(testvalue) {

    if (testvalue === "1") {
      this.accountingRemarkList = [{ itemText: '', itemValue: '' },
      { itemText: 'Tour Accounting Remark  ', itemValue: '12' },
      { itemText: 'Cruise Accounting Remark', itemValue: '5' },
      { itemText: 'NonBSP Air Accounting Remark', itemValue: '1' },
      { itemText: 'Rail Accounting Remark', itemValue: '4' },
      { itemText: 'Limo Accounting Remark', itemValue: '6' }
      ];
    } else {
      this.accountingRemarkList = [{ itemText: '', itemValue: '' },
      { itemText: 'SEAT COSTS', itemValue: 'SEAT' },
      { itemText: 'MAPLE LEAF LOUNGE COSTS', itemValue: 'MAPLE' },
      { itemText: 'PET TRANSPORTATION', itemValue: 'PET' },
      { itemText: 'FREIGHT COSTS', itemValue: 'FREIGHT' },
      { itemText: 'BAGGAGE FEES', itemValue: 'BAGGAGE' },
      { itemText: 'FOOD COSTS', itemValue: 'FOOD' },
      { itemText: 'OTHER COSTS', itemValue: 'OTHER ' }
      ];
    }
  }

  filterSupplierCode(typeCode) {
    this.filterSupplierCodeList = this.supplierCodeList.filter(
      supplier => supplier.type === typeCode);

    if (!this.accountingRemarks.bsp) {
      if (typeCode === 'SEAT') {
        this.accountingRemarks.supplierCodeName = 'PFS';
      }
      else {
        this.accountingRemarks.supplierCodeName = 'CGO';
      }
    } else {
      this.SetTktNumber();
    }

  }

  // get PaymentType() { return PaymentType; }

  FormOfPaymentChange(newValue) {

    switch (newValue) {
      case 'CC':
        this.enableFormControls(['cardNumber', 'expDate', 'vendorCode'], false);
        break;
      default:
        this.enableFormControls(['cardNumber', 'expDate', 'vendorCode'], true);
        break;
    }
  }

  enableFormControls(controls: string[], disabled: boolean) {
    controls.forEach(c => {
      if (disabled) {
        this.matrixAccountingForm.get(c).disable();
      } else {
        this.matrixAccountingForm.get(c).enable();
      }
    });
  }


  get f() { return this.matrixAccountingForm.controls; }

  saveAccounting() {

    if (this.matrixAccountingForm.invalid) {
      alert('Please Complete And Complete all the required Information');
      this.isSubmitted = false;
      return;
    }
    this.isSubmitted = true;
    this.modalRef.hide();
  }


  getAllErrors(form: FormGroup | FormArray): { [key: string]: any; } | null {
    let hasError = false;
    const result = Object.keys(this.matrixAccountingForm.controls).reduce((acc, key) => {
      const control = this.matrixAccountingForm.get(key);

      const errors = (control instanceof FormGroup || control instanceof FormArray)
        ? this.getAllErrors(control)
        : (control.touched ? control.errors : '');
      if (errors) {
        acc[key] = errors;
        hasError = true;
      }
      return acc;
    }, {} as { [key: string]: any; });
    return hasError ? result : null;
  }

  creditcardMaxValidator(newValue) {
    let pat = '';
    switch (newValue) {
      case 'VI': {
        pat = '^4[0-9]{15}$';
        break;
      }
      case 'MC': {
        pat = '^5[0-9]{15}$';
        break;
      }
      case 'AX': {
        pat = '^3[0-9]{14}$';
        break;
      }
      case 'DC': {
        pat = '^[0-9]{14,16}$';
        break;
      }
      default: {
        pat = '^[0-9]{14,16}$';
        break;
      }
    }

    this.matrixAccountingForm.controls.cardNumber.setValidators(Validators.pattern(pat));
  }

  checkDate(newValue) {
    const datePipe = new DatePipe('en-US');

    const month = datePipe.transform(newValue, 'MM');
    const year = datePipe.transform(newValue, 'yyyy');

    const d = new Date();
    const moNow = d.getMonth();
    const yrnow = d.getFullYear();
    let valid = false;
    if (parseInt(year) > yrnow) {
      valid = true;
    }
    if ((parseInt(year) === yrnow) && (parseInt(month) >= moNow + 1)) {
      valid = true;
    }

    if (!valid) {
      this.matrixAccountingForm.controls.expDate.setValidators(Validators.pattern('^[0-9]{14,16}$'));
    } else {
      this.matrixAccountingForm.controls.expDate.setValidators(Validators.pattern('.*'));
    }

  }

  SetTktNumber() {
    var supCode = ['ACY', 'SOA', 'WJ3'];

    if (this.accountingRemarks.accountingTypeRemark === '1' && supCode.includes(this.accountingRemarks.supplierCodeName)) {
      this.matrixAccountingForm.controls.tktLine.setValidators(Validators.required);
    } else {
      this.matrixAccountingForm.controls.tktLine.clearValidators();
    }

  }
}
