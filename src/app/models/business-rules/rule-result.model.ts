export class RuleResult {
  businessEntityId: number;
  businessEntityName: string;
  resultItemDescription: string;
  resultItemId: number;
  resultItemValue: string;

  constructor(jsonObj) {
    if (jsonObj) {
      this.businessEntityId = jsonObj.BusinessEntityId;
      this.businessEntityName = jsonObj.BusinessEntityName;
      this.resultItemDescription = jsonObj.ClientDefinedRuleResultItemDescription;
      this.resultItemId = jsonObj.ClientDefinedRuleResultItemId;
      this.resultItemValue = jsonObj.ClientDefinedRuleResultItemValue;
    }
  }
}
