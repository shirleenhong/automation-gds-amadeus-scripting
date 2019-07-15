import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[formControlName][AlphaNumericMask]'
})
export class AlphaNumericMaskDirective {
  decPipe = new DecimalPipe('en-US');

  constructor(public ngControl: NgControl) {}

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event) {
    this.onInputChange(event);
  }

  onInputChange(event) {
    let newVal = event;

    if (newVal === null || newVal === undefined || newVal.length === 0) {
      return newVal;
    }
    const lastChar = newVal.toString().substr(newVal.length - 1);

    if (lastChar.match(/[0-9]/g) === null && lastChar.match(/[a-z]/g) === null && lastChar.match(/[A-Z]/g) === null) {
      newVal = newVal.substr(0, newVal.length - 1);
    }
    this.ngControl.valueAccessor.writeValue(newVal);
  }
}
