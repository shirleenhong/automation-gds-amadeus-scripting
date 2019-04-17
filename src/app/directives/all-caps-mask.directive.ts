import { HostListener, Directive } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[formControlName][AllCapsMask]',
})
export class AllCapsMaskDirective {


    constructor(public ngControl: NgControl) { }

    @HostListener('blur')
    onBlur() {
        if (this.ngControl.value === null || this.ngControl.value === undefined || (this.ngControl.value === '')) { return; }
        const newVal = this.ngControl.value.toString().toUpperCase();
        this.ngControl.control.setValue(newVal);
    }
}
