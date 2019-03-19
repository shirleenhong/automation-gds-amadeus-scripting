import { Component, OnInit } from '@angular/core';
import {SelectItem} from '../../models/select.item.model'
import {PnrService} from  '../../service/pnr.service'
import { RemarkCollectionService } from '../../service/remark.collection.service';
import { RemarkGroup } from '../../models/remark.group.model';
import { RemarkModel } from '../../models/remark.model';
import { formatDate } from '@angular/common';		
import { DatePipe } from '@angular/common';
import { IfStmt } from '@angular/compiler';


@Component({
  selector: 'app-tour-package',
  templateUrl: './tour-package.component.html',
  styleUrls: ['./tour-package.component.scss']
})
export class TourPackageComponent implements OnInit {
  bspCurrencyList: SelectItem[];
  currencyCode : string;
  adultNum : string;
  baseCost : string;
  taxesPerAdult : string;
  insurancePerAdult : string;
  childrenNumber : string;
  childBaseCost : string;
  infantBaseCost : string;
  taxesPerChild : string;
  insurancePerChild : string;
  infantNumber : string;
  totalCostPerInfant : string;
  depositPaid :string;
  totalCostHoliday : number;
  lessDepositPaid : string;
  balanceToBePaid : number;
  balanceDueDate : Date;
  commisionAmount : string;

  constructor(private pnrService: PnrService,private remarkCollectionService:RemarkCollectionService) { }

  ngOnInit() {
    this.getCurrencies(); 
  }

