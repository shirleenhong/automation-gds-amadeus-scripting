import { Injectable } from '@angular/core';
import { R3NgModuleDef } from '@angular/compiler/src/render3/r3_module_compiler';
import { stringify } from '@angular/core/src/util';

declare var PNR: any;

@Injectable({
    providedIn: 'root',
})
export class PnrService {
    pnrObj: any;
    isPNRLoaded = false;
    errorMessage = '';
    destinationCity = [{ endpoint: "" }]

    constructor() { }

    async getPNR(): Promise<void> {
        this.pnrObj = new PNR();
        await this.pnrObj.retrievePNR().then((res: any) => {
            this.isPNRLoaded = true;
            this.errorMessage = 'PNR Loaded Successfully';

        }, (error: string) => {
            this.isPNRLoaded = false;
            this.errorMessage = 'Error:' + error;
        });

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

            for (let rm of this.pnrObj.nameElements) {
                let fname = rm.fullNode.enhancedPassengerData.enhancedTravellerInformation.otherPaxNamesDetails.givenName;
                let lname = rm.fullNode.enhancedPassengerData.enhancedTravellerInformation.otherPaxNamesDetails.surname;

                let fullname: any = lname + '-' + fname.toUpperCase().replace(' MS', '').replace(' MRS', '').replace(' MSTR', '').replace(' INF', '').replace(' MR', '').replace(' MISS', '');

                let passenger = {
                    firstname: fname,
                    surname: lname,
                    id: rm.elementNumber,
                    fullname: fullname
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
            var destination =
            {
                endpoint: endpoint
            }
            this.destinationCity.push(destination);
        }
    }

    getPnrDestinations() {

        if (this.isPNRLoaded) {
            for (let air of this.pnrObj.airSegments) {
                var airendpoint = air.arrivalAirport;
                this.pushDestination(airendpoint)
            }

            for (let rm of this.pnrObj.miscSegments) {
                // var endpoint = rm.fullNode.itineraryFreetext.boardpointDetail.cityCode;
                var longFreetext = rm.fullNode.itineraryFreetext.longFreetext;
                var endpoint = null
                if (longFreetext.indexOf('/EC-') > -1) {
                    var endpoint = longFreetext.substr(longFreetext.indexOf('/EC-') + 4, 3);
                }
                if (endpoint != null) {
                    this.pushDestination(endpoint)
                }
            }
            return this.destinationCity;


        }

    }

    getPnrSegments() {
        if (this.isPNRLoaded) {
            for (const rm of this.pnrObj.get) {
                if (rm.freeFlowText.indexOf('DE/-') === 0) {
                    return rm.elementNumber;
                }
            }
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
