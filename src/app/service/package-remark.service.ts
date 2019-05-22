import { RemarkModel } from '../models/pnr/remark.model';

import { PnrService } from './pnr.service';

import { Injectable } from '@angular/core';
import { RemarkGroup } from '../models/pnr/remark.group.model';
import { DatePipe, DecimalPipe } from '@angular/common';
import { formatDate } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormArray } from '@angular/forms';
import { RemarkHelper } from '../helper/remark-helper';
import { PackageRemarkHelper } from '../helper/packageRemark-helper';
import { RBCRedemptionModel } from '../models/pnr/rbc-redemption.model';

@Injectable({
    providedIn: 'root',
})

export class PackageRemarkService {
    decPipe = new DecimalPipe('en-US');
    rbcForDeletion = [];

    constructor(private remarkHelper: RemarkHelper,
        private packageRemarkHelper: PackageRemarkHelper, private pnrService: PnrService) { }

    public GetITCPackageRemarks(group: any) {

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

    public GetTourPackageRemarks(group: FormGroup) {

        const rmGroup = new RemarkGroup();
        rmGroup.group = 'Tour Package';
        rmGroup.remarks = new Array<RemarkModel>();
        const datePipe = new DatePipe('en-US');

        if (this.packageRemarkHelper.getForDeletion() !== undefined) {
            this.packageRemarkHelper.getForDeletion().forEach(c => {
                rmGroup.deleteRemarkByIds.push(c);
            });
        }

        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('THE FOLLOWING COSTS ARE SHOWN IN ' + group.controls.tourCurrencyType.value, 'RI', 'R'));

        if (Number(group.controls.adultNum.value) > 0) {
            rmGroup.remarks.push(this.remarkHelper.processRIRRemark('ADULT PACKAGE',
                group.controls.baseCost.value, group.controls.adultNum.value));
            rmGroup.remarks.push(this.remarkHelper.processRIRRemark('ADULT TAXES',
                group.controls.taxesPerAdult.value, group.controls.adultNum.value));
            rmGroup.remarks.push(this.remarkHelper.processRIRRemark('ADULT INSURANCE',
                group.controls.insurancePerAdult.value, group.controls.adultNum.value));
        }

        if (Number(group.controls.childrenNumber.value) > 0) {

            rmGroup.remarks.push(this.remarkHelper.processRIRRemark('CHILD PACKAGE',
                group.controls.childBaseCost.value, group.controls.childrenNumber.value));
            rmGroup.remarks.push(this.remarkHelper.processRIRRemark('CHILD TAXES',
                group.controls.taxesPerChild.value, group.controls.childrenNumber.value));
            rmGroup.remarks.push(this.remarkHelper.processRIRRemark('CHILD INSURANCE',
                group.controls.insurancePerChild.value, group.controls.childrenNumber.value));
        }

        if (Number(group.controls.infantNumber.value) > 0) {

            rmGroup.remarks.push(this.remarkHelper.processRIRRemark('INFANT PACKAGE', group.controls.totalCostPerInfant.value,
                group.controls.infantNumber.value));
        }

        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('TOTAL PACKAGE PRICE ' + (group.controls.totalCostHoliday.value === '' ? '0.00' : group.controls.totalCostHoliday.value), 'RI', 'R'));
        // tslint:disable-next-line:max-line-length
        rmGroup.remarks.push(this.remarkHelper.createRemark('LESS DEPOSIT PAID ' + (group.controls.depositPaid.value === '' ? '0.00' : group.controls.depositPaid.value) + ' - ' + formatDate(Date.now(), 'dMMM', 'en'), 'RI', 'R'));
        rmGroup.remarks.push(this.remarkHelper.createRemark('BALANCE DUE ' + group.controls.balanceToBePaid.value, 'RI', 'R'));
        // tslint:disable-next-line:max-line-length
        if (group.controls.balanceDueDate.value) {
            rmGroup.remarks.push(this.remarkHelper.createRemark('---- BALANCE OF ' +
                (group.controls.balanceToBePaid.value === '' ? '0.00' : group.controls.balanceToBePaid.value)
                + ' IS DUE ' + datePipe.transform(group.controls.balanceDueDate.value, 'dMMMyy') + ' ----', 'RI', 'R'));
        }

        rmGroup.remarks.push(this.remarkHelper.createRemark('SOME TAXES ARE PAYABLE LOCALLY AND NOT INCLUDED ABOVE', 'RI', 'R'));
        if (group.controls.balanceDueDate.value.length > 0) {
            // tslint:disable-next-line:max-line-length
            rmGroup.remarks.push(this.remarkHelper.createRemark('U43/-' + datePipe.transform(group.controls.balanceDueDate.value, 'MMMyy'), 'RM', '*'));
        }

        if (group.controls.balanceToBePaid.value.length > 0) {
            rmGroup.remarks.push(this.remarkHelper.createRemark('U41/-' + group.controls.balanceToBePaid.value, 'RM', '*'));
        }

