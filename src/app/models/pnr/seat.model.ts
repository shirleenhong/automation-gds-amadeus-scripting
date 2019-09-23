import { Injectable } from '@angular/core';

@Injectable()
export class SeatModel {

    /**
     * The remark options format to be selected by
     * the user and written in the PNR.
     */
    static REMARK_OPTIONS?: Array<string> = [
        'SEATING SUBJECT TO AIRPORT OR ONLINE CHECK I',
        'PREFERRED SEAT UNAVAILABLE. [SEAT TYPE] CONFIRMED.',
        'THIS SEGMENT HAS BEEN WAITLIST',
        'SEAT ASSIGNMENTS ARE ON REQUES',
        'UPGRADE CONFIRMED - SEAT[SEAT NUMBER] CONFIRMED',
        'UPGRADE REQUESTED - CHECK CLEARANCE WITH AIRLINE OR AIRLINE WEBSITE',
    ];

    /**
     * The alpha-numeric seat number of the seat.
     */
    seatNumber: string;

    /**
     * The remark option to be written to the PNR.
     */
    text: string;

    /**
     * The type of the seat. The types are window, aisle and middle.
     */
    type: string;
}
