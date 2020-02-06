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
import { HotelSegmentsComponent } from './hotel-segments/hotel-segments.component';
import { ContainerComponent } from '../business-rules/container/container.component';
import { AccountingRemarkComponent } from '../payments/accounting-remark/accounting-remark.component';
import { RulesEngineService } from 'src/app/service/business-rules/rules-engine.service';

import { ServicingOptionEnums } from 'src/app/enums/servicing-options.enum';
import { DDBService } from 'src/app/service/ddb.service';
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
  @ViewChild(ContainerComponent) containerComponent: ContainerComponent;
  @ViewChild(AccountingRemarkComponent) accountingComponent: AccountingRemarkComponent;
  hasRules = false;
  components = [];
  showCarSavingsTab: boolean;
  hotelShowMissedSavingsSO: any;
  isHotelSavingsCodeSo: boolean;

  constructor(
    private utilHelper: UtilHelper,
    private cdr: ChangeDetectorRef,
    private pnrService: PnrService,
    private rulesEngineService: RulesEngineService,
    private ddbService: DDBService
  ) {}

  ngOnInit() {
    this.hasRules = this.rulesEngineService.checkRuleResultExist('UI_DISPLAY_CONTAINER', 'REPORTING');
    this.hasTst = true;
    this.reportingRemarksView = this.reportingRemarksComponent.reportingRemarksView;
    this.showCarSavingsTab = this.ddbService.getServicingOptionValue(ServicingOptionEnums.Car_Show_Missed_Savings).ServiceOptionItemValue;
    this.showHotelTab();
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
      this.reportingNonbspComponent.processed = false;
      return false;
    } else {
      this.reportingNonbspComponent.processed = true;
    }

    this.utilHelper.validateAllFields(this.reportingRemarksComponent.reportingForm);
    if (!this.reportingRemarksComponent.reportingForm.valid) {
      return false;
    }
    this.utilHelper.validateAllFields(this.carSavingsCodeComponent.carSavingsCodeGroup);
    if (!this.carSavingsCodeComponent.carSavingsCodeGroup.valid) {
      return false;
    }
    if (this.hotelSegmentsComponent !== undefined) {
      this.utilHelper.validateAllFields(this.hotelSegmentsComponent.hotelSegments);
      if (!this.hotelSegmentsComponent.hotelSegments.valid) {
        return false;
      }
    }

    if (this.containerComponent) {
      this.utilHelper.validateAllFields(this.containerComponent.containerForm);
      if (!this.containerComponent.containerForm.valid) {
        return false;
      }
    }
    return true;
  }

  showHotelTab() {
    this.hotelShowMissedSavingsSO = this.ddbService.getServicingOptionValue(ServicingOptionEnums.Hotel_Show_Missed_Savings);
    if (
      this.hotelShowMissedSavingsSO.ServiceOptionItemValue !== undefined &&
      this.hotelShowMissedSavingsSO.ServiceOptionItemValue === 'Yes'
    ) {
      let segments = this.pnrService.getSegmentList();
      segments = segments.filter((x) => {
        if (x.segmentType === 'HTL') {
          return x;
        }
      });
      this.showHotelsTab = segments.length > 0 ? true : false;
    } else {
      this.showHotelsTab = false;
    }
  }
}
