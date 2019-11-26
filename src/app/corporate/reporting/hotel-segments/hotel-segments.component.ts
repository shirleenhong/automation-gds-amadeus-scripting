import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { PnrService } from '../../../service/pnr.service';
import { DatePipe, formatDate } from '@angular/common';
import { UtilHelper } from '../../../helper/util.helper';
import { DDBService } from '../../../service/ddb.service';
import { ReasonCodeTypeEnum } from 'src/app/enums/reason-code.enum';

@Component({
  selector: 'app-hotel-segments',
  templateUrl: './hotel-segments.component.html',
  styleUrls: ['./hotel-segments.component.scss']
})
export class HotelSegmentsComponent implements OnInit {
  hotelSegments: FormGroup;
  hotels: FormArray;
  segmentList: any[];
  hotelSegmentList: any[];
  datePipe: any;
  reAddRemarks = [];
  segmentsForUI = [];
  hotelSavingsCodes: any;

  constructor(private fb: FormBuilder, private pnrService: PnrService, private utilHelper: UtilHelper, private ddbService: DDBService) {
    this.datePipe = new DatePipe('en-US');
  }

  async ngOnInit() {
    this.hotelSegments = this.fb.group({
      hotels: this.fb.array([])
    });
    await this.ddbService.getReasonCodeByTypeId([ReasonCodeTypeEnum.Missed], 2).then((response) => {
      this.hotelSavingsCodes = response;
    });
    this.segmentList = this.pnrService.getSegmentList();
    this.hotelSegmentList = this.segmentList.filter((x) => {
      if (x.segmentType === 'HTL') {
        return x;
      }
    });
    this.hotelSegmentList = this.getHotelPreFilledValues(this.hotelSegmentList);
    if (this.hotelSegmentList.length > 0) {
      this.hotelSegments = new FormGroup({
        hotels: this.fb.array(this.hotelSegmentList)
      });
      this.hotels = this.hotelSegments.get('hotels') as FormArray;
    }
  }

  getHotelPreFilledValues(data) {
    const hotelRemarks = this.getHotelRemarks();
    const segments = this.checkHotelSegments(hotelRemarks, data);
    const groupArray = [];
    for (const seg of segments) {
      let date = seg.deptdate ? seg.deptdate : seg.departureDate;
      date = seg.departureDate ? seg.departureDate : date;
      const segDate = this.getDateFromSegment(date);
      const tempDate = new Date(segDate);
      date = formatDate(tempDate, 'ddMMM', 'en-US').toUpperCase();
      const chainCode = seg.hotelChainCode;
      const group = this.fb.group({
        checkInDate: new FormControl(date),
        segment: new FormControl(seg.lineNo),
        hotelSavingsCode: new FormControl(''),
        chainCode: new FormControl(chainCode),
        chkIncluded: new FormControl(false)
      });
      if (!seg.isPassive) {
        group.get('chainCode').disable();
      }
      groupArray.push(group);
    }
    return groupArray;
  }

  getHotelRemarks() {
    const hotelRemarks = [];
    const rmElements = this.pnrService.pnrObj.rmElements;
    for (const rmEle of rmElements) {
      if (rmEle.category === '*' && rmEle.freeFlowText.indexOf('HS') > -1) {
        hotelRemarks.push(this.getDateAndMonth(rmEle));
      }
    }
    return hotelRemarks;
  }
  getDateAndMonth(rmEle) {
    const hotelRmkObj = {
      departureDate: '',
      savingsCode: '',
      chainCode: '',
      lineNo: '',
      tatooNo: ''
    };
    const dateRegex = /[0-9]{2}[A-Z]{3}/g;
    const freeText = rmEle.freeFlowText.replace('CS', '');
    const dateMatch = freeText.match(dateRegex);
    if (dateMatch && dateMatch[0]) {
      hotelRmkObj.departureDate = dateMatch[0];
    }
    const sav = rmEle.freeFlowText.match(/((-SV-)[A-Z]{1})/g);
    hotelRmkObj.savingsCode = sav ? sav[0].substr(sav[0].length - 1, 1) : '';
    const cc = rmEle.freeFlowText.match(/((-CHN-)[A-Z]{2})/g);
    hotelRmkObj.chainCode = cc ? cc[0].substr(cc[0].length - 2, 2) : '';
    hotelRmkObj.lineNo = rmEle.elementNumber;
    hotelRmkObj.tatooNo = rmEle.tatooNumber;
    return hotelRmkObj;
  }
  checkHotelSegments(hotelRemarks, hotelSegments) {
    for (const seg of hotelSegments) {
      let matches = false;
      let date = seg.deptdate ? seg.deptdate : seg.departureDate;
      date = seg.departureDate ? seg.departureDate : date;
      const segDate = this.getDateFromSegment(date);
      const tempDate = new Date(segDate);
      date = formatDate(tempDate, 'ddMMM', 'en-US').toUpperCase();
      for (const rmk of hotelRemarks) {
        if (date === rmk.departureDate) {
          const reAddObj = {
            date: rmk.departureDate,
            savingsCode: rmk.savingsCode,
            chainCode: rmk.chainCode
          };
          this.reAddRemarks.push(reAddObj);
          matches = true;
        }
      }
      if (!matches) {
        this.segmentsForUI.push(seg);
      }
    }

    return this.segmentsForUI;
  }
  getDateFromSegment(date) {
    const day = date.substring(0, 2);
    const month = date.substring(2, 4);
    const year = '20' + date.substring(4, 6);
    return year + '-' + month + '-' + day;
  }
  checkChange(group) {
    if (group.get('chkIncluded').value === true && this.hotelSavingsCodes.length > 0) {
      this.addValidation(group, 'hotelSavingsCode');
      this.utilHelper.validateAllFields(group);
    } else {
      this.removeValidation(group, 'hotelSavingsCode');
    }
  }
  addValidation(group: any, controlName: string) {
    const control = group.get(controlName);
    control.setValidators([Validators.required]);
    control.updateValueAndValidity();
  }
  removeValidation(group: any, controlName: string) {
    const control = group.get(controlName);
    control.clearValidators();
    control.updateValueAndValidity();
  }
}
