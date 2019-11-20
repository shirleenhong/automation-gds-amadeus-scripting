import { Injectable } from '@angular/core';
import { DDBService } from '../ddb.service';
import { BusinessRuleList } from 'src/app/models/business-rules/business-rule-list.model';
import { PnrService } from '../pnr.service';

@Injectable({
  providedIn: 'root'
})
export class RulesEngine {
  businessRuleList: BusinessRuleList;

  constructor(private ddb: DDBService, private pnrService: PnrService) {}

  public async loadRules() {
    await this.ddb.getClientDefinedBusinessRules(this.pnrService.getClientSubUnit(), '1' + this.pnrService.cfLine.cfa).then((rules) => {
      this.businessRuleList = rules;
    });
  }
}
