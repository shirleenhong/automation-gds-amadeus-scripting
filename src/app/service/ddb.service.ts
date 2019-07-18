import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { common } from '../../environments/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { interval } from 'rxjs';
import { StaticValuesService } from './static-values.services';

@Injectable({
  providedIn: 'root'
})
export class DDBService implements OnInit {
  retry = 0;
  token: string;
  isTokenExpired = true;
  countryList = [];
  currencyList = [];
  supplierCodes = [];
  servicingOption = [];
  airTravelPortInformation = [];
  ngOnInit(): void { }

  constructor(private httpClient: HttpClient, private staticValues: StaticValuesService) { }

  async getToken() {
    if (this.isTokenExpired) {
      const bodyInfo = {
        client_id: common.clientId,
        client_secret: environment.clientSecret,
        grant_type: 'client_credentials'
      };
      const hds = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      const res = await this.httpClient
        .post<any>(common.tokenService, JSON.stringify(bodyInfo), {
          headers: hds
        })
        .toPromise();
      this.token = res.access_token;
      localStorage.setItem('token', this.token);
      this.isTokenExpired = false;
      // expire token 30 seconds earlier
      interval((res.expires_in - 30) * 1000).subscribe(() => {
        this.isTokenExpired = true;
      });
    }
  }

  async getRequest(serviceName: string) {
    if (!environment.proxy) {
      await this.getToken();
    }
    const hds = new HttpHeaders().append('Content', 'application/json');
    return this.httpClient
      .get<any>(serviceName, {
        headers: hds
      })
      .toPromise()
      .catch((e) => {
        // retry if unauthorized to get new token
        if (e.status === 401 && this.retry < 3) {
          this.retry += 1;
          this.isTokenExpired = true;
          this.getRequest(serviceName);
        }
      });
  }

  async sample() {
    this.getRequest(common.travelportService + 'MNL').then(
      (x) => {
        alert(JSON.stringify(x));
      },
      (err) => {
        console.log(JSON.stringify(err));
      }
    );
  }

  async getServicingOption(clientSubUnit, contextId) {
    if (this.servicingOption.length === 0) {
      await this.getRequest(common.servicingOptionService + clientSubUnit + '&ContextID=' + contextId + 'GDSCode=1A').then(
        (x) => {
          this.servicingOption = [];
          this.servicingOption = x.ServiceOptionDetails;
        },
        (err) => {
          console.log(JSON.stringify(err));
        }
      );
    }
  }

  async getCountryAndCurrencyList() {
    if (this.countryList.length === 0 || this.currencyList.length === 0) {
      this.getRequest(common.locationService).then(
        (result) => {
          const countryItems = result.CountryItems;
          this.countryList = countryItems.map((item) => ({
            itemValue: item.CountryCode,
            itemText: item.CountryName
          }));
          this.currencyList = countryItems.map((item) => ({
            itemValue: item.CurrencyCode,
            itemText: item.CurrencyCode
          }));
        },
        (err) => {
          console.log(JSON.stringify(err));
        }
      );
    }
  }

  async getCdrItem(cdrItemId: string) {
    return await this.getRequest(common.cdrItemService + cdrItemId);
  }

  async getCdrItemByClientAccountNumber(clientAccount: string) {
    return await this.getRequest(common.cdrItemsByClientAccountService + clientAccount);
  }

  async getCdrItemBySubUnit(clientSubUnitId: string) {
    return await this.getRequest(common.cdrItemsByClientSubUnitService + clientSubUnitId);
  }

  async getCdrItemCreditCardList(clientSubUnitId: string) {
    return await this.getRequest(common.cdrItemsCreditCardListService + clientSubUnitId);
  }

  async getCdrItemList(clientSubUnitId: string) {
    return await this.getRequest(common.cdrItemListService + clientSubUnitId);
  }

  async getCdrItemValues(clientDefinedRefId: string) {
    return await this.getRequest(common.cdrItemValuesService + clientDefinedRefId);
  }

  async getCdrItemsBySharedValuesGroup(sharedValuesGroupId: string) {
    return await this.getRequest(common.cdrItemValuesBySharedValuesGroupIdService + sharedValuesGroupId);
  }

  async getTravelPort(travelportCode: string) {
    return await this.getRequest(common.travelportService + travelportCode);
  }

  async getFees(clientSubUnitId: string) {
    return await this.getRequest(common.feesService.replace('{ClientSubUnitGuid}', clientSubUnitId));
  }

