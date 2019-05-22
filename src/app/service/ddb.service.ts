import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { common } from '../../environments/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { interval, Observable } from 'rxjs';
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { stringify } from '@angular/core/src/util';

@Injectable({
  providedIn: 'root'
})
export class DDBService implements OnInit {
  token: string;
  isTokenExpired = true;
  countryList = [];
  currencyList = [];

  ngOnInit(): void { }

  constructor(private httpClient: HttpClient) { }

  async getToken() {
    if (this.isTokenExpired || this.token === '') {
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
      interval(res.expires_in * 1000).subscribe(x => {
        this.isTokenExpired = true;
      });
    }
  }

  getRequest(serviceName: string): Observable<any> {
    this.getToken();
    const hds = new HttpHeaders().append('Content', 'application/json');
    return this.httpClient.get<any>(serviceName, {
      headers: hds
    });
  }

  async sample() {
    this.getRequest(common.locationService).subscribe(
      x => {
        alert(JSON.stringify(x));
      },
      err => {
        alert(JSON.stringify(err));
      }
    );

    this.getRequest(common.travelportService + 'MNL').subscribe(
      x => {
        alert(JSON.stringify(x));
      },
      err => {
        alert(JSON.stringify(err));
      }
    );
  }

  async getCountryAndCurrencyList() {
    if (this.countryList.length === 0 || this.currencyList.length === 0) {
      this.getRequest(common.locationService).subscribe(
        result => {
          const countryItems = result['CountryItems'];
          this.countryList = countryItems.map(a => a.CountryCode);
          this.currencyList = countryItems.map(a => a.CurrencyCode);
          alert(this.countryList);
          alert(this.currencyList);
        },
        err => {
          alert(JSON.stringify(err));
        }
      );
    }
  }

  async getTravelPort(travelportCode: string) {
    return await this.getRequest(
      common.travelportService + travelportCode
    ).toPromise();
  }

  getProvinces(): any {
    return [
      { itemValue: 'ON', itemText: 'Ontario' },
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
      { itemValue: 'ZZ', itemText: 'Address outside of Canada' }
    ];
  }

  getProvinceTax(): any {
    return [
      {
        provinceCode: 'AB',
        tax1: 0.05,
        taxType1: 'GST',
        tax2: 0.0,
        taxType2: ''
      },
      {
        provinceCode: 'BC',
        tax1: 0.05,
        taxType1: 'GST',
        tax2: 0.0,
        taxType2: ''
      },
      {
        provinceCode: 'MB',
        tax1: 0.05,
        taxType1: 'GST',
        tax2: 0.0,
        taxType2: ''
      },
      {
        provinceCode: 'NB',
        tax1: 0.15,
        taxType1: 'HST',
        tax2: 0.0,
        taxType2: ''
      },
      {
        provinceCode: 'NL',
        tax1: 0.15,
        taxType1: 'HST',
        tax2: 0.0,
        taxType2: ''
      },
      {
        provinceCode: 'NS',
        tax1: 0.15,
        taxType1: 'HST',
        tax2: 0.0,
        taxType2: ''
      },
      {
        provinceCode: 'NT',
        tax1: 0.05,
        taxType1: 'GST',
        tax2: 0.0,
        taxType2: ''
      },
      {
        provinceCode: 'NU',
        tax1: 0.05,
        taxType1: 'GST',
        tax2: 0.0,
        taxType2: ''
      },
      {
        provinceCode: 'ON',
        tax1: 0.13,
        taxType1: 'HST',
        tax2: 0.0,
        taxType2: ''
      },
      {
        provinceCode: 'PE',
        tax1: 0.15,
        taxType1: 'HST',
        tax2: 0.0,
        taxType2: ''
      },
      {
        provinceCode: 'QC',
        tax1: 0.05,
        taxType1: 'GST',
        tax2: 0.09975,
        taxType2: 'QST'
      },
      {
        provinceCode: 'SK',
        tax1: 0.05,
        taxType1: 'GST',
        tax2: 0.0,
        taxType2: ''
      },
      {
        provinceCode: 'YT',
        tax1: 0.05,
        taxType1: 'GST',
        tax2: 0.0,
        taxType2: ''
      }
    ];
  }

