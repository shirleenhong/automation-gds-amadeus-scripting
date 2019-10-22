export class SeatModel {
  /**
   * The id of the seat to be written to the PNR.
   * See SeatModel.REMARK_OPTIONS for values
   */
  public id: number;

  /**
   * The type of the seat. The types are WINDOW, AISLE and MIDDLE.
   */
  public type: string;

  /**
   * The alpha-numeric seat number of the seat.
   */
  public number: string;

  /**
   * The comma-delimited segment identifications associated to the seat.
   */
  public segmentIds: string;
}
