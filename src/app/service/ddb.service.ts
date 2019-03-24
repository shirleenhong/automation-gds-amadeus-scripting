import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { interval, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class DDBService implements OnInit {
  token: string;
  isTokenExpired = true;
  ngOnInit(): void {

  }

  constructor(private httpClient: HttpClient) {


  }


  async sample() {

    this.getRequest('Location/City/NYC?').subscribe(x => { alert(JSON.stringify(x)); }
      , err => { alert(JSON.stringify(err)); });

  }

  async getToken() {
    if (this.isTokenExpired === true || this.token === '') {
      const bodyInfo = { client_id: environment.clientId, client_secret: environment.clientSecret, grant_type: 'client_credentials' };
      const hds = new HttpHeaders({
        'Content", itemText:"Type': 'application/json'
      });

      const res = await this.httpClient.post<any>('/api/oauth2/token', JSON.stringify(bodyInfo), { headers: hds }).toPromise();
      this.token = res.access_token;
      localStorage.setItem('token', this.token);
      this.isTokenExpired = false;
      interval((res.expires_in * 1000)).subscribe(x => { this.isTokenExpired = true; });

    }

  }


  getRequest(apiUrl: string): Observable<any> {
    this.getToken();
    const hds = new HttpHeaders().append('Content", itemText:"Type', 'application/json');
    return this.httpClient.get<any>('/api/' + apiUrl, { headers: hds });
  }


  getProvinces(): any {
    return [{ itemValue: 'ON', itemText: 'Ontario' },
    { itemValue: 'BC', itemText: 'British Columbia' },
    { itemValue: 'QC', itemText: 'Quebec' },
    { itemValue: 'AB', itemText: 'Alberta' },
    { itemValue: 'MB', itemText: 'Manitoba' },
    { itemValue: 'SK', itemText: 'Saskatchewan' },
    { itemValue: 'NB', itemText: 'New Brunswick' },
    { itemValue: 'NL', itemText: 'Newfoundland/Labrador' },
    { itemValue: 'NS', itemText: 'Nova Scotia' },
    { itemValue: 'PE', itemText: 'Prince Edward Island' },
    { itemValue: 'YT', itemText: 'Yukon' },
    { itemValue: 'NT', itemText: 'Northwest Territories' },
    { itemValue: 'NU', itemText: 'Nunavut' },
    { itemValue: 'ZZ', itemText: 'Address outside of Canada' }];
  }


}
