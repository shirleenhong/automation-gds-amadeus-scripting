import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { AmountPipe } from '../pipes/amount.pipe';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[formControlName][AmountMask]'
})
export class AmountMaskDirective {
  amountPipe = new AmountPipe();

  constructor(public ngControl: NgControl, private el: ElementRef) { }

  @HostListener('ngModelChange', ['$event'])
  onModelChange() {
    // this.onInputChange(event, false);
  }

  @HostListener('blur')
  onBlur() {
    if (this.ngControl.value === null || this.ngControl.value === undefined || isNaN(this.ngControl.value)) {
      return;
    }

    let newVal = this.amountPipe.transform(this.ngControl.value);
    newVal = newVal.replace(/\,/g, '');
    const max = this.el.nativeElement.maxLength;
    if (max > 0 && newVal.length > max) {
      newVal = newVal.replace('.00', '');
    }
    this.ngControl.control.setValue(newVal);
  }

  @HostListener('keydown', ['$event'])
  onKeydown(e) {
    const key = e.keyCode ? e.keyCode : e.charCode;
    const value = e.target.value;
    if (key > 57 && ((e.key === '.' && value.indexOf('.') >= 0) || e.key !== '.') && !(key >= 96 && key <= 106)) {
      e.preventDefault();
    }
  }
}
