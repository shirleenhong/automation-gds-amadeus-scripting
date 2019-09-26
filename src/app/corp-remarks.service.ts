import { Injectable } from '@angular/core';
import { RemarksManagerService } from './remarks-manager.service';
import { SeatModel } from 'src/app/models/pnr/seat.model';

@Injectable({
  providedIn: 'root'
})
export class CorpRemarksService {

  constructor(remarksManagerService: RemarksManagerService) { }

  /**
   * Write or prepare the seats for the PNR
   * based on specific conditions. See US11820.
   *
   * @param seats Array<SeatModel>
   * @return void
   */
  public writeSeatRemarks(seats: Array<SeatModel>): void {
    debugger;

    for (let i = 0; i <= seats.length; i++) {
      const seat = seats[i];

      if (seat.segmentId) {
        const segments = seat.segmentId.split(',');

        segments.forEach((segment) => {
          const seatMap = new Map<string, string>();
          seatMap.set('ONLINECHECKIN', 'true');
          this.remarksManager.createPlaceholderValues(seatMap, null, new Array(segment));
        });
      }

      // const seatMap = new Map<string, string>();
      // seatMap.set('SOME_PLACEHOLDER', 'SOME_VALUE');
      // this.remarksManager.createPlaceholderValues(seatMap, null, null);
    }
  }
}