  getSupplierCode() {
    let SupplierCode = [];

    // let passesupplier = {type: type,suppliercode: suppliercode,supplierName: supplierName,};
    SupplierCode = [
      { type: '', supplierCode: '', supplierName: '' },
      { type: '1', supplierCode: 'AC', supplierName: 'Air Canada' },
      { type: '1', supplierCode: 'QK', supplierName: 'Air Canada Jazz' },
      { type: '1', supplierCode: 'RV', supplierName: 'Air Canada Rouge' },
      { type: '6', supplierCode: 'G69', supplierName: 'Autos Tucan S.L.L' },
      { type: '6', supplierCode: 'G70', supplierName: 'G70	Autocars Rufo' }
    ];
    return SupplierCode;
  }

  getCcVendorCodeList() {
    return [
      { itemText: '', itemValue: '' },
      { itemText: 'VI- Visa', itemValue: 'VI' },
      { itemText: 'MC - Mastercard', itemValue: 'MC' },
      { itemText: 'AX - American Express', itemValue: 'AX' },
      { itemText: 'DC -Diners', itemValue: 'DC' }
    ];
  }

  getRouteCodeList() {
    return [
      { itemText: '', itemValue: '' },
      {
        itemText: 'USA incl. all US Territories and Possessions',
        itemValue: '0'
      },
      {
        itemText: 'Mexico/Central America/Canal Zone/Costa Rica',
        itemValue: '1'
      },
      { itemText: 'Caribbean and Bermuda', itemValue: '2' },
      { itemText: 'South America', itemValue: '3' },
      {
        itemText: 'Europe-incl. Morocco/Tunisia/Algeria/Greenland',
        itemValue: '4'
      },
      { itemText: 'Africa', itemValue: '5' },
      { itemText: 'Middle East/Western Asia', itemValue: '6' },
      { itemText: 'Asia incl. India', itemValue: '7' },
      {
        itemText:
          'Australia/New Zealand/Islands of the Pacific incl. Hawaii excl. Guam',
        itemValue: '8'
      },
      { itemText: 'Canada and St. Pierre et Miquelon', itemValue: '9' }
    ];
  }

