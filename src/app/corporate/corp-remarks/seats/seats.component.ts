import { Component, OnInit } from '@angular/core';
import { SeatModel } from 'src/app/models/pnr/seat.model';
import { SeatsService } from 'src/app/service/corporate/seats.service';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.scss']
})
export class SeatsComponent implements OnInit {

  seats: Array<SeatModel>;
  remarkOptions: Array<string>;

  constructor(private seatsService: SeatsService) { }

  ngOnInit() {
    this.remarkOptions = this.seatsService.REMARK_OPTIONS;

    // Dummy seats
    this.seats = [
      {
        seatNumber: '1',
        text: 'SAMPLE TEXT 1',
        type: 'window',
      },
      {
        seatNumber: '2',
        text: 'SAMPLE TEXT 2',
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
