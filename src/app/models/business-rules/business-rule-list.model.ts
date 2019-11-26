import { BusinessRule } from './business-rule.model';

export class BusinessRuleList {
  businessRules: Array<BusinessRule> = [];

  constructor(jsonArr) {
    if (jsonArr) {
      jsonArr.forEach((json) => {
        this.businessRules.push(new BusinessRule(json));
      });
    }
  }
}
