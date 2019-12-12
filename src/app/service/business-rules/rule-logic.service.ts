import { Injectable } from '@angular/core';
import { RuleLogic } from 'src/app/models/business-rules/rule-logic.model';
import { RuleLogicEnum } from 'src/app/enums/rule-logic.enum';

@Injectable({
  providedIn: 'root'
})
export class RulesLogicService {
  isLogicValid(logic: RuleLogic, businessEntityList: Map<string, string>) {
    let entities = [];
    let ruleLogic = false;
    const entityName = businessEntityList.get(logic.businessEntityName);
    if (entityName) {
      entities = entityName.split('\n');
    } else {
      return ruleLogic;
    }

    for (let entity of entities) {
      if (!entity) {
        entity = '';
      } else {
        entity = entity.toUpperCase();
      }
      const logicValue = logic.logicItemValue.toUpperCase();
      switch (logic.relationalOperatorId) {
        case RuleLogicEnum.IS:
          ruleLogic = entity === logicValue;
          break;
        case RuleLogicEnum.CONTAINS:
          ruleLogic = entity.indexOf(logicValue) >= 0;
          break;
        case RuleLogicEnum.IS_NOT:
          ruleLogic = entity !== logicValue;
          break;
        case RuleLogicEnum.NOT_IN:
          ruleLogic = logicValue.split('|').indexOf(entity) === -1;
          break;
        case RuleLogicEnum.IN:
          if (entity.includes(',')) {
            ruleLogic = false;
            const entityList = entity.split(',');
            entityList.forEach((element) => {
              if (logicValue.split('|').indexOf(element) >= 0) {
                ruleLogic = true;
              }
            });
          } else {
            ruleLogic = logicValue.split('|').indexOf(entity) >= 0;
          }
          break;
        case RuleLogicEnum.GREATER_THAN_EQUAL:
          ruleLogic = logicValue >= entity;
          break;
        case RuleLogicEnum.LESS_THAN_EQUAL:
          ruleLogic = entity <= logicValue;
          break;
        case RuleLogicEnum.NOT_BETWEEN:
          const rulelogic = logicValue.split('|');
          if (rulelogic && rulelogic.length > 1) {
            ruleLogic = !(rulelogic[0] <= entity && entity <= rulelogic[1]);
          }
          break;
      }
      if (ruleLogic) {
        return ruleLogic;
      }
    }
    return ruleLogic;
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
