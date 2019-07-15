import { Injectable } from '@angular/core';
import { PnrService } from '../service/pnr.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PackageRemarkHelper {
  forDeletion = [];

  constructor(private pnrService: PnrService) {}

  getForDeletion() {
    return this.forDeletion;
  }

  getCount(search: string, category: string, controlName: string, group: FormGroup) {
    const textSearch = this.pnrService.getRirRemarkText(search + ' ' + category);
    if (textSearch !== '') {
      if (textSearch.fullNode.miscellaneousRemarks.remarks.freetext !== '') {
        const regx = 'X(\\d+)\\b';
        group.controls[controlName].setValue(
          this.getRegexResult(textSearch.fullNode.miscellaneousRemarks.remarks.freetext, regx).replace('X', '')
        );
      }
    }
  }

  getValues(search: string, category: string, controlName: string, group: FormGroup) {
    const textSearch = this.pnrService.getRirRemarkText(search + ' ' + category);
    const regx = '(\\d+((?:,\\d+)*,\\d{3})?\\.\\d{2,3})(.*?X)';
    if (textSearch !== '') {
      if (textSearch.fullNode.miscellaneousRemarks.remarks.freetext !== '') {
        group.controls[controlName].setValue(
          this.getRegexResult(textSearch.fullNode.miscellaneousRemarks.remarks.freetext, regx).replace('X', '')
        );
        // this.forDeletion.push(textSearch.elementNumber);
      }
    }
  }

  getValuesFromPnr(searchString: string) {
    // tslint:disable-next-line: max-line-length
    const regex = /(?<name>.*?)(?<amount>(\d+((?:,\d+)*,\d{3})?\.\d{2,3}))(X)(?<count>[0-9])(\-*)(?<total>(\d+((?:,\d+)*,\d{3})?\.\d{2,3}))/g;

    const textSearch = this.pnrService.getRirRemarkText(searchString);
    if (textSearch !== '') {
      const rem = textSearch.fullNode.miscellaneousRemarks.remarks.freetext;
      if (rem !== '') {
        const match = regex.exec(rem);
        if (match) {
          const result = { amount: match.groups.amount, count: match.groups.count, total: match.groups.count };
          regex.lastIndex = 0;
          if (!this.forDeletion.includes(textSearch.elementNumber)) {
            this.forDeletion.push(textSearch.elementNumber);
          }
          return result;
        }
      }
    }
    return null;
  }

  getCurrency() {
    const textSearch = this.pnrService.getRirRemarkText('THE FOLLOWING COSTS ARE SHOWN IN');
    if (textSearch !== '') {
      if (!this.forDeletion.includes(textSearch.elementNumber)) {
        this.forDeletion.push(textSearch.elementNumber);
      }
      if (textSearch.fullNode.miscellaneousRemarks.remarks.freetext !== '') {
        const currency = textSearch.fullNode.miscellaneousRemarks.remarks.freetext.split(' ');
        if (currency.length === 7) {
          return currency[6];
        }
      }
    }
    return '';
  }

  removeOtherTourRemark() {
    const textOne = this.pnrService.getRirRemarkText('SOME TAXES ARE PAYABLE LOCALLY AND NOT INCLUDED ABOVE');
    if (textOne !== '') {
      this.forDeletion.push(textOne.elementNumber);
    }
  }

  getUDIDPackageRemarksFromGds(group: FormGroup) {
    const commAmount = this.pnrService.getUDIDText('*U42/');
    if (commAmount !== '') {
      group.controls.commission.setValue(commAmount.fullNode.miscellaneousRemarks.remarks.freetext.replace('*U42/-', ''));
      this.forDeletion.push(commAmount.elementNumber);
    }
    const ufortyOne = this.pnrService.getUDIDText('*U41/');
    const ufortyThree = this.pnrService.getUDIDText('*U43/');
    if (ufortyOne !== '') {
      this.forDeletion.push(ufortyOne.elementNumber);
    }

    if (ufortyThree !== '') {
      this.forDeletion.push(ufortyThree.elementNumber);
    }
  }

  getBalanceDueDate() {
    const textSearch = this.pnrService.getRirRemarkText('---- BALANCE OF');
    if (textSearch !== '') {
      if (textSearch.fullNode.miscellaneousRemarks.remarks.freetext !== '') {
        const values = textSearch.fullNode.miscellaneousRemarks.remarks.freetext.split(' ');
        if (values.length === 8) {
          // 15MAR19 7
          // 1JAN19  6
          // return new Date(values[6]);
          let lenV = 0;
          if (values[6].length === 7) {
            lenV = 1;
          }

          const myDate: Date = new Date();
          const currentYear = new Date().getFullYear();
          const dueDateYear = Number(this.sliceValuesInString(values[6], 4 + lenV, 4 + lenV + 2));
          // const year = currentYear - dueDateYear;
          myDate.setMonth(this.getMonthNumber(this.sliceValuesInString(values[6], 1 + lenV, 1 + lenV + 3)));
          myDate.setFullYear(Number(Math.floor(currentYear / 100).toString() + dueDateYear.toString()));
          myDate.setDate(Number(this.sliceValuesInString(values[6], 0, 1 + lenV)));
          if (!this.forDeletion.includes(textSearch.elementNumber)) {
            this.forDeletion.push(textSearch.elementNumber);
          }
          return myDate.toISOString().substr(0, 10);
        }
      }
    }

    return '';
  }

  private sliceValuesInString(value: string, startIndex: number, endIndex: number) {
    return value.slice(startIndex, endIndex);
  }

  private getMonthNumber(month: string) {
    if (month === 'JAN') {
      return 0;
    }
    if (month === 'FEB') {
      return 1;
    }
    if (month === 'MAR') {
      return 2;
    }
    if (month === 'APR') {
      return 3;
    }
    if (month === 'MAY') {
      return 4;
    }
    if (month === 'JUN') {
      return 5;
    }
    if (month === 'JUL') {
      return 6;
    }
    if (month === 'AUG') {
      return 7;
    }
    if (month === 'SEP') {
      return 8;
    }
    if (month === 'OCT') {
      return 9;
    }
    if (month === 'NOV') {
      return 10;
    }
    if (month === 'DEC') {
      return 11;
    }
  }

  getRegexResult(rem: string, regx: string | RegExp) {
    const regexp = new RegExp(regx);
    const textSearch = this.pnrService.getRirRemarkText(rem);
    if (textSearch !== '') {
      if (textSearch.fullNode.miscellaneousRemarks.remarks.freetext !== '') {
        let result = regexp.exec(textSearch.fullNode.miscellaneousRemarks.remarks.freetext);
        if (!result) {
          regexp.lastIndex = 0;
          result = regexp.exec(textSearch.fullNode.miscellaneousRemarks.remarks.freetext);
        }
        if (result) {
          if (!this.forDeletion.includes(textSearch.elementNumber)) {
            this.forDeletion.push(textSearch.elementNumber);
          }
          return result[0];
        }
      }
    }
    return '0.00';
  }

  clearForDeletionRemarks() {
    this.forDeletion = [];
  }
}
