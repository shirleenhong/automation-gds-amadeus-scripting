import { Component, ChangeDetectorRef, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { ReportingBSPComponent } from './reporting-bsp/reporting-bsp.component';
import { UtilHelper } from 'src/app/helper/util.helper';
import { ReportingNonbspComponent } from './reporting-nonbsp/reporting-nonbsp.component';
import { AquaTicketingComponent } from '../ticketing/aqua-ticketing/aqua-ticketing.component';
import { MatrixReportingComponent } from './matrix-reporting/matrix-reporting.component';
import { WaiversComponent } from 'src/app/corporate/reporting/waivers/waivers.component';
import { ReportingRemarksComponent } from './reporting-remarks/reporting-remarks.component';
@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss']
})
export class ReportingComponent implements OnInit, AfterViewInit {
  @ViewChild(ReportingBSPComponent) reportingBSPComponent: ReportingBSPComponent;
  @ViewChild(ReportingNonbspComponent) reportingNonbspComponent: ReportingNonbspComponent;
  @ViewChild(AquaTicketingComponent) aquaTicketingComponent: AquaTicketingComponent;
  @ViewChild(MatrixReportingComponent) matrixReportingComponent: MatrixReportingComponent;
  @ViewChild(ReportingRemarksComponent) reportingRemarksComponent: ReportingRemarksComponent;
  hasTst: boolean;
  @Input() overrideValue: any;
  @Input() reportingRemarksView: any;
  @ViewChild(WaiversComponent) waiversComponent: WaiversComponent;
  constructor(private utilHelper: UtilHelper, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.hasTst = true;
    this.reportingRemarksView = this.reportingRemarksComponent.reportingRemarksView;
  }
  ngAfterViewInit() {
    this.hasTst = this.reportingBSPComponent.hasTst;
    this.cdr.detectChanges();
  }

  checkValid() {
    if (this.reportingBSPComponent !== undefined) {
      this.utilHelper.validateAllFields(this.reportingBSPComponent.bspGroup);
      if (!this.reportingBSPComponent.bspGroup.valid) {
        return false;
      }
    }
    this.utilHelper.validateAllFields(this.reportingNonbspComponent.nonBspGroup);
    if (!this.reportingNonbspComponent.nonBspGroup.valid) {
      return false;
    }
    this.utilHelper.validateAllFields(this.reportingRemarksComponent.reportingForm);
    if (!this.reportingRemarksComponent.reportingForm.valid) {
      return false;
    }
    return true;
  }
}
