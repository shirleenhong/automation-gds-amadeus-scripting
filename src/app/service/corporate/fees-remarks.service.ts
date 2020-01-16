import { Injectable } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { RemarksManagerService } from './remarks-manager.service';
import { PnrService } from '../pnr.service';
import { DDBService } from '../ddb.service';
import { AquaFeesComponent } from 'src/app/corporate/fees/aqua-fees/aqua-fees.component';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class FeesRemarkService {
  constructor(private remarksManager: RemarksManagerService, private pnrService: PnrService, private ddbService: DDBService) {}

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
      const now = Date.now();
      const startDate = Date.parse(migrationOBTDates[0]);
      const endDate = Date.parse(migrationOBTDates[1]);

      // Check if booking date is within configurated dates
      if (now >= startDate && now <= endDate) {
        const airSegments = this.pnrService.getPassiveSegmentTypes('AIR');
        const railSegments = this.pnrService.getPassiveSegmentTypes('MIS');
        const hotelSegments = this.pnrService.getPassiveSegmentTypes('HTL');
        const carSegments = this.pnrService.getPassiveSegmentTypes('CAR');
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
    let counter = 1;
    for (const group of fees.controls) {
      this.writeFee(counter, group);
      counter++;
    }
  }

  writeFee(counter, group, segmentRelate?, additionalFee?) {
    const feeMap = new Map<string, string>();
    const fees = [];
    if (group.get('code').value !== '') {
      const feeAmt = group.get('fee').value;
      fees.push(group.get('code').value + (feeAmt ? feeAmt.toString() : ''));
    }

    if (group.get('supplementalFee').value !== '') {
      fees.push(group.get('supplementalFee').value);
    }

    let feeValue = fees.join('/') + (additionalFee ? additionalFee : '');

    if (feeValue === '') {
      feeValue = group.get('noFeeCode').value;
    }

    if (feeValue !== '') {
      feeMap.set('SupFeeInfo', feeValue);
      feeMap.set('SupFeeTicketId', counter.toString());
      this.remarksManager.createPlaceholderValues(feeMap, null, segmentRelate);
    } else {
      this.remarksManager.createEmptyPlaceHolderValue(['SupFeeInfo', 'SupFeeTicketId'], null, 'SUPFEE');
    }
  }

  public writeAquaFees(comp: AquaFeesComponent) {
    // DELETE ALL MACLINES IF NOT only 1 pfs
    if (this.pnrService.getRemarkLineNumbers('MAC/-SUP-PFS').length !== 1) {
      this.remarksManager.createEmptyPlaceHolderValue(['MacLinePlaceholder'], null, 'MAC');
    }

    /// DELETE REMARKS
    const h = new Map<string, string>();
    h.set('IsNuc', 'false');
    this.remarksManager.createPlaceholderValues(null, h, null, null, 'NUC');
    this.remarksManager.createEmptyPlaceHolderValue(['CAOverrideValue'], null, 'OVERRIDE');
    this.remarksManager.createEmptyPlaceHolderValue(['FeesPlaceholder'], null, 'FEE');
    this.remarksManager.createEmptyPlaceHolderValue(['SfcPlaceholder'], null, 'SFC');

    const tatoos = this.pnrService.getTatooNumberFromSegmentNumber(comp.aquaFeeForm.get('segments').value.split(','));
    const feeType = comp.aquaFeeForm.get('feeType').value;
    const ebRemark = this.pnrService.getRemarkText('EB/-');
    const feeInfo = this.getFeeCode(feeType, ebRemark);
    if (ebRemark === '' && comp.isShowSupFee) {
      const fees = comp.suppFeeComponent.ticketedForm.get('segments') as FormArray;
      let addInfo = null;
      if (comp.suppFeeComponent.hasOlbFee) {
        addInfo = '/OLB';
      }
      this.writeFee(1, fees.controls[0], tatoos.length > 0 ? tatoos : null, addInfo);
    } else {
      const feeMap = new Map<string, string>();
      feeMap.set('SupFeeInfo', feeInfo);
      feeMap.set('SupFeeTicketId', '1');
      this.remarksManager.createPlaceholderValues(feeMap, null, tatoos.length > 0 ? tatoos : null);
    }
  }

  private getFeeCode(feeType, ebRemark) {
    let route = '';

    if (feeType === 'L') {
      route = 'BD';
    } else if (ebRemark === '') {
      if (this.ddbService.isPnrTransBorder()) {
        route = 'TB';
      } else if (this.ddbService.isPnrDomestic()) {
        route = 'TI';
      } else {
        route = 'TD';
      }
    } else if (ebRemark.indexOf('EB/-EB') >= 0) {
      if (feeType === 'A' || feeType === 'R') {
        route = 'TE';
      } else if (feeType === 'C' || feeType === 'H') {
        route = 'BE';
      }
    } else if (ebRemark.indexOf('EB/-AM') >= 0) {
      if (feeType === 'A' || feeType === 'R') {
        route = 'TA';
      } else if (feeType === 'C' || feeType === 'H') {
        route = 'BA';
      }
    }
    return feeType + route;
  }
}
