import { Injectable } from '@angular/core';
import { RemarksManagerService } from 'src/app/service/corporate/remarks-manager.service';
import { SeatModel } from 'src/app/models/pnr/seat.model';
import { PnrService } from '../pnr.service';

@Injectable({
  providedIn: 'root'
})
export class CorpRemarksService {
  constructor(private remarksManagerService: RemarksManagerService, private pms: PnrService) {}

  /**
   * WIP
   * US11820: Write or prepare the seats for the PNR
   * based on specific conditions. See US11820.
   *
   * @param seats Array<SeatModel>
   * @return void
   */
  public writeSeatRemarks(seats: Array<SeatModel>): void {
    for (const seat of seats) {

      // Work-around: explicitly cast seat.id to number
      seat.id = parseFloat(seat.id.toString());

      const segments = seat.segmentIds.split(',');

      for (const segment of segments) {
        const seatMap = new Map<string, string>();
        const tatooNumber = this.pms.getTatooNumberFromSegmentNumber(new Array(segment));

        if (seat.id === 1) {
          //
          seatMap.set('CASeatRule', 'ONLINECHECKIN');
          this.remarksManagerService.createPlaceholderValues(null, seatMap, tatooNumber, null, 'SEATING SUBJECT TO');
          // tslint:disable-next-line: max-line-length
          this.remarksManagerService.createPlaceholderValues(null, seatMap, tatooNumber, null, 'AIRPORT OR ONLINE CHECK IN');
          //
        } else if (seat.id === 2) {
          //
          seatMap.set('CASeatRule', 'PREFERRED');
          if (seat.type !== '') {
            this.remarksManagerService.createPlaceholderValues(null, seatMap, tatooNumber, null, 'PREFERRED SEAT UNAVAILABLE');
          } else {
            const seatType = new Map<string, string>();
            seatType.set('CaSeatType', seat.type);
            this.remarksManagerService.createPlaceholderValues(seatType, null);
          }

          this.remarksManagerService.createPlaceholderValues(null, seatMap, tatooNumber, null, 'PLEASE CHECK AGAIN AT THE GATE');
          //
        } else if (seat.id === 3) {
          //
          seatMap.set('CASeatRule', 'WAITLISTED');
          this.remarksManagerService.createPlaceholderValues(null, seatMap, tatooNumber, null, 'THIS SEGMENT HAS BEEN WAITLISTED');
          //
        } else if (seat.id === 4) {
          //
          seatMap.set('CASeatRule', 'REQUEST');
          this.remarksManagerService.createPlaceholderValues(null, seatMap, tatooNumber, null, 'SEAT ASSIGNMENTS ARE ON REQUEST');
          //
        } else if (seat.id === 5) {
          //
          seatMap.set('CASeatRule', 'CONFIRMED');
          const seatConfirmed = new Map<string, string>();
          seatConfirmed.set('CaUPFIB', seat.number);
          this.remarksManagerService.createPlaceholderValues(seatConfirmed, null, tatooNumber);
          this.remarksManagerService.createPlaceholderValues(null, seatMap, tatooNumber, null, 'UPGRADE CONFIRMED');
          //
        } else if (seat.id === 6) {
          //
          seatMap.set('CASeatRule', 'CLEARANCE');
          this.remarksManagerService.createPlaceholderValues(null, seatMap, tatooNumber, null, 'UPGRADE REQUESTED');
          this.remarksManagerService.createPlaceholderValues(
            null,
            seatMap,
            tatooNumber,
            null,
            'CHK CLEARANCE WITH AIRLINE OR AIRLINE WEBSITE'
          );
          //
        }
      }
    }
  }
}
