import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RemarkGroup } from '../models/pnr/remark.group.model';
import { RemarkModel } from '../models/pnr/remark.model';
import { CfRemarkModel } from '../models/pnr/cf-remark.model';
import { debug } from 'util';

declare var PNR: any;

@Injectable({
  providedIn: 'root'
})
export class PnrService {
  pnrObj: any;
  isPNRLoaded = false;
  errorMessage = '';
  destinationCity = [{ endpoint: '' }];

  constructor() { }

  async getPNR(): Promise<void> {
    this.pnrObj = new PNR();
    await this.pnrObj.retrievePNR().then(
      (res: any) => {
        this.isPNRLoaded = true;
        this.errorMessage = 'PNR Loaded Successfully';
      },
      (error: string) => {
        this.isPNRLoaded = false;
        this.errorMessage = 'Error:' + error;
      }
    ).catch(err => { console.log(err); });
    console.log(JSON.stringify(this.pnrObj));
  }

  getRemarkLineNumber(searchText: string) {
    if (this.isPNRLoaded) {
      for (const rm of this.pnrObj.rmElements) {
        if (rm.freeFlowText.indexOf(searchText) === 0) {
          return rm.elementNumber;
        }
      }
    }
    return '';
  }

  getRemarkText(searchText: string) {
    if (this.isPNRLoaded) {
      for (const rm of this.pnrObj.rmElements) {
        if (rm.freeFlowText.indexOf(searchText) === 0) {
          return rm.freeFlowText;
        }
      }
    }
    return '';
  }

  getItineraryLanguage(): string {
    if (this.isPNRLoaded) {
      for (const rm of this.pnrObj.rmElements) {
        if (rm.freeFlowText.indexOf('LANGUAGE-') === 0) {
          return rm.freeFlowText.substr(9); // returns e.g. EN-GB, FR-FR
        }
      }
    }
    return '';
  }

  getCFLine(): CfRemarkModel {
    const cfLine = new CfRemarkModel();
    if (this.isPNRLoaded) {
      for (const rm of this.pnrObj.rmElements) {
        if (rm.freeFlowText.indexOf('CF/-') === 0) {
          cfLine.lastLetter = rm.freeFlowText.substr(-1);
          cfLine.cfa = rm.freeFlowText.substr(4, 3);
          cfLine.code = rm.freeFlowText;
          return cfLine;
        }
      }
    }

  }

  getFSLineNumber() {
    if (this.isPNRLoaded) {
      for (const rm of this.pnrObj.fsElements) {
        return rm.elementNumber;
      }
    }
    return '';
  }

  getRIILineNumber(searchText: string) {
    if (this.isPNRLoaded) {
      for (const rii of this.pnrObj.riiElements) {
         if (rii.fullNode.extendedRemark.structuredRemark.freetext.indexOf(searchText) === 0) {
              return rii.elementNumber;
         }
      }
    }
    return '';
  }

  getPassengers() {
    if (this.isPNRLoaded) {
      const passengers = [];

      for (const rm of this.pnrObj.nameElements) {
        const fname =
          rm.fullNode.enhancedPassengerData.enhancedTravellerInformation
            .otherPaxNamesDetails.givenName;
        const lname =
          rm.fullNode.enhancedPassengerData.enhancedTravellerInformation
            .otherPaxNamesDetails.surname;

        const fullname: any =
          lname +
          '-' +
          fname
            .toUpperCase()
            .replace(' MS', '')
            .replace(' MRS', '')
            .replace(' MSTR', '')
            .replace(' INF', '')
            .replace(' MR', '')
            .replace(' MISS', '');

        const passenger = {
          firstname: fname,
          surname: lname,
          id: rm.elementNumber,
          fullname
        };
        passengers.push(passenger);
      }
      return passengers;
    }
    return new Array<string>();
  }

  pushDestination(endpoint) {
    const look = this.destinationCity.find(x => x.endpoint === endpoint);
    if (look == null) {
      const destination = {
        endpoint
      };
      this.destinationCity.push(destination);
    }
  }

  getPnrDestinations() {
    if (this.isPNRLoaded) {
      for (const air of this.pnrObj.airSegments) {
        const airendpoint = air.arrivalAirport;
        this.pushDestination(airendpoint);
      }

      for (const car of this.pnrObj.auxCarSegments) {
        const carendpoint =
          car.fullNode.travelProduct.boardpointDetail.cityCode;
        this.pushDestination(carendpoint);
      }

      for (const hotel of this.pnrObj.auxHotelSegments) {
        const hotelendpoint =
          hotel.fullNode.travelProduct.boardpointDetail.cityCode;
        this.pushDestination(hotelendpoint);
      }

      for (const misc of this.pnrObj.miscSegments) {
        const miscendpoint =
          misc.fullNode.travelProduct.boardpointDetail.cityCode;
        this.pushDestination(miscendpoint);
      }
      return this.destinationCity;
    }
  }

  getPnrSegments() {
    if (this.isPNRLoaded) {
    }
    return '';
  }

  getPassiveCarSegmentNumbers() {
    const elementNumbers = new Array<number>();
    for (const rm of this.pnrObj.auxCarSegments) {
      elementNumbers.push(rm.elementNumber);
    }
    return elementNumbers;
  }

  getPassiveHotelSegmentNumbers() {
    const elementNumbers = new Array<number>();
    for (const rm of this.pnrObj.auxHotelSegments) {
      elementNumbers.push(rm.elementNumber);
    }
    return elementNumbers;
  }


  getSegmentTatooNumber() {
    const segments = new Array<any>();
    for (const air of this.pnrObj.airSegments) {
      const segment = {
        lineNo: air.elementNumber,
        tatooNo: air.tatooNumber
      };
      segments.push(segment);
    }

    for (const car of this.pnrObj.auxCarSegments) {
      const segment = {
        lineNo: car.elementNumber,
        tatooNo: car.tatooNumber
      };
      segments.push(segment);
    }

    for (const hotel of this.pnrObj.auxHotelSegments) {
      const segment = {
        lineNo: hotel.elementNumber,
        tatooNo: hotel.tatooNumber
      };
      segments.push(segment);
    }

    for (const misc of this.pnrObj.miscSegments) {
      const segment = {
        lineNo: misc.elementNumber,
        tatooNo: misc.tatooNumber
      };
      segments.push(segment);
    }

    return segments;

  }

  private getLastDate(airdate: any, lastDeptDate: Date) {
    const lairdate = new Date(airdate.substr(2, 2) + '/' + airdate.substr(0, 2) + '/' + airdate.substr(4, 2));
    if (lairdate > lastDeptDate) { } {
      lastDeptDate = lairdate;
    }
    return lastDeptDate;
  }


    getLatestDepartureDate() {
    let lastDeptDate = new Date();
    for (const air of this.pnrObj.airSegments) {
      const airdate = air.fullNode.travelProduct.product.depDate;
      lastDeptDate = this.getLastDate(airdate, lastDeptDate);
    }

    for (const car of this.pnrObj.auxCarSegments) {
      const cardate = car.fullNode.travelProduct.product.depDate;
      lastDeptDate = this.getLastDate(cardate, lastDeptDate);
    }

    for (const hotel of this.pnrObj.auxHotelSegments) {
      const hotdate = hotel.fullNode.travelProduct.product.depDate;
      lastDeptDate = this.getLastDate(hotdate, lastDeptDate);
    }

    for (const misc of this.pnrObj.miscSegments) {
      const miscdate = misc.fullNode.travelProduct.product.depDate;
      lastDeptDate = this.getLastDate(miscdate, lastDeptDate);
    }
    return lastDeptDate;
  }

}

