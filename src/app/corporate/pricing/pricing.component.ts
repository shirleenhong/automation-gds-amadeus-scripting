import { Component, OnInit, ViewChild } from '@angular/core';
import { AirFareCommissionComponent } from './air-fare-commission/air-fare-commission.component';
import { UtilHelper } from 'src/app/helper/util.helper';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  @ViewChild(AirFareCommissionComponent) airfareCommissionComponent: AirFareCommissionComponent;
  constructor(private utilHelper: UtilHelper) { }

  ngOnInit() {
  }
  checkValid() {
    this.utilHelper.validateAllFields(this.airfareCommissionComponent.airFareCommissionFormGroup);
    if (!this.airfareCommissionComponent.airFareCommissionFormGroup.valid) {
      return false;
    }
    return true;
  }
}
