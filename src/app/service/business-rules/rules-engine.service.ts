import { Injectable } from '@angular/core';
import { DDBService } from '../ddb.service';
import { BusinessRuleList } from 'src/app/models/business-rules/business-rule-list.model';
import { PnrService } from '../pnr.service';
import { RulesLogicService } from './rule-logic.service';
import { RulesReaderService } from './rules-reader.service';

@Injectable({
  providedIn: 'root'
})
export class RulesEngineService {
  businessRuleList: BusinessRuleList;
  businessEntities: Map<string, string>;
  constructor(
    private ddb: DDBService,
    private pnrService: PnrService,
    private ruleLogicService: RulesLogicService,
    private ruleReaderService: RulesReaderService
  ) {}

  public async loadRules() {
    await this.ddb.getClientDefinedBusinessRules(this.pnrService.getClientSubUnit(), '1' + this.pnrService.cfLine.cfa).then((rules) => {
      this.businessRuleList = rules;
    });
  }

  loadBusinessEntityFromPnr() {
    this.ruleReaderService.readPnr();
    this.businessEntities = this.ruleReaderService.businessEntities;
  }

  getLogicValidRuleList() {
    return this.businessRuleList.businessRules.filter((rule) =>
      this.ruleLogicService.isRuleLogicValid(rule.ruleLogic, this.businessEntities)
    );
  }
}
