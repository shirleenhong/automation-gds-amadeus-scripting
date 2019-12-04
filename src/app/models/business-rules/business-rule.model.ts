import { RuleLogic } from './rule-logic.model';
import { RuleTrigger } from './rule-trigger.model';
import { RuleResult } from './rule-result.model';

export class BusinessRule {
  categoryName: string;
  groupId: number;
  groupName: string;
  ruleLogic: RuleLogic[] = [];
  ruleResult: RuleResult[] = [];
  ruleTrigger: RuleTrigger[] = [];
  enabledDate: Date;
  enabledFlag: boolean;
  expiryDate: Date;
  groupSequenceNumber: number;
  isBusinessGroupFlag: boolean;
  tripTypeId: number;
  tripTypeName: string;

  getResultEntityValue(entityName) {
    const results = this.ruleResult.filter((x) => x.businessEntityName === entityName);
    if (results.length > 0) {
      return results[0].resultItemValue;
    }
    return '';
  }

  hasResultEntities(entities: string[]) {
    return this.ruleResult.filter((x) => entities.indexOf(x.businessEntityName) >= 0).length >= entities.length;
  }

  constructor(jsonObj) {
    if (jsonObj) {
      this.categoryName = jsonObj.CategoryName;
      this.groupId = jsonObj.ClientDefinedRuleGroupId;
      this.groupName = jsonObj.ClientDefinedRuleGroupName;
      this.enabledDate = jsonObj.EnabledDate;
      this.enabledFlag = jsonObj.EnabledFlag;
      this.expiryDate = jsonObj.ExpiryDate;
      this.groupSequenceNumber = jsonObj.groupSequenceNumber;
      this.isBusinessGroupFlag = jsonObj.IsBusinessGroupFlag;
      this.tripTypeId = jsonObj.TripTypeId;
      this.tripTypeName = jsonObj.TripTypeName;
      if (jsonObj.ClientDefinedRuleLogic) {
        jsonObj.ClientDefinedRuleLogic.forEach((logic) => {
          this.ruleLogic.push(new RuleLogic(logic));
        });
      }
      if (jsonObj.ClientDefinedRuleResult) {
        jsonObj.ClientDefinedRuleResult.forEach((result) => {
          this.ruleResult.push(new RuleResult(result));
        });
      }
      if (jsonObj.ClientDefinedRuleTrigger) {
        jsonObj.ClientDefinedRuleTrigger.forEach((trigger) => {
          this.ruleTrigger.push(new RuleTrigger(trigger));
        });
      }
    }
  }
}
