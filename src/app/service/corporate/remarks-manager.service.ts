import { Injectable } from '@angular/core';
import { RemarksManagerApiService } from './remarks-manager-api.service';
import { PlaceholderValues } from 'src/app/models/placeholder-values';
import { OutputItem } from 'src/app/models/output-item.model';
import { RemarkModel } from 'src/app/models/pnr/remark.model';
import { AmadeusRemarkService } from '../amadeus-remark.service';

declare var smartScriptSession: any;
@Injectable({
  providedIn: 'root'
})
export class RemarksManagerService {
  matchedPlaceHolderValues = new Array<PlaceholderValues>();
  outputItems: Array<OutputItem>;
  newPlaceHolderValues = new Array<PlaceholderValues>();
  receiveFrom = '';
  constructor(private serviceApi: RemarksManagerApiService, private amadeusRemarkService: AmadeusRemarkService) {}

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
    if (!this.matchedPlaceHolderValues) {
      return [];
    }
    return this.matchedPlaceHolderValues.filter((pl: PlaceholderValues) => pl.matchedPlaceholders && pl.matchedPlaceholders.has(key));
  }

  getMatchedPlaceHoldersWithExactKeys(keys: string[]) {
    if (!this.matchedPlaceHolderValues) {
      return [];
    }
    return this.matchedPlaceHolderValues.filter(
      (pl: PlaceholderValues) => pl.matchedPlaceholders && this.hasCompleteKeys(pl.matchedPlaceholders, keys)
    );
  }

  getSegmentAssoc(keys: string[]) {
    if (!this.matchedPlaceHolderValues) {
      return [];
    }
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

  async submitToPnr(additionalRemarks?: Array<RemarkModel>, additionalRemarksToBeDeleted?: Array<string>) {
    await this.sendPnrToAmadeus(
      await this.serviceApi.getPnrAmadeusAddmultiElementRequest(this.newPlaceHolderValues),
      additionalRemarks,
      additionalRemarksToBeDeleted
    );
  }

  private async sendPnrToAmadeus(pnrResponse: any, additionalRemarks?: Array<RemarkModel>, additionalRemarksToBeDeleted?: Array<string>) {
    if (pnrResponse.deleteCommand.trim() !== 'XE') {
      await smartScriptSession.send(this.combineForDeleteItems(pnrResponse.deleteCommand, additionalRemarksToBeDeleted));
    }

    if (additionalRemarks) {
      additionalRemarks.forEach((rem) => {
        if (rem.remarkType === 'AP') {
          pnrResponse.pnrAddMultiElements.dataElementsMaster.dataElementsIndiv.push(this.amadeusRemarkService.getAPRemarksElement(rem));
        } else {
          pnrResponse.pnrAddMultiElements.dataElementsMaster.dataElementsIndiv.push(this.amadeusRemarkService.getRemarkElement(rem));
        }
      });
    }

    await smartScriptSession.requestService('ws.addMultiElement_v14.1', pnrResponse.pnrAddMultiElements).then((res) => {
      console.log(JSON.stringify(res));
      this.newPlaceHolderValues = [];
      this.endPnr();
      this.refreshPnr();
    });
  }

  refreshPnr(): void {
    smartScriptSession.getActiveTask().then((x) => {
      if (x.subtype === 'PNR') {
        smartScriptSession.requestService('bookingfile.refresh', null, {
          fn: '',
          scope: this
        });
      } else {
        smartScriptSession.send('RT');
      }
      this.receiveFrom = 'CWTSCRIPT';
    });
  }

  async endPnr() {
    await smartScriptSession.send('RF' + this.receiveFrom);
    await smartScriptSession.send('ER');
  }

  setReceiveFrom(rcvFrom: string) {
    this.receiveFrom = rcvFrom;
  }

  private combineForDeleteItems(deleteResponse: string, additional: string[]): string {
    if (additional) {
      additional.forEach((add) => {
        deleteResponse
          .replace('XE', '')
          .split(',')
          .forEach((xe) => {
            if (xe.indexOf('-') >= 0) {
              const x = xe.split('-');
              if (!(parseInt(x[0], null) >= parseInt(add, null) && parseInt(xe[1], null) <= parseInt(add, null))) {
                deleteResponse += ',' + add;
              }
            }
          });
      });
    }
    return deleteResponse;
  }
}
