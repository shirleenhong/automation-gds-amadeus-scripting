export class AirlineCorporatePass {
  /**
   * US10574 #3:
   * There could be multiple RMA Corporate Pass remarks found for a single client.
   * Each Corporate Pass entry contains 2 lines of information.
   * The 1st line is the Name of the Pass (TRANSCONTL) the Fare Type (LAT), the Pass Number (0140831475422) and the Segment Cost (975.43).
   * The 2nd line is the credit card number used to Purchase the Pass and this line is only used by Aqua.
   */

  /**
   * The identification number.
   */
  id: number;

  /**
   * The airline code of the pass. Eg. AC for Air Canada.
   */
  airlineCode: string;

  /**
   * The name of the pass.
   */
  name: string;

  /**
   * The fare type of the pass.
   */
  fareType: string;

  /**
   * The pass number.
   */
  number: number;

  /**
   * The cost of the segment.
   */
  segmentCost: number;

  /**
   * The booking date of the pass. Eg. '03NOV20'.
   */
  bookingDate: string;

  /**
   * The Credit Card number used by Aqua.
   */
  creditCardNumber: number;

  /**
   * The expiration of the Credit Card. Eg. '1221'.
   */
  creditCardExpiration: string;

  /**
   * Return an array of AirlineCorporatePass with sample data.
   */
  static getSampleData(): Array<AirlineCorporatePass> {
    return [
      {
        id: 1,
        airlineCode: 'AC',
        name: 'TRANSCONTL',
        fareType: 'LAT',
        number: 1234567890123,
        segmentCost: 111.11,
        bookingDate: '24SEP19',
        creditCardNumber: null,
        creditCardExpiration: '1221'
      },
      {
        id: 2,
        airlineCode: 'AC',
        name: 'RAPIDAIR',
        fareType: 'FLE',
        number: 1234567890123,
        segmentCost: 222.22,
        bookingDate: '03NOV20',
        creditCardNumber: null,
        creditCardExpiration: '1221'
      }
    ];
  }
}
