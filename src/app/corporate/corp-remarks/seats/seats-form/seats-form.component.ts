import { Component, Input, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { SeatModel } from 'src/app/models/pnr/seat.model';
import { SeatsService } from 'src/app/service/corporate/seats.service';

@Component({
  selector: 'app-seats-form',
  templateUrl: './seats-form.component.html',
  styleUrls: ['./seats-form.component.scss']
})
export class SeatsFormComponent implements OnInit {

  REGEX_ALPHANUMERIC = '\w';

  @Input()
  seat: SeatModel;
  text: string      = null;
  type: string      = null;
  number: string    = null;
  segmentId: string = null;

  remarkOptions: Array<string>;
  types: Array<string>;
  segments: Array<any>;

  seatForm: FormGroup;

  constructor(
    public activeModal: BsModalService,
    public modalRef: BsModalRef
  ) { }

  ngOnInit() {
    this.seat          = new SeatModel();
    this.remarkOptions = SeatsService.REMARK_OPTIONS;
    this.types         = SeatsService.TYPES;
    this.segments      = this.getSegments();

    this.seatForm = new FormGroup({
      text: new FormControl('', [ Validators.required ]),
      type: new FormControl({ value: '', disabled: true }, [ Validators.required ]),
      number: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.pattern(this.REGEX_ALPHANUMERIC) ]),
      segmentId: new FormControl('', [Validators.required, Validators.pattern('[0-9]+(,[0-9]+)*')]),
    });

    this.onChanges();
  }

  save(): void {
    // TODO: Use EventEmitter with form value
    console.warn(this.seatForm.value);

    this.modalRef.hide();
  }

  /**
   * Get the segments.
   */
  public getSegments(): Array<any> {
    return [
      {
        id: '1',
        name: 'Segment 1'
      },
      {
        id: '2',
        name: 'Segment 2'
      },
      {
        id: '3',
        name: 'Segment 3'
      }
    ];
  }

  /**
   * Handle changes on the seat form.
   */
  public onChanges(): void {

    this.seatForm.valueChanges.subscribe(() => {
      console.log('CHANGED this.seatForm. Invalid: ' + this.seatForm.invalid);
      console.log(JSON.stringify(this.seatForm.value));

      Object.keys(this.seatForm.controls).forEach(key => {
        const controlErrors: ValidationErrors = this.seatForm.get(key).errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
          });
        }
      });
    });

    // Disable or enable the type and number form controls based on type.
    this.seatForm.get('text').valueChanges.subscribe((value) => {

      console.log('Value: ' + value);
      console.log('Text: ' + this.remarkOptions.indexOf(value) + 1);

      switch (this.remarkOptions.indexOf(value) + 1) {
        case 2:
          console.log('Enabling type...');
          this.seatForm.get('type').enable();
          this.seatForm.get('type').setValidators([Validators.required]);
          break;
        case 5:
          console.log('Enabling type and number...');
          this.seatForm.get('type').enable();
          this.seatForm.get('type').setValidators([Validators.required]);
          this.seatForm.get('number').enable();
          this.seatForm.get('number').setValidators([Validators.required]);
          break;
        default:
          console.log('Disabling type and number...');
          this.seatForm.get('type').disable();
          this.seatForm.get('number').disable();
          break;
      }
    });
  }

  public close(): void {
    this.seat = null;
    this.modalRef.hide();
  }
}
