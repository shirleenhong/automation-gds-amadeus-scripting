import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PnrService } from '../pnr.service';
import { common } from 'src/environments/common';
import { PlaceholderValues } from 'src/app/models/placeholder-values';

@Injectable({
  providedIn: 'root'
})
export class RemarksManagerApiService {
  constructor(private httpClient: HttpClient, private pnrService: PnrService) { }

  async getPnrMatchedPlaceHolderValues() {
    const param = this.getPnrRequestParam();
    return await this.postRequest(common.matchedPlacholderValueService, param);
  }

  async getPnrAmadeusAddmultiElementRequest(placeholders: Array<PlaceholderValues>) {
    const param = this.getPnrRequestParam(placeholders);
    return await this.postRequest(common.pnrAmadeusRequestService, param);
  }

  async postRequest(serviceName: string, body: any) {
    const hds = new HttpHeaders().append('Content', 'application/json');
    // if (!environment.proxy) {
    //   serviceName = environment.remarksManagerUrlService + serviceName;
    // }
    return this.httpClient
      .post<any>(serviceName, body, {
        headers: hds
      })
      .toPromise();
  }

  getPnrRequestParam(placeholders?: Array<PlaceholderValues>) {
    const phvalues = (placeholders ? placeholders.map((x) => x.toJsonObject()) : null);
    return {
      pnr: this.pnrService.pnrResponse,
      hierarchyParams: {
        clientSubUnitGuid: this.pnrService.getClientSubUnit(),
        gdsCode: '1A',
        latestVersionOnly: true
      },
      placeholders: phvalues,
      isBeginPnr: false
    };
  }
}