  getCurrencies() {
    return [
      { itemText: 'Select', itemValue: '' },
      { itemText: 'Andorran Peset', itemValue: 'ADP' },
      { itemText: 'UAE Dirham', itemValue: 'AED' },
      { itemText: 'Afghanistan Afghani', itemValue: 'AFN' },
      { itemText: 'Albanian Lek', itemValue: 'ALL' },
      { itemText: 'Armenian Dram', itemValue: 'AMD' },
      { itemText: 'Ne Antillian Guilder', itemValue: 'ANG' },
      { itemText: 'Kwanza', itemValue: 'AOA' },
      { itemText: 'Argentine Peso', itemValue: 'ARS' },
      { itemText: 'Austrian Schilling', itemValue: 'ATS' },
      { itemText: 'Australian Dollar', itemValue: 'AUD' },
      { itemText: 'Aruban Guilder', itemValue: 'AWG' },
      { itemText: 'Azerbaijanian Manat', itemValue: 'AZN' },
      { itemText: 'Convertable Marks', itemValue: 'BAM' },
      { itemText: 'Barbados Dollar', itemValue: 'BBD' },
      { itemText: 'Bangladesh Taka', itemValue: 'BDT' },
      { itemText: 'Belgian Franc', itemValue: 'BEF' },
      { itemText: 'Bulgarian Lev', itemValue: 'BGN' },
      { itemText: 'Bahraini Dinar', itemValue: 'BHD' },
      { itemText: 'Burundi Franc', itemValue: 'BIF' },
      { itemText: 'Bermuda Dollar', itemValue: 'BMD' },
      { itemText: 'Brunei Dollar', itemValue: 'BND' },
      { itemText: 'Bolivian Boliviano', itemValue: 'BOB' },
      { itemText: 'Brazilian Real', itemValue: 'BRL' },
      { itemText: 'Bahamian Dollar', itemValue: 'BSD' },
      { itemText: 'Bhutan Ngultrum', itemValue: 'BTN' },
      { itemText: 'Botswana Pula', itemValue: 'BWP' },
      { itemText: 'Belarusian Ruble', itemValue: 'BYR' },
      { itemText: 'Belize Dollar', itemValue: 'BZD' },
      { itemText: 'Canadian Dollar', itemValue: 'CAD' },
      { itemText: 'Franc Congolais', itemValue: 'CDF' },
      { itemText: 'Swiss Franc', itemValue: 'CHF' },
      { itemText: 'Chilean Peso', itemValue: 'CLP' },
      { itemText: 'Chinese Yuan', itemValue: 'CNY' },
      { itemText: 'Columbian Peso', itemValue: 'COP' },
      { itemText: 'Costa Rican Colon', itemValue: 'CRC' },
      { itemText: 'Dinar', itemValue: 'CSD' },
      { itemText: 'Cuban Peso', itemValue: 'CUP' },
      { itemText: 'Cape Verde Escudo', itemValue: 'CVE' },
      { itemText: 'Cyprus Pound', itemValue: 'CYP' },
      { itemText: 'Czech Koruna', itemValue: 'CZK' },
      { itemText: 'Deutsche Mark', itemValue: 'DEM' },
      { itemText: 'Djibouti Franc', itemValue: 'DJF' },
      { itemText: 'Danish Krone', itemValue: 'DKK' },
      { itemText: 'Dominican Peso', itemValue: 'DOP' },
      { itemText: 'Algerian Dinar', itemValue: 'DZD' },
      { itemText: 'Estonian Kroon', itemValue: 'EEK' },
      { itemText: 'Egyptian Pound', itemValue: 'EGP' },
      { itemText: 'Eritrea Nakfa', itemValue: 'ERN' },
      { itemText: 'Spanish Pesetas', itemValue: 'ESP' },
      { itemText: 'Ethiopian Birr', itemValue: 'ETB' },
      { itemText: 'Euro', itemValue: 'EUR' },
      { itemText: 'Finnish Markka', itemValue: 'FIM' },
      { itemText: 'Fiji Dollar', itemValue: 'FJD' },
      { itemText: 'Falkland Islands Pound', itemValue: 'FKP' },
      { itemText: 'French Franc', itemValue: 'FRF' },
      { itemText: 'Great British Pound', itemValue: 'GBP' },
      { itemText: 'Georgian Lari', itemValue: 'GEL' },
      { itemText: 'Ghana Cedi', itemValue: 'GHS' },
      { itemText: 'Gibraltar Pound', itemValue: 'GIP' },
      { itemText: 'Gambian Dalasi', itemValue: 'GMD' },
      { itemText: 'Guinea Franc', itemValue: 'GNF' },
      { itemText: 'Greek Drachma', itemValue: 'GRD' },
      { itemText: 'Guatemala Quetzal', itemValue: 'GTQ' },
      { itemText: 'Guinea-Bissau Peso', itemValue: 'GWP' },
      { itemText: 'Guyana Dollar', itemValue: 'GYD' },
      { itemText: 'HongKong Dollar', itemValue: 'HKD' },
      { itemText: 'Honduran Lempira', itemValue: 'HNL' },
      { itemText: 'Croatian Kuna', itemValue: 'HRK' },
      { itemText: 'Haitian Gourde', itemValue: 'HTG' },
      { itemText: 'Hungarian Forint', itemValue: 'HUF' },
      { itemText: 'Indonesian Rupiah', itemValue: 'IDR' },
      { itemText: 'Irish Pound', itemValue: 'IEP' },
      { itemText: 'Israeli Shekel', itemValue: 'ILS' },
      { itemText: 'Indian Rupee', itemValue: 'INR' },
      { itemText: 'Iraqi Dinar', itemValue: 'IQD' },
      { itemText: 'Iranian Rial', itemValue: 'IRR' },
      { itemText: 'Iceland Krona', itemValue: 'ISK' },
      { itemText: 'Italian Lira', itemValue: 'ITL' },
      { itemText: 'Jamaican Dollar', itemValue: 'JMD' },
      { itemText: 'Jordanian Dinar', itemValue: 'JOD' },
      { itemText: 'Japanese Yen', itemValue: 'JPY' },
      { itemText: 'Kenyan Shilling', itemValue: 'KES' },
      { itemText: 'Kyrgyzstan Som', itemValue: 'KGS' },
      { itemText: 'Kampuchea Riel', itemValue: 'KHR' },
      { itemText: 'Comoro Franc', itemValue: 'KMF' },
      { itemText: 'North Korean Won', itemValue: 'KPW' },
      { itemText: 'Korean Republic Won', itemValue: 'KRW' },
      { itemText: 'Kuwaiti Dinar', itemValue: 'KWD' },
      { itemText: 'CaymanIs Dollar', itemValue: 'KYD' },
      { itemText: 'Kazakstan Tenge', itemValue: 'KZT' },
      { itemText: 'Lao Peoples Kip', itemValue: 'LAK' },
      { itemText: 'Lebanese Pound', itemValue: 'LBP' },
      { itemText: 'SriLanka Rupee', itemValue: 'LKR' },
      { itemText: 'Liberian Dollar', itemValue: 'LRD' },
      { itemText: 'Lesotho Loti', itemValue: 'LSL' },
      { itemText: 'Lithuanian Litas', itemValue: 'LTL' },
      { itemText: 'Luxembourg Franc', itemValue: 'LUF' },
      { itemText: 'Latvian Lats', itemValue: 'LVL' },
      { itemText: 'Libyan Dinar', itemValue: 'LYD' },
      { itemText: 'Moroccan Dirham', itemValue: 'MAD' },
      { itemText: 'Moldovan Leu', itemValue: 'MDL' },
      { itemText: 'Malagasy Ariary', itemValue: 'MGA' },
      { itemText: 'MacedonianDinar', itemValue: 'MKD' },
      { itemText: 'Myanmar Kyai', itemValue: 'MMK' },
      { itemText: 'Mongolian Tugric', itemValue: 'MNT' },
      { itemText: 'Macau Pataca', itemValue: 'MOP' },
      { itemText: 'Mauritanian Ouguiya', itemValue: 'MRO' },
      { itemText: 'Maltese Lira', itemValue: 'MTL' },
      { itemText: 'Mauritius Rupee', itemValue: 'MUR' },
      { itemText: 'Maldives Rufiyaa', itemValue: 'MVR' },
      { itemText: 'Malawi Kwacha', itemValue: '	MWK' },
      { itemText: 'Mexican Peso', itemValue: 'MXN' },
      { itemText: 'Malaysian Ringgit', itemValue: 'MYR' },
      { itemText: 'Mozambique Metical', itemValue: 'MZN' },
      { itemText: 'Namibia Dollar', itemValue: 'NAD' },
      { itemText: 'Nigerian Naira', itemValue: 'NGN' },
      { itemText: 'Cordoba Oro', itemValue: 'NIO' },
      { itemText: 'Netherlands Guilder', itemValue: 'NLG' },
      { itemText: 'Norwegian Krone', itemValue: 'NOK' },
      { itemText: 'Nepalese Rupee', itemValue: 'NPR' },
      { itemText: 'New Zealand Dollar', itemValue: 'NZD' },
      { itemText: 'Oman Rial Omani', itemValue: 'OMR' },
      { itemText: 'Panamanian Balboa', itemValue: 'PAB' },
      { itemText: 'Peruvian Nuevo Sol', itemValue: 'PEN' },
      { itemText: 'Papua NewGuinea Kina', itemValue: 'PGK' },
      { itemText: 'Philippine Peso', itemValue: 'PHP' },
      { itemText: 'Pakistan Rupee', itemValue: 'PKR' },
      { itemText: 'Polish Zloty', itemValue: 'PLN' },
      { itemText: 'Palestinian Zits', itemValue: 'PSZ' },
      { itemText: 'Portuguese Escudo', itemValue: 'PTE' },
      { itemText: 'Paraguayan Guarani', itemValue: 'PYG' },
      { itemText: 'Qatari Rial', itemValue: 'QAR' },
      { itemText: 'New Romanian Leu', itemValue: 'RON' },
      { itemText: 'Serbian dinar', itemValue: 'RSD' },
      { itemText: 'Russian Ruble', itemValue: 'RUB' },
      { itemText: 'Rwanda Franc', itemValue: 'RWF' },
      { itemText: 'Saudi Riyal', itemValue: 'SAR' },
      { itemText: 'Solomon Islands Dollar', itemValue: 'SBD' },
      { itemText: 'Seycelles Rupee', itemValue: 'SCR' },
      { itemText: 'Sudan Dinar', itemValue: 'SDD' },
      { itemText: 'Sudanese Pound', itemValue: 'SDG' },
      { itemText: 'Swedish Krona', itemValue: 'SEK' },
      { itemText: 'Singapore Dollar', itemValue: 'SGD' },
      { itemText: 'Slovenia Tolar', itemValue: 'SIT' },
      { itemText: 'Sierra Leone Leone', itemValue: 'SLL' },
      { itemText: 'Somali Shilling', itemValue: 'SOS' },
      { itemText: 'Surinam Dollar', itemValue: 'SRD' },
      { itemText: 'South Sudanese Pound', itemValue: 'SSP' },
      { itemText: 'Sao Tome Dobra', itemValue: 'STD' },
      { itemText: 'El Salvador Colon', itemValue: 'SVC' },
      { itemText: 'Syrian Pound', itemValue: 'SYP' },
      { itemText: 'Swaziland Lilangeni', itemValue: 'SZL' },
      { itemText: 'Thai Baht', itemValue: 'THB' },
      { itemText: 'Somoni', itemValue: 'TJS' },
      { itemText: 'Turkmenistan Manat', itemValue: 'TMM' },
      { itemText: 'Tunisian Dinar', itemValue: 'TND' },
      { itemText: 'Tonga Pa Anga', itemValue: 'TOP' },
      { itemText: 'New Turkish Lira', itemValue: 'TRY' },
      { itemText: 'Trinidad Tobago Dollar', itemValue: 'TTD' },
      { itemText: 'Taiwan New Dollar', itemValue: 'TWD' },
      { itemText: 'Tanzanian Shilling', itemValue: 'TZS' },
      { itemText: 'Ukrainian Hryvnia', itemValue: 'UAH' },
      { itemText: 'Uganda Shilling', itemValue: 'UGX' },
      { itemText: 'US Dollar', itemValue: 'USD' },
      { itemText: 'Uruguay Peso', itemValue: 'UYU' },
      { itemText: 'Uzbekistan Sum', itemValue: 'UZS' },
      { itemText: 'Venezuelan Bolivar', itemValue: 'VEB' },
      { itemText: 'Venezuelan BolivarFuerte', itemValue: 'VEF' },
      { itemText: 'Vietnamese Dong', itemValue: 'VND' },
      { itemText: 'Vanuatu Vatu', itemValue: 'VUV' },
      { itemText: 'Western Samoan Tala', itemValue: 'WST' },
      { itemText: 'CFA Franc Beac', itemValue: 'XAF' },
      { itemText: 'E Caribbean Dollar', itemValue: 'XCD' },
      { itemText: 'CFA Franc Bceao', itemValue: 'XOF' },
      { itemText: 'Fr Polynesia Pacific Franc', itemValue: 'XPF' },
      { itemText: 'Yemeni Rial', itemValue: 'YER' },
      { itemText: 'Yugoslav Dinar', itemValue: 'YUG' },
      { itemText: 'Yugoslav New Dinar', itemValue: 'YUM' },
      { itemText: 'Yugoslavian Dinar', itemValue: 'YUN' },
      { itemText: 'Sout hAfrican Rand', itemValue: 'ZAR' },
      { itemText: 'Zambian Kwacha', itemValue: 'ZMK' },
      { itemText: 'Zaire NewZaire', itemValue: 'ZRZ' },
      { itemText: 'Zimbabwe Dollarr', itemValue: 'ZWD' },
      { itemText: 'Zimbabwe Dollar', itemValue: 'ZWR' }
    ];
  }

