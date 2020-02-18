import { Injectable } from '@angular/core';
import { AirFareCommissionComponent } from 'src/app/corporate/pricing/air-fare-commission/air-fare-commission.component';
import { RemarkGroup } from 'src/app/models/pnr/remark.group.model';
import { RemarkModel } from 'src/app/models/pnr/remark.model';
import { FormArray } from '@angular/forms';
import { ExchangeEndorsementsComponent } from 'src/app/corporate/pricing/exchange-endorsements/exchange-endorsements.component';
import { RemarkHelper } from 'src/app/helper/remark-helper';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PricingService {
  toDeleteFmLines = [];
  constructor(private remarkHelper: RemarkHelper) {}
  getFMDetails(airfareComponent: AirFareCommissionComponent) {
    const rmGroup = new RemarkGroup();
    rmGroup.group = 'Pricing';
    rmGroup.remarks = new Array<RemarkModel>();
    rmGroup.cryptics = new Array<string>();
    rmGroup.deleteRemarkByIds = new Array<string>();
    this.getNewFMLines(airfareComponent, rmGroup);
    return rmGroup;
  }
  getNewFMLines(airfareComponent, rmGroup) {
    const formGroup = airfareComponent.airFareCommissionFormGroup;
    const items = formGroup.get('airFares') as FormArray;
    this.getUpdatedFMElements(airfareComponent, items, rmGroup);
  }

  getUpdatedFMElements(airfareComponent, items, rmGroup) {
    let isFMSelectedUI = false;
    this.toDeleteFmLines = [];
    for (const group of items.controls) {
      if (group.get('chkIncluded').value === true) {
        for (const airFare of airfareComponent.airFares) {
          if (group.get('segments').value === airFare.segments) {
            if (group.get('segments').value === '') {
              rmGroup.cryptics.push(this.addFMElement(group, airFare));
            } else {
              rmGroup.cryptics.push(this.addFMElement(group, airFare));
              const fmLineNum = this.getDeletedFmLine(airFare.segments, airfareComponent.newFmElements);
              if (fmLineNum !== '') {
                this.toDeleteFmLines.push(fmLineNum);
              }
            }
            break;
          }
        }
        // isFMSelectedUI = group.get('segments').value === '' ? false : true;
        isFMSelectedUI = true;
      }
    }
    airfareComponent.isGenericFmPresent = isFMSelectedUI ? isFMSelectedUI : false;
    if (airfareComponent.isGenericFmPresent) {
      const genericFmLine = this.getGenericFmLine(airfareComponent.newFmElements);
      if (genericFmLine !== '') {
        this.toDeleteFmLines.push(genericFmLine);
      }
    }
  }
  getDeletedFmLine(segments, fmElements) {
    let lineNum = '';
    for (const fmEle of fmElements) {
      if (fmEle.segments.toString().trim() === segments.toString()) {
        lineNum = fmEle.lineNo;
        break;
      }
    }
    return lineNum;
  }
  getGenericFmLine(fmElements) {
    let lineNo = '';
    for (const fmEle of fmElements) {
      if (fmEle.segments[0] === '') {
        lineNo = fmEle.lineNo;
        break;
      }
    }
    return lineNo;
  }
  addFMElement(group, airFare) {
    let commission = group.get('commission').value;
    if (group.get('commissionType').value === 'Dollar Amount') {
      commission += 'A';
    } else {
      commission = commission.indexOf('A') > -1 ? commission.replace('A', '') : commission;
    }
    let rmkText = '';
    if (airFare.oldCommission === '') {
      rmkText = commission;
    } else {
      rmkText = commission + '/XO/' + airFare.oldCommission;
    }
    return this.formFmCommand(rmkText, airFare.segments);
  }
  formFmCommand(rmkText, segments) {
    const tempFmCommand = 'FM' + rmkText;
    return segments === '' ? tempFmCommand : tempFmCommand + '/S' + segments;
  }
  getRemark(remarkText, remarkType, relatedSegments) {
    const rem = new RemarkModel();
    rem.remarkType = remarkType;
    rem.remarkText = remarkText;
    rem.category = '';
    rem.relatedSegments = relatedSegments.split(',');
    return rem;
  }

  getExchangeEndorsement(exchangeEndorsement: ExchangeEndorsementsComponent) {
    const rmGroup = new RemarkGroup();
    rmGroup.group = 'Pricing';
    rmGroup.remarks = new Array<RemarkModel>();
    rmGroup.cryptics = new Array<string>();
    rmGroup.updateCommands = new Array<string>();
    rmGroup.deleteRemarkByIds = new Array<string>();
    this.formExchangeRemarks(exchangeEndorsement, rmGroup);
    return rmGroup;
  }

  formExchangeRemarks(exchangeEndorsement, rmGroup) {
    const formGroup = exchangeEndorsement.exchangeEndorsementsForm;
    const items = formGroup.get('exchangeTickets') as FormArray;
    let endorse = '';
    let rmaremark = '';
    let osi = '';

    for (const group of items.controls) {
      if (group.get('exchangeEndorsement').value === true) {
        switch (group.get('airline').value) {
          case 'AC':
            endorse = 'DUE SKCH';
            rmaremark = 'ADD ENDORSE-DUE SKCH';
            break;
          case 'OS':
            endorse = 'REISSUED DUE TO SC OS';
            rmaremark = 'ADD ENDORSE-REISSUED DUE TO SC OS';
            break;
          case 'SN':
            endorse = 'REISSUED DUE TO SC SN';
            rmaremark = 'ADD ENDORSE-REISSUED DUE TO SC SN';
            break;
          case 'LH':
            endorse = 'INVOL DUE SCHED CHNGE LH';
            rmaremark = 'ADD ENDORSE-INVOL DUE SCHED CHNGE LH';
            break;
        }
        if (group.get('airline').value !== 'AC') {
          const datePipe2 = new DatePipe('en-US');
          const scdate = datePipe2.transform(group.get('scDate').value, 'ddMMM');
          endorse = endorse + group.get('scFlight').value + '/' + scdate;
          rmaremark = rmaremark + group.get('scFlight').value + '/' + scdate;
        }
      }

      if (group.get('airline').value === 'UA' && group.get('uaEndorsement').value) {
        switch (group.get('uaEndorsement').value) {
          case 'UASKEDCHG':
            endorse = 'UASKEDCHG';
            osi = 'OS UA UASKEDCHG/UA';
            break;
          case 'UAIRROPSDELAY':
            endorse = 'UAIRROPS';
            osi = 'OS UA IRR DELAY/UA';
            break;
          case 'UAIRROPSCANCEL':
            endorse = 'UAIRROPS';
            osi = 'OS UA IRR CANCEL/UA';
            break;
          case 'UAMKW':
            endorse = 'UAMKW';
            osi = 'OS UA MKW';
            break;
          case 'OASKEDCHG':
            endorse = 'OASKEDCHG';
            osi = 'OS UA OASKEDCHG/OA FLT';
            break;
        }
        if (group.get('scFlight').value && group.get('scDate').value && group.get('uaEndorsement').value !== 'UAMKW') {
          const datePipe2 = new DatePipe('en-US');
          const scdate = datePipe2.transform(group.get('scDate').value, 'ddMMM');
          osi = osi + group.get('scFlight').value + '/' + scdate;
        }

        rmaremark = 'ADD ENDORSE-' + endorse;
        rmGroup.cryptics.push(osi);
      }

      if (group.get('exchangeServiceFund').value === true && group.get('exchangeServiceValue').value) {
        let rem = '';
        endorse = endorse + group.get('exchangeServiceValue').value;
        if (group.get('airline').value !== 'UA') {
          rem = group.get('airline').value + ' SVC FUND USED/CODE-' + group.get('exchangeServiceValue').value;
        } else {
          rem = group.get('airline').value + ' SVC FUND USED/WAIVER-' + group.get('exchangeServiceValue').value;
        }
        rmGroup.remarks.push(this.remarkHelper.createRemark(rem, 'RM', 'A'));
      }
      rmGroup.remarks.push(this.remarkHelper.createRemark(rmaremark, 'RM', 'A'));
      rmGroup.updateCommands.push(group.get('lineNo').value + '//' + endorse);
    }
  }
}
