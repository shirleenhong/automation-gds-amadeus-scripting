export class OutputItem {
  id: number;
  format: string;
  typeName: string;
  remarkType: string;
  updateType: string;
  sequenceNumber: number;
  gdsRemarkQualifier: string;
  bindingTypeCode: 0;
  remarkGroupName: string;
  placeholderKeys = new Array<string>();

  constructor(json: any) {
    Object.assign(this, json);
    if (json && json.placeholders) {
      json.placeholders.forEach((p) => {
        this.placeholderKeys.push(p.name.replace(/%/g, ''));
      });
    }
  }
}
