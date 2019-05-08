import { Component, OnInit, Input, TemplateRef, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { SelectItem } from 'src/app/models/select-item.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { PassiveSegmentsModel } from 'src/app/models/pnr/passive-segments.model';
import { PnrService } from 'src/app/service/pnr.service';
import { DDBService } from 'src/app/service/ddb.service';
import { DeprecatedDatePipe, getLocaleExtraDayPeriodRules } from '@angular/common';
import { UtilHelper } from 'src/app/helper/util.helper';
declare var smartScriptSession: any;

@Component({
  selector: 'app-update-segment',
  templateUrl: './update-segment.component.html',
  styleUrls: ['./update-segment.component.scss']
})
export class UpdateSegmentComponent implements OnInit, AfterViewChecked {


  @Input()
  passiveSegments: PassiveSegmentsModel;
  selectedTmpl: TemplateRef<any>;
  @ViewChild('railTmpl') railTmpl: TemplateRef<any>;
  @ViewChild('carTmpl') carTmpl: TemplateRef<any>;
  @ViewChild('airTmpl') airTmpl: TemplateRef<any>;
  @ViewChild('cruiseTmpl') cruiseTmpl: TemplateRef<any>;
  @ViewChild('insuranceTmpl') insuranceTmpl: TemplateRef<any>;
  @ViewChild('tourTmpl') tourTmpl: TemplateRef<any>;
  @ViewChild('limoTmpl') limoTmpl: TemplateRef<any>;
  @ViewChild('hotelTmpl') hotelTmpl: TemplateRef<any>;
  mealPlanList: Array<SelectItem>;
  roomTypeList: Array<SelectItem>;
  segmentTypeList: Array<SelectItem>;
  stateRoomList: Array<SelectItem>;
  arrivaldayList: Array<SelectItem>;
  diningList: Array<SelectItem>;
  filterSupplierCodeList = [];
  hotelList = [];
  currencyList = [];
  segmentForm: FormGroup;
  isSubmitted: boolean;
  supplierCodeList: Array<any>;
  carTypeList: Array<any>;
  pickupOffAddrList = [];
  dropOffAddrList = [];
  stateProvinceList: any;
  lblvendorName: any;
  lblvendorCode: any;
  lblconfirmationNo: any;
  lbldepartureDate: any;
  lbldepartureTime: any;
  lbldepartureCity: any;
  lbldestinationCity: any;
  lblarrivalDate: any;
  lblarrivalTime: any;
  lbltourName: any;
  lblnoPeople: any;
  lblnoNights: any;
  passengers = [];
  formControls = new FormGroup({
    segmentType: new FormControl('', [Validators.required]),
    vendorName: new FormControl('', [Validators.required]),
    vendorCode: new FormControl('', [Validators.required]),
    confirmationNo: new FormControl('', [Validators.required]),
    departureDate: new FormControl('', [Validators.required]),
    departureTime: new FormControl('', [Validators.required]),
    departureCity: new FormControl('', [Validators.required]),
    destinationCity: new FormControl('', [Validators.required]),
    arrivalDate: new FormControl('', [Validators.required]),
    arrivalTime: new FormControl('', [Validators.required]),
    tourName: new FormControl('', [Validators.required]),
    noPeople: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]?$')]),
    noNights: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]?$')]),
    roomType: new FormControl('', []),
    mealPlan: new FormControl('', []),
    stateRoom: new FormControl('', []),
    cabinNo: new FormControl('', []),
    dining: new FormControl('', [Validators.required]),
    policyNo: new FormControl('', [Validators.required]),
    airlineCode: new FormControl('', [Validators.required]),
    flightNumber: new FormControl('', [Validators.required]),
    classService: new FormControl('', [Validators.required]),
    airlineRecloc: new FormControl('', []),
    othersText: new FormControl('', [Validators.required]),
    zzairlineCode: new FormControl('', []),
    zzdepartureCity: new FormControl('', []),
    zzdestinationCity: new FormControl('', []),
    seatNumber: new FormControl('', [Validators.required]),
    //train
    trainNumber: new FormControl('', [Validators.required]),
    carNumber: new FormControl('', [Validators.required]),
    fromStation: new FormControl('', [Validators.required]),
    arrivalStation: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    // limo
    rate: new FormControl('', [Validators.required]),
    rateType: new FormControl('', [Validators.required]),
    taxOnRate: new FormControl(''),
    toll: new FormControl(''),
    gratuities: new FormControl(''),
    parking: new FormControl(''),
    limoCoAgent: new FormControl(''),
    meetDriveAt: new FormControl(''),
    additionalInfo: new FormControl(''),
    cancellationInfo: new FormControl(''),
    pickupLoc: new FormControl('', [Validators.required]),
    transferTo: new FormControl('', [Validators.required]),
    includeTax: new FormControl(''),
    includeToll: new FormControl(''),
    includeParking: new FormControl(''),
    includeGratuities: new FormControl(''),
    //-- cars
    carType: new FormControl('', [Validators.required]),
    dropOffLoc: new FormControl('', [Validators.required]),
    pickupOffAddress: new FormControl(''),
    dropOffAddress: new FormControl(''),
    rentalCost: new FormControl('', [Validators.required]),
    currency: new FormControl('', [Validators.required]),
    duration: new FormControl('', [Validators.required]),
    mileage: new FormControl('', [Validators.required]),
    mileagePer: new FormControl('', [Validators.required]),
    dropOffFee: new FormControl(''),
    cdNumber: new FormControl(''),
    idNumber: new FormControl(''),
    frequentFlierNumber: new FormControl(''),
    specialEquipment: new FormControl(''),
    specialRequest: new FormControl(''),

    // hotel
    chainCode: new FormControl('', [Validators.required]),
    nightlyRate: new FormControl('', [Validators.required]),
    numberOfRooms: new FormControl('', [Validators.required]),
    guaranteedLate: new FormControl('', [Validators.required]),
    confirmedWith: new FormControl('', [Validators.required]),
    hotelCode: new FormControl(''),
    hotelCityName: new FormControl('', [Validators.required]),
    hotelName: new FormControl('', [Validators.required]),
    fax: new FormControl(''),
    address: new FormControl('', [Validators.required]),
    province: new FormControl(''),
    zipCode: new FormControl(''),
    country: new FormControl('', [Validators.required])

  });


  constructor(public activeModal: BsModalService,
    private pnrService: PnrService,
    private modalRef: BsModalRef,
    private ddbService: DDBService,
    private fb: FormBuilder,
    private util: UtilHelper) {
    this.passiveSegments = new PassiveSegmentsModel();
    this.supplierCodeList = this.ddbService.getSupplierCode();
    this.segmentForm = fb.group({ segmentType: new FormControl('', [Validators.required]) });


    this.loadMealPlan();
    this.loadRoomType();
    this.loadSegmentType();
    this.loadStateRoom();
    // this.loadArrivalDay();
    this.loadDining();
    this.getNoPassengers();
    this.loadCurrencies();
  }

  loadCurrencies() {
    // TODO: Get from API DDB
    this.currencyList = this.ddbService.getCurrencies();
  }

  ngOnInit() {
    this.changeSegmentType(this.passiveSegments.segmentType);


  }

  ngAfterViewChecked(): void {
  }

  saveSegment() {
    if (this.segmentForm.invalid) {
      alert('Please Complete And Complete all the required Information');
      this.isSubmitted = false;
      return;
    }
    // this.assignToModel();
    this.isSubmitted = true;
    this.modalRef.hide();
  }

  loadMealPlan() {
    this.mealPlanList = [{ itemText: '', itemValue: '' },
    { itemText: 'All Inclusive', itemValue: 'ALL INCLUSIVE' },
    { itemText: 'American Plan', itemValue: 'AMERICAN PLAN' }];
  }

  loadRoomType() {
    this.roomTypeList = [{ itemText: '', itemValue: '' },
    { itemText: 'SGLB', itemValue: 'SGLB' },
    { itemText: 'DBLB', itemValue: 'DBLB' },
    { itemText: 'TRPL', itemValue: 'TRPL' }];
  }

  loadRoomTypeHotel() {
    this.roomTypeList = [{ itemText: '', itemValue: '' },
    { itemText: 'Single Room', itemValue: 'SINGLE ROOM' },
    { itemText: 'Double Room', itemValue: 'DOUBLE ROOM' },
    { itemText: 'Triple Room', itemValue: 'TRIPLE ROOM' },
    { itemText: 'Quad Room', itemValue: 'QUAD ROOM' },
    { itemText: 'Queen Room', itemValue: 'QUEEN ROOM' },
    { itemText: 'King Room', itemValue: 'KING ROOM' },
    { itemText: 'Twin Room', itemValue: 'TWIN ROOM' },
    { itemText: 'Double-double Room', itemValue: 'DOUBLE-DOUBLE ROOM' },
    { itemText: 'Studio Room', itemValue: 'STUDIO ROOM' },
    ];

  }


  loadArrivalDay() {
    this.arrivaldayList = [{ itemText: '', itemValue: '' },
    { itemText: '+1', itemValue: '1' },
    { itemText: '+2', itemValue: '2' }];
  }


  loadSegmentType() {
    this.segmentTypeList = [{ itemText: '', itemValue: '' },
    { itemText: 'Air', itemValue: 'AIR' },
    { itemText: 'Cruise', itemValue: 'SEA' },
    { itemText: 'Insurance', itemValue: 'INS' },
    { itemText: 'Tour', itemValue: 'TOR' },
    { itemText: 'Car', itemValue: 'CAR' },
    { itemText: 'Limo', itemValue: 'LIM' },
    { itemText: 'Hotel', itemValue: 'HTL' },
    { itemText: 'Rail', itemValue: 'RAIL' }];
  }

  loadStateRoom() {
    this.stateRoomList = [{ itemText: '', itemValue: '' },
    { itemText: 'Stateroom Guarantee', itemValue: 'STATEROOM GUARANTEE' },
    { itemText: 'Interior', itemValue: 'INTERIOR' },
    { itemText: 'Ocean View', itemValue: 'OCEAN VIEW' },
    { itemText: 'Stateroom with Balcony', itemValue: 'STATEROOM WITH BALCONY' },
    { itemText: 'Suite', itemValue: 'SUITE' },
    { itemText: 'Other', itemValue: 'OTHER' }];
  }

  loadDining() {
    this.diningList = [{ itemText: '', itemValue: '' },
    { itemText: 'Early Dining', itemValue: 'EARLY DINING' },
    { itemText: 'Late Dining', itemValue: 'LATE DINING' },
    { itemText: 'Open Dining', itemValue: 'OPEN DINING' },
    { itemText: 'Waitlist Early', itemValue: 'WAITLIST EARLY' },
    { itemText: 'Waitlist Late', itemValue: 'WAITLIST LATE' }];
  }

  getNoPassengers() {
    this.passengers = this.pnrService.getPassengers();
    const passengerCount = this.passengers.length;
    this.passiveSegments.noPeople = passengerCount.toString();
  }

  setForm(forms) {
    this.segmentForm = this.fb.group({}, { updateOn: 'blur' });

    forms.forEach(x => {
      if (this.formControls.get(x) !== null) {
        this.segmentForm.addControl(x, this.formControls.get(x));
      } else {
        debugger;
        const xx = 1;
      }
    });

  }

  changeSegmentType(type) {
    this.selectedTmpl = null;
    this.lbldepartureDate = 'Departure Date';
    this.lbldepartureTime = 'Departure Time';
    this.lbldepartureCity = 'Departure City Code';
    this.lbldestinationCity = 'Arrival City Code';
    this.lblarrivalDate = 'Arrival Date';
    this.lblarrivalTime = 'Arrival Time';
    this.lblnoPeople = 'Number of Passengers';
    this.lblconfirmationNo = 'Confirmation Number';
    let forms = [];
    switch (type) {
      case 'AIR':
        this.selectedTmpl = this.airTmpl;

        forms = ['segmentType', 'airlineCode', 'flightNumber', 'classService',
          'departureDate', 'departureTime', 'departureCity', 'destinationCity', 'airlineRecloc',
          'arrivalDate', 'arrivalTime', 'noPeople', 'noNights', 'zzairlineCode', 'zzdepartureCity', 'zzdestinationCity'];
        this.setForm(forms);

        break;
      case 'TOR':
        this.lblvendorName = 'Vendor Name';
        this.lblvendorCode = 'Vendor Code';
        this.lbldepartureCity = 'Departure City Code';
        this.lbldestinationCity = 'Destination City Code';
        this.lbltourName = 'Tour Name or Hotel Name';
        this.lblnoPeople = 'Number of People';
        this.lblnoNights = 'Number of Nights';

        forms = ['segmentType', 'vendorName', 'vendorCode', 'confirmationNo', 'departureDate',
          'departureTime', 'departureCity', 'destinationCity', 'arrivalDate',
          'arrivalTime', 'tourName', 'noPeople', 'noNights', 'roomType', 'mealPlan'];
        this.setForm(forms);
        this.loadRoomType();

        this.selectedTmpl = this.tourTmpl;
        break;
      case 'SEA':

        this.lblvendorName = 'Cruise Line';
        this.lblvendorCode = 'Vendor Code';
        this.lblconfirmationNo = 'Confirmation Number';
        this.lbldepartureDate = 'Sailing Date';
        this.lbldepartureCity = 'Embarkation City Code';
        this.lbldestinationCity = 'Debarkation City Code';
        this.lbltourName = 'Name of Ship';
        this.lblnoPeople = 'Number of People';
        this.lblnoNights = 'Number of Nights';

        forms = ['segmentType', 'vendorName', 'vendorCode', 'confirmationNo', 'departureDate',
          'departureTime', 'departureCity', 'destinationCity', 'arrivalDate',
          'arrivalTime', 'tourName', 'noPeople', 'stateRoom', 'cabinNo', 'dining', 'noNights'];
        this.setForm(forms);
        this.selectedTmpl = this.cruiseTmpl;
        break;

      case 'INS':
        this.lbldepartureCity = 'Departure City';
        this.lblarrivalDate = 'Return Date';
        this.lblnoPeople = 'Number of Passengers';
        forms = ['segmentType', 'policyNo', 'departureDate', 'departureCity', 'arrivalDate', 'noPeople'];
        this.setForm(forms);
        this.selectedTmpl = this.insuranceTmpl;
        break;
      case 'RAIL':
        this.lblvendorName = 'Supplier Name';
        this.lblvendorCode = 'Supplier Code';
        forms = ['segmentType', 'classService', 'seatNumber', 'trainNumber', 'carNumber', 'vendorName', 'vendorCode', 'confirmationNo',
          'departureDate', 'departureTime', 'departureCity', 'destinationCity', 'arrivalStation', 'fromStation',
          'arrivalDate', 'arrivalTime', 'noPeople'];
        this.setForm(forms);
        this.selectedTmpl = this.railTmpl;
        this.segmentForm.get('destinationCity').disable();
        break;
      case 'LIM':
        this.lblvendorName = 'Limo Company';
        this.lblvendorCode = 'Limo Supplier Code';
        forms = ['segmentType', 'vendorName', 'vendorCode', 'confirmationNo', 'rate', 'rateType', 'taxOnRate', 'toll', 'gratuities',
          'departureDate', 'departureTime', 'departureCity', 'parking', 'limoCoAgent', 'meetDriveAt', 'phone',
          'additionalInfo', 'cancellationInfo', 'noPeople', 'pickupLoc', 'transferTo',
          'includeTax', 'includeToll', 'includeParking', 'includeGratuities'];

        this.setForm(forms);
        this.includeOnRate('includeTax', this.passiveSegments.includeTax);
        this.includeOnRate('includeToll', this.passiveSegments.includeToll);
        this.includeOnRate('includeGratuities', this.passiveSegments.includeGratuities);
        this.includeOnRate('includeParking', this.passiveSegments.includeParking);        
        this.selectedTmpl = this.limoTmpl;
      

        break;
      case 'CAR':
        this.lbldepartureDate = 'Pickup Date';
        this.lbldepartureTime = 'Pickup Time';
        this.lblarrivalDate = 'Return Date';
        this.lblarrivalTime = 'Return Time';
        this.lblvendorName = 'Car Name';
        this.lblvendorCode = 'Car Vendor Code';
        this.lbldepartureCity = 'Pickup City';
        this.lbldestinationCity = 'Drop Off City';

        forms = ['segmentType', 'vendorName', 'vendorCode', 'confirmationNo', 'rentalCost', 'currency', 'carType',
          'departureDate', 'departureTime', 'departureCity', 'duration', 'mileage', 'mileagePer', 'dropOffFee', 'dropOffAddress',
          'pickupLoc', 'dropOffLoc', 'cdNumber', 'idNumber', 'pickupOffAddress',
          'frequentFlierNumber', 'specialEquipment', 'specialRequest', 'destinationCity', 'arrivalTime', 'arrivalDate'];
        this.setForm(forms);
        this.selectedTmpl = this.carTmpl;


        if (this.passiveSegments.departureCity !== '' && this.passiveSegments.vendorCode !== '') {
          this.loadCarSupplier();
          this.loadCarType();
          this.loadDropOffAddr(this.passiveSegments.dropOffLoc);
          this.loadPickupOffAddr(this.passiveSegments.pickupLoc);
        }
        break;
      case 'HTL':

        this.lbldepartureDate = 'Check In Date';
        this.lblarrivalDate = 'Check Out Date';
        this.lbldepartureCity = 'Hotel City';

        forms = ['segmentType', 'confirmationNo', 'departureCity', 'departureDate', 'arrivalDate', 'policyNo', 'currency',
          'chainCode', 'nightlyRate', 'numberOfRooms', 'guaranteedLate', 'confirmedWith', 'hotelCode', 'hotelCityName', 'rateType',
          'hotelName', 'fax', 'phone', 'address', 'province', 'zipCode', 'country', 'roomType', 'additionalInfo'];
        this.loadRoomTypeHotel();
        this.stateProvinceList = this.ddbService.getStateProvinces();
        this.getHotels();
        this.setForm(forms);

        this.selectedTmpl = this.hotelTmpl;
        break;
      default:
        break;
    }

    this.segmentForm.get('segmentType').setValue(type);
    this.util.validateAllFields(this.segmentForm);
  }

  includeOnRate(name, checked) {
    // switch (name) {
    //   case 'includeTax':
    //     this.enableFormControls(['taxOnRate'], !checked);
    //     break;
    //   case 'includeToll':
    //     this.enableFormControls(['toll'], !checked);
    //     break;
    //   case 'includeGratuities':
    //     this.enableFormControls(['gratuities'], !checked);
    //     break;
    //   case 'includeParking':
    //     this.enableFormControls(['parking'], !checked);
    //     break;
    // }
  }

  pickUpLocChange() {

  }

  getHotels() {
    const chainCode = this.passiveSegments.chainCode;
    const cityCode = this.passiveSegments.departureCity;
    if ((chainCode !== undefined && chainCode.length === 2) && (cityCode !== undefined && cityCode.length === 3)) {
      this.hotelList = [];
      smartScriptSession.send('HL' + chainCode + cityCode).then(async res => {
        let lines = res.Response.split('\r\n');
        const regex = /^(?<code>[A-Z]{2}) ([A-Z])(\s{1,2})([A-Z])(\s{2,3})([A-Z]{3})(\s{2})(?<text>.*)/g;
        lines = await this.getMDResult(lines);
        lines.forEach(r => {
          const match = regex.exec(r);
          if (match && match.groups) {
            this.hotelList.push({ itemValue: match.groups.code, itemText: match.groups.text });
            regex.lastIndex = 0;
          }
        });
      });
    }
  }

  getHotelInfo($event) {
    const text = $event.target.options[$event.target.options.selectedIndex].text;
    const hotelCode = $event.target.options[$event.target.options.selectedIndex].value;
    this.passiveSegments.hotelName = text.split('!')[1];
    smartScriptSession.send('HF' + hotelCode).then(async res => {
      const lines = res.Response.split('\r\n');
      if (this.stateProvinceList === undefined) {
        this.stateProvinceList = this.ddbService.getStateProvinces();
      }
      const regex = /(?<city>(.*))\s\s(?<province>[A-Z]{2})\s\s(?<zip>([A-Z0-9]{3})\s([A-Z0-9]{3}))/g;
      const match = regex.exec(lines[3].trim());
      if (match && match.groups) {
        this.passiveSegments.hotelCityName = match.groups.city;
        this.passiveSegments.zipCode = match.groups.zip;
        const prov = this.stateProvinceList.find(x => x.code === match.groups.province);
        this.passiveSegments.province = prov.province;
      }

      this.passiveSegments.address = lines[2].trim();
      this.passiveSegments.country = lines[4].trim();

      lines.forEach(r => {
        if (r.trim().indexOf('-TEL') === 0) {
          this.passiveSegments.phone = r.trim().split(':')[1].trim();
        } else if (r.trim().indexOf('-FAX') === 0) {
          this.passiveSegments.fax = r.trim().split(':')[1].trim();
        }
      });
    });
  }

  enableFormControls(controls: string[], disabled: boolean) {
    controls.forEach(c => {
      if (this.segmentForm.get(c) !== null) {
        if (disabled) {
          this.segmentForm.get(c).disable();
          this.segmentForm.get(c).setValue('');
        } else {
          this.segmentForm.get(c).enable();
        }
      }
    });
  }

  onChangeSegmentType(type) {
    this.changeSegmentType(type);
  }

  checkDate(tempdate, tempname) {
    const now = new Date();
    const tempdate2 = new Date(tempdate);
    if (tempdate2 < now) {
      this.segmentForm.get(tempname).setErrors({ incorrect: true });
    } else {
      if (this.segmentForm.controls.arrivalDate.value !== undefined && this.segmentForm.controls.departureDate.value !== undefined) {
        const depdate = new Date(this.segmentForm.controls.departureDate.value);
        const arrDate = new Date(this.segmentForm.controls.arrivalDate.value);
        if (depdate > arrDate) {
          this.segmentForm.get(tempname).setErrors({ incorrect: true });
          return;
        }
        const diff = arrDate.getTime() - depdate.getTime();
        const night = Math.ceil(diff / (1000 * 3600 * 24));
        this.segmentForm.controls.noNights.patchValue(night);
      }
      this.segmentForm.get(tempname).setErrors(null);
      // this.getNoPassengers();
    }
  }

  onChangezz(controlValue, controlName) {
    debugger;
    if (this.segmentForm.get('segmentType').value === 'AIR') {
      let enable = false;
      let controlenable = '';
      controlValue = controlValue.toUpperCase();
      switch (controlName) {
        case 'airlineCode':
          controlenable = 'zzairlineCode';
          if (controlValue === 'ZZ') {
            enable = true;
          }
          break;
        case 'departureCity':
          controlenable = 'zzdepartureCity';
          if (controlValue === 'ZZZ') {
            enable = true;
          }
          break;
        case 'destinationCity':
          controlenable = 'zzdestinationCity';
          if (controlValue === 'ZZZ') {
            enable = true;
          }
          break;
      }

      if (enable) {
        this.segmentForm.get(controlenable).enable();
        this.segmentForm.get(controlenable).setValidators(Validators.required);
      } else {
        this.segmentForm.get(controlenable).disable();
        this.segmentForm.get(controlenable).setValidators(null);
      }
      this.segmentForm.get(controlenable).updateValueAndValidity();

    } else if (this.segmentForm.get('segmentType').value === 'CAR') {
      //this.loadCarType();

    }
  }

  departureCityOnBlur() {
    if (this.segmentForm.get('segmentType').value === 'CAR') {
      this.loadCarSupplier();
    }
  }

  vendorCodeChange() {
    if (this.segmentForm.get('segmentType').value === 'CAR') {
      this.loadCarType();

    }
  }

  loadCarSupplier() {
    this.filterSupplierCodeList = [];
    const city = this.segmentForm.get('departureCity').value;
    if (city === undefined || city.length < 3) { return; }
    const response = smartScriptSession.send('CL' + city + '-T').then(async res => {
      let lines = res.Response.split('\r\n');
      const regex = /^(?<code>[A-Z]{2}) (?<text>([A-Z]{2})\+.+?(?=\s{2}))/g;
      lines = await this.getMDResult(lines);
      lines.forEach(x => {
        const match = regex.exec(x);
        if (match && match.groups) {
          const obj = this.filterSupplierCodeList.find(z => z.supplierCode === match.groups.code);
          if (obj === undefined) {
            this.filterSupplierCodeList.push({ supplierCode: match.groups.code, supplierName: match.groups.text });
          }
          regex.lastIndex = 0;
        }
      });
    });
  }

  async getMDResult(lines) {
    if (lines[lines.length - 2].indexOf('MORE') === 0) {
      let stop = false;
      while (!stop) {
        await smartScriptSession.send('MD').then(x => {
          const list = (x.Response.split('\r\n'));
          lines = lines.concat(list);
          const lasItem = list[list.length - 2];
          if ((list.length < 4) || (lasItem.indexOf('NO MORE ITEMS') >= 0) || lasItem.indexOf('END OF DISPLAY')) {
            stop = true;
          }
        });

      }
    }
    return lines;
  }

  loadPickupOffAddr(val) {
    this.pickupOffAddrList = [];
    if (val === 'OFF AIRPORT') {
      const city = this.passiveSegments.departureCity;
      if (city.length < 3) { return; }
      const vendor = this.passiveSegments.vendorCode;
      this.getOffAddress(this.pickupOffAddrList, 'CL' + vendor + city);
      this.segmentForm.get('pickupOffAddress').enable();
    } else {
      this.segmentForm.get('pickupOffAddress').disable();
    }

    if (this.passiveSegments.dropOffLoc !== val) {
      this.segmentForm.get('dropOffAddress').enable();
      this.loadDropOffAddr(this.passiveSegments.dropOffLoc, val);
    }

  }

  loadDropOffAddr(val, pickup?) {
    if (pickup === undefined) {
      pickup = this.passiveSegments.pickupLoc;
    }

    this.dropOffAddrList = [];
    if (pickup !== val) {
      const city = this.passiveSegments.departureCity;
      if (city.length < 3) { return; }
      const vendor = this.passiveSegments.vendorCode;
      this.getOffAddress(this.dropOffAddrList, 'CL' + vendor + city);
      this.segmentForm.get('dropOffAddress').enable();
    } else {
      this.segmentForm.get('dropOffAddress').disable();
    }
  }


  getOffAddress(addrList, command) {
    const response = smartScriptSession.send(command).then(async res => {
      let lines = res.Response.split('\r\n');
      const regex = /(?<code>[A-Z]{4}[0-9]{2}) (?<text>.+?(?=\s{2}))/g;

      lines = await this.getMDResult(lines);
      lines.forEach(x => {
        const match = regex.exec(x);
        if (match && match.groups) {
          const obj = addrList.find(z => z.itemValue === match.groups.code);
          if (obj === undefined) {
            addrList.push({ itemValue: match.groups.code, itemText: match.groups.text });
          }
          regex.lastIndex = 0;
        }
      });
    });

  }


  loadCarType() {
    this.carTypeList = [];
    const city = this.passiveSegments.departureCity;
    if (city.length < 3) { return; }
    const vendor = this.passiveSegments.vendorCode;
    // CPOZEYYZ
    const response = smartScriptSession.send('CPO' + vendor + city + '/VEH').then(async res => {

      let lines = res.Response.split('\r\n');
      lines = await this.getMDResult(lines);
      const regex = /\s(?<code>[A-Z]{4}) ([A-Z]{1}|\s) (?<text>.+?(?=\s{2}))/g;
      lines.forEach(x => {
        const match = regex.exec(x);
        if (match && match.groups) {
          if (match.groups.text.trim() !== '') {
            const obj = this.carTypeList.find(z => z.itemValue === match.groups.code);

            if (obj === undefined) {
              this.carTypeList.push({ itemValue: match.groups.code, itemText: match.groups.text });
            }
            regex.lastIndex = 0;
          }
        }

      });
    });
  }

  onChangeStateRoom(type) {
    if (type === 'OTHER') {
      this.segmentForm.controls.othersText.enable();
      this.segmentForm.controls.othersText.setValidators(Validators.required);
      this.segmentForm.controls.othersText.updateValueAndValidity();
    }
  }

  filterStateProvince(country) {
    if (country) {
      switch (country.toUpperCase()) {
        case 'US':
        case 'United States':
          this.stateProvinceList = this.ddbService.getStateProvinces('US');
          break;
        case 'CA':
        case 'CANADA':
          this.stateProvinceList = this.ddbService.getStateProvinces('CA');
          break;
        default:
          this.stateProvinceList = this.ddbService.getStateProvinces();
          break;
      }
    }
  }

}
