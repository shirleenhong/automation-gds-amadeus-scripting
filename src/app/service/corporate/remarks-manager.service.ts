import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PnrService } from '../pnr.service';
import { common } from 'src/environments/common';
import { environment } from 'src/environments/environment';

declare var smartScriptSession: any;
@Injectable({
  providedIn: 'root'
})
export class RemarksManagerService {
  constructor(private httpClient: HttpClient, private pnrService: PnrService) {}

  public TestSendToPnr() {
    this.getPnrMatchedPlaceHolderValues().then((placeHolders) => {
      this.getPnrAmadeusAddmultiElementRequest(placeHolders).then((pnr) => {
        this.sendPnrToAmadeus(pnr);
      });
    });
  }

  async getPnrMatchedPlaceHolderValues() {
    const param = await this.getPnrRequestParam();
    return this.postRequest(common.matchedPlacholderValueService, param);
  }

  async getPnrAmadeusAddmultiElementRequest(placeholders: any) {
    const param = await this.getPnrRequestParam(placeholders);
    return this.postRequest(common.pnrAmadeusRequestService, param);
  }

  async postRequest(serviceName: string, body: any) {
    const hds = new HttpHeaders().append('Content', 'application/json');
    if (!environment.proxy) {
      serviceName = environment.remarksManagerUrlService + serviceName;
    }
    return this.httpClient
      .post<any>(serviceName, body, {
        headers: hds
      })
      .toPromise();
  }

  async getPnrRequestParam(placeholders?) {
    const syexgvs = this.pnrService.getRemarkText('SYEXGVS:');

    return {
      pnr: this.pnrService.pnrResponse,
      hierarchyParams: {
        clientSubUnitGuid: syexgvs.split(' ')[1],
        gdsCode: '1A',
        latestVersionOnly: true
      },
      placeholders,
      isBeginPnr: false
    };
  }

  async sendPnrToAmadeus(pnrResponse: any) {
    await smartScriptSession.send(pnrResponse.deleteCommand);
    await smartScriptSession.requestService('ws.addMultiElement_v14.1', pnrResponse.pnrAddMultiElements).then((res) => {
      // debugger
      console.log(JSON.stringify(res));
    });
  }
}