  getCurrencies(){
    //todo Get from API DDB 
      this.bspCurrencyList =[ {itemText:"",itemValue:"-1"},
      {itemText:"Andorran Peset",itemValue:"ADP"},
      {itemText:"UAE Dirham",itemValue:"AED"},
      {itemText:"Afghanistan Afghani",itemValue:"AFN"},
      {itemText:"Albanian Lek",itemValue:"ALL"},
      {itemText:"Armenian Dram",itemValue:"AMD"},
      {itemText:"Ne Antillian Guilder",itemValue:"ANG"},
      {itemText:"Kwanza",itemValue:"AOA"},
      {itemText:"Argentine Peso",itemValue:"ARS"},
      {itemText:"Austrian Schilling",itemValue:"ATS"},
      {itemText:"Australian Dollar",itemValue:"AUD"},
      {itemText:"Aruban Guilder",itemValue:"AWG"},
      {itemText:"Azerbaijanian Manat",itemValue:"AZN"},
      {itemText:"Convertable Marks",itemValue:"BAM"},
      {itemText:"Barbados Dollar",itemValue:"BBD"},
      {itemText:"Bangladesh Taka",itemValue:"BDT"},
      {itemText:"Belgian Franc",itemValue:"BEF"},
      {itemText:"Bulgarian Lev",itemValue:"BGN"},
      {itemText:"Bahraini Dinar",itemValue:"BHD"},
      {itemText:"Burundi Franc",itemValue:"BIF"},
      {itemText:"Bermuda Dollar",itemValue:"BMD"},
      {itemText:"Brunei Dollar",itemValue:"BND"},
      {itemText:"Bolivian Boliviano",itemValue:"BOB"},
      {itemText:"Brazilian Real",itemValue:"BRL"},
      {itemText:"Bahamian Dollar",itemValue:"BSD"},
      {itemText:"Bhutan Ngultrum",itemValue:"BTN"},
      {itemText:"Botswana Pula",itemValue:"BWP"},
      {itemText:"Belarusian Ruble",itemValue:"BYR"},
      {itemText:"Belize Dollar",itemValue:"BZD"},
      {itemText:"Canadian Dollar",itemValue:"CAD"},
      {itemText:"Franc Congolais",itemValue:"CDF"},
      {itemText:"Swiss Franc",itemValue:"CHF"},
      {itemText:"Chilean Peso",itemValue:"CLP"},
      {itemText:"Chinese Yuan",itemValue:"CNY"},
      {itemText:"Columbian Peso",itemValue:"COP"},
      {itemText:"Costa Rican Colon",itemValue:"CRC"},
      {itemText:"Dinar",itemValue:"CSD"},
      {itemText:"Cuban Peso",itemValue:"CUP"},
      {itemText:"Cape Verde Escudo",itemValue:"CVE"},
      {itemText:"Cyprus Pound",itemValue:"CYP"},
      {itemText:"Czech Koruna",itemValue:"CZK"},
      {itemText:"Deutsche Mark",itemValue:"DEM"},
      {itemText:"Djibouti Franc",itemValue:"DJF"},
      {itemText:"Danish Krone",itemValue:"DKK"},
      {itemText:"Dominican Peso",itemValue:"DOP"},
      {itemText:"Algerian Dinar",itemValue:"DZD"},
      {itemText:"Estonian Kroon",itemValue:"EEK"},
      {itemText:"Egyptian Pound",itemValue:"EGP"},
      {itemText:"Eritrea Nakfa",itemValue:"ERN"},
      {itemText:"Spanish Pesetas",itemValue:"ESP"},
      {itemText:"Ethiopian Birr",itemValue:"ETB"},
      {itemText:"Euro",itemValue:"EUR"},
      {itemText:"Finnish Markka",itemValue:"FIM"},
      {itemText:"Fiji Dollar",itemValue:"FJD"},
      {itemText:"Falkland Islands Pound",itemValue:"FKP"},
      {itemText:"French Franc",itemValue:"FRF"},
      {itemText:"Great British Pound",itemValue:"GBP"},
      {itemText:"Georgian Lari",itemValue:"GEL"},
      {itemText:"Ghana Cedi",itemValue:"GHS"},
      {itemText:"Gibraltar Pound",itemValue:"GIP"},
      {itemText:"Gambian Dalasi",itemValue:"GMD"},
      {itemText:"Guinea Franc",itemValue:"GNF"},
      {itemText:"Greek Drachma",itemValue:"GRD"},
      {itemText:"Guatemala Quetzal",itemValue:"GTQ"},
      {itemText:"Guinea-Bissau Peso",itemValue:"GWP"},
      {itemText:"Guyana Dollar",itemValue:"GYD"},
      {itemText:"HongKong Dollar",itemValue:"HKD"},
      {itemText:"Honduran Lempira",itemValue:"HNL"},
      {itemText:"Croatian Kuna",itemValue:"HRK"},
      {itemText:"Haitian Gourde",itemValue:"HTG"},
      {itemText:"Hungarian Forint",itemValue:"HUF"},
      {itemText:"Indonesian Rupiah",itemValue:"IDR"},
      {itemText:"Irish Pound",itemValue:"IEP"},
      {itemText:"Israeli Shekel",itemValue:"ILS"},
      {itemText:"Indian Rupee",itemValue:"INR"},
      {itemText:"Iraqi Dinar",itemValue:"IQD"},
      {itemText:"Iranian Rial",itemValue:"IRR"},
      {itemText:"Iceland Krona",itemValue:"ISK"},
      {itemText:"Italian Lira",itemValue:"ITL"},
      {itemText:"Jamaican Dollar",itemValue:"JMD"},
      {itemText:"Jordanian Dinar",itemValue:"JOD"},
      {itemText:"Japanese Yen",itemValue:"JPY"},
      {itemText:"Kenyan Shilling",itemValue:"KES"},
      {itemText:"Kyrgyzstan Som",itemValue:"KGS"},
      {itemText:"Kampuchea Riel",itemValue:"KHR"},
      {itemText:"Comoro Franc",itemValue:"KMF"},
      {itemText:"North Korean Won",itemValue:"KPW"},
      {itemText:"Korean Republic Won",itemValue:"KRW"},
      {itemText:"Kuwaiti Dinar",itemValue:"KWD"},
      {itemText:"CaymanIs Dollar",itemValue:"KYD"},
      {itemText:"Kazakstan Tenge",itemValue:"KZT"},
      {itemText:"Lao Peoples Kip",itemValue:"LAK"},
      {itemText:"Lebanese Pound",itemValue:"LBP"},
      {itemText:"SriLanka Rupee",itemValue:"LKR"},
      {itemText:"Liberian Dollar",itemValue:"LRD"},
      {itemText:"Lesotho Loti",itemValue:"LSL"},
      {itemText:"Lithuanian Litas",itemValue:"LTL"},
      {itemText:"Luxembourg Franc",itemValue:"LUF"},
      {itemText:"Latvian Lats",itemValue:"LVL"},
      {itemText:"Libyan Dinar",itemValue:"LYD"},
      {itemText:"Moroccan Dirham",itemValue:"MAD"},
      {itemText:"Moldovan Leu",itemValue:"MDL"},
      {itemText:"Malagasy Ariary",itemValue:"MGA"},
      {itemText:"MacedonianDinar",itemValue:"MKD"},
      {itemText:"Myanmar Kyai",itemValue:"MMK"},
      {itemText:"Mongolian Tugric",itemValue:"MNT"},
      {itemText:"Macau Pataca",itemValue:"MOP"},
      {itemText:"Mauritanian Ouguiya",itemValue:"MRO"},
      {itemText:"Maltese Lira",itemValue:"MTL"},
      {itemText:"Mauritius Rupee",itemValue:"MUR"},
      {itemText:"Maldives Rufiyaa",itemValue:"MVR"},
      {itemText:"Malawi Kwacha",itemValue:"	MWK"},
      {itemText:"Mexican Peso",itemValue:"MXN"},
      {itemText:"Malaysian Ringgit",itemValue:"MYR"},
      {itemText:"Mozambique Metical",itemValue:"MZN"},
      {itemText:"Namibia Dollar",itemValue:"NAD"},
      {itemText:"Nigerian Naira",itemValue:"NGN"},
      {itemText:"Cordoba Oro",itemValue:"NIO"},
      {itemText:"Netherlands Guilder",itemValue:"NLG"},
      {itemText:"Norwegian Krone",itemValue:"NOK"},
      {itemText:"Nepalese Rupee",itemValue:"NPR"},
      {itemText:"New Zealand Dollar",itemValue:"NZD"},
      {itemText:"Oman Rial Omani",itemValue:"OMR"},
      {itemText:"Panamanian Balboa",itemValue:"PAB"},
      {itemText:"Peruvian Nuevo Sol",itemValue:"PEN"},
      {itemText:"Papua NewGuinea Kina",itemValue:"PGK"},
      {itemText:"Philippine Peso",itemValue:"PHP"},
      {itemText:"Pakistan Rupee",itemValue:"PKR"},
      {itemText:"Polish Zloty",itemValue:"PLN"},
      {itemText:"Palestinian Zits",itemValue:"PSZ"},
      {itemText:"Portuguese Escudo",itemValue:"PTE"},
      {itemText:"Paraguayan Guarani",itemValue:"PYG"},
      {itemText:"Qatari Rial",itemValue:"QAR"},
      {itemText:"New Romanian Leu",itemValue:"RON"},
      {itemText:"Serbian dinar",itemValue:"RSD"},
      {itemText:"Russian Ruble",itemValue:"RUB"},
      {itemText:"Rwanda Franc",itemValue:"RWF"},
      {itemText:"Saudi Riyal",itemValue:"SAR"},
      {itemText:"Solomon Islands Dollar",itemValue:"SBD"},
      {itemText:"Seycelles Rupee",itemValue:"SCR"},
      {itemText:"Sudan Dinar",itemValue:"SDD"},
      {itemText:"Sudanese Pound",itemValue:"SDG"},
      {itemText:"Swedish Krona",itemValue:"SEK"},
      {itemText:"Singapore Dollar",itemValue:"SGD"},
      {itemText:"Slovenia Tolar",itemValue:"SIT"},
      {itemText:"Sierra Leone Leone",itemValue:"SLL"},
      {itemText:"Somali Shilling",itemValue:"SOS"},
      {itemText:"Surinam Dollar",itemValue:"SRD"},
      {itemText:"South Sudanese Pound",itemValue:"SSP"},
      {itemText:"Sao Tome Dobra",itemValue:"STD"},
      {itemText:"El Salvador Colon",itemValue:"SVC"},
      {itemText:"Syrian Pound",itemValue:"SYP"},
      {itemText:"Swaziland Lilangeni",itemValue:"SZL"},
      {itemText:"Thai Baht",itemValue:"THB"},
      {itemText:"Somoni",itemValue:"TJS"},
      {itemText:"Turkmenistan Manat",itemValue:"TMM"},
      {itemText:"Tunisian Dinar",itemValue:"TND"},
      {itemText:"Tonga Pa Anga",itemValue:"TOP"},
      {itemText:"New Turkish Lira",itemValue:"TRY"},
      {itemText:"Trinidad Tobago Dollar",itemValue:"TTD"},
      {itemText:"Taiwan New Dollar",itemValue:"TWD"},
      {itemText:"Tanzanian Shilling",itemValue:"TZS"},
      {itemText:"Ukrainian Hryvnia",itemValue:"UAH"},
      {itemText:"Uganda Shilling",itemValue:"UGX"},
      {itemText:"US Dollar",itemValue:"USD"},
      {itemText:"Uruguay Peso",itemValue:"UYU"},
      {itemText:"Uzbekistan Sum",itemValue:"UZS"},
      {itemText:"Venezuelan Bolivar",itemValue:"VEB"},
      {itemText:"Venezuelan BolivarFuerte",itemValue:"VEF"},
      {itemText:"Vietnamese Dong",itemValue:"VND"},
      {itemText:"Vanuatu Vatu",itemValue:"VUV"},
      {itemText:"Western Samoan Tala",itemValue:"WST"},
      {itemText:"CFA Franc Beac",itemValue:"XAF"},
      {itemText:"E Caribbean Dollar",itemValue:"XCD"},
      {itemText:"CFA Franc Bceao",itemValue:"XOF"},
      {itemText:"Fr Polynesia Pacific Franc",itemValue:"XPF"},
      {itemText:"Yemeni Rial",itemValue:"YER"},
      {itemText:"Yugoslav Dinar",itemValue:"YUG"},
      {itemText:"Yugoslav New Dinar",itemValue:"YUM"},
      {itemText:"Yugoslavian Dinar",itemValue:"YUN"},
      {itemText:"Sout hAfrican Rand",itemValue:"ZAR"},
      {itemText:"Zambian Kwacha",itemValue:"ZMK"},
      {itemText:"Zaire NewZaire",itemValue:"ZRZ"},
      {itemText:"Zimbabwe Dollarr",itemValue:"ZWD"},
      {itemText:"Zimbabwe Dollar",itemValue:"ZWR"},             
          ];
    }

