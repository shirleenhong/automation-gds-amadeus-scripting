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

export class ITCPackageCostRemarkService {
    constructor(private remarkHelper: RemarkHelper) { }

    public GetRemarks(group: any) {

        const rmGroup = new RemarkGroup();
        rmGroup.group = 'Tour Package';
        rmGroup.remarks = new Array<RemarkModel>();
        const datePipe = new DatePipe('en-US');


        // to do
        // rmGroup.remarks.push(this.remarkHelper.createRemark('THE FOLLOWING COSTS ARE SHOWN IN ' + group.userIdFirstWay, 'RI', 'I'));
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark(this.remarkHelper.addSpaces('ADULT PRICE', group.value.noAdult, 30, 'prefix') + 'X' + this.remarkHelper.addSpaces('', group.value.baseAdult, 10, 'suffix') + ' ' + Math.round(Number(group.value.baseAdult) * Number(group.value.noAdult)), 'RI', 'I'));
        console.log('Adult Price');
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark(this.remarkHelper.addSpaces('ADULT TAXES', group.value.taxAdult, 30, 'prefix') + 'X' + this.remarkHelper.addSpaces('', group.value.noAdult, 10, 'suffix') + ' ' + Math.round(Number(group.value.taxAdult) * Number(group.value.noAdult)), 'RI', 'I'));
        console.log('Adult Taxes');
        // tslint:disable-next-line:max-line-length
        // rmGroup.remarks.push(this.remarkHelper.createRemark('ADULT GST' + this.remarkHelper.addSpaces('to do', 10, 'prefix') + 'X' + this.remarkHelper.addSpaces('to do', 10, 'suffix') + ' ' + (Number('to do', 0) * Number(group.noAdult, 0)), 'RI', 'I'));

        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark(this.remarkHelper.addSpaces('CHILD PRICE', group.value.baseChild, 30, 'prefix') + 'X' + this.remarkHelper.addSpaces('', group.value.noChild, 10, 'suffix') + ' ' + Math.round(Number(group.value.baseChild) * Number(group.value.noChild)), 'RI', 'I'));
        console.log('Child Price');
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark(this.remarkHelper.addSpaces('CHILD TAXES', group.value.taxChild, 30, 'prefix') + 'X' + this.remarkHelper.addSpaces('', group.value.noChild, 10, 'suffix') + ' ' + Math.round(Number(group.value.taxChild) * Number(group.value.noChild)), 'RI', 'I'));
        console.log('CHild Taxes');
        // tslint:disable-next-line:max-line-length
        // rmGroup.remarks.push(this.remarkHelper.createRemark('CHILD GST' + this.remarkHelper.addSpaces(group.childInsurance, 30, 'prefix') + 'X' + this.remarkHelper.addSpaces(group.noChild, 10, 'suffix') + ' ' + (Number(group.childInsurance, 0) * Number(group.noChild, 0)), 'RI', 'I'));


        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark(this.remarkHelper.addSpaces('CHILD TAXES', group.value.baseInfant, 30, 'prefix') + 'X' + this.remarkHelper.addSpaces('', group.value.noInfant, 10, 'suffix') + ' ' + Math.round(Number(group.value.baseInfant) * Number(group.value.noInfant)), 'RI', 'I'));
        console.log('Infant Price');
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark(this.remarkHelper.addSpaces('INFANT TAXES', group.value.taxInfant, 30, 'prefix') + 'X' + this.remarkHelper.addSpaces('', group.value.noInfant, 10, 'suffix') + ' ' + Math.round(Number(group.value.taxInfant) * Number(group.value.noInfant)), 'RI', 'I'));
        console.log('Infant Taxes');
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark(this.remarkHelper.addSpaces('INFANT INSURANCE', group.value.insInfant, 30, 'prefix') + 'X' + this.remarkHelper.addSpaces('', group.value.noInfant, 10, 'suffix') + ' ' + Math.round(Number(group.value.insInfant) * Number(group.value.noInfant)), 'RI', 'I'));
        console.log('Infant Insurance');

        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark(this.remarkHelper.addSpaces('ADULT CRUISE', group.value.bcruiseAdult, 30, 'prefix') + 'X' + this.remarkHelper.addSpaces('', group.value.bcruiseAdult, 10, 'suffix') + ' ' + Math.round(Number(group.value.bcruiseAdult) * Number(group.value.noAdult)), 'RI', 'I'));
        console.log('Adult Cruise');
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark(this.remarkHelper.addSpaces('ADULT TAX/PORT CHARGES', group.value.tcruiseAdult, 30, 'prefix') + 'X' + this.remarkHelper.addSpaces('', group.value.noAdult, 10, 'suffix') + ' ' + Math.round(Number(group.value.tcruiseAdult) * Number(group.value.noAdult)), 'RI', 'I'));
        console.log('Adult Port CHanges');
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark(this.remarkHelper.addSpaces('CHILD CRUISE', group.value.bcruiseChild, 30, 'prefix') + 'X' + this.remarkHelper.addSpaces('', group.value.noChild, 10, 'suffix') + ' ' + Math.round(Number(group.value.bcruiseChild) * Number(group.value.noChild)), 'RI', 'I'));
        console.log('Adult Cruise CHanges');
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark(this.remarkHelper.addSpaces('CHILD TAX/PORT CHARGES', group.value.tcruiseChild, 30, 'prefix') + 'X' + this.remarkHelper.addSpaces('', group.value.noChild, 10, 'suffix') + ' ' + Math.round(Number(group.value.tcruiseChild) * Number(group.value.noChild)), 'RI', 'I'));
        console.log('Adult Port CHanges');
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark(this.remarkHelper.addSpaces('INFANT CRUISE', group.value.bcruiseInfant, 30, 'prefix') + 'X' + this.remarkHelper.addSpaces('', group.value.noInfant, 10, 'suffix') + ' ' + Math.round(Number(group.value.bcruiseInfant) * Number(group.value.noInfant)), 'RI', 'I'));
        console.log('Infant Port CHanges');
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark(this.remarkHelper.addSpaces('INFANT TAX/PORT CHARGES', group.value.tcruiseInfant, 30, 'prefix') + 'X' + this.remarkHelper.addSpaces('', group.value.noInfant, 10, 'suffix') + ' ' + Math.round(Number(group.value.tcruiseInfant) * Number(group.value.noInfant)), 'RI', 'I'));
        console.log('Adult Port CHanges');

        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark(this.remarkHelper.addSpaces('ADULT RAIL', group.value.railAdult, 30, 'prefix') + 'X' + this.remarkHelper.addSpaces('', group.value.noAdult, 10, 'suffix') + ' ' + Math.round(Number(group.value.railAdult) * Number(group.value.noAdult)), 'RI', 'I'));
        console.log('Adult Rail');
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark(this.remarkHelper.addSpaces('CHILD RAIL', group.value.railChild, 30, 'prefix') + 'X' + this.remarkHelper.addSpaces('', group.value.noChild, 10, 'suffix') + ' ' + Math.round(Number(group.value.railChild) * Number(group.value.noChild)), 'RI', 'I'));
        console.log('Child Rail');
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark(this.remarkHelper.addSpaces('INFANT RAIL', group.value.railInfant, 30, 'prefix') + 'X' + this.remarkHelper.addSpaces('', group.value.noInfant, 10, 'suffix') + ' ' + Math.round(Number(group.value.railInfant) * Number(group.value.noInfant)), 'RI', 'I'));
        console.log('Infant Rail');
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark(this.remarkHelper.addSpaces('HOTEL/ACCOMMODATION', group.value.hotelAdult, 30, 'prefix') + Math.round(Number(group.value.hotelAdult)), 'RI', 'I'));
        console.log('Hotel Acoomodation');
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark(this.remarkHelper.addSpaces('CAR RENTAL', group.value.carAdult, 30, 'prefix') + Math.round(Number(group.value.carAdult)), 'RI', 'I'));
        console.log('Car Rental');
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('TOTAL HOLIDAY COST' + Math.round(Number(group.value.balance) * Number(group.value.depAdult)), 'RI', 'I'));
        console.log('Total Holiday');
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('LESS DEPOSIT PAID ' + group.value.depAdult + ' - ' + formatDate(Date.now(), 'dMMM', 'en'), 'RI', 'I'));
        console.log('Less Deposit');
        rmGroup.remarks.push(this.remarkHelper.createRemark('BALANCE DUE ' + group.value.balance, 'RI', 'I'));
        console.log('Balance Due');
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('---- BALANCE OF ' + group.value.balance + ' IS DUE ' + datePipe.transform(group.value.dueDate, 'dMMMyy') + '----', 'RI', 'I'));
        console.log('Balance of');

        rmGroup.remarks.push(this.remarkHelper.createRemark('U43/-' + datePipe.transform(group.dueDate, 'MMMyy'), 'RM', '*'));
        rmGroup.remarks.push(this.remarkHelper.createRemark('U41/-' + group.balance, 'RM', '*'));

        console.log(rmGroup);
        return rmGroup;
    }
}
