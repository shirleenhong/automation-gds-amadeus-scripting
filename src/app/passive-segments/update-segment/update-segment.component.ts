import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { SelectItem } from 'src/app/models/select-item.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { PassiveSegmentsModel } from 'src/app/models/pnr/passive-segments.model';
import { PnrService } from 'src/app/service/pnr.service';
import { DDBService } from 'src/app/service/ddb.service';
import { UtilHelper } from 'src/app/helper/util.helper';
import { CounselorDetail } from 'src/app/globals/counselor-identity';
// import { validatePassengerNumbers } from 'src/app/shared/validators/leisure.validators';

declare var smartScriptSession: any;

@Component({
  selector: 'app-update-segment',
  templateUrl: './update-segment.component.html',
  styleUrls: ['./update-segment.component.scss']
})
export class UpdateSegmentComponent implements OnInit {
  title: string;

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
  isCorporate = false;
  segmentList: Array<PassiveSegmentsModel> = [];
  isAddNew: boolean;
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
  pickupCityList = [];
  dropOffAddrList = [];
  dropOffCityList = [];
  commandCache = {
    getHotels: '',
    loadCarSupplier: '',
    loadCarType: '',
    loadDropOffAddr: '',
    loadPickupOffAddr: ''
  };
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
    noNights: new FormControl('', [Validators.required, Validators.pattern('^[0-9][0-9]?$')]),
    roomType: new FormControl('', []),
    mealPlan: new FormControl('', []),
    stateRoom: new FormControl('', []),
    cabinNo: new FormControl('', []),
    dining: new FormControl('', []),
    policyNo: new FormControl('', [Validators.required]),
    airlineCode: new FormControl('', [Validators.required]),
    flightNumber: new FormControl('', [Validators.required]),
    classService: new FormControl('', [Validators.required]),
    airlineRecloc: new FormControl('', []),
    othersText: new FormControl('', [Validators.required]),
    zzairlineCode: new FormControl('', []),
    zzdepartureCity: new FormControl('', []),
    zzdestinationCity: new FormControl('', []),
    seatNumber: new FormControl(''),
    passengerNo: new FormControl('', [Validators.pattern('[0-9]+(,[0-9]+)*')]),
    // train
    trainNumber: new FormControl('', [Validators.required]),
    carNumber: new FormControl(''),
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
    // -- cars
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
    frequentflightNumber: new FormControl(''),
    rateBooked: new FormControl('', [Validators.required]),
    // hotel
    chainCode: new FormControl('', [Validators.required]),
    nightlyRate: new FormControl('', [Validators.required]),
    numberOfRooms: new FormControl('', [Validators.required]),
    guaranteedLate: new FormControl('', [Validators.required]),
    confirmedWith: new FormControl(''),
    hotelCode: new FormControl(''),
    hotelCityName: new FormControl('', [Validators.required]),
    hotelName: new FormControl('', [Validators.required]),
    fax: new FormControl(''),
    address: new FormControl('', [Validators.required]),
    province: new FormControl(''),
    zipCode: new FormControl(''),
    country: new FormControl('', [Validators.required]),
    insuranceType: new FormControl('', [Validators.required])
  });

  constructor(
    public activeModal: BsModalService,
    private pnrService: PnrService,
    public modalRef: BsModalRef,
    private ddbService: DDBService,
    private fb: FormBuilder,
    private util: UtilHelper,
    private counselorDetail: CounselorDetail
  ) {
    this.isCorporate = this.counselorDetail.isCorporate;
    this.passiveSegments = new PassiveSegmentsModel();
    // this.supplierCodeList ;//= this.ddbService.getSupplierCode();
    this.segmentForm = fb.group({
      segmentType: new FormControl('', [Validators.required])
    });

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
    this.mealPlanList = [
      { itemText: '', itemValue: '' },
      { itemText: 'All Inclusive', itemValue: 'ALL INCLUSIVE' },
      { itemText: 'American Plan', itemValue: 'AMERICAN PLAN' }
    ];
  }

  loadRoomType() {
    this.roomTypeList = [
      { itemText: '', itemValue: '' },
      { itemText: 'SGLB', itemValue: 'SGLB' },
      { itemText: 'DBLB', itemValue: 'DBLB' },
      { itemText: 'TRPL', itemValue: 'TRPL' }
    ];
  }

  loadRoomTypeHotel() {
    this.roomTypeList = [
      { itemText: '', itemValue: '' },
      { itemText: 'Single Room', itemValue: 'SINGLE ROOM' },
      { itemText: 'Double Room', itemValue: 'DOUBLE ROOM' },
      { itemText: 'Triple Room', itemValue: 'TRIPLE ROOM' },
      { itemText: 'Quad Room', itemValue: 'QUAD ROOM' },
      { itemText: 'Queen Room', itemValue: 'QUEEN ROOM' },
      { itemText: 'King Room', itemValue: 'KING ROOM' },
      { itemText: 'Twin Room', itemValue: 'TWIN ROOM' },
      { itemText: 'Studio Room', itemValue: 'STUDIO ROOM' }
    ];
  }

  loadArrivalDay() {
    this.arrivaldayList = [
      { itemText: '', itemValue: '' },
      { itemText: '+1', itemValue: '1' },
      { itemText: '+2', itemValue: '2' }
    ];
  }

  loadSegmentType() {
    this.segmentTypeList = [
      { itemText: '', itemValue: '' },
      { itemText: 'Air', itemValue: 'AIR' },
      { itemText: 'Tour', itemValue: 'TOR' },
      { itemText: 'Car', itemValue: 'CAR' },
      { itemText: 'Limo', itemValue: 'LIM' },
      { itemText: 'Hotel', itemValue: 'HTL' },
      { itemText: 'Rail', itemValue: 'TRN' }
    ];
    if (!this.isCorporate) {
      this.segmentTypeList.push({ itemText: 'Insurance', itemValue: 'INS' });
      this.segmentTypeList.push({ itemText: 'Cruise', itemValue: 'SEA' });
    }
  }

  loadStateRoom() {
    this.stateRoomList = [
      { itemText: '', itemValue: '' },
      { itemText: 'Stateroom Guarantee', itemValue: 'STATEROOM GUARANTEE' },
      { itemText: 'Interior', itemValue: 'INTERIOR' },
      { itemText: 'Ocean View', itemValue: 'OCEAN VIEW' },
      {
        itemText: 'Stateroom with Balcony',
        itemValue: 'STATEROOM WITH BALCONY'
      },
      { itemText: 'Suite', itemValue: 'SUITE' }
    ];
  }

  loadDining() {
    this.diningList = [
      { itemText: '', itemValue: '' },
      { itemText: 'Early Dining', itemValue: 'EARLY DINING' },
      { itemText: 'Late Dining', itemValue: 'LATE DINING' },
      { itemText: 'Open Dining', itemValue: 'OPEN DINING' },
      { itemText: 'Waitlist Early', itemValue: 'WAITLIST EARLY' },
      { itemText: 'Waitlist Late', itemValue: 'WAITLIST LATE' }
    ];
  }

  getNoPassengers() {
    this.passengers = this.pnrService.getPassengers();
    const passengerCount = this.passengers.length;
    this.passiveSegments.noPeople = passengerCount.toString();
  }

  setForm(forms) {
    this.segmentForm = this.fb.group({}, { updateOn: 'blur' });

    forms.forEach((x) => {
      if (this.formControls.get(x) !== null) {
        this.segmentForm.addControl(x, this.formControls.get(x));
      } else {
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
    const destination = this.formControls.get('destinationCity');
    this.formControls.get('passengerNo').updateValueAndValidity();

    if (destination !== undefined && destination !== null) {
      destination.clearValidators();
      destination.setValidators([Validators.required]);
    }
    let forms = [];
    switch (type) {
      case 'AIR':
        this.selectedTmpl = this.airTmpl;
        forms = [
          'segmentType',
          'airlineCode',
          'flightNumber',
          'classService',
          'departureDate',
          'departureTime',
          'departureCity',
          'destinationCity',
          'airlineRecloc',
          'arrivalDate',
          'arrivalTime',
          'noPeople',
          'zzairlineCode',
          'zzdepartureCity',
          'zzdestinationCity'
        ];
        this.setForm(forms);

        break;
      case 'TOR':
        this.lblvendorName = 'Vendor Name';
        this.lblvendorCode = 'Vendor Code';
        this.lbldepartureCity = 'Departure City Code';
        this.lbldestinationCity = 'Destination City Code';
        this.lblarrivalDate = 'End Date';
        this.lblarrivalTime = 'End Time';
        this.lbltourName = 'Tour Name or Hotel Name';
        this.lblnoPeople = 'Number of People';
        this.lblnoNights = 'Number of Nights';

        forms = [
          'segmentType',
          'vendorName',
          'vendorCode',
          'confirmationNo',
          'departureDate',
          'departureTime',
          'departureCity',
          'destinationCity',
          'arrivalDate',
          'arrivalTime',
          'tourName',
          'noPeople',
          'noNights',
          'roomType',
          'mealPlan',
          'passengerNo'
        ];
        this.setForm(forms);
        this.loadRoomType();
        this.filterSupplierCodeList = this.ddbService.getSupplierCodes('TOUR');
        this.selectedTmpl = this.tourTmpl;
        if (this.passengers.length > 1) {
          this.formControls.controls.passengerNo.setValidators(Validators.required);
          this.formControls.get('passengerNo').updateValueAndValidity();
        }
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

        forms = [
          'segmentType',
          'vendorName',
          'vendorCode',
          'confirmationNo',
          'departureDate',
          'departureTime',
          'departureCity',
          'destinationCity',
          'arrivalDate',
          'arrivalTime',
          'tourName',
          'noPeople',
          'stateRoom',
          'cabinNo',
          'dining',
          'noNights',
          'passengerNo'
        ];
        this.setForm(forms);
        this.selectedTmpl = this.cruiseTmpl;
        this.filterSupplierCodeList = this.ddbService.getSupplierCodes('SEA');
        if (this.passengers.length > 1) {
          this.formControls.controls.passengerNo.setValidators(Validators.required);
          this.formControls.get('passengerNo').updateValueAndValidity();
        }
        break;

      case 'INS':
        this.lbldepartureCity = 'Departure City';
        this.lblarrivalDate = 'Return Date';
        this.lblnoPeople = 'Number of Passengers';
        forms = ['segmentType', 'policyNo', 'departureDate', 'departureCity', 'arrivalDate', 'noPeople', 'insuranceType'];
        this.setForm(forms);
        this.selectedTmpl = this.insuranceTmpl;
        break;
      case 'TRN':
        this.lblvendorName = 'Supplier Name';
        this.lblvendorCode = 'Supplier Code';
        forms = [
          'segmentType',
          'classService',
          'seatNumber',
          'trainNumber',
          'carNumber',
          'vendorName',
          'vendorCode',
          'confirmationNo',
          'departureDate',
          'departureTime',
          'departureCity',
          'arrivalStation',
          'fromStation',
          'arrivalDate',
          'arrivalTime',
          'noPeople'
        ];
        this.setForm(forms);
        this.selectedTmpl = this.railTmpl;
        this.filterSupplierCodeList = this.ddbService.getSupplierCodes('RAIL');
        break;
      case 'LIM':
        this.lblvendorName = 'Limo Company';
        this.lblvendorCode = 'Limo Supplier Code';
        forms = [
          'segmentType',
          'vendorName',
          'vendorCode',
          'confirmationNo',
          'rate',
          'rateType',
          'taxOnRate',
          'toll',
          'gratuities',
          'departureDate',
          'departureTime',
          'departureCity',
          'parking',
          'limoCoAgent',
          'meetDriveAt',
          'phone',
          'additionalInfo',
          'cancellationInfo',
          'noPeople',
          'pickupLoc',
          'transferTo',
          'includeTax',
          'includeToll',
          'includeParking',
          'includeGratuities'
        ];
        if (this.isAddNew) {
          this.passiveSegments.pickupLoc = 'HOME';
        }
        this.setForm(forms);
        this.selectedTmpl = this.limoTmpl;
        this.filterSupplierCodeList = this.ddbService.getSupplierCodes('CAR');
        break;
      case 'CAR':
        this.lbldepartureDate = 'Pickup Date';
        this.lbldepartureTime = 'Pickup Time';
        this.lblarrivalDate = 'Return Date';
        this.lblarrivalTime = 'Return Time';
        this.lblvendorName = 'Car Vendor Name';
        this.lblvendorCode = 'Car Vendor Code';
        this.lbldepartureCity = 'Pickup City';
        this.lbldestinationCity = 'Drop Off City';

        forms = [
          'segmentType',
          'vendorName',
          'vendorCode',
          'confirmationNo',
          'rentalCost',
          'currency',
          'carType',
          'departureDate',
          'departureTime',
          'departureCity',
          'duration',
          'mileage',
          'mileagePer',
          'dropOffFee',
          'dropOffAddress',
          'pickupLoc',
          'dropOffLoc',
          'cdNumber',
          'idNumber',
          'pickupOffAddress',
          'frequentflightNumber',
          'frequentFlierNumber',
          'specialEquipment',
          'specialRequest',
          'destinationCity',
          'arrivalTime',
          'arrivalDate',
          'rateBooked'
        ];
        this.setForm(forms);
        this.segmentForm.get('destinationCity').clearValidators();
        this.selectedTmpl = this.carTmpl;
        this.pickupCityList = [];
        this.segmentList.forEach((s) => {
          if (!this.pickupCityList.find((x) => x.endpoint === s.destinationCity)) {
            if (s.destinationCity !== undefined) {
              this.pickupCityList.push({ endpoint: s.destinationCity });
            }
          }
        });

        if (this.passiveSegments.pickupLoc !== 'AIRPORT' && this.passiveSegments.pickupLoc !== 'OFF AIRPORT') {
          this.passiveSegments.pickupLoc = 'AIRPORT';
        }

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
        forms = [
          'segmentType',
          'confirmationNo',
          'departureCity',
          'departureDate',
          'arrivalDate',
          'policyNo',
          'currency',
          'chainCode',
          'nightlyRate',
          'numberOfRooms',
          'guaranteedLate',
          'confirmedWith',
          'hotelCode',
          'hotelCityName',
          'rateType',
          'hotelName',
          'fax',
          'phone',
          'address',
          'province',
          'zipCode',
          'country',
          'roomType',
          'additionalInfo'
        ];
        this.loadRoomTypeHotel();
        this.stateProvinceList = this.ddbService.getStateProvinces();
        this.getHotels();
        this.setForm(forms);
        this.selectedTmpl = this.hotelTmpl;
        this.passengers = this.pnrService.getPassengers();
        const passengerCount = this.passengers.length;
        this.segmentForm.controls.numberOfRooms.clearValidators();
        this.segmentForm.get('numberOfRooms').setValidators(Validators.max(passengerCount));
        this.segmentForm.get('numberOfRooms').updateValueAndValidity();
        break;
      default:
        break;
    }

    this.segmentForm.get('segmentType').setValue(type);
    this.util.validateAllFields(this.segmentForm);
  }

  includeOnRate(name, checked) {
    switch (name) {
      case 'includeTax':
        this.enableFormControls(['taxOnRate'], checked);
        break;
      case 'includeToll':
        this.enableFormControls(['toll'], checked);
        break;
      case 'includeGratuities':
        this.enableFormControls(['gratuities'], checked);
        break;
      case 'includeParking':
        this.enableFormControls(['parking'], checked);
        break;
    }
  }

  pickUpLocChange() {}

  getHotels() {
    const chainCode = this.passiveSegments.chainCode;
    const cityCode = this.passiveSegments.departureCity;
    if (chainCode !== undefined && chainCode.length === 2 && cityCode !== undefined && cityCode.length === 3) {
      this.hotelList = [];
      const command = 'HL' + chainCode + cityCode + '/AR-ALL';
      if (this.commandCache.getHotels === command) {
        return;
      }

      smartScriptSession.send(command).then(async (res) => {
        this.commandCache.getHotels = command;
        let lines = res.Response.split('\r\n');
        const regex = /^(?<code>[A-Z]{2}) ([A-Z])(\s{1,2})([A-Z])(\s{2,3})([A-Z]{3})(\s{2})(?<text>.*)/g;
        lines = await this.getMDResult(lines);
        lines.forEach((r) => {
          const match = regex.exec(r);
          if (match && match.groups) {
            this.hotelList.push({
              itemValue: match.groups.code,
              itemText: match.groups.text
            });
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
    this.passiveSegments.hotelCityName = '';
    this.passiveSegments.zipCode = '';
    this.passiveSegments.address = '';
    this.passiveSegments.country = '';
    this.passiveSegments.phone = '';
    this.passiveSegments.fax = '';
    this.passiveSegments.province = '';
    smartScriptSession.send('HF' + hotelCode).then(async (res) => {
      const lines = res.Response.split('\r\n');
      let indx = 0;
      let telIndx = 0;
      lines.forEach((r) => {
        if (r.trim().indexOf('-TEL') === 0) {
          telIndx = indx;
          this.passiveSegments.phone = r
            .trim()
            .split(':')[1]
            .replace('-TLX', '')
            .trim();
        } else if (r.trim().indexOf('-FAX') === 0) {
          this.passiveSegments.fax = r
            .trim()
            .split(':')[1]
            .trim();
        }
        indx++;
      });
      indx = 0;
      indx = telIndx > 5 ? 1 : 0;

      this.passiveSegments.address = lines[2 + indx].trim();
      this.passiveSegments.country = lines[4 + indx].trim();
      const addr = lines[3 + indx].trim().split(/\s\s/g);
      this.passiveSegments.hotelCityName = addr[0];
      this.passiveSegments.zipCode = addr[addr.length - 1];
      if (addr.length >= 3) {
        this.passiveSegments.province = addr[1].trim();
        this.segmentForm.get('province').setValue(addr[1].trim());
      }
    });
  }

  enableFormControls(controls: string[], disabled: boolean) {
    controls.forEach((c) => {
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
    let depdate = new Date(this.passiveSegments.departureDate);
    let arrDate = new Date(this.passiveSegments.arrivalDate);

    if (tempname === 'departureDate') {
      depdate = tempdate2;
      if (this.passiveSegments.segmentType === 'CAR' || this.passiveSegments.segmentType === 'TRN') {
        this.passiveSegments.arrivalDate = tempdate;
      }
    }

    if (tempname === 'arrivalDate') {
      arrDate = tempdate2;
    }

    if (this.passiveSegments.departureDate === this.passiveSegments.arrivalDate) {
      if (this.passiveSegments.segmentType === 'TOR') {
        this.passiveSegments.noNights = '0';
      }
    }

    if (tempdate2 < now) {
      this.segmentForm.get(tempname).setErrors({ incorrect: true });
    } else {
      if (depdate && arrDate) {
        if (depdate > arrDate) {
          this.segmentForm.get(tempname).setErrors({ incorrect: true });
          return;
        }
        const diff = arrDate.getTime() - depdate.getTime();
        const night = Math.ceil(diff / (1000 * 3600 * 24));
        this.passiveSegments.noNights = night.toString();
      }
      this.segmentForm.get(tempname).setErrors(null);
      // this.getNoPassengers();
    }
  }

  onChangezz(controlValue, controlName) {
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
      // this.loadCarType();
    }
  }

  pickupCityOnBlur() {
    if (this.segmentForm.get('segmentType').value === 'CAR') {
      this.loadCarSupplier();
      if (this.passiveSegments.pickupLoc === 'AIRPORT') {
        this.defaultTravelDateTime();
      }
    }
  }

  defaultTravelDateTime() {
    const airs = this.segmentList.filter((x) => x.segmentType === 'AIR');
    let air = airs.find((x) => x.destinationCity === this.passiveSegments.departureCity);
    if (air) {
      this.passiveSegments.departureDate = this.convertDateFormat(air.arrivalDate);
      this.passiveSegments.departureTime = this.convert24to12Hr(air.arrivalTime);
      this.passiveSegments.arrivalDate = this.passiveSegments.departureDate;
      const indx = airs.indexOf(air);
      if (indx < airs.length - 1) {
        air = airs[indx + 1];
        this.passiveSegments.arrivalDate = this.convertDateFormat(air.departureDate);
        this.passiveSegments.arrivalTime = this.convert24to12Hr(air.departureTime);
      }
    }
  }

  padLeft(text, padChar: string, size: number): string {
    return (String(padChar).repeat(size) + text).substr(size * -1, size);
  }

  convertDateFormat(date) {
    date = date.toUpperCase();
    if (date.match(/([0-9]{2}[A-Z]{3})/g)) {
      const m = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      const day = date.substr(0, 2);
      const month = m.indexOf(date.substr(2, 3)) + 1;
      const dtNow = new Date();
      let thisYr = dtNow.getFullYear().toString();
      const cdate = new Date(thisYr + '-' + month + '-' + day);
      if (cdate < dtNow) {
        thisYr = (dtNow.getFullYear() + 1).toString();
      }
      return thisYr + '-' + this.padLeft(month, '0', 2) + '-' + this.padLeft(day, '0', 2);
    }
    return date;
  }

  convert24to12Hr(time): any {
    if (time.match(/([0-9]{4})/g)) {
      const hr = time.substr(0, 2);
      const min = time.substr(2, 2);
      return hr + ':' + min;
    }
    return time;
  }

  dropOffCityOnBlur() {
    if (this.segmentForm.get('segmentType').value === 'CAR') {
      this.loadDropOffAddr(this.passiveSegments.dropOffLoc);
    }
  }

  vendorCodeChange(value) {
    if (this.segmentForm.get('segmentType').value === 'CAR') {
      this.loadCarType();
    }
    const sup = this.filterSupplierCodeList.find((x) => x.supplierCode === value);
    if (sup) {
      this.passiveSegments.vendorName = sup.supplierName;
    }
  }

  loadCarSupplier() {
    const city = this.segmentForm.get('departureCity').value;
    if (city === undefined || city.length < 3) {
      return;
    }
    const command = 'CL' + city + '-T';
    if (this.commandCache.loadCarSupplier === command) {
      return;
    }
    this.filterSupplierCodeList = [];
    // const response =
    smartScriptSession.send(command).then(async (res) => {
      this.commandCache.loadCarSupplier = command;
      let lines = res.Response.split('\r\n');

      const regex = /(?<code>([A-Z]{2}))\+(?<text>.+?(?=\s{2}))/g;
      lines = await this.getMDResult(lines);
      lines.forEach((x) => {
        const match = regex.exec(x);
        if (match && match.groups) {
          const obj = this.filterSupplierCodeList.find((z) => z.supplierCode === match.groups.code);
          if (obj === undefined) {
            this.filterSupplierCodeList.push({
              supplierCode: match.groups.code,
              supplierName: match.groups.text
            });
          }
        }
        regex.lastIndex = 0;
      });
    });
  }

  async getMDResult(lines) {
    if (lines[lines.length - 2].indexOf('MORE') === 0) {
      let stop = false;
      while (!stop) {
        await smartScriptSession.send('MD').then((x) => {
          const list = x.Response.split('\r\n');
          lines = lines.concat(list);
          if (list.length < 4 || x.Response.indexOf('NO MORE ITEMS') >= 0 || x.Response.indexOf('END OF DISPLAY')) {
            stop = true;
          }
        });
      }
    }
    return lines;
  }

  loadPickupOffAddr(val) {
    if (val === 'OFF AIRPORT') {
      this.clearTravelDateTime();
      const city = this.passiveSegments.departureCity;
      if (city.length < 3) {
        return;
      }
      const vendor = this.passiveSegments.vendorCode;
      const command = 'CL' + vendor + city;
      this.segmentForm.get('pickupOffAddress').enable();
      if (this.commandCache.loadPickupOffAddr === command || vendor === undefined) {
        return;
      }
      this.pickupOffAddrList = [];
      this.getOffAddress(this.pickupOffAddrList, command);
      this.commandCache.loadPickupOffAddr = command;
    } else {
      this.segmentForm.get('pickupOffAddress').disable();
      this.defaultTravelDateTime();
      if (this.passiveSegments.dropOffLoc === 'OFF AIRPORT') {
        this.passiveSegments.arrivalDate = '';
        this.passiveSegments.arrivalTime = '';
      }
    }
  }

  clearTravelDateTime() {
    this.passiveSegments.departureDate = '';
    this.passiveSegments.departureTime = '';
  }

  loadDropOffAddr(val) {
    if (val === 'OFF AIRPORT') {
      this.passiveSegments.arrivalDate = '';
      this.passiveSegments.arrivalTime = '';
      const city = this.passiveSegments.destinationCity;
      if (city.length < 3) {
        return;
      }
      this.segmentForm.get('dropOffAddress').enable();
      const vendor = this.passiveSegments.vendorCode;
      const command = 'CL' + vendor + city;
      if (this.commandCache.loadDropOffAddr === command || vendor === undefined) {
        return;
      }
      this.dropOffAddrList = [];
      this.getOffAddress(this.dropOffAddrList, command);
      this.commandCache.loadDropOffAddr = command;
    } else {
      this.segmentForm.get('dropOffAddress').disable();
      this.defaultTravelDateTime();
      if (this.passiveSegments.pickupLoc === 'OFF AIRPORT') {
        this.passiveSegments.departureDate = '';
        this.passiveSegments.departureTime = '';
      }
    }
  }

  getOffAddress(addrList, command) {
    // const response =
    smartScriptSession.send(command).then(async (res) => {
      let lines = res.Response.split('\r\n');
      const regex = /(?<code>[A-Z]{4}[0-9]{2}) (?<text>.+?(?=\s{2}))/g;
      lines = await this.getMDResult(lines);
      lines.forEach((x) => {
        const match = regex.exec(x);
        if (match && match.groups) {
          const obj = addrList.find((z) => z.itemValue === match.groups.code);
          if (obj === undefined) {
            addrList.push({
              itemValue: match.groups.code,
              itemText: match.groups.text
            });
          }
          regex.lastIndex = 0;
        }
      });
    });
  }

  loadCarType() {
    const city = this.passiveSegments.departureCity;
    if (city.length < 3) {
      return;
    }
    const vendor = this.passiveSegments.vendorCode;
    const command = 'CPO' + vendor + city + '/VEH';
    if (this.commandCache.loadCarType === command || vendor === undefined) {
      return true;
    }
    this.carTypeList = [];
    // const response =
    smartScriptSession.send(command).then(async (res) => {
      this.commandCache.loadCarType = command;
      let lines = res.Response.split('\r\n');
      lines = await this.getMDResult(lines);
      const regex = /\*\s(?<code>[A-Z]{4}) ([A-Z]{1}|\s) (?<text>.+?(?=\s{2}))/g;
      lines.forEach((x) => {
        const match = regex.exec(x);
        if (match && match.groups) {
          if (match.groups.text.trim() !== '') {
            const obj = this.carTypeList.find((z) => z.itemValue === match.groups.code);

            if (obj === undefined) {
              this.carTypeList.push({
                itemValue: match.groups.code,
                itemText: match.groups.text
              });
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

  filterStateProvince() {
    // if (country) {
    //   switch (country.toUpperCase()) {
    //     case 'US':
    //     case 'UNITED STA':
    //       this.stateProvinceList = this.ddbService.getStateProvinces('US');
    //       break;
    //     case 'CA':
    //     case 'CANADA's:
    //       this.stateProvinceList = this.ddbService.getStateProvinces('CA');
    //       break;
    //     default:
    //       this.stateProvinceList = this.ddbService.getStateProvinces();
    //       break;
    //   }
    // }
  }
}
