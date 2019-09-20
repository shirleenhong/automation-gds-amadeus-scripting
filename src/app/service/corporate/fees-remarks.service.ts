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
   * Write Migration OBT Fee remarks
   */
  public writeMigrationOBTFeeRemarks(migrationOBTDates: Array<string>): void {

    // Check if CFA Exists in PNR
    if (this.pnrService.getCFLine()) {

      const now       = Date.now();
      const startDate = Date.parse(migrationOBTDates[0]);
      const endDate = Date.parse(migrationOBTDates[1]);

      if (now >= startDate && now <= endDate) {
        const segments      = this.pnrService.getSegmentTatooNumber();
        const segmentMaps: Array<Map<string, string>> = [];

        for (let i = 1; i < segments.length; i++) {

          let remarkValue: string;
          switch (segments[i].segmentType) {
            case 'AIR':
              remarkValue = 'ATE';
              break;
            case 'MISC':
              remarkValue = 'RTE';
              break;
            case 'HTL':
              remarkValue = 'HBE';
              break;
            case 'CAR':
              remarkValue = 'CBE';
              break;
            default:
              remarkValue = 'RTE'; // If it's MISC, it's probably rail.
              break;
          }

          const segmentMap = new Map<string, string>();
          segmentMap.set('SupFeeTicketId', i.toString());
          segmentMap.set('SupFeeInfo', remarkValue);
          segmentMaps.push(segmentMap);
        }

        for (let i = 1; i <= segmentMaps.length; i++) {
          this.remarksManager.createPlaceholderValues(segmentMaps[i], null, null);
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

  public getRemarkSegmentAssociation(segments: string[]): string[] {
    const segmentRelate: string[] = [];
    const segmentsMatched = this.pnrService.getSegmentTatooNumber().filter((x) => segments.indexOf(x.lineNo));

    segmentsMatched.forEach((segmentMatched) => {
      segmentRelate.push(segmentMatched.tatooNo);
    });

    return segmentRelate;
  }
}
