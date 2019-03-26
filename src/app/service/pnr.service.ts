import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RemarkGroup } from '../models/pnr/remark.group.model';
import { RemarkModel } from '../models/pnr/remark.model';

declare var PNR: any;

@Injectable({
  providedIn: 'root'
})
export class PnrService {
  pnrObj: any;
  isPNRLoaded = false;
  errorMessage = '';
  destinationCity = [{ endpoint: '' }];

  constructor() {}

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
    const itinInfo = this.pnrObj.fullNode.response.model.output.response.originDestinationDetails.itineraryInfo;

    const lastSegment = itinInfo[itinInfo.length - 1].itineraryFreetext;
    let lastSegmentDate = lastSegment.longFreetext.substr(lastSegment.longFreetext.indexOf('ED-'), 8).split('-')[1];
    const datePipe = new DatePipe('en-US');

    let formattedDate = new Date();
    const oDate = new Date();

    lastSegmentDate = datePipe.transform(lastSegmentDate, 'dd-MM');
    formattedDate =  new Date(lastSegmentDate + '-' + formattedDate.getFullYear());
    oDate.setDate(formattedDate.getDate() + 180);

    const maxDate = new Date(formattedDate.getDate() + 331);
    let finalDate: string;

    if (oDate.getDate() > maxDate.getDate()) {
       finalDate = datePipe.transform(maxDate, 'ddMMM');
     } else {
      finalDate = datePipe.transform(oDate, 'ddMMM');
     }

    const command = 'RU1AHK1YYZ' + finalDate + '/THANK YOU FOR CHOOSING CARLSON WAGONLIT TRAVEL';
    const MISGroup = new RemarkGroup();
    MISGroup.group = 'MIS Retention';
    MISGroup.cryptics.push(command);
    return MISGroup;
    }
  }
}
