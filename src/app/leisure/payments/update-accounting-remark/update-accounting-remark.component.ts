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
  isInsurance = false;
  isAddNew = false;
  isCopy = false;
  tempAccounting: MatrixAccountingModel;

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
    this.tempAccounting = new MatrixAccountingModel();
    this.loadBSPList();
    this.loadVendorCode();
    this.loadAccountingRemarkList();
    this.loadDescription();
    this.loadFareType();
    this.passPurchaseList = this.ddbService.getACPassPurchaseList();
    // this.initializeCopy();
  }

  ngOnInit() {
    this.segments = this.pnrService.getSegmentList();
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
      departureCity: new FormControl('', []),
      penaltyGst: new FormControl(''),
      penaltyHst: new FormControl(''),
      penaltyQst: new FormControl(''),
      penaltyBaseAmount: new FormControl(''),
      originalTktLine: new FormControl(''),
      duplicateFare: new FormControl('')
    });

    this.name = 'Supplier Confirmation Number:';
    this.utilHelper.validateAllFields(this.matrixAccountingForm);
  }

  loadBSPList() {
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
      { itemText: 'CA - Mastercard', itemValue: 'CA' },
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
      { itemText: 'Air Canada Pass Purchase', itemValue: 'ACPP' },
      { itemText: 'NonBSP Air Exchange', itemValue: 'NAE' }
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
      this.accountingRemark.supplierCodeName = '';
    }

    // initial state
    this.matrixAccountingForm.get('supplierConfirmatioNo').setValidators([Validators.maxLength(20)]);
    this.enableFormControls(['fop'], false);
    this.enableFormControls(['departureCity'], true);
    this.setRequired(['tktLine', 'departureCity', 'originalTktLine'], false);
    switch (accRemark) {
      case 'INS':
        this.isInsurance = true;
        this.name = 'Policy Confirmation Number:';
        this.matrixAccountingForm.controls.supplierCodeName.patchValue('MLF');
        this.enableFormControls(['supplierCodeName', 'descriptionapay', 'tktLine', 'otherTax', 'commisionWithoutTax'], true);
        this.enableFormControls(['commisionPercentage', 'segmentNo'], false);
        this.accountingRemark.bsp = '3';
        // this.eventEmitterService.onFirstComponentButtonClick();
        break;
      case '0':
        this.enableFormControls(['tktLine', 'otherTax', 'commisionWithoutTax', 'commisionPercentage'], true);
        this.enableFormControls(['descriptionapay', 'supplierCodeName', 'segmentNo'], false);
        this.accountingRemark.bsp = '2';
        this.isInsurance = false;
        break;
      case 'ACPR':
      case 'ACPP':
        this.accountingRemark.fop = 'CC';
        this.accountingRemark.supplierCodeName = 'ACJ';
        if (accRemark === 'ACPP') {
          this.enableFormControls(
            [
              'fop',
              'otherTax',
              'commisionWithoutTax',
              'supplierCodeName',
              'descriptionapay',
              'commisionPercentage',
              'departureCity',
              'segmentNo'
            ],
            true
          );
          this.matrixAccountingForm.controls.supplierConfirmatioNo.clearValidators();
          this.matrixAccountingForm.get('supplierConfirmatioNo').setValidators([Validators.maxLength(7)]);
          this.matrixAccountingForm.get('supplierConfirmatioNo').updateValueAndValidity();
        } else {
          this.enableFormControls(
            ['fop', 'otherTax', 'commisionWithoutTax', 'supplierCodeName', 'descriptionapay', 'commisionPercentage', 'departureCity'],
            true
          );
          this.enableFormControls(['segmentNo'], false);
        }

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
      case 'NAE':
        this.accountingRemark.bsp = '1';
        this.enableFormControls(['tktLine', 'otherTax', 'commisionWithoutTax', 'supplierCodeName'], false);
        this.enableFormControls(['descriptionapay', 'commisionPercentage'], true);
        if (this.isAddNew) {
          this.accountingRemark.supplierCodeName = 'ACY';
          this.checkSupplierCode();
        }

        break;
      default:
        if (this.isAddNew && accRemark === '1') {
          this.accountingRemark.supplierCodeName = 'ACY';
          this.checkSupplierCode();
        }

        this.enableFormControls(['tktLine', 'otherTax', 'commisionWithoutTax', 'supplierCodeName', 'segmentNo'], false);
        this.enableFormControls(['descriptionapay', 'commisionPercentage'], true);
        this.accountingRemark.bsp = '1';
        this.isInsurance = false;
        this.name = 'Supplier Confirmation Number:';
        break;
    }

    this.filterSupplierCodeList = [];
    this.filterSupplierCode(accRemark);
    this.loadFormOfPaymentList(accRemark);
    this.assignSupplierCode(this.accountingRemark.descriptionapay);
    this.setTktNumber(this.accountingRemark.supplierCodeName);
  }

  setRequired(controls: string[], isRequired: boolean) {
    controls.forEach((x) => {
      try {
        if (isRequired) {
          this.matrixAccountingForm.get(x).setValidators([Validators.required]);
        } else {
          this.matrixAccountingForm.get(x).clearValidators();
        }
      } catch (e) {
        console.log(JSON.stringify(e));
      }
    });
  }

  filterSupplierCode(typeCode) {
    const val = ['12', '5', '1', '6', '4', 'NAE'];
    const type = ['TOUR', 'SEA', 'AIR', 'CAR', 'RAIL', 'AIR'];
    const indx = val.indexOf(typeCode);
    if (indx >= 0) {
      this.filterSupplierCodeList = this.ddbService.getSupplierCodes(type[indx]);

      // Trim supplier codes. Refer to DE2253.
      this.filterSupplierCodeList.forEach((filterSupplierCode) => {
        filterSupplierCode.supplierCode = filterSupplierCode.supplierCode.trim();
      });
    }
  }

  private assignSupplierCode(typeCode: any) {
    if (this.accountingRemark.bsp === '2') {
      if (!this.isInsurance) {
        if (typeCode === 'SEAT COSTS') {
          this.matrixAccountingForm.controls.supplierCodeName.patchValue('PFS');
        } else {
          this.matrixAccountingForm.controls.supplierCodeName.patchValue('CGO');
        }
        this.setTktNumber(this.matrixAccountingForm.controls.supplierCodeName);
      }
    }
  }

  FormOfPaymentChange(newValue) {
    switch (newValue) {
      case 'CC':
      case 'AP':
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

  setTktNumber(code) {
    const supCode = ['ACY', 'SOA', 'WJ3'];
    const type = this.accountingRemark.accountingTypeRemark;
    if ((type === '1' || type === 'NAE') && supCode.indexOf(code) >= 0) {
      this.matrixAccountingForm.controls.tktLine.setValidators(Validators.required);
      if (type === 'NAE') {
        this.matrixAccountingForm.controls.originalTktLine.setValidators(Validators.required);
      }
    } else {
      this.matrixAccountingForm.controls.tktLine.clearValidators();
      this.matrixAccountingForm.controls.originalTktLine.clearValidators();
    }

    this.matrixAccountingForm.get('tktLine').updateValueAndValidity();
    this.matrixAccountingForm.get('originalTktLine').updateValueAndValidity();

    if (this.accountingRemark.bsp === '2') {
      // remove RBC Points if CGO and PFS
      if (['CGO', 'PFS'].indexOf(this.accountingRemark.supplierCodeName) > -1) {
        //
        this.formOfPaymentList = this.formOfPaymentList.filter((x) => x.itemText !== 'RBC Points');
      } else {
        if (this.formOfPaymentList.filter((x) => x.itemText === 'RBC Points').length === 0) {
          this.formOfPaymentList.push({ itemText: 'RBC Points', itemValue: 'CK' });
        }
      }
    }
  }

  setInsuranceValue() {
    if (this.matrixAccountingForm.controls.segmentNo.value) {
      this.accountingRemark.segmentNo = this.matrixAccountingForm.controls.segmentNo.value;
      if (
        this.matrixAccountingForm.controls.accountingTypeRemark.value === 'NAE' ||
        this.matrixAccountingForm.controls.accountingTypeRemark.value === '1'
      ) {
        this.checkSupplierCode();
      }
      // const segmentList = this.matrixAccountingForm.controls.segmentNo.value.split(',');
    } else {
      this.matrixAccountingForm.controls.supplierCodeName.patchValue('');
    }
    this.setTktNumber(this.accountingRemark.supplierCodeName);
  }

  checkSupplierCode() {
    let supplierCode = '';
    let segmentNos = [];
    const airlineSupplierList: Array<any> = [
      { airline: 'AC', supplierCode: 'ACY' },
      { airline: 'WS', supplierCode: 'WJ3' },
      { airline: 'PD', supplierCode: 'PTA' },
      { airline: '9M', supplierCode: 'CMA' },
      { airline: 'MO', supplierCode: 'C5A' },
      { airline: 'YP', supplierCode: 'KP9' },
      { airline: '4N', supplierCode: 'A5N' },
      { airline: '8P', supplierCode: 'PF3' },
      { airline: 'WJ', supplierCode: 'ALO' },
      { airline: 'WN', supplierCode: 'SOA' }
    ];

    if (this.matrixAccountingForm.controls.segmentNo.value) {
      segmentNos = this.matrixAccountingForm.controls.segmentNo.value.split(',');
      const segmentDetails = this.pnrService.getSegmentList();
      segmentDetails.forEach((segments) => {
        segmentNos.forEach((segment) => {
          if (segment === segments.lineNo) {
            const look = airlineSupplierList.find((x) => segments.airlineCode === x.airline);
            if (look && (supplierCode === '' || supplierCode === look.supplierCode) && segments.segmentType === 'AIR') {
              supplierCode = look.supplierCode;
            } else {
              supplierCode = 'OTH';
            }
          }
        });
      });
    }

    if (supplierCode === 'OTH') {
      supplierCode = '';
    }
    this.matrixAccountingForm.controls.supplierCodeName.patchValue(supplierCode);
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

  isTypeINSExist(segmentNo: any) {
    const segmentDetails = this.pnrService.getSegmentList();
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

  select(copyFields) {
    // let tempAccounting: MatrixAccountingModel;
    this.initializeCopy();
    this.matrixAccountingForm.controls.passengerNo.patchValue('');
    this.matrixAccountingForm.controls.tktLine.patchValue('');

    if (copyFields === 'fare') {
      this.matrixAccountingForm.controls.vendorCode.patchValue('');
      this.matrixAccountingForm.controls.fop.patchValue('');
      this.matrixAccountingForm.controls.ccNo.patchValue('');
      this.matrixAccountingForm.controls.expDate.patchValue('');
    } else {
      this.matrixAccountingForm.controls.fop.patchValue(this.tempAccounting.fop);
      if (this.tempAccounting.vendorCode) {
        this.matrixAccountingForm.controls.vendorCode.patchValue(this.tempAccounting.vendorCode);
        this.matrixAccountingForm.controls.ccNo.patchValue(this.tempAccounting.cardNumber);
        this.matrixAccountingForm.controls.expDate.patchValue(this.tempAccounting.expDate);
      }
    }
  }

  initializeCopy() {
    if (!this.tempAccounting.fop) {
      this.tempAccounting.fop = this.matrixAccountingForm.controls.fop.value;
      if (this.matrixAccountingForm.controls.vendorCode.value) {
        this.tempAccounting.vendorCode = this.matrixAccountingForm.controls.vendorCode.value;
        this.tempAccounting.cardNumber = this.matrixAccountingForm.controls.cardNumber.value;
        this.tempAccounting.expDate = this.matrixAccountingForm.controls.expDate.value;
      }
    }
  }
}
