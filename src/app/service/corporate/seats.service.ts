import { Injectable } from '@angular/core';
// import { PnrService } from '../pnr.service';
import { RemarksManagerService } from './remarks-manager.service';
import { SeatModel } from 'src/app/models/pnr/seat.model';

@Injectable({
  providedIn: 'root'
})
export class SeatsService {

  constructor(
    private remarksManager: RemarksManagerService,
    // private pnrService: PnrService
  ) { }

  /**
   * The types of seat.
   */
  public static TYPES: Array<string> = [
    'window',
    'aisle',
    'middle'
  ];

  /**
   * The remark options format to be selected by
   * the user and written in the PNR.
   */
  public static REMARK_OPTIONS: Array<string> = [
    'SEATING SUBJECT TO AIRPORT OR ONLINE CHECK IN',
    'PREFERRED SEAT UNAVAILABLE. [SEAT TYPE] CONFIRMED',
    'THIS SEGMENT HAS BEEN WAITLIST',
    'SEAT ASSIGNMENTS ARE ON REQUES',
    'UPGRADE CONFIRMED - SEAT[SEAT NUMBER] CONFIRMED',
    'UPGRADE REQUESTED - CHECK CLEARANCE WITH AIRLINE OR AIRLINE WEBSITE',
  ];

  /**
   * Write or prepare the seats for the PNR.
   * @param seats Array<SeatModel>
   */
  public writeSeatRemarks(seats: Array<SeatModel>): void {
    //
    for (let i = 0; i <= seats.length; i++) {
      const seatMap = new Map<string, string>();
      seatMap.set('SOME_PLACEHOLDER', 'SOME_VALUE');
      this.remarksManager.createPlaceholderValues(seatMap, null, null);
    }
  }
}
