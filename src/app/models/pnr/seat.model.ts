export class SeatModel {

    /**
     * The remark Id to be written to the PNR.
     * See SeatModel.REMARK_OPTIONS
     */
    public remarkId: number;

    /**
     * The type of the seat. The types are window, aisle and middle.
     */
    public type: string;

    /**
     * The alpha-numeric seat number of the seat.
     */
    public number: string;

    /**
     * The segment identifications associated to the seat.
     */
    public segmentIds: string;
}
