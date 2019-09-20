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
   * US9402 - ONGOING
   * Write Migration OBT Fee
   */
  public writeMigrationOBTFeeRemarks(migrationOBTDates: Array<string>): void {
    debugger;

    // Check if CFA Exists in PNR
    if (this.pnrService.getCFLine()) {

      const now       = Date.now();
      const startDate = Date.parse(migrationOBTDates[0]);
      const endDate = Date.parse(migrationOBTDates[1]);

      // WIP
      if (now >= startDate && now <= endDate) {
        // Write static remarks by segment type?

        // Get air, rail, hotel and car segments
        const segmentsAir   = this.pnrService.getPassiveSegmentTypes('AIR');
        const segmentsRail  = this.pnrService.getPassiveSegmentTypes('MIS'); // TO CLARIFY...
        const segmentsHotel = this.pnrService.getPassiveSegmentTypes('HTL');
        const segmentsCar   = this.pnrService.getPassiveSegmentTypes('CAR');

        const airOBTFeeMap = new Map<string, string>();
        segmentsAir.forEach((item, index) => {
          console.log(item);
          airOBTFeeMap.set('SupFeeTicketId', (index + 1).toString());
          airOBTFeeMap.set('SupFeeInfo', 'ATE');
          this.remarksManager.createPlaceholderValues(airOBTFeeMap, null, null);
        });
        const railOBTFeeMap = new Map<string, string>();
        segmentsRail.forEach((item, index) => {
          console.log(item);
          railOBTFeeMap.set('SupFeeTicketId', (index + 1).toString());
          railOBTFeeMap.set('SupFeeInfo', 'RTE');
          this.remarksManager.createPlaceholderValues(railOBTFeeMap, null, null);
        });
        const hotelOBTFeeMap = new Map<string, string>();
        segmentsHotel.forEach((item, index) => {
          console.log(item);
          hotelOBTFeeMap.set('SupFeeTicketId', (index + 1).toString());
          hotelOBTFeeMap.set('SupFeeInfo', 'HBE');
          this.remarksManager.createPlaceholderValues(hotelOBTFeeMap, null, null);
        });
        const carOBTFeeMap = new Map<string, string>();
        segmentsCar.forEach((item, index) => {
          const supFeeTicketId = index + 1;
          console.log(item + supFeeTicketId);
          carOBTFeeMap.set('SupFeeTicketId', (index + 1).toString());
          carOBTFeeMap.set('SupFeeInfo', 'CBE');
          this.remarksManager.createPlaceholderValues(carOBTFeeMap, null, null);
        });
      }
    }
  }

  writeFeeRemarks(feeGroup: FormGroup) {
    const fees = feeGroup.get('segments') as FormArray;
    this.writeFees(fees);
  }

  private writeFees(items: FormArray) {
    debugger;
    let counter = 1;
    for (const group of items.controls) {
      const feeMap = new Map<string, string>();
      // const segments = this.pnrService.getTatooNumberFromSegmentNumber(group.get('segment').value.split(','));
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

      this.remarksManager.createPlaceholderValues(feeMap, null, null);

      counter++;
    }
  }

  public getRemarkSegmentAssociation(segments: string[]): string[] {
    debugger;
    const segmentRelate: string[] = [];
    const segmentsMatched = this.pnrService.getSegmentTatooNumber().filter((x) => segments.indexOf(x.lineNo));

    segmentsMatched.forEach((segmentMatched) => {
      segmentRelate.push(segmentMatched.tatooNo);
    });

    return segmentRelate;
  }
}
