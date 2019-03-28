import { Injectable } from '@angular/core';
import { MatrixReceiptModel } from '../models/pnr/matrix-receipt.model';
import { MatrixAccountingModel } from '../models/pnr/matrix-accounting.model';
import { RemarkGroup } from '../models/pnr/remark.group.model';
import { RemarkModel } from '../models/pnr/remark.model';
import { DatePipe } from '@angular/common';



@Injectable({
    providedIn: 'root',
})
export class PaymentRemarkHelper {

    creditcardMaxValidator(newValue) {
        let pat = '';
        switch (newValue) {
            case 'VI': {
                pat = '^4[0-9]{15}$';
                break;
            }
            case 'MC': {
                pat = '^5[0-9]{15}$';
                break;
            }
            case 'AX': {
                pat = '^3[0-9]{14}$';
                break;
            }
            case 'DC': {
                pat = '^[0-9]{14,16}$';
                break;
            }
            default: {
                pat = '^[0-9]{14,16}$';
                break;
            }
        }
        return pat;
    }

    checkDate(newValue) {
        if (newValue.length < 5) { return false; }
        const dts = newValue.split('/');
        const month = dts[0];
        const year = dts[1];

        const d = new Date();
        const moNow = d.getMonth();
        const yrnow = parseInt(d.getFullYear().toString().substr(2, 2), 0);
        let valid = false;
        if (parseInt(year, 0) > yrnow) {
            valid = true;
        }
        if ((parseInt(year, 0) === yrnow) && (parseInt(month, 0) >= moNow + 1)) {
            valid = true;
        }
        return valid;
    }


}
