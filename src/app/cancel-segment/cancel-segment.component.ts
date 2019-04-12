import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { SelectItem } from '../models/select-item.model';
import { PnrService } from '../service/pnr.service';
import { validateSegmentNumbers, validatePassengerNumbers } from '../shared/validators/leisure.validators';

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
  passengers = [];

  // segmentDetails: any;


  constructor(private formBuilder: FormBuilder, private pnrService: PnrService) {

    this.cancelForm = new FormGroup({
      segments: new FormArray([]),
      requestor: new FormControl('', [Validators.required]),
      desc1: new FormControl('', [Validators.required]),
      desc2: new FormControl('', []),
      reasonACCancel: new FormControl('', []),
      reasonUACancel: new FormControl('', []),
      ticket1: new FormControl('', []),
      ticket2: new FormControl('', []),
      ticket3: new FormControl('', []),
      ticket4: new FormControl('', []),
      ticket5: new FormControl('', []),
      ticket6: new FormControl('', []),
      coupon1: new FormControl('', []),
      coupon2: new FormControl('', []),
      coupon3: new FormControl('', []),
      coupon4: new FormControl('', []),
      coupon5: new FormControl('', []),
      coupon6: new FormControl('', []),
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
      acpassengerNo: new FormControl('', [])
    });
  }

  private addCheckboxes() {
    this.segments.map((o, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      (this.cancelForm.controls.segments as FormArray).push(control);
    });
  }

  ngOnInit() {
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

  getSegmentTatooValue() {
    const segmentDetails = this.pnrService.getSegmentTatooNumber();
    segmentDetails.forEach(element => {
      if (segmentDetails.length > 0) {
        const details = {
          id: element.lineNo,
          name: element.longFreeText,
          status: element.status,
          segmentType: element.segmentType,
          airlineCode: element.airlineCode
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
    this.enableFormControls(['acTicketNo', 'acpassengerNo', 'acFlightNo', 'accityPair', 'acdepDate', 'relationship'], true);
    this.enableFormControls(['reasonUACancel', 'uasegNo', 'uaPassengerNo'], true);

    const selectedPreferences = this.cancelForm.value.segments
      .map((checked, index) => checked ? this.segments[index].id : null)
      .filter(value => value !== null);
    selectedPreferences.forEach(element => {
      const look = this.segments.find(x => x.id === element);
      if (look) {
        if (look.airlineCode === 'AC') {
          this.enableFormControls(['acTicketNo', 'acpassengerNo', 'acFlightNo', 'accityPair', 'acdepDate', 'relationship'], false);
          this.cancelForm.controls['acTicketNo'].setValue('');
          this.cancelForm.controls['acpassengerNo'].setValue('');
          this.cancelForm.controls['acFlightNo'].setValue('');
          this.cancelForm.controls['accityPair'].setValue('');
          this.cancelForm.controls['acdepDate'].setValue('');
          this.cancelForm.controls['relationship'].setValue('');
          this.defaultPassenger('AC');
          this.isAC = true;
        }
        if (look.airlineCode === 'UA') {
          this.enableFormControls(['reasonUACancel', 'uasegNo', 'uaPassengerNo'], false);
          this.cancelForm.controls['reasonUACancel'].setValue('');
          this.cancelForm.controls['uasegNo'].setValue('');
          this.cancelForm.controls['uaPassengerNo'].setValue('');
          this.defaultPassenger('UA');
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
        this.defaultPassenger('AC');
        this.enableFormControls(['acTicketNo', 'acpassengerNo', 'acFlightNo', 'accityPair', 'acdepDate', 'relationship'], false);
        this.isAC = true;
      }
      if (this.segments[0].airlineCode === 'UA') {
        this.enableFormControls(['reasonUACancel', 'uasegNo', 'uaPassengerNo'], false);
        this.defaultPassenger('UA');
        this.isUA = true;
      }
    }
  }

  defaultPassenger(airline) {
    let passenger = this.pnrService.getPassengers();
    if (passenger.length === 1) {
      if (airline === 'AC') {
        this.cancelForm.controls['acpassengerNo'].setValue('1');
        this.cancelForm.controls['acpassengerNo'].disable();
      }

      // if (airline === 'UA') {
      //   this.cancelForm.controls['uaPassengerNo'].setValue('1');
      //   this.cancelForm.controls['uaPassengerNo'].disable();
      // }

    }
  }

  acChange(newValue) {

    switch (newValue) {
      case '1':
      case '2':
      case '3':
        this.enableFormControls(['acTicketNo'], false);
        this.enableFormControls(['acpassengerNo', 'acFlightNo', 'accityPair', 'acdepDate', 'relationship'], true);
        break;
      case '4':
        this.enableFormControls(['acTicketNo', 'acpassengerNo', 'acFlightNo', 'accityPair', 'acdepDate', 'relationship'], true);
        break;
      case '5':
        this.enableFormControls(['acFlightNo', 'accityPair', 'acdepDate', 'relationship'], false);
        this.enableFormControls(['acFlightNo', 'acpassengerNo'], true);
        break;
      case '6':
        this.enableFormControls(['acFlightNo', 'accityPair', 'acdepDate'], false);
        this.enableFormControls(['acFlightNo', 'acpassengerNo', 'relationship'], true);
        break;
      default:
        this.enableFormControls(['acTicketNo', 'acpassengerNo', 'acFlightNo', 'accityPair', 'acdepDate', 'relationship'], true);
        break;
    }
  }

  uaChange(newValue) {

    switch (newValue) {
      case '1':
        this.enableFormControls(['uasegNo', 'uaPassengerNo'], false);
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

}
