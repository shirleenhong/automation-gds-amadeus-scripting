export class BusinessRulesFormData {
  controlName: string;
  controlType: string;
  label: string;
  valueType?: string;
  currentValue?: string;
  placeholder?: string;
  options?: Array<{
    name: string;
    value: string;
  }>;
  validators?: {
    required?: boolean;
    minlength?: number;
    maxlength?: number;
  };

  constructor(json: any) {
    try {
      const jsonObj = JSON.parse(json);
      this.label = jsonObj.label;
      this.controlName = jsonObj.name;   

      this.controlType = jsonObj.type;

      if (jsonObj.options) {
        this.options = jsonObj.options;
      }
      const optionDetails = {
        required: jsonObj.required,
        minlength: jsonObj.minlength,
        maxlength: jsonObj.maxlength
      };
      this.validators = optionDetails;
    } catch (ex) {
      console.log('Error on Parsing Rule : ' + ex);
    }
  }
}
