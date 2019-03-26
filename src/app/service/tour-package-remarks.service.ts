
import { RemarkModel } from '../models/pnr/remark.model';

import { PnrService } from './pnr.service';

import { Injectable } from '@angular/core';
import { RemarkGroup } from '../models/pnr/remark.group.model';
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})

export class TourPackageRemarksService {

    // constructor(private pnrService: PnrService) {

    // }
    constructor() { }
    // private fb: FormBuilder
    // public GetRemarks(group: FormGroup) {
    // WordpressForm = this.fb.group({
    //     title: ['', [Validators.required]]
    // });

    //     // TODO: Do what ever here
    //     var model = new RemarkModel();
    //     model.remarkType = "Test"
    //     model.remarkText = group.controls['adultNum'].value;
    //     return
    // }
    public GetRemarks(group: any) {
        const rmGroup = new RemarkGroup();
        rmGroup.group = 'Tour Package';
        rmGroup.remarks = new Array<RemarkModel>();
        const datePipe = new DatePipe('en-US');

        // debugger;
        // const ad = group.adultNum;
        // alert(ad);
        // alert(this.WordpressForm.get('adultNum'));
        // group.controls['currencyCode'.toString()].value

        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.createRemark('THE FOLLOWING COSTS ARE SHOWN IN ' + group.userIdFirstWay, 'RI', 'I'));
        if (parseInt(group.adultNum, 0) > 0) {

            // tslint:disable-next-line:max-line-length
            rmGroup.remarks.push(this.createRemark('ADULT PACKAGE ---------' + this.addSpaces(group.baseCost, 10, 'prefix') + 'X' + this.addSpaces(group.adultNum, 5, 'suffix') + ' ' + (parseInt(group.baseCost, 0) * parseInt(group.adultNum, 0)), 'RI', 'I'));
            // tslint:disable-next-line:max-line-length
            rmGroup.remarks.push(this.createRemark('ADULT TAXES -----------' + this.addSpaces(group.taxesPerAdult, 10, 'prefix') + 'X' + this.addSpaces(group.adultNum, 5, 'suffix') + ' ' + (parseInt(group.taxesPerAdult, 0) * parseInt(group.adultNum, 0)), 'RI', 'I'));
            // tslint:disable-next-line:max-line-length
            rmGroup.remarks.push(this.createRemark('ADULT INSURANCE -------' + this.addSpaces(group.insurancePerAdult, 10, 'prefix') + 'X' + this.addSpaces(group.adultNum, 5, 'suffix') + ' ' + (parseInt(group.insurancePerAdult, 0) * parseInt(group.adultNum, 0)), 'RI', 'I'));

        }

        if (parseInt(group.childrenNumber, 0) > 0) {
            // tslint:disable-next-line:max-line-length
            rmGroup.remarks.push(this.createRemark('CHILD PACKAGE ---------' + this.addSpaces(group.childBaseCost, 10, 'prefix') + 'X' + this.addSpaces(group.childrenNumber, 5, 'suffix') + ' ' + (parseInt(group.childBaseCost, 0) * parseInt(group.childrenNumber, 0)), 'RI', 'I'));
            // tslint:disable-next-line:max-line-length
            rmGroup.remarks.push(this.createRemark('CHILD TAXES -----------' + this.addSpaces(group.taxesPerChild, 10, 'prefix') + 'X' + this.addSpaces(group.childrenNumber, 5, 'suffix') + ' ' + (parseInt(group.taxesPerChild, 0) * parseInt(group.childrenNumber, 0)), 'RI', 'I'));
            // tslint:disable-next-line:max-line-length
            rmGroup.remarks.push(this.createRemark('CHILD INSURANCE -------' + this.addSpaces(group.insurancePerChild, 10, 'prefix') + 'X' + this.addSpaces(group.childrenNumber, 5, 'suffix') + ' ' + (parseInt(group.insurancePerChild, 0) * parseInt(group.childrenNumber, 0)), 'RI', 'I'));

        }

        if (parseInt(group.infantNumber, 0) > 0) {
            // tslint:disable-next-line:max-line-length
            rmGroup.remarks.push(this.createRemark('INFANT PACKAGE ---------' + this.addSpaces(group.totalCostPerInfant, 10, 'prefix') + 'X' + this.addSpaces(group.infantNumber, 5, 'suffix') + ' ' + (parseInt(group.totalCostPerInfant, 0) * parseInt(group.infantNumber, 0)), 'RI', 'I'));
        }


        rmGroup.remarks.push(this.createRemark('TOTAL PACKAGE PRICE ' + group.totalCostHoliday, 'RI', 'I'));
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.createRemark('LESS DEPOSIT PAID ' + group.lessDepositPaid + ' - ' + formatDate(Date.now(), 'dMMM', 'en'), 'RI', 'I'));
        rmGroup.remarks.push(this.createRemark('BALANCE DUE ' + group.balanceToBePaid, 'RI', 'I'));
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.createRemark('---- BALANCE OF ' + group.balanceToBePaid + ' IS DUE ' + datePipe.transform(group.balanceDueDate, 'dMMMyy') + '----', 'RI', 'I'));
        rmGroup.remarks.push(this.createRemark('SOME TAXES ARE PAYABLE LOCALLY AND NOT INCLUDED ABOVE', 'RI', 'I'));
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.createRemark('U43/-' + datePipe.transform(group.balanceDueDate, 'MMMyy'), 'RM', '*'));
        // rmGroup.remarks.push(this.getRemark('*U43/-' + formatDate(this.balanceDueDate,'MMMyy','en'),'RM','*'));
        rmGroup.remarks.push(this.createRemark('U41/-' + group.balanceToBePaid, 'RM', '*'));
        rmGroup.remarks.push(this.createRemark('U42/-' + group.commisionAmount, 'RM', '*'));
        // this.remarkCollectionService.addUpdateRemarkGroup(rmGroup);
        //  alert(JSON.stringify(rmGroup));
        return rmGroup;
    }


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
