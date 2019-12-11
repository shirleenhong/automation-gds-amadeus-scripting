import { Injectable } from '@angular/core';

import { RemarkGroup } from 'src/app/models/pnr/remark.group.model';
import { RemarkModel } from 'src/app/models/pnr/remark.model';
import { RemarkHelper } from 'src/app/helper/remark-helper';
import { PnrService } from '../pnr.service';
import { ControlConditionModel } from 'src/app/models/business-rules/control-condition.model';
import { RuleLogicEnum } from 'src/app/enums/rule-logic.enum';
import { WriteConditionModel } from 'src/app/models/business-rules/write-condition.model';
import { RulesReaderService } from './rules-reader.service';

@Injectable({
  providedIn: 'root'
})
export class RuleWriterService {
  additionaRemarks = [];

  constructor(private remarkHelper: RemarkHelper, private pnrService: PnrService, private ruleReader: RulesReaderService) {}
  /**
   * This get the business Rules - adding remark rule from rule Engine Service
   */

  private formatRemarkRuleResult(resultText: string) {
    if (resultText) {
      const type = resultText.substr(0, 2);
      const cat = resultText.substr(2, 1);
      const txt = resultText.substr(3, resultText.length - 3);
      this.additionaRemarks.push({ remarktype: type, category: cat, text: txt });
    }
  }

  /**
   * building remarkGroup and model
   */
  public writeRuleRemarks() {
    const remGroup = new RemarkGroup();
    remGroup.group = 'RuleRemarks';
    remGroup.remarks = new Array<RemarkModel>();
    this.additionaRemarks.forEach((element) => {
      remGroup.remarks.push(this.remarkHelper.createRemark(element.text, element.remarktype, element.category));
    });
    return remGroup;
  }

  public getDeleteRemarksRuleResult(resultItems) {
    const remGroup = new RemarkGroup();
    remGroup.group = 'RuleDeleteRemark';
    remGroup.remarks = new Array<RemarkModel>();
    remGroup.passiveSegments = [];

    resultItems.forEach((element) => {
      const lineNo = this.pnrService.getRemarkLineNumber(element.resultItemValue);
      if (lineNo !== '') {
        remGroup.deleteRemarkByIds.push(lineNo);
      }
    });

    return remGroup;
  }

  getPnrAddRemark(resultItems) {    
    resultItems.forEach((element) => {
        const regEx = (/(\[(?:\[??[^\[]*?\]))/g) ;            
        element.match(regEx).forEach(result => {       
          const key = result.replace('[','').replace(']','');
          const val = this.ruleReader.getEntityValue(key)
          if (val) {
          element = element.replace(result, val);
          }
        });
      this.formatRemarkRuleResult(element);
    });
  }

  getWriteRemarkWithCondition(resultItems) {
    resultItems.forEach((element) => {
      const writeCondition = new WriteConditionModel(element);
      if (writeCondition.conditions.filter((con) => this.checkControlValid(con)).length === writeCondition.conditions.length) {
        writeCondition.remarks.forEach((rem) => {
          this.formatRemarkRuleResult(rem);
        });
      }
    });
  }

  checkControlValid(condition: ControlConditionModel) {
    const logicValue = condition.value.toLowerCase();
    let entity = this.ruleReader.businessEntities.get('UI_FORM_' + condition.controlName);
    if (entity) {
      entity = entity.toLowerCase();
      switch (RuleLogicEnum[condition.operator]) {
        case RuleLogicEnum.IS:
          return entity === logicValue;
        case RuleLogicEnum.CONTAINS:
          return entity.indexOf(logicValue) >= 0;
        case RuleLogicEnum.IS_NOT:
          return entity !== logicValue;
        case RuleLogicEnum.NOT_IN:
          return logicValue.split('|').indexOf(entity) === -1;
        case RuleLogicEnum.IN:
          return logicValue.split('|').indexOf(entity) >= 0;
      }
    }
  }
}
