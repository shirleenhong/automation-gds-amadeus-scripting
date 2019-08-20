import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PnrService } from '../pnr.service';
import { common } from 'src/environments/common';

@Injectable({
  providedIn: 'root'
})
export class RemarksManagerApiService {
  constructor(private httpClient: HttpClient, private pnrService: PnrService) {}

  async getPnrMatchedPlaceHolderValues() {
    const param = await this.getPnrRequestParam();
    return await this.postRequest(common.matchedPlacholderValueService, param);
  }

  async getPnrAmadeusAddmultiElementRequest(placeholders: any) {
    const param = await this.getPnrRequestParam(placeholders);
    return this.postRequest(common.pnrAmadeusRequestService, param);
  }

  async postRequest(serviceName: string, body: any) {
    const hds = new HttpHeaders().append('Content', 'application/json');

    return this.httpClient
      .post<any>(serviceName, body, {
        headers: hds
      })
      .toPromise();
  }

  async getPnrRequestParam(placeholders?) {
    return {
      pnr: this.pnrService.pnrResponse,
      hierarchyParams: {
        clientSubUnitGuid: this.pnrService.getClientSubUnit(),
        gdsCode: '1A',
        latestVersionOnly: true
      },
      placeholders,
      isBeginPnr: false
    };
  }
}
