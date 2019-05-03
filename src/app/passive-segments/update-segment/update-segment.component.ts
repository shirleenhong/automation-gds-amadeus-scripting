import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { SelectItem } from 'src/app/models/select-item.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { PassiveSegmentsModel } from 'src/app/models/pnr/passive-segments.model';
import { PnrService } from 'src/app/service/pnr.service';
import { DDBService } from 'src/app/service/ddb.service';
import { DeprecatedDatePipe, getLocaleExtraDayPeriodRules } from '@angular/common';
declare var smartScriptSession: any;

@Component({
  selector: 'app-update-segment',
  templateUrl: './update-segment.component.html',
  styleUrls: ['./update-segment.component.scss']
})
export class UpdateSegmentComponent implements OnInit {

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
  segmentForm: FormGroup;
  isSubmitted: boolean;
  supplierCodeList: Array<any>;
  carTypeList: Array<any>;
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
    trainNumber: new FormControl('', [Validators.required]),
    carNumber: new FormControl('', [Validators.required]),
    arrivalStation: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    rate: new FormControl('', [Validators.required]),
    rateType: new FormControl('', [Validators.required]),
    taxOnRate: new FormControl('', [Validators.required]),
    toll: new FormControl('', [Validators.required]),
    gratuities: new FormControl('', [Validators.required]),
    parking: new FormControl('', [Validators.required]),
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
    carType: new FormControl('', [Validators.required]),
    dropOffLoc: new FormControl('', [Validators.required]),
    pickupOffAdress: new FormControl('', [Validators.required]),
    dropOffAdress: new FormControl('', [Validators.required]),
    rentalCost: new FormControl('', [Validators.required]),
    currency: new FormControl('', [Validators.required]),
    duration: new FormControl('', [Validators.required]),
    mileage: new FormControl('', [Validators.required]),
    mileagePer: new FormControl('', [Validators.required]),
    dropOffFee: new FormControl('', [Validators.required]),
    cdNumber: new FormControl('', [Validators.required]),
    idNumber: new FormControl('', [Validators.required]),
    frequentFlierNumber: new FormControl('', [Validators.required]),
    specialEquipment: new FormControl('', [Validators.required]),
    specialRequest: new FormControl('', [Validators.required])
  });


  constructor(public activeModal: BsModalService,
    private pnrService: PnrService,
    private modalRef: BsModalRef,
    private ddbService: DDBService,
    private fb: FormBuilder) {
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
  }

  ngOnInit() {
    this.changeControlLabel(this.passiveSegments.segmentType);
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
    { itemText: 'Hotel', itemValue: 'HOT' },
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
      this.segmentForm.addControl(x, this.formControls.get(x));
    });

  }

  changeControlLabel(type) {
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
          'departureDate', 'departureTime', 'departureCity', 'duration', 'mileage', 'mileagePer', 'dropOffFee',
          'additionalInfo', 'cancellationInfo', 'noPeople', 'pickupLoc', 'dropOffLoc', 'cdNumber', 'idNumber',
          'frequentFlierNumber', 'specialEquipment', 'specialRequest', 'destinationCity', 'arrivalTime', 'arrivalDate'];
        this.setForm(forms);
        this.selectedTmpl = this.carTmpl;
        break;
      default:
        break;
    }
    this.segmentForm.get('segmentType').setValue(type);
  }

  includeOnRate(name, checked) {
    switch (name) {
      case 'includeTax':
        this.enableFormControls(['taxOnRate'], !checked);
        break;
      case 'includeToll':
        this.enableFormControls(['toll'], !checked);
        break;
      case 'includeGratuities':
        this.enableFormControls(['gratuities'], !checked);
        break;
      case 'includeParking':
        this.enableFormControls(['parking'], !checked);
        break;

    }
  }

  pickUpLocChange() {

  }


  enableFormControls(controls: string[], disabled: boolean) {
    controls.forEach(c => {
      if (this.segmentForm.get(c) !== null) {
        if (disabled) {
          this.segmentForm.get(c).disable();
          this.segmentForm.get(c).setValue('');
        } else {
          this.segmentForm.get(c).enable();
          // this.segmentForm.get(c).setValidators(Validators.required);
          // this.segmentForm.get(c).updateValueAndValidity();
        }
      }
    });

  }


  onChangeSegmentType(type) {
    this.changeControlLabel(type);
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
      this.loadCarType();

    }
  }


  loadCarType() {
    debugger;
    const response = smartScriptSession.send('CPOZEYYZ/VEH').then(res => {
      debugger;


    });

    if (response) {

    }
  }

  onChangeStateRoom(type) {
    if (type === 'OTHER') {
      this.segmentForm.controls.othersText.enable();
      this.segmentForm.controls.othersText.setValidators(Validators.required);
      this.segmentForm.controls.othersText.updateValueAndValidity();
    }
  }
}
