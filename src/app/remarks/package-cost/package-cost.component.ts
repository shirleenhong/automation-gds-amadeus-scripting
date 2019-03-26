import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { FormBuilder, ControlValueAccessor, Validator, FormGroup, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { DDBService } from 'src/app/service/ddb.service';
import { SelectItem } from 'src/app/models/select-item.model';

@Component({
  selector: 'app-package-cost',
  templateUrl: './package-cost.component.html',
  styleUrls: ['./package-cost.component.scss']
})
export class PackageCostComponent implements OnInit, OnChanges, ControlValueAccessor, Validator {

  currencies: SelectItem[];

  @Input() group: FormGroup;

  // constructor(private ddbService: DDBService) {
  constructor() {
    // this.group = this.fb.group({
    //   userIdFirstWay: new FormControl('')
    // });
  }

  ngOnInit() {
    // this.currencies = this.ddbService.getCurrencies();

    // this.group.get('adultPrice').valueChanges.subscribe(val => {
    //   // TODO: This watches for adult price change, do computation here

    // });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // TODO: Do whatever you want here on change
  }

  public onTouched: () => void = () => { };

  writeValue(val: any): void {
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
    return this.group.valid ? null : { invalidForm: { valid: false, message: 'basicInfoForm fields are invalid' } };
  }

}
