import { Injectable } from '@angular/core';


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

  getCFLine() {
    if (this.isPNRLoaded) {
      for (const rm of this.pnrObj.rmElements) {
        if (rm.freeFlowText.indexOf('CF/-') === 0) {
          return rm.freeFlowText;
        }
      }
    }
    return '';
  }

  getSFCLineNumber() {
    if (this.isPNRLoaded) {
      for (const rm of this.pnrObj.rmElements) {
        if (rm.freeFlowText.indexOf('SFC/-') === 0) {
          return rm.elementNumber;
        }
      }
    }
    return '';
  }

  getInsuranceCancellationLineNumber() {
    if (this.isPNRLoaded) {
      for (const rm of this.pnrObj.rmElements) {
        if (rm.freeFlowText.indexOf('U12/-') === 0) {
          return rm.elementNumber;
        }
      }
    }
    return '';
  }

  getU10LineNumber() {
    if (this.isPNRLoaded) {
      for (const rm of this.pnrObj.rmElements) {
        if (rm.freeFlowText.indexOf('U10/-') === 0) {
          return rm.elementNumber;
        }
      }
    }
    return '';
  }
  getU11LineNumber() {
    if (this.isPNRLoaded) {
      for (const rm of this.pnrObj.rmElements) {
        if (rm.freeFlowText.indexOf('U11/-') === 0) {
          return rm.elementNumber;
        }
      }
    }
    return '';
  }

  getTaxLineNumber() {
    if (this.isPNRLoaded) {
      for (const rm of this.pnrObj.rmElements) {
        if (rm.freeFlowText.indexOf('TAX') === 0) {
          return rm.elementNumber;
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

  getDestinationLine() {
    if (this.isPNRLoaded) {
      for (const rm of this.pnrObj.rmElements) {
        if (rm.freeFlowText.indexOf('DE/-') === 0) {
          return rm.elementNumber;
        }
      }
    }
    return '';
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

      for (const rm of this.pnrObj.miscSegments) {
        // var endpoint = rm.fullNode.itineraryFreetext.boardpointDetail.cityCode;
        const longFreetext = rm.fullNode.itineraryFreetext.longFreetext;
        let endpoint = null;
        if (longFreetext.indexOf('/EC-') > -1) {
          endpoint = longFreetext.substr(
            longFreetext.indexOf('/EC-') + 4,
            3
          );
        }
        if (endpoint != null) {
          this.pushDestination(endpoint);
        }
      }
      return this.destinationCity;
    }
  }

  getPnrSegments() {
    if (this.isPNRLoaded) {
      // for (const rm of this.pnrObj.get) {
      //   if (rm.freeFlowText.indexOf('DE/-') === 0) {
      //     return rm.elementNumber;
      //   }
      // }
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
}
