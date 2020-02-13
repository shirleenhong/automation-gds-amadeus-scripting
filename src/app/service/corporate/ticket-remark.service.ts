import { Injectable } from '@angular/core';
import { DatePipe, formatDate } from '@angular/common';

import { RemarksManagerService } from './remarks-manager.service';
import { PnrService } from '../pnr.service';
import { RemarkGroup } from '../../models/pnr/remark.group.model';
import { TicketModel } from '../../models/pnr/ticket.model';
import { DDBService } from '../ddb.service';
import { AquaTicketingComponent } from 'src/app/corporate/ticketing/aqua-ticketing/aqua-ticketing.component';
import { ApprovalRuleService } from './approval-rule.service';
import { RemarkModel } from 'src/app/models/pnr/remark.model';
import { RemarkHelper } from 'src/app/helper/remark-helper';
import { QueuePlaceModel } from 'src/app/models/pnr/queue-place.model';
import { FormGroup, FormArray } from '@angular/forms';
import { AmadeusQueueService } from '../amadeus-queue.service';
import { PricingService } from './pricing.service';

// declare var smartScriptSession: any;

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
    private ddbService: DDBService,
    private approvalRuleService: ApprovalRuleService,
    private remarkHelper: RemarkHelper,
    private amdeusQueue: AmadeusQueueService,
    private pricingService: PricingService
  ) {}
  /**
   * Method to add Tktline for BSP and NonBsp Cancel
   */
  public cancelTicketRemark(): RemarkGroup {
    const datePipe = new DatePipe('en-US');
    const ticketRemark = new TicketModel();
    ticketRemark.oid = this.pnrService.extractOidFromBookRemark();
    ticketRemark.tktDate = datePipe.transform(Date.now(), 'ddMMM');
    ticketRemark.pnrOnHold = false;
    ticketRemark.tkLine = 'CXL';
    const remGroup = new RemarkGroup();
    remGroup.group = 'Ticketing';
    remGroup.cryptics = new Array<string>();
    remGroup.deleteRemarkByIds = new Array<string>();
    return this.writeTicketRemark(ticketRemark, remGroup);
  }

  /**
   * Method that cleansup existing TK remark, then invokes another method to write new.
   * @returns RemarkGroup - the remark group for the new TKTL remark
   */
  public submitTicketRemark(ticketRemark: TicketModel, fg?: FormGroup): RemarkGroup {
    const remGroup = new RemarkGroup();
    remGroup.group = 'Ticketing';
    remGroup.cryptics = new Array<string>();
    remGroup.deleteRemarkByIds = new Array<string>();
    this.cleanupTicketRemark(remGroup);
    this.writeTicketRemark(ticketRemark, remGroup, fg);
    return remGroup;
  }

  public deleteTicketingLine() {
    const remGroup = new RemarkGroup();
    const existingTkLineNum = this.pnrService.getTkLineNumber();
    if (existingTkLineNum >= 0) {
      remGroup.deleteRemarkByIds.push(existingTkLineNum.toString());
    }
    return remGroup;
  }

  /**
   * Cleans up existing TK remark (as well as RIR if on hold).
   */
  private cleanupTicketRemark(remGroup: RemarkGroup): void {
    // const linesToDelete: Array<number> = new Array();

    const existingTkLineNum = this.pnrService.getTkLineNumber();
    const existingFSLineNum = this.pnrService.getFSLineNumber();
    const fmLineNumbers = this.pricingService.toDeleteFmLines;
    if (existingTkLineNum >= 0) {
      remGroup.deleteRemarkByIds.push(existingTkLineNum.toString());
      // linesToDelete.push(existingTkLineNum);

      const existingRirLineNum = this.pnrService.getRIRLineNumber(this.ONHOLD_KEYWORD);
      if (existingRirLineNum && existingRirLineNum >= 0) {
        remGroup.deleteRemarkByIds.push(existingRirLineNum.toString());
        // linesToDelete.push(existingRirLineNum);
      }
    }
    // to delete FM lines from the PNR
    for (const fmLine of fmLineNumbers) {
      remGroup.deleteRemarkByIds.push(fmLine.toString());
      // linesToDelete.push(fmLine);
    }
    if (existingFSLineNum !== '' && existingFSLineNum >= 0) {
      remGroup.deleteRemarkByIds.push(existingFSLineNum.toString());
      // linesToDelete.push(existingFSLineNum);
    }
    //
    // if (linesToDelete.length > 0) {
    //   smartScriptSession.send('XE' + linesToDelete.join(','));
    // }
  }

  /**
   * Writes the ticketing remark, as well as onhold remark (if on hold).
   * @param ticketRemark The ticket data from screen.
   * @returns RemarkGroup - the remark group for the new TKTL remark
   */
  private writeTicketRemark(ticketRemark: TicketModel, remGroup: RemarkGroup, fg?: FormGroup): RemarkGroup {
    // const remGroup = new RemarkGroup();
    let pnrOnhold = ticketRemark.pnrOnHold;
    if (fg && fg.get('noApproval').value === false) {
      const index = this.getApprovalIndex(fg);
      if (this.approvalRuleService.getTicketApproval(index).length > 0) {
        pnrOnhold = true;
      }
    }
    const remark =
      'TKTL' +
      this.transformTicketDate(ticketRemark.tktDate) +
      '/' +
      ticketRemark.oid +
      '/Q8C1' +
      this.appendTkLine(pnrOnhold, ticketRemark.tkLine);
    remGroup.cryptics.push(remark);

    if (fg) {
      this.writeOnHoldRemark(ticketRemark.pnrOnHold);
    }

    return remGroup;
  }

  /**
   * Reformats the given date on screen to ddMMM.
   * @param tktDate The date from screen.
   */
  private transformTicketDate(tktDate: string): string {
    let transformedDate: string;

    if (tktDate) {
      // transformedDate = this.DATE_PIPE.transform(new Date(tktDate), 'ddMMM').toUpperCase();
      transformedDate = formatDate(tktDate, 'ddMMM', 'en-US').toUpperCase();
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

  public writeOnHoldRemark(pnrOnHold: boolean): void {
    // to be removed once data is updated
    let mapCond = new Map<string, string>();
    mapCond.set('isOnHold', 'false');
    this.remarksManagerSvc.createPlaceholderValues(null, mapCond, null, null, 'ONHOLD:AWAITING APPROVAL');
    // ---------------------
    if (pnrOnHold) {
      mapCond = new Map<string, string>();
      mapCond.set('OnHoldNP', 'AWAITING APPROVAL');
      this.remarksManagerSvc.createPlaceholderValues(mapCond, null, null, null, 'ONHOLD:');
    } else {
      this.remarksManagerSvc.createEmptyPlaceHolderValue(['OnHoldNP'], null, 'ONHOLD:');
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
  public writePassiveHotelSegmentRemark(fg: FormGroup): void {
    // Check if the PNR is only Hotel
    if (this.isPnrHotelOnly(fg)) {
      const segments: string[] = fg.get('hotelSegment').value.split(',');
      const segmentrelate: string[] = this.pnrService.getTatooNumberFromSegmentNumber(segments);

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

  public writePassiveCarSegmentRemark(fg: FormGroup): void {
    // Check if the PNR is only Car
    if (this.isCarSelectedOnly(fg)) {
      const segments: string[] = fg.get('carSegment').value.split(',');
      const segmentrelate: string[] = this.pnrService.getTatooNumberFromSegmentNumber(segments);

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

  public writePassiveLimoSegmentRemark(fg: FormGroup): void {
    // Check if the PNR is only Limo
    if (this.isLimoSelectedOnly(fg)) {
      const segments: string[] = fg.get('limoSegment').value.split(',');
      const segmentrelate: string[] = this.pnrService.getTatooNumberFromSegmentNumber(segments);

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

  private isCarSelectedOnly(fg: FormGroup): boolean {
    return !(fg.get('tst').value || fg.get('hotelSegment').value || fg.get('limoSegment').value);
  }

  private isLimoSelectedOnly(fg: FormGroup): boolean {
    return !(fg.get('tst').value || fg.get('hotelSegment').value || fg.get('carSegment').value);
  }

  private isPnrHotelOnly(fg: FormGroup): boolean {
    return !(fg.get('tst').value || fg.get('carSegment').value || fg.get('limoSegment').value);
  }

  public getApprovalRemarksForDelete(fg: FormGroup): string[] {
    if (fg.get('noApproval').value === false) {
      const forDelete = [];
      const index = this.getApprovalIndex(fg);
      this.approvalRuleService.getDeleteRemarkApproval(index).forEach((app) => {
        const rems = app.approvalRules.split('|');
        if (rems[0].indexOf('RM') === 0) {
          const line = this.pnrService.getRemarkLineNumber(rems[1]);
          if (line !== '') {
            forDelete.push(line);
          }
        }
      });
      return forDelete;
    }
    return [];
  }

  /**
   * Get Remarks to be added  based on the Approval Process
   * @param fg Approval Form Group
   */
  public getApprovalRemarks(fg: FormGroup): Array<RemarkModel> {
    const remarkList = new Array<RemarkModel>();
    if (fg.get('noApproval').value === false) {
      const index = this.getApprovalIndex(fg);
      this.approvalRuleService.getWriteApproval(index).forEach((app) => {
        const rems = app.approvalRules.split('|');
        let remark = rems[1];
        const type = rems[0].substring(0, 2);

        for (const control of (fg.get('additionalValues') as FormArray).controls) {
          if (control.get('uiType').value === '[TEXTBOX]') {
            remark = remark.replace('[' + control.get('textLabel').value.trim() + ']', control.get('textValue').value);
          }
        }

        if (remark.indexOf('UI_') > -1) {
          remark = remark.replace(fg.get('primaryReason').value, fg.get('primaryText').value);
          remark = remark.replace(fg.get('secondaryReason').value, fg.get('secondaryText').value);
        }

        if (remark.indexOf('[DATE_NOW]') >= 0) {
          const datePipe = new DatePipe('en-Us');
          remark = remark.replace('[DATE_NOW]', datePipe.transform(Date.now(), 'yyyy-MM-dd'));
        }

        this.getSplitRemark(remark).forEach((text) => {
          if (this.pnrService.getRemarkLineNumber(text, type) === '') {
            remarkList.push(this.remarkHelper.createRemark(text, type, rems[0].length === 2 ? '' : rems[0].charAt(2)));
          }
        });
      });
    } else if (this.ddbService.approvalList.length > 0 && this.pnrService.getRemarkLineNumber('NO APPROVAL REQUIRED') === '') {
      remarkList.push(this.remarkHelper.createRemark('NO APPROVAL REQUIRED', 'RM', 'G'));
    }

    return remarkList;
  }
  getSplitRemark(remark: string) {
    const splitRemarks = [];
    if (remark.length > 55) {
      while (remark.length > 55) {
        const c = remark.substring(0, 55);
        const rem = remark.substring(0, c.lastIndexOf(' '));
        splitRemarks.push(rem);
        remark = remark.replace(rem, '').trim();
        if (remark.length <= 55) {
          splitRemarks.push(remark);
        }
      }
    } else {
      splitRemarks.push(remark);
    }
    return splitRemarks;
  }

  /**
   *  Get Approval Selected index, return 1 if Primary and Secondary selection has no value
   * Gets _2_1 in UI_SECONDARY_2_1
   * @param fg Approval Form
   */
  private getApprovalIndex(fg: FormGroup): string {
    let value = '';
    if (fg.get('secondaryReason').value) {
      value = fg.get('secondaryReason').value.toString();
    } else if (fg.get('primaryReason').value) {
      value = fg.get('primaryReason').value.toString() + '_0';
    } else {
      value = '_0';
    }
    return value.match(/_(\d)/g).join('');
  }

  /**
   * get queue group approval based on the rules set in DDB
   * @param fg Approval Form
   * @returns Array<QueuePlaceModel> queue placement information
   */
  getApprovalQueue(fg: FormGroup) {
    if (fg.get('noApproval').value === false) {
      const index = this.getApprovalIndex(fg);
      this.approvalRuleService.getQueueApproval(index).forEach((app) => {
        const queue = new QueuePlaceModel();
        const queueInfo = app.approvalRules.split('/');
        queue.pcc = queueInfo[0] === '{BOOKING_OID}' ? this.pnrService.PCC : queueInfo[0];
        queue.date = formatDate(Date.now(), 'ddMMyy', 'en').toString();
        const categoryqueue = queueInfo[1].split('C');
        queue.queueNo = categoryqueue[0];
        queue.category = categoryqueue[1];
        this.amdeusQueue.addQueueCollection(queue);
      });
    }
  }
}
