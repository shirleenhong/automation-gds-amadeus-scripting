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
    for (const seat of seats) {
      try {
        const seatSegments = seat.segmentIds.split(',');

        // Condition 1
        for (const seatSegment of seatSegments) {
          const seatMap = new Map<string, string>();
          seatMap.set('CASeatRule', 'ONLINECHECKIN');
          this.remarksManagerService.createPlaceholderValues(null, seatMap, null, null, 'SEATING SUBJECT TO');
          this.remarksManagerService.createPlaceholderValues(
            null,
            seatMap,
            new Array(seatSegment),
            null,
            'AIRPORT OR ONLINE CHECK IN'
          );
        }
      } catch (error) {
        console.error('Could not write seat remark with error: ' + error);
      }
    }
  }
}
