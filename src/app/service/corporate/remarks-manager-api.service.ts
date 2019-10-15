import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PnrService } from '../pnr.service';
import { common } from 'src/environments/common';
import { PlaceholderValues } from 'src/app/models/placeholder-values';
// import { DDBService } from '../ddb.service';
import { environment } from '../../../environments/environment';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RemarksManagerApiService {
  retry = 0;
  isTokenExpired = true;
  token: string;

  constructor(private httpClient: HttpClient, private pnrService: PnrService) { }

  async getToken() {
    if (this.isTokenExpired) {
      const bodyInfo = {
        client_id: common.clientId_rms,
        client_secret: environment.clientSecret_rms,
        grant_type: 'client_credentials'
      };
      localStorage.removeItem('token_rms');
      const hds = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      console.log(JSON.stringify(bodyInfo));
      await this.httpClient
        .post<any>(common.tokenService_rms, JSON.stringify(bodyInfo), {
          headers: hds
        })
        .toPromise()
        .then((res) => {
          this.isTokenExpired = false;
          this.token = res.access_token;
          localStorage.setItem('token_rms', this.token);
          interval((res.expires_in - 30) * 1000).subscribe(() => {
            this.isTokenExpired = true;
          });
        });
    }
  }

  async getPnrMatchedPlaceHolderValues() {
    const param = this.getPnrRequestParam();
    console.log(JSON.stringify(param));
    return await this.postRequest(common.matchedPlacholderValueService, param);
  }

  async getPnrAmadeusAddmultiElementRequest(placeholders: Array<PlaceholderValues>) {
    const param = this.getPnrRequestParam(placeholders);
    console.log(JSON.stringify(param));
    return await this.postRequest(common.pnrAmadeusRequestService, param);
  }

  async postRequest(serviceName: string, body: any) {
    if (!environment.proxy) {
      await this.getToken();
    }

    const hds = new HttpHeaders().append('Content', 'application/json');
    return this.httpClient
      .post<any>(serviceName, body, {
        headers: hds
      })
      .toPromise()
      .catch((e) => {
        // retry if unauthorized to get new token
        if (e.status === 401 && this.retry < 3) {
          this.retry += 1;
          this.isTokenExpired = true;
          this.postRequest(serviceName, body);
        }
      });
  }

  getPnrRequestParam(placeholders?: Array<PlaceholderValues>) {
    let phvalues = null;
    let language = 'en-GB';
    if (placeholders) {
      phvalues = placeholders ? placeholders.map((x) => x.toJsonObject()) : null;
      language = this.pnrService.getLanguage();
    }

    return {
      pnr: this.pnrService.pnrResponse,
      hierarchyParams: {
        clientSubUnitGuid: this.pnrService.getClientSubUnit(),
        gdsCode: '1A',
        latestVersionOnly: true,
        languageCode: language
      },
      placeholders: phvalues,
      isBeginPnr: false
    };
  }
}
