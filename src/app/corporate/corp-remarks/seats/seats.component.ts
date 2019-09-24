import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { SeatModel } from 'src/app/models/pnr/seat.model';
import { SeatsFormComponent } from 'src/app/corporate/corp-remarks/seats/seats-form/seats-form.component';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.scss']
})
export class SeatsComponent implements OnInit {

  seats: Array<SeatModel>;

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    this.seats = this.getSeats();
  }

  /**
   * Get the seats.
   * @return Array<SeatModel>
   */
  public getSeats(): Array<SeatModel> {
    // Dummy seats
    return this.seats = [
      {
        number: '1',
        text: 'SAMPLE TEXT 1',
        type: 'window',
      },
      {
        number: '2',
        text: 'SAMPLE TEXT 2',
        type: 'aisle',
      },
      {
        number: '3',
        text: 'SAMPLE TEXT 3',
        type: 'middle',
      },
    ];
  }

  /**
   * Show the form for creating a seat.
   * @return void
   */
  public create(): void {
    const seat = new SeatModel();
    // seat.tkMacLine = this.seats.length + 1;

    this.modalRef = this.modalService.show(SeatsFormComponent);
    this.modalRef.content.title = 'Add Seat Remark';
    this.modalRef.content.seat = seat;
  }

  /**
   * Delete a seat.
   * @param seat The instance of SeatModel to delete.
   */
  public delete(seat: SeatModel): void {
    this.seats = this.seats.filter(s => s !== seat);
  }
}
