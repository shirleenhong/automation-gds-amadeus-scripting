import { Component, Input, OnInit } from '@angular/core';
import { MatrixAccountingModel } from 'src/app/models/pnr/matrix-accounting.model';
import { SelectItem } from 'src/app/models/select-item.model';
import { PnrService } from 'src/app/service/pnr.service';
import { DDBService } from 'src/app/service/ddb.service';
import { FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
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
  accountingRemark: MatrixAccountingModel;

  // // TODO: Via service
  accountingRemarkList: Array<SelectItem>;
  descriptionList: Array<SelectItem>;
  formOfPaymentList: Array<SelectItem>;
  bspList: Array<SelectItem>;
  vendorCodeList: Array<SelectItem>;
  supplierCodeList: Array<any>;
  filterSupplierCodeList: Array<any>;
  passengerList: Array<any>;
  fareTypeList = [];
  passPurchaseList = [];
  segments = [];
  matrixAccountingForm: FormGroup;
  isSubmitted: boolean;
  name: string;
  IsInsurance = false;
  isAddNew = false;
  // PaymentModeList: Array<SelectItem>;
  // @ViewChild('bankAccount') bankAccEl: ElementRef;

  constructor(
    public activeModal: BsModalService,
    private pnrService: PnrService,
    public modalRef: BsModalRef,
    private ddbService: DDBService,
    private utilHelper: UtilHelper
  ) {
    this.accountingRemarkList = new Array<SelectItem>();
    this.formOfPaymentList = new Array<SelectItem>();
    this.accountingRemark = new MatrixAccountingModel();
    this.loadBspList();
    this.loadVendorCode();
    this.loadAccountingRemarkList();
    this.loadDescription();
    this.loadFareType();
    this.passPurchaseList = this.ddbService.getAcPassPurchaseList();
    // this.loadPassengerList();
  }

  ngOnInit() {
    this.segments = this.pnrService.getSegmentTatooNumber();
    this.passengerList = this.pnrService.getPassengers();
    this.matrixAccountingForm = new FormGroup({
      accountingTypeRemark: new FormControl('', [Validators.required]),
      confirmationLabel: new FormControl(''),
      segmentNo: new FormControl('', [Validators.required, Validators.pattern('[0-9]+(,[0-9]+)*'), validateSegmentNumbers(this.segments)]),
      supplierCodeName: new FormControl('', [Validators.required, Validators.maxLength(3)]),
      passengerNo: new FormControl('', []),
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
      commisionPercentage: new FormControl('', [Validators.required]),
      passRelate: new FormControl('', []),
      passPurchase: new FormControl('', []),
      fareType: new FormControl('', []),
      departureCity: new FormControl('', [])
    });

    this.name = 'Supplier Confirmation Number:';
    this.utilHelper.validateAllFields(this.matrixAccountingForm);
  }

  loadBspList() {
    this.bspList = [{ itemText: '', itemValue: '' }, { itemText: 'NO', itemValue: '1' }, { itemText: 'YES', itemValue: '2' }];
  }

  loadPassengerList() {
    this.passengerList = [
      { itemText: '', itemValue: '' },
      { itemText: 'ALL Passenger', itemValue: 'ALL' },
      { itemText: 'PER Passenger', itemValue: 'PER' }
    ];
  }

  loadFormOfPaymentList(testvalue) {
    if (testvalue !== '0') {
      this.formOfPaymentList = [
        { itemText: '', itemValue: '' },
        { itemText: 'Credit Card', itemValue: 'CC' },
        { itemText: 'Cash', itemValue: 'CA' },
        { itemText: 'Cheque', itemValue: 'CK' },
        { itemText: 'Agency Plastic Card', itemValue: 'AP' }
      ];
    } else {
      this.formOfPaymentList = [
        { itemText: '', itemValue: '' },
        { itemText: 'Credit Card', itemValue: 'CC' },
        { itemText: 'Agency Plastic Card', itemValue: 'AP' },
        { itemText: 'RBC Points', itemValue: 'CK' }
      ];
    }
  }

  loadVendorCode() {
    this.vendorCodeList = [
      { itemText: '', itemValue: '' },
      { itemText: 'VI- Visa', itemValue: 'VI' },
      { itemText: 'MC - Mastercard', itemValue: 'MC' },
      { itemText: 'AX - American Express', itemValue: 'AX' },
      { itemText: 'DC -Diners', itemValue: 'DC' }
    ];
  }

  loadFareType() {
    this.fareTypeList = [
      { itemText: '', itemValue: '' },
      { itemText: 'FLEX', itemValue: 'FLEX' },
      { itemText: 'LATITUDE', itemValue: 'LATITUDE' },
      { itemText: 'EXECUTIVE', itemValue: 'EXECUTIVE' },
      { itemText: 'TANGO ', itemValue: 'TANGO' },
      { itemText: 'PREMIUM ECONOMY', itemValue: 'PREMIUM ECONOMY' }
    ];
  }

  loadAccountingRemarkList() {
    this.accountingRemarkList = [
      { itemText: '', itemValue: '' },
      { itemText: 'Tour Accounting Remark  ', itemValue: '12' },
      { itemText: 'Cruise Accounting Remark', itemValue: '5' },
      { itemText: 'NonBSP Air Accounting Remark', itemValue: '1' },
      { itemText: 'Rail Accounting Remark', itemValue: '4' },
      { itemText: 'Limo Accounting Remark', itemValue: '6' },
      { itemText: 'Insurance Remark', itemValue: 'INS' },
      { itemText: 'Apay Accounting Remark', itemValue: '0' },
      { itemText: 'Air Canada Pass Redemption', itemValue: 'ACPR' },
      { itemText: 'Air Canada Pass Purchase', itemValue: 'ACPP' }
    ];
  }

  loadDescription() {
    this.descriptionList = [
      { itemText: '', itemValue: '' },
      { itemText: 'SEAT COSTS', itemValue: 'SEAT COSTS' },
      { itemText: 'MAPLE LEAF LOUNGE COSTS', itemValue: 'MAPLE LEAF' },
      { itemText: 'PET TRANSPORTATION', itemValue: 'PET TRANSPORTATION' },
      { itemText: 'FREIGHT COSTS', itemValue: 'FREIGHT COSTS' },
      { itemText: 'BAGGAGE FEES', itemValue: 'BAGGAGE FEES' },
      { itemText: 'FOOD COSTS', itemValue: 'FOOD COSTS' },
      { itemText: 'OTHER COSTS', itemValue: 'OTHER COSTS' }
    ];
  }

  onChangeAccountingType(accRemark) {
    if (this.isAddNew) {
      this.accountingRemark.vendorCode = '';
    }
    // initial state
    this.enableFormControls(['fop'], false);
    this.enableFormControls(['departureCity'], true);
    this.matrixAccountingForm.get('departureCity').clearValidators();
    switch (accRemark) {
      case 'INS':
        this.IsInsurance = true;
        this.name = 'Policy Confirmation Number:';
        this.matrixAccountingForm.controls.supplierCodeName.patchValue('MLF');
        this.enableFormControls(['supplierCodeName', 'descriptionapay', 'tktLine', 'otherTax', 'commisionWithoutTax'], true);
        this.enableFormControls(['commisionPercentage'], false);
        this.accountingRemark.bsp = '3';
        // this.eventEmitterService.onFirstComponentButtonClick();
        break;
      case '0':
        this.enableFormControls(['tktLine', 'otherTax', 'commisionWithoutTax', 'commisionPercentage'], true);
        this.enableFormControls(['descriptionapay', 'supplierCodeName'], false);
        this.accountingRemark.bsp = '2';
        this.IsInsurance = false;
        break;
      case 'ACPR':
      case 'ACPP':
        this.accountingRemark.fop = 'CC';
        this.accountingRemark.supplierCodeName = 'ACJ';
        this.enableFormControls(
          ['fop', 'otherTax', 'commisionWithoutTax', 'supplierCodeName', 'descriptionapay', 'commisionPercentage', 'departureCity'],
          true
        );
        this.accountingRemark.bsp = '1';
        this.enableFormControls(['tktLine'], false);
        this.matrixAccountingForm.controls.tktLine.clearValidators();
        this.matrixAccountingForm.controls.tktLine.setValidators(Validators.required);
        if (accRemark === 'ACPR') {
          if (this.isAddNew) {
            this.accountingRemark.qst = '0.00';
            this.accountingRemark.baseAmount = '0.00';
            this.accountingRemark.hst = '0.00';
            this.accountingRemark.gst = '0.00';
          }
        } else {
          if (this.isAddNew) {
            this.accountingRemark.qst = '';
            this.accountingRemark.baseAmount = '';
            this.accountingRemark.hst = '';
            this.accountingRemark.gst = '';
          }
          this.enableFormControls(['departureCity'], false);
          this.matrixAccountingForm.get('departureCity').setValidators([Validators.required]);
        }

        break;
      default:
        this.enableFormControls(['tktLine', 'otherTax', 'commisionWithoutTax', 'supplierCodeName'], false);
        this.enableFormControls(['descriptionapay', 'commisionPercentage'], true);
        this.accountingRemark.bsp = '1';
        this.setTktNumber();
        this.IsInsurance = false;
        this.name = 'Supplier Confirmation Number:';
        break;
    }
    this.filterSupplierCodeList = [];
    this.filterSupplierCode(accRemark);
    this.loadFormOfPaymentList(accRemark);
    this.assignSupplierCode(this.accountingRemark.descriptionapay);
  }

  filterSupplierCode(typeCode) {
    const val = ['12', '5', '1', '6', '4'];
    const type = ['TOUR', 'FERRY', 'AIR', 'LIMO', 'RAIL'];
    const indx = val.indexOf(typeCode);
    if (indx >= 0) {
      this.filterSupplierCodeList = this.ddbService.getSupplierCodes(type[indx]);
    }
  }

  private assignSupplierCode(typeCode: any) {
    if (this.accountingRemark.bsp === '2') {
      if (!this.IsInsurance) {
        if (typeCode === 'SEAT COSTS') {
          this.matrixAccountingForm.controls.supplierCodeName.patchValue('PFS');
        } else {
          this.matrixAccountingForm.controls.supplierCodeName.patchValue('CGO');
        }
      }
    }
  }

  formOfPaymentChange(newValue) {
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
    controls.forEach((c) => {
      if (disabled) {
        this.matrixAccountingForm.get(c).disable();
      } else {
        this.matrixAccountingForm.get(c).enable();
      }
    });
  }

  get f() {
    return this.matrixAccountingForm.controls;
  }

  saveAccounting() {
    if (this.matrixAccountingForm.invalid) {
      alert('Please Complete And Complete all the required Information');
      this.isSubmitted = false;
      return;
    }
    this.isSubmitted = true;
    this.modalRef.hide();
  }

  getAllErrors(): { [key: string]: any } | null {
    let hasError = false;
    const result = Object.keys(this.matrixAccountingForm.controls).reduce(
      (acc, key) => {
        const control = this.matrixAccountingForm.get(key);

        const errors =
          control instanceof FormGroup || control instanceof FormArray ? this.getAllErrors() : control.touched ? control.errors : '';
        if (errors) {
          acc[key] = errors;
          hasError = true;
        }
        return acc;
      },
      {} as { [key: string]: any }
    );
    return hasError ? result : null;
  }

  creditcardMaxValidator() {
    this.f.cardNumber.setValue('');
    // let pattern = '';
    // pattern = this.paymentHelper.creditcardMaxValidator(newValue);
    // this.matrixAccountingForm.controls.cardNumber.setValidators(Validators.pattern(pattern));
  }

  setTktNumber() {
    const supCode = ['ACY', 'SOA', 'WJ3', 'ACJ'];

    if (this.accountingRemark.accountingTypeRemark === '1' && supCode.includes(this.accountingRemark.supplierCodeName)) {
      this.matrixAccountingForm.controls.tktLine.setValidators(Validators.required);
    } else {
      this.matrixAccountingForm.controls.tktLine.clearValidators();
    }

    this.matrixAccountingForm.get('tktLine').updateValueAndValidity();
  }

  setInsuranceValue() {
    if (this.matrixAccountingForm.controls.segmentNo.value) {
      this.accountingRemark.segmentNo = this.matrixAccountingForm.controls.segmentNo.value;
      // const segmentList = this.matrixAccountingForm.controls.segmentNo.value.split(',');
    }
  }

  loadData() {
    this.matrixAccountingForm.controls.segmentNo.setValue(this.accountingRemark.segmentNo);
  }

  showPassengerRelate() {
    if (this.matrixAccountingForm.controls.passRelate.value) {
      this.enableFormControls(['passengerNo'], false);
      this.matrixAccountingForm.controls.passengerNo.setValidators(Validators.required);
    } else {
      this.enableFormControls(['passengerNo'], true);
      this.matrixAccountingForm.controls.tktLine.clearValidators();
    }
  }

  isTypeInsExist(segmentNo: any) {
    const segmentDetails = this.pnrService.getSegmentTatooNumber();
    let res = false;
    segmentDetails.forEach((element) => {
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
          const regx = '/(?<=TYP-)(w{3})/';
          if (this.utilHelper.getRegexValue(details.freeText, regx) === 'INS') {
            res = true;
          }
        }
      }
    });
    return res;
  }
}
