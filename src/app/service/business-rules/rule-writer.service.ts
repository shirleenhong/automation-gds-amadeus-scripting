import { Injectable } from '@angular/core';

import { RemarkGroup } from 'src/app/models/pnr/remark.group.model';
import { RemarkModel } from 'src/app/models/pnr/remark.model';
import { RemarkHelper } from 'src/app/helper/remark-helper';
import { PnrService } from '../pnr.service';
import { ControlConditionModel } from 'src/app/models/business-rules/control-condition.model';
import { RuleLogicEnum } from 'src/app/enums/rule-logic.enum';
import { WriteConditionModel } from 'src/app/models/business-rules/write-condition.model';
import { RulesReaderService } from './rules-reader.service';

@Injectable({
  providedIn: 'root'
})
export class RuleWriterService {
  additionaRemarks = [];

  constructor(private remarkHelper: RemarkHelper, private pnrService: PnrService, private ruleReader: RulesReaderService) {}
  /**
   * This get the business Rules - adding remark rule from rule Engine Service
   */

  private formatRemarkRuleResult(resultText: string, lineNo?) {
    if (resultText) {
      const type = resultText.substr(0, 2);
      const cat = resultText.substr(2, 1);
      const txt = resultText.substr(3, resultText.length - 3);
      if (txt.indexOf('UI_FORM') === -1) {
        if (!lineNo) {
          lineNo = [];
        }
        this.additionaRemarks.push({ remarktype: type, category: cat, text: txt, segmentAssoc: lineNo });
      }
    }
  }

  /**
   * building remarkGroup and model
   */
  public writeRuleRemarks() {
    const remGroup = new RemarkGroup();
    remGroup.group = 'RuleRemarks';
    remGroup.remarks = new Array<RemarkModel>();
    this.additionaRemarks.forEach((element) => {
      remGroup.remarks.push(this.remarkHelper.createRemark(element.text, element.remarktype, element.category, element.segmentAssoc));
    });
    return remGroup;
  }

  public getDeleteRemarksRuleResult(resultItems) {
    const remGroup = new RemarkGroup();
    remGroup.group = 'RuleDeleteRemark';
    remGroup.remarks = new Array<RemarkModel>();
    remGroup.passiveSegments = [];

    resultItems.forEach((element) => {
      const lineNo = this.pnrService.getRemarkLineNumber(element);
      if (lineNo !== '') {
        remGroup.deleteRemarkByIds.push(lineNo);
      }
    });

    return remGroup;
  }

  getPnrAddRemark(resultItems) {
    let isUI = false;
    resultItems.forEach((element) => {
      const regEx = /(\[(?:\[??[^\[]*?\]))/g;
      element.match(regEx).forEach((result) => {
        const key = result.replace('[', '').replace(']', '');
        isUI = this.getUIValues(key, element, result, isUI);
      });
      if (!isUI) {
        this.formatRemarkRuleResult(element);
      }
    });
  }

  private removeTstSegment(element) {
    let remark = element;
    if (element.indexOf('/[TST_SEGMENT]') > -1) {
      remark = element.replace('/[TST_SEGMENT]', '');
      return { remark, hastst: true };
    }
    return { remark, hastst: false };
  }

  private getUIValues(key: any, element: any, result: any, isUI: boolean) {
    const tsts = this.pnrService.getTstLength();
    const iteration = (key.indexOf('TSTSEGMENT') > -1) ? tsts : 1;
    const origkey = key;
    const origelement = element;
    for (let i = 1; i <= iteration; i++) {
      key = origkey.replace('TSTSEGMENT', i.toString());
      const val = this.ruleReader.getEntityValue(key);
      if (val) {
        element = origelement.replace(result, val);
        isUI = true;
        const { remark, hastst } = this.removeTstSegment(element);
        const testSegment = hastst ? this.writeRemarkPerTst(i) : '';
        this.formatRemarkRuleResult(remark, testSegment);
      }
    }
    return isUI;
  }

  getWriteRemarkWithCondition(resultItems) {
    resultItems.forEach((element) => {
      const writeCondition = new WriteConditionModel(element);
      if (writeCondition.conditions.filter((con) => this.checkControlValid(con)).length === writeCondition.conditions.length) {
        writeCondition.remarks.forEach((rem) => {
          this.formatRemarkRuleResult(rem);
        });
      }
    });
  }

  writeRemarkPerTst(tstNo) {
    let tst = this.pnrService.tstObj;
    if (this.pnrService.tstObj.length) {
      tst = this.pnrService.tstObj[tstNo - 1];
    }
    const segmentNo = this.pnrService.getTstSegment(tst);
    return segmentNo;
  }

  getWriteRemarkWithSegmentRelate(resultItems) {
    let relatedSegments: string[] = [];
    const remarks: string[] = [];
    const segment = this.pnrService.getSegmentList();
    if (segment) {
      segment.forEach((seg) => {
        resultItems.forEach((res) => {
          const writeCondition = new WriteConditionModel(res);

          writeCondition.conditions.forEach((con) => {
            if (seg.segmentType === con.segmentType) {
              con.propertyValue = seg[con.propertyName];
            }
          });
          if (writeCondition.conditions.filter((con) => this.checkPnrValueValid(con)).length === writeCondition.conditions.length) {
            writeCondition.remarks.forEach((rem) => {
              relatedSegments = [];
              relatedSegments.push(seg.tatooNo);
              remarks.push(rem);

              this.formatRemarkRuleResult(rem.replace('/S[PNR_Segment]', ''), relatedSegments);
            });
          }
        });
      });
    }
  }

  checkPnrValueValid(condition: ControlConditionModel) {
    const logicValue = condition.value.toLowerCase();
    const entity = condition.propertyValue.toLowerCase();
    return this.checkEntity(entity, logicValue, condition.operator);
  }

  checkControlValid(condition: ControlConditionModel) {
    const logicValue = condition.value.toLowerCase();
    const entity = this.ruleReader.businessEntities.get('UI_FORM_' + condition.controlName);
    return this.checkEntity(entity, logicValue, condition.operator);
  }

  checkEntity(entity, logicValue, operator: string) {
    if (entity) {
      entity = entity.toLowerCase();
      switch (RuleLogicEnum[operator]) {
        case RuleLogicEnum.IS:
          return entity === logicValue;
        case RuleLogicEnum.CONTAINS:
          return entity.indexOf(logicValue) >= 0;
        case RuleLogicEnum.IS_NOT:
          return entity !== logicValue;
        case RuleLogicEnum.NOT_IN:
          return logicValue.split('|').indexOf(entity) === -1;
        case RuleLogicEnum.IN:
          return logicValue.split('|').indexOf(entity) >= 0;
      }
    }
  }
}
