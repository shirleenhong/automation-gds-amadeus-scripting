import { RemarkModel } from '../models/pnr/remark.model';

import { PnrService } from './pnr.service';

import { Injectable } from '@angular/core';
import { RemarkGroup } from '../models/pnr/remark.group.model';
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { RemarkHelper } from '../Helper/remark-helper';

@Injectable({
    providedIn: 'root',
})


export class PackageCostRemarksService {
    constructor(private remarkHelper: RemarkHelper) { }

    public GetRemarks(group: any) {

        const rmGroup = new RemarkGroup();
        rmGroup.group = 'Tour Package';
        rmGroup.remarks = new Array<RemarkModel>();
        const datePipe = new DatePipe('en-US');

        // rmGroup.remarks.push(this.remarkHelper.createRemark('THE FOLLOWING COSTS ARE SHOWN IN ' + group.userIdFirstWay, 'RI', 'I'));
        // // tslint:disable-next-line:max-line-length
        // rmGroup.remarks.push(this.remarkHelper.createRemark('ADULT PRICE' + this.remarkHelper.addSpaces(group.adultNum, 10, 'prefix') + 'X' + this.remarkHelper.addSpaces(group.adultPrice, 5, 'suffix') + ' ' + (parseInt(group.baseCost, 0) * parseInt(group.adultNum, 0)), 'RI', 'I'));
        // // tslint:disable-next-line:max-line-length
        // rmGroup.remarks.push(this.remarkHelper.createRemark('ADULT TAXES' + this.remarkHelper.addSpaces(group.taxesPerAdult, 10, 'prefix') + 'X' + this.remarkHelper.addSpaces(group.adultNum, 5, 'suffix') + ' ' + (parseInt(group.taxesPerAdult, 0) * parseInt(group.adultNum, 0)), 'RI', 'I'));
        // // tslint:disable-next-line:max-line-length
        // rmGroup.remarks.push(this.remarkHelper.createRemark('ADULT GST' + this.remarkHelper.addSpaces('to do', 10, 'prefix') + 'X' + this.remarkHelper.addSpaces('to do', 5, 'suffix') + ' ' + (parseInt('to do', 0) * parseInt(group.adultNum, 0)), 'RI', 'I'));

        // // tslint:disable-next-line:max-line-length
        // rmGroup.remarks.push(this.remarkHelper.createRemark('CHILD PRICE' + this.remarkHelper.addSpaces(group.childPrice, 10, 'prefix') + 'X' + this.remarkHelper.addSpaces(group.childrenNumber, 5, 'suffix') + ' ' + (parseInt(group.childPrice, 0) * parseInt(group.childrenNumber, 0)), 'RI', 'I'));
        // // tslint:disable-next-line:max-line-length
        // rmGroup.remarks.push(this.remarkHelper.createRemark('CHILD TAXES' + this.remarkHelper.addSpaces(group.taxesPerChild, 10, 'prefix') + 'X' + this.remarkHelper.addSpaces(group.childrenNumber, 5, 'suffix') + ' ' + (parseInt(group.taxesPerChild, 0) * parseInt(group.childrenNumber, 0)), 'RI', 'I'));
        // // tslint:disable-next-line:max-line-length
        // rmGroup.remarks.push(this.remarkHelper.createRemark('CHILD GST' + this.remarkHelper.addSpaces(group.insurancePerChild, 10, 'prefix') + 'X' + this.remarkHelper.addSpaces(group.childrenNumber, 5, 'suffix') + ' ' + (parseInt(group.insurancePerChild, 0) * parseInt(group.childrenNumber, 0)), 'RI', 'I'));


    }
}
