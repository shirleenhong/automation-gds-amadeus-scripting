import { RemarkModel } from '../models/pnr/remark.model';
import { Injectable } from '@angular/core';
import { RemarkGroup } from '../models/pnr/remark.group.model';
import { DatePipe, DecimalPipe } from '@angular/common';
import { formatDate } from '@angular/common';

@Injectable({
    providedIn: 'root',
})

export class RemarkHelper {
    decPipe = new DecimalPipe('en-US');
    constructor() { }


    createRemark(remarkText, remarkType, remarkCategory) {
        const rem = new RemarkModel();
        rem.remarkType = remarkType;
        rem.remarkText = remarkText;
        rem.category = remarkCategory;
        return rem;
    }

    addSpaces(rm2: string, textToformat: string, len: number, type: string) {
        let newformat: string = rm2;

        if ((textToformat.length + rm2.length) < len) {
            for (let i = 1; i < len - (textToformat.length + rm2.length); i++) {
                newformat = newformat + '-';
            }
        }
        if (type === 'prefix') {
            newformat = newformat + ' ' + textToformat;
        } else {
            newformat = textToformat + ' ' + newformat;
        }

        return newformat;

    }


    processRiiRemark(label, amount, count) {
        if (isNaN(amount) || amount === null || amount === undefined || amount === '') { amount = '0.00'; }

        const r = 15;
        const l = 30;

        const amtStr = this.decPipe.transform(amount.toString().replace(',', ''), '1.2-2').replace(',', '');
        const z = l - (label.length + amtStr.length);
        let remark = '';

        if (count === null) {
            remark = label + '-'.repeat(z) + amtStr;

        } else {
            // const total = Math.round(Number(amount) * Number(count));
            const total = parseFloat(amount) * Number(count);
            const totalStr = this.decPipe.transform(total, '1.2-2');
            // console.log('Amount ' + parseFloat(amount));
            // console.log('total ' + total);
            const x = r - (count.toString().length + totalStr.length);
            remark = label + '-'.repeat(z) + amtStr + 'X' + count + '-'.repeat(x) + totalStr;
        }

        return this.createRemark(remark, 'RI', 'R');
    }

    getMaxLength(remtype) {
        let maxlen = 0;
        switch (remtype) {
            case 'General': {
                maxlen = 127;
                break;
            }
            case 'Itinerary': {
                maxlen = 65;
                break;
            }
            default: {
                maxlen = 127;
                break;
            }
        }
        return maxlen;

    }

    getRemark(remarkText, remarkType, remarkCategory) {
        const rem = new RemarkModel();
        rem.remarkType = remarkType;
        rem.remarkText = remarkText;
        rem.category = remarkCategory;
        return rem;
    }
}
