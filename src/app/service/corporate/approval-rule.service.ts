import { Injectable } from '@angular/core';
import { PnrService } from '../pnr.service';
import { DDBService } from '../ddb.service';

import { SegmentTypeEnum } from 'src/app/enums/segment.enum';
import { ApprovalItem } from 'src/app/models/ddb/approval.model';

@Injectable({
  providedIn: 'root'
})
export class ApprovalRuleService {
  reasonCodes = [];
  constructor(private ddbService: DDBService, private pnrService: PnrService) {}

  /**
   * Check if the PNR needs to be approved based on conditions.
   */
  private needsApproval(): boolean {
    const remarksValid =
      this.pnrService.getRemarkText('CB/QUE/QUE FOR TICKET') === '' &&
      this.pnrService.getRemarkText('U86/-OVERRIDE ESC') === '' &&
      this.pnrService.getRemarkText('EB/') === '';

    const segmentValid = this.pnrService.getSegmentList().find((seg) => seg.segmentType === 'AIR' && seg.status === 'GK') ? false : true;

    const description = ['-ONHOLD', '-CHG', '-FEE-No Approval Required', '-CXL'];
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
  public hasApproval(_reasonCodes) {
    this.reasonCodes = _reasonCodes;
    if (this.needsApproval()) {
      const approvalItems = this.ddbService.approvalList.filter(
        (app) => app.approvalResult === 'EXCLUDE' || app.approvalResult === 'INCLUDE'
      );
      const appGroup = approvalItems.filter((a) => a.approvalRules.indexOf('[GROUP_') >= 0);
      const appNoGroup = approvalItems.filter((a) => a.approvalRules.indexOf('[GROUP_') === -1);
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
      const list = approvalItems.filter((a) => a.approvalRules.indexOf('[GROUP_' + ctr) >= 0);
      hasGroup = list.length > 0;
      if (hasGroup) {
        const valid = this.isValidRule(list, true);
        if (valid) {
          return this.getApprovalValidResult(list[0], valid);
        }
      }
      ctr += 1;
    }
    return ctr > 1;
  }

  isValidRule(approvalItems: ApprovalItem[], isGroup?): boolean {
    for (const approval of approvalItems) {
      let valid = false;
      switch (approval.approvalType) {
        case 'REMARKS_EXISTS':
          valid = this.isRemarkExistValid(approval);
          break;
        case 'SEGMENT_TYPE':
          valid = this.isSegmentTypeValid(approval);
          break;
        case 'FOP':
          valid = this.isFopValid(approval);
          break;
        case 'ROUTE':
          valid = this.isRouteValid(approval);
          break;
        case 'DEPARTURE':
          valid = this.isDepartureDateValid(approval);
          break;
      }
      if (!isGroup) {
        if (!this.getApprovalValidResult(approval, valid)) {
          return false;
        }
      } else {
        if (!valid) {
          return false;
        }
      }
    }
    return approvalItems.length > 0;
  }

  isRemarkExistValid(app: ApprovalItem) {
    let found = false;
    const multiremarks = this.getMultipleConditions(app.approvalRules);
    for (const rem of multiremarks) {
      const val = app.getRuleValueText(rem).split('|');
      if (val.length > 1) {
        if (val[0].indexOf('RM') >= 0) {
          found = this.pnrService.getRemarkText(val[1].trim()) !== '';
        } else if (val[0].indexOf('RIR') >= 0) {
          found = this.pnrService.getRirRemarkText(val[1].trim()) !== '';
        }

        if (!found && this.reasonCodes && val[1].trim().indexOf('FS/-') >= 0) {
          found = this.reasonCodes.filter((x) => 'FS/-' + x === val[1].trim()).length > 0;
        }

        if (found) {
          break;
        }
      }
    }
    return found;
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
    const multiremarks = this.getMultipleConditions(app.approvalRules);
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

        if (valid) {
          break;
        }
      }
    }
    return valid;
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
    let valid = false;
    const multiremarks = this.getMultipleConditions(app.approvalRules);
    const segmentList = this.pnrService.getSegmentList();
    for (const rem of multiremarks) {
      const type = SegmentTypeEnum[app.getRuleValueText(rem).toUpperCase()];
      const segments = segmentList.filter((seg) => seg.segmentType === type);
      if (rem.indexOf('[NO]') >= 0) {
        valid = segments.length === 0;
      } else if (rem.indexOf('[ONLY]') >= 0) {
        valid = segments.length === segmentList.length;
      } else {
        valid = segments.length > 0;
      }

      if (valid) {
        break;
      }
    }
    return valid;
  }

  /**
   * check if the desired condition is Transborder, Internatuibal or Domestic
   */
  isRouteValid(app: ApprovalItem) {
    let valid = false;
    const multiremarks = this.getMultipleConditions(app.approvalRules);
    const route = this.ddbService.isPnrTransBorder() ? 'TRA' : this.ddbService.isPnrDomestic() ? 'DOM' : 'INT';
    for (const rem of multiremarks) {
      const noKeywordValue = app
        .getRuleValueText(rem)
        .substr(0, 3)
        .toUpperCase();
      valid = rem.indexOf('[NOT]') > -1 ? !(noKeywordValue === route) : noKeywordValue === route;
      if (valid) {
        break;
      }
    }
    return valid;
  }

  isDepartureDateValid(app: ApprovalItem) {
    let valid = false;
    const multiremarks = this.getMultipleConditions(app.approvalRules);
    for (const rem of multiremarks) {
      const firstAirSegment = this.pnrService.getSegmentList().filter((x) => x.segmentType === 'AIR');
      const remValue = app.getRuleValueText(rem);
      if (firstAirSegment) {
        const dtNow = new Date();
        const dep = firstAirSegment[0].departureDate;
        const depdate = new Date(
          dep.substr(2, 2) +
            '/' +
            dep.substr(2, 2) +
            '/' +
            dtNow
              .getFullYear()
              .toString()
              .substr(0, 2) +
            dep.substr(4, 2)
        );

        const t2 = depdate.getTime();
        const t1 = dtNow.getTime();
        const diffDays = (t2 - t1) / (24 * 3600 * 1000);
        valid = diffDays >= parseInt(remValue.replace('days', ''), null);
        if (valid) {
          break;
        }
      }
    }
    return valid;
  }

  getSecondaryApprovalList(index?: string): ApprovalItem[] {
    return this.ddbService.approvalList.filter((x) => x.approvalType.indexOf('UI_SECONDARY' + (index ? index : '_1')) === 0);
  }

  getAdditionalList(): ApprovalItem[] {
    return this.ddbService.approvalList.filter((x) => x.approvalType.indexOf('UI_ADDITIONAL_') === 0);
  }

  getPrimaryApprovalList(): ApprovalItem[] {
    const primaryList = this.ddbService.approvalList.filter((x) => x.approvalType.indexOf('UI_PRIMARY') === 0);
    let ctr = 1;
    let done = false;
    let sortedList = [];
    while (!done) {
      const list = primaryList
        .filter((x) => x.approvalType.indexOf('UI_PRIMARY_' + ctr) === 0)
        .sort((a, b) => {
          if (a.approvalRules < b.approvalRules) {
            return -1;
          } else if (a.approvalRules > b.approvalRules) {
            return 1;
          } else {
            return 0;
          }
        });
      if (list && list.length > 0) {
        sortedList = sortedList.concat(list);
        ctr += 1;
      } else {
        done = true;
      }
    }
    return sortedList;
  }

  getWriteApproval(index?: string): ApprovalItem[] {
    return this.ddbService.approvalList.filter((x) => x.approvalType.indexOf('WRITE_REMARK' + (index ? index : '_1')) === 0);
  }
  getDeleteRemarkApproval(index?: string): ApprovalItem[] {
    return this.ddbService.approvalList.filter((x) => x.approvalType.indexOf('DELETE_REMARK' + (index ? index : '_1')) === 0);
  }

  getQueueApproval(index?: string): ApprovalItem[] {
    return this.ddbService.approvalList.filter((x) => x.approvalType.indexOf('QUEUE' + (index ? index : '_1')) > -1);
  }

  getTicketApproval(index?: string): ApprovalItem[] {
    return this.ddbService.approvalList.filter((x) => x.approvalType.indexOf('TICKET' + (index ? index : '_1')) > -1);
  }

  getApprovalItem(keyword: string): ApprovalItem[] {
    return this.ddbService.approvalList.filter((x) => x.approvalType.indexOf(keyword) === 0);
  }
}
