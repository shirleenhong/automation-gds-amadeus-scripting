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
        rmGroup.remarks.push(this.remarkHelper.createRemark('ADULT PRICE' + this.remarkHelper.addSpaces(group.value.noAdult, 10, 'prefix') + 'X' + this.remarkHelper.addSpaces(group.value.baseAdult, 5, 'suffix') + ' ' + (parseInt(group.value.baseCost, 0) * parseInt(group.value.noAdult, 0)), 'RI', 'I'));
        console.log('Adult Price');
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('ADULT TAXES' + this.remarkHelper.addSpaces(group.value.taxAdult, 10, 'prefix') + 'X' + this.remarkHelper.addSpaces(group.value.noAdult, 5, 'suffix') + ' ' + (parseInt(group.value.taxAdult, 0) * parseInt(group.value.noAdult, 0)), 'RI', 'I'));
        console.log('Adult Taxes');
        // tslint:disable-next-line:max-line-length
        // rmGroup.remarks.push(this.remarkHelper.createRemark('ADULT GST' + this.remarkHelper.addSpaces('to do', 10, 'prefix') + 'X' + this.remarkHelper.addSpaces('to do', 5, 'suffix') + ' ' + (parseInt('to do', 0) * parseInt(group.noAdult, 0)), 'RI', 'I'));

        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('CHILD PRICE' + this.remarkHelper.addSpaces(group.value.baseChild, 10, 'prefix') + 'X' + this.remarkHelper.addSpaces(group.value.noChild, 5, 'suffix') + ' ' + (parseInt(group.value.baseChild, 0) * parseInt(group.value.noChild, 0)), 'RI', 'I'));
        console.log('Child Price');
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('CHILD TAXES' + this.remarkHelper.addSpaces(group.value.taxChild, 10, 'prefix') + 'X' + this.remarkHelper.addSpaces(group.value.noChild, 5, 'suffix') + ' ' + (parseInt(group.value.taxChild, 0) * parseInt(group.value.noChild, 0)), 'RI', 'I'));
        console.log('CHild Taxes');
        // tslint:disable-next-line:max-line-length
        // rmGroup.remarks.push(this.remarkHelper.createRemark('CHILD GST' + this.remarkHelper.addSpaces(group.childInsurance, 10, 'prefix') + 'X' + this.remarkHelper.addSpaces(group.noChild, 5, 'suffix') + ' ' + (parseInt(group.childInsurance, 0) * parseInt(group.noChild, 0)), 'RI', 'I'));


        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('INFANT PRICE' + this.remarkHelper.addSpaces(group.value.baseInfant, 10, 'prefix') + 'X' + this.remarkHelper.addSpaces(group.value.noInfant, 5, 'suffix') + ' ' + (parseInt(group.value.baseChild, 0) * parseInt(group.value.noInfant, 0)), 'RI', 'I'));
        console.log('Infant Price');
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('INFANT TAXES' + this.remarkHelper.addSpaces(group.value.taxInfant, 10, 'prefix') + 'X' + this.remarkHelper.addSpaces(group.value.noInfant, 5, 'suffix') + ' ' + (parseInt(group.value.taxesPerChild, 0) * parseInt(group.value.noInfant, 0)), 'RI', 'I'));
        console.log('Infant Taxes');
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('INFANT INSURANCE' + this.remarkHelper.addSpaces(group.value.insInfant, 10, 'prefix') + 'X' + this.remarkHelper.addSpaces(group.value.noInfant, 5, 'suffix') + ' ' + (parseInt(group.value.insInfant, 0) * parseInt(group.value.noInfant, 0)), 'RI', 'I'));
        console.log('Infant Insurance');

        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('ADULT CRUISE' + this.remarkHelper.addSpaces(group.value.bcruiseAdult, 10, 'prefix') + 'X' + this.remarkHelper.addSpaces(group.value.bcruiseAdult, 5, 'suffix') + ' ' + (parseInt(group.value.bcruiseAdult, 0) * parseInt(group.value.noAdult, 0)), 'RI', 'I'));
        console.log('Adult Cruise');
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('ADULT TAX/PORT CHARGES' + this.remarkHelper.addSpaces(group.value.tcruiseAdult, 10, 'prefix') + 'X' + this.remarkHelper.addSpaces(group.value.noAdult, 5, 'suffix') + ' ' + (parseInt(group.value.tcruiseAdult, 0) * parseInt(group.value.noAdult, 0)), 'RI', 'I'));
        console.log('Adult Port CHanges');
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('CHILD CRUISE' + this.remarkHelper.addSpaces(group.value.bcruiseChild, 10, 'prefix') + 'X' + this.remarkHelper.addSpaces(group.value.noChild, 5, 'suffix') + ' ' + (parseInt(group.value.bcruiseChild, 0) * parseInt(group.value.noChild, 0)), 'RI', 'I'));
        console.log('Adult Cruise CHanges');
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('CHILD TAX/PORT CHARGES' + this.remarkHelper.addSpaces(group.value.tcruiseChild, 10, 'prefix') + 'X' + this.remarkHelper.addSpaces(group.value.noChild, 5, 'suffix') + ' ' + (parseInt(group.value.tcruiseChild, 0) * parseInt(group.value.noChild, 0)), 'RI', 'I'));
        console.log('Adult Port CHanges');
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('INFANT CRUISE' + this.remarkHelper.addSpaces(group.value.bcruiseInfant, 10, 'prefix') + 'X' + this.remarkHelper.addSpaces(group.value.noInfant, 5, 'suffix') + ' ' + (parseInt(group.value.bcruiseInfant, 0) * parseInt(group.value.noInfant, 0)), 'RI', 'I'));
        console.log('Infant Port CHanges');
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('INFANT TAX/PORT CHARGES' + this.remarkHelper.addSpaces(group.value.tcruiseInfant, 10, 'prefix') + 'X' + this.remarkHelper.addSpaces(group.value.noInfant, 5, 'suffix') + ' ' + (parseInt(group.value.tcruiseInfant, 0) * parseInt(group.value.noInfant, 0)), 'RI', 'I'));
        console.log('Adult Port CHanges');

        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('ADULT RAIL' + this.remarkHelper.addSpaces(group.value.railAdult, 10, 'prefix') + 'X' + this.remarkHelper.addSpaces(group.value.noAdult, 5, 'suffix') + ' ' + (parseInt(group.value.railAdult, 0) * parseInt(group.value.noAdult, 0)), 'RI', 'I'));
        console.log('Adult Rail');
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('CHILD RAIL' + this.remarkHelper.addSpaces(group.value.railChild, 10, 'prefix') + 'X' + this.remarkHelper.addSpaces(group.value.noChild, 5, 'suffix') + ' ' + (parseInt(group.value.railChild, 0) * parseInt(group.value.noChild, 0)), 'RI', 'I'));
        console.log('Child Rail');
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('INFANT RAIL' + this.remarkHelper.addSpaces(group.value.railInfant, 10, 'prefix') + 'X' + this.remarkHelper.addSpaces(group.value.noInfant, 5, 'suffix') + ' ' + (parseInt(group.value.railInfant, 0) * parseInt(group.value.noInfant, 0)), 'RI', 'I'));
        console.log('Infant Rail');
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('HOTEL/ACCOMMODATION' + this.remarkHelper.addSpaces(group.value.hotelAdult, 10, 'prefix') + (parseInt(group.value.hotelAdult, 0)), 'RI', 'I'));
        console.log('Hotel Acoomodation');
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('CAR RENTAL' + this.remarkHelper.addSpaces(group.value.carAdult, 10, 'prefix') + (parseInt(group.value.carAdult, 0)), 'RI', 'I'));
        console.log('Car Rental');
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('TOTAL HOLIDAY COST' + (parseInt(group.value.balance, 0) * parseInt(group.value.depAdult, 0)), 'RI', 'I'));
        console.log('Total Holiday');
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('LESS DEPOSIT PAID ' + group.value.depAdult + ' - ' + formatDate(Date.now(), 'dMMM', 'en'), 'RI', 'I'));
        console.log('Less Deposit');
        rmGroup.remarks.push(this.remarkHelper.createRemark('BALANCE DUE ' + group.value.balance, 'RI', 'I'));
        console.log('Balance Due');
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('---- BALANCE OF ' + group.value.balance + ' IS DUE ' + datePipe.transform(group.value.dueDate, 'dMMMyy') + '----', 'RI', 'I'));
        console.log('Balance of');

        console.log(rmGroup);
        return rmGroup;
    }
}
