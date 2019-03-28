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


@Injectable({
    providedIn: 'root',
})

export class SegmentService {

    constructor(private pnrService: PnrService) { }


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


    padDate(num) {
        let padnum = num;
        if (num.length < 2) {
            padnum = '0' + num;
        }
        return padnum;
    }

}

