import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RemarkGroup } from '../models/pnr/remark.group.model';
import { RemarkModel } from '../models/pnr/remark.model';
import { CfRemarkModel } from '../models/pnr/cf-remark.model';

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
    );
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
      // for (const rm of this.pnrObj.miscSegments) {
      //   // var endpoint = rm.fullNode.itineraryFreetext.boardpointDetail.cityCode;
      //   const longFreetext = rm.fullNode.itineraryFreetext.longFreetext;
      //   let endpoint = null;
      //   if (longFreetext.indexOf('/EC-') > -1) {
      //     endpoint = longFreetext.substr(
      //       longFreetext.indexOf('/EC-') + 4,
      //       3
      //     );
      //   }
      //   if (endpoint != null) {
      //     this.pushDestination(endpoint);
      //   }
      // }
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

  getMISRetentionLine() {
    if (this.isPNRLoaded) {
      const segmentDates = Array<Date>();
      const datePipe = new DatePipe('en-US');
      const itineraryInfo = this.pnrObj.fullNode.response.model.output.response.originDestinationDetails.itineraryInfo;
      const misLineNumber = new Array<string>();

      itineraryInfo.forEach(x => {
        const longFreetext = x.itineraryFreetext.longFreetext;
        if (longFreetext.indexOf('ED-') !== -1) {
          let formattedDate = new Date();
          let parsedDate: string;
          parsedDate = longFreetext.substr(longFreetext.indexOf('ED-'), 8).split('-')[1];
          formattedDate = new Date(datePipe.transform(parsedDate, 'dd-MM') + '-' + formattedDate.getFullYear());
          segmentDates.push(formattedDate);
        }

        if (longFreetext.indexOf('-THANK YOU FOR CHOOSING CARLSON WAGONLIT TRAVEL') === 0) {
          misLineNumber.push(x.elementManagementItinerary.lineNumber);
        }
      });

      const lastSegmentDate = new Date(Math.max.apply(null, segmentDates));
      const oDate = new Date();
      oDate.setDate(lastSegmentDate.getDate() + 180);

      const maxDate = new Date();
      maxDate.setDate(lastSegmentDate.getDate() + 331);
      let finalDate: string;

      if (oDate.getDate() > maxDate.getDate()) {
        finalDate = datePipe.transform(maxDate, 'ddMMM');
      } else {
        finalDate = datePipe.transform(oDate, 'ddMMM');
      }

      const command = 'RU1AHK1YYZ' + finalDate + '/THANK YOU FOR CHOOSING CARLSON WAGONLIT TRAVEL';
      const MISGroup = new RemarkGroup();
      MISGroup.group = 'MIS Retention';
      MISGroup.deleteRemarkByIds = misLineNumber;
      MISGroup.cryptics.push(command);
      return MISGroup;
    } else {
      return new RemarkGroup();
    }
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
    if (lairdate > lastDeptDate) {
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

