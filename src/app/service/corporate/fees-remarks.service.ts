import { Injectable } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { RemarksManagerService } from './remarks-manager.service';
import { PnrService } from '../pnr.service';

@Injectable({
  providedIn: 'root'
})
export class FeesRemarkService {
  constructor(private remarksManager: RemarksManagerService, private pnrService: PnrService) {}

  writeFeeRemarks(feeGroup: FormGroup) {
    const fees = feeGroup.get('segments') as FormArray;
    this.writeFees(fees);
  }

  private writeFees(items: FormArray) {
    let counter = 1;
    for (const group of items.controls) {
      const feeMap = new Map<string, string>();
      const segments = this.pnrService.getTatooNumberFromSegmentNumber(group.get('segment').value.split(','));
      const fees = [];
      if (group.get('code').value !== '') {
        fees.push(group.get('code').value + group.get('fee').value);
      } else {
        fees.push(group.get('supplementalFee').value);
      }
      feeMap.set('SupFeeTicketId', counter.toString());
      let feeValue = fees.join('/');

      if (feeValue === '') {
        feeValue = group.get('noFeeCode').value;
      }
      feeMap.set('SupFeeInfo', feeValue);

      this.remarksManager.createPlaceholderValues(feeMap, null, segments);

      counter++;
    }
  }
}
