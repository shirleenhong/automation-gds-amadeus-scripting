import { Component, Input, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeatModel } from 'src/app/models/pnr/seat.model';
import { SeatsService } from 'src/app/service/corporate/seats.service';

@Component({
  selector: 'app-seats-form',
  templateUrl: './seats-form.component.html',
  styleUrls: ['./seats-form.component.scss']
})
export class SeatsFormComponent implements OnInit {
  /**
   * Modal component properties
   */
  title: string;
  message: string; // Value: null, SAVED or CLOSED

  @Input()
  seats: Array<SeatModel>; // The seats to from the parent component
  seatsForm: FormGroup;
  segmentIdsForAll: any;

  remarkOptions: Array<{ id: number; text: string }>;
  types: Array<string>;
  REGEX_ALPHANUMERIC = '^\\w*';

  constructor(public activeModal: BsModalService, public modalRef: BsModalRef, public formBuilder: FormBuilder) {}

  ngOnInit() {
    this.remarkOptions = SeatsService.REMARK_OPTIONS;
    this.types = SeatsService.TYPES;
    this.segmentIdsForAll = this.seats.length ? this.seats[0].segmentIds : null;

    this.seatsForm = this.formBuilder.group({
      segmentIds: [this.segmentIdsForAll, Validators.pattern('[0-9]+(,[0-9]+)*')],
      seatsFormArray: this.formBuilder.array(this.createSeats())
    });
  }

  /**
   * Prepare the seats form along with default values
   */
  createSeats(): Array<FormGroup> {
    return [
      this.formBuilder.group({
        selected: [this.seats ? this.seats.findIndex((seat) => seat.id === 1) >= 0 : null],
        id: [1, Validators.required],
        type: [{ value: '', disabled: true }],
        number: [{ value: '', disabled: true }, Validators.pattern(this.REGEX_ALPHANUMERIC)]
      }),
      this.formBuilder.group({
        selected: [this.seats ? this.seats.findIndex((seat) => seat.id === 2) >= 0 : null],
        id: [2, Validators.required],
        type: [
          {
            value: this.seats
              ? this.seats.findIndex((seat) => seat.id === 2) >= 0
                ? this.seats[this.seats.findIndex((seat) => seat.id === 2)].type
                : ''
              : '',
            disabled: false
          }
        ],
        number: [{ value: '', disabled: true }, Validators.pattern(this.REGEX_ALPHANUMERIC)]
      }),
      this.formBuilder.group({
        selected: [this.seats ? this.seats.findIndex((seat) => seat.id === 3) >= 0 : null],
        id: [3, Validators.required],
        type: [{ value: '', disabled: true }],
        number: [{ value: '', disabled: true }, Validators.pattern(this.REGEX_ALPHANUMERIC)]
      }),
      this.formBuilder.group({
        selected: [this.seats ? this.seats.findIndex((seat) => seat.id === 4) >= 0 : null],
        id: [4, Validators.required],
        type: [{ value: '', disabled: true }],
        number: [{ value: '', disabled: true }, Validators.pattern(this.REGEX_ALPHANUMERIC)]
      }),
      this.formBuilder.group({
        selected: [this.seats ? this.seats.findIndex((seat) => seat.id === 5) >= 0 : null],
        id: [5, Validators.required],
        type: [
          {
            value: this.seats
              ? this.seats.findIndex((seat) => seat.id === 5) >= 0
                ? this.seats[this.seats.findIndex((seat) => seat.id === 5)].type
                : null
              : null,
            disabled: true
          }
        ],
        number: [
          {
            value: this.seats
              ? this.seats.findIndex((seat) => seat.id === 5) >= 0
                ? this.seats[this.seats.findIndex((seat) => seat.id === 5)].number
                : null
              : null,
            disabled: false
          },
          Validators.pattern(this.REGEX_ALPHANUMERIC)
        ]
      }),
      this.formBuilder.group({
        selected: [this.seats ? this.seats.findIndex((seat) => seat.id === 6) >= 0 : null],
        id: [6, Validators.required],
        type: [{ value: '', disabled: true }],
        number: [{ value: '', disabled: false }, Validators.pattern(this.REGEX_ALPHANUMERIC)]
      })
    ];
  }

  get seatsFormArray() {
    return this.seatsForm.get('seatsFormArray') as FormArray;
  }

  save(): void {
    this.message = 'SAVED';
    this.modalRef.hide();
  }

  public close(): void {
    this.message = 'CLOSED';
    this.modalRef.hide();
  }
}
