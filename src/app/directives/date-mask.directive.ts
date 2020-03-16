import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[formControlName][DateMask]'
})
export class DateMaskDirective {
  constructor(public ngControl: NgControl) {}

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event) {
    this.onInputChange(event, false);
  }

  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event) {
    this.onInputChange(event.target.value, true);
  }

  onInputChange(event, backspace) {
    if (event === undefined) {
      return;
    }
    /// ti be continue

    if (event.length < 3 && event.match(/[0-9]/g)) {
      this.ngControl.valueAccessor.writeValue(event);
    }

    let newVal = event.replace(/\D/g, '');
    if (backspace && newVal.length <= 6) {
      newVal = newVal.substring(0, newVal.length - 1);
    }
    if (newVal.length === 0) {
      newVal = '';
    } else if (newVal.length <= 3) {
      newVal = newVal.replace(/^(\d{0,2})/, '$1/');
    } else {
      newVal = newVal.substring(0, 10);
      newVal = newVal.replace(/^(\d{0,2})(\d{0,2})/, '$1/$2');
    }

    if (newVal.length > 5) {
      newVal = newVal.substring(0, newVal.length - 1);
    }
    this.ngControl.valueAccessor.writeValue(newVal);
  }
}
