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
    }

    getCFLine() {

        if (this.isPNRLoaded) {
            for (let rm of this.pnrObj.rmElements) {
                if (rm.freeFlowText.indexOf('CF/-') === 0) {
                    return rm.freeFlowText;
                }
            }

        }
        return '';
    }

    getFSLineNumber() {
        if (this.isPNRLoaded) {
            for (let rm of this.pnrObj.fsElements) {
                return rm.elementNumber;
            }
        }
        return '';
    }


    getPassengers() {
        if (this.isPNRLoaded) {
            let passengers = [];

            for (let rm of this.pnrObj.nameElements) {
                let fname = rm.fullNode.enhancedPassengerData.enhancedTravellerInformation.otherPaxNamesDetails.givenName;
                let lname = rm.fullNode.enhancedPassengerData.enhancedTravellerInformation.otherPaxNamesDetails.surname;
                let fullname: any = lname + '-' + fname.ToUpper().replace(' MS', '').replace(' MRS', ).replace(' MSTR', '').replace(' INF', '').replace(' MR', '').replace(' MISS', '') ;
                let passenger = {
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
            for (let rm of this.pnrObj.rmElements) {
                if (rm.freeFlowText.indexOf('DE/-') === 0) {
                    return rm.elementNumber;
                }
            }
        }
        return '';
    }


    getPnrDestinations() {
        var destinationCity = 
        [{
            endpoint
        }]
        if(this.isPNRLoaded)
        {
            for (let rm of this.pnrObj.miscSegments) {
                var endpoint = rm.fullNode.travelProduct.boardpointDetail.cityCode;
                const look = destinationCity.find(x => x.endpoint === endpoint);
                if (look == null) {
                    var destination =
                    {
                        endpoint: rm.fullNode.travelProduct.boardpointDetail.cityCode
                    }
                    destinationCity.push(destination);
                }
            }
            return destinationCity;
            
        }

    }



}
