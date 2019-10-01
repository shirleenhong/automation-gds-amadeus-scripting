export class PolicyAirMissedSavingThreshold {
  id: number;
  amount: number;
  currencyCode: string;
  routingDescription: string;
  enabledFlag: boolean;
  sequencenumber: number;
  //HierarchyLevel: string;
  //HierarchyLevelName: string;

  constructor(jsonObj: any) {
    this.id = jsonObj.PolicyAirMissedSavingsThresholdGroupItemId;
    this.amount = jsonObj.MissedThresholdAmount;
    this.currencyCode = jsonObj.CurrencyCode;
    this.routingDescription = jsonObj.RoutingDescription;
    this.enabledFlag = jsonObj.EnabledFlag;
    this.sequencenumber = jsonObj.Sequencenumber;
    // HierarchyLevel: string;
    // HierarchyLevelName: string;
  }
}
