import { Component, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { ReportingBSPComponent } from './reporting-bsp/reporting-bsp.component';
import { UtilHelper } from 'src/app/helper/util.helper';
import { ReportingNonbspComponent } from './reporting-nonbsp/reporting-nonbsp.component';
import { AquaTicketingComponent } from '../ticketing/aqua-ticketing/aqua-ticketing.component';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss']
})
export class ReportingComponent implements OnInit {
  @ViewChild(ReportingBSPComponent) reportingBSPComponent: ReportingBSPComponent;
  @ViewChild(ReportingNonbspComponent) reportingNonbspComponent: ReportingNonbspComponent;
  @ViewChild(AquaTicketingComponent) aquaTicketingComponent: AquaTicketingComponent;

  hasTst: boolean;
  constructor(private utilHelper: UtilHelper, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.hasTst = true;
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

    return true;
  }
}
