import { Component, OnInit, Input } from '@angular/core';
import { SelectItem } from 'src/app/models/select-item.model';
import { PnrService } from 'src/app/service/pnr.service';
import { DDBService } from 'src/app/service/ddb.service';
import { FormControl, Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { ReportingViewModel } from 'src/app/models/reporting-view.model';
import { ReasonCode } from 'src/app/models/ddb/reason-code.model';
import { ReasonCodeTypeEnum } from 'src/app/enums/reason-code-types';
import { CounselorDetail } from 'src/app/globals/counselor-identity';

@Component({
  selector: 'app-reporting-remarks',
  templateUrl: './reporting-remarks.component.html',
  styleUrls: ['./reporting-remarks.component.scss']
})
export class ReportingRemarksComponent implements OnInit {
  bspRouteCodeList: SelectItem[];
  isTripTypeCorporate = false;
  reportingForm: FormGroup;
  destinations: Array<any>;
  segments: any[];
  showSegments = false;
  ebCList: Array<ReasonCode> = [];
  showEBDetails: boolean;
  isCorporate = false;
  ebRList: { itemValue: string; itemText: string }[];

  @Input() reportingRemarksView = new ReportingViewModel();
  constructor(private pnrService: PnrService, private ddbService: DDBService, private fb: FormBuilder,
              private counselorDetail: CounselorDetail) {
    this.destinations = pnrService.getAirDestinations();
  }
  async loadData(): Promise<void> {}
  async ngOnInit() {
    this.reportingForm = new FormGroup({
      bspRouteCode: new FormControl('', [Validators.required]),
      segments: this.fb.array([]),
      ebR: new FormControl('', [Validators.required]),
      ebT: new FormControl('', [Validators.required]),
      ebN: new FormControl('GI', [Validators.required]),
      ebC: new FormControl('', [Validators.required]),
    });
    this.reportingForm.get('ebR').disable();
    this.reportingForm.get('ebT').disable();
    this.reportingForm.get('ebN').disable();
    this.reportingForm.get('ebC').disable();
    this.bspRoutingCodeProcess();

    await this.loadData();
    this.segments = await this.pnrService.getTstSegments();
    for (const segment of this.segments) {
      this.showSegments = true;
      const group = this.createFormGroup(segment);
      (this.reportingForm.get('segments') as FormArray).push(group);
    }
    this.isCorporate = this.counselorDetail.getIsCorporate();
    await this.loadStaticValue();
    this.checkEbRemark();
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
  }
  createFormGroup(segmentNo) {
    const val = this.getDestinationValue(segmentNo);
    return this.fb.group({
      segment: new FormControl(segmentNo),
      destinationList: new FormControl(val, [Validators.required])
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

    for (const element of this.pnrService.pnrObj.rmElements) {
      if (element.freeFlowText.includes('*DE/-')) {
        const tatoo = this.pnrService.getTatooNumberFromSegmentNumber(segmentNo);
        const ref = element.fullNode.referenceForDataElement.reference;

        if (ref.length > 0) {
          if (ref[0].number === tatoo.toString().split(',')[0]) {
            val = element.freeFlowText.split('*DE/-')[1];
            return val;
          }
        } else if (tatoo.includes(ref.number)) {
          val = element.freeFlowText.split('*DE/-')[1];
          return val;
        }
      }
    }
  }
  checkEbRemark() {
    this.showEBDetails = false;
    let ebData = this.pnrService.getRemarkText('EB/');
    if (ebData) {
      ebData = ebData.split('/');
      if (ebData.length === 3) {
        this.populateEBFields(ebData);
      }
    }
  }
  async populateEBFields(eb) {
    if (!this.isCorporate) {
      this.showEBDetails = false;
      return;
    }
    const ebR = eb[1].substr(0, 2);
    const ebT = eb[1].substr(2, 1);
    const ebN = eb[2].substr(0, 2);
    const ebC = eb[2].substr(2, 1);

    this.showEBDetails = ebR && ebT && ebN && ebC ? true : false;
    if (this.showEBDetails) {
      const ebrValues = this.ebRList.map((seat) => seat.itemValue);

      if (ebrValues.indexOf(ebR) > -1) {
        this.reportingForm.controls.ebR.setValue(ebR);
      }

      for (const c of this.ebCList) {
        if (c.reasonCode === ebC) {
          this.reportingForm.controls.ebC.setValue(ebC);
        }
      }
      this.reportingForm.controls.ebT.setValue(ebT);
      this.reportingForm.controls.ebN.setValue(ebN);
      this.reportingForm.get('ebR').enable();
      this.reportingForm.get('ebT').enable();
      this.reportingForm.get('ebN').enable();
      this.reportingForm.get('ebC').enable();
    }
  }
  async loadStaticValue() {
    const self = this;
    await this.ddbService.getReasonCodeByTypeId([ReasonCodeTypeEnum.TouchReason], 8).then((x) => {
      self.ebCList = x;
    });
    this.ebRList = [
      { itemValue: 'AM', itemText: 'AM- Full Service Agent Assisted' },
      { itemValue: 'CT', itemText: 'CT- Online Agent Assisted' }
    ];
  }

}
