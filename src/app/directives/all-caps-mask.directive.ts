import { HostListener, Directive } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[formControlName][AllCapsMask]'
})
export class AllCapsMaskDirective {
  constructor(public ngControl: NgControl) {}

  @HostListener('blur')
  onBlur() {
    if (this.ngControl.value === null || this.ngControl.value === undefined || this.ngControl.value === '') {
      return;
    }
    const newVal = this.ngControl.value.toString().toUpperCase();
    this.ngControl.control.setValue(newVal);
  }

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event) {
    this.onInputChange(event);
  }
  onInputChange(event) {
    if (event) {
      this.ngControl.valueAccessor.writeValue(event.toString().toUpperCase());
    }
  }
}
