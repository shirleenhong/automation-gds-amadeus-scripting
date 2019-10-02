import { Injectable } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { RemarksManagerService } from './remarks-manager.service';
import { PnrService } from '../pnr.service';

@Injectable({
  providedIn: 'root'
})
export class FeesRemarkService {
  constructor(
    private remarksManager: RemarksManagerService,
    private pnrService: PnrService
  ) {}

  /**
   * US9402
   * Write Migration OBT Fee remark if the PNR has CF,
   * is within configurated dates and depends on type of segment.
   *
   * @return void
   */
  public writeMigrationOBTFeeRemarks(migrationOBTDates: Array<string>): void {
    // Check if CFA and OBT remarks exists in PNR
    if (this.pnrService.getCFLine() && this.pnrService.isOBT()) {

      const now       = Date.now();
      const startDate = Date.parse(migrationOBTDates[0]);
      const endDate   = Date.parse(migrationOBTDates[1]);

      // Check if booking date is within configurated dates
      if (now >= startDate && now <= endDate) {
        const airSegments   = this.pnrService.getPassiveSegmentTypes('AIR');
        const railSegments  = this.pnrService.getPassiveSegmentTypes('MIS');
        const hotelSegments = this.pnrService.getPassiveSegmentTypes('HTL');
        const carSegments   = this.pnrService.getPassiveSegmentTypes('CAR');
        let remarkValue: string = null;

        if (airSegments.length) {
          remarkValue = 'ATE';
        } else if (railSegments.length && !airSegments.length) {
          remarkValue = 'RTE';
        } else if (hotelSegments.length && !airSegments.length) {
          remarkValue = 'HBE';
        } else if (carSegments.length && !airSegments.length) {
          remarkValue = 'CBE';
        }

        if (remarkValue) {
          const migrationOBTFeeMap = new Map<string, string>();
          migrationOBTFeeMap.set('SupFeeTicketId', '1');
          migrationOBTFeeMap.set('SupFeeInfo', remarkValue);
          this.remarksManager.createPlaceholderValues(migrationOBTFeeMap, null, null);
        }
      }
    }
  }

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
