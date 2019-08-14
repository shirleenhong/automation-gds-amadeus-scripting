import { Injectable } from '@angular/core';
import { RemarksManagerApiService } from './remarks-manager-api.service';

declare var smartScriptSession: any;
@Injectable({
  providedIn: 'root'
})
export class RemarksManagerService {
  matchedPlaceHolderValues = [];
  constructor(private serviceApi: RemarksManagerApiService) {}

  public async getMatchcedPlaceholderValues() {
    await this.serviceApi.getPnrMatchedPlaceHolderValues().then((matchedValues) => (this.matchedPlaceHolderValues = matchedValues));
  }

  // public TestSendToPnr() {
  //   this.getPnrMatchedPlaceHolderValues().then((placeHolders) => {
  //     this.getPnrAmadeusAddmultiElementRequest(placeHolders).then((pnr) => {
  //       this.sendPnrToAmadeus(pnr);
  //     });
  //   });
  // }

  async sendPnrToAmadeus(pnrResponse: any) {
    await smartScriptSession.send(pnrResponse.deleteCommand);
    await smartScriptSession.requestService('ws.addMultiElement_v14.1', pnrResponse.pnrAddMultiElements).then((res) => {
      // debugger
      console.log(JSON.stringify(res));
    });
  }
}
