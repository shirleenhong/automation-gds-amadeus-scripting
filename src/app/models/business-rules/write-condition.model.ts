import { ControlConditionModel } from './control-condition.model';

export class WriteConditionModel {
  conditions = [];
  remarks = [];
  constructor(json: any) {
    try {
      const jsonObj = JSON.parse(json);
      jsonObj.conditions.forEach((element) => {
        this.conditions.push(new ControlConditionModel(element));
      });
      jsonObj.remarks.forEach((rem) => {
        this.remarks.push(rem);
      });
    } catch (ex) {
      console.log('Error on Parsing WriteCondtionModel : ' + ex);
    }
  }
}
