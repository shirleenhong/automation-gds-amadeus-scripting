import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

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
      genericElement: new FormControl('', [Validators.required])
    });
  }
  val = '';
  elementSelected = [];
  @Input() genericList;
  onTouched: any = () => { };
  ngOnInit() {
  }
  set value(val) {
    this.val = val;
    this.onTouched();
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  updateValue(val) {
    const newVal = val.currentTarget.value;
    const isChecked = val.currentTarget.checked;

    if (isChecked) {
      this.elementSelected.push(newVal);
    } else {
      this.elementSelected.splice(this.elementSelected.indexOf(newVal), 1);
    }

    this.value = this.elementSelected.join(',');
    this.genericElementGroup.get('genericElement').setValue(this.val);
  }
  elementChecked(item) {
    return (this.val ? this.val.split(',').indexOf(item.lineNo) >= 0 : false);
  }
}
