import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SelectItem } from 'src/app/models/select-item.model';
import { PnrService } from 'src/app/service/pnr.service';

@Component({
  selector: 'app-concierge-udids',
  templateUrl: './concierge-udids.component.html',
  styleUrls: ['./concierge-udids.component.scss']
})
export class ConciergeUdidsComponent implements OnInit {
  conciergeForm: FormGroup;
  redemptionList: Array<SelectItem>;
  reservationReqList: Array<SelectItem>;
  bookingTypeList: Array<SelectItem>;
  yesNoList: Array<SelectItem>;
  reasonHotelBooked: Array<SelectItem>;
  remarks: Array<any>;
  forDeletion = [];
  forReference = [];
  pnrRemarksFound = [];
  // u30: boolean = false;

  constructor(private pnrService: PnrService) {
    this.conciergeForm = new FormGroup({
      redemptionAdded: new FormControl('', []),
      reservationReq: new FormControl('', [Validators.required]),
      bookingType: new FormControl('', [Validators.required]),
      chCallerName: new FormControl('', []),
      delegateName: new FormControl('', []),
      hotelName: new FormControl('', [Validators.required]),
      businessTravel: new FormControl('', [Validators.required]),
      hotelRes: new FormControl('', [Validators.required]),
      reasonHotelBooked: new FormControl('', [])
    });
  }

  ngOnInit() {
    this.forDeletion = [];
    this.forReference = [];
    this.pnrRemarksFound = [];
    this.loadStaticValue();
    this.getRemarksFromGds();
  }

  get f() {
    return this.conciergeForm.controls;
  }

  loadStaticValue() {
    this.redemptionList = [
      { itemText: '', itemValue: '' },
      {
        itemText: 'WITHIN 48 Hours of Original Booking',
        itemValue: 'WITHIN 48HRS OF BKNG'
      },
      {
        itemText: 'OUTSIDE 48 Hours of Original Booking',
        itemValue: 'OUTSIDE 48HRS OF BKNG'
      }
    ];

    this.reservationReqList = [
      { itemText: '', itemValue: '' },
      {
        itemText: 'Reservation was generated via EMAIL',
        itemValue: 'EMAIL REQUEST'
      },
      {
        itemText: 'Reservation was generated via Phone Request',
        itemValue: 'PHONE REQUEST'
      }
    ];

    this.bookingTypeList = [
      { itemText: '', itemValue: '' },
      { itemText: 'Air Only Booking', itemValue: 'AIR ONLY BOOKING' },
      {
        itemText: 'Air and Hotel and/or Car',
        itemValue: 'AIR AND HOTEL AND/OR CAR'
      },
      { itemText: 'Cruise/Tour/FIT', itemValue: 'CRUISE/TOUR/FIT' }
    ];

    this.yesNoList = [{ itemText: '', itemValue: '' }, { itemText: 'Yes', itemValue: 'YES' }, { itemText: 'No', itemValue: 'NO' }];

    this.reasonHotelBooked = [
      { itemText: '', itemValue: '' },
      { itemText: 'Conference', itemValue: 'CONFERENCE' },
      {
        itemText: 'Personal Accommodations',
        itemValue: 'PERSONAL ACCOMMODATIONS'
      },
      { itemText: 'Booked Elsewhere', itemValue: 'BOOKED ELSEWHERE' },
      {
        itemText: 'Booking to be Completed/Confirmed',
        itemValue: 'BOOKING TO BE COMPLETED/CONFIRMED'
      }
    ];
  }

  getTextLineNo(remark) {
    let textLine: { remarkText: string; lineNo: string };
    const look = this.remarks.find((x) => x.remarkText.indexOf(remark) > -1);
    if (look) {
      textLine = {
        remarkText: look.remarkText,
        lineNo: look.lineNo
      };
    }

    return textLine;
  }

  getRemarksFromGds() {
    this.pnrRemarksFound = [];
    this.forDeletion = [];
    this.remarks = this.pnrService.getRemarksFromGDS();
    const udids = [
      { id: '*U3/-', control: 'redemptionAdded' },
      { id: '*U4/-', control: 'redemptionAdded' },
      { id: '*U5/-', control: 'reservationReq' },
      { id: '*U6/-', control: 'reservationReq' },
      { id: '*U8/-', control: 'bookingType' },
      { id: '*U9/-', control: 'bookingType' },
      { id: '*U10/-', control: 'bookingType' },
      { id: '*U11/-', control: 'chCallerName' },
      { id: '*U12/-', control: 'delegateName' },
      { id: '*U13/-', control: 'hotelName' },
      { id: '*U15/-', control: 'businessTravel' },
      { id: '*U17/-', control: 'hotelRes' },
      { id: '*U18/-', control: 'reasonHotelBooked' },
      { id: '*U30/-', control: '' }
    ];

    for (let i = 0; i <= udids.length - 1; i++) {
      const rem = this.getTextLineNo(udids[i].id);
      if (rem) {
        this.pnrRemarksFound.push(udids[i].control);
        this.setControls(rem.remarkText, udids[i].id, udids[i].control, rem.lineNo);
      }
    }
  }

  private setControls(rem: string, id: string, control: string, lineNo: string) {
    if (id === '*U13/-') {
      if (rem.replace(id, '').trim() === 'NO HTL BKD') {
        this.forDeletion.push(lineNo);
        return;
      }
    }

    // if (control === 'reasonHotelBooked') {
    //   this.conciergeForm.controls[control].setValue('NO');
    // }

    if (id === '*U30/-') {
      this.forReference.push('U30');
      //return;
    } else {
      this.forDeletion.push(lineNo);
    }

    if (this.conciergeForm.controls[control]) {
      this.conciergeForm.controls[control].setValue(rem.replace(id, ''));

      if (['*U13/-', '*U17/-', '*U18/-'].indexOf(id) < 0) {
        this.conciergeForm.controls[control].disable();
      }
    }
    // this.forDeletion.push(lineNo);
  }

  getConciergeForDeletion() {
    return this.forDeletion;
  }

  getConciergeRetain() {
    return this.forReference;
  }

  onchangeHotel(newValue) {
    if (newValue === 'YES') {
      this.conciergeForm.controls.reasonHotelBooked.setValue('');
      this.conciergeForm.controls.reasonHotelBooked.disable();
    } else {
      this.conciergeForm.controls[this.newMethod()].enable();
    }
  }

  private newMethod() {
    return 'reasonHotelBooked';
  }
  // getConciergeForDeletion() {
  //   return this.forDeletion;
  // }

  // deleteRemarks(){
  //   const remGroup = new RemarkGroup();
  //   remGroup.group = 'Delete Concierge';
  //   remGroup.remarks = new Array<RemarkModel>();
  //   const assoc = this.f.segmentAssoc.value;
  //   remGroup.deleteRemarkByIds = [];
  // }
}
