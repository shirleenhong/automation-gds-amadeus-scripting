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
  businessRuleList = new BusinessRuleList('');
  businessEntities: Map<string, string>;
  validBusinessRules: BusinessRule[] = [];
  constructor(
    private ddb: DDBService,
    private pnrService: PnrService,
    private ruleLogicService: RulesLogicService,
    private ruleReaderService: RulesReaderService,
    private ruleUiService: RuleUiService,
    private ruleWriter: RuleWriterService
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
            const origRules = new BusinessRulesFormData(result.resultItemValue);
            const ite = this.checkUiIteration(origRules.controlName);
            this.buildFormData(ite, result, formData);
          }
        });
      }
    });
    return formData;
  }

  private buildFormData(ite, result, formData) {
    for (let i = 1; i <= ite; i++) {
      const rules = new BusinessRulesFormData(result.resultItemValue);
      rules.label = rules && rules.controlName.indexOf('TSTSEGMENT') > -1 ? rules.label + 'TST ' + i.toString() : rules.label;
      rules.controlName =
        rules && rules.controlName.indexOf('TSTSEGMENT') > -1 ? rules.controlName.replace('[TSTSEGMENT]', i.toString()) : rules.controlName;
      formData.push(rules);
    }
  }

  checkUiIteration(uiControName) {
    const tsts = this.pnrService.getTstLength();
    return uiControName && uiControName.indexOf('TSTSEGMENT') > -1 ? tsts : 1;
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
      if (bRule && bRule.ruleResult) {
        bRule.ruleResult.forEach((result) => {
          if (result.businessEntityName === entityName) {
            resultItems.push(result.resultItemValue);
            formData.push(new BusinessRulesFormData(result.resultItemValue));
          }
        });
      }
    });

    return { resultItems, formData };
  }

  setFormUIEntityValue(entity, value) {
    this.businessEntities.set(entity, value);
  }

  getRuleWriteRemarks() {
    let resulttItems = this.getSpecificRulesValue('PNR_ADD_Remark').resultItems;
    this.ruleWriter.getPnrAddRemark(resulttItems);
    resulttItems = this.getSpecificRulesValue('PNR_ADD_REMARKS_FIRST_TST').resultItems;
    this.ruleWriter.getPnrAddRemark(resulttItems, '1');
    resulttItems = this.getSpecificRulesValue('PNR_ADD_REMARKS_PER_TST_FIRST_NOT_INCLUDED').resultItems;
    this.ruleWriter.getPnrAddRemark(resulttItems, '>1');
    resulttItems = this.getSpecificRulesValue('PNR_WRITE_REMARK_WITH_CONDTION').resultItems;
    this.ruleWriter.getWriteRemarkWithCondition(resulttItems);
    resulttItems = this.getSpecificRulesValue('PNR_WRITE_REMARK_WITH_SEGMENT_RELATE').resultItems;
    this.ruleWriter.getWriteRemarkWithSegmentRelate(resulttItems);
    resulttItems = this.getSpecificRulesValue('PNR_ADD_CRYPTIC_COMMAND').resultItems;
    this.ruleWriter.getCypticCommandRemark(resulttItems);
    return this.ruleWriter.writeRuleRemarks();
  }

  getRuleDeleteRemarks() {
    let resulttItems = this.getSpecificRulesValue('PNR_DELETE_Remark').resultItems;
    this.ruleWriter.getDeleteRemarksRuleResult(resulttItems);
    resulttItems = this.getSpecificRulesValue('PNR_DELETE_AM_REMARKS').resultItems;
    this.ruleWriter.getDeleteRemarksRuleResult(resulttItems, 'AM');
    return this.ruleWriter.deleteRemarks();
  }

  getRuleDeleteAPERemarks() {
    const resulttItems = this.getSpecificRulesValue('PNR_DELETE_APE_REMARKS').resultItems;
    return this.ruleWriter.getDeleteAPERemarksRuleResult(resulttItems);
  }
}
