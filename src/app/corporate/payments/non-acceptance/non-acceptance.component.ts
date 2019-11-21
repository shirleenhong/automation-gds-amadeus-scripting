import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { PnrService } from '../../../service/pnr.service';
import { StaticValuesService } from '../../../service/static-values.services';
import { DDBService } from 'src/app/service/ddb.service';
import { SelectItem } from 'src/app/models/select-item.model';
import { validateCreditCard } from 'src/app/shared/validators/leisure.validators';

@Component({
  selector: 'app-non-acceptance',
  templateUrl: './non-acceptance.component.html',
  styleUrls: ['./non-acceptance.component.scss']
})
export class NonAcceptanceComponent implements OnInit {
  @Input()
  val = '';
  nonAcceptanceForm: FormGroup;
  unticketedSegments = [];
  tstSelected = [];
  hasAirTst: boolean;
  hasAirSegment: boolean;
  vendorCodeList: Array<SelectItem>;
  tstData = [];

  onTouched: any = () => {};
  onChange: any = () => {};

  constructor(
    private fb: FormBuilder,
    private pnrService: PnrService,
    private staticService: StaticValuesService,
    private ddbService: DDBService
  ) {}

  ngOnInit() {
    this.hasAirTst = false;
    this.hasAirSegment = false;
    this.tstData = this.pnrService.getUnticketedCorpReceipts();
    if (this.tstData.length > 0) {
      this.hasAirTst = true;
      this.unticketedSegments = this.tstData;
      this.nonAcceptanceForm = this.fb.group({
        tst: new FormControl('', [Validators.pattern('[0-9]+(,[0-9]+)*')]),
        segments: this.fb.array(this.createArray())
      });
      this.vendorCodeList = this.ddbService.getCcVendorCodeList();
    }
  }

  createArray() {
    const frmArray = [];
    for (const fg in this.unticketedSegments) {
      if (fg) {
        const frm = this.fb.group({
          ccVendor: new FormControl(this.unticketedSegments[fg].ccVendor),
          ccNo: new FormControl('', [validateCreditCard('ccVendor')]).disable
        });
        frmArray.push(frm);
      }
    }
    return frmArray;
  }

  get value() {
    return this.val;
  }

  set value(val) {
    this.val = val;
    this.onChange(val);
    this.onTouched();
    this.nonAcceptanceForm.get('tst').markAsDirty();
  }

  writeValue(obj: any): void {
    this.nonAcceptanceForm.get('tst').setValue(obj);
    this.val = obj;
  }

  updateValue(val: any, i: any) {
    const newVal = val.currentTarget.value;
    const isChecked = val.currentTarget.checked;
    let items: any;
    // tslint:disable-next-line: no-string-literal
    items = this.nonAcceptanceForm.get('segments')['controls'];
    if (isChecked) {
      this.tstSelected.push(newVal);
      items[i].controls.ccNo.enable();
      items[i].controls.ccNo.markAsDirty();
      items[i].controls.ccNo.setValidators([Validators.required, validateCreditCard('ccVendor')]);
      items[i].controls.ccNo.updateValueAndValidity();
    } else {
      this.tstSelected.splice(this.tstSelected.indexOf(newVal), 1);
      items[i].controls.ccNo.disable();
      items[i].controls.ccNo.clearValidators();
      items[i].controls.ccNo.updateValueAndValidity();
    }

    this.value = this.tstSelected.join(',');
    this.nonAcceptanceForm.get('tst').setValue(this.val);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.nonAcceptanceForm.get('tst').disable();
    } else {
      this.nonAcceptanceForm.get('tst').enable();
    }
  }

  get f() {
    return this.nonAcceptanceForm.controls;
  }

  enableFormControls(controls: string[], disabled: boolean) {
    controls.forEach((c) => {
      if (disabled) {
        this.nonAcceptanceForm.get(c).disable();
        this.nonAcceptanceForm.get(c).reset();
      } else {
        this.nonAcceptanceForm.get(c).enable();
      }
    });
  }

  creditcardMaxValidator() {
    this.f.ccNo.setValue(this.f.ccNo.value);
  }

  check(airline: any, cc: any) {
    const result = this.staticService.getAirlineVendor(airline, cc);
    if (result === -1) {
      return false;
    } else {
      return true;
    }
  }
}