  async getConfigurationParameter(configName: string) {
    return await this.getRequest(common.configurationParameterService + '?ConfigurationParameterName=' + configName);
  }

  async getReasonCodes(clientSubUnitId: string, otherParamString: string = '') {
    return await this.getRequest(common.reasonCodesService + '?ClientSubUnitGuid=' + clientSubUnitId + otherParamString);
  }

  // async getReasonCodeByClientSubUnit(clientSubUnitId: string) {
  //   return await this.getRequest(common.reasonCodesByClientSubUnitService.replace('{ClientSubUnitGuid}', clientSubUnitId));
  // }

  // async getReasonCodeByProductIdAndTypeId(productId: string, reasonCodeTypeId: string) {
  //   return await this.getRequest(
  //     common.reasonCodesByProductIdAndTypeIdService.replace('{ProductId}', productId).replace('{ReasonCodeTypeId}', reasonCodeTypeId)
  //   );
  // }

  // async getReasonCodeByTypeId(reasonCodeTypeId: string) {
  //   return await this.getRequest(common.reasonCodesByTypeIdService + reasonCodeTypeId);
  // }

  // async getReasonCodeByProductId(productId: string) {
  //   return await this.getRequest(common.reasonCodesByProductIdService + productId);
  // }

  async getAllTravelPort() {
    return await this.getRequest(common.airTravelportsService);
  }

  async loadSupplierCodesFromPowerBase() {

    await this.getRequest(common.supplierCodes).then(
      (x) => {
        this.supplierCodes = [];
        x.SupplierList.forEach((s) => {
          const supplier = {
            type: s.ProductName === 'Car Hire' ? 'Car' : s.ProductName,
            supplierCode: s.SupplierCode,
            supplierName: s.SupplierName
          };
          this.supplierCodes.push(supplier);
        });
      },
      (err) => {
        console.log(JSON.stringify(err));
      }
    );
  }

  getSupplierCodes(type?: string) {
    debugger;
    if (this.supplierCodes.length === 0) {
      this.loadSupplierCodesFromPowerBase();
    }
    if (this.supplierCodes.length > 0 && type !== undefined) {
      return this.supplierCodes.filter((x) => x.type.toUpperCase() === type.toUpperCase()
        || x.type.toUpperCase() === 'CA MATRIX ' + type.toUpperCase());
    }
    return this.supplierCodes;
  }

  async getTravelPortInformation(airSegments) {
    await airSegments.forEach(async (station) => {
      await this.getTravelPort(station.arrivalAirport).then(async (port) => {
        await this.extractDataPort(port);
      });

      await this.getTravelPort(station.departureAirport).then(async (port) => {
        await this.extractDataPort(port);
      });
    });
    await this.delay(1500);
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async extractDataPort(port: any) {
    const ref = {
      travelPortCode: port.TravelPorts[0].TravelPortCode,
      city: port.TravelPorts[0].CityCode,
      countryCode: port.TravelPorts[0].CountryCode,
      country: port.TravelPorts[0].CountryName
    };
    if (this.airTravelPortInformation.findIndex((x) => x.travelPortCode === port.TravelPorts[0].TravelPortCode) === -1) {
      this.airTravelPortInformation.push(ref);
    }
  }

  getServicingOptionValue(soId) {
    return this.servicingOption.find((x) => x.ServiceOptionItemId === soId);
  }

  getCityCountry(search: string) {
    console.log(JSON.stringify(this.airTravelPortInformation));
    if (this.airTravelPortInformation.findIndex((x) => x.travelPortCode === search) !== -1) {
      return this.airTravelPortInformation.find((x) => x.travelPortCode === search);
    } else {
      return '';
    }
  }

  getProvinces(): any {
    return this.staticValues.getProvinces();
  }

  getProvinceTax(): any {
    return this.staticValues.getProvinceTax();
  }

  getCcVendorCodeList() {
    return this.staticValues.getCcVendorCodeList();
  }

  getRouteCodeList() {
    return this.staticValues.getRouteCodeList();
  }

  getCurrencies() {
    return this.staticValues.getCurrencies();
  }

  getCitizenship(search: string) {
    return this.staticValues.getCitizenship(search);
  }

  getStateProvinces(countryCode?) {
    return this.staticValues.getStateProvinces(countryCode);
  }

  getACPassPurchaseList() {
    return this.staticValues.getACPassPurchaseList();
  }
}
