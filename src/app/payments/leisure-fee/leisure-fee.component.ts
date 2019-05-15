import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { DDBService } from 'src/app/service/ddb.service';
import { SelectItem } from 'src/app/models/select-item.model';
import { PnrService } from 'src/app/service/pnr.service';
import { RemarkGroup } from 'src/app/models/pnr/remark.group.model';
import { RemarkModel } from 'src/app/models/pnr/remark.model';
import { DatePipe, DecimalPipe } from '@angular/common';
import { PaymentRemarkHelper } from 'src/app/helper/payment-helper';
import { CfRemarkModel } from 'src/app/models/pnr/cf-remark.model';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { validateCreditCard, validateExpDate } from 'src/app/shared/validators/leisure.validators';

@Component({
  selector: 'app-leisure-fee',
  templateUrl: './leisure-fee.component.html',
  styleUrls: ['./leisure-fee.component.scss']
})
export class LeisureFeeComponent implements OnInit, AfterViewInit {
  leisureFeeForm: FormGroup;
  @Input()
  provinceList: SelectItem[];
  segmentList: Array<string>;
  provinceTaxes: any;
  decPipe: DecimalPipe;
  datePipe: DatePipe;
  isInvalid = true;
  vendorCodeList: Array<SelectItem>;
  cfaLine: CfRemarkModel;
  IsPnrAvailable = false;

  constructor(
    private fb: FormBuilder,
    private ddbService: DDBService,
    private pnrService: PnrService,
    private paymentHelper: PaymentRemarkHelper
  ) {
    this.provinceList = this.ddbService.getProvinces();
    this.provinceTaxes = this.ddbService.getProvinceTax();
    this.vendorCodeList = this.ddbService.getCcVendorCodeList();
    this.decPipe = new DecimalPipe('en-US');
    this.datePipe = new DatePipe('en-US');
    this.cfaLine = this.pnrService.getCFLine();
  }

  creditcardMaxValidator(newValue) {
    // retrigger validation
    this.f.ccNo.setValue(this.f.ccNo.value);
  }

