import { Injectable } from '@angular/core';
import { DDBService } from '../ddb.service';
import { BusinessRuleList } from 'src/app/models/business-rules/business-rule-list.model';
import { PnrService } from '../pnr.service';
import { RulesLogicService } from './rule-logic.service';
import { RulesReaderService } from './rules-reader.service';
import { BusinessRule } from 'src/app/models/business-rules/business-rule.model';

@Injectable({
  providedIn: 'root'
})
export class RulesEngineService {
  businessRuleList: BusinessRuleList;
  businessEntities: Map<string, string>;
  validBusinessRules: BusinessRule[];
  constructor(
    private ddb: DDBService,
    private pnrService: PnrService,
    private ruleLogicService: RulesLogicService,
    private ruleReaderService: RulesReaderService
  ) {}

  public async initializeRulesEngine() {
    await this.loadRules();
    await this.loadBusinessEntityFromPnr();
    this.validBusinessRules = this.getLogicValidRuleList();
  }

  async loadRules() {
    await this.ddb
      .getClientDefinedBusinessRules(this.pnrService.getClientSubUnit(), '1' + this.pnrService.getCFLine().cfa)
      .then((response) => {
        if (response && response.BusinessRulesResponses) {
          this.businessRuleList = new BusinessRuleList(response.BusinessRulesResponses);
        }
      });
  }

  hasValidRule() {
    return this.validBusinessRules && this.validBusinessRules.length > 0;
  }

  loadBusinessEntityFromPnr() {
    this.ruleReaderService.readPnr();
    this.businessEntities = this.ruleReaderService.businessEntities;
  }

  getLogicValidRuleList() {
    return this.businessRuleList.businessRules.filter((rule) =>
      this.ruleLogicService.isRuleLogicValid(rule.ruleLogic, this.businessEntities)
    );
  }

  checkRuleResultExist(entityName: string, ruleValue: string) {
    let hasRule = false;

    // for (const rule of this.validBusinessRules) {
    //   for (const res of rule) {
    //     if (res.businessEntityName === entityName && res.resultItemValue === ruleValue) {
    //       hasRule = true;
    //     }
    //   }
    // }
    // tslint:disable-next-line: no-shadowed-variable
    this.validBusinessRules.forEach((rule) => {
      rule.ruleResult.forEach((res) => {
        if (res.businessEntityName === entityName && res.resultItemValue === ruleValue) {
          hasRule = true;
        }
      });
    });
    return hasRule;
  }
}
