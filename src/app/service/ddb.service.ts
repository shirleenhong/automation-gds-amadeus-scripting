import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { common } from '../../environments/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { interval } from 'rxjs';
import { StaticValuesService } from './static-values.services';
import { ReasonCode } from 'src/app/models/ddb/reason-code.model';
import { PolicyAirMissedSavingThreshold } from 'src/app/models/ddb/policy-air-missed-saving-threshold.model';
import { ClientFeeItem } from '../models/ddb/client-fee-item.model';
import { ApprovalItem } from '../models/ddb/approval.model';
import { PnrService } from './pnr.service';

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
  reasonCodeList = Array<ReasonCode>();
  approvalList = Array<ApprovalItem>();
  airMissedSavingPolicyThresholds = Array<PolicyAirMissedSavingThreshold>();

  ngOnInit(): void {}

  constructor(private httpClient: HttpClient, private staticValues: StaticValuesService, private pnrService: PnrService) {}

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

  async deleteRequest(serviceName: string) {
    if (!environment.proxy) {
      await this.getToken();
    }
    const hds = new HttpHeaders().append('Content', 'application/json');
    return this.httpClient
      .delete<any>(serviceName, {
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

  async postRequest(serviceName: string, params?) {
    if (!environment.proxy) {
      await this.getToken();
    }
    const hds = new HttpHeaders().append('Content', 'application/json');
    return this.httpClient
      .post<any>(serviceName, params, {
        headers: hds
      })
      .toPromise()
      .catch((e) => {
        // retry if unauthorized to get new token
        if (e.status === 401 && this.retry < 3) {
          this.retry += 1;
          this.isTokenExpired = true;
          this.postRequest(serviceName);
        }
      });
  }

  async getAllServicingOptions(clientSubUnit) {
    if (this.servicingOption.length === 0) {
      await this.getRequest(common.servicingOptionService + clientSubUnit + '&GDSCode=1A').then(
        (response) => {
          this.servicingOption = [];
          if (response) {
            this.servicingOption = response.ServiceOptionDetails;
          }
        },
        (err) => {
          console.log(JSON.stringify(err));
        }
      );
    }
  }

  async getApproverGroup(clientSubUnit, cfa: string) {
    this.approvalList = [];
    await this.getRequest(common.approversService + clientSubUnit + '&SourceSystemCode=CA1&ClientAccountNumber=1' + cfa).then(
      (response) => {
        if (response && response.ApproversResponseItem) {
          response.ApproversResponseItem.forEach((approverJson) => {
            this.approvalList.push(new ApprovalItem(approverJson));
          });
        }
      }
    );
  }

  async queueMinderItems(clientSubUnit, typeid) {
    return await this.getRequest(common.queueMinderItemService.replace('{ClientSubUnitGuid}', clientSubUnit) + typeid);
  }

  async queueMinderTypes(clientSubUnit) {
    return await this.getRequest(common.queueMinderTypeService.replace('{ClientSubUnitGuid}', clientSubUnit));
  }

  async TicketQueues(clientSubUnit) {
    return await this.getRequest(common.ticketQueueService.replace('{ClientSubUnitGuid}', clientSubUnit));
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

  async getFees(clientSubUnitId: string, cfa: string) {
    const url = common.feesService.replace('{ClientSubUnitGuid}', clientSubUnitId) + '?TripTypeId=1&ClientAccountNumber=1' + cfa;
    let clientFeeItems: ClientFeeItem[] = [];
    await this.getRequest(url).then((fee) => {
      if (fee && fee.ClientFeeItems) {
        clientFeeItems = fee.ClientFeeItems.map((jsonObj) => new ClientFeeItem(jsonObj));
        console.log(clientFeeItems);
      }
    });
    return clientFeeItems;
  }

  async getConfigurationParameter(configName: string) {
    return await this.getRequest(common.configurationParameterService + '?ConfigurationParameterName=' + configName);
  }

  async getAirPolicyMissedSavingThreshold(subUnitGuid: string) {
    await this.getRequest(common.airMissedSavingThresholdService + '?TripTypeId=1&ClientSubUnitGuid=' + subUnitGuid).then(
      (policyThreshold) => {
        if (policyThreshold) {
          this.airMissedSavingPolicyThresholds = policyThreshold.PolicyAirMissedSavingsThresholdGroupItems.map(
            (policy) => new PolicyAirMissedSavingThreshold(policy)
          );
        }
      }
    );
  }

  async getReasonCodes(clientSubUnitId: string, otherParamString: string = '') {
    const reasons = [];
    await this.getRequest(
      common.reasonCodesService + '?TripTypeId=1&&IncludeNullTripTypes=false&ClientSubUnitGuid=' + clientSubUnitId + otherParamString
    ).then((response) => {
      if (response && response.ReasonCodeItems) {
        response.ReasonCodeItems.forEach((reasonJson) => {
          const reason = new ReasonCode(reasonJson);
          if (reason.getDescription() !== '') {
            reasons.push(reason);
          }
        });
      }
    });
    return reasons;
  }

  async getReasonCodeByTypeId(ids: number[], productID: number): Promise<ReasonCode[]> {
    const reasonCodeList = [];
    let languageCode = this.pnrService.getItineraryLanguage();
    if (!languageCode) {
      languageCode = 'en-GB';
    }

    if (productID === undefined) {
      productID = 8; // ALL
    }
    for (const id of ids) {
      // await this.getReasonCodeByClientSubUnit(
      await this.getReasonCodes(
        this.pnrService.getClientSubUnit(),
        '&LanguageCode=' + languageCode + '&ProductId=' + productID + '&ReasonCodeTypeId=' + id
      ).then((response) => {
        response.forEach((reason) => {
          reasonCodeList.push(reason);
        });
      });
    }
    return reasonCodeList;
  }
  // getReasonCodeByTypeId(integer[]) {
  //   //return await this.getRequest(common.reasonCodesService + '?ClientSubUnitGuid=' + clientSubUnitId + otherParamString);
  // }

  async getReasonCodeByClientSubUnit(clientSubUnitId: string, otherParam: string) {
    const reasons = [];
    await this.getRequest(
      common.reasonCodesByClientSubUnitService.replace('{ClientSubUnitGuid}', clientSubUnitId) + '?TripTypeId=1' + otherParam
    ).then((response) => {
      if (response && response.ReasonCodeItems) {
        response.ReasonCodeItems.forEach((reasonJson) => {
          reasons.push(new ReasonCode(reasonJson));
        });
      }
    });
    return reasons;
  }

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

  getSupplierCodes(type?: string) {
    if (this.supplierCodes.length === 0) {
      this.getAllMatrixSupplierCodes();
    }

    if (this.supplierCodes.length > 0 && type !== undefined) {
      return this.supplierCodes.filter(
        (x) => x.type.toUpperCase() === type.toUpperCase() || x.type.toUpperCase() === 'CA MATRIX ' + type.toUpperCase()
      );
    }
    return this.supplierCodes;
  }

  async getTravelPortInformation(airSegments, misSegments?) {
    await airSegments.forEach(async (station) => {
      await this.getTravelPort(station.arrivalAirport).then(async (port) => {
        await this.extractDataPort(port);
      });

      await this.getTravelPort(station.departureAirport).then(async (port) => {
        await this.extractDataPort(port);
      });
    });

    if (misSegments) {
      await misSegments.forEach(async (mis) => {
        await this.getTravelPort(mis.cityCode).then(async (port) => {
          await this.extractDataPort(port);
        });
      });
    }
    await this.delay(1500);
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async getAirlineSupplierCodes(code, type) {
    this.supplierCodes = [];
    let airlineName = '';
    await this.getRequest(common.airSupplierCodes + code).then((x) => {
      x.SupplierList.forEach((s) => {
        if (s.ProductName.toUpperCase() === type) {
          airlineName = s.SupplierName;
        }
      });
    });

    return airlineName;
  }

  async getAllMatrixSupplierCodes() {
    this.supplierCodes = [];
    await this.getRequest(common.matrixSupplierService + '?MatrixCompanyId=01').then((x) => {
      x.MatrixSupplierList.forEach((s) => {
        const supplier = {
          type: s.ProductName === 'Car Hire' ? 'Car' : s.ProductName,
          supplierCode: s.SupplierCode,
          supplierName: s.SupplierName + ' (' + s.CurrencyCode + ')'
        };
        this.supplierCodes.push(supplier);
      });
    });
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

  isPnrDomestic(): boolean {
    const countries = [];
    this.airTravelPortInformation.forEach((port) => {
      if (countries.indexOf(port.countryCode) === -1) {
        if (port.countryCode !== 'CA' && port.countryCode !== 'US') {
          countries.push(port.countryCode);
        }
      }
    });
    if (countries.length > 0) {
      return false;
    }
    return true;
  }

  isPnrTransBorder() {
    const countries = [];
    this.airTravelPortInformation.forEach((port) => {
      if (countries.indexOf(port.countryCode) === -1) {
        countries.push(port.countryCode);
      }
    });
    if (countries.length === 2 && countries.indexOf('US') >= 0 && countries.indexOf('CA') >= 0) {
      return true;
    } else if (countries.length === 1 && countries.indexOf('US') >= 0) {
      return true;
    }
    return false;
  }

  getServicingOptionValue(soId) {
    return this.servicingOption.find((x) => x.ServiceOptionId === soId);
  }

  getServicingOptionValueList(soID) {
    const valueList = [];
    this.servicingOption.forEach((x) => {
      if (x.ServiceOptionId === soID) {
        valueList.push(x);
      }
    });
    return valueList;
  }

  getCityCountry(search: string) {
    console.log(JSON.stringify(this.airTravelPortInformation));
    if (this.airTravelPortInformation.findIndex((x) => x.travelPortCode === search) !== -1) {
      return this.airTravelPortInformation.find((x) => x.travelPortCode === search);
    } else {
      return '';
    }
  }

  /**
   * Get the start and end dates of the Migration OBT Fee dates sin configuration.
   */
  public async getMigrationOBTFeeDates(): Promise<[string, string]> {
    try {
      let migrationOBTFeeDateRange = null;
      const response = await this.getConfigurationParameter('MigrationOBTFeeDate');
      migrationOBTFeeDateRange = response.ConfigurationParameters[0].ConfigurationParameterValue.split(',');

      return [migrationOBTFeeDateRange[0], migrationOBTFeeDateRange[1]];
    } catch (error) {
      throw new Error('Failed to get Migration OBT Fee configuration. Response: ' + error);
    }
  }
  public async getMigrationOBTFeeCFA() {
    try {
      let cfalist = '';
      const response = await this.getConfigurationParameter('MigrationOBTFee');
      cfalist = response.ConfigurationParameters[0].ConfigurationParameterValue;
      return cfalist;
    } catch (error) {
      throw new Error('Failed to get Migration OBT Fee configuration. Response: ' + error);
    }
    return '';
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

  getNoFeeCodes() {
    return this.staticValues.getNoFeeCodes();
  }

  /**
   * Get the Leisure On Demand PCCs
   */
  public async getTeamQueuePCCOID() {
    try {
      let lodPCC = null;
      const response = await this.getConfigurationParameter('TeamQueuePCCOID');
      lodPCC = response.ConfigurationParameters[0].ConfigurationParameterValue.split(',');
      lodPCC = lodPCC.map((pcc) => {
        return pcc.trim();
      });
      return lodPCC;
    } catch (error) {
      throw new Error('Failed to get Migration OBT Fee configuration. Response: ' + error);
    }
  }

  getClientDefinedBusinessRules(clientSubUnitGuid: string, clientAccountNumber: string) {
    return this.getRequest(
      common.businessRules +
        '?ClientAccountNumber=' +
        clientAccountNumber +
        '&ClientSubUnitGuid=' +
        clientSubUnitGuid +
        '&SourceSystemCode=CA1'
    );
  }

  postSplunkLog(data: Map<string, string>, source?) {
    if (!source) {
      source = 'AmadeusCAScript';
    }

    const jsonObject = {};
    data.forEach((value, key) => {
      jsonObject[key] = value;
    });
    const params = '?sourceType=' + source + '&jsonData=' + encodeURIComponent(JSON.stringify(jsonObject));
    return this.postRequest(common.splunkLog + params);
  }

  clearCache() {
    const cacheNames = [
      'spExpress_GetReasonCodes_v5',
      'spCCRAPI_GetClientDefinedBusinessRules_v1.sql',
      'spPowerBaseAPI_SelectServiceOptions_v4',
      'SelectConfigurationParameter',
      'SelectReasonCodes.sql',
      'spExpress_GetAirportList_v2',
      'spPowerBaseAPI_SelectPolicyAirMissedSavingsThresholdDetails_v2',
      'SelectPolicyAirMissedSavingsThresholdDetails.sql',
      'spPowerBaseAPI_SelectPolicyAirMissedSavingsThresholdGroupItems_v1',
      'spCCRAPI_SelectPolicyAirMissedSavingsThresholdDetails_v1',
      'spPowerBaseAPI_SelectPolicyAirMissedSavingsThresholdAdvice_v1',
      'SelectPolicyAirMissedSavingsThresholdAdvice.sql',
      'SelectApproverDetails.sql',
      'SelectApproverItemDetails.sql'
    ];
    cacheNames.forEach((name) => {
      this.deleteRequest(common.clearCacheByName + name);
    });
  }
}
