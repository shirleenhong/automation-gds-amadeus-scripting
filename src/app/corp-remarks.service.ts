import { Injectable } from '@angular/core';
import { RemarksManagerService } from './service/corporate/remarks-manager.service';
import { SeatModel } from 'src/app/models/pnr/seat.model';

@Injectable({
  providedIn: 'root'
})
export class CorpRemarksService {

  constructor(private remarksManagerService: RemarksManagerService) { }

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

        for (let segmentsCounter = 0; segmentsCounter <= segments.length; segmentsCounter++) {
          const segment = segments[segmentsCounter];

          const seatMap = new Map<string, string>();
          seatMap.set('ONLINECHECKIN', 'true');
          this.remarksManagerService.createPlaceholderValues(seatMap, null, new Array(segment));
        }
      }

    }
  }
}
