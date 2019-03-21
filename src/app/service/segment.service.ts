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


@Injectable({
    providedIn: 'root',
})

export class SegmentService {

    constructor() { }


    GetSegmentRemark(dataModel: TourSegmentViewModel) {

        const passive = new PassiveSegmentModel();
        const datePipe = new DatePipe('en-US');

        const tourSegment = new Array<PassiveSegmentModel>();

        // {
        //     segmentList: PassiveSegmentModel
        // };

        dataModel.tourSegmentList.forEach(segment => {
            const passive = new PassiveSegmentModel();
            passive.endDate = segment.endDate;
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
            const startTime = (<string>segment.startTime).replace(':', '');
            const endTime = (<string>segment.endTime).replace(':', '');
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
        alert("passgroup");
        alert(JSON.stringify(passGroup));
        alert("passgroup passive");
        alert(JSON.stringify(passGroup.passiveSegments));
        return passGroup;

    }


}

