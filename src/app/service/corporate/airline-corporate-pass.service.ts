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
        indicesOfForwardSlashes[3] - 1
      );

      airlineCorporatePasses.push({
        airlineCode: airlineCodeExtracted,
        name: passNameExtracted,
        fareType: fareTypeExtracted,
        number: passNumberExtracted,
        segmentCost: segmentCostExtracted
      });
    }

    return airlineCorporatePasses;
  }
}
