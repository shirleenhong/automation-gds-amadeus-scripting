export class RuleLogic {
  businessEntityId: number;
  businessEntityName: string;
  logicItemDescription: string;
  logicItemId: number;
  logicItemValue: string;
  logicSequenceNumber: number;
  relationalOperatorId: number;
  relationalOperatorName: string;

  constructor(jsonObj) {
    if (jsonObj) {
      this.businessEntityId = jsonObj.BusinessEntityId;
      this.businessEntityName = jsonObj.BusinessEntityName;
      this.logicItemDescription = jsonObj.ClientDefinedRuleLogicItemDescription;
      this.logicItemId = jsonObj.ClientDefinedRuleLogicItemId;
      this.logicItemValue = jsonObj.ClientDefinedRuleLogicItemValue;
      this.logicSequenceNumber = jsonObj.LogicSequenceNumber;
      this.relationalOperatorId = jsonObj.RelationalOperatorId;
      this.relationalOperatorName = jsonObj.RelationalOperatorName;
    }
  }
}
