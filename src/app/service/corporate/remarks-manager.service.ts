import { Injectable } from '@angular/core';
import { RemarksManagerApiService } from './remarks-manager-api.service';
import { PlaceholderValues } from 'src/app/models/placeholder-values';
import { OutputItem } from 'src/app/models/output-item.model';

declare var smartScriptSession: any;
@Injectable({
  providedIn: 'root'
})
export class RemarksManagerService {
  matchedPlaceHolderValues = new Array<PlaceholderValues>();
  outputItems: Array<OutputItem>;
  newPlaceHolderValues = new Array<PlaceholderValues>();

  constructor(private serviceApi: RemarksManagerApiService) {}

  public async getMatchcedPlaceholderValues() {
    await this.serviceApi.getPnrMatchedPlaceHolderValues().then((res) => {
      if (res !== undefined) {
        res.placeHolderValues.forEach((ph) => {
          this.matchedPlaceHolderValues.push(new PlaceholderValues(ph));
        });
        this.outputItems = new Array<OutputItem>();
        res.outputItems.items.forEach((output) => {
          this.outputItems.push(new OutputItem(output));
        });
        console.log(this.matchedPlaceHolderValues);
      }
    });
  }

  getValue(key: string) {
    const values = this.getMatchedPlaceHoldersWithKey(key).map((pl) => pl.matchedPlaceholders.get(key));
    return values.filter((value, index, self) => self.indexOf(value) === index);
  }

  getMatchedPlaceHoldersWithKey(key: string) {
    return this.matchedPlaceHolderValues.filter((pl: PlaceholderValues) => pl.matchedPlaceholders && pl.matchedPlaceholders.has(key));
  }

  getMatchedPlaceHoldersWithExactKeys(keys: string[]) {
    return this.matchedPlaceHolderValues.filter(
      (pl: PlaceholderValues) => pl.matchedPlaceholders && this.hasCompleteKeys(pl.matchedPlaceholders, keys)
    );
  }

  // sample() {
  //   const values = new Map<string, string>();
  //   values.set('CAAirHighFare', '213123');
  //   this.createPlaceholderValues(values, [], []);
  // }

  public createPlaceholderValues(values: Map<string, string>, segmentRelate?: [], passengerRelate?: [], staticText?) {
    const placeHolder = new PlaceholderValues({
      id: this.getOutputItemId(values, staticText),
      segmentReferences: segmentRelate,
      passengerReferences: passengerRelate,
      matchedPlaceholders: values
    });

    this.newPlaceHolderValues.push(placeHolder);
  }

  public createPlaceholderValue(values: PlaceholderValues, staticText?) {
    values.id = this.getOutputItemId(values.matchedPlaceholders, staticText);
    this.newPlaceHolderValues.push(values);
  }

  getOutputItemId(values: Map<string, string>, staticText?) {
    const ids = this.outputItems
      .filter(
        (out) => this.hasCompleteKeys(values, out.placeholderKeys) && (staticText !== null ? out.format.indexOf(staticText) >= 0 : true)
      )
      .map((out) => out.id);
    return ids[0];
  }

  hasCompleteKeys(map: Map<string, string>, keys: string[]) {
    if (map.size !== keys.length) {
      return false;
    } else {
      return (
        Array.from(map.keys())
          .sort()
          .join('-') === keys.sort().join('-')
      );
    }
  }

  submitToPnr() {
    this.sendPnrToAmadeus(this.serviceApi.getPnrRequestParam(this.newPlaceHolderValues));
  }

  async sendPnrToAmadeus(pnrResponse: any) {
    await smartScriptSession.send(pnrResponse.deleteCommand);
    await smartScriptSession.requestService('ws.addMultiElement_v14.1', pnrResponse.pnrAddMultiElements).then((res) => {
      // debugger
      console.log(JSON.stringify(res));
    });
  }
}
