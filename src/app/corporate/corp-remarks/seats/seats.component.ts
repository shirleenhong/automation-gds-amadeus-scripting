import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { PnrService } from 'src/app/service/pnr.service';
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
    private pnrService: PnrService,
    public seatsService: SeatsService
  ) { }

  ngOnInit() {
    this.seats = this.getSeats();
    this.seatRemarkOptions = SeatsService.REMARK_OPTIONS;
  }

  /**
   * WIP: Get the seats from the PNR
   * based on RIR remark texts.
   * TODO: Handle languages
   *
   * @return Array<SeatModel>
   */
  public getSeats(): Array<SeatModel> {
    // return [];

    const seats = new Array<SeatModel>();

    // const pnrObj = this.pnrService.pnrObj;
    // const rirElements = pnrObj.rirElements;
    const rirRemarks = this.pnrService.getRirRemarksFromGDS();

    for (const rirRemark of rirRemarks) {

      // Condition 1
      if (rirRemark.remarkText === 'SEATING SUBJECT TO') {
        continue;
      } else if (rirRemark.remarkText === 'AIRPORT OR ONLINE CHECK IN') {
        // WARNING: Segments doesn't seem to be in PNR service...
        const rirSegments = rirRemark.remarkText.substr(rirRemark.remarkText.indexOf('/S'));

        seats.push({
          id: 1,
          type: null,
          number: null,
          segmentIds: rirSegments
        });
      }

      // Condition 2
      // Condition 1
      if (rirRemark.remarkText === 'SEATING SUBJECT TO') {
        continue;
      } else if (rirRemark.remarkText === 'AIRPORT OR ONLINE CHECK IN') {
        // WARNING: Segments doesn't seem to be in PNR service...
        const rirSegments = rirRemark.remarkText.substr(rirRemark.remarkText.indexOf('/S'));

        seats.push({
          id: 1,
          type: null,
          number: null,
          segmentIds: rirSegments
        });
      }

      // Condition 3
    }

    return seats;

    // Dummy seats
    // return this.seats = [
    //   {
    //     id: 1,
    //     number: '100',
    //     type: 'window',
    //     segmentIds: '1'
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
    this.modalRef.content.seats = this.seats;

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

      if (this.modalRef) {
        if (this.modalRef.content.message === 'SAVED') {
          const newSeat = this.modalRef.content.seatForm.value;
          let isContainsSeat = false;

          // Add the new seat to the seats.
          if (newSeat) {
            this.seats.forEach(seat => {
              if (seat.id === newSeat.id && seat.segmentIds === newSeat.segmentIds) {
                isContainsSeat = true;
              }
            });

            if (!isContainsSeat) {
              this.seats.push(newSeat);
            }
          }
        }
      }

      this.modalRef = null; // Fixes duplication of components on dismiss
    });
  }
}
