import { Injectable } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { RemarksManagerService } from './remarks-manager.service';
import { PnrService } from '../pnr.service';
import { AquaFeesComponent } from 'src/app/corporate/fees/aqua-fees/aqua-fees.component';
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';
import { AmadeusQueueService } from '../amadeus-queue.service';
import { QueuePlaceModel } from 'src/app/models/pnr/queue-place.model';
import { DDBService } from '../ddb.service';

@Injectable({
  providedIn: 'root'
})
export class FeesRemarkService {
  constructor(
    private remarksManager: RemarksManagerService,
    private pnrService: PnrService,
    private queueRemarksService: AmadeusQueueService,
    private ddbService: DDBService
  ) {}

  /**
   * US9402
   * Write Migration OBT Fee remark if the PNR has CF,
   * is within configurated dates and depends on type of segment.
   *
   * @return void
   */
  public writeMigrationOBTFeeRemarks(migrationOBTSetting: string) {
    const cfa = this.pnrService.getCFLine().cfa;
    const settings = migrationOBTSetting.split('|');
    let isSet = false;
    // Check if CFA and OBT remarks exists in PNR
    settings.forEach((obtSetting) => {
      const info = obtSetting.split(',');
      if (info.length === 3 && info[0].split('-').indexOf(cfa) > -1) {
        const now = Date.now();
        const startDate = Date.parse(info[1]);
        try {
          // Check if booking date is within configurated dates
          if (now >= startDate && (info[2] === 'N/A' || now <= Date.parse(info[2]))) {
            const airSegments = this.pnrService.getPassiveSegmentTypes('AIR');

            if (airSegments.length > 0) {
              const migrationOBTFeeMap = new Map<string, string>();
              migrationOBTFeeMap.set('SupFeeTicketId', '1');
              migrationOBTFeeMap.set('SupFeeInfo', 'ATE');
              this.remarksManager.createPlaceholderValues(migrationOBTFeeMap, null, null);
              isSet = true;
              return isSet;
            }
          }
        } catch (ex) {
          console.log('OBT Migration Error');
        }
      }
    });
    return isSet;
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

    if (additionalFee) {
      fees = fees.concat(additionalFee);
    }

    if (group.get('supplementalFee').value !== '') {
      fees.push(group.get('supplementalFee').value);
    }

    let feeValue = fees.join('/');

    if (feeValue === '') {
      feeValue = group.get('noFeeCode').value;
    }

    if (feeValue !== '') {
      feeMap.set('SupFeeInfo', feeValue + (ticketRemark ? ticketRemark : ''));
      feeMap.set('SupFeeTicketId', counter.toString());
      this.remarksManager.createPlaceholderValues(feeMap, null, segmentRelate);
    } else {
      this.remarksManager.createEmptyPlaceHolderValue(['SupFeeInfo', 'SupFeeTicketId'], null, 'SUPFEE');
    }
  }

  public async writeAquaFees(comp: AquaFeesComponent) {
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

    // Ticketing and Queue
    const oid = this.pnrService.extractOidFromBookRemark();
    this.remarksManager.createEmptyPlaceHolderValue(['CAOverrideValue']);
    const override = new Map<string, string>();
    override.set('CAOverrideValue', 'FEE');
    this.remarksManager.createPlaceholderValues(override);
    if (this.isPnrHotelOnly()) {
      const numberOfTicketRemark = new Map<string, string>();
      numberOfTicketRemark.set('NumberOfTickets', '1');
      this.remarksManager.createPlaceholderValues(numberOfTicketRemark, null);
    }

    const queue = new QueuePlaceModel();
    queue.pcc = oid;
    queue.date = formatDate(Date.now(), 'ddMMyy', 'en').toString();
    queue.queueNo = '70';
    queue.category = '1';
    this.queueRemarksService.addQueueCollection(queue);

    const addInfo = [];
    /// Ge Fees
    let hasOlbFee = false;
    let hasExchangeFee = false;
    let hasConcurFee = false;
    let isExchange = false;
    if (comp.suppFeeComponent !== undefined) {
      hasExchangeFee = comp.suppFeeComponent.hasExchangeFee;
      hasConcurFee = comp.suppFeeComponent.hasConcurFee();
      hasOlbFee = comp.suppFeeComponent.hasOlbFee;
      isExchange = comp.suppFeeComponent.isExchange;
    } else {
      const clientFees = await this.ddbService.getFees(this.pnrService.clientSubUnitGuid, this.pnrService.getCFLine().cfa);
      hasOlbFee = clientFees.filter((item) => item.outputFormat === 'OLB' && item.valueAmount > 0).length > 0;
      const hasAbfFee = clientFees.filter((item) => item.outputFormat === 'ABF' && item.valueAmount > 0).length > 0;
      hasExchangeFee = clientFees.filter((item) => item.outputFormat === 'EPF' && item.valueAmount > 0).length > 0;
      const hasWNFlight = this.pnrService.getSegmentList().filter((x) => x.segmentType === 'AIR' && x.airlineCode === 'WN').length > 0;
      const ebRem = this.pnrService.getRemarkText('EB/');
      const isConcurEB = ebRem.indexOf('EB/-EBA') >= 0 || ebRem.indexOf('EB/-AMA') >= 0;
      hasConcurFee = hasWNFlight && isConcurEB && hasAbfFee;
      isExchange = this.pnrService.getExchangeSegmentNumbers().length > 0;
    }

    if (hasExchangeFee && isExchange) {
      addInfo.push('EPF');
    }
    if (hasConcurFee) {
      addInfo.push('ABF');
    }
    if (hasOlbFee) {
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

  isPnrHotelOnly(): boolean {
    const nonHotel = this.pnrService.getSegmentList().filter((segment) => segment.segmentType !== 'HTL' && segment.segmentType !== 'HHL');
    const hotelOnly = this.pnrService.getSegmentList().filter((segment) => segment.segmentType === 'HTL' || segment.segmentType === 'HHL');

    if (nonHotel.length === 0 && hotelOnly.length > 0) {
      return true;
    } else {
      return false;
    }
  }
}
