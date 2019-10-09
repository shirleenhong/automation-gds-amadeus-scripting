import { Component, Input, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SeatModel } from 'src/app/models/pnr/seat.model';
import { SeatsService } from 'src/app/service/corporate/seats.service';

@Component({
  selector: 'app-seats-form',
  templateUrl: './seats-form.component.html',
  styleUrls: ['./seats-form.component.scss']
})
export class SeatsFormComponent implements OnInit {
  REGEX_ALPHANUMERIC = '^\\w*';

  @Input()
  seats: Array<SeatModel>; // The seats to from the parent component
  seat: SeatModel;
  id: number = null;
  type: string = null;
  number: string = null;
  segmentIds: string = null;

  remarkOptions: Array<{ id: number; text: string }>;
  types: Array<string>;

  seatForm: FormGroup;
  exists: boolean;

  /**
   * The message of the modal.
   * Values: SAVED, CLOSED
   */
  message: string;

  title = '';

  constructor(public activeModal: BsModalService, public modalRef: BsModalRef) {}

  ngOnInit() {
    this.seat = new SeatModel();
    this.remarkOptions = SeatsService.REMARK_OPTIONS;
    this.types = SeatsService.TYPES;

    this.seatForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      type: new FormControl({ value: '', disabled: true }, []),
      number: new FormControl({ value: '', disabled: true }, [Validators.pattern(this.REGEX_ALPHANUMERIC)]),
      segmentIds: new FormControl('', [Validators.pattern('[0-9]+(,[0-9]+)*')])
    });

    this.onChanges();
  }

  save(): void {
    this.message = 'SAVED';
    this.modalRef.hide();
  }

  /**
   * Handle changes on the seat form.
   */
  public onChanges(): void {
    this.seatForm.valueChanges.subscribe((value) => {
      this.seatExists(value);
    });

    // Disable or enable the type and number form controls based on type.
    this.seatForm.get('id').valueChanges.subscribe((value) => {
      switch (value) {
        case '2':
          this.seatForm.get('type').enable();
          break;
        case '5':
          this.seatForm.get('number').enable();
          break;
        default:
          this.seatForm.get('type').disable();
          this.seatForm.get('number').disable();
          break;
      }
    });
  }

  public close(): void {
    this.message = 'CLOSED';
    this.modalRef.hide();
  }

  /**
   * Check if a seat exists in the seats
   * along with its segments.
   * @param newSeat The seat to match
   */
  public seatExists(newSeat: SeatModel): boolean {
    for (const seat of this.seats) {
      const newSeatSegments = newSeat.segmentIds.split(',');
      for (const newSeatSegment of newSeatSegments) {
        if (newSeatSegment) {
          if (seat.id === newSeat.id && seat.segmentIds.toString().indexOf(newSeatSegment) >= 0) {
            this.exists = true;
            return true;
          } else {
            this.exists = false;
          }
        }
      }
    }

    return false;
  }
}
