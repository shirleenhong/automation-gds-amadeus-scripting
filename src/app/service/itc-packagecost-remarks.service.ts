import { RemarkModel } from '../models/pnr/remark.model';

import { PnrService } from './pnr.service';

import { Injectable } from '@angular/core';
import { RemarkGroup } from '../models/pnr/remark.group.model';
import { DatePipe, DecimalPipe } from '@angular/common';
import { formatDate } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { RemarkHelper } from '../helper/remark-helper';
import { PackageRemarkHelper } from '../helper/packageRemark-helper';

@Injectable({
    providedIn: 'root',
})

export class ITCPackageCostRemarkService {
    decPipe = new DecimalPipe('en-US');
    constructor(private remarkHelper: RemarkHelper, private packageRemarkHelper: PackageRemarkHelper) { }

    public GetRemarks(group: any) {

        const rmGroup = new RemarkGroup();
        rmGroup.group = 'Tour Package';
        rmGroup.remarks = new Array<RemarkModel>();
        const datePipe = new DatePipe('en-US');

        this.packageRemarkHelper.getForDeletion().forEach(c => {
            rmGroup.deleteRemarkByIds.push(c);
        });


        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('THE FOLLOWING COSTS ARE SHOWN IN ' + group.value.itcCurrencyType, 'RI', 'R'));

        if (Number(group.value.noAdult) > 0) {
            rmGroup.remarks.push(this.remarkHelper.processRIRRemark('ADULT PRICE', group.value.baseAdult, group.value.noAdult));
            rmGroup.remarks.push(this.remarkHelper.processRIRRemark('ADULT TAXES', group.value.taxAdult, group.value.noAdult));
            rmGroup.remarks.push(this.remarkHelper.processRIRRemark('ADULT INSURANCE', group.value.insAdult, group.value.noAdult));
            rmGroup.remarks.push(this.remarkHelper.processRIRRemark('ADULT CRUISE', group.value.bcruiseAdult, group.value.noAdult));
            rmGroup.remarks.push(this.remarkHelper.processRIRRemark('ADULT TAX/PORT CHARGES', group.value.tcruiseAdult,
                group.value.noAdult));
            rmGroup.remarks.push(this.remarkHelper.processRIRRemark('ADULT RAIL', group.value.railAdult, group.value.noAdult));
        }

        if (Number(group.value.noChild) > 0) {

            rmGroup.remarks.push(this.remarkHelper.processRIRRemark('CHILD PRICE', group.value.baseChild, group.value.noChild));
            rmGroup.remarks.push(this.remarkHelper.processRIRRemark('CHILD TAXES', group.value.taxChild, group.value.noChild));
            rmGroup.remarks.push(this.remarkHelper.processRIRRemark('CHILD INSURANCE', group.value.insChild, group.value.noChild));
            rmGroup.remarks.push(this.remarkHelper.processRIRRemark('CHILD CRUISE', group.value.bcruiseChild, group.value.noChild));
            rmGroup.remarks.push(this.remarkHelper.processRIRRemark('CHILD TAX/PORT CHARGES', group.value.tcruiseChild,
                group.value.noChild));
            rmGroup.remarks.push(this.remarkHelper.processRIRRemark('CHILD RAIL', group.value.railChild, group.value.noChild));
        }


        if (Number(group.value.noInfant) > 0) {

            rmGroup.remarks.push(this.remarkHelper.processRIRRemark('INFANT PRICE', group.value.baseInfant, group.value.noInfant));
            rmGroup.remarks.push(this.remarkHelper.processRIRRemark('INFANT TAXES', group.value.taxInfant, group.value.noInfant));
            rmGroup.remarks.push(this.remarkHelper.processRIRRemark('INFANT INSURANCE', group.value.insInfant, group.value.noInfant));
            rmGroup.remarks.push(this.remarkHelper.processRIRRemark('INFANT CRUISE', group.value.bcruiseInfant, group.value.noInfant));
            rmGroup.remarks.push(this.remarkHelper.processRIRRemark('INFANT TAX/PORT CHARGES', group.value.tcruiseInfant,
                group.value.noInfant));
            rmGroup.remarks.push(this.remarkHelper.processRIRRemark('INFANT RAIL', group.value.railInfant, group.value.noInfant));
        }

        rmGroup.remarks.push(this.remarkHelper.processRIRRemark('HOTEL/ACCOMMODATION', group.value.hotelAdult, null));
        console.log('Hotel Acoomodation');
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.processRIRRemark('CAR RENTAL', group.value.carAdult, null));

        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.processRIRRemark('TOTAL HOLIDAY COST', (parseFloat(group.value.holidayCost)), null));

        console.log('Total Holiday');
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.processRIRRemark('LESS DEPOSIT PAID', group.value.depAdult, null));


        rmGroup.remarks.push(this.remarkHelper.processRIRRemark('BALANCE DUE', group.value.balance, null));


        // tslint:disable-next-line:max-line-length
        if (group.value.dueDate) {
            rmGroup.remarks.push(this.remarkHelper.createRemark('---- BALANCE OF ' + group.value.balance + ' IS DUE ' +
                datePipe.transform(group.value.dueDate, 'dMMMyy') + ' ----', 'RI', 'R'));
        }

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
