import { Injectable } from '@angular/core';
import { SeatModel } from 'src/app/models/pnr/seat.model';
import { PnrService } from 'src/app/service/pnr.service';

@Injectable({
  providedIn: 'root'
})
export class SeatsService {
  constructor(private pnrService: PnrService) {}
  /**
   * The types of seat.
   */
  public static TYPES: Array<string> = ['WINDOW', 'AISLE', 'MIDDLE'];

  /**
   * The remark options the user selects from and to be written in the PNR.
   */
  public static REMARK_OPTIONS: Array<{ id: number; text: string }> = [
    { id: 1, text: 'SEATING SUBJECT TO AIRPORT OR ONLINE CHECK IN' },
    { id: 2, text: 'PREFERRED SEAT UNAVAILABLE. SEAT TYPE CONFIRMED' },
    { id: 3, text: 'THIS SEGMENT HAS BEEN WAITLIST' },
    { id: 4, text: 'SEAT ASSIGNMENTS ARE ON REQUEST' },
    { id: 5, text: 'UPGRADE CONFIRMED - SEAT NUMBER CONFIRMED' },
    { id: 6, text: 'UPGRADE REQUESTED - CHECK CLEARANCE WITH AIRLINE OR AIRLINE WEBSITE' }
  ];

  /**
   * Get the seats from the PNR based on RIR remark texts.
   * @param firstOnly Set true to only return the first result.
   */
  public getSeatsFromPnr(firstOnly = false): Array<SeatModel> {
    const seats = new Array<SeatModel>();
    const pnrObj = this.pnrService.pnrObj;
    const rirElements = pnrObj.rirElements;
    const language = this.pnrService.getLanguage();

    for (const rirElement of rirElements) {
      // For English
      if (language === 'EN-GB') {
        // Condition 1
        if (rirElement.fullNode.extendedRemark.structuredRemark.freetext === 'AIRPORT OR ONLINE CHECK IN') {
          const rirSegments = rirElement.associations.map((association) => association.tatooNumber);
          seats.push({
            id: 1,
            type: null,
            number: null,
            segmentIds: rirSegments ? this.pnrService.getSegmentNumbers(rirSegments).toString() : null
          });
        }

        // Condition 2
        if (rirElement.fullNode.extendedRemark.structuredRemark.freetext.includes('PREFERRED SEAT UNAVAILABLE')) {
          let rirSegments: any = null;
          let seatType: any = null;
          if (rirElement.associations) {
            rirSegments = rirElement.associations.map((association) => association.tatooNumber);
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
            segmentIds: rirSegments ? this.pnrService.getSegmentNumbers(rirSegments).toString() : null
          });
          continue;
        }

        // Condition 3
        if (rirElement.fullNode.extendedRemark.structuredRemark.freetext === 'THIS SEGMENT HAS BEEN WAITLISTED') {
          const rirSegments = rirElement.associations.map((association) => association.tatooNumber);
          seats.push({
            id: 3,
            type: null,
            number: null,
            segmentIds: rirSegments ? this.pnrService.getSegmentNumbers(rirSegments).toString() : null
          });
        }

        // Condition 4
        if (rirElement.fullNode.extendedRemark.structuredRemark.freetext === 'SEAT ASSIGNMENTS ARE ON REQUEST') {
          const rirSegments = rirElement.associations.map((association) => association.tatooNumber);
          seats.push({
            id: 4,
            type: null,
            number: null,
            segmentIds: rirSegments ? this.pnrService.getSegmentNumbers(rirSegments).toString() : null
          });
          continue;
        }

        // Condition 5
        if (rirElement.fullNode.extendedRemark.structuredRemark.freetext.includes('UPGRADE CONFIRMED')) {
          const rirSegments = rirElement.associations.map((association) => association.tatooNumber);
          const seatNumber = rirElement.fullNode.extendedRemark.structuredRemark.freetext.split(' ')[4];
          seats.push({
            id: 5,
            type: null,
            number: seatNumber,
            segmentIds: rirSegments ? this.pnrService.getSegmentNumbers(rirSegments).toString() : null
          });
        }

        // Condition 6
        if (rirElement.fullNode.extendedRemark.structuredRemark.freetext === 'UPGRADE REQUESTED') {
          const rirSegments = rirElement.associations.map((association) => association.tatooNumber);
          seats.push({
            id: 6,
            type: null,
            number: null,
            segmentIds: rirSegments ? this.pnrService.getSegmentNumbers(rirSegments).toString() : null
          });
        }
      }

      // For French
      if (language === 'FR-CA') {
        // Condition 1
        if (rirElement.fullNode.extendedRemark.structuredRemark.freetext === 'LE CHOIX DES SIEGES NE SE FAIT QU A L ENREGISTREMENT') {
          const rirSegments = rirElement.associations.map((association) => association.tatooNumber);
          seats.push({
            id: 1,
            type: null,
            number: null,
            segmentIds: rirSegments ? this.pnrService.getSegmentNumbers(rirSegments).toString() : null
          });
        }

        // Condition 2
        if (rirElement.fullNode.extendedRemark.structuredRemark.freetext.includes('CHOIX DE SIEGE NON DISPONIBLE')) {
          let rirSegments: any = null;
          let seatType: any = null;
          if (rirElement.associations) {
            rirSegments = rirElement.associations.map((association) => association.tatooNumber);
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
            segmentIds: rirSegments ? this.pnrService.getSegmentNumbers(rirSegments).toString() : null
          });
          continue;
        }

        // Condition 3
        if (rirElement.fullNode.extendedRemark.structuredRemark.freetext === 'CE SEGMENT A ETE MIS EN LISTE D ATTENTE') {
          const rirSegments = rirElement.associations.map((association) => association.tatooNumber);
          seats.push({
            id: 3,
            type: null,
            number: null,
            segmentIds: rirSegments ? this.pnrService.getSegmentNumbers(rirSegments).toString() : null
          });
        }

        // Condition 4
        if (rirElement.fullNode.extendedRemark.structuredRemark.freetext === 'ATTRIBUTION DES SIEGES SUR DEMANDE') {
          const rirSegments = rirElement.associations.map((association) => association.tatooNumber);
          seats.push({
            id: 4,
            type: null,
            number: null,
            segmentIds: rirSegments ? this.pnrService.getSegmentNumbers(rirSegments).toString() : null
          });
          continue;
        }

        // Condition 5
        if (rirElement.fullNode.extendedRemark.structuredRemark.freetext.includes('SURCLASSEMENT CONFIRME')) {
          const rirSegments = rirElement.associations.map((association) => association.tatooNumber);
          const seatNumber = rirElement.fullNode.extendedRemark.structuredRemark.freetext.split(' ')[4];
          seats.push({
            id: 5,
            type: null,
            number: seatNumber,
            segmentIds: rirSegments ? this.pnrService.getSegmentNumbers(rirSegments).toString() : null
          });
        }

        // Condition 6
        if (rirElement.fullNode.extendedRemark.structuredRemark.freetext.includes('SURCLASSEMENT DEMANDE')) {
          const rirSegments = rirElement.associations.map((association) => association.tatooNumber);
          seats.push({
            id: 6,
            type: null,
            number: null,
            segmentIds: rirSegments ? this.pnrService.getSegmentNumbers(rirSegments).toString() : null
          });
          continue;
        }
      }

