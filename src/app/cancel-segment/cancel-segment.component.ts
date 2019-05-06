import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { SelectItem } from '../models/select-item.model';
import { PnrService } from '../service/pnr.service';
import { validateSegmentNumbers, validatePassengerNumbers } from '../shared/validators/leisure.validators';
import { UtilHelper } from '../helper/util.helper';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cancel-segment',
  templateUrl: './cancel-segment.component.html',
  styleUrls: ['./cancel-segment.component.scss']
})

export class CancelSegmentComponent implements OnInit {
  cancelForm: FormGroup;
  reasonAcList: Array<SelectItem>;
  reasonUaList: Array<SelectItem>;
  segments = [];
  isAC: boolean = false;
  isUA: boolean = false;
  isACNonRef: boolean = false;
  isUANonRef: boolean = false;
  passengers = [];
  codeShareGroup: FormGroup;
  remove: boolean = false;
  add: boolean = true;

  // segmentDetails: any;


  constructor(private formBuilder: FormBuilder, private pnrService: PnrService, private utilHelper: UtilHelper) {
    this.cancelForm = new FormGroup({
      segments: new FormArray([]),
      requestor: new FormControl('', [Validators.required]),
      desc1: new FormControl('', [Validators.required]),
      desc2: new FormControl('', []),
      reasonACCancel: new FormControl('', []),
      reasonUACancel: new FormControl('', []),
      tickets: new FormArray([this.createFormGroup()]),
      airlineNo: new FormControl('', []),
      acTicketNo: new FormControl('', []),
      acFlightNo: new FormControl('', []),
      accityPair: new FormControl('', []),
      acdepDate: new FormControl('', []),
      relationship: new FormControl('', []),
      uasegNo: new FormControl('', [Validators.pattern('[0-9]+(,[0-9]+)*'),
      validateSegmentNumbers(this.segments)]),
      uaPassengerNo: new FormControl('', [Validators.pattern('[0-9]+(,[0-9]+)*'),
      validatePassengerNumbers(this.passengers)]),
      acpassengerNo: new FormControl('', []),
      cancelNonRefAC: new FormControl('', []),
      cancelNonRefUA: new FormControl('', [])
    });

  }

  private addCheckboxes() {
    this.segments.map((o, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      (this.cancelForm.controls.segments as FormArray).push(control);
    });
  }

  checkValid() {
    this.utilHelper.validateAllFields(this.cancelForm);
    if (!this.cancelForm.valid) {
      return false;
    }
    return true;
  }

  ngOnInit() {
    // this.codeShareGroup = this.formBuilder.group({
    //   tickets: this.formBuilder.array([this.createFormGroup()])
    // });
    this.loadStaticValue();
    this.getSegmentTatooValue();
    this.addCheckboxes();
    this.checkFirstSegment();
    this.getPassengers();
  }

  loadStaticValue() {
    this.reasonAcList = [{ itemText: '', itemValue: '' },
    { itemText: 'NAME CORRECTION NCC WITH OAL', itemValue: '1' },
    { itemText: 'NAME CORRECTION NCC LEGAL NAME WITH OAL', itemValue: '2' },
    { itemText: 'DUPLICATE TICKETS', itemValue: '3' },
    { itemText: '24 HOURS REFUND', itemValue: '4' },
    { itemText: 'DEATH/IMMINENT DEATH', itemValue: '5' },
    { itemText: 'IRROP: WILL REFUND PROCESS DUE IRROP', itemValue: '6' },
    { itemText: 'VOLUNTARY CANCEL. WILL KEEP AS CREDIT OR WILL VOID THE TICKET', itemValue: '7' },
    { itemText: 'AC FLIGHT NOT TICKETED YET', itemValue: '8' }];

    this.reasonUaList = [{ itemText: '', itemValue: '' },
    { itemText: '24 HOURS REFUND', itemValue: '1' },
    { itemText: 'VOLUNTARY CANCEL. WILL KEEP AS CREDIT OR WILL VOID THE TICKET', itemValue: '2' },
    { itemText: 'UA FLIGHT NOT TICKETED YET', itemValue: '3' }];
  }

  get f() { return this.cancelForm.controls; }

  getSegmentTatooValue() {
    const segmentDetails = this.pnrService.getSegmentTatooNumber();
    segmentDetails.forEach(element => {
      if (segmentDetails.length > 0) {
        const details = {
          id: element.lineNo,
          name: element.longFreeText,
          status: element.status,
          segmentType: element.segmentType,
          airlineCode: element.airlineCode,
          flightNumber: element.flightNumber,
          departureDate: element.departureDate,
          cityCode: element.cityCode,
          arrivalAirport: element.arrivalAirport
        };
        this.segments.push(details);
      }
    });
    // return segments;
  }

  getPassengers() {
    this.passengers = this.pnrService.getPassengers();
  }

