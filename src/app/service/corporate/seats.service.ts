import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeatsService {

  constructor() { }

  /**
   * The types of seat.
   */
  public static TYPES: Array<string> = [
    'WINDOW',
    'AISLE',
    'MIDDLE'
  ];

  /**
   * The remark options the user selects
   * from and to be written in the PNR.
   */
  public static REMARK_OPTIONS: Array<{id: number, text: string}> = [
    { id: 1, text: 'SEATING SUBJECT TO AIRPORT OR ONLINE CHECK IN' },
    { id: 2, text: 'PREFERRED SEAT UNAVAILABLE. SEAT TYPE CONFIRMED' },
    { id: 3, text: 'THIS SEGMENT HAS BEEN WAITLIST' },
    { id: 4, text: 'SEAT ASSIGNMENTS ARE ON REQUEST' },
    { id: 5, text: 'UPGRADE CONFIRMED - SEAT NUMBER CONFIRMED' },
    { id: 6, text: 'UPGRADE REQUESTED - CHECK CLEARANCE WITH AIRLINE OR AIRLINE WEBSITE' },
  ];
}
