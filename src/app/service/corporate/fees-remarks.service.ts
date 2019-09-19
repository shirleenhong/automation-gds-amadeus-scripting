import { Injectable } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { RemarksManagerService } from './remarks-manager.service';
import { PnrService } from '../pnr.service';
import { DDBService } from '../ddb.service';

@Injectable({
  providedIn: 'root'
})
export class FeesRemarkService {
  constructor(
    private remarksManager: RemarksManagerService,
    private pnrService: PnrService,
    private ddbService: DDBService
  ) {}

  /**
   * US9402 - ONGOING
   * Write Migration OBT Fee
   */
  public writeMigrationOBTFeeRemarks(): void {
    debugger;
    // Check if CFA Exists in PNR
    if (this.pnrService.getCFLine()) {
      this.getMigrationOBTFeeDates()
        .then(dates => {
          const now       = Date.now();
          const startDate = Date.parse(dates[0]);
          const endDate   = Date.parse(dates[1]);

          // WIP
          if (now >= startDate && now <= endDate) {
            // Write static remarks by segment type?

            // Get air, rail, hotel and car segments
            const segmentsAir   = this.pnrService.getPassiveSegmentTypes('AIR');
            const segmentsRail  = this.pnrService.getPassiveSegmentTypes('MIS'); // TO CLARIFY...
            const segmentsHotel = this.pnrService.getPassiveSegmentTypes('HTL');
            const segmentsCar   = this.pnrService.getPassiveSegmentTypes('CAR');

            // WIP: writes 1 remark per segment and per segment type...
            // Still not writing...
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
              console.log(item);
              carOBTFeeMap.set('SupFeeTicketId', (index + 1).toString());
              carOBTFeeMap.set('SupFeeInfo', 'CBE');
              this.remarksManager.createPlaceholderValues(carOBTFeeMap, null, null);
            });
          }
        });
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

    debugger;
    const migrationOBTFeeMap = new Map<string, string>();
    migrationOBTFeeMap.set('SupFeeInfo', 'CBE');
    this.remarksManager.createPlaceholderValues(migrationOBTFeeMap, null, null);
  }

  /**
   * Get the start and end dates of the Migration OBT Fee dates sin configuration.
   */
  public async getMigrationOBTFeeDates(): Promise<[string, string]> {
    try {
      let migrationOBTFeeDateRange = null;
      const response = await this.ddbService.getConfigurationParameter('MigrationOBTFeeDate');
      migrationOBTFeeDateRange = response.ConfigurationParameters[0].ConfigurationParameterValue.split(',');

      return [migrationOBTFeeDateRange[0], migrationOBTFeeDateRange[1]];
    } catch (error) {
      throw new Error('Failed to get Migration OBT Fee configuration. ' + error);
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
