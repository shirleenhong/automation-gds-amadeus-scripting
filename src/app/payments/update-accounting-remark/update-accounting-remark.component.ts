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
  formOfPaymentList: Array<SelectItem>;
  bspList: Array<SelectItem>;
  vendorCodeList: Array<SelectItem>;
  supplierCodeList: Array<any>;
  filterSupplierCodeList: Array<any>;
  passengerList: Array<any>;
  segments = [];
  matrixAccountingForm: FormGroup;
  isSubmitted: boolean;
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
    // this.loadPassengerList();



  }

  ngOnInit() {

    this.supplierCodeList = this.ddbService.getSupplierCode();
    this.segments = this.pnrService.getSegmentTatooNumber();
    this.matrixAccountingForm = new FormGroup({
      accountingTypeRemark: new FormControl('', [Validators.required]),
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
      description: new FormControl('', [Validators.required]),
      bsp: new FormControl('', [Validators.required])
    });
  }



  IsBSP(testvalue) {
    if (testvalue === '1') {
      this.loadAccountingRemarkList(testvalue);
      this.loadFormOfPaymentList(testvalue);
      this.enableFormControls(['tktLine', 'otherTax', 'commisionWithoutTax'], false);
      this.enableFormControls(['description'], true);
      this.accountingRemarks.bsp = '1';
    } else {
      this.loadAccountingRemarkList(testvalue);
      this.loadFormOfPaymentList(testvalue);
      this.enableFormControls(['tktLine', 'otherTax', 'commisionWithoutTax'], true);
      this.enableFormControls(['description'], false);
      this.accountingRemarks.bsp = '2';
    }
    // return true;
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
    if (testvalue === '1') {
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

  loadAccountingRemarkList(testvalue) {

    if (testvalue === '1') {
      this.accountingRemarkList = [{ itemText: '', itemValue: '' },
      { itemText: 'Tour Accounting Remark  ', itemValue: '12' },
      { itemText: 'Cruise Accounting Remark', itemValue: '5' },
      { itemText: 'NonBSP Air Accounting Remark', itemValue: '1' },
      { itemText: 'Rail Accounting Remark', itemValue: '4' },
      { itemText: 'Limo Accounting Remark', itemValue: '6' }
      ];
    } else {
      this.accountingRemarkList = [{ itemText: '', itemValue: '' },
      { itemText: 'SEAT COSTS', itemValue: 'SEAT COSTS' },
      { itemText: 'MAPLE LEAF LOUNGE COSTS', itemValue: 'MAPLE LEAF' },
      { itemText: 'PET TRANSPORTATION', itemValue: 'PET TRANSPORTATION' },
      { itemText: 'FREIGHT COSTS', itemValue: 'FREIGHT COSTS' },
      { itemText: 'BAGGAGE FEES', itemValue: 'BAGGAGE FEES' },
      { itemText: 'FOOD COSTS', itemValue: 'FOOD COSTS' },
      { itemText: 'OTHER COSTS', itemValue: 'OTHER COSTS' }
      ];
    }
  }

  filterSupplierCode(typeCode) {
    this.filterSupplierCodeList = this.supplierCodeList.filter(
      supplier => supplier.type === typeCode);

    if (this.accountingRemarks.bsp === '2') {
      this.assignSupplierCode(typeCode);
      this.assignDescription(typeCode);
    } else {
      this.accountingRemarks.supplierCodeName = '';
    }
    this.setInsuranceValue();
  }

  assignDescription(typeCode: any) {
    if (typeCode === 'OTHER COSTS') {
      this.accountingRemarks.description = '';
      this.matrixAccountingForm.controls.description.enable();
      this.matrixAccountingForm.controls.description.setValidators(Validators.required);
    } else {
      this.accountingRemarks.description = typeCode;
      this.matrixAccountingForm.controls.description.disable();
    }
  }

  private assignSupplierCode(typeCode: any) {
    if (typeCode === 'SEAT COSTS') {
      this.accountingRemarks.supplierCodeName = 'PFS';
    } else {
      this.accountingRemarks.supplierCodeName = 'CGO';
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



  SetTktNumber(supValue) {
    const supCode = ['ACY', 'SOA', 'WJ3'];

    if (this.accountingRemarks.accountingTypeRemark === '1' && supCode.includes(supValue)) {
      this.matrixAccountingForm.controls.tktLine.setValidators(Validators.required);
    } else {
      this.matrixAccountingForm.controls.tktLine.clearValidators();
    }

    this.matrixAccountingForm.get('tktLine').updateValueAndValidity();
  }

  setInsuranceValue() {

    if (this.matrixAccountingForm.controls.segmentNo.value !== undefined) {
      const segmentList = this.matrixAccountingForm.controls.segmentNo.value.split(',');
      let isMLF = false;
      segmentList.forEach(segment => {
        if (this.isTypeINSExist(segment)) {
          isMLF = true;
        }
      });

      if (isMLF) {
        this.matrixAccountingForm.controls.supplierCodeName.patchValue('MLF');
        this.matrixAccountingForm.controls.supplierCodeName.disable();
      } else {
        this.assignSupplierCode(this.matrixAccountingForm.controls.accountingTypeRemark.value);
        this.matrixAccountingForm.controls.supplierCodeName.enable();
      }
    }
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
          freeText: element.freeText
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
