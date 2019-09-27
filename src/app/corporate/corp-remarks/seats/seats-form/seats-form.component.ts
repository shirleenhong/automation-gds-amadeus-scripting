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
  seat: SeatModel;
  remarkId: number  = null;
  type: string      = null;
  number: string    = null;
  segmentIds: string = null;

  remarkOptions: Array<{id: number, text: string}>;
  types: Array<string>;

  seatForm: FormGroup;

  /**
   * The message of the modal.
   * Values: SAVED, CLOSED
   */
  message: string;

  constructor(
    public activeModal: BsModalService,
    public modalRef: BsModalRef
  ) { }

  ngOnInit() {
    this.seat          = new SeatModel();
    this.remarkOptions = SeatsService.REMARK_OPTIONS;
    this.types         = SeatsService.TYPES;

    this.seatForm = new FormGroup({
      remarkId: new FormControl('', [ Validators.required ]),
      type: new FormControl({ value: '', disabled: true }, []),
      number: new FormControl({ value: '', disabled: true }, [ Validators.pattern(this.REGEX_ALPHANUMERIC) ]),
      segmentIds: new FormControl('', [ Validators.pattern('[0-9]+(,[0-9]+)*') ]),
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
    // Disable or enable the type and number form controls based on type.
    this.seatForm.get('remarkId').valueChanges.subscribe((value) => {
      console.log('CHANGED remarkId: ' + value);
      switch (value) {
        case '2':
          this.seatForm.get('type').enable();
          break;
        case '5':
          this.seatForm.get('type').enable();
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
}
