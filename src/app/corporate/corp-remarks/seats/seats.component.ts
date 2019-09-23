import { Component, OnInit } from '@angular/core';
import { SeatModel } from '../../../models/pnr/seat.model';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.scss']
})
export class SeatsComponent implements OnInit {

  seats: Array<SeatModel>;
  remarkOptions: Array<string>;

  constructor() { }

  ngOnInit() {
    this.remarkOptions = SeatModel.REMARK_OPTIONS;

    // Dummy seats
    this.seats = [
      {
        seatNumber: '1',
        text: 'SAMPLE TEXT 1',
        type: 'window',
      },
      {
        seatNumber: '1',
        text: 'SAMPLE TEXT 3',
        type: 'aisle',
      },
      {
        seatNumber: '3',
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
    //
  }

  /**
   * Delete a seat.
   * @param seat The instance of SeatModel to delete.
   */
  public delete(seat: SeatModel): void {
    this.seats = this.seats.filter(s => s !== seat);
  }

}
