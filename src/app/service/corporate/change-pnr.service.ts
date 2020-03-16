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

    if (changePnrValue === 'hotel' || changePnrValue === 'car') {
      this.checkToWriteNFR(changePnrConfig);
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
  checkToWriteNFR(changePnrConfig) {
    const cfa = this.pnrService.getCFLine().cfa;
    const foundCfa = changePnrConfig.split('|').filter((x) => x.indexOf(cfa) >= 0); /// indexOf(cfa) >= 0;
    if (foundCfa.length === 0 || (this.pnrService.getRemarkText('EB/-') === '' && foundCfa[0].indexOf('=OBT') >= 0)) {
      this.writeNFR();
    }
  }

  writeNFR() {
    const migrationOBTFeeMap = new Map<string, string>();
    migrationOBTFeeMap.set('SupFeeTicketId', '1');
    migrationOBTFeeMap.set('SupFeeInfo', 'NFR');
    this.remarksManager.createPlaceholderValues(migrationOBTFeeMap, null, null);
  }
}
