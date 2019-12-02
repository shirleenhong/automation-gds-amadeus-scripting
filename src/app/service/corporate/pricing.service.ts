import { Injectable } from '@angular/core';
import { AirFareCommissionComponent } from 'src/app/corporate/pricing/air-fare-commission/air-fare-commission.component';
import { RemarkGroup } from 'src/app/models/pnr/remark.group.model';
import { RemarkModel } from 'src/app/models/pnr/remark.model';
import { FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PricingService {
  toDeleteFmLines = [];
  constructor() { }
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
            rmGroup.cryptics.push(this.addFMElement(group, airFare));
            const fmLineNum = this.getDeletedFmLine(airFare.segments, airfareComponent.newFmElements);
            if (fmLineNum !== '') {
              this.toDeleteFmLines.push(fmLineNum);
            }
            break;
          }
        }
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
      if (fmEle.segments.length === 0) {
        lineNo = fmEle.lineNo;
        break;
      }
    }
    return lineNo;
  }
  addFMElement(group, airFare) {
    let rmkText = '';
    if (airFare.oldCommission === '') {
      rmkText = group.get('commission').value + '/';
    } else {
      rmkText = group.get('commission').value + '/XO/' + airFare.oldCommission + '/';
    }
    return 'FM ' + rmkText + 'S' + airFare.segments;
  }
  getRemark(remarkText, remarkType, relatedSegments) {
    const rem = new RemarkModel();
    rem.remarkType = remarkType;
    rem.remarkText = remarkText;
    rem.category = '';
    rem.relatedSegments = relatedSegments.split(',');
    return rem;
  }
}
