import { Component, OnInit, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-generic-select',
  templateUrl: './generic-select.component.html',
  styleUrls: ['./generic-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GenericSelectComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => GenericSelectComponent),
      multi: true
    }
    /// { provide: BsDropdownConfig, useValue: { autoClose: false } }
  ]
})
export class GenericSelectComponent implements OnInit {
  genericElementGroup: FormGroup;
  constructor(fb: FormBuilder) {
    this.genericElementGroup = fb.group({
      genericElement: new FormControl('', [])
    });
  }
  val = '';
  elementSelected = [];
  @Input() genericList;
  @Output() passDataParent: EventEmitter<any> = new EventEmitter<any>();
  onTouched: any = () => {};
  validateFn: any = () => {};
  onChange: any = () => {};
  ngOnInit() {}
  set value(val) {
    this.val = val;
    this.onChange(val);
    this.onTouched();
  }
  get value() {
    return this.val;
  }
  writeValue(obj: any): void {
    this.genericElementGroup.get('genericElement').setValue(obj);
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
      this.genericElementGroup.get('genericElement').disable();
    } else {
      this.genericElementGroup.get('genericElement').enable();
    }
  }
  updateValue() {
    const selectedEle = [];
    for (const ele of this.genericList) {
      if (ele.lineNo === 'All' && ele.isChecked) {
        selectedEle.push(ele.lineNo);
        break;
      } else {
        if (ele.isChecked) {
          selectedEle.push(ele.lineNo);
        }
      }
    }
    const val = selectedEle.join(',');
    this.value = val;
    this.genericElementGroup.get('genericElement').setValue(val);
  }
  elementChecked(item) {
    return this.val ? this.val.split(',').indexOf(item.lineNo) >= 0 : false;
  }
  selectedAll() {
    for (const ele of this.genericList) {
      ele.isChecked = true;
    }
  }
  validate(c: FormControl) {
    return this.validateFn(c);
  }
  getSelected(data: any) {
    data.isChecked = !data.isChecked;
    this.updateValue();
    // const val = this.genericList
    //   .filter((x) => x.isChecked)
    //   .map((x) => x.lineNo)
    //   .join(',');
    // this.genericElementGroup.get('genericElement').setValue(val);
    this.passDataParent.emit(data);
  }
}
