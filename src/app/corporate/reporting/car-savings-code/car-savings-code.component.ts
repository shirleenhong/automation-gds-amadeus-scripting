import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { PnrService } from 'src/app/service/pnr.service';
import { formatDate } from '@angular/common';
import { ReasonCode } from 'src/app/models/ddb/reason-code.model';
import { UtilHelper } from 'src/app/helper/util.helper';
import { ReasonCodeTypeEnum } from '../../../enums/reason-code.enum';
import { DDBService } from 'src/app/service/ddb.service';

@Component({
  selector: 'app-car-savings-code',
  templateUrl: './car-savings-code.component.html',
  styleUrls: ['./car-savings-code.component.scss']
})
export class CarSavingsCodeComponent implements OnInit {
  carSavingsCodeGroup: FormGroup;
  deleteRemarks = [];
  reAddRemarks = [];
  carReasonCodes: Array<ReasonCode> = [];
  constructor(private fb: FormBuilder, private pnrService: PnrService, private utilHelper: UtilHelper, private ddbService: DDBService) {}

  async ngOnInit() {
    this.carSavingsCodeGroup = this.fb.group({
      carSavings: this.fb.array([])
    });
    await this.ddbService.getReasonCodeByTypeId([ReasonCodeTypeEnum.Missed], 3).then((response) => {
      this.carReasonCodes = response;
      this.carSavingsCode();
    });
  }
  createCarSavingsGroup(segmentNo: string, pickUpDate: string, pickUpCity: string, reasonCode: string): FormGroup {
    const group = this.fb.group({
      segment: new FormControl(segmentNo),
      date: new FormControl(pickUpDate),
      city: new FormControl(pickUpCity),
      chkIncluded: new FormControl(''),
      carReasonCode: new FormControl(reasonCode)
    });
    group.get('segment').setValue(segmentNo);
    group.get('date').setValue(pickUpDate);
    group.get('city').setValue(pickUpCity);
    group.get('carReasonCode').setValue(reasonCode);
    return group;
  }
  checkChange(group) {
    if (group.get('chkIncluded').value === true) {
      this.addValidation(group, 'carReasonCode');
      this.utilHelper.validateAllFields(group);
    } else {
      this.removeValidation(group, 'carReasonCode');
    }
  }
  removeValidation(group: any, controlName: string) {
    const control = group.get(controlName);
    control.setValidators(null);
    control.updateValueAndValidity();
  }
  addValidation(group: any, controlName: string) {
    const control = group.get(controlName);
    control.setValidators([Validators.required]);
    control.updateValueAndValidity();
  }
  carSavingsCode() {
    const allSegments = this.pnrService.getSegmentList();
    const allCarSegments = this.getCarSegments(allSegments);
    const allCarRemarks = this.getCarRemarks();
    this.addCarSegments(allCarRemarks, allCarSegments);
    this.deleteRemarks = this.getDeletedRemarks(allCarRemarks, allCarSegments);
  }
  getCarSegments(allSegments) {
    let carSegments = [];
    for (const seg of allSegments) {
      if (seg.segmentType === 'CAR' || seg.segmentType === 'CCR') {
        carSegments.push(seg);
      }
    }
    carSegments = carSegments.sort((a, b) => {
      if (parseInt(a.lineNo, null) < parseInt(b.lineNo, null)) {
        return -1;
      } else if (parseInt(a.lineNo, null) > parseInt(b.lineNo, null)) {
        return 1;
      } else {
        return 0;
      }
    });
    return carSegments;
  }
  getCarRemarks() {
    const carRemarks = [];
    const rmElements = this.pnrService.pnrObj.rmElements;
    for (const rmEle of rmElements) {
      if (rmEle.category === '*' && rmEle.freeFlowText.indexOf('CS') > -1) {
        carRemarks.push(this.getDateAndCity(rmEle));
      }
    }
    return carRemarks;
  }
  getDateAndCity(rmEle) {
    const carRmkObj = {
      pickUpDate: '',
      pickUpCity: '',
      lineNo: '',
      tatooNo: '',
      reasonCode: ''
    };
    const dateRegex = /[0-9]{2}[A-Z]{3}/g;
    const cityRegex = /[A-Z]{3}/g;
    const reasonCodeRegex = /-SV-[A-Z 0-9]{1}/g;
    let freeText = rmEle.freeFlowText.replace('CS', '');
    const dateMatch = freeText.match(dateRegex);
    if (dateMatch && dateMatch[0]) {
      carRmkObj.pickUpDate = dateMatch[0];
      freeText = freeText.replace(dateMatch[0], '');
      const cityMatch = freeText.match(cityRegex);
      if (cityMatch && cityMatch[0]) {
        carRmkObj.pickUpCity = cityMatch[0];
      }
      const reasonCodeMatch = freeText.match(reasonCodeRegex);
      if (reasonCodeMatch && reasonCodeMatch[0]) {
        carRmkObj.reasonCode = reasonCodeMatch[0].replace('-SV-', '').trim();
      }
    }
    carRmkObj.lineNo = rmEle.elementNumber;
    carRmkObj.tatooNo = rmEle.tatooNumber;
    return carRmkObj;
  }

  getDateFromSegment(date) {
    const day = date.substring(0, 2);
    const month = date.substring(2, 4);
    const year = '20' + date.substring(4, 6);
    return year + '-' + month + '-' + day;
  }
  addSegments(date, segment) {
    const items = this.carSavingsCodeGroup.get('carSavings') as FormArray;
    items.push(this.createCarSavingsGroup(segment.lineNo, date, segment.cityCode, ''));
  }
  addCarSegments(carRemarks, carSegments) {
    for (const seg of carSegments) {
      let matches = false;
      let date = seg.isPassive ? seg.deptdate : seg.departureDate;
      const segDate = this.getDateFromSegment(date);
      const tempDate = new Date(segDate);
      date = formatDate(tempDate, 'ddMMM', 'en-US').toUpperCase();
      for (const rmk of carRemarks) {
        if (date === rmk.pickUpDate && rmk.pickUpCity === seg.cityCode) {
          const reAddObj = {
            date: rmk.pickUpDate,
            city: rmk.pickUpCity,
            reasonCode: rmk.reasonCode
          };
          this.reAddRemarks.push(reAddObj);
          matches = true;
        }
      }
      if (!matches) {
        this.addSegments(date, seg);
      }
    }
  }
  getDeletedRemarks(carRemarks, carSegments) {
    const deletedRmks = [];
    for (const rmk of carRemarks) {
      let matches = false;
      for (const seg of carSegments) {
        const segmentDate = seg.departureDate !== '' ? seg.departureDate : seg.deptdate;
        const segDate = this.getDateFromSegment(segmentDate);
        const tempDate = new Date(segDate);
        const date = formatDate(tempDate, 'ddMMM', 'en-US').toUpperCase();
        if (date === rmk.pickUpDate && rmk.pickUpCity === seg.cityCode) {
          matches = true;
        }
      }
      if (!matches) {
        deletedRmks.push(rmk.lineNo);
      }
    }
    return deletedRmks;
  }
}
