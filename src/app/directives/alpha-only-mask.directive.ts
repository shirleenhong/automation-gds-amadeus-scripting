import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[formControlName][AlphaMask]'
})
export class AlphaMaskDirective {
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

    if (lastChar.match(/[a-z]/g) === null && lastChar.match(/[A-Z]/g) === null) {
      newVal = newVal.substr(0, newVal.length - 1);
    }
    this.ngControl.valueAccessor.writeValue(newVal.toString().toUpperCase());
  }
}
