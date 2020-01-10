import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { PnrService } from 'src/app/service/pnr.service';
import { ObtComponent } from '../../reporting/obt/obt.component';
import { DDBService } from 'src/app/service/ddb.service';

@Component({
  selector: 'app-aqua-fees',
  templateUrl: './aqua-fees.component.html',
  styleUrls: ['./aqua-fees.component.scss']
})
export class AquaFeesComponent implements OnInit {
  aquaFeeForm: FormGroup;
  segmentList: Array<any>;
  hasPFS = false;
  showAquaFee = false;
  @ViewChild(ObtComponent) obtComponent: ObtComponent;
  constructor(private pnrService: PnrService, private ddbService: DDBService) {}

  ngOnInit() {
    this.segmentList = new Array<any>();
    this.hasPFS = this.pnrService.getRemarkLineNumber('MAC/-SUP-PFS') !== '';
    this.aquaFeeForm = new FormGroup({
      feeType: new FormControl('', [Validators.required]),
      segments: new FormControl('')
    });
    this.checkValidForAquaFee();
  }

  selectFeeType(val) {
    this.segmentList = new Array<any>();
    let types = [];
    switch (val) {
      case 'C':
        types = ['CAR', 'CCR'];
        break;
      case 'H':
        types = ['HTL', 'HHL'];
        break;
      case 'R':
        types = ['RAL', 'MIS'];
        break;
      case 'L':
        types = ['LIM', 'MIS'];
        break;
    }
    if (types.length > 0) {
      this.pnrService
        .getSegmentList()
        .filter((s) => types.indexOf(s.segmentType) >= 0)
        .forEach((x) => {
          const selectAllObj = {
            lineNo: x.lineNo,
            freeText: x.longFreeText,
            isChecked: false
          };

          this.segmentList.push(selectAllObj);
        });
    }
  }
  async checkValidForAquaFee() {
    const response = await this.ddbService.getConfigurationParameter('CA_Script_Aqua_Fee_Excluded_CFA');
    const listCfa = response.ConfigurationParameters[0].ConfigurationParameterValue.split(',');
    this.showAquaFee = listCfa.indexOf(this.pnrService.getCFLine().cfa) === -1;
  }
}
