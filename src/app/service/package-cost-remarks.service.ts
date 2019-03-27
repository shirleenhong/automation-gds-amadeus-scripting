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

        // to do
        // rmGroup.remarks.push(this.remarkHelper.createRemark('THE FOLLOWING COSTS ARE SHOWN IN ' + group.userIdFirstWay, 'RI', 'I'));
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('ADULT PRICE' + this.remarkHelper.addSpaces(group.noAdult, 10, 'prefix') + 'X' + this.remarkHelper.addSpaces(group.baseAdult, 5, 'suffix') + ' ' + (parseInt(group.baseCost, 0) * parseInt(group.noAdult, 0)), 'RI', 'I'));
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('ADULT TAXES' + this.remarkHelper.addSpaces(group.taxAdult, 10, 'prefix') + 'X' + this.remarkHelper.addSpaces(group.noAdult, 5, 'suffix') + ' ' + (parseInt(group.taxAdult, 0) * parseInt(group.noAdult, 0)), 'RI', 'I'));
        // tslint:disable-next-line:max-line-length
        // rmGroup.remarks.push(this.remarkHelper.createRemark('ADULT GST' + this.remarkHelper.addSpaces('to do', 10, 'prefix') + 'X' + this.remarkHelper.addSpaces('to do', 5, 'suffix') + ' ' + (parseInt('to do', 0) * parseInt(group.noAdult, 0)), 'RI', 'I'));

        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('CHILD PRICE' + this.remarkHelper.addSpaces(group.baseChild, 10, 'prefix') + 'X' + this.remarkHelper.addSpaces(group.noChild, 5, 'suffix') + ' ' + (parseInt(group.baseChild, 0) * parseInt(group.noChild, 0)), 'RI', 'I'));
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('CHILD TAXES' + this.remarkHelper.addSpaces(group.taxChild, 10, 'prefix') + 'X' + this.remarkHelper.addSpaces(group.noChild, 5, 'suffix') + ' ' + (parseInt(group.taxChild, 0) * parseInt(group.noChild, 0)), 'RI', 'I'));
        // tslint:disable-next-line:max-line-length
        // rmGroup.remarks.push(this.remarkHelper.createRemark('CHILD GST' + this.remarkHelper.addSpaces(group.childInsurance, 10, 'prefix') + 'X' + this.remarkHelper.addSpaces(group.noChild, 5, 'suffix') + ' ' + (parseInt(group.childInsurance, 0) * parseInt(group.noChild, 0)), 'RI', 'I'));


        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('INFANT PRICE' + this.remarkHelper.addSpaces(group.baseInfant, 10, 'prefix') + 'X' + this.remarkHelper.addSpaces(group.noInfant, 5, 'suffix') + ' ' + (parseInt(group.baseChild, 0) * parseInt(group.noInfant, 0)), 'RI', 'I'));
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('INFANT TAXES' + this.remarkHelper.addSpaces(group.taxInfant, 10, 'prefix') + 'X' + this.remarkHelper.addSpaces(group.noInfant, 5, 'suffix') + ' ' + (parseInt(group.taxesPerChild, 0) * parseInt(group.noInfant, 0)), 'RI', 'I'));
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('INFANT INSURANCE' + this.remarkHelper.addSpaces(group.insInfant, 10, 'prefix') + 'X' + this.remarkHelper.addSpaces(group.noInfant, 5, 'suffix') + ' ' + (parseInt(group.insInfant, 0) * parseInt(group.noInfant, 0)), 'RI', 'I'));

        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('ADULT CRUISE' + this.remarkHelper.addSpaces(group.bcruiseAdult, 10, 'prefix') + 'X' + this.remarkHelper.addSpaces(group.bcruiseAdult, 5, 'suffix') + ' ' + (parseInt(group.bcruiseAdult, 0) * parseInt(group.noAdult, 0)), 'RI', 'I'));
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('ADULT TAX/PORT CHARGES' + this.remarkHelper.addSpaces(group.tcruiseAdult, 10, 'prefix') + 'X' + this.remarkHelper.addSpaces(group.noAdult, 5, 'suffix') + ' ' + (parseInt(group.tcruiseAdult, 0) * parseInt(group.noAdult, 0)), 'RI', 'I'));
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('CHILD CRUISE' + this.remarkHelper.addSpaces(group.bcruiseChild, 10, 'prefix') + 'X' + this.remarkHelper.addSpaces(group.noChild, 5, 'suffix') + ' ' + (parseInt(group.bcruiseChild, 0) * parseInt(group.noChild, 0)), 'RI', 'I'));
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('CHILD TAX/PORT CHARGES' + this.remarkHelper.addSpaces(group.tcruiseChild, 10, 'prefix') + 'X' + this.remarkHelper.addSpaces(group.noChild, 5, 'suffix') + ' ' + (parseInt(group.tcruiseChild, 0) * parseInt(group.noChild, 0)), 'RI', 'I'));
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('INFANT CRUISE' + this.remarkHelper.addSpaces(group.bcruiseInfant, 10, 'prefix') + 'X' + this.remarkHelper.addSpaces(group.noInfant, 5, 'suffix') + ' ' + (parseInt(group.bcruiseInfant, 0) * parseInt(group.noInfant, 0)), 'RI', 'I'));
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('INFANT TAX/PORT CHARGES' + this.remarkHelper.addSpaces(group.tcruiseInfant, 10, 'prefix') + 'X' + this.remarkHelper.addSpaces(group.noInfant, 5, 'suffix') + ' ' + (parseInt(group.tcruiseInfant, 0) * parseInt(group.noInfant, 0)), 'RI', 'I'));

        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('ADULT RAIL' + this.remarkHelper.addSpaces(group.railAdult, 10, 'prefix') + 'X' + this.remarkHelper.addSpaces(group.noAdult, 5, 'suffix') + ' ' + (parseInt(group.railAdult, 0) * parseInt(group.noAdult, 0)), 'RI', 'I'));
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('CHILD RAIL' + this.remarkHelper.addSpaces(group.railChild, 10, 'prefix') + 'X' + this.remarkHelper.addSpaces(group.noChild, 5, 'suffix') + ' ' + (parseInt(group.railChild, 0) * parseInt(group.noChild, 0)), 'RI', 'I'));
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('INFANT RAIL' + this.remarkHelper.addSpaces(group.railInfant, 10, 'prefix') + 'X' + this.remarkHelper.addSpaces(group.noInfant, 5, 'suffix') + ' ' + (parseInt(group.railInfant, 0) * parseInt(group.noInfant, 0)), 'RI', 'I'));

        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('HOTEL/ACCOMMODATION' + this.remarkHelper.addSpaces(group.hotelAdult, 10, 'prefix') + (parseInt(group.hotelAdult, 0)), 'RI', 'I'));
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('CAR RENTAL' + this.remarkHelper.addSpaces(group.carAdult, 10, 'prefix') + (parseInt(group.carAdult, 0)), 'RI', 'I'));

        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('TOTAL HOLIDAY COST' + (parseInt(group.balance, 0) * parseInt(group.depAdult, 0)), 'RI', 'I'));
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('LESS DEPOSIT PAID ' + group.depAdult + ' - ' + formatDate(Date.now(), 'dMMM', 'en'), 'RI', 'I'));
        rmGroup.remarks.push(this.remarkHelper.createRemark('BALANCE DUE ' + group.balance, 'RI', 'I'));
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('---- BALANCE OF ' + group.balance + ' IS DUE ' + datePipe.transform(group.dueDate, 'dMMMyy') + '----', 'RI', 'I'));
    }
}
