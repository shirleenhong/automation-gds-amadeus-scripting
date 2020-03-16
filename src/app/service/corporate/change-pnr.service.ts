import { Injectable } from '@angular/core';
import { ChangePnrComponent } from 'src/app/corporate/change-pnr/change-pnr.component';
import { RemarksManagerService } from './remarks-manager.service';
import { PnrService } from '../pnr.service';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ChangePnrService {
  constructor(private remarksManager: RemarksManagerService, private pnrService: PnrService) {}
  getTKTRemark(changePnrComponent: ChangePnrComponent, changePnrConfig) {
    let comand = '';
    const changePnrValue = changePnrComponent.changePnrForm.get('change').value;
    const foundCfa = this.checkCfaMatch(changePnrConfig);
    if (changePnrValue === 'hotel' || changePnrValue === 'car') {
      if (!foundCfa && this.pnrService.getRemarkText('BB/-') !== '') {
        this.writeNFR();
      }
    }
    const dateStr = formatDate(changePnrComponent.changePnrForm.get('ticketDate').value, 'ddMMM', 'en-US').toUpperCase();
    comand = 'TKTL' + dateStr + '/';
    if (changePnrValue === 'air' || changePnrValue === 'modify') {
      if (this.pnrService.getRemarkText('BB/-011427') !== '') {
        comand += 'YYCWL2102';
      } else {
        comand += 'YTOWL2106';
      }
    } else if (changePnrValue === 'car' || changePnrValue === 'hotel') {
      comand += this.pnrService.extractOidFromBookRemark();
    }
    comand += '/Q8C1-CHG';

    return comand;
  }
  checkCfaMatch(changePnrConfig) {
    const cfa = this.pnrService.getCFLine().cfa;
    return changePnrConfig.indexOf(cfa) >= 0;
  }

  writeNFR() {
    const migrationOBTFeeMap = new Map<string, string>();
    migrationOBTFeeMap.set('SupFeeTicketId', '1');
    migrationOBTFeeMap.set('SupFeeInfo', 'ATE');
    this.remarksManager.createPlaceholderValues(migrationOBTFeeMap, null, null);
  }
}
