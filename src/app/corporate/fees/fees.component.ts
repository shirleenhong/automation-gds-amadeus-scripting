import { Component, OnInit, ViewChild } from '@angular/core';
import { SupplementalFeesComponent } from './supplemental-fees/supplemental-fees.component';
import { UtilHelper } from 'src/app/helper/util.helper';
import { ContainerComponent } from '../business-rules/container/container.component';
import { RulesEngineService } from 'src/app/service/business-rules/rules-engine.service';

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.scss']
})
export class FeesComponent implements OnInit {
  @ViewChild(SupplementalFeesComponent) supplemeentalFees: SupplementalFeesComponent;
  @ViewChild(ContainerComponent) containerComponent: ContainerComponent;
  hasRules = false;
  constructor(private utilHelper: UtilHelper, private rulesEngineService: RulesEngineService) {}

  ngOnInit() {
    this.hasRules = this.rulesEngineService.checkRuleResultExist('UI_DISPLAY_CONTAINER', 'FEES');
  }

  checkValid() {
    this.utilHelper.validateAllFields(this.supplemeentalFees.ticketedForm);
    if (!this.supplemeentalFees.ticketedForm.valid && !this.supplemeentalFees.ticketedForm.disabled) {
      return false;
    }
    return true;
  }
}
