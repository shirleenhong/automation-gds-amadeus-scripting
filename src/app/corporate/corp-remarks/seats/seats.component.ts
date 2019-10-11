import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
// import { PnrService } from 'src/app/service/pnr.service';
import { SeatModel } from 'src/app/models/pnr/seat.model';
import { SeatsFormComponent } from 'src/app/corporate/corp-remarks/seats/seats-form/seats-form.component';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.scss']
})
export class SeatsComponent implements OnInit {
  seats: Array<SeatModel>;
  seatRemarkOptions: Array<{ id: number; text: string }>;
  isAdd = false;
  selectedSegment = '';
  modalRef: BsModalRef;
  modalRefConfig = {
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'modal-lg'
  };

  constructor(private modalService: BsModalService) {}

  ngOnInit() {
    this.seats = this.getSeats();
    this.seatRemarkOptions = this.getRemarkOptions();
    this.modalSubscribeOnClose();
  }

  /**
   * The remark options the user selects
   * from and to be written in the PNR.
   */
  public getRemarkOptions(): Array<{ id: number; text: string }> {
    return [
      { id: 1, text: 'SEATING SUBJECT TO AIRPORT OR ONLINE CHECK IN' },
      { id: 2, text: 'PREFERRED SEAT UNAVAILABLE. SEAT TYPE CONFIRMED' },
      { id: 3, text: 'THIS SEGMENT HAS BEEN WAITLIST' },
      { id: 4, text: 'SEAT ASSIGNMENTS ARE ON REQUEST' },
      { id: 5, text: 'UPGRADE CONFIRMED - SEAT NUMBER CONFIRMED' },
      { id: 6, text: 'UPGRADE REQUESTED - CHECK CLEARANCE WITH AIRLINE OR AIRLINE WEBSITE' }
    ];
  }

  /**
   * Get the seats from the PNR
   * based on RIR remark texts.
   *
   * @return Array<SeatModel>
   */
  public getSeats(): Array<SeatModel> {
    return [];
  }

  /**
   * Show the form for creating a seat.
   * @return void
   */
  public create(): void {
    // Merge config and data to pass to the modal.
    const modalConfig = { ...this.modalRefConfig, ...{ initialState: { seats: this.seats } } };

    this.modalRef = this.modalService.show(SeatsFormComponent, modalConfig);
    this.modalRef.content.title = 'Add Seat Remarks';
    this.isAdd = true;
    // Subscribe on the modal's dismissal.
  }

  public editSeatRemark(segment) {
    const modalConfig = { ...this.modalRefConfig, ...{ initialState: { seats: this.seats } } };
    this.selectedSegment = segment;
    this.modalRef = this.modalService.show(SeatsFormComponent, modalConfig);
    this.modalRef.content.title = 'Modify Seat Remarks';
    this.modalRef.content.selectedItems = this.seats.filter((x) => x.segmentIds === segment);
    this.modalRef.content.loadSelctedItems();
    this.isAdd = false;
    // Subscribe on the modal's dismissal.
  }

  /**
   * Delete a seat.
   * @param seat The instance of SeatModel to delete.
   */
  public delete(seat: SeatModel): void {
    this.seats = this.seats.filter((s) => s.segmentIds !== seat.segmentIds);
  }

  /**
   * Handle the seat form and act accordingly
   * based on the modal message.
   */
  private modalSubscribeOnClose() {
    this.modalService.onHide.subscribe(() => {
      if (this.modalRef) {
        if (this.modalRef.content.message === 'SAVED') {
          // Get the selected seats from the modal.
          const newSeats = this.modalRef.content.selectedItems;
          if (newSeats.length > 0) {
            if (!this.isAdd) {
              // Add the new seat to the seats.
              this.seats = this.seats.filter((s) => s.segmentIds !== this.selectedSegment);
            }
            this.seats = this.seats.concat(newSeats);
            this.seats = this.seats.sort((a, b) => {
              if (a.segmentIds === b.segmentIds) {
                return a.id - b.id;
              }
              return parseInt(a.segmentIds, null) - parseInt(b.segmentIds, null);
            });
          }
        }
      }

      this.modalRef = null; // Fixes duplication of components on dismiss
    });
  }

  getRowSpanDisplay(segment, indx) {
    if (indx > 0) {
      if (segment === this.seats[indx - 1].segmentIds) {
        return '';
      }
    }
    return this.seats.filter((s) => s.segmentIds === segment).length;
  }
}
