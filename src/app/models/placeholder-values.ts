export class PlaceholderValues {
  id: number;
  segmentNumberReferences = new Array<string>();
  passengerNumberReferences = new Array<string>();
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
        return;
      });
    }
  }

  toJsonObject() {
    return {
      id: this.id,
      segmentNumberReferences: this.segmentNumberReferences,
      passengerNumberReferences: this.passengerNumberReferences,
      conditions: this.convertMapToObj(this.conditions),
      matchedPlaceholders: this.convertMapToObj(this.matchedPlaceholders)
    };
  }

  convertMapToObj(map: Map<string, string>) {
    if (!map) {
      return null;
    }
    const obj = [];
    map.forEach((value: string, key: string) => {
      obj.push('"' + key + '": "' + value + '"');
    });
    return JSON.parse('{' + obj.join(',') + '}');
  }
}
