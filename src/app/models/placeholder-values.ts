export class PlaceholderValues {
  id: number;
  segmentNumberReferences: Array<string>;
  passengerNumberReferences: Array<string>;
  conditions = new Map<string, string>();
  matchedPlaceholders = new Map<string, string>();

  constructor(json: any) {
    this.id = json.id;
    this.segmentNumberReferences = json.segmentNumberReferences;
    this.passengerNumberReferences = json.passengerNumberReferences;
    this.setCondition(json.conditions);
    this.setMatchedPlaceholders(json.matchedPlaceholders);
  }

  setCondition(jsonObj) {
    if (jsonObj) {
      Object.keys(jsonObj).forEach((key) => {
        this.conditions.set(key, jsonObj[key]);
      });
    }
  }

  setMatchedPlaceholders(jsonObj) {
    if (jsonObj) {
      Object.keys(jsonObj).forEach((key) => {
        this.matchedPlaceholders.set(key, jsonObj[key]);
      });
    }
  }
}
