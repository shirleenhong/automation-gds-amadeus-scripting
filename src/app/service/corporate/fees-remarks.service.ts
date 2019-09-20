import { Injectable } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { RemarksManagerService } from './remarks-manager.service';

@Injectable({
  providedIn: 'root'
})
export class FeesRemarkService {
  constructor(private remarksManager: RemarksManagerService) {}

  writeFeeRemarks(feeGroup: FormGroup) {
    const fees = feeGroup.get('segments') as FormArray;
    this.writeFees(fees);
  }

  private writeFees(items: FormArray) {
    let counter = 1;
    for (const group of items.controls) {
      const feeMap = new Map<string, string>();
      const fees = [];
      if (group.get('code').value !== '') {
        fees.push(group.get('code').value + group.get('fee').value.toString());
      }

      if (group.get('supplementalFee').value !== '') {
        fees.push(group.get('supplementalFee').value);
      }

      let feeValue = fees.join('/');

      if (feeValue === '') {
        feeValue = group.get('noFeeCode').value;
      }

      if (feeValue !== '') {
        feeMap.set('SupFeeInfo', feeValue);
        feeMap.set('SupFeeTicketId', counter.toString());
        this.remarksManager.createPlaceholderValues(feeMap, null, null);
      } else {
        this.remarksManager.createEmptyPlaceHolderValue(['SupFeeInfo', 'SupFeeTicketId'], null, 'SUPFEE');
      }

      counter++;
    }
  }
}