  tourPackageChange(){      

      this.totalCostHoliday= this.computeAdultCost() + this.computeChildCost() + this.computeInfantCost()
      this.lessDepositPaid = this.depositPaid;
      this.balanceToBePaid = this.totalCostHoliday - parseInt(this.lessDepositPaid)
      this.buildRemark();
    }

    computeAdultCost(){
      var sum=  (parseInt(this.baseCost) + parseInt(this.insurancePerAdult) +  parseInt(this.taxesPerAdult))

      var result = parseInt(this.adultNum) * sum;
      return result;
    }

    computeChildCost(){
      var sum=  (parseInt(this.childBaseCost) + parseInt(this.insurancePerChild) +  parseInt(this.taxesPerChild))

      var result = parseInt(this.childrenNumber) * sum;
      return result;
    }

    computeInfantCost(){
      var sum=  (parseInt(this.totalCostPerInfant));

      var result = parseInt(this.infantNumber) * sum;
      return result;
    }

    addSpaces(textToformat:string, len:number, type: string)
    {
      var newformat: string = '';

        if(textToformat.length<10){
          for(var i=1; i<(len-textToformat.length); i++){
            newformat = newformat + '-';
          }
        }
        if (type == 'prefix')
        {
          newformat = newformat + ' ' + textToformat;
        }else
        {
          newformat = textToformat + ' ' + newformat;
        }
        
        return newformat;

      }


