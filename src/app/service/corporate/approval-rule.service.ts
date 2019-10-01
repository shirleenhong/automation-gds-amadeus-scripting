import { Injectable } from '@angular/core';
import { PnrService } from '../pnr.service';
import { DDBService } from '../ddb.service';

import { SegmentTypeEnum } from 'src/app/enums/segment-type';
import { ApprovalItem } from 'src/app/models/ddb/approval.model';

@Injectable({
  providedIn: 'root'
})
export class ApprovalRuleService {
  constructor(private ddbService: DDBService, private pnrService: PnrService) {}

  /**
   * Check if the PNR needs to be approved based on conditions.
   */
  private needsApproval(): boolean {
    const remarksValid =
      this.pnrService.getRemarkText('CB/QUE/QUE FOR TICKET') === '' ||
      this.pnrService.getRemarkText('U86/-OVERRIDE ESC') === '' ||
      this.pnrService.getRemarkText('EB/') === '';

    const segmentValid = this.pnrService.getSegmentTatooNumber().find((seg) => seg.segmentType === 'AIR' && seg.status === 'GK')
      ? false
      : true;

    const description = ['-ONHOLD', '-CHG', '-FEE-No Approval Required'];
    const ticketingValid = description.indexOf(this.pnrService.getTkLineDescription()) > -1 ? false : true;

    return remarksValid && segmentValid && ticketingValid;
  }

  /**
   * Spliiter for multiple rules/conditions
   * @param remark approval desc from API
   */
  private getMultipleConditions(remark: string): Array<string> {
    return remark.split('[OR]');
  }

  /**
   * check if the set rules of approval in the DB is valid in the pnr
   */
  public hasApproval() {
    if (this.needsApproval()) {
      const approvalItems = this.ddbService.approvalList.filter(
        (app) => app.approvalResult === 'EXCLUDE' || app.approvalResult === 'INCLUDE'
      );
      const appGroup = approvalItems.filter((a) => a.getRuleText().indexOf('[GROUP_') >= 0);
      const appNoGroup = approvalItems.filter((a) => a.getRuleText().indexOf('[GROUP_') === -1);
      if (appGroup.length > 0) {
        return this.isValidRule(appNoGroup) && this.isValidGroup(appGroup);
      } else {
        return this.isValidRule(appNoGroup);
      }
    }
    return false;
  }

  isValidGroup(approvalItems) {
    let ctr = 1;
    let hasGroup = true;
    while (hasGroup) {
      const list = approvalItems.filter((a) => a.getRuleText().indexOf('[GROUP_' + ctr) >= 0);
      hasGroup = list.length > 0;
      if (hasGroup) {
        if (this.isValidRule(list)) {
          return true;
        }
      }
      ctr += 1;
    }
    return false;
  }

  isValidRule(approvalItems: ApprovalItem[]): boolean {
    for (const approval of approvalItems) {
      let valid = false;
      switch (approval.getRule()) {
        case '[REMARKS_EXISTS]':
          valid = this.isRemarkExistValid(approval);
          break;
        case '[SEGMENT_TYPE]':
          valid = this.isSegmentTypeValid(approval);
          break;
        case '[FOP]':
          valid = this.isFopValid(approval);
          break;
        case '[ROUTE]':
          valid = this.isRouteValid(approval);
          break;
        case '[DEPARTURE]':
          valid = this.isDepartureDateValid(approval);
          break;
      }

      if (!valid) {
        return false;
      }
    }
    return approvalItems.length > 0;
  }

