import { Component, Input, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
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

  constructor(
    public activeModal: BsModalService,
    public modalRef: BsModalRef,
    private seatsService: SeatsService,
  ) { }

  ngOnInit() {
    this.seat = new SeatModel();
    this.remarkOptions = this.seatsService.REMARK_OPTIONS;
  }


  save(): void {
    this.modalRef.hide();
  }

}
