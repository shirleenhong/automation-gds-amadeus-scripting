import { ValidatorFn, AbstractControl } from '@angular/forms';

export function validateSegmentNumbers(segments: any[]): ValidatorFn {
  return (currentControl: AbstractControl): { [key: string]: any } => {
    if (currentControl.value === undefined) {
      return { no_value: true };
    }
    if (segments === undefined || segments.length === 0) {
      return { no_segments: true };
    }
    let response = null;
    const segs = currentControl.value.toString().split(',');
    segs.forEach((x) => {
      const s = segments.find((z) => z.lineNo === x);
      if (s == null || s === undefined) {
        response = { segment_not_found: true };
        return response;
      }
    });

    return response;
  };
}

export function validatePassengerNumbers(passenger: any[]): ValidatorFn {
  return (currentControl: AbstractControl): { [key: string]: any } => {
    if (currentControl.value === undefined) {
      return { no_value: true };
    }
    if (passenger === undefined || passenger.length === 0) {
      return { no_passenger: true };
    }
    let response = null;
    const pass = currentControl.value.toString().split(',');
    pass.forEach((x) => {
      const s = passenger.find((z) => z.id === x);
      if (s == null || s === undefined) {
        response = { passenger_not_found: true };
        return response;
      }
    });

    return response;
  };
}

export function validateCreditCard(vendorControlName): ValidatorFn {
  return (currentControl: AbstractControl): { [key: string]: any } => {
    if (currentControl.value === undefined) {
      return { no_value: true };
    }
    if (currentControl.parent === undefined) {
      return { no_value: true };
    }
    const vendor = currentControl.parent.get(vendorControlName).value;
    //  let response = null;
    let pat = '';
    switch (vendor) {
      case 'VI': {
        pat = '^4[0-9]{15}$';
        break;
      }
      case 'CA': {
        pat = '^5[0-9]{15}$';
        break;
      }
      case 'AX': {
        pat = '^3[0-9]{14}$';
        break;
      }
      case 'DC': {
        pat = '^[0-9]{14,16}$';
        break;
      }
      default: {
        pat = '^[0-9]{14,16}$';
        break;
      }
    }

    if (currentControl.value.toString().match(pat) === null) {
      return { INVALID_CC: true };
    }

    // currentControl.setValidators(Validators.pattern(pat));
    return null;
  };
}

export function validateExpDate(): ValidatorFn {
  return (currentControl: AbstractControl): { [key: string]: any } => {
    const newValue = currentControl.value;
    if (newValue === undefined) {
      return { no_value: true };
    }
    if (newValue.length < 5) {
      return { INVALID_LENGTH: true };
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
      return { INVALID_MONTH: true };
    }

    if (year > yrnow || (year === yrnow && month >= moNow + 1)) {
      return null;
    } else {
      return { INVALID_EXP_DATE: true };
    }
  };
}

export function validateNotEqualTo(compareValues: string[]): ValidatorFn {
  return (currentControl: AbstractControl): { [key: string]: any } => {
    if (currentControl.value === undefined) {
      return { no_value: true };
    }
    if (currentControl.parent === undefined) {
      return { no_value: true };
    }

    if (compareValues && compareValues.length > 0 && compareValues.indexOf(currentControl.value) >= 0) {
      return { EQUAL_VALUE_NOT_ALLOWED: true };
    }

    // currentControl.setValidators(Validators.pattern(pat));
    return null;
  };
}
