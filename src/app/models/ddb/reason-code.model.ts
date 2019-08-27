export class ReasonCode {
  reasonCodeItemId: number;
  reasonCode: string;
  reasonCodeGroupId: number;
  reasonCodeTypeId: number;
  reasonCodeProductTypeDescriptions = new Map<string, string>();
  displayOrder: number;
  productId: number;
  awaitingApprovalFlag: boolean;
  versionNumber: number;
  travelerFacingFlag: boolean;

  constructor(json: any) {
    this.reasonCodeItemId = json.ReasonCodeItemId;
    this.reasonCode = json.ReasonCode;
    this.reasonCodeGroupId = json.ReasonCodeGroupId;
    this.reasonCodeTypeId = json.ReasonCodeTypeId;
    //this.reasonCodeProductTypeDescriptions= json. Map<string, string>;
    this.displayOrder = json.DisplayOrder;
    this.productId = json.ProductId;
    this.awaitingApprovalFlag = json.AwaitingApprovalFlag;
    this.versionNumber = json.VersionNumber;
    this.travelerFacingFlag = json.TravelerFacingFlag;

    if (json.ReasonCodeProductTypeDescriptions) {
      Object.keys(json.ReasonCodeProductTypeDescriptions).forEach((key) => {
        this.reasonCodeProductTypeDescriptions.set(key, json.ReasonCodeProductTypeDescriptions[key]);
      });
    }
  }
}
