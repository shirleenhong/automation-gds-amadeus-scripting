export class ApprovalItem {
  approvalId = 0;
  approvalGroupName: string;
  approvalGroupApprovalTypeId = 0;
  approvalRules: string;
  approvalType: string;
  approvalResult: string;

  /**
   * Returns list of Keywords
   */
  public getRuleKeywords(rule?): string[] {
    if (!rule) {
      rule = this.approvalRules;
    }
    if (rule) {
      const regex = /\[.*?\]/g;
      const match = rule.match(regex);
      regex.lastIndex = 0;
      if (match !== null) {
        return match;
      }
    }
    return [];
  }

  /**
   * returns rule value text without keywords
   */
  public getRuleValueText(value?) {
    if (!value) {
      value = this.approvalRules;
    }
    this.getRuleKeywords(value).forEach((r) => {
      value = value.replace(r, '');
    });
    return value;
  }

  constructor(jsonObj: any) {
    if (jsonObj) {
      this.approvalId = jsonObj.ApprovalGroupId;
      this.approvalGroupName = jsonObj.ApprovalGroupName;
      this.approvalGroupApprovalTypeId = jsonObj.ApprovalGroupApprovalTypeId;
      this.approvalRules = jsonObj.ApprovalGroupApprovalTypeFormat;
      this.approvalType = jsonObj.ApprovalGroupApprovalTypeDescription;
      this.approvalResult = jsonObj.ApprovalGroupApprovalTypeItemValue;
    }
  }
}