  submit() {
    // Filter out the unselected ids
    // tslint:disable-next-line:prefer-const
    let checkSegment = [];
    const selectedPreferences = this.cancelForm.value.segments
      .map((checked, index) => checked ? this.segments[index].id : null)
      .filter(value => value !== null);
    selectedPreferences.forEach(element => {
      // tslint:disable-next-line:prefer-const

      const look = this.segments.find(x => x.id === element);
      if (look) {
        let textLine = {
          lineNo: look.id,
          segmentType: look.segmentType,
        };
        checkSegment.push(textLine);
      }
    });
    return checkSegment;
  }

  checkSegmentAirline() {
    this.isAC = false;
    this.isUA = false;
    // this.cancelForm.controls['cancelNonRefAC'].setValue(false);
    this.enableFormControls(['acTicketNo', 'acpassengerNo', 'acFlightNo', 'accityPair', 'acdepDate', 'relationship'], true);
    this.enableFormControls(['reasonUACancel', 'uasegNo', 'uaPassengerNo'], true);

    const selectedPreferences = this.cancelForm.value.segments
      .map((checked, index) => checked ? this.segments[index].id : null)
      .filter(value => value !== null);
    selectedPreferences.forEach(element => {
      const look = this.segments.find(x => x.id === element);
      if (look) {
        if (look.airlineCode === 'AC') {
          if (this.cancelForm.value.reasonACCancel === '' || this.cancelForm.value.reasonACCancel === undefined) {
            this.cancelForm.controls['acTicketNo'].setValue('');
            this.cancelForm.controls['acpassengerNo'].setValue('');
            this.cancelForm.controls['acFlightNo'].setValue('');
            this.cancelForm.controls['accityPair'].setValue('');
            this.cancelForm.controls['acdepDate'].setValue('');
            this.cancelForm.controls['relationship'].setValue('');
          } else {
            this.acChange(this.cancelForm.value.reasonACCancel);
          }
          this.isAC = true;
        }
        if (look.airlineCode === 'UA') {
          this.enableFormControls(['reasonUACancel'], false);
          if (this.cancelForm.value.reasonUACancel === '' || this.cancelForm.value.reasonUACancel === undefined) {
            // this.cancelForm.controls['reasonUACancel'].setValue('');
            this.cancelForm.controls['uasegNo'].setValue('');
            this.cancelForm.controls['uaPassengerNo'].setValue('');
          } else {
            this.uaChange(this.cancelForm.value.reasonUACancel);
          }
          this.defaultSegment();
          this.isUA = true;
        }
      }
    });
  }

  checkFirstSegment() {
    this.enableFormControls(['acTicketNo', 'acpassengerNo', 'acFlightNo', 'accityPair', 'acdepDate', 'relationship'], true);
    this.enableFormControls(['reasonUACancel', 'uasegNo', 'uaPassengerNo'], true);
    if (this.segments.length > 0 && this.segments[0].segmentType) {
      if (this.segments[0].airlineCode === 'AC') {
        this.isAC = true;
      }
      if (this.segments[0].airlineCode === 'UA') {
        this.isUA = true;
        this.enableFormControls(['reasonUACancel'], false);
      }
    }
    this.remove = false;
    this.add = true;
  }

  // defaultPassenger(airline) {
  //   let passenger = this.pnrService.getPassengers();
  //   if (passenger.length === 1) {
  //     if (airline === 'AC') {
  //       this.cancelForm.controls['acpassengerNo'].setValue('1');
  //     }

  //     if (airline === 'UA') {
  //       this.cancelForm.controls['uaPassengerNo'].setValue('1');
  //     }

  //   }
  // }

  acChange(newValue) {
    switch (newValue) {
      case '1':
      case '2':
      case '3':
        this.enableFormControls(['acTicketNo', 'acpassengerNo'], false);
        this.enableFormControls(['acFlightNo', 'accityPair', 'acdepDate', 'relationship'], true);
        break;
      case '4':
        this.enableFormControls(['acTicketNo', 'acpassengerNo', 'acFlightNo', 'accityPair', 'acdepDate', 'relationship'], true);
        break;
      case '5':
        this.enableFormControls(['acFlightNo', 'accityPair', 'acdepDate', 'relationship', 'acpassengerNo'], false);
        this.enableFormControls(['acTicketNo'], true);
        break;
      case '6':
        this.enableFormControls(['acFlightNo', 'accityPair', 'acdepDate', 'acpassengerNo'], false);
        this.enableFormControls(['acTicketNo', 'relationship'], true);
        break;
      default:
        this.enableFormControls(['acTicketNo', 'acpassengerNo', 'acFlightNo', 'accityPair', 'acdepDate', 'relationship'], true);
        break;
    }
    this.defaultControls(newValue);
  }

