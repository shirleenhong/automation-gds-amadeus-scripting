export class BusinessRulesFormData {
  controlName: string;
  controlType: string;
  valueType?: string;
  currentValue?: string;
  placeholder?: string;
  options?: Array<{
    optionName: string;
    value: string;
  }>;
  validators?: {
    required?: boolean;
    minlength?: number;
    maxlength?: number;
  };

  constructor(json: any) {
    this.controlName = JSON.parse(json).label;
    this.controlType = JSON.parse(json).type;

    // for testing purposes
    // this.validators.required = false;
    // this.validators.minlength = 0;
    // this.validators.maxlength = 100;
  }
}
