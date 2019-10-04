import { Component, OnInit } from '@angular/core';
import { DDBService } from 'src/app/service/ddb.service';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { IrdModel } from 'src/app/models/pnr/ird-remark.model';
import { SelectItem } from 'src/app/models/select-item.model';
import { DecimalPipe } from '@angular/common';
import { CorpRemarksService } from 'src/app/service/corporate/corp-remarks.service';

@Component({
  selector: 'app-ird-remarks',
  templateUrl: './ird-remarks.component.html',
  styleUrls: ['./ird-remarks.component.scss']
})
export class IrdRemarksComponent implements OnInit {
  irdRemarksDetailsArr = [];
  uiRemarkObject: any;
  irdGroup: FormGroup;
  irdRemarksDetails = new Array<IrdModel>();
  listIrdStatus: Array<SelectItem>;
  listLowStatus: Array<SelectItem>;
  listnolfoStatus: Array<SelectItem>;
  decPipe = new DecimalPipe('en-US');
  isNoLfo = false;

  constructor(private fb: FormBuilder,
    private ddbService: DDBService,
    private corpRemarkService: CorpRemarksService) {
  }

  async ngOnInit() {
    this.irdGroup = this.fb.group({
      irdItems: this.fb.array([])
    });
    this.populateStatusList();
    this.irdRemarksProcess();
    this.populateForm();
  }

  private populateForm(): void {
    const items = this.irdGroup.get('irdItems') as FormArray;
    this.irdRemarksDetails.forEach(element => {
      const status = this.populateStatus(element);
      const hasStatus = (element.status !== '');
      const group = this.fb.group({
        irdNumber: new FormControl(element.irdNumber),
        irdStatus: new FormControl(status, [Validators.required]),
        currency: new FormControl(element.currency),
        irdSavings: new FormControl(element.irdSavings),
        lowSavings: new FormControl(element.lowSavings),
        lowSavingStatus: new FormControl(status, [Validators.required]),
        noLfoStatus: new FormControl(status)
      });
      items.push(group);

      this.enableControl(status, group, hasStatus);
    });
  }

  private populateStatusList(): void {
    this.listIrdStatus = [
      { itemText: 'ACCEPTEDCP', itemValue: 'ACCEPTEDCP' },
      { itemText: 'DECLINED', itemValue: 'DECLINEDCP' }];

    this.listLowStatus = [
      { itemText: 'ACCEPTEDLFO', itemValue: 'ACCEPTEDLFO' },
      { itemText: 'DECLINED', itemValue: 'DECLINEDLFO' }];

    this.listnolfoStatus = [
      { itemText: 'NO LFO', itemValue: 'NO LFO' }];
  }

  private enableControl(status: string, group: FormGroup, hasStatus: boolean) {
    if (hasStatus) {
      group.get('irdStatus').disable();
      group.get('lowSavingStatus').disable();
    } else {
      switch (status) {
        case 'NO LFO':
        case 'ACCEPTEDCP':
          group.get('irdStatus').disable();
          group.get('lowSavingStatus').disable();
          break;
        case 'DECLINEDLFO':
          group.get('irdStatus').disable();
          group.get('lowSavingStatus').enable();
          group.get('lowSavingStatus').setValue('');
          break;
        default:
          group.get('irdStatus').enable();
          group.get('lowSavingStatus').disable();
      }
    }
  }

  private populateStatus(element): string {
    if (element.status) {
      if (element.status === 'DECLINED') {
        return 'DECLINEDLFO';
      }
      return element.status;
    }

    if (Number(element.irdSavings) <= 0 && Number(element.lowSavings) <= 0) {
      this.isNoLfo = true;
      return 'NO LFO';
    }
    if (Number(element.irdSavings) > 0 && Number(element.lowSavings) <= 0) {
      return 'ACCEPTEDCP';
    }
    if (Number(element.irdSavings) <= 0 && Number(element.lowSavings) > 0) {
      return 'DECLINEDLFO';
    }
    return '';
  }


  private irdRemarksProcess(): void {
    const route = this.ddbService.isPnrTransBorder() ? 'TRA' : this.ddbService.isPnrDomestic() ? 'DOM' : 'INT';
    if (route === 'INT') {
      this.irdRemarksDetails = this.corpRemarkService.getIrdInformation();
    }
  }

  irdChangeValue(item, i): void {
    const items = this.irdGroup.get('irdItems') as FormArray;
    if (item === 'DECLINEDCP') {
      items.controls[i].get('lowSavingStatus').enable();
    } else {
      items.controls[i].get('lowSavingStatus').disable();
      items.controls[i].get('lowSavingStatus').setValue('');
    }
  }

}
