import { Injectable } from '@angular/core';
import { RemarksManagerService } from './service/corporate/remarks-manager.service';
import { SeatModel } from 'src/app/models/pnr/seat.model';

@Injectable({
  providedIn: 'root'
})
export class CorpRemarksService {
  constructor(private remarksManagerService: RemarksManagerService) {}

  /**
   * Write or prepare the seats for the PNR
   * based on specific conditions. See US11820.
   *
   * @param seats Array<SeatModel>
   * @return void
   */
  public writeSeatRemarks(seats: Array<SeatModel>): void {
    for (let seatsCounter = 0; seatsCounter <= seats.length; seatsCounter++) {
      const seat = seats[seatsCounter];

      if (seat) {
        const segments = seat.segmentId.split(',');
        const seatMap = new Map<string, string>();
        const seatType = new Map<string, string>();

        seatType.set('CaSeatType', seat.type);
        for (let segmentsCounter = 0; segmentsCounter <= segments.length; segmentsCounter++) {
          const segment = segments[segmentsCounter];

          if (seat.text === 'SEATING SUBJECT TO AIRPORT OR ONLINE CHECK IN') {
            //
            seatMap.set('CASeatRule', 'ONLINECHECKIN');
            this.remarksManagerService.createPlaceholderValues(null, seatMap, null, null, 'SEATING SUBJECT TO');
            this.remarksManagerService.createPlaceholderValues(null, seatMap, new Array(segment), null, 'AIRPORT OR ONLINE CHECK IN');
            //
          } else if (seat.text === 'PREFERRED SEAT UNAVAILABLE. SEAT TYPE CONFIRMED') {
            //
            seatMap.set('CASeatRule', 'PREFERRED');
            if (seat.type !== '') {
              this.remarksManagerService.createPlaceholderValues(null, seatMap, new Array(segment), null, 'PREFERRED SEAT UNAVAILABLE');
            } else {
              this.remarksManagerService.createPlaceholderValues(seatType, null);
            }
            this.remarksManagerService.createPlaceholderValues(null, seatMap, new Array(segment), null, 'PLEASE CHECK AGAIN AT THE GATE');
            //
          } else if (seat.text === 'THIS SEGMENT HAS BEEN WAITLIST') {
            //
            seatMap.set('CASeatRule', 'WAITLISTED');
            this.remarksManagerService.createPlaceholderValues(null, seatMap, null, null, 'SEATING SUBJECT TO');
            this.remarksManagerService.createPlaceholderValues(null, seatMap, new Array(segment), null, 'AIRPORT OR ONLINE CHECK IN');
            //
          } else if (seat.text === 'SEAT ASSIGNMENTS ARE ON REQUEST') {
            //
            seatMap.set('CASeatRule', 'REQUEST');
            this.remarksManagerService.createPlaceholderValues(null, seatMap, null, null, 'SEATING SUBJECT TO');
            this.remarksManagerService.createPlaceholderValues(null, seatMap, new Array(segment), null, 'AIRPORT OR ONLINE CHECK IN');
            //
          } else if (seat.text === 'UPGRADE CONFIRMED - SEAT NUMBER CONFIRMED') {
            //
            seatMap.set('CASeatRule', 'CONFIRMED');
            this.remarksManagerService.createPlaceholderValues(null, seatMap, null, null, 'SEATING SUBJECT TO');
            this.remarksManagerService.createPlaceholderValues(null, seatMap, new Array(segment), null, 'AIRPORT OR ONLINE CHECK IN');
            //
          } else if (seat.text === 'UPGRADE REQUESTED - CHECK CLEARANCE WITH AIRLINE OR AIRLINE WEBSITE') {
            //
            seatMap.set('CASeatRule', 'CLEARANCE');
            this.remarksManagerService.createPlaceholderValues(null, seatMap, null, null, 'SEATING SUBJECT TO');
            this.remarksManagerService.createPlaceholderValues(null, seatMap, new Array(segment), null, 'AIRPORT OR ONLINE CHECK IN');
            //
          }
        }
      }
    }
  }
}
