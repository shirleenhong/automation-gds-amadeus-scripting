import { Component, OnInit, forwardRef } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  NG_VALIDATORS,
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
  Validator
} from '@angular/forms';
import { PnrService } from 'src/app/service/pnr.service';

@Component({
  selector: 'app-passenger-select',
  templateUrl: './passenger-select.component.html',
  styleUrls: ['./passenger-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PassengerSelectComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PassengerSelectComponent),
      multi: true
    }
  ]
})
export class PassengerSelectComponent
  implements OnInit, ControlValueAccessor, Validator {
  val = '';
  passengerGroup: FormGroup;
  passengerList = [];
  passengerSelected = [];
  isSinglePassenger = false;

  propagateChange: any = () => { };
  validateFn: any = () => { };
  onTouched: any = () => { };
  onChange: any = () => { };

  writeValue(obj: any): void {
    this.passengerGroup.get('passenger').setValue(obj);
    this.val = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.passengerGroup.get('passenger').disable();
    } else {
      this.passengerGroup.get('passenger').enable();
    }
  }

  validate(c: FormControl) {
    return this.validateFn(c);
  }

  constructor(fb: FormBuilder, private pnrService: PnrService) {
    this.passengerGroup = fb.group({
      passenger: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.passengerList = this.pnrService.getPassengers();
    this.passengerGroup.get('passenger').markAsDirty();
    if (this.passengerList.length === 1) {
      this.isSinglePassenger = true;
    } else {
      this.isSinglePassenger = false;
    }
  }

  get value() {
    return this.val;
  }

  set value(val) {
    this.val = val;
    this.onChange(val);
    this.onTouched();
    this.passengerGroup.get('passenger').markAsDirty();
  }

  updateValue(val) {
    const newVal = val.currentTarget.value;
    const isChecked = val.currentTarget.checked;

    if (isChecked) {
      this.passengerSelected.push(newVal);
    } else {
      this.passengerSelected.splice(this.passengerSelected.indexOf(newVal), 1);
    }

    this.value = this.passengerSelected.join(',');
    this.passengerGroup.get('passenger').setValue(this.val);
  }

  passengerChecked(item) {
    return (this.val ? this.val.split(',').indexOf(item.lineNo) >= 0 : false);
  }
}
