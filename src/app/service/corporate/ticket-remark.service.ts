import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

import { RemarksManagerService } from './remarks-manager.service';
import { PnrService } from '../pnr.service';
import { RemarkGroup } from '../../models/pnr/remark.group.model';
import { TicketModel } from '../../models/pnr/ticket.model';
import { FormGroup } from '@angular/forms';
import { DDBService } from '../ddb.service';
import { AquaTicketingComponent } from 'src/app/corporate/ticketing/aqua-ticketing/aqua-ticketing.component';

declare var smartScriptSession: any;

@Injectable({
  providedIn: 'root'
})
export class TicketRemarkService {
  DATE_PIPE = new DatePipe('en-US');
  ONHOLD_KEYWORD = 'ONHOLD:AWAITING APPROVAL';
  hasTransborder: boolean;

  constructor(
    private remarksManagerSvc: RemarksManagerService,
    private pnrService: PnrService,
    private remarksManager: RemarksManagerService,
    private ddbService: DDBService
  ) {}

  /**
   * Method that cleansup existing TK remark, then invokes another method to write new.
   * @returns RemarkGroup - the remark group for the new TKTL remark
   */
  public submitTicketRemark(ticketRemark: TicketModel): RemarkGroup {
    this.cleanupTicketRemark();

    return this.writeTicketRemark(ticketRemark);
  }

  /**
   * Cleans up existing TK remark (as well as RIR if on hold).
   */
  private cleanupTicketRemark(): void {
    const linesToDelete: Array<number> = new Array();

    const existingTkLineNum = this.pnrService.getTkLineNumber();

    if (existingTkLineNum >= 0) {
      linesToDelete.push(existingTkLineNum);

      const existingRirLineNum = this.pnrService.getRIRLineNumber(this.ONHOLD_KEYWORD);
      if (existingRirLineNum && existingRirLineNum >= 0) {
        linesToDelete.push(existingRirLineNum);
      }
    }

    if (linesToDelete.length > 0) {
      smartScriptSession.send('XE' + linesToDelete.join(','));
    }
  }

  /**
   * Writes the ticketing remark, as well as onhold remark (if on hold).
   * @param ticketRemark The ticket data from screen.
   * @returns RemarkGroup - the remark group for the new TKTL remark
   */
  private writeTicketRemark(ticketRemark: TicketModel): RemarkGroup {
    const remGroup = new RemarkGroup();
    const remark =
      'TKTL' +
      this.transformTicketDate(ticketRemark.tktDate) +
      '/' +
      ticketRemark.oid +
      '/Q8C1' +
      this.appendTkLine(ticketRemark.pnrOnHold, ticketRemark.tkLine);

    remGroup.cryptics.push(remark);

    this.writeOnHoldRemark(ticketRemark.pnrOnHold);

    return remGroup;
  }

  /**
   * Reformats the given date on screen to ddMMM.
   * @param tktDate The date from screen.
   */
  private transformTicketDate(tktDate: string): string {
    let transformedDate: string;

    if (tktDate) {
      transformedDate = this.DATE_PIPE.transform(new Date(tktDate), 'ddMMM').toUpperCase();
    } else {
      transformedDate = '';
    }

    return transformedDate;
  }

  /**
   * Appends the respective suffix for TK line.
   */
  private appendTkLine(pnrOnHold: boolean, tkLine: string): string {
    let tkSuffix = '';

    if (pnrOnHold) {
      tkSuffix = '-ONHOLD';
    } else if (tkLine) {
      if ('ISS' !== tkLine && 'INV' !== tkLine) {
        tkSuffix = '-' + tkLine;
      }
    }

    return tkSuffix;
  }

  private writeOnHoldRemark(pnrOnHold: boolean): void {
    if (pnrOnHold) {
      const staticRemarksCondition = new Map<string, string>();
      staticRemarksCondition.set('isOnHold', 'true');

      this.remarksManagerSvc.createPlaceholderValues(null, staticRemarksCondition, null, null, 'ONHOLD:AWAITING APPROVAL');
    }
  }

