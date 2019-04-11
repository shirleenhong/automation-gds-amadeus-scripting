import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { isUndefined } from 'util';

@Directive({
    selector: '[formControlName][AmountMask]',
})
export class AmountMaskDirective {
    decPipe = new DecimalPipe('en-US');

    constructor(public ngControl: NgControl) { }

    @HostListener('ngModelChange', ['$event'])
    onModelChange(event) {
        this.onInputChange(event, false);
    }

    @HostListener('blur')
    onBlur() {
        if (this.ngControl.value === null || this.ngControl.value === undefined || isNaN(this.ngControl.value)) { return; }
        const newVal = this.decPipe.transform(this.ngControl.value.replace(',', ''), '1.2-2').replace(',', '');
        this.ngControl.control.setValue(newVal);
    }

    onInputChange(event, backspace) {
        let newVal = event;

        if (newVal === null || newVal === undefined) { return newVal; }

        const lastChar = newVal.substr(newVal.length - 1);

        if (lastChar.match(/[0-9]/g) === null && lastChar !== '.') {
            newVal = newVal.substr(0, newVal.length - 1);
        }
        if ((lastChar === '.') && (newVal.match(/\./g)).length > 1) {
            newVal = newVal.substr(0, newVal.length - 1);
        }
        this.ngControl.valueAccessor.writeValue(newVal);
    }
}
