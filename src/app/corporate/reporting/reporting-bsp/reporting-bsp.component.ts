import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { PnrService } from '../../../service/pnr.service';
import { DDBService } from '../../../service/ddb.service';
import { ServicingOptionEnums } from '../../../enums/servicing-options';
import { ReasonCodeTypeEnum } from '../../../enums/reason-code-types';
import { ReasonCode } from '../../../models/ddb/reason-code.model';
import { UtilHelper } from 'src/app/helper/util.helper';

declare var smartScriptSession: any;

@Component({
  selector: 'app-reporting-bsp',
  templateUrl: './reporting-bsp.component.html',
  styleUrls: ['./reporting-bsp.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReportingBSPComponent implements OnInit {
  isDoneLoading = false;
  @Input()
  reasonCodes: Array<ReasonCode[]> = [];
  bspGroup: FormGroup;
  total = 1;
  highFareSO: any;
  lowFareDom: any;
  lowFareInt: any;
  isDomesticFlight = true;
  thresholdAmount = 0;

  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private pnrService: PnrService, private ddbService: DDBService, private utilHelper: UtilHelper) {}

  ngOnInit() {
    debugger;
    this.isDoneLoading = false;
    this.bspGroup = this.fb.group({
      fares: this.fb.array([this.createFormGroup('', '', '', '', '')])
    });
    this.isDomesticFlight = this.ddbService.isPnrDomestic();
    this.thresholdAmount = this.getThresHoldAmount();
    this.removeFares(0); // this is a workaround to remove the first item
    this.getServicingOptionValuesFares();
    this.getTstDetails();
  }

  removeFares(i) {
    const items = this.bspGroup.get('fares') as FormArray;
    items.removeAt(i);
    this.total = items.length;
  }

  addFares(segmentNo: string, highFare: string, lowFare: string, reasonCode: string, chargeFare: string, isExchange: boolean) {
    const items = this.bspGroup.get('fares') as FormArray;

    if (Number(highFare) < Number(chargeFare)) {
      highFare = chargeFare;
    }

    items.push(this.createFormGroup(segmentNo, highFare, lowFare, reasonCode, chargeFare, isExchange));
    this.total = items.length;
  }

  getReasonCodeValue(code, index): string {
    const reasonText = this.reasonCodes[index]
      .filter((x) => x.reasonCode === code)
      .map((x) => x.reasonCode + ' : ' + x.reasonCodeProductTypeDescriptions.get('en-GB'));

    if (reasonText.length >= 0) {
      return reasonText[0];
    }

    return '';
  }

  createFormGroup(
    segmentNo: string,
    highFare: string,
    lowFare: string,
    reasonCode: string,
    chargeFare: string,
    isExchange?: boolean
    //defaultValue?: any
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

    const currentIndex = this.reasonCodes.length - 1;
    if (this.thresholdAmount > 0) {
      if (Number(chargeFare) <= Number(lowFare) + Number(this.thresholdAmount)) {
        if (this.reasonCodes.length > 0) {
          //reasonCode = this.getReasonCodeValue('7', currentIndex);
          group.get('reasonCodeText').setValue('7');
        }
      }
    }

    if (isExchange) {
      if (this.reasonCodes.length > 0) {
        this.reasonCodes[currentIndex] = this.ddbService.getReasonCodeByTypeId([ReasonCodeTypeEnum.Missed], 'en-GB', 1);
        //reasonCode = this.getReasonCodeValue('7', currentIndex);
        // if (reasonCode === '') {
        //   group.get('reasonCodeText').setValue('E : Exchange');
        // } else {
        group.get('reasonCodeText').setValue('E');
        // }
      }

      group.get('highFareText').setValue(chargeFare);
      group.get('lowFareText').setValue(chargeFare);
      group.get('reasonCodeText').disable();
      group.get('highFareText').disable();
      group.get('lowFareText').disable();
    } else {
      this.changeReasonCodes(group, currentIndex);
      if (this.reasonCodes.length > 0 && this.reasonCodes[currentIndex].length === 1) {
        reasonCode =
          this.reasonCodes[currentIndex][0].reasonCode +
          ' : ' +
          this.reasonCodes[currentIndex][0].reasonCodeProductTypeDescriptions.get('en-GB');
        group.get('reasonCodeText').setValue(reasonCode);
      }
    }

    // if (defaultValue !== undefined && defaultValue !== null) {
    //   group.setValue(defaultValue);
    // }

    return group;
  }

  getServicingOptionValuesFares() {
    this.highFareSO = this.ddbService.getServicingOptionValue(ServicingOptionEnums.High_Fare_Calculation);
    this.lowFareDom = this.ddbService.getServicingOptionValue(ServicingOptionEnums.Low_Fare_Domestic_Calculation);
    this.lowFareInt = this.ddbService.getServicingOptionValue(ServicingOptionEnums.Low_Fare_International_Calculation);
  }

  async getTstDetails() {
    if (this.pnrService.tstObj.length === undefined) {
      this.populateData(this.pnrService.tstObj, 1, 1);
      this.isDoneLoading = true;
    } else {
      const tsts = this.pnrService.tstObj;
      let index = 1;
      for await (const p of tsts) {
        this.populateData(p, index, tsts.length);
        index = index + 1;
      }
    }

    // this.tstModels.forEach((e) => {
    //   this.addFares(e.segmentLineNo, e.highFare, e.lowFare, '', e.chargeFare, e.isExchange);
    // });
    //this.isDoneLoading = true;
  }

  async populateData(tst, index, tstCount: number) {
    const fareInfo = tst.fareDataInformation.fareDataSupInformation;
    const chargeFare = fareInfo[fareInfo.length - 1].fareAmount;
    const segmentsInFare = this.getSegment(tst);
    const segmentNo = segmentsInFare;
    const segmentLineNo = this.getSegmentLineNo(segmentNo);
    const highFare = await this.getHighFare(this.insertSegment(this.highFareSO.ServiceOptionItemValue, segmentLineNo)); // FXA/S

    let lowFare = '';

    if (this.isDomesticFlight) {
      lowFare = await this.getLowFare(this.insertSegment(this.lowFareDom.ServiceOptionItemValue, segmentLineNo)); // FXD/S
    } else {
      lowFare = await this.getLowFare(this.insertSegment(this.lowFareInt.ServiceOptionItemValue, segmentLineNo)); // FXD/S
    }

    const isExchange = this.isSegmentExchange(segmentsInFare); /// get is Exchange

    this.reasonCodes.push([]);

    this.addFares(segmentLineNo, highFare, lowFare, '', chargeFare, isExchange);

    if (index === tstCount) {
      this.isDoneLoading = true;
    }
  }

  insertSegment(command, segmentLineNo): string {
    if (command.indexOf('//') >= 0) {
      return command.replace('//', '/S' + segmentLineNo + '/');
    } else {
      return command + '/S' + segmentLineNo;
    }
  }

  changeReasonCodes(group: FormGroup, indx: number) {
    debugger;
    if (indx >= 0) {
      const lowFare = group.get('lowFareText').value;
      const chargeFare = group.get('chargeFare').value;

      if (parseFloat(lowFare) === parseFloat(chargeFare)) {
        this.reasonCodes[indx] = this.ddbService.getReasonCodeByTypeId([ReasonCodeTypeEnum.Realized], 'en-GB', 1);
      } else if (parseFloat(lowFare) < parseFloat(chargeFare)) {
        this.reasonCodes[indx] = this.ddbService.getReasonCodeByTypeId([ReasonCodeTypeEnum.Missed], 'en-GB', 1);
      }

      group.get('reasonCodeText').setValue(null);
      if (this.thresholdAmount > 0) {
        if (Number(chargeFare) <= Number(lowFare) + Number(this.thresholdAmount)) {
          if (this.reasonCodes.length > 0) {
            //const reasonCode = this.getReasonCodeValue('7', indx);
            //group.get('reasonCodeText').patchValue(reasonCode);
            group.get('reasonCodeText').patchValue('7');
          }
        }
      }

      this.validateFares(group);
    }
  }

  getThresHoldAmount() {
    const amt = this.ddbService.airMissedSavingPolicyThresholds
      .filter((air) => air.routingDescription === (this.isDomesticFlight ? 'Domestic' : 'International'))
      .map((air) => air.amount);
    return amt.length > 0 ? amt[0] : 0;
  }

  isSegmentExchange(tatooNumber): boolean {
    return this.pnrService.exchangeTatooNumbers.filter((e) => tatooNumber.includes(e)).length > 0;
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
          if (s.segmentReference !== undefined) {
            segments = segments + ',' + s.segmentReference.refDetails.refNumber;
          }
        }
      });
    }
    return segments;
  }

  async getHighFare(command: string) {
    let value = '';
    await smartScriptSession.send(command).then((res) => {
      let regex = /TOTALS (.*)/g;
      let match = regex.exec(res.Response);

      // regex.lastIndex = 0;
      if (match !== null) {
        const temp = match[0].split('    ');
        if (temp[3] !== undefined) {
          value = temp[3].trim();
          return value.trim();
        }
      } else {
        const regex2 = /[^][A-Z]{3}(\s+)(?<amount>(\d+(\.\d{2})))[\n\r]/g;
        const match2 = regex2.exec(res.Response);
        if (match2 !== null) {
          if (match2.groups !== undefined && match2.groups.amount !== undefined) {
            value = match2.groups.amount;
            return value.trim();
          }
        }
      }
    });
    return value;
  }

  // fxd
  async getLowFare(command: string) {
    let value = '';
    await smartScriptSession.send(command).then((res) => {
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

  checkChange(group) {
    if (group.get('chkIncluded').value === true) {
      this.addValidation(group, 'highFareText');
      this.addValidation(group, 'lowFareText');
      this.addValidation(group, 'reasonCodeText');
      this.utilHelper.validateAllFields(group);
    } else {
      this.removeValidation(group, 'highFareText');
      this.removeValidation(group, 'lowFareText');
      this.removeValidation(group, 'reasonCodeText');
    }
  }

  removeValidation(group: any, controlName: string) {
    debugger;
    const control = group.get(controlName);
    control.setValidators(null);
    control.updateValueAndValidity();
  }

  addValidation(group: any, controlName: string) {
    debugger;
    const control = group.get(controlName);
    control.setValidators([Validators.required]);
    control.updateValueAndValidity();
  }

  validateFares(group) {
    debugger;
    const highFare = group.get('highFareText');
    const lowFare = group.get('lowFareText');
    const chargeFare = group.get('chargeFare');

    if (Number(lowFare.value) > Number(highFare.value)) {
      lowFare.setErrors({ incorrect: true });
    }

    if (Number(highFare.value) > Number(chargeFare.value)) {
      highFare.setErrors({ incorrect: true });
    }
  }
}
