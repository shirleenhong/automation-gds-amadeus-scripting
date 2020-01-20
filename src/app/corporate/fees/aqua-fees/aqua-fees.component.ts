import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { PnrService } from 'src/app/service/pnr.service';
import { ObtComponent } from '../../reporting/obt/obt.component';
import { SupplementalFeesComponent } from '../supplemental-fees/supplemental-fees.component';

@Component({
  selector: 'app-aqua-fees',
  templateUrl: './aqua-fees.component.html',
  styleUrls: ['./aqua-fees.component.scss']
})
export class AquaFeesComponent implements OnInit {
  aquaFeeForm: FormGroup;
  segmentList: Array<any>;
  hasPFS = false;
  isShowSupFee = false;
  isObt = false;
  selectedFeeType = '';
  @ViewChild(ObtComponent) obtComponent: ObtComponent;
  @ViewChild(SupplementalFeesComponent) suppFeeComponent: SupplementalFeesComponent;

  constructor(private pnrService: PnrService) {}

  ngOnInit() {
    this.segmentList = new Array<any>();
    this.hasPFS = this.pnrService.getRemarkLineNumber('MAC/-SUP-PFS') !== '';
    this.aquaFeeForm = new FormGroup({
      feeType: new FormControl('', [Validators.required]),
      segments: new FormControl(''),
      enableSupFee: new FormControl('')
    });
    this.isObt = this.pnrService.getRemarkText('EB/-') !== '';
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
    this.selectedFeeType = val;
    if (this.isShowSupFee) {
      this.suppFeeComponent.updateFeeType(val);
    }
  }
}
