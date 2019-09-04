import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
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
  @Input()
  reasonCodes: Array<ReasonCode[]> = [];
  bspGroup: FormGroup;
  total = 1;
  highFareSO: any;
  lowFareDom: any;
  lowFareInt: any;
  isDomesticFlight = false;

  constructor(private fb: FormBuilder, private pnrService: PnrService, private ddbService: DDBService) {}

  ngOnInit() {
    this.bspGroup = this.fb.group({
      fares: this.fb.array([this.createFormGroup('', '', '', '', '')])
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

  addFares(segmentNo: string, highFare: string, lowFare: string, reasonCode: string, chargeFare: string, isExchange: boolean) {
    const items = this.bspGroup.get('fares') as FormArray;
    if (isExchange) {
      reasonCode = 'E : Exchange';
      highFare = chargeFare;
      lowFare = chargeFare;
    }
    items.push(this.createFormGroup(segmentNo, highFare, lowFare, reasonCode, chargeFare, isExchange));
    this.total = items.length;
  }

  createFormGroup(
    segmentNo: string,
    highFare: string,
    lowFare: string,
    reasonCode: string,
    chargeFare: string,
    isExchange?: boolean,
    defaultValue?: any
  ): FormGroup {
    const group = this.fb.group({
      segment: new FormControl(segmentNo),
      highFareText: new FormControl(highFare),
      lowFareText: new FormControl(lowFare),
      reasonCodeText: new FormControl(reasonCode),
      chargeFare: new FormControl(chargeFare),
      chkIncluded: new FormControl(''),
      isExchange: new FormControl(isExchange)
    });

    if (isExchange) {
      group.get('reasonCodeText').disable();
      group.get('highFareText').disable();
      group.get('lowFareText').disable();
    }

    if (defaultValue !== undefined && defaultValue !== null) {
      group.setValue(defaultValue);
    }
    if (!isExchange) {
      this.changeReasonCodes(group, this.reasonCodes.length - 1);
    }

    return group;
  }

  changeReasonCodes(group: FormGroup, indx: number) {
    if (indx >= 0) {
      const lowFare = group.get('lowFareText').value;
      const chargeFare = group.get('chargeFare').value;
      if (parseFloat(lowFare) === parseFloat(chargeFare)) {
        this.reasonCodes[indx] = this.ddbService.getReasonCodeByTypeId([ReasonCodeTypeEnum.Realized], 'en-GB');
      } else if (parseFloat(lowFare) < parseFloat(chargeFare)) {
        this.reasonCodes[indx] = this.ddbService.getReasonCodeByTypeId([ReasonCodeTypeEnum.Missed], 'en-GB');
      }
    }
  }

  getServicingOptionValuesFares() {
    this.highFareSO = this.ddbService.getServicingOptionValue(ServicingOptionEnums.High_Fare_Calculation);
    this.lowFareDom = this.ddbService.getServicingOptionValue(ServicingOptionEnums.Low_Fare_Domestic_Calculation);
    this.lowFareInt = this.ddbService.getServicingOptionValue(ServicingOptionEnums.Low_Fare_International_Calculation);
  }

  async drawControls() {
    if (this.pnrService.tstObj.length === undefined) {
      this.populateData(this.pnrService.tstObj);
    } else {
      const tsts = this.pnrService.tstObj;
      for await (const p of tsts) {
        this.populateData(p);
      }
    }
  }

  async populateData(tst) {
    const fareInfo = tst.fareDataInformation.fareDataSupInformation;
    const chargeFare = fareInfo[fareInfo.length - 1].fareAmount;
    const segmentsInFare = this.getSegment(tst);
    const segmentNo = segmentsInFare;
    const segmentLineNo = this.getSegmentLineNo(segmentNo);

    const highFare = await this.getHighFare(this.highFareSO.ServiceOptionItemValue + '/S' + segmentLineNo); // FXA/S
    let lowFare = '';
    if (this.isDomesticFlight) {
      lowFare = (await this.getLowFare(this.lowFareDom.ServiceOptionItemValue + '/S' + segmentLineNo)) + this.getThresHold(); // FXD/S
    } else {
      lowFare = (await this.getLowFare(this.lowFareInt.ServiceOptionItemValue + '/S' + segmentLineNo)) + this.getThresHold(); // FXD/S
    }

    const isExchange = this.IsSegmentExchange(segmentsInFare); /// get is Exchange
    this.reasonCodes.push([]);
    this.addFares(segmentLineNo, highFare, lowFare, '', chargeFare, isExchange);
  }

  IsSegmentExchange(tatooNumber): boolean {
    return this.pnrService.exchangeTatooNumbers.filter((e) => tatooNumber.includes(e)).length > 0;
  }

  getThresHold(): number {
    // todo
    return 0;
  }

  getSegmentLineNo(tatooNumber: string): string {
    const tatoos: string[] = [];
    tatooNumber.split(',').forEach((e) => {
      tatoos.push(e);
    });

    let segments = '';
    const seg = this.pnrService.getSegmentTatooNumber().filter((x) => x.segmentType === 'AIR' && tatoos.includes(x.tatooNo));
    seg.forEach((s) => {
      if (segments === '') {
        segments = s.lineNo;
      } else {
        segments = segments + ',' + s.lineNo;
      }
    });
    return segments;
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

      // regex.lastIndex = 0;
      if (match !== null) {
        const temp = match[0].split('    ');
        // debugger;
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
      // debugger;
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
}
