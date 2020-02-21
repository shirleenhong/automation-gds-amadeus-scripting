import { Injectable } from '@angular/core';
import { PnrService } from '../pnr.service';
import { RemarksManagerService } from './remarks-manager.service';
import { AmadeusRemarkService } from '../amadeus-remark.service';

declare var smartScriptSession: any;
@Injectable({
  providedIn: 'root'
})
export class CleanUpRemarkService {
  deleteRemarksByIds = Array<string>();

  constructor(private remarksManagerService: RemarksManagerService, private pnrService: PnrService, private ars: AmadeusRemarkService) {}

  cleanUpRemarks() {
    this.markIdForDeletion();
    this.ars.deleteRemarks();
    this.getMISForDeletion();
    this.ars.deleteRemarksByIds = [];
  }

  markIdForDeletion() {
    const remarks = Array<string>();
    remarks.push('TKT'); // TKT
    remarks.push('SPLIT'); // RMT SPLIT
    remarks.push('SUPFEE'); // RMF SUPFEE-
    remarks.push('REC/-RLN'); // RM*REC/-RLN
    remarks.push('U86/-'); // RM*U86/-
    remarks.push('LCC'); // RMF LCC-
    remarks.push('FF/-'); // RM*FF/-
    remarks.push('LP/-'); // RM*LP/-
    remarks.push('FS/-'); // RM*FS/-
    remarks.push('NE/-'); // RM*NE/-
    // remarks.push('DE/-'); // RM*DE/-
    remarks.push('NUC'); // RM*NUC
    remarks.push('AOF'); // RM*AOF
    remarks.push('MAC/-'); // RM*MAC/-
    remarks.push('SFC'); // RM*SFC
    remarks.push('FEE'); // RM*FEE
    this.getIdsForDeletion(remarks);
  }

  // standAloneDelete() {
  //   const remarks = Array<string>();
  //   remarks.push('TKT'); // TKT
  //   remarks.push('CN/-A9I');
  //   remarks.push('U63/-NO-0.00');
  //   this.getIdsForDeletion(remarks);
  // }

  writePossibleConcurObtRemark() {
    const eba = this.pnrService.getRemarkText('EB/-EBA');
    const tripLoc = this.pnrService.getRemarkText('CB/TRIPLOC');
    const queTicket = this.pnrService.getRemarkText('CB/QUE/QUE FOR TICKET');

    if (eba.length > 0) {
      if (tripLoc.length > 0) {
        if (queTicket.length <= 0 || queTicket === '') {
          const aquaBB = new Map<string, string>();
          aquaBB.set('IsConcurObt', 'true');
          this.remarksManagerService.createPlaceholderValues(null, aquaBB, null, null, 'AGENT CLAIMED');
        }
      }
    }
  }

  writePossibleAquaTouchlessRemark() {
    const bbExist = this.pnrService.getRemarkLineNumber('BB/-011427');
    const remarkText = this.pnrService.getRemarkText('AQUA CHG-RM*BB/-');
    let value = '';
    if (bbExist !== '') {
      if (remarkText !== '') {
        const regex = /(?<BB>\d(.*))/g;
        const match = regex.exec(remarkText);
        regex.lastIndex = 0;
        if (match !== null) {
          value = match[0];

          const aquaCHG = new Map<string, string>();
          aquaCHG.set('MatrixLineBB', value);

          this.remarksManagerService.createPlaceholderValues(aquaCHG, null, null);
        }
      }
    }
  }

  getMISForDeletion() {
    if (this.pnrService.pnrObj.miscSegments.length > 0) {
      this.pnrService.pnrObj.miscSegments.forEach((element) => {
        if (
          element.fullNode.itineraryFreetext.longFreetext.indexOf('PNR CANCELLED') > 0 ||
          element.fullNode.itineraryFreetext.longFreetext.indexOf('FEE ONLY') > 0
        ) {
          smartScriptSession.send('XE' + element.elementNumber);
        }
      });
    }
  }

  getIdsForDeletion(udids) {
    const remarksList = this.pnrService.pnrObj.rmElements;
    udids.forEach((x) => {
      for (const rm of remarksList) {
        if (rm.freeFlowText.startsWith(x)) {
          this.ars.deleteRemarksByIds.push(rm.elementNumber);
        }
      }
    });
  }

  revertDelete() {
    smartScriptSession.send('IR');
    this.ars.deleteRemarksByIds = [];
  }
}
