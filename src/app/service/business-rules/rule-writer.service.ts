import { Injectable } from '@angular/core';

import { RemarkGroup } from 'src/app/models/pnr/remark.group.model';
import { RemarkModel } from 'src/app/models/pnr/remark.model';
import { RemarkHelper } from 'src/app/helper/remark-helper';
import { PnrService } from '../pnr.service';
import { ControlConditionModel } from 'src/app/models/business-rules/control-condition.model';
// import { RuleLogicEnum } from 'src/app/enums/rule-logic.enum';
import { WriteConditionModel } from 'src/app/models/business-rules/write-condition.model';
import { RulesReaderService } from './rules-reader.service';

@Injectable({
  providedIn: 'root'
})
export class RuleWriterService {
  additionaRemarks = [];
  crypticCommands = [];
  linesToBeDeleted = [];

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

    this.crypticCommands.forEach((element) => {
      remGroup.cryptics.push(element);
    });
    return remGroup;
  }

  public getDeleteRemarksRuleResult(resultItems, type?: string) {
    resultItems.forEach((element) => {
      const lineNos = this.pnrService.getRemarkLineNumbers(element, type);
      if (lineNos) {
        lineNos.forEach((lineNo) => {
          this.linesToBeDeleted.push(lineNo);
        });
      }
    });
  }

  public deleteRemarks() {
    const remGroup = new RemarkGroup();
    remGroup.group = 'RuleDeleteRemark';
    remGroup.remarks = new Array<RemarkModel>();
    remGroup.passiveSegments = [];

    this.linesToBeDeleted.forEach((element) => {
      remGroup.deleteRemarkByIds.push(element);
    });

    return remGroup;
  }

  public getDeleteAPERemarksRuleResult(resultItems) {
    const remGroup = new RemarkGroup();
    remGroup.group = 'RuleDeleteAPERemark';
    remGroup.remarks = new Array<RemarkModel>();

    resultItems.forEach((element) => {
      const lineNos = this.pnrService.getAPELineNumbers(element);
      if (lineNos) {
        lineNos.forEach((lineNo) => {
          remGroup.deleteRemarkByIds.push(lineNo);
        });
      }
    });
    return remGroup;
  }

  getPnrAddRemark(resultItems, tstNumber?) {
    let isUI = false;
    resultItems.forEach((element) => {
      const regEx = /(\[(?:(UI_FORM)\[??[^\[]*?\]))/g;
      const uiRemarks = element.match(regEx);
      if (uiRemarks) {
        uiRemarks.forEach((result) => {
          const key = result.replace('[', '').replace(']', '');
          isUI = this.getUIValues(key, element, result, isUI, tstNumber);
        });
      }

      if (!isUI) {
        this.formatRemarkRuleResult(element);
      }
    });
  }

  getCypticCommandRemark(resultItems) {
    this.crypticCommands = [];
    resultItems.forEach((element) => {
      this.crypticCommands.push(element);
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

  private addTktNumber(element: string, tktNo: string) {
    if (element.indexOf('[TSTNumber]') > -1) {
      element = element.replace('[TSTNumber]', tktNo);
    }
    return element;
  }

  private getTSTIteration(tstRef: string) {
    const tsts = this.pnrService.getTstLength();
    switch (tstRef) {
      case '1':
        return { first: 1, last: 1 };
      case '>1':
        return { first: 2, last: tsts };
      case 'ALL':
        return { first: 1, last: tsts };
      default:
        return { first: 1, last: 1 };
    }
  }

  private getUIValues(key: any, element: any, result: any, isUI: boolean, tsts?: string) {
    if (!tsts && key.indexOf('TSTSEGMENT') > -1) {
      tsts = 'ALL';
    }
    const tst = this.getTSTIteration(tsts);
    // const iteration = key.indexOf('TSTSEGMENT') > -1 ? tsts : 1;
    const origkey = key;
    const origelement = element;
    for (let i = tst.first; i <= tst.last; i++) {
      key = origkey.replace('TSTSEGMENT', i.toString());
      const val = this.ruleReader.getEntityValue(key);
      if (val) {
        element = origelement.replace(result, val);
        isUI = true;
        const rem = this.removeTstSegment(element);
        const remark = this.addTktNumber(rem.remark, i.toString());
        const testSegment = rem.hastst ? this.writeRemarkPerTst(i) : '';
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
    const segmentNo = this.pnrService.extractTstSegment(tst);
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
    let entity = this.ruleReader.businessEntities.get('UI_FORM_' + condition.controlName);
    entity = entity ? entity.toLowerCase() : '';
    return this.checkEntity(entity, logicValue, condition.operator);
  }

  checkEntity(entity, logicValue, operator: string) {
    if (entity) {
      entity = entity.toLowerCase();
      switch (operator) {
        case 'IS':
          return entity === logicValue;
        case 'CONTAINS':
          return entity.indexOf(logicValue) >= 0;
        case 'IS_NOT':
          return entity !== logicValue;
        case 'NOT_IN':
          return logicValue.split('|').indexOf(entity) === -1;
        case 'IN':
          return logicValue.split('|').indexOf(entity) >= 0;
      }
    }
  }
}
