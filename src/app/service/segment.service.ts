import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { PassiveSegmentModel } from '../models/pnr/passive-segment.model';
// import { UpdateTourSegmentComponent } from '../passive-segments/tour-segment/update-tour-segment.component';
import { DatePipe } from '@angular/common';
import { RemarkGroup } from '../models/pnr/remark.group.model';
import { RemarkCollectionService } from './remark.collection.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { TourSegmentViewModel } from 'src/app/models/tour-segment-view.model';
import { Injectable } from '@angular/core';
import { PassiveSegmentViewModel } from '../models/passive-segment-view.model';
import { forEach } from '@angular/router/src/utils/collection';
import { PnrService } from './pnr.service';
import { RemarkHelper } from '../helper/remark-helper';

@Injectable({
    providedIn: 'root',
})

export class SegmentService {

    constructor(private pnrService: PnrService, private remarkHelper: RemarkHelper) { }


    GetSegmentRemark(dataModel: TourSegmentViewModel) {
        const datePipe = new DatePipe('en-US');
        const tourSegment = new Array<PassiveSegmentModel>();

        // {
        //     segmentList: PassiveSegmentModel
        // };

        dataModel.tourSegmentList.forEach(segment => {
            const passive = new PassiveSegmentModel();
            passive.vendor = '1A';
            passive.passiveSegmentType = 'Tour';
            passive.startDate = datePipe.transform(segment.startDate, 'ddMMyy');
            passive.endDate = datePipe.transform(segment.endDate, 'ddMMyy');
            passive.startTime = '';
            passive.endTime = '';
            passive.startPoint = segment.startPoint;
            passive.endPoint = segment.endPoint;
            passive.quantity = 1;

            const datePipe2 = new DatePipe('en-US');
            const startdatevalue = datePipe2.transform(segment.startDate, 'ddMMM');
            const enddatevalue = datePipe2.transform(segment.endDate, 'ddMM');
            const startTime = (segment.startTime as string).replace(':', '');
            const endTime = (segment.endTime as string).replace(':', '');
            passive.status = 'HK';

            const freetext = 'TYP-TOR/SUC-ZZ/SC' + segment.startPoint + '/SD-' + startdatevalue +
                '/ST-' + startTime + '/EC-' + segment.endPoint + '/ED-' +
                enddatevalue + '/ET-' + endTime + '/PS-1';
            passive.freeText = freetext;
            tourSegment.push(passive);
        });

        const passGroup = new RemarkGroup();
        passGroup.group = 'Segment Remark';
        passGroup.passiveSegments = tourSegment;
        return passGroup;

    }

    getRetentionLine() {

        const lastDeptDate = this.pnrService.getLatestDepartureDate();
        const odate = lastDeptDate;
        odate.setDate(odate.getDate() + 180);

        const today = new Date();
        const maxdate = today;
        maxdate.setDate(maxdate.getDate() + 331);
        // testing
        // const lastDeptDate = new Date('12/10/2019');
        // const odate = lastDeptDate;
        // odate.setDate(odate.getDate() + 180);
        // const test = odate.toDateString();
        // const today = new Date('11/05/2019');
        // const maxdate = today;
        // const test2 = maxdate.toDateString();
        // maxdate.setDate(maxdate.getDate() + 331);

        let finaldate = new Date();
        if (odate > maxdate) {
            finaldate.setDate(finaldate.getDate() - 35);
        } else {
            finaldate = odate;
        }

        const misSegment = new Array<PassiveSegmentModel>();
        const mis = new PassiveSegmentModel();
        const day = this.padDate(finaldate.getDate().toString());
        const mo = this.padDate((finaldate.getMonth() + 1).toString());
        const yr = odate.getFullYear().toString().substr(-2);

        mis.vendor = '1A';
        mis.status = 'HK';
        mis.startDate = day + mo + yr;
        mis.endDate = day + mo + yr;
        mis.startPoint = 'YYZ';
        mis.endPoint = 'YYZ';
        mis.freeText = 'THANK YOU FOR CHOOSING CARLSON WAGONLIT TRAVEL';
        const passGroup = new RemarkGroup();
        passGroup.group = 'MIS Remark';
        misSegment.push(mis);
        passGroup.passiveSegments = misSegment;
        return passGroup;
    }

    setMandatoryRemarks() {
        const mandatoryRemarkGroup = new RemarkGroup();
        mandatoryRemarkGroup.group = 'Mandatory Remarks';
        const LLBMandatoryRemark = this.pnrService.getRIILineNumber('WWW.CWTVACATIONS.CA/CWT/DO/INFO/PRIVACY');
        const MexicoMandatoryRemark = this.pnrService.getRIILineNumber('MEXICAN TOURIST CARD IS REQUIRED FOR ENTRY INTO MEXICO');

        if (LLBMandatoryRemark === '') {
            const command = 'PBN/LLB MANDATORY REMARKS';
            mandatoryRemarkGroup.cryptics.push(command);
        }

        if (this.hasMexicoSegment()) {
            if (MexicoMandatoryRemark === '') {
                const command = 'MEXICAN TOURIST CARD IS REQUIRED FOR ENTRY INTO MEXICO';
                mandatoryRemarkGroup.remarks.push(this.remarkHelper.createRemark(command, 'RI', 'I'));
            }
        }
        return mandatoryRemarkGroup;
    }

    hasMexicoSegment(): boolean {
    let res: boolean;
    res = false;
    const pnrAirSegments = this.pnrService.pnrObj.allAirSegments;
    // check if this can be retrieved from DDB
    const mexicoCities: Array<string> =
        ['ACA', 'MEX', 'TIJ', 'CUN', 'CNA', 'AGU', 'XAL', 'AZG', 'AZP', 'CPA', 'CYW', 'CTM', 'CZA', 'CUU',
         'ACN', 'CUA', 'CME', 'MMC', 'CJS', 'CEN', 'CVM', 'CLQ', 'CJT', 'CZM', 'CVJ', 'CUL', 'DGO', 'ESE',
         'GDL', 'GSV', 'GYM', 'GUB', 'HMO', 'HUX', 'ISJ', 'ZIH', 'IZT', 'LAP', 'LOM', 'LZC', 'BJX', 'LTO',
         'SJD', 'LMM', 'ZLO', 'MAM', 'MTH', 'MZT', 'MID', 'MXL', 'MTT', 'LOV', 'MTY', 'NTR', 'MLM', 'MUG',
         'NVJ', 'NOG', 'NCG', 'NLD', 'OAX', 'PQM', 'PDS', 'PCM', 'PAZ', 'PBC', 'PXM', 'PPE', 'PVR', 'QRO',
         'REX', 'SCX', 'SLW', 'SFH', 'SLP', 'UAC', 'NLU', 'SRL', 'TAM', 'TSL', 'TAP', 'TCN', 'TPQ', 'TZM',
         'TLC', 'TRC', 'TUY', 'TGZ', 'UPN', 'VER', 'VSA', 'JAL', 'ZCL', 'ZMM'];
    for (const airSegment of pnrAirSegments) {
        const origin = airSegment.fullNode.legInfo.legTravelProduct.boardPointDetails.trueLocationId;
        const destination = airSegment.fullNode.legInfo.legTravelProduct.offpointDetails.trueLocationId;

        if (mexicoCities.indexOf(origin) !== -1 || mexicoCities.indexOf(destination) !== -1) {
            res = true; }
    }
    return res;
}

padDate(num: string) {
        let padnum = num;
        if (num.length < 2) {
            padnum = '0' + num;
        }
        return padnum;
    }


}

