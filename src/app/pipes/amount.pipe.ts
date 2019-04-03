import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'amountPipe'
})
export class AmountPipe implements PipeTransform {
    decPipe = new DecimalPipe('en-Us');
    transform(value: any) {
        let newVal = parseFloat(value);
        if (newVal === undefined || isNaN(newVal)) {
            newVal = 0;
        }
        return this.decPipe.transform(value).replace(',', '');
    }

    constructor() {

    }

}
