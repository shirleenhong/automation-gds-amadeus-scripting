import { Injectable } from '@angular/core';
import { RemarksManagerService } from './remarks-manager.service';
import { FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { RemarkModel } from 'src/app/models/pnr/remark.model';
import { RemarkHelper } from 'src/app/helper/remark-helper';
import { AmadeusQueueService } from '../amadeus-queue.service';
import { QueuePlaceModel } from 'src/app/models/pnr/queue-place.model';

@Injectable({
  providedIn: 'root'
})
export class CorpCancelRemarkService {
  constructor(private remarksManager: RemarksManagerService, private remarkHelper: RemarkHelper, private queService: AmadeusQueueService) {}

  WriteNonBspTicketCredit(group: FormGroup) {
    const curDate = formatDate(new Date(), 'ddMMM', 'en-US');
    const remarkList = new Array<RemarkModel>();
    if (group.get('hasU14').value) {
      if (group.get('isReCredit').value === 'N') {
        this.createRemarks(['VendorName', 'BackOfficeAgentIdentifier'], [group.get('vendor').value, group.get('officeId').value]);
        this.createRemarks(
          ['CurrentDate', 'CounselorLastName', 'CounselorFirstName'],
          [curDate, group.get('lastName').value, group.get('firstName').value]
        );

        this.createRemarks(
          ['PartialFull', 'CurrentDate'],
          [group.get('partialFull').value === 'full' ? 'FULL' : 'PART', curDate],
          'ATTN ACCTNG - NONBSP'
        );

        if (group.get('partialFull').value !== 'full') {
          this.createRemarks(['BaseAmt', 'Gst', 'Tax'], [group.get('baseAmount').value, group.get('gst').value, group.get('tax').value]);
          this.createRemarks(['Commission'], [group.get('commission').value]);
          if (group.get('freeFlow1').value) {
            remarkList.push(this.remarkHelper.createRemark(group.get('freeFlow1').value, 'RM', 'X'));
          }
          if (group.get('freeFlow2').value) {
            remarkList.push(this.remarkHelper.createRemark(group.get('freeFlow2').value, 'RM', 'X'));
          }
        }
        return { remarks: remarkList, commands: ['BT'] };
      }
    } else {
      this.createRemarks(['CurrentDate', 'DocTicketNum'], [curDate, group.get('ticketNum').value]);
    }
    this.queueNonBspTicketCredit();
    return null;
  }

  private queueNonBspTicketCredit() {
    this.queService.addQueueCollection(new QueuePlaceModel('YTOWL210O', 41, 98));
    this.queService.addQueueCollection(new QueuePlaceModel('YTOWL210E', 60, 1));
  }

  private createRemarks(keys, values, statictext?) {
    const map = new Map<string, string>();
    keys.forEach((key, i) => {
      map.set(key, values[i]);
    });
    this.remarksManager.createPlaceholderValues(map, null, null, null, statictext);
  }
}
