import { Injectable } from '@angular/core';
import { RuleLogic } from 'src/app/models/business-rules/rule-logic.model';
import { RuleLogicEnum } from 'src/app/enums/rule-logic.enum';

@Injectable({
  providedIn: 'root'
})
export class RulesLogicService {
  isLogicValid(logic: RuleLogic, businessEntityList: Map<string, string>) {
    let entity = businessEntityList.get(logic.businessEntityName);
    if (!entity) {
      entity = '';
    }

    switch (logic.relationalOperatorId) {
      case RuleLogicEnum.IS:
        return entity === logic.logicItemValue;
      case RuleLogicEnum.CONTAINS:
        return entity.indexOf(logic.logicItemValue) >= 0;
      case RuleLogicEnum.IS_NOT:
        return entity === logic.logicItemValue;
      case RuleLogicEnum.NOT_IN:
        break;
    }
    return false;
  }

  isRuleLogicValid(ruleLogics: RuleLogic[], businessEntityList: Map<string, string>) {
    for (const rule of ruleLogics) {
      const valid = this.isLogicValid(rule, businessEntityList);
      if (!valid) {
        return false;
      }
    }

    return ruleLogics.length > 0;
  }
}