  getCityCountry(search: string) {
    let cityList = [];
    cityList = [
      { city: 'YUL', countryCode: 'CA', country: 'Canada' },
      { city: 'YYZ', countryCode: 'CA', country: 'Canada' },
      { city: 'YVR', countryCode: 'CA', country: 'Canada' },
      { city: 'LHR', countryCode: 'NL', country: 'Netherlands' },
      { city: 'AMS', countryCode: 'NL', country: 'Netherlands' },
      { city: 'PAR', countryCode: 'FR', country: 'France' },
      { city: 'LON', countryCode: 'UK', country: 'United Kingdom' },
      { city: 'CDG', countryCode: 'FR', country: 'France' },
      { city: 'MAD', countryCode: 'ES', country: 'Spain' },
      { city: 'ORD', countryCode: 'US', country: 'United States' },
      { city: 'FRA', countryCode: 'DE', country: 'Germany' },
      { city: 'SYD', countryCode: 'AU', country: 'Australia' },
      { city: 'VCE', countryCode: 'IT', country: 'Italy' },
      { city: 'MNL', countryCode: 'PH', country: 'Philippines' },
      { city: 'FLR', countryCode: 'IT', country: 'Italy' },
    ];

    if (cityList.findIndex(x => x.city === search) !== -1) {
      return cityList.find(x => x.city === search);
    } else {
      return '';
    }
  }

