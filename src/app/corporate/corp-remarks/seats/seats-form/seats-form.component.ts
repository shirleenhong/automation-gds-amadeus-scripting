import { Component, Input, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { SeatModel } from 'src/app/models/pnr/seat.model';
import { SeatsService } from 'src/app/service/corporate/seats.service';

@Component({
  selector: 'app-seats-form',
  templateUrl: './seats-form.component.html',
  styleUrls: ['./seats-form.component.scss']
})
export class SeatsFormComponent implements OnInit {

  @Input()

  seat: SeatModel;
  remarkOptions: Array<string>;
  types: Array<string>;
  segments: Array<any>;

  seatsFormGroup: FormGroup;

  constructor(
    public activeModal: BsModalService,
    public modalRef: BsModalRef
  ) { }

  ngOnInit() {
    this.seat          = new SeatModel();
    this.remarkOptions = SeatsService.REMARK_OPTIONS;
    this.types         = SeatsService.TYPES;
    this.segments      = this.getSegments();

    this.seatsFormGroup = new FormGroup({
      type: new FormControl(),
      number: new FormControl(),
      text: new FormControl(),
    });
  }

  save(): void {
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
}
