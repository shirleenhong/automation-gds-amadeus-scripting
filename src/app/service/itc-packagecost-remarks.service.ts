import { RemarkModel } from '../models/pnr/remark.model';

import { PnrService } from './pnr.service';

import { Injectable } from '@angular/core';
import { RemarkGroup } from '../models/pnr/remark.group.model';
import { DatePipe, DecimalPipe } from '@angular/common';
import { formatDate } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { RemarkHelper } from '../helper/remark-helper';

@Injectable({
    providedIn: 'root',
})

export class ITCPackageCostRemarkService {
    decPipe = new DecimalPipe('en-US');
    constructor(private remarkHelper: RemarkHelper) { }

    public GetRemarks(group: any) {

        const rmGroup = new RemarkGroup();
        rmGroup.group = 'Tour Package';
        rmGroup.remarks = new Array<RemarkModel>();
        const datePipe = new DatePipe('en-US');


        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('THE FOLLOWING COSTS ARE SHOWN IN ' + group.value.itcCurrencyType, 'RI', 'I'));

        if (Number(group.value.noAdult) > 0) {
            rmGroup.remarks.push(this.remarkHelper.processRiiRemark('ADULT PRICE', group.value.baseAdult, group.value.noAdult));
            rmGroup.remarks.push(this.remarkHelper.processRiiRemark('ADULT TAXES', group.value.taxAdult, group.value.noAdult));
            rmGroup.remarks.push(this.remarkHelper.processRiiRemark('ADULT INSURANCE', group.value.insAdult, group.value.noAdult));
            rmGroup.remarks.push(this.remarkHelper.processRiiRemark('ADULT CRUISE', group.value.bcruiseAdult, group.value.noAdult));
            rmGroup.remarks.push(this.remarkHelper.processRiiRemark('ADULT TAX/PORT CHARGES', group.value.tcruiseAdult,
                group.value.noAdult));
            rmGroup.remarks.push(this.remarkHelper.processRiiRemark('ADULT RAIL', group.value.railAdult, group.value.noAdult));
        }

        if (Number(group.value.noChild) > 0) {

            rmGroup.remarks.push(this.remarkHelper.processRiiRemark('CHILD PRICE', group.value.baseChild, group.value.noChild));
            rmGroup.remarks.push(this.remarkHelper.processRiiRemark('CHILD TAXES', group.value.taxChild, group.value.noChild));
            rmGroup.remarks.push(this.remarkHelper.processRiiRemark('CHILD INSURANCE', group.value.insChild, group.value.noChild));
            rmGroup.remarks.push(this.remarkHelper.processRiiRemark('CHILD CRUISE', group.value.bcruiseChild, group.value.noChild));
            rmGroup.remarks.push(this.remarkHelper.processRiiRemark('CHILD TAX/PORT CHARGES', group.value.tcruiseChild,
                group.value.noChild));
            rmGroup.remarks.push(this.remarkHelper.processRiiRemark('CHILD RAIL', group.value.railChild, group.value.noChild));
        }


        if (Number(group.value.noInfant) > 0) {

            rmGroup.remarks.push(this.remarkHelper.processRiiRemark('INFANT PRICE', group.value.baseInfant, group.value.noInfant));
            rmGroup.remarks.push(this.remarkHelper.processRiiRemark('INFANT TAXES', group.value.taxInfant, group.value.noInfant));
            rmGroup.remarks.push(this.remarkHelper.processRiiRemark('INFANT INSURANCE', group.value.insInfant, group.value.noInfant));
            rmGroup.remarks.push(this.remarkHelper.processRiiRemark('INFANT CRUISE', group.value.bcruiseInfant, group.value.noInfant));
            rmGroup.remarks.push(this.remarkHelper.processRiiRemark('INFANT TAX/PORT CHARGES', group.value.tcruiseInfant,
                group.value.noInfant));
            rmGroup.remarks.push(this.remarkHelper.processRiiRemark('INFANT RAIL', group.value.railInfant, group.value.noInfant));
        }

        rmGroup.remarks.push(this.remarkHelper.processRiiRemark('HOTEL/ACCOMMODATION', group.value.hotelAdult, null));
        console.log('Hotel Acoomodation');
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.processRiiRemark('CAR RENTAL', group.value.carAdult, null));

        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.processRiiRemark('TOTAL HOLIDAY COST', (parseFloat(group.value.holidayCost)), null));

        console.log('Total Holiday');
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.processRiiRemark('LESS DEPOSIT PAID', group.value.depAdult, null));


        rmGroup.remarks.push(this.remarkHelper.processRiiRemark('BALANCE DUE', group.value.balance, null));


        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('---- BALANCE OF ' + group.value.balance + ' IS DUE ' + datePipe.transform(group.value.dueDate, 'dMMMyy') + '----', 'RI', 'I'));
        console.log('Balance of');

        if (group.value.dueDate.length > 0) {
            rmGroup.remarks.push(this.remarkHelper.createRemark('U43/-' + datePipe.transform(group.value.dueDate, 'MMMyy'), 'RM', '*'));
        }

        if (group.value.balance.length > 0) {
            rmGroup.remarks.push(this.remarkHelper.createRemark('U41/-' + group.value.balance, 'RM', '*'));
        }

        if (group.value.commission.length > 0) {
            rmGroup.remarks.push(this.remarkHelper.createRemark('U42/-' + group.value.commission, 'RM', '*'));
        }

        console.log(rmGroup);
        return rmGroup;
    }
}
