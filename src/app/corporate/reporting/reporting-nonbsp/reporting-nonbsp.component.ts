import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { MatrixAccountingModel } from 'src/app/models/pnr/matrix-accounting.model';
import { SelectItem } from 'src/app/models/select-item.model';
import { DecimalPipe } from '@angular/common';
import { ValueChangeListener } from 'src/app/service/value-change-listener.service';
import { DDBService } from '../../../service/ddb.service';
import { ServicingOptionEnums } from '../../../enums/servicing-options.enum';
import { UtilHelper } from 'src/app/helper/util.helper';
import { AmountPipe } from '../../../pipes/amount.pipe';

declare var smartScriptSession: any;

@Component({
  selector: 'app-reporting-nonbsp',
  templateUrl: './reporting-nonbsp.component.html',
  styleUrls: ['./reporting-nonbsp.component.scss']
})
export class ReportingNonbspComponent implements OnInit {
  nonBspGroup: FormGroup;
  nonBspInformation: MatrixAccountingModel[];
  nonBspReasonList: Array<SelectItem>;
  decPipe = new DecimalPipe('en-US');
  highFareSO: any;
  lowFareDom: any;
  lowFareInt: any;
  isDomesticFlight = true;
  fareList: string[] = [];
  processed = false;
  amountPipe = new AmountPipe();

  constructor(
    private fb: FormBuilder,
    private valueChagneListener: ValueChangeListener,
    private ddbService: DDBService,
    private utilHelper: UtilHelper
  ) { }

  ngOnInit() {
    this.nonBspGroup = this.fb.group({
      nonbsp: this.fb.array([])
    });
    this.getServicingOptionValuesFares();
    this.valueChagneListener.accountingRemarkChange.subscribe((accRemarks) => {
      this.nonBspInformation = accRemarks.filter((x) => x.accountingTypeRemark === 'NONBSP');
      if (!this.processed) {
        this.drawControlsForNonBsp();
      }
    });
    // this.isDomesticFlight = this.ddbService.isPnrDomestic();
  }

  async drawControlsForNonBsp() {
    this.nonBspReasonList = [
      { itemText: '', itemValue: '' },
      { itemText: 'L- Lower Fare', itemValue: 'L' }
    ];

    const items = this.nonBspGroup.get('nonbsp') as FormArray;
    while (items.length !== 0) {
      items.removeAt(0);
    }
    const lowFareValMap = [];
    this.nonBspInformation.forEach(async (element) => {
      let lowFare: any;
      let isAdded = false;
      const highFare = await this.getHighFare(this.insertSegment(this.highFareSO.ServiceOptionItemValue, element.segmentNo));
      lowFare = '';
      items.controls.forEach((x) => {
        if (x.value.segment === element.segmentNo) {
          isAdded = true;
        }
      });
      if (!isAdded) {
        items.push(
          this.createFormGroup(element.segmentNo, highFare, lowFare, 'L', element.baseAmount, element.getTotalAmount().toString())
        );
        this.utilHelper.validateAllFields(this.nonBspGroup);
        this.nonBspGroup.updateValueAndValidity();
        this.fareList.push(element.segmentNo);
      }
      lowFareValMap['hst' + element.tkMacLine] = parseFloat(element.hst);
      lowFareValMap['baseAmount' + element.tkMacLine] = parseFloat(element.baseAmount);
      lowFareValMap['gst' + element.tkMacLine] = parseFloat(element.gst);
      lowFareValMap['qst' + element.tkMacLine] = parseFloat(element.qst);
      lowFareValMap['commisionWithoutTax' + element.tkMacLine] = parseFloat(element.commisionWithoutTax);
      lowFareValMap['otherTax' + element.tkMacLine] = parseFloat(element.otherTax);

      if (this.nonBspInformation.length === element.tkMacLine) {
        const lowFareVal = Object.values(lowFareValMap).reduce((a, b) => a + b, 0);
        lowFare = await this.decPipe.transform(lowFareVal, '1.2-2').replace(',', '');
        const formGroup = (await this.nonBspGroup.get('nonbsp')) as FormArray;
        formGroup.controls.forEach((el) => {
          return el.get('lowFareText').setValue(lowFare);
        });
      }
    });
  }

  createFormGroup(segmentNo: string, highFare: any, lowFare: any, reasonCode: string, baseAmount: string, chargeFare: string): FormGroup {
    const group = this.fb.group({
      segment: new FormControl(segmentNo),
      highFareText: new FormControl(highFare, [Validators.required]),
      lowFareText: new FormControl(lowFare, [Validators.required]),
      reasonCodeText: new FormControl(reasonCode, [Validators.required]),
      currency: new FormControl('CAD'),
      baseFare: new FormControl(baseAmount),
      chargeFare: new FormControl(chargeFare),
      chkIncluded: new FormControl('')
    });

    return group;
  }

  getServicingOptionValuesFares() {
    this.highFareSO = this.ddbService.getServicingOptionValue(ServicingOptionEnums.High_Fare_Calculation);
    this.lowFareDom = this.ddbService.getServicingOptionValue(ServicingOptionEnums.Low_Fare_Domestic_Calculation);
    this.lowFareInt = this.ddbService.getServicingOptionValue(ServicingOptionEnums.Low_Fare_International_Calculation);
  }

  async getHighFare(command: string) {
    let value = '';
    await smartScriptSession.send(command).then((res) => {
      const regex = /TOTALS (.*)/g;
      const match = regex.exec(res.Response);
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

  insertSegment(command, segmentLineNo): string {
    if (command.indexOf('//') >= 0) {
      return command.replace('//', '/S' + segmentLineNo + '/');
    } else {
      return command + '/S' + segmentLineNo;
    }
  }

  changeFare(group: FormGroup, indx: number) {
    if (indx >= 0) {
      const lowFare = group.get('lowFareText');
      const highFare = group.get('highFareText');

      if (lowFare !== undefined) {
        lowFare.setValue(this.decPipe.transform(parseFloat(lowFare.value), '1.2-2').replace(',', ''));
      }
      if (highFare !== undefined) {
        highFare.setValue(this.decPipe.transform(parseFloat(highFare.value), '1.2-2').replace(',', ''));
      }

      if (Number(lowFare.value) > Number(highFare.value)) {
        lowFare.setErrors({ incorrect: true });
        this.utilHelper.validateAllFields(this.nonBspGroup);
        this.nonBspGroup.updateValueAndValidity();
      } else {
        lowFare.setErrors(null);
        lowFare.updateValueAndValidity();
      }
    }
  }
}
