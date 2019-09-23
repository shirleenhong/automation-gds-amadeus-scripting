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

  constructor(private seatModel: SeatModel) { }

  ngOnInit() {
    this.remarkOptions = SeatModel.REMARK_OPTIONS;

    console.log(this.seatModel);
  }

  /**
   * Show the form for creating a seat.
   * @return void
   */
  public create(): void {
    //
  }

  /**
   * Delete the given seat.
   * @param index The index of the seat to delete.
   */
  public delete(index): boolean {
    return !!this.seats.splice(index);
  }

}
