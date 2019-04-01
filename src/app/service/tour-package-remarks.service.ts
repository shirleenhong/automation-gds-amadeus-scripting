
import { RemarkModel } from '../models/pnr/remark.model';

import { PnrService } from './pnr.service';

import { Injectable } from '@angular/core';
import { RemarkGroup } from '../models/pnr/remark.group.model';
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { RemarkHelper } from '../helper/remark-helper';
@Injectable({
    providedIn: 'root',
})

export class TourPackageRemarksService {

    constructor(private remarkHelper: RemarkHelper) { }
    public GetRemarks(group: FormGroup) {

        const rmGroup = new RemarkGroup();
        rmGroup.group = 'Tour Package';
        rmGroup.remarks = new Array<RemarkModel>();
        const datePipe = new DatePipe('en-US');

        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('THE FOLLOWING COSTS ARE SHOWN IN ' + group.controls.tourCurrencyType.value, 'RI', 'I'));

        if (Number(group.controls.adultNum.value) > 0) {


            rmGroup.remarks.push(this.remarkHelper.processRiiRemark('ADULT PACKAGE',
                group.controls.baseCost.value, group.controls.adultNum.value));
            rmGroup.remarks.push(this.remarkHelper.processRiiRemark('ADULT TAXES',
                group.controls.taxesPerAdult.value, group.controls.adultNum.value));
            rmGroup.remarks.push(this.remarkHelper.processRiiRemark('ADULT INSURANCE',
                group.controls.insurancePerAdult.value, group.controls.adultNum.value));
        }

        if (Number(group.controls.childrenNumber.value) > 0) {

            rmGroup.remarks.push(this.remarkHelper.processRiiRemark('CHILD PACKAGE',
                group.controls.childBaseCost.value, group.controls.childrenNumber.value));
            rmGroup.remarks.push(this.remarkHelper.processRiiRemark('CHILD TAXES',
                group.controls.taxesPerChild.value, group.controls.childrenNumber.value));
            rmGroup.remarks.push(this.remarkHelper.processRiiRemark('CHILD INSURANCE',
                group.controls.insurancePerChild.value, group.controls.childrenNumber.value));
        }

        if (Number(group.controls.infantNumber.value) > 0) {

            rmGroup.remarks.push(this.remarkHelper.processRiiRemark('INFANT PACKAGE', group.controls.totalCostPerInfant.value,
                group.controls.infantNumber.value));
        }

        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('TOTAL PACKAGE PRICE ' + (group.controls.totalCostHoliday.value === '' ? '0.00' : group.controls.totalCostHoliday.value), 'RI', 'I'));
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('LESS DEPOSIT PAID ' + (group.controls.depositPaid.value === '' ? '0.00' : group.controls.depositPaid.value) + ' - ' + formatDate(Date.now(), 'dMMM', 'en'), 'RI', 'I'));
        rmGroup.remarks.push(this.remarkHelper.createRemark('BALANCE DUE ' + group.controls.balanceToBePaid.value, 'RI', 'I'));
        // tslint:disable-next-line:max-line-length
        if (group.controls.balanceDueDate.value) {
            rmGroup.remarks.push(this.remarkHelper.createRemark('---- BALANCE OF ' + (group.controls.balanceToBePaid.value === '' ? '0.00' : group.controls.balanceToBePaid.value)
                + ' IS DUE ' + datePipe.transform(group.controls.balanceDueDate.value, 'dMMMyy') + ' ----', 'RI', 'I'));
        }

        rmGroup.remarks.push(this.remarkHelper.createRemark('SOME TAXES ARE PAYABLE LOCALLY AND NOT INCLUDED ABOVE', 'RI', 'I'));
        if (group.controls.balanceDueDate.value.length > 0) {
            // tslint:disable-next-line:max-line-length
            rmGroup.remarks.push(this.remarkHelper.createRemark('U43/-' + datePipe.transform(group.controls.balanceDueDate.value, 'MMMyy'), 'RM', '*'));
        }

        if (group.controls.balanceToBePaid.value.length > 0) {
            rmGroup.remarks.push(this.remarkHelper.createRemark('U41/-' + group.controls.balanceToBePaid.value, 'RM', '*'));
        }

        if (group.controls.commisionAmount.value.length > 0) {
            rmGroup.remarks.push(this.remarkHelper.createRemark('U42/-' + group.controls.commisionAmount.value, 'RM', '*'));
        }

        return rmGroup;
    }
}
