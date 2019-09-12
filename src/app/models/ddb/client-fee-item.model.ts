export class ClientFeeItem {
  displayName: string;
  clientFeeDescription: string;
  valueAmount = 0;
  clientFeeGroupName: string;
  feeTypeDescription: string;
  clientFeeId: number;
  clientFeeGroupId: number;
  outputFormat: string;
  selected = false;
  constructor(jsonObj: any) {
    if (jsonObj) {
      this.displayName = jsonObj.DisplayName;
      this.valueAmount = jsonObj.ValueAmount;
      this.clientFeeDescription = jsonObj.ClientFeeDescription;
      this.clientFeeGroupName = jsonObj.ClientFeeGroupName;
      this.feeTypeDescription = jsonObj.FeeTypeDescription;
      this.clientFeeId = jsonObj.ClientFeeID;
      this.clientFeeGroupId = jsonObj.ClientFeeGroupID;
      this.outputFormat = jsonObj.OutputFormat;
    }
  }
}
