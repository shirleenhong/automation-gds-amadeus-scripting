export class ControlConditionModel {
  operator: string;
  controlName: string;
  value: string;
  propertyName: string;
  propertyValue?: string;
  segmentType: string;

  constructor(json: any) {
    try {
      this.operator = json.operator;
      this.controlName = json.controlName;
      this.propertyName = json.propertyName;
      this.propertyValue = '';
      this.value = json.value;
      this.segmentType = json.segmentType;
    } catch (ex) {
      console.log('Error on Parsing Rule : ' + ex);
    }
  }
}