  WriteAquaTicketing(aqua: AquaTicketingComponent) {
    const fg = aqua.aquaTicketingFormGroup;
    if (aqua.unticketedSegments.length > 0 && aqua.tstSelected.length > 0) {
      this.WriteAquaTicketingRemarks(aqua.unticketedSegments, aqua.tstSelected);
    }
    this.writePassiveHotelSegmentRemark(fg);
    this.writePassiveCarSegmentRemark(fg);
    this.writePassiveLimoSegmentRemark(fg);
  }

  private WriteAquaTicketingRemarks(unticketed: any[], tstSelected: any[]) {
    let ticketNumber: number;
    ticketNumber = 0;

    tstSelected.forEach((x) => {
      unticketed.forEach((p) => {
        if (x === p.tstNumber) {
          const tstSequenceRemark = new Map<string, string>();
          const tstRouteRemark = new Map<string, string>();
          let segmentrelate: string[] = [];
          ticketNumber++;
          tstSequenceRemark.set('TicketSequence', ticketNumber.toString());
          tstSequenceRemark.set('InvSegment', 'ETK');
          tstRouteRemark.set('TicketSequence', ticketNumber.toString());
          segmentrelate = p.tatooNumber;
          let tripType: string;
          tripType = this.getTripType(segmentrelate);
          tstRouteRemark.set('TktRoute', tripType);
          this.remarksManager.createPlaceholderValues(tstSequenceRemark, null, segmentrelate);
          this.remarksManager.createPlaceholderValues(tstRouteRemark, null, segmentrelate);
        }
      });
    });

    if (ticketNumber > 0) {
      const numberOfTicketRemark = new Map<string, string>();
      numberOfTicketRemark.set('NumberOfTickets', ticketNumber.toString());
      this.remarksManager.createPlaceholderValues(numberOfTicketRemark, null);
      if (this.hasTransborder) {
        const staticRemarksCondition = new Map<string, string>();
        staticRemarksCondition.set('AquaTicketingCondition', 'true');
        this.remarksManager.createPlaceholderValues(
          null,
          staticRemarksCondition,
          null,
          null,
          'ADVISED USTRAVEL A PASSPORT AND VISA ARE REQUIRED'
        );
        this.remarksManager.createPlaceholderValues(null, staticRemarksCondition, null, null, 'ADVISED USTRAVEL 6 MONTH FROM DEPARTURE');
      }
    } else {
      const staticRemarksCondition = new Map<string, string>();
      staticRemarksCondition.set('AquaTicketingCondition', 'False');
      this.remarksManager.createPlaceholderValues(
        null,
        staticRemarksCondition,
        null,
        null,
        'ADVISED USTRAVEL A PASSPORT AND VISA ARE REQUIRED'
      );
      this.remarksManager.createPlaceholderValues(null, staticRemarksCondition, null, null, 'ADVISED USTRAVEL 6 MONTH FROM DEPARTURE');
    }
  }

  getTripType(segmentRefList?: any[]) {
    const cityList = [];
    let tripType = 'DOM';
    if (segmentRefList.length > 1) {
      segmentRefList.forEach((x) => {
        this.pnrService.pnrObj.allAirSegments.forEach((p) => {
          if (p.tatooNumber === x) {
            this.ddbService.airTravelPortInformation.forEach((element) => {
              if (element.travelPortCode === p.fullNode.travelProduct.boardpointDetail.cityCode) {
                cityList.push(element.countryCode);
              }
              if (element.travelPortCode === p.fullNode.travelProduct.offpointDetail.cityCode) {
                cityList.push(element.countryCode);
              }
            });
          }
        });
      });
    } else {
      if (segmentRefList.length === 1) {
        this.pnrService.pnrObj.allAirSegments.forEach((x) => {
          if (segmentRefList === x.tatooNumber) {
            this.ddbService.airTravelPortInformation.forEach((element) => {
              if (element.travelPortCode === x.fullNode.travelProduct.boardpointDetail.cityCode) {
                cityList.push(element.countryCode);
              }
              if (element.travelPortCode === x.fullNode.travelProduct.offpointDetail.cityCode) {
                cityList.push(element.countryCode);
              }
            });
          }
        });
      }
    }

    cityList.forEach((element) => {
      if (element === 'US') {
        tripType = 'TRANS';
        this.hasTransborder = true;
      }
    });
    cityList.forEach((element) => {
      if (element !== 'CA' && element !== 'US') {
        tripType = 'INTL';
        this.hasTransborder = false;
      }
    });

    return tripType;
  }

