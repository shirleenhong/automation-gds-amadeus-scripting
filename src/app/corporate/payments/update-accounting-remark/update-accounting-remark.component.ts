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
  isAddNew = false;
  isCopy = false;

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
    this.passPurchaseList = this.ddbService.getACPassPurchaseList();
    // this.initializeCopy();
  }

  ngOnInit() {
    this.matrixAccountingForm = new FormGroup({
      accountingTypeRemark: new FormControl('', [Validators.required]),
      confirmationLabel: new FormControl(''),
      supplierCodeName: new FormControl('', [Validators.required, Validators.maxLength(3)]),
      passengerNo: new FormControl('', []),
      supplierConfirmatioNo: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      baseAmount: new FormControl('', [Validators.required]),
      commisionWithoutTax: new FormControl('', [Validators.required]),
      
      // NonBSP Exchange fields
      airlineRecordLocator: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ]),
      gdsFare: new FormControl('', [Validators.required]),
      
      gst: new FormControl('', [Validators.required]),
      hst: new FormControl('', [Validators.required]),
      qst: new FormControl('', [Validators.required]),
      otherTax: new FormControl('', [Validators.required]),
      tktLine: new FormControl('', [Validators.maxLength(10), Validators.pattern('[0-9]*')]),
      descriptionapay: new FormControl('', [Validators.required]),
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
      duplicateFare: new FormControl(''),
      typeOfPass: new FormControl('')
    });

    this.name = 'Supplier Confirmation Number:';
    this.utilHelper.validateAllFields(this.matrixAccountingForm);
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
      { itemText: 'P Individual Pass Purchase', itemValue: 'PCPP' },
      { itemText: 'NonBSP Exchange', itemValue: 'NBEX' }
    ];
  }

  loadPassType(accountingType) {
    switch (accountingType) {
      case 'ACPP':
        this.passPurchaseList = this.ddbService.getACPassPurchaseList();
        break;
      case 'WCPP':
        this.passPurchaseList = [
          { itemText: '', itemValue: '' },
          { itemText: 'Westjet Travel Pass', itemValue: 'Westjet Travel Pass' }];
        break;
      case 'PCPP':
        this.passPurchaseList = [
          { itemText: '', itemValue: '' },
          { itemText: 'Porter Travel Pass', itemValue: 'Porter Travel Pass' }];
        break;
      default: break;
    }
  }

  onChangeAccountingType(accRemark) {
    if (this.isAddNew) {
      this.accountingRemark.vendorCode = '';
      this.accountingRemark.supplierCodeName = '';
    }

    // initial state
    this.matrixAccountingForm.get('supplierConfirmatioNo').setValidators([Validators.maxLength(20)]);
    this.setRequired(['tktLine', 'departureCity', 'originalTktLine'], false);
    switch (accRemark) {
      case 'ACPP':
      case 'WCPP':
      case 'PCPP':
        (accRemark === 'ACPP' ? this.accountingRemark.supplierCodeName = 'ACJ' :
          accRemark === 'WCPP' ? this.accountingRemark.supplierCodeName = 'WJP' :
            this.accountingRemark.supplierCodeName = 'PTP');

        this.enableFormControls(['otherTax', 'supplierCodeName', 'descriptionapay', 'segmentNo'], true);
        this.enableFormControls(['departureCity'], false);

        this.matrixAccountingForm.controls.supplierConfirmatioNo.clearValidators();
        this.matrixAccountingForm.get('supplierConfirmatioNo').setValidators([Validators.maxLength(7)]);
        this.matrixAccountingForm.get('supplierConfirmatioNo').updateValueAndValidity();
        this.matrixAccountingForm.controls.tktLine.clearValidators();
        this.matrixAccountingForm.controls.tktLine.setValidators(Validators.required);
        this.matrixAccountingForm.get('departureCity').setValidators([Validators.required]);

        if (this.isAddNew) {
          this.accountingRemark.qst = '';
          this.accountingRemark.baseAmount = '';
          this.accountingRemark.hst = '';
          this.accountingRemark.gst = '';
        }
        break;
      default:
        this.enableFormControls(['tktLine', 'otherTax', 'commisionWithoutTax', 'supplierCodeName', 'segmentNo'], false);
        this.enableFormControls(['descriptionapay', 'commisionPercentage'], true);
        this.accountingRemark.bsp = '1';
        this.name = 'Supplier Confirmation Number:';
        break;
    }
    this.loadPassType(accRemark);
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
      segmentDetails.forEach(segments => {
        segmentNos.forEach(segment => {
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
    this.matrixAccountingForm.controls.tktLine.patchValue('');
  }
}
