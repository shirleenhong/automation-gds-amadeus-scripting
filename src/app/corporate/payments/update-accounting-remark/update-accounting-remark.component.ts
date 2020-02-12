import { Component, Input, OnInit } from '@angular/core';
import { MatrixAccountingModel } from 'src/app/models/pnr/matrix-accounting.model';
import { SelectItem } from 'src/app/models/select-item.model';
import { PnrService } from 'src/app/service/pnr.service';
import { DDBService } from 'src/app/service/ddb.service';
import { FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { UtilHelper } from 'src/app/helper/util.helper';
import { AirlineCorporatePass } from 'src/app/models/pnr/airline-corporate-pass.model';
import { AirlineCorporatePassService } from 'src/app/service/corporate/airline-corporate-pass.service';
// import { validateExpDate } from 'src/app/shared/validators/leisure.validators';
import { validateCreditCard, validateExpDate } from 'src/app/shared/validators/leisure.validators';

@Component({
  selector: 'app-update-accounting-remark',
  templateUrl: './update-accounting-remark.component.html',
  styleUrls: ['./update-accounting-remark.component.scss']
})
export class UpdateAccountingRemarkComponent implements OnInit {
  title: string;

  @Input()
  accountingRemark: MatrixAccountingModel;
  accountingRemarkList: Array<SelectItem>;

  airlineCorporatePasses: Array<AirlineCorporatePass>;

  vendorCodeList: Array<SelectItem>;
  supplierCodeList: Array<any>;
  passengerList: Array<any>;
  fareTypeList = [];
  billingTypeList = [];
  passPurchaseList = [];
  matrixAccountingForm: FormGroup;
  isSubmitted: boolean;
  name: string;
  ticketNumber: string;
  isAddNew = false;
  isCopy = false;
  isGdsFareRequired = false;
  filterSupplierCodeList: Array<any>;
  reasonCodeList: Array<SelectItem>;
  needFaretype = false;
  descriptionList: Array<SelectItem>;
  showOtherDescription = false;
  segments = [];
  isStandAlone = false;
  maxSegmentsCount = this.pnrService.getPassiveAirSegmentNumbers().length;

  constructor(
    public activeModal: BsModalService,
    private pnrService: PnrService,
    public modalRef: BsModalRef,
    private ddbService: DDBService,
    private utilHelper: UtilHelper,
    private airlineCorporatePassService: AirlineCorporatePassService
  ) {
    this.accountingRemarkList = new Array<SelectItem>();
    this.accountingRemark = new MatrixAccountingModel();
    this.loadFareType();
    this.loadReasonCodeList();
    this.passPurchaseList = this.ddbService.getACPassPurchaseList();
    this.filterSupplierCodeList = this.ddbService.supplierCodes;
    // this.initializeCopy();
  }

  ngOnInit() {
    this.matrixAccountingForm = new FormGroup({
      accountingTypeRemark: new FormControl('', [Validators.required]),
      confirmationLabel: new FormControl(''),
      segmentNo: new FormControl('', [Validators.required, Validators.pattern('[0-9]+(,[0-9]+)*')]),
      supplierCodeName: new FormControl('', [Validators.required, Validators.maxLength(3)]),
      passengerNo: new FormControl('', []),
      supplierConfirmatioNo: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      baseAmount: new FormControl('', [Validators.required]),
      commisionWithoutTax: new FormControl('', [Validators.required]),

      // Non BSP Exchange fields
      airlineRecordLocator: new FormControl('', []),
      gdsFare: new FormControl(0, []),
      consultantNo: new FormControl('', []),
      gst: new FormControl('', [Validators.required]),
      hst: new FormControl('', [Validators.required]),
      qst: new FormControl('', [Validators.required]),
      otherTax: new FormControl('', []),
      tktLine: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern('[0-9]{10}')]),
      descriptionapay: new FormControl('', []),
      commisionPercentage: new FormControl('', []),
      passRelate: new FormControl('', []),
      passPurchase: new FormControl('', []),
      fareType: new FormControl('', []),
      departureCity: new FormControl('', []),
      penaltyGst: new FormControl(''),
      penaltyHst: new FormControl(''),
      penaltyQst: new FormControl(''),
      penaltyBaseAmount: new FormControl(''),
      originalTktLine: new FormControl('', [Validators.maxLength(10), Validators.pattern('[0-9]{10}')]),
      duplicateFare: new FormControl(''),
      typeOfPass: new FormControl(''),
      otherDescription: new FormControl('', []),
      airlineCorporatePassId: new FormControl('', []),
      // segmentsCount: new FormControl(this.pnrService.getPassiveAirSegmentNumbers().length.toString(), []),
      segmentsCount: new FormControl('', []),
      segments: new FormArray([]),
      baseAmountRefund: new FormControl(''),
      gstRefund: new FormControl(''),
      hstRefund: new FormControl(''),
      qstRefund: new FormControl(''),
      otherTaxRefund: new FormControl(''),
      recordLocator: new FormControl(''),
      commisionRefund: new FormControl(''),
      oidOrigTicketIssue: new FormControl(''),
      additionalNotes1: new FormControl(''),
      additionalNotes2: new FormControl(''),
      cancelAll: new FormControl(''),
      vendorCode: new FormControl('', [Validators.required]),
      cardNumber: new FormControl('', [Validators.required, validateCreditCard('vendorCode')]),
      expDate: new FormControl('', [Validators.required, validateExpDate()]),
      billingType: new FormControl('', [Validators.required]),
      feeAmount: new FormControl('', [Validators.required]),
      segmentCost: new FormControl('', [Validators.required]),
      passExpDate: new FormControl('', [Validators.required, validateExpDate()])
    });
    this.name = 'Supplier Confirmation Number:';
    this.utilHelper.validateAllFields(this.matrixAccountingForm);
    this.onChanges();
    this.showFareType();
    this.loadDescription();
    this.getSegmentTatooValue();
    this.addCheckboxes();
    this.loadVendorCode();
  }

  getSegmentTatooValue() {
    const segmentDetails = this.pnrService.getSegmentList();
    segmentDetails.forEach((element) => {
      if (segmentDetails.length > 0) {
        const details = {
          id: element.lineNo,
          name: element.longFreeText,
          status: element.status,
          segmentType: element.segmentType,
          airlineCode: element.airlineCode,
          flightNumber: element.flightNumber,
          departureDate: element.departureDate,
          cityCode: element.cityCode,
          arrivalAirport: element.arrivalAirport
        };
        this.segments.push(details);
      }
    });
  }

  private addCheckboxes() {
    let forchecking = true;
    if (this.segments.length > 1) {
      forchecking = false;
    }

    this.segments.map((_o, i) => {
      const control = new FormControl(i === 0 && forchecking); // if first item set to true, else false
      (this.matrixAccountingForm.controls.segments as FormArray).push(control);
    });
    this.onCheckChange();
  }

  showFareType() {
    if (this.pnrService.hasPassRemark()) {
      this.needFaretype = true;
    }
  }

  loadPassengerList() {
    this.passengerList = [
      { itemText: '', itemValue: '' },
      { itemText: 'ALL Passenger', itemValue: 'ALL' },
      { itemText: 'PER Passenger', itemValue: 'PER' }
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

    this.billingTypeList = [
      { itemText: '', itemValue: '' },
      { itemText: 'POS Service Fee', itemValue: 'POS' },
      { itemText: 'Settlement Fee', itemValue: 'SETTLEMENT' }
    ];
  }

  loadAccountingRemarkList(standAlone) {
    if (!standAlone) {
      this.accountingRemarkList = [
        { itemText: '', itemValue: '' },
        { itemText: 'Air Canada Individual Pass Purchase', itemValue: 'ACPP' },
        { itemText: 'Airline Corporate Pass Redemption', itemValue: 'ACPR' },
        { itemText: 'Westjet Individual Pass Purchase', itemValue: 'WCPP' },
        { itemText: 'Porter Individual Pass Purchase', itemValue: 'PCPP' },
        { itemText: 'Airline Pass Cancellation with a Cancellation Fee', itemValue: 'ACPPC' },
        // { itemText: 'Westjet Individual Pass Purchase with Cancellation', itemValue: 'WCPPC' },
        // { itemText: 'Porter Individual Pass Purchase with Cancellation', itemValue: 'PCPPC' },
        { itemText: 'Non BSP Exchange', itemValue: 'NONBSPEXCHANGE' },
        { itemText: 'Non BSP Airline', itemValue: 'NONBSP' },
        { itemText: 'RAIL', itemValue: 'RAIL' },
        { itemText: 'APAY', itemValue: 'APAY' }
      ];
    } else {
      this.accountingRemarkList = [
        { itemText: '', itemValue: '' },
        { itemText: 'Air Canada Individual Pass Purchase', itemValue: 'ACPP' },
        { itemText: 'Westjet Individual Pass Purchase', itemValue: 'WCPP' },
        { itemText: 'Porter Individual Pass Purchase', itemValue: 'PCPP' },
        { itemText: 'Air North Individual Pass Purchase', itemValue: 'ANCPP' },
        { itemText: 'Pacific Coastal Individual Pass Purchase', itemValue: 'PCCPP' }
      ];
    }
  }

  cancelAll(checkValue) {
    const segment = this.matrixAccountingForm.controls.segments as FormArray;
    segment.controls.forEach((element) => {
      element.setValue(checkValue);
    });
    this.onCheckChange();
  }

  loadReasonCodeList() {
    this.reasonCodeList = [
      { itemText: '', itemValue: '' },
      { itemText: 'L - Low Fare', itemValue: 'L' }
    ];
  }

  loadPassType(accountingType) {
    switch (accountingType) {
      case 'ACPP':
      case 'ACPPC':
        this.passPurchaseList = this.ddbService.getACPassPurchaseList();
        break;
      case 'WCPP':
      case 'WCPPC':
        this.passPurchaseList = [
          { itemText: '', itemValue: '' },
          { itemText: 'Westjet Travel Pass', itemValue: 'Westjet Travel Pass' }
        ];
        break;
      case 'PCPP':
      case 'PCPPC':
        this.passPurchaseList = [
          { itemText: '', itemValue: '' },
          { itemText: 'Porter Travel Pass', itemValue: 'Porter Travel Pass' }
        ];
        break;
      default:
        break;
    }
  }

  onChangeAccountingType(accRemark) {
    this.filterSupplierCodeList = this.ddbService.supplierCodes;
    if (this.isAddNew) {
      this.accountingRemark.vendorCode = '';
      this.accountingRemark.supplierCodeName = '';
    }
    // initial state
    this.ticketNumber = 'Ticket Number: ';
    this.matrixAccountingForm.get('supplierConfirmatioNo').setValidators([Validators.maxLength(20)]);
    this.setRequired(['departureCity', 'originalTktLine'], false);
    this.setRequired(['tktLine'], true);
    this.enableFormControls(['descriptionapay', 'departureCity', 'supplierConfirmatioNo', 'originalTktLine', 'otherDescription'], false);
    this.enableFormControls(
      [
        'otherTax',
        'gdsFare',
        'segmentNo',
        'passPurchase',
        'fareType',
        'vendorCode',
        'cardNumber',
        'expDate',
        'billingType',
        'feeAmount',
        'segmentCost',
        'passExpDate'
      ],
      true
    );
    this.matrixAccountingForm.get('otherDescription').clearValidators();
    this.matrixAccountingForm.get('otherDescription').updateValueAndValidity();
    this.matrixAccountingForm.get('commisionWithoutTax').clearValidators();
    this.matrixAccountingForm.get('commisionWithoutTax').updateValueAndValidity();

    switch (accRemark) {
      case 'ACPPC':
        this.accountingRemark.supplierCodeName = '';
        this.enableFormControls(['otherTax'], false);
        this.enableFormControls(['commisionWithoutTax'], true);
        this.matrixAccountingForm.controls.gst.clearValidators();
        this.matrixAccountingForm.get('gst').updateValueAndValidity();
        this.matrixAccountingForm.controls.hst.clearValidators();
        this.matrixAccountingForm.get('hst').updateValueAndValidity();
        this.matrixAccountingForm.controls.qst.clearValidators();
        this.matrixAccountingForm.get('qst').updateValueAndValidity();
        this.matrixAccountingForm.controls.otherTax.clearValidators();
        this.matrixAccountingForm.get('otherTax').updateValueAndValidity();
        this.onCheckChange();

        break;
      case 'ACPP':
      case 'WCPP':
      case 'WCPPC':
      case 'PCPPC':
      case 'PCPP':
      case 'ANCPP':
      case 'PCCPP':
        accRemark === 'ACPP'
          ? (this.accountingRemark.supplierCodeName = 'ACJ')
          : accRemark === 'WCPP'
            ? (this.accountingRemark.supplierCodeName = 'WJP')
            : accRemark === 'PCPP'
              ? (this.accountingRemark.supplierCodeName = 'PTP')
              : accRemark === 'ANCPP'
                ? (this.accountingRemark.supplierCodeName = 'A5P')
                : (this.accountingRemark.supplierCodeName = 'PSI');

        this.PasspUrchaseControlValidators();
        this.enableFormControls(['fareType'], accRemark !== 'ACPP' && accRemark === 'ACPPC');
        break;
      case 'ACPR':
        this.configureACPRControls();
        break;
      case 'NONBSPEXCHANGE':
        this.enableFormControls(['otherTax', 'segmentNo', 'originalTktLine'], false);
        this.configureNonBSPExchangeControls();
        this.checkSupplierCode();
        this.enableFormControls(['fareType'], !this.needFaretype);
        break;
      case 'APAY':
        this.enableFormControls(['descriptionapay', 'supplierCodeName', 'otherTax', 'segmentNo', 'otherDescription'], false);
        this.enableFormControls(['departureCity', 'passPurchase', 'fareType', 'supplierConfirmatioNo'], true);
        this.ticketNumber = 'Ticket Number / Confirmation Number:';
        this.matrixAccountingForm.get('tktLine').setValidators([Validators.required, Validators.maxLength(10)]);
        this.matrixAccountingForm.get('tktLine').updateValueAndValidity();
        this.matrixAccountingForm.get('commisionWithoutTax').clearValidators();
        break;
      case 'NONBSP':
      case 'RAIL':
        if (accRemark === 'RAIL') {
          this.filterSupplierCodeList = this.ddbService.getSupplierCodes('RAIL');
          this.name = 'Rail Record Locator:';
        } else {
          this.name = 'Airline Record Locator:';
        }

        this.checkSupplierCode();
        this.enableFormControls(['supplierCodeName', 'otherTax', 'commisionWithoutTax', 'segmentNo'], false);
        this.enableFormControls(['descriptionapay', 'departureCity', 'passPurchase', 'fareType'], true);
        this.setRequired(['commisionWithoutTax'], false);
        // if (accRemark === 'NONBSP') {
        this.matrixAccountingForm.get('supplierConfirmatioNo').setValidators([Validators.required, Validators.maxLength(10)]);
        this.matrixAccountingForm.get('supplierConfirmatioNo').updateValueAndValidity();
        // }
        this.matrixAccountingForm.get('commisionWithoutTax').setValidators([Validators.required]);
        this.matrixAccountingForm.get('commisionWithoutTax').updateValueAndValidity();
        break;
      default:
        this.enableFormControls(['otherTax', 'commisionWithoutTax', 'segmentNo'], false);
        this.enableFormControls(['descriptionapay', 'commisionPercentage'], true);
        this.accountingRemark.bsp = '1';
        this.name = 'Supplier Confirmation Number:';
        this.setRequired(['tktLine'], true);
        this.matrixAccountingForm.get('commisionWithoutTax').setValidators([Validators.required]);
        this.matrixAccountingForm.get('commisionWithoutTax').updateValueAndValidity();
        break;
    }

    this.loadPassType(accRemark);
  }

  private PasspUrchaseControlValidators() {
    if (!this.isStandAlone) {
      this.matrixAccountingForm.get('gst').setValidators([Validators.required, Validators.maxLength(8)]);
      this.matrixAccountingForm.get('hst').setValidators([Validators.required, Validators.maxLength(8)]);
      this.matrixAccountingForm.get('qst').setValidators([Validators.required, Validators.maxLength(8)]);
      this.matrixAccountingForm.get('otherTax').setValidators([Validators.required, Validators.maxLength(8)]);
    } else {
      this.setRequired(['gst', 'hst', 'qst', 'otherTax'], false);
      this.clearValidity(['gst', 'hst', 'qst', 'otherTax', 'baseAmount']);
      this.enableFormControls(['vendorCode', 'cardNumber', 'expDate', 'billingType', 'feeAmount', 'segmentCost', 'passExpDate'], false);
      this.setRequired(['vendorCode', 'cardNumber', 'expDate', 'billingType', 'feeAmount', 'segmentCost', 'passExpDate'], true);
    }
    this.matrixAccountingForm.get('supplierConfirmatioNo').setValidators([Validators.required, Validators.maxLength(15)]);
    this.enableFormControls(['departureCity', 'passPurchase'], false);
    this.enableFormControls(['otherTax'], false);
    this.matrixAccountingForm.controls.supplierConfirmatioNo.clearValidators();
    this.matrixAccountingForm.get('supplierConfirmatioNo').updateValueAndValidity();
    this.matrixAccountingForm.get('departureCity').setValidators([Validators.required]);
    // this.enableFormControls(['otherTax'], false);
    // this.enableFormControls(['commisionWithoutTax'], true);
    if (this.isAddNew) {
      this.accountingRemark.qst = '';
      this.accountingRemark.baseAmount = '';
      this.accountingRemark.hst = '';
      this.accountingRemark.gst = '';
      this.setBaseAmount();
      this.matrixAccountingForm.get('gst').setValue('0.00');
      this.matrixAccountingForm.get('hst').setValue('0.00');
      this.matrixAccountingForm.get('qst').setValue('0.00');
      this.matrixAccountingForm.get('otherTax').setValue('0.00');
      this.matrixAccountingForm.get('commisionWithoutTax').setValue('0.00');
    }
  }

  configureNonBSPExchangeControls(): void {
    this.name = 'Airline Record Locator:';
    this.matrixAccountingForm
      .get('airlineRecordLocator')
      .setValidators([Validators.required, Validators.minLength(1), Validators.maxLength(10)]);

    this.matrixAccountingForm
      .get('supplierConfirmatioNo')
      .setValidators([Validators.required, Validators.minLength(1), Validators.maxLength(10)]);
    this.matrixAccountingForm.get('supplierConfirmatioNo').updateValueAndValidity();

    this.requireGDSFare();

    this.matrixAccountingForm.get('consultantNo').setValidators([Validators.minLength(3), Validators.maxLength(3)]);
  }

  /**
   * Configure form controls for Airlin Corporate Pass Redemption.
   */
  configureACPRControls(): void {
    this.name = 'Airline Record Locator';
    // Get AC segments only.
    this.airlineCorporatePasses = this.airlineCorporatePassService
      .getAll()
      .filter((x) => x.airlineCode === this.pnrService.segments[0].airlineCode);
    // this.airlineCorporatePasses = AirlineCorporatePass.getSampleData();
    this.checkSupplierCode();
    this.matrixAccountingForm.get('supplierConfirmatioNo').setValidators([Validators.required, Validators.maxLength(10)]);
    this.matrixAccountingForm.get('supplierConfirmatioNo').updateValueAndValidity();
    this.matrixAccountingForm.get('airlineCorporatePassId').setValidators([Validators.required]);
    this.matrixAccountingForm.get('gst').setValue('0.00');
    this.matrixAccountingForm.get('hst').setValue('0.00');
    this.matrixAccountingForm.get('qst').setValue('0.00');
    this.matrixAccountingForm.get('otherTax').setValue('0.00');
    this.matrixAccountingForm.get('commisionWithoutTax').setValue('0.00');
    this.matrixAccountingForm
      .get('segmentsCount')
      .setValidators([Validators.required, Validators.min(1), Validators.max(this.maxSegmentsCount)]);
    // this.matrixAccountingForm.get('segmentsCount').setValue(this.pnrService.getPassiveAirSegmentNumbers().length);
    this.enableFormControls(['otherTax', 'commisionWithoutTax', 'segmentNo'], false);
    this.requireGDSFare();
  }

  /**
   * Require GDS Fare if CFA remark is in [ZZB, 92Z, YVQ, YFV].
   */
  requireGDSFare(): void {
    const cfaLine = this.pnrService.getCFLine();
    if (cfaLine !== undefined) {
      if (['ZZB', '92Z', 'YVQ', 'YFV'].includes(cfaLine.cfa)) {
        this.matrixAccountingForm.get('gdsFare').setValidators([Validators.required, Validators.pattern('[0-9]*')]);
        this.matrixAccountingForm.get('gdsFare').enable();
        this.isGdsFareRequired = true;
      } else {
        this.matrixAccountingForm.get('gdsFare').disable();
        this.matrixAccountingForm.get('gdsFare').clearValidators();
        this.isGdsFareRequired = false;
      }
    }
  }

  /**
   * Log matrixAccountingForm validation errors for tracking.
   */
  // logFormValidationErrors() {
  //   console.log('================ matrixAccountingForm ERRORS: ================');
  //   Object.keys(this.matrixAccountingForm.controls).forEach((key) => {
  //     const controlErrors: ValidationErrors = this.matrixAccountingForm.get(key).errors;
  //     if (controlErrors != null) {
  //       Object.keys(controlErrors).forEach((keyError) => {
  //         console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
  //       });
  //     }
  //   });
  // }

  setMandatoryTicket(supCode: string[], isRequired: boolean) {
    if (supCode.indexOf(this.accountingRemark.supplierCodeName) >= 0 || isRequired) {
      this.matrixAccountingForm.controls.tktLine.setValidators(Validators.required);
      console.log('supCode: ' + this.accountingRemark.supplierCodeName);
    } else {
      this.matrixAccountingForm.controls.tktLine.clearValidators();
      console.log('supCode: ' + this.accountingRemark.supplierCodeName);
    }
    this.matrixAccountingForm.get('tktLine').markAsTouched({ onlySelf: true });
    this.matrixAccountingForm.get('tktLine').updateValueAndValidity({ onlySelf: true, emitEvent: true });
  }

  getAirlineCode(segmentno) {
    const segments = segmentno.split(',');
    const air = this.pnrService.getSegmentList().filter((x) => x.segmentType === 'AIR' && x.lineNo === segmentno);
    if (air && segments.length === 1) {
      return air[0].airlineCode;
    }
    return null;
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

  enableFormControls(controls: string[], disabled: boolean) {
    controls.forEach((c) => {
      if (disabled) {
        this.matrixAccountingForm.get(c).disable();
      } else {
        this.matrixAccountingForm.get(c).enable();
      }
    });
  }

  clearValidity(controls: string[]) {
    controls.forEach((c) => {
      this.matrixAccountingForm.get(c).clearValidators();
      this.matrixAccountingForm.get(c).updateValueAndValidity();
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

    // Set the selected airlineCorporatePass into the accountingRemark.
    if (this.accountingRemark.accountingTypeRemark === 'ACPR') {
      this.accountingRemark.airlineCorporatePass = this.airlineCorporatePassService.getById(
        this.matrixAccountingForm.get('airlineCorporatePassId').value
      );
    }

    this.isSubmitted = true;
    this.modalRef.hide();
  }

  getAllErrors(): { [key: string]: any } | null {
    let hasError = false;
    const result = Object.keys(this.matrixAccountingForm.controls).reduce((acc, key) => {
      const control = this.matrixAccountingForm.get(key);

      const errors =
        control instanceof FormGroup || control instanceof FormArray ? this.getAllErrors() : control.touched ? control.errors : '';
      if (errors) {
        acc[key] = errors;
        hasError = true;
      }
      return acc;
    }, {} as { [key: string]: any });
    return hasError ? result : null;
  }

  checkSupplierCode() {
    if (this.accountingRemark.accountingTypeRemark === 'APAY') {
      return;
    }

    let supplierCode = '';
    let segmentNos = [];
    const airlineSupplierList: Array<any> = [
      { airline: 'AC', supplierCode: 'ACY' },
      { airline: 'WS', supplierCode: 'WJ3' },
      { airline: 'PD', supplierCode: 'PTA' },
      { airline: '9M', supplierCode: 'CMA' },
      { airline: 'MO', supplierCode: 'C5A' },
      { airline: 'YP', supplierCode: 'K9P' },
      { airline: '4N', supplierCode: 'A5N' },
      { airline: '8P', supplierCode: 'PF3' },
      { airline: 'WJ', supplierCode: 'ALO' },
      { airline: 'WN', supplierCode: 'SOA' }
    ];

    const acAirlineSupplierList: Array<any> = [
      { airline: 'AC', supplierCode: 'ACJ' },
      { airline: 'WS', supplierCode: 'WJP' },
      { airline: 'PD', supplierCode: 'PTP' },
      { airline: '4N', supplierCode: 'A5P' },
      { airline: '8P', supplierCode: 'PSI' }
    ];

    if (this.matrixAccountingForm.controls.segmentNo.value) {
      segmentNos = this.matrixAccountingForm.controls.segmentNo.value.split(',');
      const segmentDetails = this.pnrService.getSegmentList();
      segmentDetails.forEach((segments) => {
        segmentNos.forEach((segment) => {
          if (segment === segments.lineNo) {
            let look = airlineSupplierList.find((x) => segments.airlineCode === x.airline);
            if (this.accountingRemark.accountingTypeRemark === 'ACPR') {
              look = acAirlineSupplierList.find((x) => segments.airlineCode === x.airline);
            }
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

  select() {
    this.matrixAccountingForm.controls.passengerNo.patchValue('');
    // this.matrixAccountingForm.controls.tktLine.patchValue('');
  }

  /**
   * Subscribe to observable FormControls and FormGroups
   */
  onChanges(): void {
    this.matrixAccountingForm.get('supplierCodeName').valueChanges.subscribe(() => {
      this.matrixAccountingForm.controls.tktLine.clearValidators();
      switch (this.accountingRemark.accountingTypeRemark) {
        case 'ACPPC':
          this.setMandatoryTicket(['ACJ', 'WJP', 'PTP'], false);
          break;
        case 'ACPP':
        case 'WCPP':
        case 'PCPP':
          if (this.accountingRemark.accountingTypeRemark === 'PCPP') {
            this.setMandatoryTicket([], false);
          } else {
            this.setMandatoryTicket(['ACJ', 'WJP'], false);
          }
          break;
        case 'NONBSPEXCHANGE':
          this.matrixAccountingForm.controls.originalTktLine.clearValidators();
          const supCode = ['ACY', 'SOA', 'WJ3', 'ACJ', 'WJP'];
          this.setMandatoryTicket(supCode, false);
          if (supCode.indexOf(this.accountingRemark.supplierCodeName) >= 0) {
            this.matrixAccountingForm.controls.originalTktLine.setValidators(Validators.required);
          }
          this.matrixAccountingForm.get('originalTktLine').updateValueAndValidity();
          break;
        case 'APAY':
        case 'NONBSP':
          this.setMandatoryTicket(['ACY', 'SOA', 'WJ3'], false);
          break;
        default:
          this.setMandatoryTicket([], false);
          break;
      }
    });

    // Require penalty fields when penalty is > 0
    this.matrixAccountingForm.get('penaltyBaseAmount').valueChanges.subscribe((penaltyBaseAmount) => {
      const regexDecimal = '[0-9]*(.[0-9]+)'; // Regex pattern for decimals

      if (parseFloat(penaltyBaseAmount) > 0) {
        this.matrixAccountingForm.get('penaltyGst').setValidators([Validators.required, Validators.pattern(regexDecimal)]);
        this.matrixAccountingForm.get('penaltyHst').setValidators([Validators.required, Validators.pattern(regexDecimal)]);
        this.matrixAccountingForm.get('penaltyQst').setValidators([Validators.required, Validators.pattern(regexDecimal)]);
      } else {
        this.matrixAccountingForm.get('penaltyGst').clearValidators();
        this.matrixAccountingForm.get('penaltyHst').clearValidators();
        this.matrixAccountingForm.get('penaltyQst').clearValidators();
      }
    });

    // Calculate the Base Amount depending on airlineCorporatePass and number of Air Segments, etc...
    this.matrixAccountingForm.get('airlineCorporatePassId').valueChanges.subscribe((value) => {
      const airlineCorporatePassSelected = this.airlineCorporatePassService.getById(value);
      this.accountingRemark.airlineCorporatePass = airlineCorporatePassSelected;
      this.accountingRemark.fareType = airlineCorporatePassSelected.fareType;
      this.setBaseAmount();
    });
    this.matrixAccountingForm.get('segmentsCount').valueChanges.subscribe(() => {
      this.setBaseAmount();
    });
  }

  setBaseAmount(): void {
    let baseAmount = 0;
    if (this.matrixAccountingForm.get('airlineCorporatePassId').value) {
      baseAmount =
        this.matrixAccountingForm.get('segmentsCount').value *
        this.airlineCorporatePasses.filter(
          (x) => x.id.toString() === this.matrixAccountingForm.get('airlineCorporatePassId').value.toString()
        )[0].segmentCost;
    }
    this.matrixAccountingForm.get('baseAmount').setValue(baseAmount);
  }

  setTktNumber() {
    if (this.accountingRemark.accountingTypeRemark === 'NONBSP') {
      this.setMandatoryTicket(['ACY', 'SOA', 'WJ3'], false);
    }
  }

  changetoExchange(valueCheck) {
    if (valueCheck) {
      this.matrixAccountingForm.controls.accountingTypeRemark.patchValue('NONBSPEXCHANGE');
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

  descriptionChanged(typeCode: any) {
    this.accountingRemark.typeCode = typeCode;
    if (typeCode === 'SEAT COSTS') {
      this.showOtherDescription = false;
      this.matrixAccountingForm.controls.supplierCodeName.patchValue('PFS');
    } else {
      this.matrixAccountingForm.controls.supplierCodeName.patchValue('CGO');
    }

    if (typeCode === 'OTHER COSTS') {
      this.showOtherDescription = true;
      this.matrixAccountingForm.get('otherDescription').setValidators([Validators.required]);
      this.matrixAccountingForm.get('otherDescription').updateValueAndValidity();
    } else {
      this.showOtherDescription = false;
      this.matrixAccountingForm.get('otherDescription').clearValidators();
      this.matrixAccountingForm.get('otherDescription').updateValueAndValidity();
    }
  }

  getCCVendor(): string {
    let val: string;
    val = '';

    for (const element of this.pnrService.pnrObj.fpElements) {
      val = element.fullNode.otherDataFreetext.longFreetext.substr(2, 2);
    }

    return val;
  }

  onCheckChange() {
    // Filter out the unselected ids
    const checkSegment = [];
    let airlineCode = '';
    let counter = 0;
    const selectedPreferences = this.matrixAccountingForm.value.segments
      .map((checked, index) => (checked ? this.segments[index].id : null))
      .filter((value) => value !== null);
    selectedPreferences.forEach((element) => {
      const look = this.segments.find((x) => x.id === element);
      if (look) {
        const textLine = {
          lineNo: look.id,
          segmentType: look.segmentType
        };
        checkSegment.push(textLine);
        if (counter === 0) {
          airlineCode = look.airlineCode;
        }
        if (airlineCode !== look.airlineCode) {
          airlineCode = '';
        }
      }
      counter = counter + 1;
    });
    this.accountingRemark.segments = checkSegment;
    if (airlineCode === 'AC') {
      this.accountingRemark.supplierCodeName = 'ACJ';
    } else if (airlineCode === 'WS') {
      this.accountingRemark.supplierCodeName = 'WJP';
    } else if (airlineCode === 'PD') {
      this.accountingRemark.supplierCodeName = 'PTP';
    } else {
      this.accountingRemark.supplierCodeName = '';
    }
  }
}