  getCitizenship(search: string) {
    let countryList = [];
    countryList = [
      { countryCode: 'NL', country: 'Netherlands' },
      { countryCode: 'FR', country: 'France' },
      { countryCode: 'GB', country: 'United Kingdom' },
      { countryCode: 'CA', country: 'Canada' },
      { countryCode: 'ES', country: 'Spain' },
      { countryCode: 'US', country: 'United States' }
    ];
    return countryList.find(x => x.countryCode === search);
  }

  getStateProvinces(countryCode?) {
    const states = [{ province: 'Alabama', code: 'AL', countryCode: 'US' },
    { province: 'Alaska', code: 'AK', countryCode: 'US' },
    { province: 'Arizona', code: 'AZ', countryCode: 'US' },
    { province: 'Arkansas', code: 'AR', countryCode: 'US' },
    { province: 'Alabama', countryCode: 'US', code: 'AL' },
    { province: 'Alaska', countryCode: 'US', code: 'AK' },
    { province: 'Arizona', countryCode: 'US', code: 'AZ' },
    { province: 'Arkansas', countryCode: 'US', code: 'AR' },
    { province: 'Armed Forces America ', countryCode: 'US', code: 'AA' },
    { province: 'Armed Forces Europe ', countryCode: 'US', code: 'AE' },
    { province: 'Armed Forces Pacific ', countryCode: 'US', code: 'AP' },
    { province: 'California', countryCode: 'US', code: 'CA' },
    { province: 'Colorado', countryCode: 'US', code: 'CO' },
    { province: 'Connecticut', countryCode: 'US', code: 'CT ' },
    { province: 'Delaware', countryCode: 'US', code: 'DE' },
    { province: 'District of Columbia', countryCode: 'US', code: 'DC ' },
    { province: 'Florida', countryCode: 'US', code: 'FL' },
    { province: 'Georgia', countryCode: 'US', code: 'GA' },
    { province: 'Hawaii', countryCode: 'US', code: 'HI' },
    { province: 'Idaho', countryCode: 'US', code: 'ID' },
    { province: 'Illinois', countryCode: 'US', code: 'IL' },
    { province: 'Indiana', countryCode: 'US', code: 'IN' },
    { province: 'Iowa', countryCode: 'US', code: 'IA' },
    { province: 'Kansas', countryCode: 'US', code: 'KS' },
    { province: 'Kentucky', countryCode: 'US', code: 'KY' },
    { province: 'Louisiana', countryCode: 'US', code: 'LA' },
    { province: 'Maine', countryCode: 'US', code: 'ME ' },
    { province: 'Maryland', countryCode: 'US', code: 'MD' },
    { province: 'Massachusetts', countryCode: 'US', code: 'MA' },
    { province: 'Michigan', countryCode: 'US', code: 'MI' },
    { province: 'Minnesota', countryCode: 'US', code: 'MN' },
    { province: 'Mississippi', countryCode: 'US', code: 'MS' },
    { province: 'Missouri', countryCode: 'US', code: 'MO' },
    { province: 'Montana', countryCode: 'US', code: 'MT' },
    { province: 'Nebraska', countryCode: 'US', code: 'NE' },
    { province: 'Nevada', countryCode: 'US', code: 'NV' },
    { province: 'New Hampshire', countryCode: 'US', code: 'NH' },
    { province: 'New Jersey', countryCode: 'US', code: 'NJ' },
    { province: 'New Mexico', countryCode: 'US', code: 'NM' },
    { province: 'New York', countryCode: 'US', code: 'NY' },
    { province: 'North Carolina', countryCode: 'US', code: 'NC' },
    { province: 'North Dakota', countryCode: 'US', code: 'ND' },
    { province: 'Ohio', countryCode: 'US', code: 'OH' },
    { province: 'Oklahoma', countryCode: 'US', code: 'OK' },
    { province: 'Oregon', countryCode: 'US', code: 'OR' },
    { province: 'Pennsylvania', countryCode: 'US', code: 'PA' },
    { province: 'Rhode Island', countryCode: 'US', code: 'RI' },
    { province: 'South Carolina', countryCode: 'US', code: 'SC' },
    { province: 'South Dakota', countryCode: 'US', code: 'SD' },
    { province: 'Tennessee', countryCode: 'US', code: 'TN' },
    { province: 'Texas', countryCode: 'US', code: 'TX' },
    { province: 'Utah', countryCode: 'US', code: 'UT' },
    { province: 'Vermont', countryCode: 'US', code: 'VT' },
    { province: 'Virginia', countryCode: 'US', code: 'VA' },
    { province: 'Washington', countryCode: 'US', code: 'WA' },
    { province: 'West Virginia', countryCode: 'US', code: 'WV' },
    { province: 'Wisconsin', countryCode: 'US', code: 'WI' },
    { province: 'Wyoming', countryCode: 'US', code: 'WY' },
    { province: 'Alberta', countryCode: 'CA', code: 'AB' },
    { province: 'British Columbia', countryCode: 'CA', code: 'BC' },
    { province: 'Manitoba', countryCode: 'CA', code: 'MB' },
    { province: 'New Brunswick', countryCode: 'CA', code: 'NB' },
    { province: 'Newfoundland and Labrador', countryCode: 'CA', code: 'NL' },
    { province: 'Northwest Territories', countryCode: 'CA', code: 'NT' },
    { province: 'Nova Scotia', countryCode: 'CA', code: 'NS' },
    { province: 'Nunavut', countryCode: 'CA', code: 'NU' },
    { province: 'Ontario', countryCode: 'CA', code: 'ON' },
    { province: 'Prince Edward Island', countryCode: 'CA', code: 'PE' },
    { province: 'Quebec', countryCode: 'CA', code: 'QC' },
    { province: 'Saskatchewan', countryCode: 'CA', code: 'SK' },
    { province: 'Yukon', countryCode: 'CA', code: 'YT' }];

    if (countryCode !== undefined) {
      return states.find(x => x.countryCode === countryCode);
    } else {
      return states;
    }
  }
}
