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
  seat: SeatModel;
  test: string;

  seatsForm: FormGroup;
  seatItems: FormArray;
  exists: boolean;

  remarkOptions: Array<{ id: number; text: string }>;
  types: Array<string>;
  REGEX_ALPHANUMERIC = '^\\w*';

  segmentIdsForAll: any;

  constructor(public activeModal: BsModalService, public modalRef: BsModalRef, public formBuilder: FormBuilder) {}

  ngOnInit() {
    debugger;
    this.seat = new SeatModel();
    this.remarkOptions = SeatsService.REMARK_OPTIONS;
    this.types = SeatsService.TYPES;

    this.segmentIdsForAll = this.seats ? this.seats[0].segmentIds : null;

    this.seatsForm = this.formBuilder.group({
      segmentIds: [this.segmentIdsForAll, Validators.pattern('[0-9]+(,[0-9]+)*')],
      seatsFormArray: this.formBuilder.array(this.createSeats())
    });
    // this.onChanges();

    console.log('ngOnInit this.seats');
    console.log(this.seats);
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterViewInit() {
    debugger;
    console.log(this.seats);
  }

  loadSeatData() {
    // loop in seats
    const items = this.seatsForm.get('seatsFormArray') as FormArray;
    this.seats.forEach((seat) => {
      debugger;
      for (const control of items.controls) {
        if (control instanceof FormGroup) {
          const fg = control as FormGroup;
          Object.keys(fg.controls).forEach((key) => {
            if (key === '1') {
              fg.get('selected').setValue(true);
              fg.get('type').setValue(seat.type);
              fg.get('number').setValue(seat.segmentIds);
              fg.get('segmentIds').setValue(seat.segmentIds);
            }
          });
        }
      }
    });
    // parse each seats in form group
  }

  /**
   * Prepare the seats form along with default values
   */
  createSeats(): Array<FormGroup> {
    debugger;
    console.log('this.seats.findIndex((seat)');
    console.log(this.seats.findIndex((seat) => seat.id === 1));
    console.log('this.seats[0]');
    console.log(this.seats[0]);
    console.log('this.seats');
    console.log(this.seats);
    console.log('this.seats.findIndex((seat) => seat.id === 1) >= 0');
    console.log(this.seats.findIndex((seat) => seat.id === 1) >= 0);
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
                : null
              : null,
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
            disabled: false
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

    // return this.formBuilder.group({
    //   id: new FormControl('', Validators.required),
    //   type: new FormControl({ value: '', disabled: true }),
    //   number: new FormControl({ value: '', disabled: true }, Validators.pattern(this.REGEX_ALPHANUMERIC)),
    //   segmentIds: new FormControl(['', Validators.pattern('[0-9]+(,[0-9]+)*')])
    // });
  }

  // addSeat(): void {
  //   console.log('Adding seat...');
  //   this.seatsFormArray.push(this.formBuilder.control(this.createSeats()));
  // }

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
