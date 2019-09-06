import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportingBSPComponent } from './reporting-bsp/reporting-bsp.component';
import { UtilHelper } from 'src/app/helper/util.helper';
import { ReportingNonbspComponent } from './reporting-nonbsp/reporting-nonbsp.component';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss']
})
export class ReportingComponent implements OnInit {
  @ViewChild(ReportingBSPComponent) reportingBSPComponent: ReportingBSPComponent;
  @ViewChild(ReportingNonbspComponent) reportingNonbspComponent: ReportingNonbspComponent;

  constructor(private utilHelper: UtilHelper) { }

  ngOnInit() { }

  checkValid() {
    this.utilHelper.validateAllFields(this.reportingBSPComponent.bspGroup);
    if (!this.reportingBSPComponent.bspGroup.valid) {
      return false;
    }

    this.utilHelper.validateAllFields(this.reportingNonbspComponent.nonBspGroup);
    if (!this.reportingNonbspComponent.nonBspGroup.valid) {
      return false;
    }

    return true;
  }
}
