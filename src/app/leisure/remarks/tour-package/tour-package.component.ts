import { Component, OnInit, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  Validator,
  AbstractControl,
  ValidationErrors,
  FormBuilder,
  Validators
} from '@angular/forms';
import { SelectItem } from 'src/app/models/select-item.model';
import { DecimalPipe, DatePipe } from '@angular/common';
import { DDBService } from 'src/app/service/ddb.service';
import { PnrService } from 'src/app/service/pnr.service';
import { PackageRemarkHelper } from 'src/app/helper/packageRemark-helper';

@Component({
  selector: 'app-tour-package',
  templateUrl: './tour-package.component.html',
  styleUrls: ['./tour-package.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TourPackageComponent implements OnInit, OnChanges, ControlValueAccessor, Validator {
  decPipe = new DecimalPipe('en-US');
  bspCurrencyList: SelectItem[];
  remarks: Array<any>;
  riiRemarks: Array<any>;
  group: FormGroup;
  datePipe = new DatePipe('en-US');

  constructor(
    private fb: FormBuilder,
    private ddb: DDBService,
    private pnrService: PnrService,
    private packageRemarkHelper: PackageRemarkHelper
  ) {
    this.group = this.fb.group({
      adultNum: new FormControl('', [Validators.min(1), Validators.max(9), Validators.maxLength(1)]),
      tourCurrencyType: new FormControl('', [Validators.required]),
      baseCost: new FormControl('', [Validators.maxLength(8)]),
      taxesPerAdult: new FormControl('', [Validators.maxLength(7)]),
      childrenNumber: new FormControl('', [Validators.min(0), Validators.max(9), Validators.maxLength(1)]),
      childBaseCost: new FormControl('', [Validators.maxLength(8)]),
      insurancePerAdult: new FormControl('', [Validators.maxLength(7)]),
      insurancePerChild: new FormControl('', [Validators.maxLength(7)]),
      taxesPerChild: new FormControl('', [Validators.maxLength(7)]),
      infantNumber: new FormControl('', [Validators.min(0), Validators.max(9), Validators.maxLength(1)]),
      totalCostPerInfant: new FormControl(''),
      depositPaid: new FormControl(''),
      totalCostHoliday: new FormControl(''),
      lessDepositPaid: new FormControl(''),
      balanceToBePaid: new FormControl(''),
      balanceDueDate: new FormControl('', [Validators.required]),
      commission: new FormControl('', [Validators.maxLength(8)])
    });
  }

  ngOnInit() {
    this.getCurrencies();
    this.group.get('adultNum').valueChanges.subscribe((e) => {
      this.group.value.adultNum = e;
      this.tourPackageChange();
    });

    this.group.get('baseCost').valueChanges.subscribe((e) => {
      this.group.value.baseCost = e;
      this.tourPackageChange();
    });

    this.group.get('taxesPerAdult').valueChanges.subscribe((e) => {
      this.group.value.taxesPerAdult = e;
      this.tourPackageChange();
    });

    this.group.get('insurancePerAdult').valueChanges.subscribe((e) => {
      this.group.value.insurancePerAdult = e;
      this.tourPackageChange();
    });

    this.group.get('childrenNumber').valueChanges.subscribe((e) => {
      this.group.value.childrenNumber = e;
      this.tourPackageChange();
    });

    this.group.get('childBaseCost').valueChanges.subscribe((e) => {
      this.group.value.childBaseCost = e;
      this.tourPackageChange();
    });

    this.group.get('taxesPerChild').valueChanges.subscribe((e) => {
      this.group.value.taxesPerChild = e;
      this.tourPackageChange();
    });

    this.group.get('insurancePerChild').valueChanges.subscribe((e) => {
      this.group.value.insurancePerChild = e;
      this.tourPackageChange();
    });

    this.group.get('infantNumber').valueChanges.subscribe((e) => {
      this.group.value.infantNumber = e;
      this.tourPackageChange();
    });

    this.group.get('totalCostPerInfant').valueChanges.subscribe((e) => {
      this.group.value.totalCostPerInfant = e;
      this.tourPackageChange();
    });

    this.group.get('depositPaid').valueChanges.subscribe((e) => {
      this.group.value.depositPaid = e;
      this.tourPackageChange();
    });

    this.loadValues();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    console.log('form group: ', this.group);
  }

  public onTouched: () => void = () => {};

  writeValue(val: any): void {
    // tslint:disable-next-line: no-unused-expression
    val && this.group.setValue(val, { emitEvent: false });
  }
  registerOnChange(fn: any): void {
    console.log('on change');
    this.group.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    console.log('on blur');
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.group.disable() : this.group.enable();
  }

  validate(c: AbstractControl): ValidationErrors {
    console.log('Basic Info validation', c);
    return this.group.valid
      ? null
      : {
          invalidForm: {
            valid: false,
            message: 'basic InfoForm fields are invalid'
          }
        };
  }

  registerOnValidatorChange?(_fn: () => void): void {}

  tourPackageChange() {
    console.log('tour package call');
    const v = this.computeAdultCost() + this.computeChildCost() + this.computeInfantCost();
    this.group.patchValue({
      totalCostHoliday: this.decPipe.transform(v, '1.2-2').replace(',', '')
    });

    this.computeBalanceToBePaid();
    // console.log('total cost holiday');
    // console.log(this.group.value.totalCostHoliday);
    // this.group.patchValue({ lessDepositPaid: this.group.value.depositPaid });
    // this.group.value.lessDepositPaid = this.group.value.depositPaid;
    // this.group.value.balanceToBePaid = this.group.value.totalCostHoliday - parseInt(this.group.value.lessDepositPaid, 0);
    // this.group.patchValue({ balanceToBePaid: this.group.value.totalCostHoliday - parseInt(this.group.value.depositPaid, 0) });
    // this.buildRemark();
  }

  computeBalanceToBePaid() {
    let dp = 0;
    if (this.group.value.depositPaid !== '') {
      dp = parseInt(this.group.value.depositPaid, 0);
    }
    const totalCost = this.group.value.totalCostHoliday.replace(',', '');
    this.group.patchValue({
      balanceToBePaid: this.decPipe.transform(parseFloat(totalCost) - dp, '1.2-2').replace(',', '')
    });
  }

  computeAdultCost() {
    let baseCost = 0;
    if (this.group.value.baseCost !== '') {
      baseCost = Number(this.group.value.baseCost);
    }
    console.log('basecost ' + baseCost);
    let ipa = 0;
    if (this.group.value.insurancePerAdult !== '') {
      ipa = Number(this.group.value.insurancePerAdult);
    }
    let tpa = 0;
    if (this.group.value.taxesPerAdult !== '') {
      tpa = Number(this.group.value.taxesPerAdult);
    }
    const sum = baseCost + ipa + tpa;

    console.log('sum ' + sum);

    let adultCount = 0;
    if (this.group.value.adultNum !== '') {
      adultCount = Number(this.group.value.adultNum);
    }

    let result = adultCount * sum;
    console.log('result adult ' + result);
    if (Number.isNaN(result)) {
      result = 0;
    }
    return result;
  }

  computeChildCost() {
    let childBaseCost = 0;
    if (this.group.value.childBaseCost !== '') {
      childBaseCost = Number(this.group.value.childBaseCost);
    }

    let ipc = 0;
    if (this.group.value.insurancePerChild !== '') {
      ipc = Number(this.group.value.insurancePerChild);
    }

    let tpc = 0;
    if (this.group.value.taxesPerChild !== '') {
      tpc = Number(this.group.value.taxesPerChild);
    }

    const sum = childBaseCost + ipc + tpc;

    let childCount = 0;
    if (this.group.value.childrenNumber !== '') {
      childCount = Number(this.group.value.childrenNumber);
    }

    let result = childCount * sum;

    if (Number.isNaN(result)) {
      result = 0;
    }
    console.log('result child ' + result);
    return result;
  }

  computeInfantCost() {
    console.log('compute infant cost');

    let tcpa = 0;
    if (this.group.value.totalCostPerInfant !== '') {
      tcpa = Number(this.group.value.totalCostPerInfant);
    }

    const sum = tcpa;

    let infantCount = 0;
    if (this.group.value.infantNumber !== '') {
      infantCount = Number(this.group.value.infantNumber);
    }

    let result = infantCount * sum;
    if (Number.isNaN(result)) {
      result = 0;
    }

    console.log('result infant ' + result);
    return result;
  }

  getCurrencies() {
    // TODO: Get from API DDB
    this.bspCurrencyList = this.ddb.getCurrencies();
  }

  private loadValues() {
    if (this.pnrService.getRirRemarkText('ADULT PRICE--') === '') {
      this.getRIITourPackageRemarksFromGDS();
      this.packageRemarkHelper.getUDIDPackageRemarksFromGds(this.group);
    }
  }

  private getRIITourPackageRemarksFromGDS() {
    this.group.controls.balanceDueDate.setValue(this.packageRemarkHelper.getBalanceDueDate());
    this.group.controls.tourCurrencyType.setValue(this.packageRemarkHelper.getCurrency());

    const categories = ['Adult', 'Child', 'Infant'];
    const payables = ['PACKAGE', 'TAXES', 'INSURANCE'];
    const controls = [
      ['baseCost', 'taxesPerAdult', 'insurancePerAdult'],
      ['childBaseCost', 'taxesPerChild', 'insurancePerChild'],
      ['totalCostPerInfant']
    ];
    const numbers = ['adultNum', 'childrenNumber', 'infantNumber'];

    categories.forEach((c, i) => {
      let count = '0';
      payables.forEach((p, j) => {
        const result = this.packageRemarkHelper.getValuesFromPnr(c.toUpperCase() + ' ' + p + '--');
        if (result && j < controls[i].length) {
          this.group.get(controls[i][j]).setValue(result.amount);
          count = result.total;
        }
      });
      this.group.get(numbers[i]).setValue(count);
    });

    // this.packageRemarkHelper.getValues('ADULT', 'PACKAGE', 'baseCost', this.group);
    // this.packageRemarkHelper.getValues('ADULT', 'TAXES', 'taxesPerAdult', this.group);
    // this.packageRemarkHelper.getValues('ADULT', 'INSURANCE', 'insurancePerAdult', this.group);
    // this.packageRemarkHelper.getValues('CHILD', 'PACKAGE', 'childBaseCost', this.group);
    // this.packageRemarkHelper.getValues('CHILD', 'TAXES', 'taxesPerChild', this.group);
    // this.packageRemarkHelper.getValues('CHILD', 'INSURANCE', 'insurancePerChild', this.group);
    // this.packageRemarkHelper.getValues('INFANT', 'PACKAGE', 'totalCostPerInfant', this.group);
    // this.packageRemarkHelper.getCount('ADULT', 'PACKAGE', 'adultNum', this.group);
    // this.packageRemarkHelper.getCount('CHILD', 'PACKAGE', 'childrenNumber', this.group);
    // this.packageRemarkHelper.getCount('INFANT', 'PACKAGE', 'infantNumber', this.group);

    const regx = '([0-9]+[\\.]*[0-9]*)';
    this.group.controls.depositPaid.setValue(this.packageRemarkHelper.getRegexResult('LESS DEPOSIT PAID', regx));
    this.group.controls.totalCostHoliday.setValue(this.packageRemarkHelper.getRegexResult('TOTAL PACKAGE PRICE', regx));
    this.group.controls.balanceToBePaid.setValue(this.packageRemarkHelper.getRegexResult('BALANCE DUE', regx));
    this.packageRemarkHelper.removeOtherTourRemark();
  }
}
