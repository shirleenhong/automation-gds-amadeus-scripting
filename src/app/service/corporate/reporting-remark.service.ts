import { Injectable } from '@angular/core';
import { RemarksManagerService } from './remarks-manager.service';
import { PnrService } from '../pnr.service';
import { FormGroup, FormArray } from '@angular/forms';
import { ReportingBSPComponent } from 'src/app/corporate/reporting/reporting-bsp/reporting-bsp.component';
import { ReportingNonbspComponent } from 'src/app/corporate/reporting/reporting-nonbsp/reporting-nonbsp.component';
import { WaiversComponent } from 'src/app/corporate/reporting/waivers/waivers.component';
import { ReportingViewModel } from 'src/app/models/reporting-view.model';
import { RemarkGroup } from 'src/app/models/pnr/remark.group.model';
import { RemarkModel } from 'src/app/models/pnr/remark.model';
@Injectable({
  providedIn: 'root'
})
export class ReportingRemarkService {
  hasTransborder: boolean;

  constructor(private remarksManager: RemarksManagerService, private pnrService: PnrService) {}

  WriteBspRemarks(rbc: ReportingBSPComponent) {
    const bspGroup: FormGroup = rbc.bspGroup;
    const items = bspGroup.get('fares') as FormArray;
    this.writeHighLowFare(items, false);
  }

  WriteNonBspRemarks(nrbc: ReportingNonbspComponent) {
    const nbspGroup: FormGroup = nrbc.nonBspGroup;
    const items = nbspGroup.get('nonbsp') as FormArray;
    this.writeHighLowFare(items, true);
  }

  private writeHighLowFare(items: any, write: boolean) {
    for (const group of items.controls) {
      if (group.get('chkIncluded').value === true || write) {
        const highFareRemark = new Map<string, string>();
        const lowFareRemark = new Map<string, string>();
        const airReasonCodeRemark = new Map<string, string>();
        const segments: string[] = group.get('segment').value.split(',');
        const segmentrelate: string[] = this.getRemarkSegmentAssociation(segments);

        highFareRemark.set('CAAirHighFare', group.get('highFareText').value);
        lowFareRemark.set('CAAirLowFare', group.get('lowFareText').value);
        const output = group.get('reasonCodeText').value.split(':');
        airReasonCodeRemark.set('CAAirRealisedSavingCode', output[0].trim());

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

  WriteEscOFCRemark(value: string) {
    this.remarksManager.createEmptyPlaceHolderValue(['CAOverrideValue']);
    if (value !== '') {
      const escOfc = new Map<string, string>();
      escOfc.set('CAOverrideValue', value);
      this.remarksManager.createPlaceholderValues(escOfc);
    }
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

  WriteU63(wc: WaiversComponent) {
    const bspGroup: FormGroup = wc.ticketedForm;
    const items = bspGroup.get('segments') as FormArray;

    for (const control of items.controls) {
      if (control instanceof FormGroup) {
        const fg = control as FormGroup;
        const waiverRemark = new Map<string, string>();

        const segments: string[] = [];
        let segmentrelate: string[] = [];

        Object.keys(fg.controls).forEach((key) => {
          if (key === 'segment') {
            fg.get(key)
              .value.split(',')
              .forEach((val) => {
                segments.push(val);
              });

            segmentrelate = this.getRemarkSegmentAssociation(segments);
          }

          if (key === 'waiver') {
            if (fg.get(key).value !== null && fg.get(key).value !== '') {
              waiverRemark.set('WaiverLine', fg.get(key).value);
            }
          }
        });

        this.remarksManager.createPlaceholderValues(waiverRemark, null, segmentrelate);
      }
    }
  }
  public GetRoutingRemark(reporting: ReportingViewModel) {
    const rmGroup = new RemarkGroup();
    rmGroup.group = 'Routing';
    rmGroup.remarks = new Array<RemarkModel>();
    rmGroup.deleteRemarkByIds = new Array<string>();
    this.getFSRemarks(reporting, rmGroup);
    return rmGroup;
  }
  getFSRemarks(reporting: ReportingViewModel, rmGroup: RemarkGroup) {
    if (reporting.routeCode == null) {
      return;
    }
    const remText = reporting.routeCode + '' + reporting.tripType;
    rmGroup.remarks.push(this.getRemark(remText, 'FS', ''));

    const existNumber = this.pnrService.getFSLineNumber();
    if (existNumber !== '') {
      rmGroup.deleteRemarkByIds.push(existNumber);
    }
  }
  getRemark(remarkText, remarkType, remarkCategory) {
    const rem = new RemarkModel();
    rem.remarkType = remarkType;
    rem.remarkText = remarkText;
    rem.category = remarkCategory;
    return rem;
  }
}
