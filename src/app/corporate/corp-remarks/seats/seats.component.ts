import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { SeatModel } from 'src/app/models/pnr/seat.model';
import { SeatsFormComponent } from 'src/app/corporate/corp-remarks/seats/seats-form/seats-form.component';
import { SeatsService } from 'src/app/service/corporate/seats.service';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.scss']
})
export class SeatsComponent implements OnInit {

  seats: Array<SeatModel>;
  seatRemarkOptions: Array<{id: number, text: string}>;

  modalRef: BsModalRef;
  modalRefConfig = {
    backdrop: true,
    ignoreBackdropClick: false
  };

  constructor(
    private modalService: BsModalService,
    public seatsService: SeatsService
  ) { }

  ngOnInit() {
    this.seats = this.getSeats();
    this.seatRemarkOptions = SeatsService.REMARK_OPTIONS;
  }

  /**
   * Get the seats.
   * @return Array<SeatModel>
   */
  public getSeats(): Array<SeatModel> {
    return [];
    // Dummy seats
    // return this.seats = [
    //   {
    //     remarkId: 1,
    //     number: '100',
    //     type: 'window',
    //     segmentIds: '1'
    //   },
    //   {
    //     remarkId: 2,
    //     number: '200',
    //     type: 'aisle',
    //     segmentIds: '1,2'
    //   },
    //   {
    //     remarkId: 3,
    //     number: '300',
    //     type: 'middle',
    //     segmentIds: '1,2,3'
    //   },
    // ];
  }

  /**
   * Show the form for creating a seat.
   * @return void
   */
  public create(): void {
    // const seat = new SeatModel();
    // seat.tkMacLine = this.seats.length + 1;

    this.modalRef = this.modalService.show(SeatsFormComponent, this.modalRefConfig);
    this.modalRef.content.title = 'Add Seat Remark';
    // this.modalRef.content.seat = seat;

    this.modalSubscribeOnClose();
  }

  /**
   * Delete a seat.
   * @param seat The instance of SeatModel to delete.
   */
  public delete(seat: SeatModel): void {
    this.seats = this.seats.filter(s => s !== seat);
  }

  /**
   * Handle the seat form and act accordingly
   * based on the modal message.
   */
  private modalSubscribeOnClose() {
    this.modalService.onHide.subscribe(() => {

      if (this.modalRef.content.message === 'SAVED') {
        const newSeat = this.modalRef.content.seatForm.value;

        // Add the new seat to the seats.
        if (newSeat) {
          this.seats.push(newSeat);
        }
      }

      this.modalRef = null; // Fixes duplication of components on dismiss
    });
  }
}
