import { Injectable } from '@angular/core';
import { PnrService } from '../pnr.service';

@Injectable({
  providedIn: 'root'
})
export class RulesReaderService {
  businessEntities = new Map<string, string>();
  format = [
    { type: 'RM', category: 'A', regex: /(?<PNR_A>.*)$/g },
    { type: 'RM', category: 'B', regex: /(?<PNR_B>.*)$/g },
    { type: 'RM', category: 'C', regex: /(?<PNR_C>.*)$/g },
    { type: 'RM', category: 'E', regex: /(?<PNR_E>.*)$/g },
    { type: 'RM', category: 'F', regex: /(?<PNR_F>.*)$/g },
    { type: 'RM', category: 'G', regex: /(?<PNR_G>.*)$/g },
    { type: 'RM', category: 'H', regex: /(?<PNR_H>.*)$/g },
    { type: 'RM', category: 'I', regex: /(?<PNR_I>.*)$/g },
    { type: 'RM', category: 'J', regex: /(?<PNR_J>.*)$/g },
    { type: 'RM', category: 'K', regex: /(?<PNR_K>.*)$/g },
    { type: 'RM', category: 'L', regex: /(?<PNR_L>.*)$/g },
    { type: 'RM', category: 'M', regex: /(?<PNR_M>.*)$/g },
    { type: 'RM', category: 'N', regex: /(?<PNR_N>.*)$/g },
    { type: 'RM', category: 'O', regex: /(?<PNR_O>.*)$/g },
    { type: 'RM', category: 'P', regex: /(?<PNR_P>.*)$/g },
    { type: 'RM', category: 'Q', regex: /(?<PNR_Q>.*)$/g },
    { type: 'RM', category: 'R', regex: /(?<PNR_R>.*)$/g },
    { type: 'RM', category: 'S', regex: /(?<PNR_S>.*)$/g },
    { type: 'RM', category: 'T', regex: /(?<PNR_T>.*)$/g },
    { type: 'RM', category: 'U', regex: /(?<PNR_U>.*)$/g },
    { type: 'RM', category: 'V', regex: /(?<PNR_V>.*)$/g },
    { type: 'RM', category: 'W', regex: /(?<PNR_W>.*)$/g },
    { type: 'RM', category: 'X', regex: /(?<PNR_X>.*)$/g },
    { type: 'RM', category: 'Y', regex: /(?<PNR_Y>.*)$/g },
    { type: 'RM', category: 'Z', regex: /(?<PNR_Z>.*)$/g },
    { type: 'RM', category: '*', regex: /U50\/-(?<PNR_UDID50>.*)$/g }
  ];

  constructor(private pnrService: PnrService) {}

  public readPnr() {
    let remarks;
    this.format.forEach((f) => {
      try {
        switch (f.type) {
          case 'RM':
            remarks = this.pnrService.pnrObj.rmElements.filter((x) => x.category === f.category && x.freeFlowText.match(f.regex));
            remarks.forEach((rm) => {
              this.setMatchEntity(f.regex, rm.freeFlowText);
            });
            break;
          case 'RI':
            remarks = this.pnrService.pnrObj.ri.filter((x) => x.category === f.category && x.freeFlowText.match(f.regex));
            remarks.forEach((rm) => {
              this.setMatchEntity(f.regex, rm.freeFlowText);
            });
            break;
        }
      } catch (ex) {
        console.log(ex);
      }
    });
  }

  private setMatchEntity(regex, text) {
    const match = regex.exec(text);
    Object.keys(match.groups).forEach((key) => {
      if (this.businessEntities.has(key)) {
        this.businessEntities.set(key, this.businessEntities.get(key) + '\n' + match.groups[key]);
      } else {
        this.businessEntities.set(key, match.groups[key]);
      }
    });
  }
}
