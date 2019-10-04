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

  seatsForm: FormGroup;
  seatItems: FormArray;
  exists: boolean;

  remarkOptions: Array<{ id: number; text: string }>;
  types: Array<string>;
  REGEX_ALPHANUMERIC = '^\\w*';

  constructor(public activeModal: BsModalService, public modalRef: BsModalRef, public formBuilder: FormBuilder) {}

  ngOnInit() {
    this.seat = new SeatModel();
    this.remarkOptions = SeatsService.REMARK_OPTIONS;
    this.types = SeatsService.TYPES;

    this.seatsForm = this.formBuilder.group({
      seatsFormArray: this.formBuilder.array([this.createSeat()])
    });

    // remark2: this.formBuilder.group({
    //   id: ['', Validators.required],
    //   type: [{ value: '', disabled: true }],
    //   number: [{ value: '', disabled: true }, Validators.pattern(this.REGEX_ALPHANUMERIC)],
    //   segmentIds: ['', Validators.pattern('[0-9]+(,[0-9]+)*')]
    // }),
    // seatRemark3: this.formBuilder.group({
    //   id: ['', Validators.required],
    //   type: [{ value: '', disabled: true }],
    //   number: [{ value: '', disabled: true }, Validators.pattern(this.REGEX_ALPHANUMERIC)],
    //   segmentIds: ['', Validators.pattern('[0-9]+(,[0-9]+)*')]
    // }),
    // seatRemark4: this.formBuilder.group({
    //   id: ['', Validators.required],
    //   type: [{ value: '', disabled: true }],
    //   number: [{ value: '', disabled: true }, Validators.pattern(this.REGEX_ALPHANUMERIC)],
    //   segmentIds: ['', Validators.pattern('[0-9]+(,[0-9]+)*')]
    // }),
    // seatRemark5: this.formBuilder.group({
    //   id: ['', Validators.required],
    //   type: [{ value: '', disabled: true }],
    //   number: [{ value: '', disabled: true }, Validators.pattern(this.REGEX_ALPHANUMERIC)],
    //   segmentIds: ['', Validators.pattern('[0-9]+(,[0-9]+)*')]
    // }),
    // seatRemark6: this.formBuilder.group({
    //   id: ['', Validators.required],
    //   type: [{ value: '', disabled: true }],
    //   number: [{ value: '', disabled: true }, Validators.pattern(this.REGEX_ALPHANUMERIC)],
    //   segmentIds: ['', Validators.pattern('[0-9]+(,[0-9]+)*')]
    // })
    // });

    // {
    //   id: new FormControl('', [Validators.required]),
    //     type: new FormControl({ value: '', disabled: true }, []),
    //       number: new FormControl({ value: '', disabled: true }, [Validators.pattern(this.REGEX_ALPHANUMERIC)]),
    //         segmentIds: new FormControl('', [Validators.pattern('[0-9]+(,[0-9]+)*')])
    // }

    // this.onChanges();
  }

  createSeat(): FormGroup {
    return this.formBuilder.group({
      id: [1, Validators.required],
      type: [{ value: '', disabled: true }],
      number: [{ value: '', disabled: true }, Validators.pattern(this.REGEX_ALPHANUMERIC)],
      segmentIds: ['', Validators.pattern('[0-9]+(,[0-9]+)*')]
    });

    // return this.formBuilder.group({
    //   id: new FormControl('', Validators.required),
    //   type: new FormControl({ value: '', disabled: true }),
    //   number: new FormControl({ value: '', disabled: true }, Validators.pattern(this.REGEX_ALPHANUMERIC)),
    //   segmentIds: new FormControl(['', Validators.pattern('[0-9]+(,[0-9]+)*')])
    // });
  }

  addSeat(): void {
    console.log('Adding seat...');
    this.seatsFormArray.push(this.formBuilder.control(this.createSeat()));
  }

  get seatsFormArray() {
    return this.seatsForm.get('seatsFormArray') as FormArray;
  }

  save(): void {
    this.message = 'SAVED';
    this.modalRef.hide();
  }

  // /**
  //  * Handle changes on the seat form.
  //  */
  // public onChanges(): void {
  //   this.seatsForm.valueChanges.subscribe((value) => {
  //     console.log(value);
  //     // this.seatExists(value);
  //   });

  //   // Disable or enable the type and number form controls based on type.
  //   this.seatsForm.get('id').valueChanges.subscribe((value) => {
  //     switch (value) {
  //       // case '2':s
  //       //   this.seatRemarksForm.get('type').enable();
  //       //   break;
  //       // case '5':
  //       //   this.seatRemarksForm.get('number').enable();
  //       //   break;
  //       default:
  //         // this.seatRemarksForm.get('type').disable();
  //         // this.seatRemarksForm.get('number').disable();
  //         break;
  //     }
  //   });
  // }

  public close(): void {
    this.message = 'CLOSED';
    this.modalRef.hide();
  }
}
