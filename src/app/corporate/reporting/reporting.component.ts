import { Component, ChangeDetectorRef, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { ReportingBSPComponent } from './reporting-bsp/reporting-bsp.component';
import { UtilHelper } from 'src/app/helper/util.helper';
import { ReportingNonbspComponent } from './reporting-nonbsp/reporting-nonbsp.component';
import { AquaTicketingComponent } from '../ticketing/aqua-ticketing/aqua-ticketing.component';
import { MatrixReportingComponent } from './matrix-reporting/matrix-reporting.component';
import { WaiversComponent } from 'src/app/corporate/reporting/waivers/waivers.component';
import { ReportingRemarksComponent } from './reporting-remarks/reporting-remarks.component';
import { PnrService } from '../../service/pnr.service';
import { CarSavingsCodeComponent } from './car-savings-code/car-savings-code.component';
import {HotelSegmentsComponent} from './hotel-segments/hotel-segments.component'
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
  @ViewChild(CarSavingsCodeComponent) carSavingsCodeComponent: CarSavingsCodeComponent;
  hasTst: boolean;
  showHotelsTab: boolean;
  @Input() reportingRemarksView: any;
  @ViewChild(WaiversComponent) waiversComponent: WaiversComponent;
  @ViewChild(HotelSegmentsComponent) hotelSegmentsComponent: HotelSegmentsComponent;

  constructor(private utilHelper: UtilHelper, private cdr: ChangeDetectorRef , private pnrService: PnrService) {}

  ngOnInit() {
    this.hasTst = true;
    this.reportingRemarksView = this.reportingRemarksComponent.reportingRemarksView;
    let segments = this.pnrService.getSegmentList();
    segments = segments.filter(function (x) { if (x.segmentType === 'HTL') { return x; } })
    this.showHotelsTab = segments.length > 0 ? true : false;
    
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
    this.utilHelper.validateAllFields(this.carSavingsCodeComponent.carSavingsCodeGroup);
    if (!this.carSavingsCodeComponent.carSavingsCodeGroup.valid) {
      return false;
    }
    if (this.hotelSegmentsComponent!==undefined) {
      this.utilHelper.validateAllFields(this.hotelSegmentsComponent.hotelSegments);
      if (!this.hotelSegmentsComponent.hotelSegments.valid) {
        return false;
      }
    }
    return true;
  }
}
