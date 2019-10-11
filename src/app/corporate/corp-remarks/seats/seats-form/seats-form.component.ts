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
  segmentIds = [];
  selectedItems = new Array<SeatModel>();

  types: Array<string> = ['WINDOW', 'AISLE', 'MIDDLE'];
  REGEX_ALPHANUMERIC = '^\\w*';

  constructor(
    public activeModal: BsModalService,
    public modalRef: BsModalRef,
    public formBuilder: FormBuilder,
    private pnrService: PnrService
  ) {}

  ngOnInit() {
    this.segmentIds = this.pnrService.segments.map((x) => x.lineNo);

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
        } else {
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
