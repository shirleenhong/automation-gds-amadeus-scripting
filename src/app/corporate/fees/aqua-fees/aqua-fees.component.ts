import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PnrService } from 'src/app/service/pnr.service';

@Component({
  selector: 'app-aqua-fees',
  templateUrl: './aqua-fees.component.html',
  styleUrls: ['./aqua-fees.component.scss']
})
export class AquaFeesComponent implements OnInit {
  aquaFeeForm: FormGroup;
  segmentList: Array<any>;
  hasPFS = false;
  constructor(private pnrService: PnrService) {}

  ngOnInit() {
    this.segmentList = new Array<any>();
    this.hasPFS = this.pnrService.getRemarkLineNumber('MAC/-SUP-PFS') !== '';
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
}
