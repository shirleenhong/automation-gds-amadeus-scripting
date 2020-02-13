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
    const u21 = this.pnrService.getRemarkText('U21/-').split('/');
    const u22 = this.pnrService.getRemarkText('U22/-').split('/');
    const arr = new FormArray([]);
    this.pnrService.getSegmentsForNoHotel().forEach((seg) => {
      if (arr.length < 4) {
        const cityCode = seg.arrivalStation ? seg.arrivalStation : seg.cityCode;
        const date = formatDate(this.utilHelper.convertSegmentDate(seg.arrivalDate), 'ddMMM', 'en-US').toUpperCase();
        let reasonCode = '';
        let numdays = '';
        /// extract existing data
        u21
          .filter((x) => x.indexOf(date + cityCode) >= 0)
          .forEach((x) => {
            numdays = x.slice(x.length - 2, x.length);
            reasonCode = x.slice(x.length - 4, x.length - 2);
          });
        u22
          .filter((x) => x.indexOf(date + cityCode) >= 0)
          .forEach((x) => {
            numdays = x.slice(x.length - 2, x.length);
            reasonCode = x.slice(x.length - 4, x.length - 2);
          });
        arr.push(this.createGroup(date, cityCode, reasonCode, numdays));
      }
    });
    return arr;
  }

  createGroup(date, cityCode, reasonCode, numDays) {
    return this.fb.group({
      chkIncluded: new FormControl(false),
      date: new FormControl(date, [Validators.required, Validators.pattern('[0-9]{2}[A-Z]{3}')]),
      cityCode: new FormControl(cityCode, [Validators.required, Validators.pattern('[A-Z]{3}')]),
      reasonCode: new FormControl(reasonCode, [Validators.required]),
      numDays: new FormControl(numDays, [Validators.required])
    });
  }
}
