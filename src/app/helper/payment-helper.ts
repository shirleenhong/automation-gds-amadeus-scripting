import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentRemarkHelper {
  checkDate(newValue) {
    if (newValue.length < 5) {
      return false;
    }
    const dts = newValue.split('/');
    const month = parseInt(dts[0], 0);
    const year = parseInt(dts[1], 0);

    const d = new Date();
    const moNow = d.getMonth();
    const yrnow = parseInt(
      d
        .getFullYear()
        .toString()
        .substr(2, 2),
      0
    );

    if (month < 0 || month > 12) {
      return false;
    }

    if (year > yrnow) {
      return true;
    }
    if (year === yrnow && month >= moNow + 1) {
      return true;
    }
    return false;
  }
}
