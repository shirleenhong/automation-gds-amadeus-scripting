import { Component, Input, OnInit } from '@angular/core';
import { MatrixAccountingModel } from 'src/app/models/pnr/matrix-accounting.model';
import { SelectItem } from 'src/app/models/select-item.model';
import { PnrService } from 'src/app/service/pnr.service';
import { DDBService } from 'src/app/service/ddb.service';
import { FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { UtilHelper } from 'src/app/helper/util.helper';

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
  vendorCodeList: Array<SelectItem>;
  supplierCodeList: Array<any>;
  passengerList: Array<any>;
  fareTypeList = [];
  passPurchaseList = [];
  matrixAccountingForm: FormGroup;
  isSubmitted: boolean;
  name: string;
  ticketNumber: string;
  isAddNew = false;
  isCopy = false;
  filterSupplierCodeList: Array<any>;
  reasonCodeList: Array<SelectItem>;
  needFaretype = false;

  constructor(
    public activeModal: BsModalService,
    private pnrService: PnrService,
    public modalRef: BsModalRef,
    private ddbService: DDBService,
    private utilHelper: UtilHelper
  ) {
    this.accountingRemarkList = new Array<SelectItem>();
    this.accountingRemark = new MatrixAccountingModel();
    this.loadAccountingRemarkList();
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
      tktLine: new FormControl('', [Validators.maxLength(10), Validators.pattern('[0-9]{10}')]),
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
      typeOfPass: new FormControl('')
    });

    this.name = 'Supplier Confirmation Number:';
    this.utilHelper.validateAllFields(this.matrixAccountingForm);
    this.onChanges();
    this.showFareType();

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
  }

  loadAccountingRemarkList() {
    this.accountingRemarkList = [
      { itemText: '', itemValue: '' },
      { itemText: 'Air Canada Individual Pass Purchase', itemValue: 'ACPP' },
      { itemText: 'Westjet Individual Pass Purchase', itemValue: 'WCPP' },
      { itemText: 'Porter Individual Pass Purchase', itemValue: 'PCPP' },
      { itemText: 'Non BSP Exchange', itemValue: 'NONBSPEXCHANGE' },
      { itemText: 'Non BSP Airline', itemValue: 'NONBSP' },
      { itemText: 'APAY', itemValue: 'APAY' }
    ];
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
        this.passPurchaseList = this.ddbService.getACPassPurchaseList();
        break;
      case 'WCPP':
        this.passPurchaseList = [{ itemText: '', itemValue: '' }, { itemText: 'Westjet Travel Pass', itemValue: 'Westjet Travel Pass' }];
        break;
      case 'PCPP':
        this.passPurchaseList = [{ itemText: '', itemValue: '' }, { itemText: 'Porter Travel Pass', itemValue: 'Porter Travel Pass' }];
        break;
      default:
        break;
    }
  }

  onChangeAccountingType(accRemark) {
    if (this.isAddNew) {
      this.accountingRemark.vendorCode = '';
      this.accountingRemark.supplierCodeName = '';
    }
    // initial state
    this.ticketNumber = 'Ticket Number: ';
    this.matrixAccountingForm.get('supplierConfirmatioNo').setValidators([Validators.maxLength(20)]);
    this.setRequired(['tktLine', 'departureCity', 'originalTktLine'], false);
    this.enableFormControls(['descriptionapay', 'departureCity', 'supplierConfirmatioNo', 'originalTktLine'], false);
    this.enableFormControls(['otherTax', 'gdsFare', 'segmentNo', 'passPurchase', 'fareType'], true);
    switch (accRemark) {
      case 'ACPP':
      case 'WCPP':
      case 'PCPP':
        accRemark === 'ACPP'
          ? (this.accountingRemark.supplierCodeName = 'ACJ')
          : accRemark === 'WCPP'
            ? (this.accountingRemark.supplierCodeName = 'WJP')
            : (this.accountingRemark.supplierCodeName = 'PTP');

        this.matrixAccountingForm.get('supplierConfirmatioNo').setValidators([
          Validators.required,
          Validators.maxLength(15)
        ]);
        this.enableFormControls(['departureCity', 'passPurchase'], false);
        this.matrixAccountingForm.controls.supplierConfirmatioNo.clearValidators();
        this.matrixAccountingForm.get('supplierConfirmatioNo').updateValueAndValidity();
        this.matrixAccountingForm.get('departureCity').setValidators([Validators.required]);

        if (this.isAddNew) {
          this.accountingRemark.qst = '';
          this.accountingRemark.baseAmount = '';
          this.accountingRemark.hst = '';
          this.accountingRemark.gst = '';
        }

        this.enableFormControls(['fareType'], accRemark !== 'ACPP');
        break;
      case 'NONBSPEXCHANGE':
        this.enableFormControls(['otherTax', 'segmentNo', 'originalTktLine'], false);
        this.configureNonBSPExchangeControls();
        this.checkSupplierCode();
        this.enableFormControls(['fareType'], !this.needFaretype);

        break;
      case 'APAY':
        this.enableFormControls(['supplierCodeName', 'otherTax', 'segmentNo'], false);
        this.enableFormControls(['descriptionapay', 'departureCity', 'passPurchase',
          'fareType', 'supplierConfirmatioNo', 'commisionWithoutTax'], true);
        this.matrixAccountingForm.controls.supplierCodeName.patchValue('PFS');
        this.ticketNumber = 'Ticket Number/Confirmation Number: ';
        break;
      case 'NONBSP':
        this.name = 'Airline Record Locator:';
        this.checkSupplierCode();
        // this.accountingRemark.commisionWithoutTax = '0.00';
        // this.setMandatoryTicket(['ACY', 'SOA', 'WJ3'], false);
        this.enableFormControls(['supplierCodeName', 'otherTax', 'commisionWithoutTax', 'segmentNo'], false);
        this.enableFormControls(['descriptionapay', 'departureCity', 'passPurchase', 'fareType'], true);
        this.setRequired(['commisionWithoutTax'], false);
        if (accRemark === 'NONBSP') {
          this.matrixAccountingForm.get('supplierConfirmatioNo').setValidators([
            Validators.required,
            Validators.maxLength(10)
          ]);
          this.matrixAccountingForm.get('supplierConfirmatioNo').updateValueAndValidity();
        }

        break;
      default:
        this.enableFormControls(['otherTax', 'commisionWithoutTax', 'segmentNo'], false);
        this.enableFormControls(['descriptionapay', 'commisionPercentage'], true);
        this.accountingRemark.bsp = '1';
        this.name = 'Supplier Confirmation Number:';
        this.setMandatoryTicket([], false);
        break;
    }
    this.loadPassType(accRemark);
  }

  configureNonBSPExchangeControls(): void {
    this.name = 'Airline Record Locator:';
    this.matrixAccountingForm.get('airlineRecordLocator')
      .setValidators([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ]);

    this.matrixAccountingForm.get('supplierConfirmatioNo')
      .setValidators([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ]);

    // Require GDS Fare if CFA remark is in [ZZB, 92Z, YVQ, YFV].
    const cfaLine = this.pnrService.getCFLine();
    if (cfaLine !== undefined) {
      if (['ZZB', '92Z', 'YVQ', 'YFV'].includes(cfaLine.cfa)) {
        this.matrixAccountingForm.get('gdsFare').setValidators([Validators.required]);
        this.matrixAccountingForm.get('gdsFare').enable();
      } else {
        this.matrixAccountingForm.get('gdsFare').disable();
        this.matrixAccountingForm.get('gdsFare').clearValidators();
      }
    }

    this.matrixAccountingForm.get('consultantNo').setValidators([
      Validators.minLength(3),
      Validators.maxLength(3),
    ]);
  }

  setMandatoryTicket(supCode: string[], isRequired: boolean) {
    if (supCode.indexOf(this.accountingRemark.supplierCodeName) >= 0 || isRequired) {
      this.matrixAccountingForm.controls.tktLine.setValidators(Validators.required);
      console.log('supCode: ' + this.accountingRemark.supplierCodeName);
    } else {
      this.matrixAccountingForm.controls.tktLine.clearValidators();
      console.log('supCode: ' + this.accountingRemark.supplierCodeName);
    }
    this.matrixAccountingForm.get('tktLine').updateValueAndValidity();
  }

  getAirlineCode(segmentno) {
    const segments = segmentno.split(',');
    const air = this.pnrService.getSegmentTatooNumber().filter((x) => x.segmentType === 'AIR' && x.lineNo === segmentno);
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

    if (this.matrixAccountingForm.controls.segmentNo.value) {
      segmentNos = this.matrixAccountingForm.controls.segmentNo.value.split(',');
      const segmentDetails = this.pnrService.getSegmentTatooNumber();
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

  select() {
    this.matrixAccountingForm.controls.passengerNo.patchValue('');
    // this.matrixAccountingForm.controls.tktLine.patchValue('');
  }

  /**
   * Subscribe to observable FormControls and FormGroups
   */
  onChanges(): void {
    // this.matrixAccountingForm.valueChanges.subscribe(val => {
    //   console.log(val);
    // });
    this.matrixAccountingForm.get('supplierCodeName').valueChanges.subscribe(() => {
      this.matrixAccountingForm.controls.tktLine.clearValidators();
      switch (this.accountingRemark.accountingTypeRemark) {
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
    this.matrixAccountingForm.get('penaltyBaseAmount').valueChanges.subscribe(penaltyBaseAmount => {
      const regexDecimal = '[0-9]*(\.[0-9]+)'; // Regex pattern for decimals

      if (parseFloat(penaltyBaseAmount) > 0) {
        this.matrixAccountingForm.get('penaltyGst').setValidators([
          Validators.required,
          Validators.pattern(regexDecimal)
        ]);
        this.matrixAccountingForm.get('penaltyHst').setValidators([
          Validators.required,
          Validators.pattern(regexDecimal)
        ]);
        this.matrixAccountingForm.get('penaltyQst').setValidators([
          Validators.required,
          Validators.pattern(regexDecimal)
        ]);
      } else {
        this.matrixAccountingForm.get('penaltyGst').clearValidators();
        this.matrixAccountingForm.get('penaltyHst').clearValidators();
        this.matrixAccountingForm.get('penaltyQst').clearValidators();
      }
    });

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
}