  ngAfterViewInit(): void {
    // throw new Error("Method not implemented.");
    //
    // this.f.paymentType.patchValue('C');
  }
  ngOnInit() {
    this.leisureFeeForm = this.fb.group({
      chkUpdateRemove: new FormControl(''),
      segmentAssoc: new FormControl('', [Validators.required]),
      segmentNum: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      paymentType: new FormControl('', [Validators.required]),
      vendorCode: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Z]{2}')
      ]),
      ccNo: new FormControl('', [Validators.required, validateCreditCard('vendorCode')]),
      expDate: new FormControl('', [Validators.required, validateExpDate()]),
      address: new FormControl('', [Validators.required]),
      noFeeReason: new FormControl(''),

    });
    this.enableDisbleControls(['noFeeReason'], true);
    this.onControlChanges();
    this.loadValues();
    this.checkHasPnr();

  }

  checkHasPnr() {
    this.IsPnrAvailable = this.pnrService.hasRecordLocator() !== undefined;
    if (this.IsPnrAvailable) {
      this.setFormState(true);
    }
  }

  changeState() {
    this.setFormState(!this.leisureFeeForm.controls.chkUpdateRemove.value);
  }

  changeFeeState() {
    const controls = ['vendorCode', 'ccNo', 'expDate'];
    this.enableDisbleControls(controls, this.f.paymentType.value === 'K');
    // if (this.f.segmentAssoc.value === '0' && (this.IsPnrAvailable && this.f.chkUpdateRemove.value)) {
    //   this.enableDisbleControls(['noFeeReason'], this.checkSFC());
    // } else {
    //   this.enableDisbleControls(['noFeeReason'], true);
    // }
    // this.enableDisableCredits();
  }

  setFormState(isDisabled: boolean) {
    if (isDisabled) {
      const ctrls = [
        'segmentAssoc',
        'segmentNum',
        'amount',
        'paymentType',
        'vendorCode',
        'ccNo',
        'expDate',
        'address',
        'noFeeReason'
      ];

      this.enableDisbleControls(ctrls, isDisabled);
    } else {
      this.enableDisbleControls(['segmentAssoc'], false);
      this.processAssocValues(this.f.segmentAssoc.value);
      const controls = ['vendorCode', 'ccNo', 'expDate'];
      this.enableDisbleControls(controls, this.f.paymentType.value === 'K');
    }
    // this.enableDisableCredits();
    // this.changeFeeState();
  }

  enableDisableCredits() {
    if (this.leisureFeeForm.controls.paymentType.value === 'K') {
      const controls = ['vendorCode', 'ccNo', 'expDate'];
      this.enableDisbleControls(controls, true);
    }
  }

  get f() {
    return this.leisureFeeForm.controls;
  }

  onControlChanges() {
    this.leisureFeeForm.get('segmentAssoc').valueChanges.subscribe(val => {
      this.processAssocValues(val);
    });
    this.leisureFeeForm.get('paymentType').valueChanges.subscribe(val => {
      const controls = ['vendorCode', 'ccNo', 'expDate'];
      this.enableDisbleControls(controls, val === 'K');
    });
  }

  processAssocValues(val) {
    const ctrls = [
      'segmentNum',
      'amount',
      'paymentType',
      'vendorCode',
      'ccNo',
      'expDate',
      'address'
    ];
    this.enableDisbleControls(ctrls, false);
    this.enableDisbleControls(['noFeeReason'], true);

    switch (val) {
      case '3':
      case '4':
        this.leisureFeeForm.get('segmentNum').enable();
        if (val === '3') {
          this.segmentList = this.pnrService.getPassiveHotelSegmentNumbers();
        } else {
          this.segmentList = this.pnrService.getPassiveCarSegmentNumbers();
        }
        break;
      case '0':
        this.enableDisbleControls(ctrls, true);

        if ((!this.IsPnrAvailable && !this.checkSFC()) ||
          (this.IsPnrAvailable && this.f.chkUpdateRemove.value === true && !this.checkSFC())) {
          this.enableDisbleControls(['noFeeReason'], false);
        }

        this.f.noFeeReason.setValidators(Validators.required);
        break;
      default:
        this.leisureFeeForm.get('segmentNum').disable();
    }
  }

  enableDisbleControls(ctrls: string[], isDisabled: boolean) {
    ctrls.forEach(x => {
      if (isDisabled) {
        this.leisureFeeForm.get(x).disable();
      } else {
        this.leisureFeeForm.get(x).enable();
      }
    });
  }

  checkSFC() {
    if (this.f.segmentAssoc.value === '0') {
      const controls = ['vendorCode', 'ccNo', 'expDate'];
      this.enableDisbleControls(controls, true);
    }
    if (
      this.f.segmentAssoc.value === '0' &&
      (this.cfaLine.cfa !== 'RBM' && this.cfaLine.cfa !== 'RBP')
    ) {
      return false;
    } else {
      return true;
    }
  }

  private loadValues() {
    const remarkText = this.pnrService.getRemarkText('SFC');
    const remarkTax = this.pnrService.getRemarkText('TAX-');
    this.f.paymentType.setValue('C', { onlySelf: true });
    this.leisureFeeForm.controls.segmentAssoc.setValue('0');
    this.f.noFeeReason.setValue(this.pnrService.getRemarkText('U11/-').replace('U11/-', ''));

    if (remarkText !== '') {
      const segmentAssociation = this.getSegmentAssociation(this.GetValueFromSFCRemark(remarkText, '-FA'));
      this.leisureFeeForm.controls.segmentAssoc.setValue(segmentAssociation);

      const amount = this.getValueByRegex(this.GetValueFromSFCRemark(remarkText, '-AMT'), "/([0-9]+[\.]*[0-9]*)/");
      const ccNum = this.getValueByRegex(this.GetValueFromSFCRemark(remarkText, '-FOP-CC'), "/(?:.*)/");
      // const segNum = this.getValueByRegex(this.GetValueFromSFCRemark(remarkText, '-FA'), "/([0-9]+[\.]*[0-9]*)/");
      let segNum = '';

      if (segmentAssociation === '3') {
        segNum = this.GetValueFromSFCRemark(remarkText, '-FA').replace('-FA-H', '');
      }

      if (segmentAssociation === '4') {
        segNum = this.GetValueFromSFCRemark(remarkText, '-FA').replace('-FA-C', '');
      }

      this.leisureFeeForm.controls.amount.setValue(amount);
      this.leisureFeeForm.controls.segmentNum.setValue(segNum);
      if (ccNum !== undefined && ccNum !== '') {
        const provider = this.getValueByRegex(this.GetValueFromSFCRemark(remarkText, '-FOP-CC'), "/(?<=CC)([A-Z]{2})/");
        const expiryDate = this.getValueByRegex(this.GetValueFromSFCRemark(remarkText, '-EXP'), "/([0-9]+[\.]*[0-9]*)/");
        this.leisureFeeForm.controls.ccNo.setValue(ccNum.substr(9));
        this.leisureFeeForm.controls.vendorCode.setValue(provider);
        this.leisureFeeForm.controls.expDate.setValue(expiryDate.slice(0, 2) + '/' + expiryDate.slice(2, 4));
      } else {
        this.f.paymentType.setValue('K', { onlySelf: true });
      }
    }

    if (remarkTax !== '') {
      const tax = this.getValueByRegex(this.GetValueFromSFCRemark(remarkTax, 'TAX-'), "/(?<=TAX-)([A-Z]{2})/");
      this.leisureFeeForm.controls.address.setValue(tax);
    }
  }

  private getSegmentAssociation(value: string) {
    if (value.indexOf('-FA-T') === 0) {
      return '1';
    } else if (value === '') {
      return '2';
    } else if (value.indexOf('-FA-H') === 0) {
      return '3';
    } else if (value.indexOf('-FA-C') === 0) {
      return '4';
    } else {
      return '0';
    }
  }

  private getValueByRegex(value: string, regx: string) {
    const expression = new RegExp(regx);
    if (expression.test(value)) {
      for (let result = expression.exec(value); result !== null;
        result = expression.exec(value)) {
        return result[0];
      }
    }
  }

  private GetValueFromSFCRemark(value: string, searchString: string) {
    const results = value.split('/');
    let res = '';
    results.forEach(val => {
      if (val.indexOf(searchString) === 0) {
        res = val;
        return;
      }
    });
    return res;
  }
}
