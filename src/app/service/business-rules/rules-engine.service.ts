import { Injectable } from '@angular/core';
import { DDBService } from '../ddb.service';
import { BusinessRuleList } from 'src/app/models/business-rules/business-rule-list.model';
import { PnrService } from '../pnr.service';
import { RulesLogicService } from './rule-logic.service';
import { RulesReaderService } from './rules-reader.service';
import { BusinessRule } from 'src/app/models/business-rules/business-rule.model';
import { BusinessRulesFormData } from 'src/app/models/business-rules/ui-business-rules.model';
import { RuleUiService } from './rule-ui.service';
import { RuleWriterService } from './rule-writer.service';

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
    private ruleReaderService: RulesReaderService,
    private ruleUiService: RuleUiService,
    private ruleWriter: RuleWriterService
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

  getRuleUiForm(containerName) {
    return this.ruleUiService.generateForm(this.getRuleFormData(containerName));
  }

  getRuleUiFormHtml(containerName) {
    return this.ruleUiService.generateFormHtml(this.getRuleFormData(containerName));
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

    if (this.validBusinessRules !== undefined) {
      this.validBusinessRules.forEach((rule) => {
        rule.ruleResult.forEach((res) => {
          if (res.businessEntityName === entityName && res.resultItemValue === ruleValue) {
            hasRule = true;
          }
        });
      });
    }
    return hasRule;
  }

  getRuleFormData(container: string): BusinessRulesFormData[] {
    const formData = [];
    this.validBusinessRules.forEach((bRule) => {
      const look = bRule.ruleResult.find((x) => x.businessEntityName === 'UI_DISPLAY_CONTAINER' && x.resultItemValue === container);
      if (look) {
        bRule.ruleResult.forEach((result) => {
          if (result.businessEntityName === 'UI_ADD_CONTROL') {
            const rules = new BusinessRulesFormData(result.resultItemValue);
            const ite = this.checkUiIteration(rules.conditions);
            for (let i = 1; i <= ite; i++) {
              formData.push(rules);
            }
          }
        });
      }
    });
    return formData;
  }


  checkUiIteration(uiConditions) {
    let iteration = 1;
    if (uiConditions) {
      const look = uiConditions.find((x) => x.controlName.indexOf('TSTSEGMENT') > 0);
      if (look) {
        iteration = this.pnrService.tstObj.length;
      }
    }
    return iteration;
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
          resultItems.push(result);
          formData.push(new BusinessRulesFormData(result.resultItemValue));
        }
      });
    });
    return { resultItems, formData };
  }

  setFormUIEntityValue(entity, value) {
    this.businessEntities.set(entity, value);
  }

  getRuleWriteRemarks() {
    let resulttItems = this.getSpecificRulesValue('PNR_ADD_Remark').resultItems;
    this.ruleWriter.getPnrAddRemark(resulttItems);
    resulttItems = this.getSpecificRulesValue('WRITE_REMARK_WITH_CONDTION').resultItems;
    this.ruleWriter.getWriteRemarkWithCondition(resulttItems);
    resulttItems = this.getSpecificRulesValue('WRITE_REMARK_WITH_SEGMENT_RELATE').resultItems;
    this.ruleWriter.getWriteRemarkWithSegmentRelate(resulttItems);
    return this.ruleWriter.writeRuleRemarks();
  }

  getRuleDeleteRemarks() {
    const resulttItems = this.getSpecificRulesValue('PNR_DELETE_Remark').resultItems;
    return this.ruleWriter.getDeleteRemarksRuleResult(resulttItems);
  }
}
