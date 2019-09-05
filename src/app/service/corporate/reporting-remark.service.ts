import { Injectable } from '@angular/core';
import { RemarksManagerService } from './remarks-manager.service';
import { PnrService } from '../pnr.service';
import { FormGroup, FormArray } from '@angular/forms';
import { ReportingBSPComponent } from 'src/app/corporate/reporting/reporting-bsp/reporting-bsp.component';

@Injectable({
  providedIn: 'root'
})
export class ReportingRemarkService {
  constructor(private remarksManager: RemarksManagerService, private pnrService: PnrService) {}

  WriteBspRemarks(rbc: ReportingBSPComponent) {
    this.WriteFareRemarks(rbc.bspGroup);
  }

  WriteFareRemarks(bspGroup: FormGroup) {
    const items = bspGroup.get('fares') as FormArray;

    for (const group of items.controls) {
      const highFareRemark = new Map<string, string>();
      const lowFareRemark = new Map<string, string>();
      const airReasonCodeRemark = new Map<string, string>();
      const segments: string[] = group.get('segment').value.split(',');
      const segmentrelate: string[] = this.getRemarkSegmentAssociation(segments);

      highFareRemark.set('CAAirHighFare', group.get('highFareText').value);
      lowFareRemark.set('CAAirLowFare', group.get('lowFareText').value);
      const output = group.get('reasonCodeText').value.split(':');
      airReasonCodeRemark.set('CAAirRealisedSavingCode', output[0].trim());

      if (group.get('chkIncluded').value === true) {
        this.remarksManager.createPlaceholderValues(highFareRemark, null, segmentrelate);
        this.remarksManager.createPlaceholderValues(lowFareRemark, null, segmentrelate);
        this.remarksManager.createPlaceholderValues(airReasonCodeRemark, null, segmentrelate);
      }
    }
  }

  getRemarkSegmentAssociation(segments: string[]): string[] {
    const segmentrelate: string[] = [];
    const air = this.pnrService.getSegmentTatooNumber().filter((x) => x.segmentType === 'AIR' && segments.indexOf(x.lineNo) >= 0);
    air.forEach((airElement) => {
      segmentrelate.push(airElement.tatooNo);
    });

    return segmentrelate;
  }
}
