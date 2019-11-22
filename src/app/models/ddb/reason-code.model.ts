export class ReasonCode {
  reasonCodeItemId: number;
  reasonCode: string;
  reasonCodeGroupId: number;
  reasonCodeTypeId: number;
  reasonCodeProductTypeDescription: string;
  displayOrder: number;
  productId: number;
  awaitingApprovalFlag: boolean;
  versionNumber: number;
  travelerFacingFlag: boolean;
  reasonCodeAlternativeDescription: string;

  constructor(json: any) {
    this.reasonCodeItemId = json.ReasonCodeItemId;
    this.reasonCode = json.ReasonCode;
    this.reasonCodeGroupId = json.ReasonCodeGroupId;
    this.reasonCodeTypeId = json.ReasonCodeTypeId;
    this.displayOrder = json.DisplayOrder;
    this.productId = json.ProductId;
    this.awaitingApprovalFlag = json.AwaitingApprovalFlag;
    this.versionNumber = json.VersionNumber;
    this.travelerFacingFlag = json.TravelerFacingFlag;
    this.reasonCodeProductTypeDescription = json.ReasonCodeProductTypeDescription;
    this.reasonCodeAlternativeDescription = json.reasonCodeAlternativeDescription;
  }
}
