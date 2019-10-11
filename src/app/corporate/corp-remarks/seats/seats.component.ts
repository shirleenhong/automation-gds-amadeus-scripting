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
  seatRemarkOptions: Array<{ id: number; text: string }>;

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
  //   const seats = new Array<SeatModel>();
  //   const pnrObj = this.pnrService.pnrObj;
  //   const rirElements = pnrObj.rirElements;
  //   const language = this.pnrService.getLanguage();

  //   for (const rirElement of rirElements) {
  //     // For English
  //     if (language === 'EN-GB') {
  //       // Condition 1
  //       if (rirElement.fullNode.extendedRemark.structuredRemark.freetext === 'AIRPORT OR ONLINE CHECK IN') {
  //         const rirSegments = rirElement.associations.map((association) => association.tatooNumber);
  //         seats.push({
  //           id: 1,
  //           type: null,
  //           number: null,
  //           segmentIds: rirSegments ? this.pnrService.getSegmentNumbers(rirSegments).toString() : null
  //         });
  //       }

  //       // Condition 2
  //       if (rirElement.fullNode.extendedRemark.structuredRemark.freetext.includes('PREFERRED SEAT UNAVAILABLE')) {
  //         let rirSegments: any = null;
  //         let seatType: any = null;
  //         if (rirElement.associations) {
  //           rirSegments = rirElement.associations.map((association) => association.tatooNumber);
  //         }

  //         const freeText = rirElement.fullNode.extendedRemark.structuredRemark.freetext;
  //         if (freeText.split('-')) {
  //           if (freeText.split('-')[1]) {
  //             seatType = freeText.split('-')[1].split(' ')[0];
  //           }
  //         }
  //         seats.push({
  //           id: 2,
  //           type: seatType,
  //           number: null,
  //           segmentIds: rirSegments ? this.pnrService.getSegmentNumbers(rirSegments).toString() : null
  //         });
  //         continue;
  //       }

  //       // Condition 3
  //       if (rirElement.fullNode.extendedRemark.structuredRemark.freetext === 'THIS SEGMENT HAS BEEN WAITLISTED') {
  //         const rirSegments = rirElement.associations.map((association) => association.tatooNumber);
  //         seats.push({
  //           id: 3,
  //           type: null,
  //           number: null,
  //           segmentIds: rirSegments ? this.pnrService.getSegmentNumbers(rirSegments).toString() : null
  //         });
  //       }

  //       // Condition 4
  //       if (rirElement.fullNode.extendedRemark.structuredRemark.freetext === 'SEAT ASSIGNMENTS ARE ON REQUEST') {
  //         const rirSegments = rirElement.associations.map((association) => association.tatooNumber);
  //         seats.push({
  //           id: 4,
  //           type: null,
  //           number: null,
  //           segmentIds: rirSegments ? this.pnrService.getSegmentNumbers(rirSegments).toString() : null
  //         });
  //         continue;
  //       }

  //       // Condition 5
  //       if (rirElement.fullNode.extendedRemark.structuredRemark.freetext.includes('UPGRADE CONFIRMED')) {
  //         const rirSegments = rirElement.associations.map((association) => association.tatooNumber);
  //         const seatNumber = rirElement.fullNode.extendedRemark.structuredRemark.freetext.split(' ')[4];
  //         seats.push({
  //           id: 5,
  //           type: null,
  //           number: seatNumber,
  //           segmentIds: rirSegments ? this.pnrService.getSegmentNumbers(rirSegments).toString() : null
  //         });
  //       }

  //       // Condition 6
  //       if (rirElement.fullNode.extendedRemark.structuredRemark.freetext === 'UPGRADE REQUESTED') {
  //         const rirSegments = rirElement.associations.map((association) => association.tatooNumber);
  //         seats.push({
  //           id: 6,
  //           type: null,
  //           number: null,
  //           segmentIds: rirSegments ? this.pnrService.getSegmentNumbers(rirSegments).toString() : null
  //         });
  //       }
  //     }

  //     // For French
  //     if (language === 'FR-CA') {
  //       // Condition 1
  //       if (rirElement.fullNode.extendedRemark.structuredRemark.freetext === 'LE CHOIX DES SIEGES NE SE FAIT QU A L ENREGISTREMENT') {
  //         const rirSegments = rirElement.associations.map((association) => association.tatooNumber);
  //         seats.push({
  //           id: 1,
  //           type: null,
  //           number: null,
  //           segmentIds: rirSegments ? this.pnrService.getSegmentNumbers(rirSegments).toString() : null
  //         });
  //       }

  //       // Condition 2
  //       if (rirElement.fullNode.extendedRemark.structuredRemark.freetext.includes('CHOIX DE SIEGE NON DISPONIBLE')) {
  //         let rirSegments: any = null;
  //         let seatType: any = null;
  //         if (rirElement.associations) {
  //           rirSegments = rirElement.associations.map((association) => association.tatooNumber);
  //         }
  //         const freeText = rirElement.fullNode.extendedRemark.structuredRemark.freetext;
  //         if (freeText.split('-')) {
  //           if (freeText.split('-')[1]) {
  //             seatType = freeText.split('-')[1].split(' ')[0];
  //           }
  //         }
  //         seats.push({
  //           id: 2,
  //           type: seatType,
  //           number: null,
  //           segmentIds: rirSegments ? this.pnrService.getSegmentNumbers(rirSegments).toString() : null
  //         });
  //         continue;
  //       }

  //       // Condition 3
  //       if (rirElement.fullNode.extendedRemark.structuredRemark.freetext === 'CE SEGMENT A ETE MIS EN LISTE D ATTENTE') {
  //         const rirSegments = rirElement.associations.map((association) => association.tatooNumber);
  //         seats.push({
  //           id: 3,
  //           type: null,
  //           number: null,
  //           segmentIds: rirSegments ? this.pnrService.getSegmentNumbers(rirSegments).toString() : null
  //         });
  //       }

  //       // Condition 4
  //       if (rirElement.fullNode.extendedRemark.structuredRemark.freetext === 'ATTRIBUTION DES SIEGES SUR DEMANDE') {
  //         const rirSegments = rirElement.associations.map((association) => association.tatooNumber);
  //         seats.push({
  //           id: 4,
  //           type: null,
  //           number: null,
  //           segmentIds: rirSegments ? this.pnrService.getSegmentNumbers(rirSegments).toString() : null
  //         });
  //         continue;
  //       }

  //       // Condition 5
  //       if (rirElement.fullNode.extendedRemark.structuredRemark.freetext.includes('SURCLASSEMENT CONFIRME')) {
  //         const rirSegments = rirElement.associations.map((association) => association.tatooNumber);
  //         const seatNumber = rirElement.fullNode.extendedRemark.structuredRemark.freetext.split(' ')[4];
  //         seats.push({
  //           id: 5,
  //           type: null,
  //           number: seatNumber,
  //           segmentIds: rirSegments ? this.pnrService.getSegmentNumbers(rirSegments).toString() : null
  //         });
  //       }

  //       // Condition 6
  //       if (rirElement.fullNode.extendedRemark.structuredRemark.freetext.includes('SURCLASSEMENT DEMANDE')) {
  //         const rirSegments = rirElement.associations.map((association) => association.tatooNumber);
  //         seats.push({
  //           id: 6,
  //           type: null,
  //           number: null,
  //           segmentIds: rirSegments ? this.pnrService.getSegmentNumbers(rirSegments).toString() : null
  //         });
  //         continue;
  //       }
  //     }
  //   }
  //   return this.groupSeats(seats);
  // }

  /**
   * Show the form for creating a seat.
   * @return void
   */
  public create(): void {
    // Merge config and data to pass to the modal.
    const modalConfig = { ...this.modalRefConfig, ...{ initialState: { seats: this.seats } } };

    this.modalRef = this.modalService.show(SeatsFormComponent, modalConfig);
    this.modalRef.content.title = 'Add Seat Remarks';

    // Subscribe on the modal's dismissal.
    this.modalSubscribeOnClose();
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
          // Add the new seat to the seats.
          this.seats = this.seats.concat(newSeats);
        }
      }

      this.modalRef = null; // Fixes duplication of components on dismiss
    });
  }

  // /**
  //  * Group an array of seats by remark id and seat type.
  //  * @param seats The grouped seats.
  //  */
  // private groupSeats(seats: Array<SeatModel>) {
  //   let uniqueSeats = new Array<SeatModel>();

  //   for (const seat of seats) {
  //     if (
  //       uniqueSeats.filter((item) => item.id === seat.id).length === 0 ||
  //       uniqueSeats.filter((item) => item.type === seat.type).length === 0
  //     ) {
  //       uniqueSeats.push(seat);
  //     } else {
  //       const duplicateSeatIndex = uniqueSeats.findIndex((item) => item.id === seat.id);
  //       try {
  //         if (uniqueSeats[duplicateSeatIndex]) {
  //           if (uniqueSeats[duplicateSeatIndex].segmentIds && seat.segmentIds) {
  //             uniqueSeats[duplicateSeatIndex].segmentIds = uniqueSeats[duplicateSeatIndex].segmentIds.concat(seat.segmentIds);
  //           }
  //           uniqueSeats[duplicateSeatIndex].type = seat.type ? seat.type : null;
  //           uniqueSeats[duplicateSeatIndex].number = seat.number ? seat.number : null;
  //         }
  //       } catch (error) {
  //         console.log('Error grouping the seats...' + error);
  //       }
  //     }
  //   }

  //   uniqueSeats = uniqueSeats.filter((uniqueSeat, i) => {
  //     return i === uniqueSeats.findIndex((item) => item.id === uniqueSeat.id && item.type === uniqueSeat.type);
  //   });

  //   // Add commas to the seats' segmentIds
  //   for (const uniqueSeat of uniqueSeats) {
  //     uniqueSeat.segmentIds = uniqueSeat.segmentIds ? uniqueSeat.segmentIds.split('').join(',') : null;
  //   }

  //   return uniqueSeats;
  // }

  getRowSpanDisplay(segment, indx) {
    if (indx > 0) {
      if (segment === this.seats[indx - 1].segmentIds) {
        return '';
      }
    }
    return this.seats.filter((s) => s.segmentIds === segment).length;
  }
}
