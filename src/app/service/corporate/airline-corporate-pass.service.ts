import { Injectable } from '@angular/core';
import { AirlineCorporatePass } from 'src/app/models/pnr/airline-corporate-pass.model';
import { PnrService } from 'src/app/service/pnr.service';

@Injectable({
  providedIn: 'root'
})
export class AirlineCorporatePassService {
  constructor(private pnrService: PnrService) {}

  /**
   * Get all the Airline Corporate Passes from the PNR.
   */
  public getAll(): Array<AirlineCorporatePass> {
    const airlineCorporatePassRemarks = this.pnrService.getRemarksFromGDSByRegex(/BULK/g);
    const airlineCorporatePasses = [];

    for (let i = 0; i < airlineCorporatePassRemarks.length; i = i + 2) {
      // Read from:
      // BULK2-AC/TRANSCONTL.LAT/0140831475422/975.43/24SEP19
      // XXXXXXXXXXXX1111EXP1221/30C*BULK2x

      const airlineCorporatePassRemark = airlineCorporatePassRemarks[i];

      const indicesOfForwardSlashes = [];
      for (let j = 0; j < airlineCorporatePassRemark.remarkText.length; j++) {
        if (airlineCorporatePassRemark.remarkText[j] === '/') {
          indicesOfForwardSlashes.push(j);
        }
      }

      const airlineCodeExtracted = airlineCorporatePassRemark.remarkText.substring(
        indicesOfForwardSlashes[0] - 2,
        indicesOfForwardSlashes[0]
      );
      const passNameExtracted = airlineCorporatePassRemark.remarkText.substring(
        indicesOfForwardSlashes[0] + 1,
        indicesOfForwardSlashes[1] - 4
      );
      const fareTypeExtracted = airlineCorporatePassRemark.remarkText.substring(indicesOfForwardSlashes[1] - 3, indicesOfForwardSlashes[1]);
      const passNumberExtracted = airlineCorporatePassRemark.remarkText.substring(
        indicesOfForwardSlashes[1] + 1,
        indicesOfForwardSlashes[2]
      );
      const segmentCostExtracted = airlineCorporatePassRemark.remarkText.substring(
        indicesOfForwardSlashes[2] + 1,
        indicesOfForwardSlashes[3]
      );

      airlineCorporatePasses.push({
        id: i + 1,
        airlineCode: airlineCodeExtracted,
        name: passNameExtracted,
        fareType: fareTypeExtracted,
        number: passNumberExtracted,
        segmentCost: segmentCostExtracted
      });
    }

    return airlineCorporatePasses;
  }

  /**
   * Return an array of AirlineCorporatePass with sample data.
   */
  public getSampleData(): Array<AirlineCorporatePass> {
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

  /**
   * Get an item by it's Id.
   * @param id The Id of the item.
   */
  getById(id: number): AirlineCorporatePass {
    return this.getAll().filter((x) => x.id === parseFloat(id.toString()))[0];
  }
}