      if (firstOnly && seats.length) {
        return seats;
      }
    }

    return this.groupSeatsFromPnr(seats);
  }

  /**
   * Check if the PNR has any seat remark in the PNR.
   * @return boolean
   */
  public hasSeatsFromPnr(): boolean {
    if (this.getSeatsFromPnr(true).length) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Group an array of seats by remark id and seat type.
   * @param seats The grouped seats.
   */
  private groupSeatsFromPnr(seats: Array<SeatModel>) {
    let uniqueSeats = new Array<SeatModel>();

    for (const seat of seats) {
      if (
        uniqueSeats.filter((item) => item.id === seat.id).length === 0 ||
        uniqueSeats.filter((item) => item.type === seat.type).length === 0
      ) {
        uniqueSeats.push(seat);
      } else {
        const duplicateSeatIndex = uniqueSeats.findIndex((item) => item.id === seat.id);
        try {
          if (uniqueSeats[duplicateSeatIndex]) {
            if (uniqueSeats[duplicateSeatIndex].segmentIds && seat.segmentIds) {
              uniqueSeats[duplicateSeatIndex].segmentIds = uniqueSeats[duplicateSeatIndex].segmentIds.concat(seat.segmentIds);
            }
            uniqueSeats[duplicateSeatIndex].type = seat.type ? seat.type : null;
            uniqueSeats[duplicateSeatIndex].number = seat.number ? seat.number : null;
          }
        } catch (error) {
          console.log('Error grouping the seats...' + error);
        }
      }
    }

    uniqueSeats = uniqueSeats.filter((uniqueSeat, i) => {
      return i === uniqueSeats.findIndex((item) => item.id === uniqueSeat.id && item.type === uniqueSeat.type);
    });

    // Add commas to the seats' segmentIds
    for (const uniqueSeat of uniqueSeats) {
      uniqueSeat.segmentIds = uniqueSeat.segmentIds ? uniqueSeat.segmentIds.split('').join(',') : null;
    }

    return uniqueSeats;
  }
}
