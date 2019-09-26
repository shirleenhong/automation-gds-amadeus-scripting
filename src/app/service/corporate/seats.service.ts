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
    'PREFERRED SEAT UNAVAILABLE. SEAT TYPE CONFIRMED',
    'THIS SEGMENT HAS BEEN WAITLIST',
    'SEAT ASSIGNMENTS ARE ON REQUEST',
    'UPGRADE CONFIRMED - SEAT NUMBER CONFIRMED',
    'UPGRADE REQUESTED - CHECK CLEARANCE WITH AIRLINE OR AIRLINE WEBSITE',
  ];
}
