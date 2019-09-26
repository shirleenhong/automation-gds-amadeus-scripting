import { Injectable } from '@angular/core';
import { RemarksManagerService } from 'src/app/service/corporate/remarks-manager.service';
import { SeatModel } from 'src/app/models/pnr/seat.model';

@Injectable({
  providedIn: 'root'
})
export class CorpRemarksService {
  constructor(private remarksManagerService: RemarksManagerService) {}

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
      if (seat.segmentId) {
        debugger;
        const segments = seat.segmentId.split(',');

        segments.forEach((segment) => {
          const seatMap = new Map<string, string>();
          // WIP
          seatMap.set('CASeatRule', 'ONLINECHECKIN');
          this.remarksManagerService.createPlaceholderValues(null, seatMap, null, null, 'SEATING SUBJECT TO');
          this.remarksManagerService.createPlaceholderValues(null, seatMap, new Array(segment), null, 'AIRPORT OR ONLINE CHECK IN');
        });
      }

      // Condition 2...

      // Condition 3...

      // Condition 4 and so on...
    });
  }
}
