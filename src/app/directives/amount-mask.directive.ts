import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { isUndefined } from 'util';
import { AmountPipe } from '../pipes/amount.pipe';

@Directive({
    selector: '[formControlName][AmountMask]',
})
export class AmountMaskDirective {
    amountPipe = new AmountPipe();

    constructor(public ngControl: NgControl) { }

    @HostListener('ngModelChange', ['$event'])
    onModelChange(event) {
        this.onInputChange(event, false);
    }

    @HostListener('blur')
    onBlur() {
        if (this.ngControl.value === null || this.ngControl.value === undefined || isNaN(this.ngControl.value)) { return; }
        const newVal = this.amountPipe.transform(this.ngControl.value.replace(',', ''));
        this.ngControl.control.setValue(newVal);
    }

    onInputChange(event, backspace) {
        let newVal = event;

        if (newVal === null || newVal === undefined) { return newVal; }

        const lastChar = newVal.substr(newVal.length - 1);

        if (lastChar.match(/[0-9]/g) === null || lastChar !== '.') {
            newVal = newVal.substr(0, newVal.length - 1);
        }
        if ((lastChar === '.') && (newVal.match(/\./g)).length > 1) {
            newVal = newVal.substr(0, newVal.length - 1);
        }
        this.ngControl.valueAccessor.writeValue(newVal);
    }
}
