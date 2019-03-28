import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[formControlName][AmountMask]',
})
export class AmountMaskDirective {

    constructor(public ngControl: NgControl) { }

    @HostListener('ngModelChange', ['$event'])
    onModelChange(event) {
        this.onInputChange(event, false);
    }

    // @HostListener('keydown.backspace', ['$event'])
    // keydownBackspace(event) {
    //     this.onInputChange(event.target.value, false);
    // }

    onInputChange(event, backspace) {
        let newVal = event;

        if (newVal === null) { return newVal; }
        const lastChar = newVal.substr(newVal.length - 1);

        if (lastChar.match(/[0-9]/g) === null && lastChar !== '.') {
            newVal = newVal.substring(0, newVal.length - 1);
        }
        if ((lastChar === '.') && (newVal.match(/\./g)).length > 1) {
            newVal = newVal.substring(0, newVal.length - 1);
        }
        this.ngControl.valueAccessor.writeValue(newVal);
    }
}
