import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';

import { PnrService } from 'src/app/service/pnr.service';
import { DDBService } from 'src/app/service/ddb.service';
import { ServicingOptionEnums } from 'src/app/enums/servicing-options';
import { ReasonCodeTypeEnum } from 'src/app/enums/reason-code-types';
import { ReasonCode } from 'src/app/models/ddb/reason-code.model';
//import { async } from '@angular/core/testing';

declare var smartScriptSession: any;

@Component({
  selector: 'app-reporting-bsp',
  templateUrl: './reporting-bsp.component.html',
  styleUrls: ['./reporting-bsp.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReportingBSPComponent implements OnInit {
  @Input()
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
      reasonCodeText: new FormControl(reasonCode),
      chkIncluded: new FormControl('')
    });

    if (defaultValue !== undefined && defaultValue !== null) {
      group.setValue(defaultValue);
    }
    this.getReasonCodes();
    return group;
  }

  getServicingOptionValuesFares() {
    debugger;
    this.highFareSO = this.ddbService.getServicingOptionValue(ServicingOptionEnums.High_Fare_Calculation);
    this.lowFareDom = this.ddbService.getServicingOptionValue(ServicingOptionEnums.Low_Fare_Domestic_Calculation);
    this.lowFareInt = this.ddbService.getServicingOptionValue(ServicingOptionEnums.Low_Fare_International_Calculation);
  }

  async drawControls() {
    // let segmentsInFare: string = '';
    // let highFare: any;
    // let lowFare: string = '';
    // let segmentNo: string = '';
    // let reasonCode: string = '';
    // let segmentLineNo: string = '';

    if (this.pnrService.tstObj.length === undefined) {
      this.populateData(this.pnrService.tstObj);
      // segmentsInFare = this.getSegment(this.pnrService.tstObj);
      // segmentNo = segmentsInFare;
      // segmentLineNo = this.getSegmentLineNo(segmentNo);
      // highFare = await this.getHighFare('FXA/S' + segmentLineNo);
      // lowFare = await this.getLowFare('FXD/S' + segmentLineNo);
      // this.addFares(segmentLineNo, highFare, lowFare, reasonCode);
    } else {
      const tsts = this.pnrService.tstObj;
      for await (const p of tsts) {
        this.populateData(p);
        // segmentsInFare = this.getSegment(p);
        // segmentNo = segmentsInFare;
        // segmentLineNo = this.getSegmentLineNo(segmentNo);
        // highFare = await this.getHighFare('FXA/S' + segmentLineNo);
        // lowFare = await this.getLowFare('FXD/S' + segmentLineNo);
        // this.addFares(segmentLineNo, highFare, lowFare, reasonCode);
      }
    }
  }

  async populateData(tst) {
    let segmentsInFare: string = '';
    let highFare: any;
    let lowFare: string = '';
    let segmentNo: string = '';
    let reasonCode: string = '';
    let segmentLineNo: string = '';

    segmentsInFare = this.getSegment(tst);
    segmentNo = segmentsInFare;
    segmentLineNo = this.getSegmentLineNo(segmentNo);
    highFare = await this.getHighFare('FXA/S' + segmentLineNo);
    lowFare = await this.getLowFare('FXD/S' + segmentLineNo);
    this.addFares(segmentLineNo, highFare, lowFare, reasonCode);
  }

  setReasonCode(highFare, lowFare): string {
    let reasonCode: string = '';
    console.log(highFare);
    console.log(lowFare);
    console.log(reasonCode);
    return reasonCode;
  }

  getSegmentLineNo(tatooNumber: string): string {
    // tslint:disable-next-line: max-line-length
    // const seg = this.pnrService.getSegmentTatooNumber().filter((x) => x.segmentType === 'AIR' && x.tatooNo === tatooNumber);
    debugger;
    let tatoos: string[] = [];
    tatooNumber.split(',').forEach((e) => {
      tatoos.push(e);
    });

    let segments = '';
    const seg = this.pnrService.getSegmentTatooNumber().filter((x) => x.segmentType === 'AIR' && tatoos.includes(x.tatooNo));
    seg.forEach((s) => {
      if (segments === '') {
        segments = s.lineNo;
      } else {
        // tslint:disable-next-line: no-debugger
        segments = segments + ',' + s.lineNo;
      }
    });
    return segments;
    // if (seg !== undefined) {
    //   return seg[0].lineNo;
    // } else {
    //   return '';
    // }
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
          // tslint:disable-next-line: no-debugger
          segments = segments + ',' + s.segmentReference.refDetails.refNumber;
        }
      });
    }
    return segments;
  }

  async getHighFare(command: string) {
    let value = '';
    await smartScriptSession.send(command).then((res) => {
      const regex = /TOTALS (.*)/g;
      const match = regex.exec(res.Response);

      debugger;
      //regex.lastIndex = 0;
      if (match !== null) {
        let temp = match[0].split('    ');
        debugger;
        if (temp[3] !== undefined) {
          value = temp[3].trim();
          return value.trim();
        }
      }
    });
    return value;
  }

  // fxd
  async getLowFare(command: string) {
    let value = '';
    await smartScriptSession.send(command).then((res) => {
      debugger;
      const regex = /RECOMMENDATIONS RETURNED FROM [A-Z]{3} (?<from>(.*)) TO (?<to>(.*))/g;
      const match = regex.exec(res.Response);
      regex.lastIndex = 0;
      if (match !== null) {
        if (match.groups !== undefined && match.groups.from !== undefined) {
          value = match.groups.from;
          return value;
        }
      }
    });
    return value;
  }

  getReasonCode(code: string): string {
    code = '';
    return code;
  }

  // getClientSubUnitGuid() {
  //   this.clientSubunitGuid = this.pnrService.getUDIDText('*U25/');
  // }

  getReasonCodes() {
    this.reasonCodes = this.ddbService.getReasonCodeByTypeId([ReasonCodeTypeEnum.Realized, ReasonCodeTypeEnum.Missed]);
  }
}
