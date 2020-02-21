import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SelectItem } from 'src/app/models/select-item.model';
import { PnrService } from 'src/app/service/pnr.service';
import { DDBService } from 'src/app/service/ddb.service';
import { FormControl, Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { ReportingViewModel } from 'src/app/models/reporting-view.model';
import { ReasonCode } from 'src/app/models/ddb/reason-code.model';

import { CounselorDetail } from 'src/app/globals/counselor-identity';
import { ObtComponent } from '../obt/obt.component';

@Component({
  selector: 'app-reporting-remarks',
  templateUrl: './reporting-remarks.component.html',
  styleUrls: ['./reporting-remarks.component.scss']
})
export class ReportingRemarksComponent implements OnInit {
  bspRouteCodeList: SelectItem[];
  isTripTypeCorporate = false;
  reportingForm: FormGroup;
  destinations: any[];
  segments: any[];
  showSegments = false;
  ebCList: Array<ReasonCode> = [];
  showEBDetails: boolean;
  isCorporate = false;

  ebRList: { itemValue: string; itemText: string }[];
  @ViewChild(ObtComponent) obtComponent: ObtComponent;
  @Input() reportingRemarksView = new ReportingViewModel();
  constructor(
    private pnrService: PnrService,
    private ddbService: DDBService,
    private fb: FormBuilder,
    private counselorDetail: CounselorDetail
  ) {
    this.destinations = pnrService.getSegmentRoutes();
  }

  async loadData(): Promise<void> {}
  async ngOnInit() {
    this.reportingForm = new FormGroup({
      bspRouteCode: new FormControl('', [Validators.required]),
      segments: this.fb.array([])
    });

    this.bspRoutingCodeProcess();

    await this.loadData();
    const tstSegments = await this.pnrService.getTstSegmentNumbers();
    const allSegments = this.pnrService.getSegmentList().map((segment) => segment.lineNo);
    const nonTstSegments = allSegments.filter((s) => tstSegments.filter((z) => z.indexOf(s) > -1).length === 0);
    const deRemarks = this.pnrService.getRemarksFromGDSByRegex(/DE\/-/g);

    for (const segment of tstSegments) {
      this.showSegments = true;
      const de = deRemarks.filter((s) => this.pnrService.getSegmentLineNo(s.segments.join(',')) === segment);
      const remark = de.length > 0 ? de[0].remarkText : '';
      const group = this.createFormGroup(segment, remark.replace('*DE/-', ''));
      (this.reportingForm.get('segments') as FormArray).push(group);
    }

    if (nonTstSegments.length > 0) {
      const de = deRemarks.filter((s) => s.segments.length === 0);
      const remark = de.length > 0 ? de[0].remarkText : '';
      this.showSegments = true;
      const group = this.createFormGroup('', remark.replace('*DE/-', ''));
      (this.reportingForm.get('segments') as FormArray).push(group);
    }

    this.isCorporate = this.counselorDetail.getIsCorporate();
  }

  bspRoutingCodeProcess() {
    if (this.checkTripType()) {
      this.isTripTypeCorporate = true;
      this.getRouteCodes();
      this.reportingRemarksView.tripType = 1;
    }
  }
  getCountryDest(item) {
    this.reportingRemarksView.routeCode = item;
  }
  checkTripType(): boolean {
    const rmElements = this.pnrService.pnrObj.rmElements;
    for (const rmElement of rmElements) {
      if (rmElement.category === '*' && rmElement.freeFlowText.indexOf('CF/-') > -1) {
        const lastLetter = rmElement.freeFlowText.substr(-1);
        if (lastLetter === 'C') {
          return true;
        }
      }
    }
    return false;
  }
  getRouteCodes() {
    this.bspRouteCodeList = this.ddbService.getRouteCodeList();
    const fs = this.pnrService.getFSRemark();
    if (fs) {
      this.reportingRemarksView.routeCode = fs.substr(0, 1);
      this.reportingForm.get('bspRouteCode').setValue(fs.substr(0, 1));
    }
  }
  createFormGroup(segmentNo, desti) {
    return this.fb.group({
      segment: new FormControl(segmentNo),
      destinationList: new FormControl(desti, [Validators.required])
    });
  }

  enableFormControls(controls: string[], disabled: boolean) {
    controls.forEach((c) => {
      if (disabled) {
        this.reportingForm.get(c).disable();
        this.reportingForm.get(c).reset();
      } else {
        this.reportingForm.get(c).enable();
      }
    });
  }

  getDestinationValue(segmentNo): string {
    let val: string;
    for (const air of this.pnrService.pnrObj.airSegments) {
      if (air.elementNumber === segmentNo) {
        val = air.arrivalAirport;
      }
    }
    for (const car of this.pnrService.pnrObj.auxCarSegments) {
      if (car.elementNumber === segmentNo) {
        val = car.fullNode.travelProduct.boardpointDetail.cityCode;
      }
    }

    for (const hotel of this.pnrService.pnrObj.auxHotelSegments) {
      if (hotel.elementNumber === segmentNo) {
        val = hotel.fullNode.travelProduct.boardpointDetail.cityCode;
      }
    }

    for (const misc of this.pnrService.pnrObj.miscSegments) {
      if (misc.elementNumber === segmentNo) {
        val = misc.fullNode.travelProduct.boardpointDetail.cityCode;
      }
    }
    return val;
  }
}
