import { RemarkModel } from '../models/pnr/remark.model';
import { Injectable } from '@angular/core';
import { RemarkGroup } from '../models/pnr/remark.group.model';
import { DatePipe, DecimalPipe } from '@angular/common';
import { formatDate } from '@angular/common';
import { PnrService } from '../service/pnr.service';
import { FormGroup } from '@angular/forms';
import { debug } from 'util';


@Injectable({
    providedIn: 'root',
})

export class PackageRemarkHelper {
    forDeletion = [];

    constructor(private pnrService: PnrService) { }

    getForDeletion() {
        return this.forDeletion;
    }

    getCount(search: string, category: string, controlName: string, group: FormGroup) {
        const textSearch = this.pnrService.getRIIRemarkText(search + ' ' + category);
        if (textSearch !== '') {
            if (textSearch.fullNode.miscellaneousRemarks.remarks.freetext !== '') {
                const regx = "X(\\d+)\\b";
                // tslint:disable-next-line:max-line-length
                group.controls[controlName].setValue(this.getRegexResult(textSearch.fullNode.miscellaneousRemarks.remarks.freetext, regx).replace('X', ''));
            }
        }
    }

    getValues(search: string, category: string, controlName: string, group: FormGroup) {
        const textSearch = this.pnrService.getRIIRemarkText(search + ' ' + category);
        const regx = "(\\d+((?:,\\d+)*,\\d{3})?\\.\\d{2,3})(.*?X)";
        if (textSearch !== '') {
            if (textSearch.fullNode.miscellaneousRemarks.remarks.freetext !== '') {
                // tslint:disable-next-line:max-line-length
                group.controls[controlName].setValue(this.getRegexResult(textSearch.fullNode.miscellaneousRemarks.remarks.freetext, regx).replace('X', ''));
                // this.forDeletion.push(textSearch.elementNumber);
            }
        }
    }

    private replaceText(value: string, find: string, replace: string) {
        return value.replace(new RegExp(find, 'g'), replace);
    }

    getCurrency() {
        // tslint:disable-next-line:max-line-length
        const textSearch = this.pnrService.getRIIRemarkText('THE FOLLOWING COSTS ARE SHOWN IN');
        if (textSearch !== '') {
            if (!this.forDeletion.includes(textSearch.elementNumber)) {
                this.forDeletion.push(textSearch.elementNumber);
            }
            if (textSearch.fullNode.miscellaneousRemarks.remarks.freetext !== '') {
                const currency = textSearch.fullNode.miscellaneousRemarks.remarks.freetext.split(' ');
                if (currency.length === 7) {
                    return currency[6];
                }
            }
        }
        return '';
    }

    removeOtherTourRemark() {
        const textOne = this.pnrService.getRIIRemarkText('SOME TAXES ARE PAYABLE LOCALLY AND NOT INCLUDED ABOVE');
        if (textOne !== '') {
            this.forDeletion.push(textOne.elementNumber);
        }
    }

    getUDIDPackageRemarksFromGds(group: FormGroup) {
        const commAmount = this.pnrService.getUDIDText('*U42/');
        if (commAmount !== '') {
            group.controls.commission.setValue(commAmount.fullNode.miscellaneousRemarks.remarks.freetext.replace('*U42/-', ''));
            this.forDeletion.push(commAmount.elementNumber);
        }

        const ufortyOne = this.pnrService.getUDIDText('*U41/');
        const ufortyThree = this.pnrService.getUDIDText('*U43/');
        if (ufortyOne !== '') {
            this.forDeletion.push(ufortyOne.elementNumber);
        }

        if (ufortyThree !== '') {
            this.forDeletion.push(ufortyThree.elementNumber);
        }

    }

    getBalanceDueDate() {
        const textSearch = this.pnrService.getRIIRemarkText('---- BALANCE OF');
        if (textSearch !== '') {
            if (textSearch.fullNode.miscellaneousRemarks.remarks.freetext !== '') {
                const values = textSearch.fullNode.miscellaneousRemarks.remarks.freetext.split(' ');
                if (values.length === 8) {
                    // 15MAR19 7
                    // 1JAN19  6
                    // return new Date(values[6]);
                    let lenV = 0;
                    if (values[6].length === 7) {
                        lenV = 1;
                    }

                    const myDate: Date = new Date();
                    const currentYear = new Date().getFullYear();
                    const dueDateYear = Number(this.sliceValuesInString(values[6], 4 + lenV, 4 + lenV + 2));
                    // const year = currentYear - dueDateYear;
                    myDate.setMonth(this.getMonthNumber(this.sliceValuesInString(values[6], 1 + lenV, 1 + lenV + 3)));
                    myDate.setFullYear(Number(Math.floor(currentYear / 100).toString() + dueDateYear.toString()));
                    myDate.setDate(Number(this.sliceValuesInString(values[6], 0, 1 + lenV)));
                    if (!this.forDeletion.includes(textSearch.elementNumber)) {
                        this.forDeletion.push(textSearch.elementNumber);
                    }
                    return myDate.toISOString().substr(0, 10);
                }
            }
        }

        return '';
    }

    private sliceValuesInString(value: string, startIndex: number, endIndex: number) {
        return value.slice(startIndex, endIndex);
    }

    private getMonthNumber(month: string) {
        if (month === 'JAN') {
            return 0;
        }
        if (month === 'FEB') {
            return 1;
        }
        if (month === 'MAR') {
            return 2;
        }
        if (month === 'APR') {
            return 3;
        }
        if (month === 'MAY') {
            return 4;
        }
        if (month === 'JUN') {
            return 5;
        }
        if (month === 'JUL') {
            return 6;
        }
        if (month === 'AUG') {
            return 7;
        }
        if (month === 'SEP') {
            return 8;
        }
        if (month === 'OCT') {
            return 9;
        }
        if (month === 'NOV') {
            return 10;
        }
        if (month === 'DEC') {
            return 11;
        }
    }

    getRegexResult(rem: string, regx: string) {
        const regexp = new RegExp(regx);
        const textSearch = this.pnrService.getRIIRemarkText(rem);
        if (textSearch !== '') {
            if (textSearch.fullNode.miscellaneousRemarks.remarks.freetext !== '') {
                console.log(regexp.test(textSearch.fullNode.miscellaneousRemarks.remarks.freetext));
                if (regexp.test(textSearch.fullNode.miscellaneousRemarks.remarks.freetext)) {
                    for (let result = regexp.exec(textSearch.fullNode.miscellaneousRemarks.remarks.freetext); result !== null;
                        result = regexp.exec(textSearch.fullNode.miscellaneousRemarks.remarks.freetext)) {
                        console.log('result ' + result[0].toLocaleLowerCase());
                        if (!this.forDeletion.includes(textSearch.elementNumber)) {
                            this.forDeletion.push(textSearch.elementNumber);
                        }
                        return result[0];
                    }
                }
            }
        }
        return '0.00';
    }

}
