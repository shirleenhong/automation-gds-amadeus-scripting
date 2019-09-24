export class SeatModel {

    /**
     * The alpha-numeric seat number of the seat.
     */
    number: string;

    /**
     * The remark option to be written to the PNR.
     */
    text: string;

    /**
     * The type of the seat. The types are window, aisle and middle.
     */
    type: string;
}
