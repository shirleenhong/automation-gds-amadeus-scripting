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

    for (const control of items.controls) {
      if (control instanceof FormGroup) {
        const fg = control as FormGroup;
        const highFareRemark = new Map<string, string>();
        const lowFareRemark = new Map<string, string>();
        const airReasonCodeRemark = new Map<string, string>();
        const segments: string[] = [];
        let segmentrelate: string[] = [];
        let shouldWrite = false;

        Object.keys(fg.controls).forEach((key) => {
          if (key === 'segment') {
            fg.get(key)
              .value.split(',')
              .forEach((val) => {
                segments.push(val);
              });

            segmentrelate = this.getRemarkSegmentAssociation(segments);
          }

          if (key === 'chkIncluded') {
            shouldWrite = true;
          }

          if (key === 'highFareText') {
            highFareRemark.set('CAAirHighFare', fg.get(key).value);
          }
          if (key === 'lowFareText') {
            lowFareRemark.set('CAAirLowFare', fg.get(key).value);
          }
          if (key === 'reasonCodeText') {
            airReasonCodeRemark.set('CAAirRealisedSavingCode', fg.get(key).value);
          }
        });

        if (shouldWrite) {
          this.remarksManager.createPlaceholderValues(highFareRemark, null, segmentrelate);
          this.remarksManager.createPlaceholderValues(lowFareRemark, null, segmentrelate);
          this.remarksManager.createPlaceholderValues(airReasonCodeRemark, null, segmentrelate);
        }
      }
    }
  }

  getRemarkSegmentAssociation(segments: string[]): string[] {
    let segmentrelate: string[] = [];
    const air = this.pnrService.getSegmentTatooNumber().filter((x) => x.segmentType === 'AIR' && segments.indexOf(x.lineNo));

    air.forEach((airElement) => {
      segmentrelate.push(airElement.tatooNo);
    });

    return segmentrelate;
  }
}
