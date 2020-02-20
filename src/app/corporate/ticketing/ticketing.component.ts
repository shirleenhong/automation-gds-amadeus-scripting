import { Component, OnInit, ViewChild } from '@angular/core';
import { AquaTicketingComponent } from './aqua-ticketing/aqua-ticketing.component';
import { UtilHelper } from 'src/app/helper/util.helper';
import { TicketingLineComponent } from './ticketing-line/ticketing-line.component';
import { RulesEngineService } from 'src/app/service/business-rules/rules-engine.service';
import { ContainerComponent } from '../business-rules/container/container.component';
import { PnrService } from 'src/app/service/pnr.service';
import { AirFareCommissionComponent } from '../pricing/air-fare-commission/air-fare-commission.component';
import { ExchangeEndorsementsComponent } from '../pricing/exchange-endorsements/exchange-endorsements.component';

@Component({
  selector: 'app-ticketing',
  templateUrl: './ticketing.component.html',
  styleUrls: ['./ticketing.component.scss']
})
export class TicketingComponent implements OnInit {
  @ViewChild(AquaTicketingComponent) aquaTicketingComponent: AquaTicketingComponent;
  @ViewChild(TicketingLineComponent) ticketlineComponent: TicketingLineComponent;
  @ViewChild(ContainerComponent) containerComponent: ContainerComponent;
  @ViewChild(AirFareCommissionComponent) airfareCommissionComponent: AirFareCommissionComponent;
  @ViewChild(ExchangeEndorsementsComponent) exchangeEndorsementsComponent: ExchangeEndorsementsComponent;
  isShowExTab = false;

  constructor(private utilHelper: UtilHelper, private rulesEngineService: RulesEngineService, private pnrService: PnrService) {}
  hasRules = false;
  ngOnInit() {
    this.hasRules = this.rulesEngineService.checkRuleResultExist('UI_DISPLAY_CONTAINER', 'TICKETING');
    this.showExchangeTab();
  }

  checkValid() {
    if (this.aquaTicketingComponent !== undefined) {
      this.utilHelper.validateAllFields(this.aquaTicketingComponent.aquaTicketingFormGroup);
      if (!this.aquaTicketingComponent.aquaTicketingFormGroup.valid) {
        return false;
      }
    }

    this.utilHelper.validateAllFields(this.ticketlineComponent.ticketForm);
    if (!this.ticketlineComponent.ticketForm.valid) {
      return false;
    }

    this.utilHelper.validateAllFields(this.ticketlineComponent.approvalForm);
    if (!this.ticketlineComponent.approvalForm.valid) {
      return false;
    }

    this.utilHelper.validateAllFields(this.airfareCommissionComponent.airFareCommissionFormGroup);
    if (!this.airfareCommissionComponent.airFareCommissionFormGroup.valid) {
      return false;
    }

    if (this.exchangeEndorsementsComponent) {
      this.utilHelper.validateAllFields(this.exchangeEndorsementsComponent.exchangeEndorsementsForm);
      if (!this.exchangeEndorsementsComponent.exchangeEndorsementsForm.valid) {
        return false;
      }
    }

    return true;
  }

  showExchangeTab() {
    const exhange = this.pnrService.getExchangeList();
    const segments = this.pnrService.getSegmentList();
    this.isShowExTab = false;
    const exairline = ['AC', 'OS', 'SN', 'LH', 'UA'];

    exhange.forEach((tkt) => {
      tkt.segmentAssociation.forEach((segmentassoc) => {
        const look = segments.find((x) => x.tatooNo === segmentassoc);
        if (exairline.indexOf(look.airlineCode) > -1) {
          this.isShowExTab = true;
        }
      });
    });
  }
}
