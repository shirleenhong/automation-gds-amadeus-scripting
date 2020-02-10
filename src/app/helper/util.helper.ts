import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilHelper {
  modelCopy(src, target) {
    for (const prop in src) {
      if (src.hasOwnProperty(prop)) {
        target[prop] = src[prop];
      }
    }
  }

  getRegexValue(freeText: string, regx: string) {
    const expression = new RegExp(regx);
    if (expression.test(freeText)) {
      for (let result = expression.exec(freeText); result !== null; result = expression.exec(freeText)) {
        return result[0];
      }
    }
    return '';
  }

  validateAllFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      } else if (control instanceof FormArray) {
        for (const c of control.controls) {
          if (c instanceof FormGroup) {
            this.validateAllFields(c);
          }
          c.markAsTouched({ onlySelf: true });
        }
      }
    });
  }

  enableDisableControls(form: FormGroup, controls: string[], enable: boolean) {
    controls.forEach((element) => {
      if (form.get(element)) {
        if (enable) {
          form.get(element).enable();
        } else {
          form.get(element).disable();
        }
      }
    });
  }

  convertSegmentDate(_date: string) {
    const day = _date.substr(0, 2);
    const month = _date.substr(2, 2);
    const year = _date.substr(4, 2);

    return new Date(
      month +
        '/' +
        day +
        '/' +
        new Date(Date.now())
          .getFullYear()
          .toString()
          .substr(0, 2) +
        year
    );
  }

  dateDiffInDays(dt1: Date, dt2: Date) {
    const days = Math.floor(
      (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
        (1000 * 60 * 60 * 24)
    );
    return days;
  }

  dateDiffInHours(dt1: Date, dt2: Date) {
    const hours = (dt2.getTime() - dt1.getTime()) / (1000 * 60 * 60);
    return hours;
  }

  getObjectMapKeyValueByIndex(object: any, index: number) {
    const key = Object.keys(object)[index];
    const value = object[key];
    return value;
  }
}
