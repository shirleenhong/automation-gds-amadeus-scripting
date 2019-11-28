import { Injectable } from '@angular/core';
import { RulesEngineService } from './rules-engine.service';
import { RemarkGroup } from 'src/app/models/pnr/remark.group.model';
import { RemarkModel } from 'src/app/models/pnr/remark.model';
import { RemarkHelper } from 'src/app/helper/remark-helper';
import { PnrService } from '../pnr.service';

@Injectable({
  providedIn: 'root'
})
export class RuleWriterService {
  additionaRemarks = [];
  constructor(private res: RulesEngineService, private remarkHelper: RemarkHelper, private pnrService: PnrService) { }
  /**
   * This get the business Rules - adding remark rule from rule Engine Service
   */
  public getAddRemarksRuleResult() {
    const resultItems = this.res.getSpecificRulesValue('PNR_ADD_Remark');
    resultItems.forEach(element => {
      this.formatRemarkRuleResult(element.resultItemValue);
    });
    return this.writeRuleRemarks();
  }

  /**
   * format rule value to get remark information
   * @param resultText
   */
  private formatRemarkRuleResult(resultText: string) {
    const type = resultText.substr(0, 2);
    const cat = resultText.substr(2, 1);
    const txt = resultText.substr(3, resultText.length - 3);
    this.additionaRemarks.push({ remarktype: type, category: cat, text: txt });
  }

  /**
   * building remarkGroup and model
   */
  private writeRuleRemarks() {
    const remGroup = new RemarkGroup();
    remGroup.group = 'RuleRemarks';
    remGroup.remarks = new Array<RemarkModel>();
    this.additionaRemarks.forEach((element) => {
      remGroup.remarks.push(this.remarkHelper.createRemark(element.text, element.remarktype, element.category));
    });
    return remGroup;
  }

  public getDeleteRemarksRuleResult() {
    const remGroup = new RemarkGroup();
    remGroup.group = 'RuleDeleteRemark';
    remGroup.remarks = new Array<RemarkModel>();
    remGroup.passiveSegments = [];
    const clientDefinedResult = this.res.validBusinessRules;
    clientDefinedResult.forEach((bRule) => {
      bRule.ruleResult.forEach((result) => {
        if (result.businessEntityName === 'PNR_DELETE_Remark') {
          let lineNo = '';
          lineNo = this.pnrService.getRemarkLineNumber(result.resultItemValue);
          if (lineNo !== '') {
            remGroup.deleteRemarkByIds.push(lineNo);
          }
        }
      });
    });
    return remGroup;
  }
}
