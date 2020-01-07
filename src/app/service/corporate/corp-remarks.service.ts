import { Injectable } from '@angular/core';
import { RemarksManagerService } from 'src/app/service/corporate/remarks-manager.service';
import { SeatModel } from 'src/app/models/pnr/seat.model';
import { PnrService } from '../pnr.service';
import { IrdModel } from 'src/app/models/pnr/ird-remark.model';
import { IrdRemarksComponent } from 'src/app/corporate/corp-remarks/ird-remarks/ird-remarks.component';
import { FormGroup, FormArray } from '@angular/forms';
import { RemarkModel } from 'src/app/models/pnr/remark.model';
import { RemarkHelper } from 'src/app/helper/remark-helper';

@Injectable({
  providedIn: 'root'
})
export class CorpRemarksService {
  constructor(
    private remarksManagerService: RemarksManagerService,
    private pms: PnrService,
    private rms: RemarksManagerService,
    private remarkHelper: RemarkHelper
  ) { }

  /**
   * US11820: Write or prepare the seats for the PNR
   * based on specific conditions. See US11820.
   *
   * @param seats Array<SeatModel>
   * @return void
   */
  public writeSeatRemarks(seats: Array<SeatModel>): void {
    for (const seat of seats) {
      // Work-around: explicitly cast seat.id to number
      seat.id = parseFloat(seat.id.toString());

      const segments = seat.segmentIds.split(',');

      for (const segment of segments) {
        const seatMap = new Map<string, string>();
        const tatooNumber = this.pms.getTatooNumberFromSegmentNumber(new Array(segment));

        if (seat.id === 1) {
          //
          seatMap.set('CASeatRule', 'ONLINECHECKIN');
          this.remarksManagerService.createPlaceholderValues(null, seatMap, tatooNumber, null, 'SEATING SUBJECT TO');
          // tslint:disable-next-line: max-line-length
          this.remarksManagerService.createPlaceholderValues(null, seatMap, tatooNumber, null, 'AIRPORT OR ONLINE CHECK IN');
          //
        } else if (seat.id === 2) {
          seatMap.set('CASeatRule', 'PREFERRED');
          if (seat.type) {
            const seatType = new Map<string, string>();
            seatType.set('CaSeatType', seat.type);
            this.remarksManagerService.createPlaceholderValues(seatType, seatMap, tatooNumber, null, 'PREFERRED SEAT UNAVAILABLE');
          } else {
            this.remarksManagerService.createPlaceholderValues(null, seatMap, tatooNumber, null, 'PREFERRED SEAT UNAVAILABLE');
          }

          this.remarksManagerService.createPlaceholderValues(null, seatMap, tatooNumber, null, 'PLEASE CHECK AGAIN AT THE GATE');
          //
        } else if (seat.id === 3) {
          //
          seatMap.set('CASeatRule', 'WAITLISTED');
          this.remarksManagerService.createPlaceholderValues(null, seatMap, tatooNumber, null, 'THIS SEGMENT HAS BEEN WAITLISTED');
          //
        } else if (seat.id === 4) {
          //
          seatMap.set('CASeatRule', 'REQUEST');
          this.remarksManagerService.createPlaceholderValues(null, seatMap, tatooNumber, null, 'SEAT ASSIGNMENTS ARE ON REQUEST');
          //
        } else if (seat.id === 5) {
          //
          seatMap.set('CASeatRule', 'CONFIRMED');
          const seatConfirmed = new Map<string, string>();
          seatConfirmed.set('CaUPFIB', seat.number);
          this.remarksManagerService.createPlaceholderValues(seatConfirmed, null, tatooNumber);
          this.remarksManagerService.createPlaceholderValues(null, seatMap, tatooNumber, null, 'UPGRADE CONFIRMED');
          //
        } else if (seat.id === 6) {
          //
          seatMap.set('CASeatRule', 'CLEARANCE');
          this.remarksManagerService.createPlaceholderValues(null, seatMap, tatooNumber, null, 'UPGRADE REQUESTED');
          this.remarksManagerService.createPlaceholderValues(
            null,
            seatMap,
            tatooNumber,
            null,
            'CHK CLEARANCE WITH AIRLINE OR AIRLINE WEBSITE'
          );
          //
        }
      }
    }
  }
  public getIrdInformation(): Array<IrdModel> {
    let model = new IrdModel();
    const irdRemarksModel = new Array<IrdModel>();
    for (const rm of this.pms.pnrObj.rmElements) {
      let regex = /----------CWT IRD RATE NBR(?<nbrNo>.*)-------(?<irdStatus>.*)/g;
      let match = regex.exec(rm.freeFlowText);
      if (match) {
        model.irdNumber = match.groups.nbrNo;
        model.status = match.groups.irdStatus;
      }

      regex = /--------IRD SAVINGS ACHIEVED\s(?<irdCurrency>.*)\s(?<irdSavings>.*)\s--------/g;
      match = regex.exec(rm.freeFlowText);
      if (match) {
        model.currency = match.groups.irdCurrency;
        model.irdSavings = match.groups.irdSavings;
      }

      regex = /-----LOW FARE OPTION SAVINGS ACHIEVED\s(?<lowFareSavings>.*)---/g;
      match = regex.exec(rm.freeFlowText);
      if (match) {
        model.lowSavings = match.groups.lowFareSavings;
        irdRemarksModel.push(model);
        model = new IrdModel();
      }
    }
    return irdRemarksModel;
  }
  private getHeader(): string {
    for (const rm of this.pms.pnrObj.rmElements) {
      const regex = /\*\* IRD WORKING \*\*\s(?<irdHeader>.*)/g;
      const match = regex.exec(rm.freeFlowText);
      if (match) {
        return match.groups.irdHeader;
      }
    }
    return '';
  }
  public writeIrdRemarks(ird: IrdRemarksComponent): void {
    const irdGroup: FormGroup = ird.irdGroup;
    const items = irdGroup.get('irdItems') as FormArray;
    let status = '';

    const headerIrd = this.getHeader();
    if (headerIrd) {
      const header = new Map<string, string>();
      header.set('IrdHeader', headerIrd);
      this.rms.createPlaceholderValues(header);
    }

    for (const group of items.controls) {
      const nbrStatus = new Map<string, string>();
      const irdSavings = new Map<string, string>();
      const lowFareSavings = new Map<string, string>();

      if (group.get('lowSavingStatus').value) {
        status = group.get('lowSavingStatus').value;
      } else {
        status = group.get('irdStatus').value;
      }

      status = status.indexOf('DECLINED') > -1 ? 'DECLINED' : status;
      nbrStatus.set('NbrNo', group.get('irdNumber').value);
      nbrStatus.set('IrdStatus', status);
      irdSavings.set('IrdCurrency', group.get('currency').value);
      irdSavings.set('IrdSavings', group.get('irdSavings').value);
      lowFareSavings.set('LowFareSavings', group.get('lowSavings').value);

      this.rms.createPlaceholderValues(nbrStatus);
      this.rms.createPlaceholderValues(irdSavings);
      this.rms.createPlaceholderValues(lowFareSavings);
    }
  }

  public buildDocumentRemarks(group: FormGroup): Array<RemarkModel> {
    let remText = '';
    const remarkList = new Array<RemarkModel>();

    const arr = group.get('items') as FormArray;
    for (const c of arr.controls) {
      remText = c.get('documentation').value;
      if (remText) {
        remarkList.push(this.remarkHelper.createRemark(remText, 'RM', 'G'));
      }
    }
    return remarkList;
  }
}
