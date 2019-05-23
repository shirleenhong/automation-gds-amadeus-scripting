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
        // this.onInputChange(event, false);
    }

    @HostListener('blur')
    onBlur() {
        if (this.ngControl.value === null || this.ngControl.value === undefined || isNaN(this.ngControl.value)) { return; }
        const newVal = this.amountPipe.transform(this.ngControl.value);
        this.ngControl.control.setValue(newVal.replace(/\,/g, ''));

    }

    @HostListener('keydown', ['$event'])
    onKeydown(e) {
        const regex = /[0-9]|\./g;
        const key = e.keyCode ? e.keyCode : e.charCode;
        const value = e.target.value;
        if (key > 57 && ((e.key === '.' && value.indexOf('.') >= 0) || e.key !== '.') && !(key >= 96 && key <= 106)) {
            e.preventDefault();
        }
    }



}