  isRemarkExistValid(app: ApprovalItem) {
    const multiremarks = this.getMultipleConditions(app.getRuleText());
    for (const rem of multiremarks) {
      const val = rem.split('|');
      if (val.length > 1) {
        let found = false;
        if (val[0].indexOf('RM') === 0) {
          found = this.pnrService.getRemarkText(val[1]) !== '';
        } else if (val[0].indexOf('RIR') === 0) {
          found = this.pnrService.getRirRemarkText(val[1]) !== '';
        }
        found = this.getApprovalValidResult(app, found);
        if (found) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * check FOP vendor code and last digit number if matched in the PNR
   * @param app approval item
   */
  isFopValid(app: ApprovalItem) {
    let valid = false;
    const fop = this.pnrService.getFopElements();
    const regex = /([A-Z]{2})(?<vendor>[A-Z]{2})(?<cardNo>(.*))\/-EXP-(?<exp>([0-9]{4}))/g;
    const match = regex.exec(fop);
    let vendorCode = '';
    let ccNo;
    if (match !== null) {
      vendorCode = match.groups.vendor;
      ccNo = match.groups.cardNo;
      //   const expDate = match.groups.exp.substr(0, 2) + '/' + match.groups.exp.substr(2, 2);
    }
    const multiremarks = this.getMultipleConditions(app.getRuleText());
    for (const rem of multiremarks) {
      if (vendorCode !== '') {
        const noKeywordValue = app.getRuleValueText(rem);
        if (rem.indexOf('[NOT]') > -1) {
          valid = vendorCode !== noKeywordValue;
        } else if (rem.indexOf('[LAST_DIGIT]') > -1) {
          valid = ccNo.endsWith(noKeywordValue);
        } else {
          valid = vendorCode === noKeywordValue;
        }

        valid = this.getApprovalValidResult(app, valid);
        if (valid) {
          return true;
        }
      }
    }
    return false;
  }

  getApprovalValidResult(app: ApprovalItem, valid: boolean): boolean {
    if (valid) {
      return app.approvalResult === 'INCLUDE';
    } else {
      return app.approvalResult === 'EXCLUDE';
    }
  }

  /**
   * check condition for segment type rule
   */
  isSegmentTypeValid(app: ApprovalItem) {
    const multiremarks = this.getMultipleConditions(app.getRuleText());
    const segmentList = this.pnrService.getSegmentTatooNumber();
    for (const rem of multiremarks) {
      const type = SegmentTypeEnum[app.getRuleValueText(rem).toUpperCase()];
      let valid = false;
      const segments = segmentList.filter((seg) => seg.segmentType === type);
      if (rem.indexOf('[NO]') >= 0) {
        valid = segments.length === 0;
      } else if (rem.indexOf('[ONLY]') >= 0) {
        valid = segments.length === segmentList.length;
      } else {
        valid = segments.length > 0;
      }
      valid = this.getApprovalValidResult(app, valid);
      if (valid) {
        return true;
      }
    }
    return false;
  }

  /**
   * check if the desired condition is Transborder, Internatuibal or Domestic
   */
  isRouteValid(app: ApprovalItem) {
    let valid = false;
    const multiremarks = this.getMultipleConditions(app.getRuleText());
    const route = this.ddbService.isPnrTransBorder() ? 'TRA' : this.ddbService.isPnrDomestic() ? 'DOM' : 'INT';
    for (const rem of multiremarks) {
      const noKeywordValue = app
        .getRuleValueText(rem)
        .substr(0, 3)
        .toUpperCase();
      valid = rem.indexOf('[NOT]') > -1 ? !(noKeywordValue === route) : noKeywordValue === route;
      valid = this.getApprovalValidResult(app, valid);
      if (valid) {
        return true;
      }
    }
    return false;
  }

  isDepartureDateValid(app: ApprovalItem) {
    let valid = false;
    const multiremarks = this.getMultipleConditions(app.getRuleText());
    for (const rem of multiremarks) {
      const firstAirSegment = this.pnrService.getSegmentTatooNumber().filter((x) => x.segmentType === 'AIR');
      if (firstAirSegment) {
        const dtNow = new Date();
        const depdate = new Date(firstAirSegment[0].departureDate);
        const diffDays = depdate.getDate() - dtNow.getDate();
        valid = diffDays.toString() === rem.replace('days', '');
        valid = this.getApprovalValidResult(app, valid);
        if (valid) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * check if the set condition for UDID is in the PNR
   * @param app ApprovalItem
   */
  isUdidValid(app: ApprovalItem) {
    let valid = false;
    const multiremarks = this.getMultipleConditions(app.getRuleText());
    for (const rem of multiremarks) {
      valid = this.pnrService.getRemarkText('U' + rem.replace('|', '/-')) !== '';
      valid = this.getApprovalValidResult(app, valid);
      if (valid) {
        return true;
      }
    }
    return false;
  }

  getSecondaryApprovalList(index?: string): ApprovalItem[] {
    return this.ddbService.approvalList.filter((x) => x.approvalRules.indexOf('[UI_SECONDARY' + (index ? index : '_1')) === 0);
  }

  getAdditionalList(): ApprovalItem[] {
    return this.ddbService.approvalList.filter((x) => x.approvalRules.indexOf('[UI_ADDITIONAL_') === 0);
  }

  getPrimaryApprovalList(): ApprovalItem[] {
    return this.ddbService.approvalList.filter((x) => x.approvalRules.indexOf('[UI_PRIMARY') === 0);
  }

  getWriteApproval(index?: string): ApprovalItem[] {
    return this.ddbService.approvalList.filter((x) => x.approvalRules.indexOf('[WRITE_REMARK' + (index ? index : '_1')) === 0);
  }
  getDeleteRemarkApproval(index?: string): ApprovalItem[] {
    return this.ddbService.approvalList.filter((x) => x.approvalRules.indexOf('[DELETE_REMARK' + (index ? index : '_1')) === 0);
  }

  getQueueApproval(index?: string): ApprovalItem[] {
    return this.ddbService.approvalList.filter((x) => x.approvalRules.indexOf('QUEUE' + (index ? index : '_1')) > -1);
  }

  getTicketApproval(index?: string): ApprovalItem[] {
    return this.ddbService.approvalList.filter((x) => x.approvalRules.indexOf('TICKET' + (index ? index : '_1')) > -1);
  }

  getApprovalItem(keyword: string): ApprovalItem[] {
    return this.ddbService.approvalList.filter((x) => x.approvalRules.indexOf(keyword) === 0);
  }
}
