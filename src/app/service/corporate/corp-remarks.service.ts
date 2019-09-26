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
    debugger;

    seats.forEach((seat) => {
      debugger;
      // Condition 1

      debugger;
      const segments = seat.segmentId.split(',');

      segments.forEach((segment) => {
        const seatMap = new Map<string, string>();
        // WIP
        const tatooNumber = this.pms.getTatooNumberFromSegmentNumber(new Array(segment));
        debugger;
        if (seat.text === 'SEATING SUBJECT TO AIRPORT OR ONLINE CHECK IN') {
          //
          seatMap.set('CASeatRule', 'ONLINECHECKIN');
          this.remarksManagerService.createPlaceholderValues(null, seatMap, null, null, 'SEATING SUBJECT TO');
          // tslint:disable-next-line: max-line-length
          this.remarksManagerService.createPlaceholderValues(null, seatMap, tatooNumber, null, 'AIRPORT OR ONLINE CHECK IN');
          //
        } else if (seat.text === 'PREFERRED SEAT UNAVAILABLE. SEAT TYPE CONFIRMED') {
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
        } else if (seat.text === 'THIS SEGMENT HAS BEEN WAITLIST') {
          //
          seatMap.set('CASeatRule', 'WAITLISTED');
          this.remarksManagerService.createPlaceholderValues(null, seatMap, tatooNumber, null, 'THIS SEGMENT HAS BEEN WAITLISTED');
          //
        } else if (seat.text === 'SEAT ASSIGNMENTS ARE ON REQUEST') {
          //
          seatMap.set('CASeatRule', 'REQUEST');
          this.remarksManagerService.createPlaceholderValues(null, seatMap, tatooNumber, null, 'SEAT ASSIGNMENTS ARE ON REQUEST');
          //
        } else if (seat.text === 'UPGRADE CONFIRMED - SEAT NUMBER CONFIRMED') {
          //
          seatMap.set('CASeatRule', 'CONFIRMED');
          const seatConfirmed = new Map<string, string>();
          seatConfirmed.set('CaUPFIB', seat.number);
          this.remarksManagerService.createPlaceholderValues(seatConfirmed, null);
          this.remarksManagerService.createPlaceholderValues(null, seatMap, null, null, 'UPGRADE CONFIRMED');
          //
        } else if (seat.text === 'UPGRADE REQUESTED - CHECK CLEARANCE WITH AIRLINE OR AIRLINE WEBSITE') {
          //
          seatMap.set('CASeatRule', 'CLEARANCE');
          this.remarksManagerService.createPlaceholderValues(null, seatMap, null, null, 'UPGRADE REQUESTED');
          this.remarksManagerService.createPlaceholderValues(
            null,
            seatMap,
            tatooNumber,
            null,
            'CHK CLEARANCE WITH AIRLINE OR AIRLINE WEBSITE'
          );
          //
        }
      });
    });
  }
}
