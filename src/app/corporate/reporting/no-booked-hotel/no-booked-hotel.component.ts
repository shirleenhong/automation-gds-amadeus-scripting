import { Component, OnInit } from '@angular/core';
import { PnrService } from 'src/app/service/pnr.service';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { UtilHelper } from 'src/app/helper/util.helper';
import { formatDate } from '@angular/common';
import { DDBService } from 'src/app/service/ddb.service';
import { ReasonCodeTypeEnum } from 'src/app/enums/reason-code.enum';
import { ReasonCode } from 'src/app/models/ddb/reason-code.model';

@Component({
  selector: 'app-no-booked-hotel',
  templateUrl: './no-booked-hotel.component.html',
  styleUrls: ['./no-booked-hotel.component.scss']
})
export class NoBookedHotelComponent implements OnInit {
  constructor(private pnrService: PnrService, private fb: FormBuilder, private utilHelper: UtilHelper, private ddbService: DDBService) {}
  segmentForm: FormGroup;
  reasonCodeList: ReasonCode[];
  ngOnInit() {
    this.segmentForm = this.fb.group({
      segments: this.getNoHotel()
    });
    this.loadReasonCodes();
  }
  async loadReasonCodes() {
    await this.ddbService.getReasonCodeByTypeId([ReasonCodeTypeEnum.NoHotelBook], 2).then((response) => {
      this.reasonCodeList = response;
    });
  }

  getNoHotel() {
    const arr = new FormArray([]);
    this.getSegmentForNoHotel().forEach((seg) => {
      const date = this.utilHelper.convertSegmentDate(seg.arrivalDate);
      arr.push(this.createGroup(formatDate(date, 'ddMMM', 'en-US').toUpperCase(), seg.arrivalStation ? seg.arrivalStation : seg.cityCode));
    });
    return arr;
  }

  getSegmentForNoHotel() {
    const noHotelSegment = [];
    const segments = this.pnrService.getSegmentList().sort((a, b) => {
      if (Number(a.lineNo) < Number(b.lineNo)) {
        return -1;
      } else if (Number(a.lineNo) < Number(b.lineNo)) {
        return 1;
      } else {
        return 0;
      }
    });

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < segments.length - 1; i++) {
      const seg1 = segments[i];
      const seg2 = segments[i + 1];
      if (!this.isHotel(seg1) && !this.isHotel(seg2)) {
        if (this.isNotLess4hrDateDiff(seg1.arrivalDate, seg2.departureDate, seg1.arrivalTime, seg2.departureTime)) {
          noHotelSegment.push(seg1);
        } else if (this.isCar(seg1)) {
          if (this.isNotLess4hrDateDiff(seg1.departureDate, seg1.arrivalDate, seg1.departureTime, seg1.arrivalTime)) {
            noHotelSegment.push(seg1);
          }
        }
        if (i + 1 === segments.length - 1 && this.isCar(seg2)) {
          if (this.isNotLess4hrDateDiff(seg2.departureDate, seg2.arrivalDate, seg2.departureTime, seg2.arrivalTime)) {
            noHotelSegment.push(seg2);
          }
        }
      }
    }
    return noHotelSegment;
  }
  isHotel(segment) {
    return segment.segmentType === 'HTL' && segment.segmentType === 'HHL';
  }

  isCar(segment) {
    return segment.segmentType === 'CCR' || segment.segmentType === 'CAR';
  }
  isNotLess4hrDateDiff(date1, date2, time1, time2) {
    const seg1Date = new Date(this.utilHelper.convertSegmentDate(date1));
    const seg2Date = new Date(this.utilHelper.convertSegmentDate(date2));
    seg1Date.setHours(time1.substr(0, 2));
    seg1Date.setMinutes(time1.substr(2, 2));
    seg2Date.setHours(time2.substr(0, 2));
    seg2Date.setMinutes(time2.substr(2, 2));
    const hourDiff = this.utilHelper.dateDiffInHours(seg1Date, seg2Date);
    const dayDiff = this.utilHelper.dateDiffInDays(seg1Date, seg2Date);
    // day diff should be more than 4 hours
    return dayDiff > 0 && hourDiff > 4;
  }

  isLess4HourTimeDiff(time1, date2) {
    const d1 = new Date();
    d1.setTime(time1);
    const d2 = new Date();
    d2.setTime(date2);

    const hrDiff = this.utilHelper.dateDiffInHours(d1, d2);
    if (hrDiff > 4) {
      return false;
    }
    const min1 = time1.substr(2, 2);
    const min2 = date2.substr(2, 2);
    if (hrDiff === 4 && min2 > min1) {
      return false;
    }
    return true;
  }

  createGroup(date, cityCode) {
    return this.fb.group({
      chkIncluded: new FormControl(false),
      date: new FormControl(date, [Validators.required, Validators.pattern('[0-9]{2}[A-Z]{3}')]),
      cityCode: new FormControl(cityCode, [Validators.required, Validators.pattern('[A-Z]{3}')]),
      reasonCode: new FormControl('', [Validators.required]),
      numDays: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}')])
    });
  }
}