  defaultControls(acControl) {
    let acCount = 0;
    let controlsArr = [];
    let pass = this.getPassengerNo();

    const selectedPreferences = this.cancelForm.value.segments
      .map((checked, index) => checked ? this.segments[index].id : null)
      .filter(value => value !== null);
    selectedPreferences.forEach(element => {
      const look = this.segments.find(x => x.id === element);
      if (look) {
        if (look.airlineCode === 'AC') {
          acCount = acCount + 1;
          const yr = new Date().getFullYear();
          const year = Math.floor(yr / 100);
          const acdate = year.toString() + look.departureDate.substr(4, 2) + '-'
            + look.departureDate.substr(2, 2) + '-' + look.departureDate.substr(0, 2);
          controlsArr = [{ control: 'acFlightNo', controlvalue: look.flightNumber },
          { control: 'accityPair', controlvalue: look.cityCode + look.arrivalAirport },
          { control: 'acdepDate', controlvalue: acdate },
          { control: 'acpassengerNo', controlvalue: pass }];
        }
      }
    });

    if (acCount === 1) {
      switch (acControl) {
        case '1':
        case '2':
        case '3':
          controlsArr = [{ control: 'acpassengerNo', controlvalue: pass }];
          break;
        case '5':
        case '6':
          break;
        default:
          controlsArr = [];
          break;
      }
    }
    else {
      controlsArr = [{ control: 'acpassengerNo', controlvalue: pass }];
    }
    this.initializeControl(controlsArr);
  }

  private getPassengerNo() {
    let passenger = this.pnrService.getPassengers();
    let pass = '';
    if (passenger.length === 1) {
      pass = '1';
    }
    return pass;
  }

  initializeControl(controls: any) {
    const acControls = ['acTicketNo', 'acpassengerNo', 'acFlightNo', 'accityPair', 'acdepDate', 'relationship'];
    acControls.forEach(ac => {
      this.cancelForm.get(ac).setValue('');
    });
    controls.forEach(c => {
      this.cancelForm.get(c.control).setValue(c.controlvalue);
    });
  }

  defaultSegment() {
    let ua = '';
    const selectedPreferences = this.cancelForm.value.segments
      .map((checked, index) => checked ? this.segments[index].id : null)
      .filter(value => value !== null);
    selectedPreferences.forEach(element => {
      const look = this.segments.find(x => x.id === element);
      if (look) {
        if (look.airlineCode === 'UA') {
          ua = ua + ',' + look.id;
        }
      }
    });

    this.cancelForm.controls['uasegNo'].setValue(ua.substr(1));
  }

  uaChange(newValue) {

    switch (newValue) {
      case '1':
        this.enableFormControls(['uasegNo', 'uaPassengerNo'], false);
        this.defaultSegment();
        this.cancelForm.controls['uaPassengerNo'].setValue(this.getPassengerNo());
        break;
      default:
        this.enableFormControls(['uasegNo', 'uaPassengerNo'], true);
        break;
    }
  }

  ticketCouponchange(name) {
    name = name.substr(-1);
    switch (name) {
      case '1':
        this.enableFormControls(['coupon1'], false);
        break;
      case '2':
        this.enableFormControls(['coupon2'], false);
        break;
      case '3':
        this.enableFormControls(['coupon3'], false);
        break;
      case '4':
        this.enableFormControls(['coupon4'], false);
        break;
      case '5':
        this.enableFormControls(['coupon5'], false);
        break;
      case '6':
        this.enableFormControls(['coupon6'], false);
        break;
      default:
        break;
    }
  }


  enableFormControls(controls: string[], disabled: boolean) {
    controls.forEach(c => {
      if (disabled) {
        this.cancelForm.get(c).disable();
      } else {
        this.cancelForm.get(c).enable();
        this.cancelForm.get(c).setValidators(Validators.required);
        this.cancelForm.get(c).updateValueAndValidity();
      }
    });
  }

  changeNonRefAC() {
    if (this.cancelForm.controls['cancelNonRefAC'].value) {
      this.isACNonRef = true;
      this.enableFormControls(['reasonACCancel'], false);
      this.acChange(this.cancelForm.value.reasonACCancel);
    } else {
      this.isACNonRef = false;
      this.enableFormControls(['acTicketNo', 'acpassengerNo', 'acFlightNo', 'accityPair',
        'acdepDate', 'relationship', 'reasonACCancel'], true);
    }
  }

  createFormGroup(defaultValue?: any): FormGroup {
    const group = this.formBuilder.group({
      ticket: new FormControl('', []),
      coupon: new FormControl('', [])
    });

    return group;
  }
  addTicketCoupon() {
    const items = this.cancelForm.controls.tickets as FormArray;
    items.push(this.createFormGroup());
    if (items.length < 6) {
      this.add = true;
      this.remove = true;
    } else {
      this.add = false;
    }
    // this.total = items.length;
  }
  removeTicketCoupon(i) {
    const items = this.cancelForm.controls.tickets as FormArray;
    items.removeAt(i);
    if (items.length > 1) {
      this.remove = true;
    } else {
      this.remove = false;
    }
    // this.total = items.length;
  }
}
