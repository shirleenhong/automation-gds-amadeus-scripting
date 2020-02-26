import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { PnrService } from '../../../service/pnr.service';
import { DDBService } from '../../../service/ddb.service';
import { ServicingOptionEnums } from '../../../enums/servicing-options.enum';
import { ReasonCodeTypeEnum } from '../../../enums/reason-code.enum';
import { ReasonCode } from '../../../models/ddb/reason-code.model';
import { UtilHelper } from 'src/app/helper/util.helper';
import { ValueChangeListener } from 'src/app/service/value-change-listener.service';
import { SelectItem } from 'src/app/models/select-item.model';

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
  highFareSO: any[];
  lowFareDom: any;
  lowFareInt: any;
  isDomesticFlight = true;
  isTransborder = false;
  thresholdAmount = 0;
  hasTst = true;
  realisedSavingList = [];
  missedSavingList = [];
  lillyLowFareDirect = new Map<number, string>();
  lillyLowFareConnecting = new Map<number, string>();
  commonLowFare = new Map<number, string>();
  lowFareOptionList: Array<SelectItem>;
  isLilly = false;
  // tslint:disable-next-line:max-line-length
  constructor(
    private fb: FormBuilder,
    private pnrService: PnrService,
    private ddbService: DDBService,
    private utilHelper: UtilHelper,
    private valueChagneListener: ValueChangeListener
  ) {}

  async ngOnInit() {
    await this.ddbService.getReasonCodeByTypeId([ReasonCodeTypeEnum.Realized], 1).then((response) => {
      this.realisedSavingList = response;
    });
    await this.ddbService.getReasonCodeByTypeId([ReasonCodeTypeEnum.Missed], 1).then((response) => {
      this.missedSavingList = response;
    });

    this.isDoneLoading = false;
    this.bspGroup = this.fb.group({
      fares: this.fb.array([this.createFormGroup('', '', '', '', '', '', '')])
    });

    this.isDomesticFlight = this.ddbService.isPnrDomestic();
    this.isTransborder = this.ddbService.isPnrTransBorder();
    this.thresholdAmount = this.getThresHoldAmount();
    this.removeFares(0); // this is a workaround to remove the first item
    this.getServicingOptionValuesFares();
    this.getTstDetails();
    this.GetLillyLowFareOptions();
    this.isLilly = this.pnrService.isLilly();
  }

  removeFares(i) {
    const items = this.bspGroup.get('fares') as FormArray;
    items.removeAt(i);
    this.total = items.length;
  }

  addFares(
    segmentNo: string,
    highFare: string,
    lowFare: string,
    reasonCode: string,
    chargeFare: string,
    isExchange: boolean,
    currency: string,
    baseFare: string,
    tstNumber?: string
  ) {
    const items = this.bspGroup.get('fares') as FormArray;
    if (isExchange || Number(highFare) < Number(chargeFare)) {
      highFare = chargeFare;
    }

    items.push(this.createFormGroup(segmentNo, highFare, lowFare, reasonCode, chargeFare, currency, baseFare, isExchange, tstNumber));
    this.total = items.length;
  }

  getReasonCodeValue(code, index): string {
    const reasonText = this.reasonCodes[index].filter((x) => x.reasonCode === code).map((x) => x.reasonCode + ' : ' + x.getDescription());

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
    currency: string,
    baseFare: string,
    isExchange?: boolean,
    tstNumber?: string
    // defaultValue?: any
  ): FormGroup {
    const group = this.fb.group({
      segment: new FormControl(segmentNo),
      highFareText: new FormControl(highFare),
      lowFareText: new FormControl(lowFare),
      reasonCodeText: new FormControl(reasonCode),
      chargeFare: new FormControl(chargeFare),
      currency: new FormControl(currency),
      baseFare: new FormControl(baseFare),
      chkIncluded: new FormControl(''),
      isExchange: new FormControl(isExchange),
      lowFareOption: new FormControl(''),
      tstNumber: new FormControl(tstNumber)
    });

    group.get('reasonCodeText').valueChanges.subscribe((val) => {
      if (!val) {
        return;
      }
      const arr = this.bspGroup.get('fares') as FormArray;
      const reasons = [];
      for (const control of arr.controls) {
        if (control.get('reasonCodeText').value) {
          reasons.push(control.get('reasonCodeText').value);
        }
      }
      if (reasons.length > 0) {
        this.valueChagneListener.reasonCodeChange(reasons);
      }
    });

    const currentIndex = this.reasonCodes.length - 1;
    if (this.thresholdAmount > 0) {
      if (Number(chargeFare) <= Number(lowFare) + Number(this.thresholdAmount)) {
        if (this.reasonCodes.length > 0) {
          // reasonCode = this.getReasonCodeValue('7', currentIndex);
          group.get('reasonCodeText').setValue('7');
        }
      }
    }

    if (isExchange) {
      if (this.reasonCodes.length > 0) {
        this.reasonCodes[currentIndex] = this.missedSavingList;
        group.get('reasonCodeText').setValue('E');
      }

      group.get('highFareText').setValue(highFare);
      group.get('lowFareText').setValue(chargeFare);
      group.get('reasonCodeText').disable();
      group.get('highFareText').disable();
      group.get('lowFareText').disable();
    } else {
      this.changeReasonCodes(group, currentIndex);
      if (this.reasonCodes.length > 0 && this.reasonCodes[currentIndex].length === 1) {
        reasonCode = this.reasonCodes[currentIndex][0].reasonCode + ' : ' + this.reasonCodes[currentIndex][0].getDescription();
        group.get('reasonCodeText').setValue(reasonCode);
      }
    }

    // if (defaultValue !== undefined && defaultValue !== null) {
    //   group.setValue(defaultValue);
    // }

    return group;
  }

  getServicingOptionValuesFares() {
    // this.highFareSO = this.ddbService.getServicingOptionValue(ServicingOptionEnums.High_Fare_Calculation);
    this.highFareSO = this.ddbService.getServicingOptionValueList(ServicingOptionEnums.High_Fare_Calculation);
    this.lowFareDom = this.ddbService.getServicingOptionValue(ServicingOptionEnums.Low_Fare_Domestic_Calculation);
    this.lowFareInt = this.ddbService.getServicingOptionValue(ServicingOptionEnums.Low_Fare_International_Calculation);
  }

  async getTstDetails() {
    if (this.pnrService.tstObj.length === 0) {
      this.hasTst = false;
      this.isDoneLoading = true;
    } else {
      this.hasTst = true;
      if (this.pnrService.tstObj.length === undefined) {
        this.populateData(this.pnrService.tstObj, 1, 1);
      } else {
        const tsts = this.pnrService.tstObj;
        let index = 1;
        for await (const p of tsts) {
          this.populateData(p, index, tsts.length);
          index = index + 1;
        }
      }
    }
  }

  async populateData(tst, index, tstCount: number) {
    const fareInfo = tst.fareDataInformation.fareDataSupInformation;
    const chargeFare = fareInfo[fareInfo.length - 1].fareAmount;
    const baseFareInfo = fareInfo.filter((x) => x.fareDataQualifier === 'B');

    let currency;
    let baseFare;
    if (baseFareInfo.length > 0) {
      baseFare = baseFareInfo[0].fareAmount;
      currency = baseFareInfo[0].fareCurrency;
    }

    const segmentsInFare = this.getSegment(tst);
    const segmentNo = segmentsInFare;
    const segmentLineNo = this.pnrService.getSegmentLineNo(segmentNo);
    let highFare: string;
    const isExchange = this.isSegmentExchange(segmentsInFare);

    if (!isExchange) {
      for (const item of this.highFareSO) {
        if (highFare === undefined || highFare === '') {
          highFare = await this.getHighFare(this.insertSegment(item.ServiceOptionItemValue, segmentLineNo));
        }
      }
    }
    if (!highFare) {
      highFare = chargeFare;
    }

    let lowFare = '';

    if (this.isDomesticFlight) {
      lowFare = await this.getLowFare(this.insertSegment(this.lowFareDom.ServiceOptionItemValue, segmentLineNo)); // FXD/S
    } else {
      lowFare = await this.getLowFare(this.insertSegment(this.lowFareInt.ServiceOptionItemValue, segmentLineNo)); // FXD/S
    }

    if (!this.commonLowFare.has(index)) {
      this.commonLowFare.set(index, lowFare);
    }

    /// get is Exchange

    this.reasonCodes.push([]);

    this.addFares(segmentLineNo, highFare, lowFare, '', chargeFare, isExchange, currency, baseFare, tst.fareReference.uniqueReference);

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
    if (indx >= 0) {
      const lowFare = group.get('lowFareText').value;
      const chargeFare = group.get('chargeFare').value;

      if (parseFloat(lowFare) === parseFloat(chargeFare)) {
        this.reasonCodes[indx] = this.realisedSavingList;
      } else if (parseFloat(lowFare) < parseFloat(chargeFare)) {
        this.reasonCodes[indx] = this.missedSavingList;
      }

      group.get('reasonCodeText').setValue(null);
      if (this.thresholdAmount > 0) {
        if (Number(chargeFare) <= Number(lowFare) + Number(this.thresholdAmount)) {
          if (this.reasonCodes.length > 0) {
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
      const regex = /TOTALS (.*)/g;
      const match = regex.exec(res.Response);
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
      let regex = /RECOMMENDATIONS RETURNED FROM [A-Z]{3} (?<from>(.*)) TO (?<to>(.*))/g;
      let match = regex.exec(res.Response);
      regex.lastIndex = 0;
      if (!match) {
        regex = /RECOMMENDATIONS IN GROUP 1\([A-Z]{3} (?<from>(.*))\)/g;
        match = regex.exec(res.Response);
        regex.lastIndex = 0;
      }
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
    const control = group.get(controlName);
    control.setValidators(null);
    control.updateValueAndValidity();
  }

  addValidation(group: any, controlName: string) {
    const control = group.get(controlName);
    control.setValidators([Validators.required]);
    control.updateValueAndValidity();
  }

  validateFares(group) {
    const highFare = group.get('highFareText');
    const lowFare = group.get('lowFareText');
    const chargeFare = group.get('chargeFare');

    if (Number(lowFare.value) > Number(highFare.value) || Number(lowFare.value) > Number(chargeFare.value)) {
      lowFare.setErrors({ incorrect: true });
    } else {
      lowFare.setErrors(null);
      lowFare.updateValueAndValidity();
    }

    if (Number(highFare.value) < Number(chargeFare.value)) {
      highFare.setErrors({ incorrect: true });
    } else {
      highFare.setErrors(null);
      highFare.updateValueAndValidity();
    }
  }

  GetLillyLowFareOptions() {
    this.lowFareOptionList = [
      { itemText: '', itemValue: '' },
      { itemText: 'CLIENT IS BKD ON DIRECT FLIGHTS-DO NOT OFFER CONNECTIONS IN LP', itemValue: 'DIRECTFLIGHT' },
      { itemText: 'CLIENT IF BKD ON CONNECTING FLIGHTS-OFFER CONNECTIONS IN LP', itemValue: 'CONNECTINGFLIGHT' }
    ];
  }

  async getLowFareLilly(tst: any, i: number, command: any, option: string) {
    let lfare = '0.00';
    const segmentsInFare = this.getSegment(tst);
    const segmentLineNo = this.pnrService.getSegmentLineNo(segmentsInFare);

    switch (option) {
      case 'DIRECTFLIGHT':
        if (this.lillyLowFareDirect.has(i)) {
          lfare = this.lillyLowFareDirect.get(i);
        } else {
          lfare = await this.getLowFare(this.insertSegment(command.ServiceOptionItemValue, segmentLineNo)); // FXD/S
          this.lillyLowFareDirect.set(i, lfare);
        }
        break;
      case 'CONNECTINGFLIGHT':
        if (this.lillyLowFareConnecting.has(i)) {
          lfare = this.lillyLowFareConnecting.get(i);
        } else {
          lfare = await this.getLowFare(this.insertSegment(command.ServiceOptionItemValue, segmentLineNo)); // FXD/S
          this.lillyLowFareConnecting.set(i, lfare);
        }
        break;
      default:
        lfare = this.commonLowFare.get(i + 1);
    }
    return lfare;
  }

  async checkLowFareOption(option: any, group: FormGroup, index: number) {
    let lfare = '';
    this.isDoneLoading = false;
    const tstLen = this.pnrService.getTstLength();
    const command = this.getLilyCommand(option);
    if (tstLen > 1) {
      lfare = await this.getLowFareLilly(this.pnrService.tstObj[index], index, command, option);
    } else {
      lfare = await this.getLowFareLilly(this.pnrService.tstObj, 0, command, option);
    }
    group.get('lowFareText').patchValue(lfare);
    this.isDoneLoading = true;
  }

  getLilyCommand(flightConfirmed) {
    switch (flightConfirmed) {
      case 'DIRECTFLIGHT':
        if (this.isDomesticFlight || this.isTransborder) {
          return this.ddbService.getServicingOptionValue(ServicingOptionEnums.Low_Fare_Domestic_DirectFlight_Calculation);
        } else {
          return this.ddbService.getServicingOptionValue(ServicingOptionEnums.Low_Fare_Internationl_DirectFlight_Calculation);
        }
        break;
      case 'CONNECTINGFLIGHT':
        if (this.isDomesticFlight || this.isTransborder) {
          return this.ddbService.getServicingOptionValue(ServicingOptionEnums.Low_Fare_Domestic_ConnectingFlight_Calculation);
        } else {
          return this.ddbService.getServicingOptionValue(ServicingOptionEnums.Low_Fare_International_ConnectingFlight_Calculation);
        }
        break;
    }
  }
}
