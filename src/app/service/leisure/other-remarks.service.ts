import { Injectable } from '@angular/core';
import { RemarkGroup } from 'src/app/models/pnr/remark.group.model';
import { PnrService } from '../pnr.service';

@Injectable({
  providedIn: 'root'
})
export class OtherRemarksService {
  constructor(private pnrService: PnrService) {}

  writeConceirgeRemarks() {
    const conceirgeRemarkGroup = new RemarkGroup();
    conceirgeRemarkGroup.group = 'Conceirge Remarks';
    const travelRemarks = this.pnrService.getRIRLineNumber('INFO@RBCINFINITETRAVEL.COM');
    let itinLanguage = this.pnrService.getItineraryLanguage();
    const cfLine = this.pnrService.getCFLine();
    itinLanguage = itinLanguage.substr(0, 2);
    itinLanguage = itinLanguage ? itinLanguage : 'EN';

    if (cfLine.cfa !== 'RBM' && cfLine.cfa !== 'RBP') {
      return;
    }

    if (!travelRemarks) {
      switch (itinLanguage) {
        case 'EN': {
          const commandFR = 'PBN/YTOWL210N/CONCIERGE ENGLISH*';
          conceirgeRemarkGroup.cryptics.push(commandFR);
          break;
        }
        case 'FR': {
          const commandFR = 'PBN/YTOWL210N/CONCIERGE FRENCH*';
          conceirgeRemarkGroup.cryptics.push(commandFR);
        }
      }
      return conceirgeRemarkGroup;
    }
  }
}
