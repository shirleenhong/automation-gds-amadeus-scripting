import { Component, OnInit } from '@angular/core';
import { DDBService } from 'src/app/service/ddb.service';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
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
  decPipe = new DecimalPipe('en-US');
  showLowStatus = false;
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
      const group = this.fb.group({
        irdNumber: new FormControl(element.irdNumber),
        irdStatus: new FormControl(status),
        currency: new FormControl(element.currency),
        irdSavings: new FormControl(element.irdSavings),
        lowSavings: new FormControl(element.lowSavings),
        lowSavingStatus: new FormControl()
      });
      items.push(group);
      this.enableControls(status, group);
    });
  }

  private enableControls(status, group: FormGroup): void {
    switch (status) {
      case 'NO LFO':
      case 'ACCEPTEDCP':
        group.get('irdStatus').disable();
        group.get('lowSavingStatus').disable();
        this.listIrdStatus.push({ itemText: 'NO LFO', itemValue: 'NO LFO' });
        break;
      case 'ACCEPTEDLFO':
        group.get('irdStatus').setValue('');
        group.get('irdStatus').disable();
        group.get('lowSavingStatus').enable();
        break;
      default:
        group.get('irdStatus').enable();
        group.get('lowSavingStatus').enable();
        this.listIrdStatus = this.listIrdStatus.filter(x => x.itemText !== 'NO LFO');
    }
  }

  private populateStatusList(): void {
    this.listIrdStatus = [
      { itemText: 'ACCEPTEDCP', itemValue: 'ACCEPTEDCP' },
      { itemText: 'DECLINED', itemValue: 'DECLINED' }];

    this.listLowStatus = [
      { itemText: 'ACCEPTEDLFO', itemValue: 'ACCEPTEDLFO' },
      { itemText: 'DECLINED', itemValue: 'DECLINED' }];
  }

  private populateStatus(element): string {
    if (element.status) {
      return element.status;
    }
    if (Number(element.irdSavings) <= 0 && Number(element.lowSavings) <= 0) {
      return 'NO LFO';
    }
    if (Number(element.irdSavings) > 0 && Number(element.lowSavings) <= 0) {
      return 'ACCEPTEDCP';
    }
    if (Number(element.irdSavings) <= 0 && Number(element.lowSavings) > 0) {
      return 'ACCEPTEDLO';
    }
    return '';
  }


  private irdRemarksProcess(): void {
    const route = this.ddbService.isPnrTransBorder() ? 'TRA' : this.ddbService.isPnrDomestic() ? 'DOM' : 'INT';
    if (route === 'INT') {
      this.irdRemarksDetails = this.corpRemarkService.getIrdInformation();
    }
  }

  irdChangeValue(item): void {
    if (item === 'DECLINED') {
      this.showLowStatus = true;
    }
  }

}
