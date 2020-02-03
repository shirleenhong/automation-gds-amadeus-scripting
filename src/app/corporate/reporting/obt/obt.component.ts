import { Component, OnInit } from '@angular/core';
import { PnrService } from 'src/app/service/pnr.service';
import { CounselorDetail } from 'src/app/globals/counselor-identity';
import { ReasonCode } from 'src/app/models/ddb/reason-code.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DDBService } from 'src/app/service/ddb.service';
import { ReasonCodeTypeEnum } from 'src/app/enums/reason-code.enum';

@Component({
  selector: 'app-obt',
  templateUrl: './obt.component.html',
  styleUrls: ['./obt.component.scss']
})
export class ObtComponent implements OnInit {
  ebCList: Array<ReasonCode> = [];
  showEBDetails: boolean;
  isCorporate = false;
  obtForm: FormGroup;
  ebRList: { itemValue: string; itemText: string }[];

  constructor(private pnrService: PnrService, private counselorDetail: CounselorDetail, private ddbService: DDBService) {}

  ngOnInit() {
    this.checkEbRemark();
    this.obtForm = new FormGroup({
      ebR: new FormControl('', [Validators.required]),
      ebT: new FormControl('', [Validators.required]),
      ebN: new FormControl('GI', [Validators.required]),
      ebC: new FormControl('', [Validators.required])
    });
    this.obtForm.get('ebR').disable();
    this.obtForm.get('ebT').disable();
    this.obtForm.get('ebN').disable();
    this.obtForm.get('ebC').disable();
  }
  checkEbRemark() {
    this.showEBDetails = false;
    let ebData = this.pnrService.getRemarkText('EB/');
    if (ebData) {
      ebData = ebData.split('/-');
      if (ebData.length >= 2) {
        this.populateEBFields(ebData);
      }
    }
  }
  async populateEBFields(eb) {
    if (!this.counselorDetail.getIsCorporate()) {
      this.showEBDetails = false;
      return;
    }
    const ebR = eb[1].substr(0, 2);
    const ebT = eb[1].substr(2, 1);
    let ebN = 'GI';
    let ebC = '';
    if (eb.length > 2) {
      ebN = eb[2].substr(0, 2);
      ebC = eb[2].substr(2, 1);
    }
    this.showEBDetails = ebR && ebT ? true : false;
    if (this.showEBDetails) {
      await this.loadStaticValue();
      const ebrValues = this.ebRList.map((seat) => seat.itemValue);

      if (ebrValues.indexOf(ebR) > -1) {
        this.obtForm.controls.ebR.setValue(ebR);
      }

      for (const c of this.ebCList) {
        if (c.reasonCode === ebC) {
          this.obtForm.controls.ebC.setValue(ebC);
        }
      }
      this.obtForm.controls.ebT.setValue(ebT);
      this.obtForm.controls.ebN.setValue(ebN);
      this.obtForm.get('ebR').enable();
      this.obtForm.get('ebT').enable();
      this.obtForm.get('ebN').enable();
      this.obtForm.get('ebC').enable();
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