      buildRemark(){    
      var rmGroup = new RemarkGroup();
      rmGroup.group ="Tour Package"      
      rmGroup.remarks = new Array<RemarkModel>();
      var datePipe = new DatePipe("en-US");

      rmGroup.remarks.push(this.getRemark('THE FOLLOWING COSTS ARE SHOWN IN ' + this.currencyCode,'RI','I'));
      if(parseInt(this.adultNum)>0)
      {
        rmGroup.remarks.push(this.getRemark('ADULT PACKAGE ---------' + this.addSpaces(this.baseCost.toString(),10, 'prefix') + 'X' + this.addSpaces(this.adultNum.toString() , 5, 'suffix') + ' ' + (parseInt(this.baseCost) * parseInt(this.adultNum)) ,'RI','I'));
        rmGroup.remarks.push(this.getRemark('ADULT TAXES -----------' + this.addSpaces(this.taxesPerAdult.toString(),10, 'prefix') + 'X'+ this.addSpaces(this.adultNum.toString() , 5, 'suffix') + ' ' + (parseInt(this.taxesPerAdult) * parseInt(this.adultNum)),'RI','I'));
        rmGroup.remarks.push(this.getRemark('ADULT INSURANCE -------' + this.addSpaces(this.insurancePerAdult.toString(),10, 'prefix') + 'X' + this.addSpaces(this.adultNum.toString() , 5, 'suffix')  + ' ' + (parseInt(this.insurancePerAdult) * parseInt(this.adultNum)),'RI','I'));
      
      }

      if(parseInt(this.childrenNumber) > 0)
      {
        rmGroup.remarks.push(this.getRemark('CHILD PACKAGE ---------' + this.addSpaces(this.childBaseCost.toString(),10, 'prefix') + 'X' + this.addSpaces(this.childrenNumber.toString() , 5, 'suffix')  + ' ' + (parseInt(this.childBaseCost) * parseInt(this.childrenNumber)) ,'RI','I'));
        rmGroup.remarks.push(this.getRemark('CHILD TAXES -----------' + this.addSpaces(this.taxesPerChild.toString(),10, 'prefix')+ 'X' + this.addSpaces(this.childrenNumber.toString() , 5, 'suffix')  + ' ' + (parseInt(this.taxesPerChild) * parseInt(this.childrenNumber)),'RI','I'));
        rmGroup.remarks.push(this.getRemark('CHILD INSURANCE -------' + this.addSpaces(this.insurancePerChild.toString(),10, 'prefix') +'X' + this.addSpaces(this.childrenNumber.toString() , 5, 'suffix')  + ' ' + (parseInt(this.insurancePerChild) * parseInt(this.childrenNumber)) ,'RI','I'));
      
      }

      if(parseInt(this.infantNumber))
      {
        rmGroup.remarks.push(this.getRemark('INFANT PACKAGE ---------' + this.addSpaces(this.totalCostPerInfant.toString(),10, 'prefix') + 'X' + this.addSpaces(this.infantNumber.toString() , 5, 'suffix')  + ' ' + (parseInt(this.totalCostPerInfant) * parseInt(this.infantNumber)),'RI','I'));
      }

      rmGroup.remarks.push(this.getRemark('TOTAL PACKAGE PRICE ' + this.totalCostHoliday,'RI','I'));      
      rmGroup.remarks.push(this.getRemark('LESS DEPOSIT PAID ' + this.lessDepositPaid + ' - ' + formatDate(Date.now(),'dMMM','en') ,'RI','I'));
      rmGroup.remarks.push(this.getRemark('BALANCE DUE ' + this.balanceToBePaid,'RI','I'));      
      rmGroup.remarks.push(this.getRemark('---- BALANCE OF ' + this.balanceToBePaid + ' IS DUE ' + datePipe.transform(this.balanceDueDate, 'dMMMyy')  +'----','RI','I'));
      rmGroup.remarks.push(this.getRemark('SOME TAXES ARE PAYABLE LOCALLY AND NOT INCLUDED ABOVE','RI','I'));
      
      rmGroup.remarks.push(this.getRemark('U43/-' +  datePipe.transform(this.balanceDueDate, 'MMMyy'),'RM','*'));
      //rmGroup.remarks.push(this.getRemark('*U43/-' + formatDate(this.balanceDueDate,'MMMyy','en'),'RM','*'));
      rmGroup.remarks.push(this.getRemark('U41/-' + this.balanceToBePaid,'RM','*'));
      rmGroup.remarks.push(this.getRemark('U42/-' + this.commisionAmount,'RM','*'));
      this.remarkCollectionService.addUpdateRemarkGroup(rmGroup); 
    }

    getRemark(remarkText,remarkType,remarkCategory){
      var rem = new RemarkModel();
      rem.remarkType = remarkType;
      rem.remarkText=remarkText;
      rem.category=remarkCategory;
      return rem;
    }  
}

