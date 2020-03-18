import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PnrService } from 'src/app/service/pnr.service';
import { HotelSegmentsComponent } from '../reporting/hotel-segments/hotel-segments.component';
import { CarSavingsCodeComponent } from '../reporting/car-savings-code/car-savings-code.component';
import { WaiversComponent } from '../reporting/waivers/waivers.component';
import { ObtComponent } from '../reporting/obt/obt.component';
import { AquaTicketingComponent } from '../ticketing/aqua-ticketing/aqua-ticketing.component';
import { ItineraryComponent } from 'src/app/leisure/itinerary-and-queue/itinerary/itinerary.component';
import { MatrixReportingComponent } from '../reporting/matrix-reporting/matrix-reporting.component';
import { UtilHelper } from 'src/app/helper/util.helper';
import { ContainerComponent } from '../business-rules/container/container.component';
import { RulesEngineService } from 'src/app/service/business-rules/rules-engine.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-change-pnr',
  templateUrl: './change-pnr.component.html',
  styleUrls: ['./change-pnr.component.scss']
})
export class ChangePnrComponent implements OnInit {
  @ViewChild(HotelSegmentsComponent) hotelMissedSavingComp: HotelSegmentsComponent;
  @ViewChild(CarSavingsCodeComponent) carMissedSavingComp: CarSavingsCodeComponent;
  @ViewChild(ItineraryComponent) itineraryComp: ItineraryComponent;
  @ViewChild(WaiversComponent) waiversFavorComp: WaiversComponent;
  @ViewChild(ObtComponent) obtComp: ObtComponent;
  @ViewChild(AquaTicketingComponent) aquaTicketingComp: AquaTicketingComponent;
  @ViewChild(MatrixReportingComponent) matrixComp: MatrixReportingComponent;
  @ViewChild(ContainerComponent) containerComp: ContainerComponent;
  changePnrForm: FormGroup;
  @Input()
  changePnrConfig: string;
  showTicketing = false;
  hasRules = false;

  constructor(
    private fb: FormBuilder,
    private rulesEngineService: RulesEngineService,
    private pnrService: PnrService,
    private utilHelper: UtilHelper
  ) {}

  ngOnInit() {
    this.hasRules = this.rulesEngineService.checkRuleResultExist('UI_DISPLAY_CONTAINER', 'REPORTING');
    // const dateStr = formatDate(new Date(), 'ddMMM', 'en-US').toUpperCase();
    this.changePnrForm = this.fb.group({
      change: new FormControl('', [Validators.required]),
      ticketDate: new FormControl('', [Validators.required])
    });
    this.showTicketing = this.checkShowTicketing();
    this.loadDefaultDate();
  }
  private loadDefaultDate() {
    const datePipe = new DatePipe('en-GB');
    const dateToday = datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.changePnrForm.get('ticketDate').setValue(dateToday);
  }
  isOBT() {
    const changePnrValue = this.changePnrForm.get('change').value;
    const allow = 'car,hotel,limo'.indexOf(changePnrValue) >= 0;
    return this.pnrService.isOBT() && allow;
  }
  checkShowTicketing() {
    const cfa = this.pnrService.getCFLine().cfa;
    console.log(this.changePnrConfig);
    for (const config of this.changePnrConfig.split('|')) {
      if (config.indexOf(cfa) >= 0 && config.indexOf('=ALL') >= 0) {
        return true;
      } else if (config.indexOf(cfa) >= 0 && config.indexOf('=OBT') >= 0) {
        return this.isOBT();
      }
    }
    return false;
  }

  checkValid() {
    if (this.obtComp) {
      this.utilHelper.validateAllFields(this.obtComp.obtForm);
      if (!this.obtComp.obtForm.valid) {
        return false;
      }
    }

    if (this.carMissedSavingComp !== undefined) {
      this.utilHelper.validateAllFields(this.carMissedSavingComp.carSavingsCodeGroup);
      if (!this.carMissedSavingComp.carSavingsCodeGroup.valid) {
        return false;
      }
    }
    if (this.hotelMissedSavingComp !== undefined) {
      this.utilHelper.validateAllFields(this.hotelMissedSavingComp.hotelSegments);
      if (!this.hotelMissedSavingComp.hotelSegments.valid) {
        return false;
      }
    }

    if (this.containerComp) {
      this.utilHelper.validateAllFields(this.containerComp.containerForm);
      if (!this.containerComp.containerForm.valid) {
        return false;
      }
    }
    if (this.aquaTicketingComp !== undefined) {
      this.utilHelper.validateAllFields(this.aquaTicketingComp.aquaTicketingFormGroup);
      if (!this.aquaTicketingComp.aquaTicketingFormGroup.valid) {
        return false;
      }
    }
    this.utilHelper.validateAllFields(this.itineraryComp.itineraryForm);
    if (this.itineraryComp.itineraryForm.touched && !this.itineraryComp.itineraryForm.valid) {
      return false;
    }
    return true;
  }
}
