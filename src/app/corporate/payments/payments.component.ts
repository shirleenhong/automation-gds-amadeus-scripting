import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AccountingRemarkComponent } from './accounting-remark/accounting-remark.component';
import { NonAcceptanceComponent } from './non-acceptance/non-acceptance.component';
import { PnrService } from '../../service/pnr.service';
import { UtilHelper } from 'src/app/helper/util.helper';
import { StaticValuesService } from '../../service/static-values.services';
import { ContainerComponent } from '../business-rules/container/container.component';
import { RulesEngineService } from 'src/app/service/business-rules/rules-engine.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  @ViewChild(AccountingRemarkComponent) accountingRemark: AccountingRemarkComponent;
  @ViewChild(NonAcceptanceComponent) nonAcceptance: NonAcceptanceComponent;
  @ViewChild(ContainerComponent) containerComponent: ContainerComponent;

  @Input() windowFilter: string;

  hasValidUnticketed = false;
  hasFop = false;
  tstData = [];
  hasRule = false;
  constructor(
    private pnrService: PnrService,
    private utilHelper: UtilHelper,
    private staticService: StaticValuesService,
    private rulesEngineService: RulesEngineService
  ) { }

  ngOnInit() {
    this.tstData = this.pnrService.getUnticketedCorpReceipts();
    this.hasRule = this.rulesEngineService.checkRuleResultExist('UI_DISPLAY_CONTAINER', 'PAYMENT');
    if (this.pnrService.getFopElements() !== '') {
      this.hasFop = true;
    } else {
      this.hasFop = false;
    }

    if (this.tstData) {
      this.tstData.forEach((element) => {
        if (this.check(element.airline, element.ccVendor) === true) {
          this.hasValidUnticketed = true;
        }
      });
    }
  }

  checkValid() {
    if (this.nonAcceptance !== undefined) {
      this.utilHelper.validateAllFields(this.nonAcceptance.nonAcceptanceForm);
      if (!this.nonAcceptance.nonAcceptanceForm.valid) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  check(airline: any, cc: any) {
    const result = this.staticService.getAirlineVendor(airline, cc);
    if (result === -1) {
      return false;
    } else {
      return true;
    }
  }
}
