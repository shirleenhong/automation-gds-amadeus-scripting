import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { MatrixAccountingModel } from 'src/app/models/pnr/matrix-accounting.model';
import { SelectItem } from 'src/app/models/select-item.model';
import { DecimalPipe } from '@angular/common';
import { ValueChangeListener } from 'src/app/service/value-change-listener.service';
import { DDBService } from '../../../service/ddb.service';
import { ServicingOptionEnums } from '../../../enums/servicing-options.enum';
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

  constructor(private fb: FormBuilder, private valueChagneListener: ValueChangeListener, private ddbService: DDBService) {}

  ngOnInit() {
    this.nonBspGroup = this.fb.group({
      nonbsp: this.fb.array([])
    });
    this.getServicingOptionValuesFares();
    this.valueChagneListener.accountingRemarkChange.subscribe((accRemarks) => {
      this.nonBspInformation = accRemarks.filter((x) => x.accountingTypeRemark === 'NONBSP');
      this.drawControlsForNonBsp();
    });
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
    this.nonBspInformation.forEach(async (element) => {
      const highFare = await this.getHighFare(this.insertSegment(this.highFareSO.ServiceOptionItemValue, element.segmentNo)); // FXA/S
      let isAdded = false;
      items.controls.forEach((x) => {
        if (x.value.segment === element.segmentNo) {
          isAdded = true;
        }
      });
      if (!isAdded) {
        items.push(this.createFormGroup(element.segmentNo, highFare, '', 'L'));
      }
      isAdded = false;
      this.valueChagneListener.reasonCodeChange(['L']);
    });
  }

  createFormGroup(segmentNo: string, highFare: any, lowFare: string, reasonCode: string): FormGroup {
    const group = this.fb.group({
      segment: new FormControl(segmentNo),
      highFareText: new FormControl(highFare, [Validators.required]),
      lowFareText: new FormControl(lowFare, [Validators.required]),
      reasonCodeText: new FormControl(reasonCode, [Validators.required]),
      chkIncluded: new FormControl('')
    });

    return group;
  }

  getServicingOptionValuesFares() {
    this.highFareSO = this.ddbService.getServicingOptionValue(ServicingOptionEnums.High_Fare_Calculation);
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

  insertSegment(command, segmentLineNo): string {
    if (command.indexOf('//') >= 0) {
      return command.replace('//', '/S' + segmentLineNo + '/');
    } else {
      return command + '/S' + segmentLineNo;
    }
  }
}