  /**
   * Write passive hotel segment remarks to PNR.
   * @return void
   */
  writePassiveHotelSegmentRemark(fg: FormGroup): void {
    // Check if the PNR is only Hotel
    if (this.isPnrHotelOnly(fg)) {
      const segments: string[] = fg.get('hotelSegment').value.split(',');
      const segmentrelate: string[] = this.getRemarkSegmentAssociation(segments);

      if (segmentrelate.length > 0) {
        const hotelOnlyPnrRemarks = new Map<string, string>();
        hotelOnlyPnrRemarks.set('TicketSequence', '1');
        hotelOnlyPnrRemarks.set('InvSegment', 'INV-HTL');
        this.remarksManager.createPlaceholderValues(hotelOnlyPnrRemarks, null, segmentrelate);
        const numberOfTicketRemark = new Map<string, string>();
        numberOfTicketRemark.set('NumberOfTickets', '1');
        this.remarksManager.createPlaceholderValues(numberOfTicketRemark, null);
      }
    }
  }

  writePassiveCarSegmentRemark(fg: FormGroup): void {
    // Check if the PNR is only Car
    if (this.isCarSelectedOnly(fg)) {
      const segments: string[] = fg.get('carSegment').value.split(',');
      const segmentrelate: string[] = this.getRemarkSegmentAssociation(segments);

      if (segmentrelate.length > 0) {
        const carPnrRemarks = new Map<string, string>();
        carPnrRemarks.set('TicketSequence', '1');
        carPnrRemarks.set('InvSegment', 'INV-CAR');
        this.remarksManager.createPlaceholderValues(carPnrRemarks, null, segmentrelate);

        const numberOfTicketRemark = new Map<string, string>();
        numberOfTicketRemark.set('NumberOfTickets', '1');
        this.remarksManager.createPlaceholderValues(numberOfTicketRemark, null);
      }
    }
  }

  writePassiveLimoSegmentRemark(fg: FormGroup): void {
    // Check if the PNR is only Limo
    if (this.isLimoSelectedOnly(fg)) {
      const segments: string[] = fg.get('limoSegment').value.split(',');
      const segmentrelate: string[] = this.getRemarkSegmentAssociation(segments);

      if (segmentrelate.length > 0) {
        const limoPnrRemarks = new Map<string, string>();
        limoPnrRemarks.set('TicketSequence', '1');
        limoPnrRemarks.set('InvSegment', 'INV-LIMO');
        this.remarksManager.createPlaceholderValues(limoPnrRemarks, null, segmentrelate);

        const numberOfTicketRemark = new Map<string, string>();
        numberOfTicketRemark.set('NumberOfTickets', '1');
        this.remarksManager.createPlaceholderValues(numberOfTicketRemark, null);
      }
    }
  }

  isCarSelectedOnly(fg: FormGroup): boolean {
    return !(fg.get('tst').value || fg.get('hotelSegment').value || fg.get('limoSegment').value);
  }

  isLimoSelectedOnly(fg: FormGroup): boolean {
    return !(fg.get('tst').value || fg.get('hotelSegment').value || fg.get('carSegment').value);
  }

  isPnrHotelOnly(fg: FormGroup): boolean {
    return !(fg.get('tst').value || fg.get('carSegment').value || fg.get('limoSegment').value);
  }

  getRemarkSegmentAssociation(segments: string[]): string[] {
    const segmentrelate: string[] = [];
    const segment = this.pnrService.getSegmentTatooNumber().filter((x) => segments.indexOf(x.lineNo) >= 0);
    segment.forEach((element) => {
      segmentrelate.push(element.tatooNo);
    });

    return segmentrelate;
  }
}
