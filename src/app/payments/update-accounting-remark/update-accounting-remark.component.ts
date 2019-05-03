import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatrixAccountingModel } from 'src/app/models/pnr/matrix-accounting.model';

import { SelectItem } from 'src/app/models/select-item.model';
import { PnrService } from 'src/app/service/pnr.service';
import { DDBService } from 'src/app/service/ddb.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { DatePipe } from '@angular/common';
import { PaymentRemarkHelper } from 'src/app/helper/payment-helper';
import { UtilHelper } from 'src/app/helper/util.helper';
import { validateSegmentNumbers, validateCreditCard, validateExpDate } from 'src/app/shared/validators/leisure.validators';


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
  descriptionList: Array<SelectItem>;
  formOfPaymentList: Array<SelectItem>;
  bspList: Array<SelectItem>;
  vendorCodeList: Array<SelectItem>;
  supplierCodeList: Array<any>;
  filterSupplierCodeList: Array<any>;
  passengerList: Array<any>;
  segments = [];
  matrixAccountingForm: FormGroup;
  isSubmitted: boolean;
  name: string;
  IsInsurance = false;
  // PaymentModeList: Array<SelectItem>;

  // @ViewChild('bankAccount') bankAccEl: ElementRef;

  constructor(public activeModal: BsModalService, private pnrService: PnrService,
    public modalRef: BsModalRef, private ddbService: DDBService,
    private paymentHelper: PaymentRemarkHelper, private utilHelper: UtilHelper) {
    this.accountingRemarkList = new Array<SelectItem>();
    this.formOfPaymentList = new Array<SelectItem>();
    this.accountingRemarks = new MatrixAccountingModel();
    this.loadBSPList();
    this.loadVendorCode();
    this.loadAccountingRemarkList();
    this.loadDescription();
    // this.loadPassengerList();
  }

  ngOnInit() {

    this.supplierCodeList = this.ddbService.getSupplierCode();
    this.segments = this.pnrService.getSegmentTatooNumber();
    this.matrixAccountingForm = new FormGroup({
      accountingTypeRemark: new FormControl('', [Validators.required]),
      confirmationLabel: new FormControl(''),
      segmentNo: new FormControl('', [Validators.required, Validators.pattern('[0-9]+(,[0-9]+)*'),
      validateSegmentNumbers(this.segments)]),
      supplierCodeName: new FormControl('', [Validators.required, Validators.maxLength(3)]),
      // passengerNo: new FormControl('', [Validators.required]),
      supplierConfirmatioNo: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      baseAmount: new FormControl('', [Validators.required]),
      commisionWithoutTax: new FormControl('', [Validators.required]),
      gst: new FormControl('', [Validators.required]),
      hst: new FormControl('', [Validators.required]),
      qst: new FormControl('', [Validators.required]),
      otherTax: new FormControl('', [Validators.required]),
      fop: new FormControl('', [Validators.required]),
      vendorCode: new FormControl('', [Validators.required]),
      cardNumber: new FormControl('', [Validators.required, validateCreditCard('vendorCode')]),
      expDate: new FormControl('', [Validators.required, validateExpDate()]),
      tktLine: new FormControl('', [Validators.maxLength(10), Validators.pattern('[0-9]*')]),
      descriptionapay: new FormControl('', [Validators.required]),
      // bsp: new FormControl('', [Validators.required]),
      commisionPercentage: new FormControl('', [Validators.required])
    });

    this.name = 'Supplier Confirmation Number:';

  }

  loadBSPList() {
    this.bspList = [{ itemText: '', itemValue: '' },
    { itemText: 'NO', itemValue: '1' },
    { itemText: 'YES', itemValue: '2' }];
  }

  loadPassengerList() {
    this.passengerList = [{ itemText: '', itemValue: '' },
    { itemText: 'ALL Passenger', itemValue: 'ALL' },
    { itemText: 'PER Passenger', itemValue: 'PER' }];
  }

  loadFormOfPaymentList(testvalue) {
    if (testvalue !== '0') {
      this.formOfPaymentList = [{ itemText: '', itemValue: '' },
      { itemText: 'Credit Card', itemValue: 'CC' },
      { itemText: 'Cash', itemValue: 'CA' },
      { itemText: 'Cheque', itemValue: 'CK' },
      { itemText: 'Agency Plastic Card', itemValue: 'AP' }
      ];
    } else {
      this.formOfPaymentList = [{ itemText: '', itemValue: '' },
      { itemText: 'Credit Card', itemValue: 'CC' },
      { itemText: 'Agency Plastic Card', itemValue: 'AP' },
      { itemText: 'RBC Points', itemValue: 'CK' }
      ];
    }

  }

  loadVendorCode() {
    this.vendorCodeList = [{ itemText: '', itemValue: '' },
    { itemText: 'VI- Visa', itemValue: 'VI' },
    { itemText: 'MC - Mastercard', itemValue: 'MC' },
    { itemText: 'AX - American Express', itemValue: 'AX' },
    { itemText: 'DC -Diners', itemValue: 'DC' }
    ];
  }

  loadAccountingRemarkList() {
    this.accountingRemarkList = [{ itemText: '', itemValue: '' },
    { itemText: 'Tour Accounting Remark  ', itemValue: '12' },
    { itemText: 'Cruise Accounting Remark', itemValue: '5' },
    { itemText: 'NonBSP Air Accounting Remark', itemValue: '1' },
    { itemText: 'Rail Accounting Remark', itemValue: '4' },
    { itemText: 'Limo Accounting Remark', itemValue: '6' },
    { itemText: 'Apay Accounting Remark', itemValue: '0' }
    ];
  }

  loadDescription() {
    this.descriptionList = [{ itemText: '', itemValue: '' },
    { itemText: 'SEAT COSTS', itemValue: 'SEAT COSTS' },
    { itemText: 'MAPLE LEAF LOUNGE COSTS', itemValue: 'MAPLE LEAF' },
    { itemText: 'PET TRANSPORTATION', itemValue: 'PET TRANSPORTATION' },
    { itemText: 'FREIGHT COSTS', itemValue: 'FREIGHT COSTS' },
    { itemText: 'BAGGAGE FEES', itemValue: 'BAGGAGE FEES' },
    { itemText: 'FOOD COSTS', itemValue: 'FOOD COSTS' },
    { itemText: 'OTHER COSTS', itemValue: 'OTHER COSTS' }
    ];
  }

  onChangeApayNonApay(accRemark) {
    if (accRemark !== '0') {
      this.enableFormControls(['tktLine', 'otherTax', 'commisionWithoutTax', 'supplierCodeName'], false);
      this.enableFormControls(['descriptionapay', 'commisionPercentage'], true);
      this.accountingRemarks.bsp = '1';
      this.filterSupplierCode(accRemark);
      this.SetTktNumber();
      this.IsInsurance = false;
      this.name = 'Supplier Confirmation Number:';
    } else {
      this.enableFormControls(['tktLine', 'otherTax', 'commisionWithoutTax', 'commisionPercentage', 'supplierCodeName'], true);
      this.enableFormControls(['descriptionapay'], false);
      this.accountingRemarks.bsp = '2';
      this.setInsuranceValue();
    }
    this.loadFormOfPaymentList(accRemark);
  }

  filterSupplierCode(typeCode) {
    this.filterSupplierCodeList = this.supplierCodeList.filter(
      supplier => supplier.type === typeCode);

    if (this.accountingRemarks.bsp === '2') {
      this.assignSupplierCode(typeCode);
      // this.assignDescription(typeCode);
      // } else {
      //   this.accountingRemarks.supplierCodeName = '';
    }

  }

  private assignSupplierCode(typeCode: any) {
    if (!this.IsInsurance) {
      if (typeCode === 'SEAT COSTS') {
        this.matrixAccountingForm.controls.supplierCodeName.patchValue('PFS');
        // this.accountingRemarks.supplierCodeName = 'PFS';
      } else {
        this.matrixAccountingForm.controls.supplierCodeName.patchValue('CGO');
        // this.accountingRemarks.supplierCodeName = 'CGO';
      }
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
    this.f.cardNumber.setValue('');
    // let pattern = '';
    // pattern = this.paymentHelper.creditcardMaxValidator(newValue);
    // this.matrixAccountingForm.controls.cardNumber.setValidators(Validators.pattern(pattern));
  }



  SetTktNumber() {
    const supCode = ['ACY', 'SOA', 'WJ3'];

    if (this.accountingRemarks.accountingTypeRemark === '1' && supCode.includes(this.accountingRemarks.supplierCodeName)) {
      this.matrixAccountingForm.controls.tktLine.setValidators(Validators.required);
    } else {
      this.matrixAccountingForm.controls.tktLine.clearValidators();
    }

    this.matrixAccountingForm.get('tktLine').updateValueAndValidity();
  }


  setInsuranceValue() {
    if (this.matrixAccountingForm.controls.segmentNo.value) {
      this.accountingRemarks.segmentNo = this.matrixAccountingForm.controls.segmentNo.value;
      const segmentList = this.matrixAccountingForm.controls.segmentNo.value.split(',');
      let isMLF = false;
      segmentList.forEach(segment => {
        if (this.isTypeINSExist(segment)) {
          isMLF = true;
        }
      });
      if (this.accountingRemarks.bsp === '2') {
        if (isMLF) {
          this.IsInsurance = true;
          this.name = 'Policy Confirmation Number:';
          this.matrixAccountingForm.controls.supplierCodeName.patchValue('MLF');
          this.matrixAccountingForm.controls.supplierCodeName.disable();
          this.matrixAccountingForm.controls.commisionPercentage.enable();
          this.matrixAccountingForm.controls.descriptionapay.disable();
        } else {
          this.IsInsurance = false;
          this.name = 'Supplier Confirmation Number:';
          // this.matrixAccountingForm.controls.supplierCodeName.patchValue('');
          //this.matrixAccountingForm.controls.supplierCodeName.enable();
          this.matrixAccountingForm.controls.descriptionapay.enable();
          this.matrixAccountingForm.controls.commisionPercentage.disable();
        }
      }

    }
  }

  loadData() {
    if (this.accountingRemarks.bsp === '2' && this.accountingRemarks.supplierCodeName === 'MLF') {
      this.IsInsurance = true;
      this.name = 'Policy Confirmation Number:';
      this.matrixAccountingForm.controls.supplierCodeName.disable();
      this.matrixAccountingForm.controls.commisionPercentage.enable();
    } else {
      this.IsInsurance = false;
      this.name = 'Supplier Confirmation Number:';
    }
    this.matrixAccountingForm.controls.segmentNo.setValue(this.accountingRemarks.segmentNo);
  }

  isTypeINSExist(segmentNo: any) {
    const segmentDetails = this.pnrService.getSegmentTatooNumber();
    let res = false;
    segmentDetails.forEach(element => {
      if (segmentDetails.length > 0) {
        const details = {
          id: element.lineNo,
          name: element.longFreeText,
          status: element.status,
          segmentType: element.segmentType,
          airlineCode: element.airlineCode,
          freeText: element.freetext
        };
        if (details.id === segmentNo) {
          const regexp: RegExp = /(?<=TYP-)(\w{3})/;
          if (this.utilHelper.getRegexValue(details.freeText, regexp) === 'INS') {
            res = true;
          }
        }
      }
    });
    return res;
  }

}
