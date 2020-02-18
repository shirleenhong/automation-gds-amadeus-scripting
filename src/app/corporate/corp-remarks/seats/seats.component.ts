import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { SeatModel } from 'src/app/models/pnr/seat.model';
import { SeatsFormComponent } from 'src/app/corporate/corp-remarks/seats/seats-form/seats-form.component';
import { RemarksManagerService } from 'src/app/service/corporate/remarks-manager.service';
import { PnrService } from 'src/app/service/pnr.service';
import { SeatsService } from 'src/app/service/corporate/seats.service';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.scss']
})
export class SeatsComponent implements OnInit {
  seats: Array<SeatModel>; // The seats that come from the Matched Placeholders (DB).
  seatRemarkOptions: Array<{ id: number; text: string }>;
  isAdd = false;
  selectedSegment = '';
  modalRef: BsModalRef;
  modalRefConfig = {
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'modal-lg'
  };

  constructor(
    private modalService: BsModalService,
    private remarkManager: RemarksManagerService,
    private pnrService: PnrService,
    private seatsService: SeatsService
  ) { }

  ngOnInit() {
    this.seatRemarkOptions = this.getRemarkOptions();

    this.seats = this.getSeats();
    this.sortSeats();

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
   * Get the seats from the Matched Placeholder in Ouput Items.
   * @return Array<SeatModel>
   */
  public getSeats(): Array<SeatModel> {
    let list = [];

    // Only get seat remarks from the Match Placeholder if they exist in the PNR as well.
    if (this.seatsService.hasSeatsFromPnr()) {
      let seats = this.getMatchedSeats(1, 'SEATING SUBJECT TO');
      list = list.concat(seats);
      seats = this.getMatchedSeats(2, 'PLEASE CHECK AGAIN AT');
      list = list.concat(seats);
      seats = this.getMatchedSeats(3, 'THIS SEGMENT HAS BEEN');
      list = list.concat(seats);
      seats = this.getMatchedSeats(4, 'SEAT ASSIGNMENTS ARE ON REQUEST');
      list = list.concat(seats);
      seats = this.getMatchedSeats(5, 'UPGRADE CONFIRMED');
      list = list.concat(seats);
      seats = this.getMatchedSeats(6, 'UPGRADE REQUESTED');
      list = list.concat(seats);
    }

    return list;
  }

  getMatchedSeats(id, remark) {
    const list = [];
    const matched = this.remarkManager.getMachedRemarkByStaticText(remark);
    matched.forEach((m) => {
      const seat = new SeatModel();
      seat.segmentIds = this.pnrService.getSegmentNumbers(m.segmentNumberReferences).join(',');
      seat.id = id;
      if (id === 2 && this.remarkManager.getValue('CaSeatType').length > 0) {
        seat.type = this.remarkManager.getValue('CaSeatType')[0];
      }
      if (id === 5 && this.remarkManager.getValue('CaUPFIB').length > 0) {
        seat.number = this.remarkManager.getValue('CaUPFIB')[0];
      }
      list.push(seat);
    });

    return list;
  }

  /**
   * Show the form for creating a seat.
   * @return void
   */
  public create(): void {
    if (!this.seats) {
      this.seats = [];
    }
    // Merge config and data to pass to the modal.
    const modalConfig = { ...this.modalRefConfig, ...{ initialState: { seats: this.seats } } };

    this.modalRef = this.modalService.show(SeatsFormComponent, modalConfig);
    this.modalRef.content.title = 'Add Seat Remarks';
    this.isAdd = true;
    // Subscribe on the modal's dismissal.
  }

  public editSeatRemark(segment) {
    const modalConfig = { ...this.modalRefConfig, ...{ initialState: { seats: this.seats, selectedSegment: segment } } };
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
            this.sortSeats();
          }
        }
      }

      this.modalRef = null; // Fixes duplication of components on dismiss
    });
  }

  sortSeats() {
    this.seats = this.seats.sort((a, b) => {
      if (a.segmentIds === b.segmentIds) {
        return a.id - b.id;
      }
      return parseInt(a.segmentIds, null) - parseInt(b.segmentIds, null);
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

  seatIsAvailable() {
    const airSegments = this.pnrService.segments.filter((x) => x.segmentType === 'AIR');
    const seat = this.seats.map(item => item.segmentIds).filter((value, index, self) => self.indexOf(value) === index);
    return (airSegments.length > seat.length);
  }
}