        if (group.controls.commission.value.length > 0) {
            rmGroup.remarks.push(this.remarkHelper.createRemark('U42/-' + group.controls.commission.value, 'RM', '*'));
        }

        return rmGroup;
    }


    public GetCodeShare(frmGroup: FormGroup) {

        const rmGroup = new RemarkGroup();
        rmGroup.group = 'Code Share';
        rmGroup.remarks = new Array<RemarkModel>();
        const arr = frmGroup.get('segments') as FormArray
        const segmentList = this.pnrService.getSegmentTatooNumber();
        const regex = /CHECK-IN AT (?<airline>.*) TICKET COUNTER/g;
        const rems = this.pnrService.getRemarksFromGDSByRegex(regex, 'RIR');
        if (rems.length > 0) {
            rmGroup.deleteRemarkByIds = [];
            rems.forEach(r => {
                rmGroup.deleteRemarkByIds.push(r.lineNo);
            });
        }

        for (const c of arr.controls) {
            const airline = c.get('airline').value;
            const segments = c.get('segment').value.toString();
            if (arr.controls.length === 1 && airline === '' && segments === '') {
                return rmGroup;
            }
            const rm = (this.remarkHelper.createRemark('CHECK-IN AT ' + airline + ' TICKET COUNTER', 'RI', 'R'));
            rm.relatedSegments = [];
            const s = segments.split(',');
            segmentList.forEach(x => {
                if (s.indexOf(x.lineNo) >= 0) {
                    rm.relatedSegments.push(x.tatooNo);
                }

            });


            //rm.relatedSegments = segments.split(',');
            rmGroup.remarks.push(rm);
        }

        return rmGroup;
    }
    public GetRbcRedemptionRemarks(rbcPoints: RBCRedemptionModel[]) {
        const remGroup = new RemarkGroup();
        remGroup.group = 'RBC Remark';
        remGroup.remarks = new Array<RemarkModel>();

        if (rbcPoints !== null) {
            rbcPoints.forEach(point => {
                this.processRbcPointsRemarks(point, remGroup.remarks);
            });
        }

        this.rbcForDeletion.forEach(c => {
            remGroup.deleteRemarkByIds.push(c);
        });

        return remGroup;
    }

    processRbcPointsRemarks(point: RBCRedemptionModel, remarkList: Array<RemarkModel>) {
        const name = point.lastname + '/' + point.firstname;
        const visa = point.firstvisanumber + 'XXXXXX' + point.lastvisanumber;
        const pointsRedeemed = point.pointsRedeemed + ' VALUE ' + point.valuepoints;
        const mandatoryHotelRemarks = ['CARDHOLDER NAME - ' + name,
        'CARDHOLDER VISA VI' + visa,
        point.pct + ' PERCENT POINTS REDEMPTION',
        'POINTS REDEEMED ' + pointsRedeemed,
        'PRODUCT TYPE - ' + point.productType,
        'SUPPLIER NAME - ' + point.suppliername];

        mandatoryHotelRemarks.forEach(c => {
            remarkList.push(this.remarkHelper.createRemark(point.rbcNo + ' ' + c, 'RM', 'K'));
        });


        const rbcRemarks = [{ include: point.numberbookings, description: 'NUMBER OF BOOKINGS - ' },
        { include: point.totalbasecost, description: 'TOTAL BASE COST PER BOOKING - ' },
        { include: point.gst, description: 'GST COST  PER BOOKING - ' },
        { include: point.hst, description: 'HST COST  PER BOOKING - ' },
        { include: point.qst, description: 'QST COST  PER BOOKING - ' },
        { include: point.otherTaxes, description: 'ALL OTHER TAXES PER BOOKING - ' },
        { include: point.otherTaxes, description: 'ALL OTHER TAXES PER ADULT - ' },
        { include: point.noofadult, description: 'NUMBER OF ADULTS - ' },
        { include: point.totalbasecostadult, description: 'TOTAL BASE COST PER ADULT - ' },
        { include: point.noofchildren, description: 'NUMBER OF CHILDREN - ' },
        { include: point.totalbasecostchild, description: 'TOTAL BASE COST PER CHILD - ' },
        { include: point.cgst, description: 'GST COST PER CHILD - ' },
        { include: point.chst, description: 'HST COST PER CHILD - ' },
        { include: point.cqst, description: 'QST COST PER CHILD - ' },
        { include: point.cotherTaxes, description: 'ALL OTHER TAXES PER CHILD - ' }
        ];

        rbcRemarks.forEach(c => {
            if (c.include) {
                if (c.description === 'ALL OTHER TAXES PER BOOKING - ' && point.numberbookings
                    || c.description === 'ALL OTHER TAXES PER ADULT - ' && point.noofadult
                    || (c.description !== 'ALL OTHER TAXES PER ADULT - ' &&
                        c.description !== 'ALL OTHER TAXES PER BOOKING - ')) {
                    remarkList.push(this.remarkHelper.createRemark(point.rbcNo + ' ' + c.description + c.include, 'RM', 'K'));
                }
            }
        });

    }


    getRbcPointsRemarksFromPnr(): Array<RBCRedemptionModel> {
        const rbcModels = new Array<RBCRedemptionModel>();
        let model: RBCRedemptionModel;
        let rbcNo = '0';
        for (const rm of this.pnrService.pnrObj.rmElements) {
            if (rm.category === 'K') {
                if (rm.freeFlowText.indexOf('CARDHOLDER NAME') > -1) {
                    if (rbcNo !== rm.freeFlowText.substr(0, 1) && rbcNo !== '0') {
                        rbcModels.push(model);
                    }
                    model = new RBCRedemptionModel();
                    rbcNo = rm.freeFlowText.substr(0, rm.freeFlowText.indexOf(' '));
                    model.rbcNo = Number(rbcNo);
                }
                if (rm.freeFlowText.substr(0, 1) === rbcNo) {
                    if (rm.freeFlowText.indexOf('NUMBER OF BOOKINGS') > -1) { model.numberbookings = this.getKelements(rm); }
                    if (rm.freeFlowText.indexOf('TOTAL BASE COST PER BOOKING') > -1) { model.totalbasecost = this.getKelements(rm); }
                    if (rm.freeFlowText.indexOf('GST COST PER BOOKING') > -1) { model.gst = this.getKelements(rm); }
                    if (rm.freeFlowText.indexOf('HST COST PER BOOKING') > -1) { model.hst = this.getKelements(rm); }
                    if (rm.freeFlowText.indexOf('QST COST PER BOOKING') > -1) { model.qst = this.getKelements(rm); }
                    if (rm.freeFlowText.indexOf('ALL OTHER TAXES PER BOOKING') > -1) { model.otherTaxes = this.getKelements(rm); }
                    if (rm.freeFlowText.indexOf('NUMBER OF ADULTS') > -1) { model.noofadult = this.getKelements(rm); }
                    if (rm.freeFlowText.indexOf('TOTAL BASE COST PER ADULT') > -1) { model.totalbasecostadult = this.getKelements(rm); }
                    if (rm.freeFlowText.indexOf('NUMBER OF CHILDREN') > -1) { model.noofchildren = this.getKelements(rm); }
                    if (rm.freeFlowText.indexOf('TOTAL BASE COST PER CHILD') > -1) { model.totalbasecostchild = this.getKelements(rm); }
                    if (rm.freeFlowText.indexOf('GST COST PER CHILD') > -1) { model.cgst = this.getKelements(rm); }
                    if (rm.freeFlowText.indexOf('HST COST PER CHILD') > -1) { model.chst = this.getKelements(rm); }
                    if (rm.freeFlowText.indexOf('QST COST PER CHILD') > -1) { model.cqst = this.getKelements(rm); }
                    if (rm.freeFlowText.indexOf('ALL OTHER TAXES PER CHILD') > -1) { model.cotherTaxes = this.getKelements(rm); }
                    if (rm.freeFlowText.indexOf('PRODUCT TYPE') > -1) { model.productType = this.getKelements(rm); }
                    if (rm.freeFlowText.indexOf('SUPPLIER NAME') > -1) { model.suppliername = this.getKelements(rm); }

                    let regex = /CARDHOLDER NAME - (?<lastname>.*)\/(?<firstname>.*)/g;
                    let match = regex.exec(rm.freeFlowText);
                    if (match) {
                        model.lastname = match.groups.lastname;
                        model.firstname = match.groups.firstname;
                        this.rbcForDeletion.push(rm.elementNumber);
                    }

                    regex = /CARDHOLDER VISA VI(?<firstvisa>.*)XXXXXX(?<lastvisa>.*)/g;
                    match = regex.exec(rm.freeFlowText);
                    if (match) {
                        model.firstvisanumber = match.groups.firstvisa;
                        model.lastvisanumber = match.groups.lastvisa;
                        this.rbcForDeletion.push(rm.elementNumber);
                    }

                    regex = /POINTS REDEEMED (?<pointsRedeemed>.*) VALUE (?<valuepoints>.*)/g;
                    match = regex.exec(rm.freeFlowText);
                    if (match) {
                        model.pointsRedeemed = match.groups.pointsRedeemed;
                        model.valuepoints = match.groups.valuepoints;
                        this.rbcForDeletion.push(rm.elementNumber);
                    }

                    regex = /(?<rbcNo>.*) (?<pct>.*) PERCENT POINTS REDEMPTION/g;
                    match = regex.exec(rm.freeFlowText);
                    if (match) {
                        model.pct = match.groups.pct;
                        this.rbcForDeletion.push(rm.elementNumber);
                    }

                }
                // model = new MatrixAccountingModel();
            }

        }
        if (model) {
            rbcModels.push(model);
        }

        return rbcModels;
    }


    private getKelements(rm: any): string {
        this.rbcForDeletion.push(rm.elementNumber);
        return rm.freeFlowText.substr(rm.freeFlowText.indexOf('-') + 2, rm.freeFlowText.length);

    }


}
