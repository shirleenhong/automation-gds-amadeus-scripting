import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeatsService {

  /**
   * The remark options format to be selected by
   * the user and written in the PNR.
   */
  public REMARK_OPTIONS: Array<string> = [
    'SEATING SUBJECT TO AIRPORT OR ONLINE CHECK I',
    'PREFERRED SEAT UNAVAILABLE. [SEAT TYPE] CONFIRMED.',
    'THIS SEGMENT HAS BEEN WAITLIST',
    'SEAT ASSIGNMENTS ARE ON REQUES',
    'UPGRADE CONFIRMED - SEAT[SEAT NUMBER] CONFIRMED',
    'UPGRADE REQUESTED - CHECK CLEARANCE WITH AIRLINE OR AIRLINE WEBSITE',
  ];

  constructor() { }
}
