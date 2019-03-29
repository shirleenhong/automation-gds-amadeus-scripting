import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SelectItem } from 'src/app/models/select-item.model';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-itc-package',
  templateUrl: './itc-package.component.html',
  styleUrls: ['./itc-package.component.scss']
})
export class ItcPackageComponent implements OnInit {
  bspCurrencyList: SelectItem[];
  itcForm: FormGroup;
  decPipe = new DecimalPipe('en-US');

  constructor(private fb: FormBuilder) {
    this.itcForm = this.fb.group({
      itcCurrencyType: new FormControl(''),
      noAdult: new FormControl('', [Validators.pattern('[0-9]*')]),
      noChild: new FormControl('', [Validators.pattern('[0-9]*')]),
      noInfant: new FormControl('', [Validators.pattern('[0-9]*')]),
      baseAdult: new FormControl(''),
      baseChild: new FormControl(''),
      baseInfant: new FormControl(''),
      taxAdult: new FormControl(''),
      taxChild: new FormControl(''),
      taxInfant: new FormControl(''),
      bcruiseAdult: new FormControl(''),
      bcruiseChild: new FormControl(''),
      bcruiseInfant: new FormControl(''),
      tcruiseAdult: new FormControl(''),
      tcruiseChild: new FormControl(''),
      tcruiseInfant: new FormControl(''),
      railAdult: new FormControl(''),
      railChild: new FormControl(''),
      railInfant: new FormControl(''),
      insAdult: new FormControl(''),
      insChild: new FormControl(''),
      insInfant: new FormControl(''),
      hotelAdult: new FormControl(''),
      carAdult: new FormControl(''),
      depAdult: new FormControl(''),
      balance: new FormControl('', []),
      dueDate: new FormControl('', []),
      commission: new FormControl('')
    });
  }

  ngOnInit() {
    this.getCurrencies();

  }

  get f() {
    return this.itcForm.controls;
  }

  ComputeBalance() {
    let totalBalance = 0;
    totalBalance = this.ComputeAdult() + this.ComputeChild() + this.ComputeInfant();
    if (this.f.depAdult.value) { totalBalance = totalBalance - Number(this.f.depAdult.value); }

    // tslint:disable-next-line:no-string-literal
    this.itcForm.controls['balance'].setValue(this.decPipe.transform(totalBalance, '1.2-2'));
  }

  ComputeAdult() {
    let adultsum = 0;
    if (this.f.noAdult.value) {
      if (this.f.baseAdult.value) { adultsum = adultsum + (Number(this.f.noAdult.value) * Number(this.f.baseAdult.value)); }
      if (this.f.taxAdult.value) { adultsum = adultsum + (Number(this.f.noAdult.value) * Number(this.f.taxAdult.value)); }
      if (this.f.bcruiseAdult.value) { adultsum = adultsum + (Number(this.f.noAdult.value) * Number(this.f.bcruiseAdult.value)); }
      if (this.f.tcruiseAdult.value) { adultsum = adultsum + (Number(this.f.noAdult.value) * Number(this.f.tcruiseAdult.value)); }
      if (this.f.railAdult.value) { adultsum = adultsum + (Number(this.f.noAdult.value) * Number(this.f.railAdult.value)); }
      if (this.f.insAdult.value) { adultsum = adultsum + (Number(this.f.noAdult.value) * Number(this.f.insAdult.value)); }
      if (this.f.hotelAdult.value) { adultsum = adultsum + (Number(this.f.hotelAdult.value)); }
      if (this.f.carAdult.value) { adultsum = adultsum + (Number(this.f.carAdult.value)); }
    }
    return adultsum;
  }

  ComputeChild() {
    let childsum = 0;
    if (this.f.noChild.value) {
      if (this.f.baseChild.value) { childsum = childsum + (Number(this.f.noAdult.value) * Number(this.f.baseAdult.value)); }
      if (this.f.taxChild.value) { childsum = childsum + (Number(this.f.noAdult.value) * Number(this.f.taxAdult.value)); }
      if (this.f.bcruiseChild.value) { childsum = childsum + (Number(this.f.noAdult.value) * Number(this.f.bcruiseAdult.value)); }
      if (this.f.tcruiseChild.value) { childsum = childsum + (Number(this.f.noAdult.value) * Number(this.f.tcruiseAdult.value)); }
      if (this.f.railChild.value) { childsum = childsum + (Number(this.f.noAdult.value) * Number(this.f.railAdult.value)); }
      if (this.f.insChild.value) { childsum = childsum + (Number(this.f.noAdult.value) * Number(this.f.insAdult.value)); }
    }
    return childsum;
  }

  ComputeInfant() {
    let infantsum = 0;
    if (this.f.noInfant.value) {
      if (this.f.baseInfant.value) { infantsum = infantsum + (Number(this.f.noAdult.value) * Number(this.f.baseAdult.value)); }
      if (this.f.taxInfant.value) { infantsum = infantsum + (Number(this.f.noAdult.value) * Number(this.f.taxAdult.value)); }
      if (this.f.bcruiseInfant.value) { infantsum = infantsum + (Number(this.f.noAdult.value) * Number(this.f.bcruiseAdult.value)); }
      if (this.f.tcruiseInfant.value) { infantsum = infantsum + (Number(this.f.noAdult.value) * Number(this.f.tcruiseAdult.value)); }
      if (this.f.railInfant.value) { infantsum = infantsum + (Number(this.f.noAdult.value) * Number(this.f.railAdult.value)); }
      if (this.f.insInfant.value) { infantsum = infantsum + (Number(this.f.noAdult.value) * Number(this.f.insAdult.value)); }
    }
    return infantsum;
  }

  getCurrencies() {
    // TODO: Get from API DDB
    this.bspCurrencyList = [{ itemText: 'Select', itemValue: '' },
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
    { itemText: 'Zimbabwe Dollar', itemValue: 'ZWR' },
    ];
  }

}
