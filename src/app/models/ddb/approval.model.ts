export class ApprovalItem {
  approvalId = 0;
  approvalGroupName: string;
  approvalGroupApprovalTypeId = 0;
  approvalRules: string;
  approvalResult: string;

  //
  public getRule() {
    const splitVal = this.approvalRules.split('=');
    if (splitVal.length > 1) {
      return splitVal[0];
    }
    return '';
  }
  /**
   * returns rule value with Keywords;
   */
  public getRuleText() {
    const splitVal = this.approvalRules.split('=');
    if (splitVal.length > 1) {
      return splitVal[1];
    }
    return '';
  }
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
      value = this.getRuleText();
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
      this.approvalRules = jsonObj.ApprovalGroupApprovalTypeDescription;
      this.approvalResult = jsonObj.ApprovalGroupApprovalTypeItemValue;
    }
  }
}
