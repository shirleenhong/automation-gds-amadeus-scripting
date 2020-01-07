import { Injectable } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { RemarkGroup } from '../models/pnr/remark.group.model';
import { RemarkModel } from '../models/pnr/remark.model';
import { PnrService } from './pnr.service';
import { RemarkHelper } from '../helper/remark-helper';

@Injectable({
  providedIn: 'root'
})
export class CommonRemarkService {

  constructor(
    private pms: PnrService,
    private remarkHelper: RemarkHelper) { }

  public buildAssociatedRemarks(group: FormGroup) {
    let remText = '';
    let segment = '';
    const rmGroup = new RemarkGroup();
    rmGroup.group = 'Associated Remarks';
    rmGroup.remarks = new Array<RemarkModel>();
    rmGroup.deleteRemarkByIds = new Array<string>();

    const arr = group.get('items') as FormArray;
    const segmentList = this.pms.getSegmentList();

    for (const c of arr.controls) {
      const tattoosegments = [];
      remText = c.get('remarkText').value;
      segment = c.get('segmentNo').value;
      const s = segment.split(',');
      segmentList.forEach((x) => {
        if (s.indexOf(x.lineNo) >= 0) {
          tattoosegments.push(x.tatooNo);
        }
      });
      if (segment && remText) {
        rmGroup.remarks.push(this.remarkHelper.getRemark(remText, 'RI', 'R', tattoosegments.join(',')));
      }
    }
    return rmGroup;
  }
}
