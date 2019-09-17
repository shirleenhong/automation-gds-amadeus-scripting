import { Injectable } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { RemarksManagerService } from './remarks-manager.service';
import { PnrService } from '../pnr.service';

@Injectable({
  providedIn: 'root'
})
export class FeesRemarkService {
  constructor(private remarksManager: RemarksManagerService, private pnrService: PnrService) {}

  /**
   * US9402 - ONGOING
   * Write Migration OBT Fee
   */
  public writeMigrationOBTFee(): void {
    // Check if CFA Exists in PNR

    // Check if fee date is within configurated dates.

    // Write static remarks by segment type?
    const staticMigrationOBTFee = new Map<string, string>();
    staticMigrationOBTFee.set('MigrationOBTAir', 'true');
    staticMigrationOBTFee.set('MigrationOBTRail', 'true');
    staticMigrationOBTFee.set('MigrationOBTHotel', 'true');
    staticMigrationOBTFee.set('MigrationOBTCar', 'true');

    this.remarksManager.createPlaceholderValues(null, staticMigrationOBTFee, null, null, 'ATE');
    this.remarksManager.createPlaceholderValues(null, staticMigrationOBTFee, null, null, 'RTE');
    this.remarksManager.createPlaceholderValues(null, staticMigrationOBTFee, null, null, 'HBE');
    this.remarksManager.createPlaceholderValues(null, staticMigrationOBTFee, null, null, 'CBE');

    // ...
  }
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
