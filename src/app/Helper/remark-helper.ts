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

    addSpaces(textToformat: string, len: number, type: string) {
        let newformat: string = '';

        if (textToformat.length < 10) {
            for (let i = 1; i < (len - textToformat.length); i++) {
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
