export class ControlConditionModel {
  operator: string;
  controlName: string;
  value: string;

  constructor(json: any) {
    try {
      this.operator = json.operator;
      this.controlName = json.controlName;
      this.value = json.value;
    } catch (ex) {
      console.log('Error on Parsing Rule : ' + ex);
    }
  }
}
