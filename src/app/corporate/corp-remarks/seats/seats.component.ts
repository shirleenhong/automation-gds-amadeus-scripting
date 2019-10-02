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
    // debugger;
    // console.log('getSeats() ================================');

    const seats = new Array<SeatModel>();

    const pnrObj = this.pnrService.pnrObj;
    const rirElements = pnrObj.rirElements;
    // const rirRemarks = this.pnrService.getRirRemarksFromGDS();

    // console.log('pnrObj');
    // console.log(pnrObj);

    // console.log('rirElements');
    // console.log(rirElements);

    // console.log('rirRemarks');
    // console.log(rirRemarks);
    // debugger;
    for (const rirElement of rirElements) {

      // Condition 1
      if (rirElement.fullNode.extendedRemark.structuredRemark.freetext === 'AIRPORT OR ONLINE CHECK IN') {
        const rirSegments = rirElement.associations.map(association => association.tatooNumber);
        seats.push({
          id: 1,
          type: null,
          number: null,
          segmentIds: rirSegments
        });
      }

      // Condition 2
      if (rirElement.fullNode.extendedRemark.structuredRemark.freetext.includes('PREFERRED SEAT UNAVAILABLE')) {
        let rirSegments: any = null;
        let seatType: any = null;
        if (rirElement.associations) {
          rirSegments = rirElement.associations.map(association => association.tatooNumber);
        }
        const freeText = rirElement.fullNode.extendedRemark.structuredRemark.freetext;
        if (freeText.split('-')) {
          if (freeText.split('-')[1]) {
            seatType = freeText.split('-')[1].split(' ')[0];
          }
        }
        seats.push({
          id: 2,
          type: seatType,
          number: null,
          segmentIds: rirSegments
        });
        continue;
      }

      // Condition 3
      if (rirElement.fullNode.extendedRemark.structuredRemark.freetext === 'THIS SEGMENT HAS BEEN WAITLISTED') {
        const rirSegments = rirElement.associations.map(association => association.tatooNumber);
        seats.push({
          id: 3,
          type: null,
          number: null,
          segmentIds: rirSegments
        });
      }

      // Condition 4
      if (rirElement.fullNode.extendedRemark.structuredRemark.freetext === 'SEAT ASSIGNMENTS ARE ON REQUEST') {
        const rirSegments = rirElement.associations.map(association => association.tatooNumber);
        seats.push({
          id: 4,
          type: null,
          number: null,
          segmentIds: rirSegments
        });
        continue;
      }

      // Condition 5
      if (rirElement.fullNode.extendedRemark.structuredRemark.freetext.includes('UPGRADE CONFIRMED')) {
        // debugger;
        const rirSegments = rirElement.associations.map(association => association.tatooNumber);
        const seatNumber = rirElement.fullNode.extendedRemark.structuredRemark.freetext.split(' ')[4];
        seats.push({
          id: 5,
          type: null,
          number: seatNumber,
          segmentIds: rirSegments
        });
      }

      // Condition 6
      if (rirElement.fullNode.extendedRemark.structuredRemark.freetext === 'UPGRADE REQUESTED') {
        const rirSegments = rirElement.associations.map(association => association.tatooNumber);
        seats.push({
          id: 6,
          type: null,
          number: null,
          segmentIds: rirSegments
        });
      }
    }

    return this.groupSeats(seats);
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

          // Add the new seat to the seats.
          if (newSeat) {
            this.seats.push(newSeat);
          }
        }
      }

      this.modalRef = null; // Fixes duplication of components on dismiss
    });
  }

  /**
   * Group an array of seats by remark id and seat type.
   * @param seats The grouped seats.
   */
  private groupSeats(seats: Array<SeatModel>) {
    console.log('seats');
    console.log(seats);

    let uniqueSeats = new Array<SeatModel>();

    for (const seat of seats) {
      // debugger;
      if (uniqueSeats.filter(item => item.id === seat.id).length === 0 ||
        uniqueSeats.filter(item => item.type === seat.type).length === 0) {
          // debugger;
        uniqueSeats.push(seat);
      } else {
        // debugger;
        const duplicateSeatIndex = uniqueSeats.findIndex(item => item.id === seat.id);
        try {
          if (uniqueSeats[duplicateSeatIndex]) {
            if (uniqueSeats[duplicateSeatIndex].segmentIds && seat.segmentIds) {
              // debugger;
              uniqueSeats[duplicateSeatIndex].segmentIds = uniqueSeats[duplicateSeatIndex].segmentIds.concat(seat.segmentIds);
            }
            uniqueSeats[duplicateSeatIndex].type = seat.type ? seat.type : null;
            uniqueSeats[duplicateSeatIndex].number = (seat.number) ? seat.number : null;
          }
        } catch (error) {
          console.log('Error grouping the seats...' + error);
          console.error(error);
          console.log('uniqueSeats["duplicateSeatIndex"]');
          console.log(uniqueSeats[duplicateSeatIndex]);
          console.log('duplicateSeatIndex');
          console.log(duplicateSeatIndex);
        }
      }
    }

    uniqueSeats = uniqueSeats.filter((uniqueSeat, i) => {
      return i === uniqueSeats.findIndex(item => item.id === uniqueSeat.id);
    });

    return uniqueSeats;
  }
}
