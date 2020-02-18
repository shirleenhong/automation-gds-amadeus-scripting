import { Component, Input, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SeatModel } from 'src/app/models/pnr/seat.model';
import { PnrService } from 'src/app/service/pnr.service';

@Component({
  selector: 'app-seats-form',
  templateUrl: './seats-form.component.html',
  styleUrls: ['./seats-form.component.scss']
})
export class SeatsFormComponent implements OnInit {
  /**
   * Modal component properties
   */
  title: 'Assign Seat Remark';
  message: string; // Value: null, SAVED or CLOSED

  @Input()
  seats: Array<SeatModel>; // The seats to from the parent component
  seatsForm: FormGroup;
  seatSegmentIds: Array<string>;
  segmentIds = [];
  segmentIdOptions = [];
  selectedItems = new Array<SeatModel>();
  selectedSegment: string;
  existingSegments = [];
  hasSelectedItems = false;

  types: Array<string> = ['WINDOW', 'AISLE', 'MIDDLE'];
  REGEX_ALPHANUMERIC = '^\\w*';

  constructor(
    public activeModal: BsModalService,
    public modalRef: BsModalRef,
    public formBuilder: FormBuilder,
    private pnrService: PnrService
  ) { }

  ngOnInit() {
    this.seatSegmentIds = this.getSeatSegments();
    this.pnrService.segments.map((x) => {
      if (x.segmentType === 'AIR') {
        this.segmentIds.push({
          segmentlineNo: x.lineNo,
          segmentInfo: x.longFreeText.toUpperCase()
        });
      }
    });

    this.segmentIdOptions = this.getSegmentIdOptions();

    this.seatsForm = this.formBuilder.group({
      segment: new FormControl(''),
      check1: new FormControl(''),
      check2: new FormControl(''),
      check3: new FormControl(''),
      check4: new FormControl(''),
      check5: new FormControl(''),
      check6: new FormControl(''),
      seatType: new FormControl(''),
      seatNumber: new FormControl('')
    });

    this.segmentIds = this.segmentIds.filter((x) => this.existingSegments.indexOf(x.segmentlineNo) === -1);
    // Subscribe and handle changes on the seatsForm.
    this.seatsForm.valueChanges.subscribe(() => {
      this.hasSelectedItems = this.hasChecked();
    });
  }

  checkChanged(indx) {
    const check = this.seatsForm.get('check' + indx);
    if (indx === 2) {
      if (check.value) {
        this.seatsForm.get('seatType').enable();
        this.seatsForm.get('seatType').setValidators([Validators.required]);
      } else {
        this.seatsForm.get('seatType').disable();
        this.seatsForm.get('seatType').clearValidators();
      }
    } else if (indx === 5) {
      if (check.value) {
        this.seatsForm.get('seatNumber').enable();
        this.seatsForm.get('seatNumber').setValidators([Validators.required, Validators.pattern(this.REGEX_ALPHANUMERIC)]);
      } else {
        this.seatsForm.get('seatNumber').disable();
        this.seatsForm.get('seatNumber').clearValidators();
      }
    }
    this.hasSelectedItems = this.hasChecked();
  }

  loadSelctedItems() {
    this.selectedItems.forEach((seat) => {
      this.seatsForm.get('segment').setValue(seat.segmentIds);
      this.seatsForm.get('check' + seat.id).setValue(true);
      if (seat.type) {
        this.seatsForm.get('seatType').setValue(seat.type);
      }
      if (seat.number) {
        this.seatsForm.get('seatNumber').setValue(seat.number);
      }
    });
  }
  /**
   * Check if the seatForm has checked items.
   */
  hasChecked(): boolean {
    if (
      !!this.seatsForm.get('check1').value ||
      !!this.seatsForm.get('check2').value ||
      !!this.seatsForm.get('check3').value ||
      !!this.seatsForm.get('check4').value ||
      !!this.seatsForm.get('check5').value ||
      !!this.seatsForm.get('check6').value
    ) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Get the unique segment Id options values as option.
   */
  getSegmentIdOptions(): Array<string> {
    let segmentOptions = [];

    for (const segmentId of this.segmentIds) {
      if (this.seatSegmentIds.indexOf(segmentId.segmentlineNo) < 0) {
        segmentOptions.push({ segmentid: segmentId.segmentlineNo, information: segmentId.segmentInfo });
      }

      if (segmentId.segmentlineNo === this.selectedSegment) {
        segmentOptions.push({ segmentid: segmentId.segmentlineNo, information: segmentId.segmentInfo });
      }
    }

    // Retain the segment option on edit.
    // debugger;
    // if (this.selectedSegment) {
    //   debugger;
    //   segmentOptions = this.selectedSegment ? this.selectedSegment.split(',').concat(segmentOptions) : segmentOptions;
    // }

    return segmentOptions;
  }

  /**
   * Get the unique segment Ids of the seats.
   */
  getSeatSegments() {
    const seatSegments = this.seats.map((seat) => seat.segmentIds);
    return seatSegments.filter((seat, i) => seatSegments.indexOf(seat) === i);
  }

  save(): void {
    this.selectedItems = [];
    for (let i = 1; i <= 6; i++) {
      const check = this.seatsForm.get('check' + i);
      if (check.value) {
        const seatModel = new SeatModel();
        seatModel.id = i;
        seatModel.segmentIds = this.seatsForm.get('segment').value;
        if (i === 2) {
          seatModel.type = this.seatsForm.get('seatType').value;
        } else if (i === 5) {
          seatModel.number = this.seatsForm.get('seatNumber').value;
        }
        this.selectedItems.push(seatModel);
      }
    }

    this.message = 'SAVED';
    this.modalRef.hide();
  }

  public close(): void {
    this.message = 'CLOSED';
    this.modalRef.hide();
  }
}
