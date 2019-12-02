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
    } else {
      entity = entity.toUpperCase();
    }
    const logicValue = logic.logicItemValue.toUpperCase();
    switch (logic.relationalOperatorId) {
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
    return false;
  }

  isRuleLogicValid(ruleLogics: RuleLogic[], businessEntityList: Map<string, string>) {
    for (const rule of ruleLogics) {
      const valid = this.isLogicValid(rule, businessEntityList);
      if (!valid) {
        return false;
      }
    }
    return true;
  }
}
