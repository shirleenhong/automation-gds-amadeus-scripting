export class SeatModel {

    /**
     * The remark Id to be written to the PNR.
     * See SeatModel.REMARK_OPTIONS
     */
    remarkId: number;

    /**
     * The type of the seat. The types are window, aisle and middle.
     */
    type: string;

    /**
     * The alpha-numeric seat number of the seat.
     */
    number: string;

    /**
     * The segment identifications associated to the seat.
     */
    segmentIds: string;
}
