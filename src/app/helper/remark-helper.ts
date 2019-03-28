import { RemarkModel } from '../models/pnr/remark.model';
import { Injectable } from '@angular/core';
import { RemarkGroup } from '../models/pnr/remark.group.model';
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';

@Injectable({
    providedIn: 'root',
})

export class RemarkHelper {
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
}
