import { Injectable } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { RemarksManagerService } from './remarks-manager.service';
import { PnrService } from '../pnr.service';
import { AquaFeesComponent } from 'src/app/corporate/fees/aqua-fees/aqua-fees.component';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FeesRemarkService {
  constructor(private remarksManager: RemarksManagerService, private pnrService: PnrService) {}

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

  writeFee(counter, group, segmentRelate?, additionalFee?, ticketRemark?) {
    const feeMap = new Map<string, string>();
    let fees = [];
    if (group.get('code').value !== '') {
      const feeAmt = group.get('fee').value;
      fees.push(group.get('code').value + (feeAmt ? feeAmt.toString() : ''));
    }

    if (group.get('supplementalFee').value !== '') {
      fees.push(group.get('supplementalFee').value);
    }
    if (additionalFee) {
      fees = additionalFee.concat(fees);
    }
    fees = fees.filter((el, i, a) => i === a.indexOf(el)); // Prevent DUplicate

    let feeValue = fees.join('/');

    if (feeValue === '') {
      feeValue = group.get('noFeeCode').value;
    }

    if (feeValue !== '') {
      feeMap.set('SupFeeInfo', feeValue + ticketRemark);
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
    const ticketNum = comp.aquaFeeForm.get('ticketNumber').value;
    const tatoos = this.pnrService.getTatooNumberFromSegmentNumber(comp.aquaFeeForm.get('segments').value.split(','));
    const feeType = comp.aquaFeeForm.get('feeType').value;
    const ebRemark = this.pnrService.getRemarkText('EB/-');
    const feeInfo = comp.getFeeCode(feeType, ebRemark);
    const ticketRemark = ticketNum ? '/TK-' + ticketNum : '';

    const addInfo = [];
    if (comp.suppFeeComponent.hasExchangeFee) {
      addInfo.push('EPF');
    }
    if (comp.suppFeeComponent.hasConcurFee()) {
      addInfo.push('ABF');
    }
    if (comp.suppFeeComponent.hasOlbFee) {
      addInfo.push('OLB');
    }

    if (comp.isShowSupFee) {
      const fees = comp.suppFeeComponent.ticketedForm.get('segments') as FormArray;
      this.writeFee(1, fees.controls[0], tatoos.length > 0 ? tatoos : null, addInfo, ticketRemark);
    } else {
      const feeMap = new Map<string, string>();
      feeMap.set('SupFeeInfo', feeInfo + (addInfo.length > 0 ? '/' + addInfo.join('/') : '') + ticketRemark);
      feeMap.set('SupFeeTicketId', '1');
      this.remarksManager.createPlaceholderValues(feeMap, null, tatoos.length > 0 ? tatoos : null);
    }
    const dateNow = new DatePipe('en-US').transform(new Date(), 'ddMMM').toString();
    return this.pnrService.getSegmentList().length === 0 ? ['RU1AHK1YYZ' + dateNow + '/TYP-CWT/FEE ONLY'] : [];
  }
}
