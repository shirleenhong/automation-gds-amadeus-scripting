import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';

import { PnrService } from '../../../service/pnr.service';
import { DDBService } from '../../../service/ddb.service';
import { ServicingOptionEnums } from '../../../enums/servicing-options';
import { ReasonCodeTypeEnum } from '../../../enums/reason-code-types';
import { ReasonCode } from '../../../models/ddb/reason-code.model';

declare var smartScriptSession: any;

@Component({
  selector: 'app-reporting-bsp',
  templateUrl: './reporting-bsp.component.html',
  styleUrls: ['./reporting-bsp.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReportingBSPComponent implements OnInit {
  reasonCodes: ReasonCode[];
  bspGroup: FormGroup;
  total = 1;
  highFareSO: any;
  lowFareDom: any;
  lowFareInt: any;

  constructor(private fb: FormBuilder, private pnrService: PnrService, private ddbService: DDBService) {}

  ngOnInit() {
    this.bspGroup = this.fb.group({
      fares: this.fb.array([this.createFormGroup('', '', '', '')])
    });
    this.removeFares(0); // this is a workaround to remove the first item
    this.getServicingOptionValuesFares();
    this.drawControls();
  }

  removeFares(i) {
    const items = this.bspGroup.get('fares') as FormArray;
    items.removeAt(i);
    this.total = items.length;
  }

  addFares(segmentNo: string, highFare: string, lowFare: string, reasonCode: string) {
    const items = this.bspGroup.get('fares') as FormArray;
    items.push(this.createFormGroup(segmentNo, highFare, lowFare, reasonCode));
    this.total = items.length;
  }

  createFormGroup(segmentNo: string, highFare: string, lowFare: string, reasonCode: string, defaultValue?: any): FormGroup {
    const group = this.fb.group({
      segment: new FormControl(segmentNo),
      highFareText: new FormControl(highFare),
      lowFareText: new FormControl(lowFare),
      reasonCodeText: new FormControl(reasonCode)
    });

    if (defaultValue !== undefined && defaultValue !== null) {
      group.setValue(defaultValue);
    }
    this.getReasonCodes();
    return group;
  }

  getServicingOptionValuesFares() {
    this.highFareSO = this.ddbService.getServicingOptionValue(ServicingOptionEnums.High_Fare_Calculation);
    this.lowFareDom = this.ddbService.getServicingOptionValue(ServicingOptionEnums.Low_Fare_Domestic_Calculation);
    this.lowFareInt = this.ddbService.getServicingOptionValue(ServicingOptionEnums.Low_Fare_International_Calculation);
  }

  drawControls() {
    let segmentsInFare: string = '';
    let highFare: string = '';
    let lowFare: string = '';
    let segmentNo: string = '';
    let reasonCode: string = '';

    if (this.pnrService.tstObj.length === undefined) {
      segmentsInFare = this.getSegment(this.pnrService.tstObj);
      segmentNo = segmentsInFare;
      this.addFares(segmentNo, highFare, lowFare, reasonCode);
    } else {
      this.pnrService.tstObj.forEach((p) => {
        segmentsInFare = this.getSegment(p);
        if (segmentsInFare.indexOf('/') === -1) {
          segmentNo = segmentsInFare;
          this.addFares(segmentNo, highFare, lowFare, reasonCode);
        } else {
          segmentsInFare.split('/').forEach((element) => {
            segmentNo = element;
            this.addFares(segmentNo, highFare, lowFare, reasonCode);
          });
        }
      });
    }
  }

  getSegment(tst: any): string {
    let segments: string;
    segments = '';
    if (tst.segmentInformation.length === undefined) {
      segments = tst.segmentInformation.segmentReference.refDetails.refNumber;
    } else {
      tst.segmentInformation.forEach((s) => {
        if (segments === '') {
          segments = s.segmentReference.refDetails.refNumber;
        } else {
          segments = segments + '/' + s.segmentReference.refDetails.refNumber;
        }
      });
    }
    return segments;
  }

  getHighFare(fare: string, command: string): string {
    smartScriptSession.send(command).then((res) => {
      if (res.Response !== undefined) {
      }
    });
    return fare;
  }

  getLowFare(fare: string): string {
    return fare;
  }

  getReasonCode(code: string): string {
    return code;
  }

  // getClientSubUnitGuid() {
  //   this.clientSubunitGuid = this.pnrService.getUDIDText('*U25/');
  // }

  getReasonCodes() {
    this.reasonCodes = this.ddbService.getReasonCodeByTypeId([ReasonCodeTypeEnum.Realized, ReasonCodeTypeEnum.Missed]); //this.ddbService.getReasonCodes(this.pnrService.clientSubUnitGuid);
  }
}
