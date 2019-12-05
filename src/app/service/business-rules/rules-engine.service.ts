import { Injectable } from '@angular/core';
import { DDBService } from '../ddb.service';
import { BusinessRuleList } from 'src/app/models/business-rules/business-rule-list.model';
import { PnrService } from '../pnr.service';
import { RulesLogicService } from './rule-logic.service';
import { RulesReaderService } from './rules-reader.service';
import { BusinessRule } from 'src/app/models/business-rules/business-rule.model';
import { BusinessRulesFormData } from 'src/app/models/business-rules/ui-business-rules.model';

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
  ) { }

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

  async loadBusinessEntityFromPnr() {
    await this.ruleReaderService.readPnr();
    this.businessEntities = this.ruleReaderService.businessEntities;
  }

  getLogicValidRuleList() {
    return this.businessRuleList.businessRules.filter((rule) =>
      this.ruleLogicService.isRuleLogicValid(rule.ruleLogic, this.businessEntities)
    );
  }

  getRuleWithEntities(_enities: string[]) {
    return this.validBusinessRules.filter((x) => x.hasResultEntities(_enities));
  }

  checkRuleResultExist(entityName: string, ruleValue: string) {
    let hasRule = false;
    this.validBusinessRules.forEach((rule) => {
      rule.ruleResult.forEach((res) => {
        if (res.businessEntityName === entityName && res.resultItemValue === ruleValue) {
          hasRule = true;
        }
      });
    });
    return hasRule;
  }

  getAddControlRuleValues(container: string) {
    const formData = [];
    this.validBusinessRules.forEach((bRule) => {
      const look = bRule.ruleResult.find((x) => x.businessEntityName === 'UI_DISPLAY_CONTAINER' && x.resultItemValue === container);
      if (look) {
        bRule.ruleResult.forEach((result) => {
          if (result.businessEntityName === 'UI_ADD_CONTROL') {
            formData.push(new BusinessRulesFormData(result.resultItemValue));
          }
        });
      }
    });
    return { formData };
  }


  getSpecificRuleResultItemValue(entityName: string) {
    let value = '';
    this.validBusinessRules.forEach((bRule) => {
      bRule.ruleResult.forEach((result) => {
        if (result.businessEntityName === entityName) {
          value = result.resultItemValue;
        }
      });
    });
    return value;
  }

  getSpecificRulesValue(entityName: string) {
    const resultItems = [];
    const formData = [];
    this.validBusinessRules.forEach((bRule) => {
      bRule.ruleResult.forEach((result) => {
        if (result.businessEntityName === entityName) {
          resultItems.push(result.resultItemValue);
          formData.push(new BusinessRulesFormData(result.resultItemValue));
        }
      });
    });
    return { resultItems, formData };
  }
}
