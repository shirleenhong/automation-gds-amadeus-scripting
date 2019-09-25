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

  constructor(private serviceApi: RemarksManagerApiService) { }

  public async getMatchcedPlaceholderValues() {
    return await this.serviceApi
      .getPnrMatchedPlaceHolderValues()
      .then((res) => {
        if (res !== undefined) {
          res.placeHolderValues.forEach((ph) => {
            this.matchedPlaceHolderValues.push(new PlaceholderValues(ph));
          });

          this.outputItems = new Array<OutputItem>();
          res.outputItems.items.forEach((output) => {
            this.outputItems.push(new OutputItem(output));
          });
          console.log(JSON.stringify(res));
        }
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
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

  getSegmentAssoc(keys: string[]) {
    return this.matchedPlaceHolderValues.filter(
      (pl: PlaceholderValues) => pl.matchedPlaceholders && this.hasCompleteKeys(pl.matchedPlaceholders, keys)
    );
  }

  // Create placeholder value for writing remarks
  public createPlaceholderValues(
    values?: Map<string, string>,
    conditions?: Map<string, string>,
    segmentRelate?: string[],
    passengerRelate?: string[],
    staticText?,
    exactSearch?: boolean
  ) {
    const placeHolder = new PlaceholderValues({
      id:
        exactSearch === true
          ? this.getOutputItemIdExactRemarks(values, staticText, conditions)
          : this.getOutputItemId(values, staticText, conditions),
      segmentNumberReferences: segmentRelate,
      passengerNumberReferences: passengerRelate,
      matchedPlaceholders: null
    });
    placeHolder.matchedPlaceholders = values;
    placeHolder.conditions = conditions;
    this.newPlaceHolderValues.push(placeHolder);
  }

  public createPlaceholderValue(values?: PlaceholderValues, staticText?) {
    values.id = this.getOutputItemId(values.matchedPlaceholders, staticText);
    this.newPlaceHolderValues.push(values);
  }

  // use this if you wan to forcely delete the remark
  public createEmptyPlaceHolderValue(keys: string[], condition?, staticText?) {
    const map = new Map<string, string>();
    keys.forEach((key) => {
      map.set(key, '');
    });
    const placeHolder = new PlaceholderValues({
      id: this.getOutputItemId(map, staticText, condition),
      segmentNumberReferences: [],
      passengerNumberReferences: [],
      matchedPlaceholders: null
    });
    this.newPlaceHolderValues.push(placeHolder);
  }

  // search OutputItemId with the given placeholdervalues
  getOutputItemId(values?: Map<string, string>, staticText?, conditions?: Map<string, string>) {
    const ids = this.outputItems
      .filter(
        (out) =>
          (values && this.hasCompleteKeys(values, out.placeholderKeys) && (staticText ? out.format.indexOf(staticText) >= 0 : true)) ||
          (!values &&
            conditions &&
            this.hasMatchedConditions(conditions, out.conditions) &&
            (staticText ? out.format.indexOf(staticText) >= 0 : false))
      )
      .map((out) => out.id);
    return ids[0];
  }

  getOutputItemIdExactRemarks(values?: Map<string, string>, staticText?, conditions?: Map<string, string>) {
    const ids = this.outputItems
      .filter(
        (out) =>
          !values && conditions && this.hasMatchedConditions(conditions, out.conditions) && (staticText ? out.format === staticText : false)
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

  hasMatchedConditions(map: Map<string, string>, conditions: any) {
    let result = true;
    if (conditions) {
      conditions.forEach((condition) => {
        result = map.get(condition.name) && result ? true : false;
      });
    }
    return result;
  }

  async submitToPnr() {
    await this.sendPnrToAmadeus(await this.serviceApi.getPnrAmadeusAddmultiElementRequest(this.newPlaceHolderValues));
  }

  async sendPnrToAmadeus(pnrResponse: any) {
    if (pnrResponse.deleteCommand.trim() !== 'XE') {
      await smartScriptSession.send(pnrResponse.deleteCommand);
    }
    await smartScriptSession.requestService('ws.addMultiElement_v14.1', pnrResponse.pnrAddMultiElements).then((res) => {
      console.log(JSON.stringify(res));
      this.newPlaceHolderValues = [];
      smartScriptSession.getActiveTask().then((x) => {
        if (x.subtype === 'PNR') {
          smartScriptSession.requestService('bookingfile.refresh', null, {
            fn: '',
            scope: this
          });
        } else {
          smartScriptSession.send('RT');
        }
      });
    });
  }
}
