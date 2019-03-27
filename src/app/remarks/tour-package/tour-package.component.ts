import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormGroup, Validator, AbstractControl, ValidationErrors, FormBuilder, Validators } from '@angular/forms';
import { TourPackageViewModel } from 'src/app/models/tour-package-view.model';
import { SelectItem } from 'src/app/models/select-item.model';


@Component({
  selector: 'app-tour-package',
  templateUrl: './tour-package.component.html',
  styleUrls: ['./tour-package.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TourPackageComponent implements OnInit, OnChanges, ControlValueAccessor, Validator {

  bspCurrencyList: SelectItem[];
  tourPackage: TourPackageViewModel;

  // @Input() group: any;
  group: FormControl;

  constructor(private fb: FormBuilder) {
    this.group = this.fb.group({
      adultNum: new FormControl('', [Validators.min(1), Validators.max(9), Validators.maxLength(1)]),
      userIdFirstWay: new FormControl(''),
      baseCost: new FormControl('', [Validators.maxLength(8)]),
      taxesPerAdult: new FormControl('', [Validators.maxLength(7)]),
      childrenNumber: new FormControl('', [Validators.min(1), Validators.max(9), Validators.maxLength(1)]),
      childBaseCost: new FormControl('', [Validators.maxLength(8)]),
      insurancePerAdult: new FormControl('', [Validators.maxLength(7)]),
      insurancePerChild: new FormControl('', [Validators.maxLength(7)]),
      taxesPerChild: new FormControl('', [Validators.maxLength(7)]),
      infantNumber: new FormControl('', [Validators.min(1), Validators.max(9), Validators.maxLength(1)]),
      totalCostPerInfant: new FormControl(''),
      depositPaid: new FormControl(''),
      totalCostHoliday: new FormControl(''),
      lessDepositPaid: new FormControl(''),
      balanceToBePaid: new FormControl(''),
      balanceDueDate: new FormControl(''),
      commisionAmount: new FormControl('', [Validators.maxLength(8)])
    }, { updateOn: 'blur' });
  }


  ngOnInit() {
    // this.getCurrencies();
    // this.group.get('adultNum').valueChanges.subscribe(e => {
    //   this.group.adultNum = e;
    //   this.tourPackageChange();
    // }
    // );

    // this.group.get('baseCost').valueChanges.subscribe(e => {
    //   this.group.value.baseCost = e;
    //   this.tourPackageChange();
    // }
    // );

    // this.group.get('taxesPerAdult').valueChanges.subscribe(e => {
    //   this.group.value.taxesPerAdult = e;
    //   this.tourPackageChange();
    // }
    // );

    // this.group.get('insurancePerAdult').valueChanges.subscribe(e => {
    //   this.group.value.insurancePerAdult = e;
    //   this.tourPackageChange();
    // }
    // );


    // this.group.get('childrenNumber').valueChanges.subscribe(e => {
    //   this.group.value.childrenNumber = e;
    //   this.tourPackageChange();
    // }
    // );

    // this.group.get('childBaseCost').valueChanges.subscribe(e => {
    //   this.group.value.childBaseCost = e;
    //   this.tourPackageChange();
    // }
    // );

    // this.group.get('taxesPerChild').valueChanges.subscribe(e => {
    //   this.group.value.taxesPerChild = e;
    //   this.tourPackageChange();
    // }
    // );

    // this.group.get('insurancePerChild').valueChanges.subscribe(e => {
    //   this.group.value.insurancePerChild = e;
    //   this.tourPackageChange();
    // }
    // );

    // this.group.get('infantNumber').valueChanges.subscribe(e => {
    //   this.group.value.infantNumber = e;
    //   this.tourPackageChange();
    // }
    // );

    // this.group.get('totalCostPerInfant').valueChanges.subscribe(e => {
    //   this.group.value.totalCostPerInfant = e;
    //   this.tourPackageChange();
    // }
    // );

    // this.group.get('depositPaid').valueChanges.subscribe(e => {
    //   this.group.value.depositPaid = e;
    //   this.tourPackageChange();
    // }
    // );

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('form group: ', this.group);
    // debugger;  
  }

  public onTouched: () => void = () => { };

  writeValue(val: any): void {
    val && this.group.setValue(val, { emitEvent: false });
  }
  registerOnChange(fn: any): void {
    console.log('on change');
    this.group.valueChanges.subscribe(fn);

  }
  registerOnTouched(fn: any): void {
    console.log('on blur');
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.group.disable() : this.group.enable();
  }

  validate(c: AbstractControl): ValidationErrors {
    console.log('Basic Info validation', c);
    return this.group.valid ? null : { invalidForm: { valid: false, message: 'basic InfoForm fields are invalid' } };
  }

  registerOnValidatorChange?(fn: () => void): void {


  }

  tourPackageChange() {
    console.log('tour package call');
    const v = this.computeAdultCost() + this.computeChildCost() + this.computeInfantCost();
    this.group.patchValue({ totalCostHoliday: v });
    this.computeBalanceToBePaid();
    // console.log('total cost holiday');
    // console.log(this.group.value.totalCostHoliday);
    // this.group.patchValue({ lessDepositPaid: this.group.value.depositPaid });
    // this.group.value.lessDepositPaid = this.group.value.depositPaid;
    // this.group.value.balanceToBePaid = this.group.value.totalCostHoliday - parseInt(this.group.value.lessDepositPaid, 0);
    // this.group.patchValue({ balanceToBePaid: this.group.value.totalCostHoliday - parseInt(this.group.value.depositPaid, 0) });
    // this.buildRemark();
  }

  computeBalanceToBePaid() {
    let dp = 0;
    if (this.group.value.depositPaid !== '') {
      dp = (parseInt(this.group.value.depositPaid, 0));
    }

    this.group.patchValue({ balanceToBePaid: this.group.value.totalCostHoliday - dp });
  }

  computeAdultCost() {
    let baseCost = 0;
    if (this.group.value.baseCost !== '') {
      baseCost = (parseInt(this.group.value.baseCost, 0));
    }
    let ipa = 0;
    if (this.group.value.insurancePerAdult !== '') {
      ipa = (parseInt(this.group.value.insurancePerAdult, 0));
    }
    let tpa = 0;
    if (this.group.value.taxesPerAdult !== '') {
      tpa = (parseInt(this.group.value.taxesPerAdult, 0));
    }
    const sum = (baseCost + ipa + tpa);

    let adultCount = 0;
    if (this.group.value.adultNum !== '') {
      adultCount = (parseInt(this.group.value.adultNum, 0));
    }

    let result = adultCount * sum;
    console.log(result);
    if (Number.isNaN(result)) {
      result = 0;
    }
    return result;
  }

  computeChildCost() {
    let childBaseCost = 0;
    if (this.group.value.childBaseCost !== '') {
      childBaseCost = (parseInt(this.group.value.childBaseCost, 0));
    }

    let ipc = 0;
    if (this.group.value.insurancePerChild !== '') {
      ipc = (parseInt(this.group.value.insurancePerChild, 0));
    }

    let tpc = 0;
    if (this.group.value.taxesPerChild !== '') {
      tpc = (parseInt(this.group.value.taxesPerChild, 0));
    }

    const sum = (childBaseCost + ipc + tpc);

    let childCount = 0;
    if (this.group.value.childrenNumber !== '') {
      childCount = (parseInt(this.group.value.childrenNumber, 0));
    }

    let result = childCount * sum;

    if (Number.isNaN(result)) {
      result = 0;
    }

    return result;
  }

  computeInfantCost() {
    console.log('compute infant cost');

    let tcpa = 0;
    if (this.group.value.totalCostPerInfant !== '') {
      tcpa = (parseInt(this.group.value.totalCostPerInfant, 0));
    }

    const sum = tcpa;

    let infantCount = 0;
    if (this.group.value.infantNumber !== '') {
      infantCount = (parseInt(this.group.value.infantNumber, 0));
    }

    let result = infantCount * sum;
    if (Number.isNaN(result)) {
      result = 0;
    }
    return result;
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

