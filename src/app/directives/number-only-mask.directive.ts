import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[formControlName][NumberOnlyMask]'
})
export class NumberOnlyMaskDirective {

    constructor(public ngControl: NgControl) { }

    @HostListener('ngModelChange', ['$event'])
    onModelChange(event) {
        this.onInputChange(event, false);
    }

    @HostListener('keydown.backspace', ['$event'])
    keydownBackspace(event) {
        this.onInputChange(event.target.value, false);
    }

    onInputChange(event, backspace) {
        if (event === undefined || event === null) { return; }
        const newVal = event.toString().replace(/\D/g, '');

        this.ngControl.valueAccessor.writeValue(newVal);
    }
}
