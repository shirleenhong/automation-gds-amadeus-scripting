import { Component, OnInit, ViewChild } from '@angular/core';
import { AirFareCommissionComponent } from './air-fare-commission/air-fare-commission.component';
import { UtilHelper } from 'src/app/helper/util.helper';
import { ExchangeEndorsementsComponent } from './exchange-endorsements/exchange-endorsements.component';
import { PnrService } from 'src/app/service/pnr.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  @ViewChild(AirFareCommissionComponent) airfareCommissionComponent: AirFareCommissionComponent;
  @ViewChild(ExchangeEndorsementsComponent) exchangeEndorsementsComponent: ExchangeEndorsementsComponent;
  isShowExTab = false;

  constructor(private utilHelper: UtilHelper, private pnrService: PnrService) { }

  ngOnInit() {
    this.showExchangeTab();
  }
  checkValid() {
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

    exhange.forEach(tkt => {
      tkt.segmentAssociation.forEach(segmentassoc => {
        const look = segments.find((x) => x.tatooNo === segmentassoc);
        if (exairline.indexOf(look.airlineCode) > -1) {
          this.isShowExTab = true;
        }
      });
    });
  }
}
