import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CfRemarkModel } from '../models/pnr/cf-remark.model';
import { MatrixAccountingModel } from '../models/pnr/matrix-accounting.model';
import { MatrixReceiptModel } from '../models/pnr/matrix-receipt.model';
import { AmountPipe } from '../pipes/amount.pipe';
import { PassiveSegmentsModel } from '../models/pnr/passive-segments.model';
import { LeisureFeeModel } from '../models/pnr/leisure-fee.model';
import { ExchangeTicketModel } from '../models/pnr/exchange-ticket.model';
import { UtilHelper } from '../helper/util.helper';




declare var PNR: any;
declare var smartScriptSession: any;

@Injectable({
    providedIn: 'root'
})
export class PnrService {
    pnrObj: any;
    tstObj = [];
    isPNRLoaded = false;
    errorMessage = '';
    destinationCity = [{ endpoint: '', startpoint: '' }];
    cfLine: CfRemarkModel;
    segments = [];
    amountPipe = new AmountPipe();
    PCC = '';
    uid = '';
    pnrResponse: any;
    clientSubUnitGuid: string;
    exchangeTatooNumbers = [];
    agentSign = '';
    agentFirstName = '';
    agentLastName = '';
    constructor(private utilHelper: UtilHelper) { }

    async getPNR(): Promise<void> {
        this.cfLine = null;
        this.clientSubUnitGuid = null;
        this.pnrObj = new PNR();
        await this.pnrObj
            .retrievePNR()
            .then(
                async (res) => {
                    this.isPNRLoaded = true;
                    this.errorMessage = 'PNR Loaded Successfully';
                    this.pnrResponse = res.response.model.output.response;
                    this.getExchangeTatooNumbers();
                    await this.getTST();
                    this.getCFLine();
                    this.getAgentInfo();
                },
                (error: string) => {
                    this.isPNRLoaded = false;
                    this.errorMessage = 'Error: ' + error;
                }
            )
            .catch((err) => {
                console.log(err);
            });
        await this.getPCC();
        // this.getRecordLocator();
        console.log(JSON.stringify(this.pnrObj));
    }

    async getTST(): Promise<void> {
        this.tstObj = new Array<any>();
        const attributeDetails = {
            attributeType: 'ALL'
        };

        const displayMode = {
            attributeDetails
        };

        const displayElement = {
            displayMode
        };

        await smartScriptSession
            .requestService('ws.displayTST_v14.1', displayElement)
            .then(
                (tst) => {
                    if ( tst.response.model.output.response) {
                    this.tstObj = tst.response.model.output.response.fareList;
                    }
                    this.errorMessage = 'TST Loaded Successfully';
                },
                (error: string) => {
                    this.errorMessage = 'Error: ' + error;
                }
            )
            .catch((err) => {
                console.log(err);
            });
        console.log(JSON.stringify(this.tstObj));
    }

    isRbpRbm() {
        if (!this.cfLine) {
            this.cfLine = this.getCFLine();
        }
        if (this.cfLine.cfa === 'RBP' || this.cfLine.cfa === 'RBM') {
            return true;
        }
        return false;
    }

    isLilly() {
        if (!this.cfLine) {
            this.cfLine = this.getCFLine();
        }
        if (this.cfLine.cfa === 'PX1' || this.cfLine.cfa === 'ZX4') {
            return true;
        }
        return false;
    }

    async getPCC() {
        await smartScriptSession.requestService('usermanagement.retrieveUser').then((x) => {
            this.PCC = x.ACTIVE_OFFICE_ID;
            this.uid = x.USER_ALIAS;
        });
    }

    getAgentIdCreatedPnr() {
        return this.pnrObj.header.agentIdCreated;
    }

    /** Get Agent Information */
    getAgentInfo(): void {
        smartScriptSession.retrieveUser().then(res => {
            // {
            //     'OCTX': '',
            //     'OFFICE_ID': 'NCE1A0950',
            //     'AGENT_SIGN': '1105',
            //     'AGENT_INITIALS': 'BG',
            //     'DUTY_CODE': 'AS',
            //     'USER_ALIAS': 'RFEYNMAN',
            //     'ORGANIZATION': '1A',
            //     'FIRST_NAME': 'Richard',
            //     'LAST_NAME': 'FEYNMAN',
            //     'LANGUAGE_PREF': 'EN',
            //     'SS_RIGHTS': []
            //   }

            if (res) {
                this.agentSign = res.AGENT_SIGN;
                this.agentFirstName = res.FIRST_NAME;
                this.agentLastName = res.LAST_NAME;
            }
        });
    }

    getRemarkLineNumber(searchText: string, type?: string) {
        if (this.isPNRLoaded) {
            let remarksList = this.pnrObj.rmElements;
            if (type === 'RI') {
                remarksList = this.pnrObj.riElements;
            }
            if (remarksList) {
                for (const rm of remarksList) {
                    if (rm.freeFlowText.indexOf(searchText) === 0) {
                        return rm.elementNumber;
                    }
                }
            }
        }
        return '';
    }

    getRemarkLineNumberStartsWith(searchText: string, type?: string) {
        if (this.isPNRLoaded) {
            let remarksList = this.pnrObj.rmElements;
            if (type === 'RI') {
                remarksList = this.pnrObj.riElements;
            }
            if (remarksList) {
                for (const rm of remarksList) {
                    if (rm.freeFlowText.startsWith(searchText)) {
                        return rm.elementNumber;
                    }
                }
            }
        }
        return '';
    }

    getRemarkLineNumbers(searchText: string, type?: string) {
        const lineNos: Array<string> = [];
        if (this.isPNRLoaded) {
            let remarksList = this.pnrObj.rmElements;
            if (type === 'RI') {
                remarksList = this.pnrObj.riElements;
            }
            if (type === 'AM') {
                remarksList = this.pnrObj.amElements;
            }

            for (const rm of remarksList) {
                if (rm.freeFlowText && rm.freeFlowText.indexOf(searchText) === 0) {
                    lineNos.push(rm.elementNumber);
                }
                if (type === 'AM') {
                    lineNos.push(rm.elementNumber);
                }
            }
        }
        return lineNos;
    }

    getAPELineNumbers(searchText: string) {
        const lineNos: Array<string> = [];
        if (this.isPNRLoaded) {
            const apList = this.pnrObj.apElements;
            for (const ap of apList) {
                if (ap.freeFlowText.indexOf(searchText.split('APE')[1].trim()) === 0) {
                    lineNos.push(ap.elementNumber);
                }
            }
        }
        return lineNos;
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

    getFIElementText(searchText: string) {
        if (this.isPNRLoaded) {
            for (const fi of this.pnrObj.fiElements) {
                if (fi.fullNode.otherDataFreetext.longFreetext.indexOf(searchText) === 0) {
                    return fi.fullNode.otherDataFreetext.longFreetext;
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
        if (!this.cfLine) {
            const cfLine = new CfRemarkModel();
            if (this.isPNRLoaded) {
                for (const rm of this.pnrObj.rmElements) {
                    if (rm.freeFlowText.indexOf('CF/-') === 0) {
                        cfLine.lastLetter = rm.freeFlowText.substr(-1);
                        cfLine.cfa = rm.freeFlowText.substr(4, 3);
                        cfLine.code = rm.freeFlowText;
                        this.cfLine = cfLine;
                        return cfLine;
                    }
                }
            }
            return cfLine;

        } else {
            return this.cfLine;
        }
    }

    extractOidFromBookRemark(): string {
        // const remarks = this.pnrService.getRemarksFromGDSByRegex(/BOOK-/g);
        const BOOK_REMARK_PREFIX = 'BOOK-';
        const TKT_PREFIX = 'TKT-';
        const remarks = this.getRemarkText(BOOK_REMARK_PREFIX);
        let oid = null;
        const remarkSplitted: Array<string> = remarks.split('/');
        for (const ctrRemarkSplit of remarkSplitted) {
            if (ctrRemarkSplit.match(TKT_PREFIX)) {
                oid = ctrRemarkSplit.replace(TKT_PREFIX, '');
                break;
            }
        }
        return oid;
    }
    /**
     * Check if PNR has OBT remark.
     * @return boolean
     */
    isOBT(): boolean {
        if (this.getRemarkText('EB/-') !== '') {
            return true;
        } else {
            return false;
        }
    }

    getFSRemark() {
        if (this.isPNRLoaded) {
            for (const rm of this.pnrObj.fsElements) {
                return rm.fullNode.otherDataFreetext.longFreetext;
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

    getRIRLineNumber(searchText: string) {
        if (this.isPNRLoaded) {
            for (const rii of this.pnrObj.rirElements) {
                const text = rii.fullNode.extendedRemark.structuredRemark.freetext;
                if (text.indexOf(searchText) === 0) {
                    return rii.elementNumber;
                }
            }
        }
        return '';
    }

    getRIRLineNumbers(searchText: string) {
        const lines = [];
        if (this.isPNRLoaded) {
            for (const rii of this.pnrObj.rirElements) {
                const text = rii.fullNode.extendedRemark.structuredRemark.freetext;
                if (text.indexOf(searchText) === 0) {
                    lines.push(rii.elementNumber);
                }
            }
        }
        return lines;
    }

    getTkLineNumber(): number {
        let tkLineNumber;

        if (this.pnrObj.tkElements && this.pnrObj.tkElements[0]) {
            tkLineNumber = this.pnrObj.tkElements[0].elementNumber;
        } else {
            tkLineNumber = -1;
        }

        return tkLineNumber;
    }

    getPassengers() {
        if (this.isPNRLoaded) {
            const passengers = [];

            for (const rm of this.pnrObj.nameElements) {
                const fname = rm.firstName;
                const lname = rm.lastName;

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
                    tatooNo: rm.tatooNumber,
                    fullname
                };
                passengers.push(passenger);
            }
            return passengers;
        }
        return new Array<string>();
    }

    pushDestination(endpoint, startpoint?) {
        const look = this.destinationCity.find((x) => x.endpoint === endpoint);
        if (look == null) {
            const destination = {
                endpoint,
                startpoint
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
                const carendpoint = car.fullNode.travelProduct.boardpointDetail.cityCode;
                this.pushDestination(carendpoint);
            }

            for (const hotel of this.pnrObj.auxHotelSegments) {
                const hotelendpoint = hotel.fullNode.travelProduct.boardpointDetail.cityCode;
                this.pushDestination(hotelendpoint);
            }

            for (const misc of this.pnrObj.miscSegments) {
                const miscendpoint = misc.fullNode.travelProduct.boardpointDetail.cityCode;
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
        return this.getPassiveSegmentTypes('CAR');
    }

    getPassiveSegmentTypes(segmentType: string) {
        const elements = new Array<any>();

        this.getSegmentList().forEach((c) => {
            if (c.segmentType === segmentType) {
                elements.push(c);
            }
        });

        return elements;
    }

    getPassiveHotelSegmentNumbers() {
        return this.getPassiveSegmentTypes('HTL');
    }

    getPassiveAirSegments(lineNo: any) {
        const elements = new Array<any>();

        this.getSegmentList().forEach((c) => {
            if (lineNo === '') {
                if (c.segmentType === 'AIR') {
                    elements.push({
                        airlineCode: c.airlineCode,
                        lineNo: c.lineNo,
                        freeText: c.longFreeText.toUpperCase()
                    });
                }
            } else {
                if (c.segmentType === 'AIR' && c.lineNo === lineNo) {
                    elements.push({
                        airlineCode: c.airlineCode,
                        lineNo: c.lineNo,
                        freeText: c.longFreeText.toUpperCase()
                    });
                }
            }
        });

        return elements;
    }

    getPassiveAirSegmentNumbers() {
        const elementNumbers = new Array<number>();
        for (const rm of this.pnrObj.airSegments) {
            elementNumbers.push(rm.elementNumber);
        }
        return elementNumbers;
    }

    getSegmentList() {
        this.segments = [];
        for (const air of this.pnrObj.airSegments) {
            this.getSegmentDetails(air, 'AIR');
        }

        for (const car of this.pnrObj.auxCarSegments) {
            this.getSegmentDetails(car, 'CAR');
        }

        for (const car of this.pnrObj.carSegments) {
            this.getSegmentDetails(car, 'CCR');
        }


        for (const hotel of this.pnrObj.auxHotelSegments) {
            this.getSegmentDetails(hotel, 'HTL');
        }

        for (const hotel of this.pnrObj.hotelSegments) {
            this.getSegmentDetails(hotel, 'HHL');
        }

        for (const misc of this.pnrObj.miscSegments) {
            if (
                misc.fullNode.itineraryFreetext.longFreetext.indexOf('THANK YOU FOR CHOOSING CARLSON') === -1 &&
                misc.fullNode.itineraryFreetext.longFreetext.indexOf('PNR CANCELLED') === -1 &&
                misc.fullNode.itineraryFreetext.longFreetext.indexOf('CWT RETENTION SEGMENT') === -1
            ) {
                this.getSegmentDetails(misc, 'MIS');
            }
        }
        console.log(this.segments);
        return this.segments;
    }

    private formatDate(tempDate) {
        const lairdate = new Date(tempDate.substr(2, 2) + '/' + tempDate.substr(0, 2) + '/' + tempDate.substr(4, 2));
        const datePipe = new DatePipe('en-US');
        const tdate = datePipe.transform(lairdate, 'ddMMM');
        return tdate;
    }

    private getSegmentDetails(elem: any, type: string) {
        let elemText = '';
        let elemStatus = '';
        let elemairlineCode = '';
        let elemdepdate = '';
        let elemcitycode = '';
        let flightNumber = '';
        let arrivalAirport = '';
        let departureTime = '';
        let departureDate = '';
        let arrivalTime = '';
        let arrivalDate = '';
        let classservice = '';
        let flongtext = '';
        let controlNumber = '';
        let airType = '';
        let segType = type;
        let passiveType = '';
        let hotelChainCode = '';
        let elemVendorCode = '';
        if (type === 'HHL') {
            segType = 'HTL';
        }

        if (segType === 'AIR') {
            airType = 'ACTIVE';
            elemText =
                elem.airlineCode +
                elem.flightNumber +
                ' ' +
                elem.class +
                this.formatDate(elem.departureDate) +
                ' ' +
                elem.departureAirport +
                elem.arrivalAirport +
                ' ' +
                elem.status +
                elem.bookedQuantity +
                ' ' +
                elem.departureTime +
                ' ' +
                elem.arrivalTime +
                ' ' +
                this.formatDate(elem.arrivalDate) +
                ' ' +
                elem.airlineReference;
            elemStatus = elem.status;
            elemairlineCode = elem.airlineCode;
            elemdepdate = elem.departureDate;
            elemcitycode = elem.departureAirport;
            flightNumber = elem.flightNumber;
            arrivalAirport = elem.arrivalAirport;
            departureTime = elem.departureTime;
            departureDate = elem.departureDate;
            arrivalTime = elem.arrivalTime;
            arrivalDate = elem.arrivalDate;
            classservice = elem.class;
            controlNumber = elem.airlineReference;
            if (elem.fullNode.itineraryReservationInfo) {
                airType = 'PASSIVE';
            }
        } else if (segType === 'CCR') {
            departureTime = elem.pickupTime;
            departureDate = elem.pickupDate;
            arrivalTime = elem.dropoffTime;
            arrivalDate = elem.dropoffDate;
            controlNumber = elem.confirmationNumber;
            elemStatus = elem.status;
            elemcitycode = elem.fullNode.travelProduct.boardpointDetail.cityCode;
            elemText = elem.carType[0] + ' ' + elem.carCompanyCode + ' ' +
                elemStatus + elem.quantity + ' ' + elem.location + ' ' +
                this.formatDate(elem.pickupDate);
            elemVendorCode = elem.fullNode.travelProduct.companyDetail.identification;

        } else {
            const fullnodetemp = elem.fullNode.travelProduct;
            elemText =
                type +
                ' ' +
                fullnodetemp.companyDetail.identification +
                ' ' +
                elem.fullNode.relatedProduct.status +
                elem.fullNode.relatedProduct.quantity +
                ' ' +
                fullnodetemp.boardpointDetail.cityCode +
                ' ' +
                this.formatDate(fullnodetemp.product.depDate);
            elemStatus = elem.fullNode.relatedProduct.status;
            elemdepdate = fullnodetemp.product.depDate;
            if (!departureDate) {
                departureDate = elemdepdate;
            }
            arrivalDate = fullnodetemp.product.arrDate;
            elemcitycode = fullnodetemp.boardpointDetail.cityCode;
            let longText = '';
            if (elem.fullNode.itineraryFreetext) {
                longText = elem.fullNode.itineraryFreetext.longFreetext;
            } else if (this.pnrObj.miscSegments.fullNode) {

                longText = this.pnrObj.miscSegments.fullNode.itineraryFreetext.longFreetext;
            }
            elemVendorCode = this.getVendorCodeForPassiveCar(longText);
            if (type !== 'HHL') {
                flongtext = longText;
                // passiveType = flongtext.substr(2, 7);
            } else {
                flongtext = elem.hotelName;
                // passiveType = 'TYP-HHL';
            }

            hotelChainCode = elem.chainCode ? elem.chainCode : '';

            flongtext.split('/').forEach(t => {
                if (t.startsWith('ST')) {
                    departureTime = t.replace('ST-', '');
                } else  if (t.startsWith('ET')) {
                    arrivalTime = t.replace('ET-', '');
                } else  if (t.startsWith('ED')) {
                    arrivalDate = this.convertDDYYY(t.replace('ED-', ''));
                }
            });
        }

        if (type === 'MIS') {
            passiveType = flongtext.substr(2, 7);
        } else {
            passiveType = type;
        }
        const segment = {
            lineNo: elem.elementNumber,
            tatooNo: elem.tatooNumber,
            status: elemStatus,
            segmentType: segType,
            longFreeText: elemText,
            airlineCode: elemairlineCode,
            freetext: flongtext,
            deptdate: elemdepdate,
            cityCode: elemcitycode,
            arrivalStation: arrivalAirport,
            flightNumber,
            arrivalAirport,
            departureTime,
            departureDate,
            arrivalTime,
            arrivalDate,
            classservice,
            controlNumber,
            airType,
            passive: passiveType,
            isPassive: (segType === 'CAR' || type === 'HTL' || (segType === 'AIR' && elemStatus === 'GK')),
            passengerNo: this.getPassengerAssocNumbers(elem.associations),
            hotelChainCode,
            vendorCode: elemVendorCode
        };
        this.segments.push(segment);
    }

    private getVendorCodeForPassiveCar(longFreeText) {
        let vendorCode = '';
        const vendorRegex = /(?<=SUC-)[a-zA-Z]{2}/g;
        const match = longFreeText.match(vendorRegex);
        if (match && match[0]) {
            vendorCode = match[0];
        }

        return vendorCode;
    }

    private getLastDate(airdate: any, lastDeptDate: Date) {
        const lairdate = new Date(airdate.substr(2, 2) + '/' + airdate.substr(0, 2) + '/' + airdate.substr(4, 2));
        if (lairdate > lastDeptDate) {
        }
        {
            lastDeptDate = lairdate;
        }
        return lastDeptDate;
    }

    checkTST(): boolean {
        if (this.pnrObj.fullNode.response.model.output.response.tstData !== undefined) {
            return true;
        } else {
            return false;
        }
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

    convertDDYYY(date) {
        // convert ddYYY to dd/mm/yy
        const dd = date.substr(0, 2);
        const m = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        const month = (m.indexOf(date.substr(2, 3)) + 1).toString().padStart(2, '0') ;
        const nowMonth  = (new Date().getMonth()) + 1;
        let year = new Date().getFullYear();
        if (Number(month) < nowMonth) {
            year += 1;
        }
        return dd + month + year.toString().substr(2, 2);

    }

    getRemarksFromGDS() {
        const remarks = new Array<any>();
        if (this.isPNRLoaded) {
            for (const rm of this.pnrObj.rmElements) {
                const rem = {
                    remarkText: rm.fullNode.miscellaneousRemarks.remarks.freetext,
                    category: rm.fullNode.miscellaneousRemarks.remarks.type,
                    lineNo: rm.elementNumber
                };
                remarks.push(rem);
            }
        }
        return remarks;
    }

    getAllUdidRemarks() {
        return this.getRemarksFromGDSByRegex(/U[0-9]{1,2}\/-(?<value>(.*))/g);
    }

    getRemarksFromGDSByRegex(regex, category?) {
        const remarks = new Array<any>();
        if (this.isPNRLoaded) {
            let arr = [];
            switch (category) {
                case 'RIR':
                    arr = this.pnrObj.rirElements;
                    break;
                default:
                    arr = this.pnrObj.rmElements;
                    break;
            }

            for (const rm of arr) {
                const rem = {
                    remarkText: rm.fullNode.miscellaneousRemarks.remarks.freetext,
                    category: rm.fullNode.miscellaneousRemarks.remarks.type,
                    lineNo: rm.elementNumber,
                    tattooNumber: rm.tatooNumber,
                    value: '',
                    segments: [],
                    qualifier: rm.category
                };

                // if (rm.associations !== undefined && rm.associations && rm.associations.length > 0) {
                if (rm.associations) {
                    rm.associations.forEach((element) => {
                        rem.segments.push(element.tatooNumber);
                    });
                }
                const match = regex.exec(rem.remarkText);
                regex.lastIndex = 0;
                if (match !== null) {
                    if (match.groups !== undefined && match.groups.value !== undefined) {
                        rem.value = match.groups.value;
                    }
                    remarks.push(rem);
                }
            }
        }
        return remarks;
    }

    getRirRemarksFromGDS() {
        const remarks = new Array<any>();
        if (this.isPNRLoaded) {
            for (const ri of this.pnrObj.rirElements) {
                const rem = {
                    remarkText: ri.fullNode.miscellaneousRemarks.remarks.freetext,
                    category: ri.fullNode.miscellaneousRemarks.remarks.type,
                    lineNo: ri.elementNumber
                };
                remarks.push(rem);
            }
        }
        return remarks;
    }

    getRirRemarkText(searchText: string) {
        if (this.isPNRLoaded) {
            for (const ri of this.pnrObj.rirElements) {
                const text = ri.fullNode.miscellaneousRemarks.remarks.freetext;
                if (text.indexOf(searchText) === 0) {
                    return ri;
                }
            }
        }
        return '';
    }

    getUDIDText(searchText: string) {
        if (this.isPNRLoaded) {
            for (const ri of this.pnrObj.rmElements) {
                if (ri.fullNode.miscellaneousRemarks.remarks.freetext.indexOf(searchText) === 0) {
                    // return ri.fullNode.miscellaneousRemarks.remarks.freetext;
                    return ri;
                }
            }
        }
        return '';
    }

    getMatrixReceiptLineNumbers() {
        return this.getRemarkLineNumbers('REC/-RLN');
    }

    getMatrixAccountingLineNumbers() {
        return this.getRemarkLineNumbers('MAC/-');
    }

    getSFCRemarks(): Array<LeisureFeeModel> {
        const fees = new Array<LeisureFeeModel>();
        let taxProvince = this.getRemarkText('TAX-');

        if (taxProvince !== '') {
            taxProvince = taxProvince.substr(taxProvince.indexOf('-') + 1);
        }

        for (const rm of this.pnrObj.rmElements) {
            if (rm.freeFlowText.indexOf('SFC/-') === 0) {
                const fee = new LeisureFeeModel();
                const rems = rm.freeFlowText.split('/-');
                fee.segmentAssoc = '2';
                fee.passengerNo = this.getPassengerAssocNumbers(rm.associations);
                rems.forEach((r) => {
                    if (r.indexOf('-') >= 0) {
                        const arr = r.split('-');
                        switch (arr[0]) {
                            case 'FA':
                                const type = arr[1].substr(0, 1);
                                switch (type) {
                                    case 'C':
                                        fee.segmentAssoc = '4';
                                        break;
                                    case 'H':
                                        fee.segmentAssoc = '3';
                                        break;
                                    case 'T':
                                        fee.segmentAssoc = '1';
                                        break;
                                }
                                fee.segmentNum = arr[1].replace(type, '');
                                break;
                            case 'FLN':
                                fee.fln = arr[1].replace('F', '');
                                break;
                            case 'AMT':
                                fee.amount = arr[1].replace('CAD', '');
                                break;
                            case 'FOP':
                                if (arr[1] === 'CK') {
                                    fee.paymentType = 'K';
                                } else {
                                    fee.paymentType = 'C';
                                    fee.vendorCode = arr[1].substr(2, 2);
                                    fee.ccNo = arr[1].substr(4);
                                }
                                break;
                            case 'EXP':
                                fee.expDate = arr[1].substr(0, 2) + '/' + arr[1].substr(2, 2);
                                break;
                        }
                    }
                    fee.address = (fee.fln === '1') ? taxProvince : '';
                });
                fees.push(fee);
            }
        }

        return fees;
    }

    getAccountingRemarks(): Array<MatrixAccountingModel> {
        const matrixModels = new Array<MatrixAccountingModel>();
        const apays = this.getApayRirRemarkLines();
        let macNum = '';

        for (const rm of this.pnrObj.rmElements) {
            if (rm.freeFlowText.indexOf('MAC/-') === 0) {
                let model: MatrixAccountingModel;
                macNum = rm.freeFlowText.match(/LK-MAC[0-9]*/g);
                if (macNum !== undefined && macNum !== '') {
                    macNum = macNum.toString().replace('LK-MAC', '');
                    model = matrixModels.find((x) => x.tkMacLine === Number(macNum));
                }

                if (model === null || model === undefined) {
                    model = new MatrixAccountingModel();
                    matrixModels.push(this.extractMatrixAccount(model, rm.freeFlowText));
                } else {
                    this.extractMatrixAccount(model, rm.freeFlowText);
                }
                if (model.bsp === undefined || model.bsp == null || model.bsp === '') {
                    model.bsp = '1';
                } // default
                if (rm.associations !== null && rm.associations !== undefined && model !== undefined) {
                    model.segmentNo = this.getAssocNumbers(rm.associations);
                    model.passengerNo = this.getPassengerAssocNumbers(rm.associations);
                    model.passRelate = false;
                    if (model.passengerNo) {
                        model.passRelate = true;
                    }
                    if (model.supplierCodeName === 'ACJ') {
                        model = this.extractCanadaPass(model, rm.associations);
                    } else {
                        if (!model.accountingTypeRemark) {
                            const tkt = this.getRemarksFromGDSByRegex(/\*NE\/-EX-Y\/-OTK-(?<originalTicket>.*)/g);
                            if (tkt.length > 0) {
                                model.originalTktLine = tkt[0].remarkText.replace('*NE/-EX-Y/-OTK-', '');
                                model.accountingTypeRemark = 'NAE';
                            }
                        }

                        model.penaltyBaseAmount = '0.00';
                        model.penaltyGst = '0.00';
                        model.penaltyHst = '0.00';
                        model.penaltyQst = '0.00';
                    }

                    if (model.supplierCodeName === 'A22') {
                        this.extractExchange(model, matrixModels);
                    }

                    if (apays !== null && apays.length > 0) {
                        apays.forEach((x) => {
                            if (x.segments === model.segmentNo) {
                                model.bsp = '2';
                                model.descriptionapay = x.remark
                                    .match(/PAID (.*) CF-/g)
                                    .toString()
                                    .replace('CF-', '')
                                    .replace('PAID ', '')
                                    .trim();
                                model.accountingTypeRemark = '0';
                            }
                        });
                    }
                }

                if (model.supplierCodeName === 'MLF') {
                    model.accountingTypeRemark = 'INS';
                    model.bsp = '3';
                }
            }
        }
        return matrixModels;
    }

    extractExchange(model, matrixModels) {
        const tkt = this.getRemarksFromGDSByRegex(/\*NE\/-EX-Y\/-OTK-(?<originalTicket>.*)/g);
        if (tkt.length > 0) {
            const indx = matrixModels.indexOf(model);
            const acy = matrixModels[indx - 1];
            acy.originalTktLine = tkt[0].remarkText.replace('*NE/-EX-Y/-OTK-', '');
            acy.penaltyBaseAmount = model.baseAmount;
            acy.penaltyGst = model.gst;
            acy.penaltyHst = model.hst;
            acy.penaltyQst = model.qst;
            acy.accountingTypeRemark = 'NAE';
            model.originalTktLine = acy.originalTktLine;
            model.accountingTypeRemark = 'NAE';
        }
    }

    extractCanadaPass(model: MatrixAccountingModel, assoc) {
        let pass = this.getRemarksFromGDSByRegex(/(.*) PASS REDEMPTION-(.*) FARE/g, 'RIR');
        let found = false;
        if (pass.length > 0) {
            pass.forEach((x) => {
                const list = assoc.filter((s) => x.segments.indexOf(s.tatooNumber) >= 0);
                if (!found && list.length === x.segments.length) {
                    const text = x.remarkText;
                    const vals = text.split(' PASS REDEMPTION-');
                    model.passPurchase = vals[0].trim();
                    model.fareType = vals[1].replace('FARE', '').trim();
                    model.accountingTypeRemark = 'ACPR';
                    found = true;
                }
            });
            return model;
        }
        found = false;
        pass = this.getRemarksFromGDSByRegex(/(.*) PASS-(.*) FARE/g, 'RIR');
        if (pass.length > 0) {
            pass.forEach((x) => {
                const list = assoc.filter((s) => x.segments.indexOf(s.tatooNumber) >= 0);
                if (!found && list.length === x.segments.length) {
                    const text = x.remarkText;
                    const vals = text.split(' PASS-');
                    model.passPurchase = vals[0].trim();
                    model.fareType = vals[1].replace('FARE', '').trim();
                    model.accountingTypeRemark = 'ACPP';
                    const air = this.getSegmentList()
                        .find((z) => z.segmentType === 'AIR' && z.controlNumber === model.supplierConfirmatioNo);
                    if (air) {
                        model.departureCity = air.cityCode;
                    }
                    found = true;
                }
            });
            return model;
        }

        return model;
    }

    private extractMatrixAccount(model: MatrixAccountingModel, remark: string): MatrixAccountingModel {
        const rem = remark.split('/-');

        rem.forEach((r) => {
            const val = r.split('-');
            switch (val[0]) {
                case 'SUP':
                    model.supplierCodeName = val[1];

                    break;
                case 'LK':
                    model.tkMacLine = Number(val[1].replace('MAC', ''));
                    break;
                case 'AMT':
                    model.baseAmount = this.amountPipe.transform(val[1]);
                    break;
                case 'PT':
                    const pt = val[1]
                        .replace('XG', '')
                        .replace('XQ', '')
                        .replace('XT', '');
                    if (model.hst == null) {
                        model.hst = this.amountPipe.transform(parseFloat(pt));
                    } else if (model.gst == null) {
                        model.gst = this.amountPipe.transform(parseFloat(pt));
                    } else if (model.qst == null) {
                        model.qst = this.amountPipe.transform(parseFloat(pt));
                    } else if (model.otherTax == null) {
                        model.otherTax = this.amountPipe.transform(parseFloat(pt));
                    }
                    break;
                case 'FOP':
                    model.fop = val[1].substr(0, 2);
                    if (model.fop === 'CC' || model.fop === 'AP') {
                        model.vendorCode = val[1].substr(2, 2);
                        model.cardNumber = val[1].substr(4);
                    }

                    break;
                case 'EXP':
                    model.expDate = val[1].substr(0, 2) + '/' + val[1].substr(2, 2);
                    break;
                case 'TK':
                    model.tktLine = val[1];
                    break;
                case 'MP':
                    model.passengerNo = val[1];
                    break;
                case 'BKN':
                    model.supplierConfirmatioNo = val[1].replace('CWT', '');
                    break;
                case 'CD':
                    model.commisionWithoutTax = val[1];
                    break;
                case 'CP':
                    model.commisionPercentage = val[1];
                    break;
                case '':
            }
        });

        return model;
    }

    getAssocNumbers(assoc) {
        if (assoc === null || assoc === undefined) {
            return '';
        }
        const s = [];
        assoc.forEach((x) => {
            const segment = this.getSegmentList().find((z) => z.tatooNo === x.tatooNumber && x.segmentType === 'ST');
            if (segment !== null && segment !== undefined) {
                s.push(segment.lineNo);
            }
        });
        return s.join(',');
    }

    getPassengerAssocNumbers(assoc) {
        if (assoc === null || assoc === undefined) {
            return '';
        }
        const s = [];
        assoc.forEach((x) => {
            const passenger = this.getPassengers().find((z) => z.tatooNo === x.tatooNumber && x.segmentType === 'PT');
            if (passenger !== null && passenger !== undefined) {
                s.push(passenger.id);
            }
        });
        return s.join(',');
    }

    getApayRirRemarkLines() {
        const apays = [];
        if (this.isPNRLoaded) {
            for (const rm of this.pnrObj.rirElements) {
                const rem = rm.fullNode.miscellaneousRemarks.remarks.freetext;
                if (rem.match(/PAID (.*) CF-(.*) PLUS (.*) TAX ON (.*)/g) !== null) {
                    apays.push({
                        lineNum: rm.elementNumber,
                        remark: rem,
                        segments: this.getAssocNumbers(rm.associations)
                    });
                }
            }
        }
        return apays;
    }

    hasNUCRemarks() {
        if (this.isPNRLoaded) {
            for (const rm of this.pnrObj.rmElements) {
                if (rm.freeFlowText === 'NUC') {
                    return rm.elementNumber;
                }
            }
        }
        return '0';
    }

    hasHotelCancelSegments() {
        if (this.isPNRLoaded) {
            for (const rm of this.pnrObj.rmElements) {
                if (rm.freeFlowText === '/HTL SEGMENT INCLUDED IN CANCEL') {
                    return true;
                }
            }
        }
        return false;
    }

    getMatrixReceiptRemarks(): MatrixReceiptModel[] {
        const matrixReceipts: MatrixReceiptModel[] = [];
        for (const rm of this.pnrObj.rmElements) {
            if (rm.freeFlowText.indexOf('REC/-') === 0) {
                let model: MatrixReceiptModel;
                let rln = rm.freeFlowText.match(/REC\/-RLN-[0-9]*/g);
                if (rln !== undefined && rln !== '') {
                    rln = rln.toString().replace('REC/-RLN-', '');
                    model = matrixReceipts.find((x) => x.rln === Number(rln));
                }
                if (model === null || model === undefined) {
                    model = new MatrixReceiptModel();

                    matrixReceipts.push(this.extractMatrixReceipt(model, rm.freeFlowText));
                } else {
                    this.extractMatrixReceipt(model, rm.freeFlowText);
                }
            }
        }

        return matrixReceipts;
    }

    getSegmentModel(freetext, index, type, lineNo, status) {
        let segmentModel: PassiveSegmentsModel;
        segmentModel = new PassiveSegmentsModel();
        segmentModel.status = status;
        if (type === 'MIS' || type === 'CAR' || type === 'HTL') {
            // tslint:disable-next-line:max-line-length
            let regex = /TYP-(?<type>(.*))\/SUN-((?<vendorName>(.*)))\/SUC-(?<vendorCode>(.*))\/SC-(?<depCity>(.*))\/SD-(?<depdate>(.*))\/ST-(?<dateTime>(.*))\/EC-(?<destcity>(.*))\/ED-(?<arrdate>(.*))\/ET-(?<arrtime>(.*))\/CF-(?<conf>(.*))/g;
            let match = regex.exec(freetext);
            if (match === null) {
                // tslint:disable-next-line: max-line-length
                regex = /TYP-(?<type>(.*))\/SUN-((?<vendorName>(.*)))\/SUC-(?<vendorCode>(.*))\/SC-(?<depCity>(.*))\/SD-(?<depdate>(.*))\/ST-(?<dateTime>(([0-9]{4})))(?<destcity>(.*))\/ED-(?<arrdate>(.*))\/ET-(?<arrtime>(.*))\/CF-(?<conf>(.*))/g;
                match = regex.exec(freetext);
            }
            if (match === null) {
                // tslint:disable-next-line: max-line-length
                regex = /TYP-(?<type>(.*))\/SUN-((?<vendorName>(.*)))\/SUC-(?<vendorCode>(.*))\/STP-(?<depCity>(.*))\/SD-(?<depdate>(.*))\/ST-(?<dateTime>(.*))\/EC-(?<destcity>(.*))\/ED-(?<arrdate>(.*))\/ET-(?<arrtime>(.*))\/CF-(?<conf>(.*))/g;
                match = regex.exec(freetext);
            }
            if (match === null) {
                // tslint:disable-next-line: max-line-length
                regex = /SUC-(?<vendorCode>(.*))\/SUN-(?<vendorName>(.*))\/SD-(?<depdate>(.*))\/ST-(?<dateTime>(.*))\/ED-(?<arrdate>(.*))\/ET-(?<arrtime>(.*))\/TTL-(?<carCost>(.*))\/CF-(?<conf>(.*))/g;
                match = regex.exec(freetext);
            }

            if (match !== null) {
                segmentModel.isNew = false;
                segmentModel.segmentNo = index;
                segmentModel.lineNo = lineNo;
                segmentModel.segmentType = match.groups.type;
                if (!match.groups.type) {
                    segmentModel.segmentType = type;
                }
                segmentModel.vendorName = match.groups.vendorName;
                segmentModel.vendorCode = match.groups.vendorCode;
                segmentModel.departureCity = match.groups.depCity;
                segmentModel.departureDate = match.groups.depdate;
                segmentModel.departureTime = match.groups.dateTime;
                segmentModel.destinationCity = match.groups.destcity;
                segmentModel.arrivalDate = match.groups.arrdate;
                segmentModel.arrivalTime = match.groups.arrtime;
                segmentModel.confirmationNo = match.groups.conf;
                segmentModel.isPassive = true;

            } else if (type === 'HTL') {
                segmentModel.segmentType = type;
                segmentModel.isPassive = true;
            }
            return segmentModel;
        }
    }

    getAirSegmentModel(element, index, lineNo) {
        let segmentModel: PassiveSegmentsModel;
        segmentModel = new PassiveSegmentsModel();
        segmentModel.isNew = false;
        segmentModel.segmentNo = index;
        segmentModel.lineNo = lineNo;
        segmentModel.segmentType = element.segmentType;
        segmentModel.flightNumber = element.flightNumber;
        segmentModel.classService = element.classservice;
        segmentModel.departureDate = this.formatDate(element.departureDate);
        segmentModel.departureTime = element.departureTime;
        segmentModel.departureCity = element.cityCode;
        segmentModel.destinationCity = element.arrivalStation;
        segmentModel.arrivalDate = this.formatDate(element.arrivalDate);
        segmentModel.arrivalTime = element.arrivalTime;
        segmentModel.airlineCode = element.airlineCode;
        segmentModel.status = element.status;
        segmentModel.isPassive = (element.status === 'GK');
        return segmentModel;
    }

    getHotelSegmentModel(element, index, freetext, lineNo) {
        let segmentModel: PassiveSegmentsModel;
        segmentModel = new PassiveSegmentsModel();
        segmentModel.isNew = false;
        segmentModel.segmentNo = index;
        segmentModel.lineNo = lineNo;
        segmentModel.segmentType = element.segmentType;
        segmentModel.departureDate = this.formatDate(element.deptdate);
        segmentModel.departureCity = element.cityCode;
        segmentModel.destinationCity = element.arrivalStation;
        segmentModel.arrivalDate = this.formatDate(element.arrivalDate);
        segmentModel.status = element.status;
        segmentModel.isPassive = (element.passive === 'HTL');
        const regex = /(?<hotelInfo>(.*)),CF:(?<confirmationNumber>(.*?),)/g;
        const match = regex.exec(freetext);

        if (match) {
            segmentModel.confirmationNo = match.groups.confirmationNumber.substr(0, match.groups.confirmationNumber.length - 1);
        }

        return segmentModel;
    }

    getModelPassiveSegments(): PassiveSegmentsModel[] {
        const pSegment: PassiveSegmentsModel[] = [];
        const segment = this.getSegmentList();
        let index = 0;
        segment.forEach((element) => {
            index++;

            switch (element.segmentType) {
                case 'MIS':
                case 'CAR':
                    pSegment.push(this.getSegmentModel(element.freetext, index, element.segmentType, element.lineNo, element.status));
                    break;
                case 'AIR':
                    pSegment.push(this.getAirSegmentModel(element, index, element.lineNo));
                    break;
                case 'HTL':
                    pSegment.push(this.getHotelSegmentModel(element, index, element.freetext, element.lineNo));
                    break;
            }
        });
        return pSegment;
    }

    private extractMatrixReceipt(model: MatrixReceiptModel, remark: string): MatrixReceiptModel {
        let regex = /RLN-(?<rln>[0-9]*)\/-RF-(?<fullname>(.*))\/-AMT-(?<amount>(.*))/g;
        let match = regex.exec(remark);
        if (match !== null) {
            model.rln = Number(match.groups.rln);
            model.passengerName = match.groups.fullname;
            model.amount = this.amountPipe.transform(match.groups.amount);
            return model;
        }
        regex = /RLN-(?<rln>[0-9]*)\/-FOP-PR-(?<lastFourDigit>(.*))\/-BA-(?<bankAccount>(.*))\/-GL-(?<gl>(.*))/g;
        match = regex.exec(remark);
        if (match !== null) {
            model.rln = Number(match.groups.rln);
            model.glCode = match.groups.gl;
            model.lastFourVi = match.groups.lastFourDigit;
            model.bankAccount = match.groups.bankAccount;
            return model;
        }
        regex = /RLN-(?<rln>[0-9]*)\/-RM-POINTS (?<points>(.*)) REF-(?<ref>(.*))/g;
        match = regex.exec(remark);
        if (match !== null) {
            model.rln = Number(match.groups.rln);
            model.points = match.groups.points;
            model.cwtRef = match.groups.ref;
            return model;
        }
        regex = /RLN-(?<rln>[0-9]*)\/-FOP-(?<fop>(.*))\/-LK-T\/-BA-(?<ba>(.*))\/-GL-(?<glcode>(.*))/g;
        match = regex.exec(remark);
        if (match !== null) {
            model.rln = Number(match.groups.rln);
            model.bankAccount = match.groups.ba;
            model.glCode = match.groups.glcode;
            const fop = match.groups.fop;
            const typ = fop.substr(0, 2);
            model.modePayment = typ;
            if (typ === 'CC') {
                regex = /([A-Z]{2})(?<vendor>[A-Z]{2})(?<cardNo>(.*))\/-EXP-(?<exp>([0-9]{4}))/g;
                match = regex.exec(fop);
                if (match !== null) {
                    model.vendorCode = match.groups.vendor;
                    model.ccNo = match.groups.cardNo;
                    model.expDate = match.groups.exp.substr(0, 2) + '/' + match.groups.exp.substr(2, 2);
                }

                return model;
            }
        }
        regex = /RLN-(?<rln>[0-9]*)\/-RM-(?<desc>([^\/]+))(\/-GC-(?<gc>.*))?/g;
        match = regex.exec(remark);
        if (match !== null) {
            model.rln = Number(match.groups.rln);
            model.description = match.groups.desc;
            if (model.gcNumber !== null) {
                model.gcNumber = match.groups.gc;
            }
            return model;
        }

        return model;
    }

    recordLocator() {
        try {
        return this.pnrObj.header.recordLocator;
        } catch (ex) {
            return '';
        }
    }

    hasAmendMISRetentionLine() {
        for (const misc of this.pnrObj.miscSegments) {
            if (misc.fullNode.itineraryFreetext.longFreetext.indexOf('THANK YOU FOR CHOOSING CARLSON') > -1) {
                return true;
            }
        }

        return false;
    }

    getMISRetentionLineNumber(freetext) {
        for (const misc of this.pnrObj.miscSegments) {
            if (misc.fullNode.itineraryFreetext.longFreetext.indexOf(freetext) > -1) {
                return misc.elementNumber;
            }
        }
        return '';
    }

    IsExistAmkVib(supCode) {
        if (this.isPNRLoaded) {
            for (const misc of this.pnrObj.miscSegments) {
                if (supCode === 'vir') {
                    if (
                        misc.fullNode.itineraryFreetext.longFreetext.indexOf('FOR VIA RAIL TRAVEL PLEASE CHECK IN AT TRAIN STATION') > -1 ||
                        misc.fullNode.itineraryFreetext.longFreetext.indexOf('POUR LES DEPLACEMENTS A BORD DE VIA RAIL VEUILLEZ VOUS') > -1
                    ) {
                        return true;
                    }
                }
                if (supCode === 'amk') {
                    if (
                        misc.fullNode.itineraryFreetext
                            .longFreetext.indexOf('VALID IDENTIFICATION IS REQUIRED FOR ALL PASSENGERS 18 AND OVER') > -1
                    ) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    getEmailAddressesFromGds() {
        const emailList = [];
        if (this.isPNRLoaded) {
            for (const ape of this.pnrObj.apElements) {
                if (ape.type === 'E') {
                    let freeText = ape.fullNode.otherDataFreetext.longFreetext;
                    const arrRegex = /ARR\*|CTC\*|\/PARR|\/WORK/g;
                    const match = freeText.match(arrRegex);
                    if (match && match[0]) {
                        freeText = freeText.replace(match[0], '');
                        if (match[1]) {
                            freeText = freeText.replace(match[1], '');
                        }
                        emailList.push(freeText);
                    } else {
                        emailList.push(ape.fullNode.otherDataFreetext.longFreetext);
                    }
                }
            }
        }
        return emailList;
    }

    getRmqEmail() {
        if (this.isPNRLoaded) {
            for (const rm of this.pnrObj.rmElements) {
                if (rm.category === 'Q' && rm.freeFlowText === 'EMAIL ADD-NO') {
                    return true;
                }
            }
        }
        return false;
    }

    getmisCancel() {
        for (const misc of this.pnrObj.miscSegments) {
            if (
                misc.fullNode.itineraryFreetext.longFreetext.indexOf('PNR CANCELLED') > -1 ||
                misc.fullNode.itineraryFreetext.longFreetext.indexOf('THANK YOU FOR CHOOSING CARLSON') > -1
            ) {
                // this.getSegmentDetails(misc, 'MIS');
                return misc.elementNumber;
            }
        }
        return 0;
    }

    getPassengerTatooValue(passengerRelate) {
        const relatedPassenger = [];
        const tatooPassenger = this.getPassengers();
        passengerRelate.forEach((element) => {
            if (tatooPassenger.length > 0) {
                const look = tatooPassenger.find((x) => x.id === element);
                if (look) {
                    relatedPassenger.push(look.tatooNo);
                }
            }
        });

        return relatedPassenger;
    }

    getUnticketedTst() {
        let unticketed = [];
        if (!this.tstObj) {
            return false;
        }
        if (!this.tstObj.length) {
            unticketed.push(this.tstObj);
        } else {
            unticketed = this.tstObj.filter(t => this.checkPaxRefDetails(t.paxSegReference.refDetails));
        }
        return unticketed.length > 0;
    }

    checkPaxRefDetails(refDetails) {
        if (refDetails.length === undefined) {
            return refDetails.refQualifier !== 'PT';
        } else {
            return refDetails.filter(x => x.refQualifier !== 'PT').length > 0;
        }
    }


    getTicketedNumbers() {
        const tickets = [];
        for (const ticketed of this.pnrObj.faElements) {
            const regex = new RegExp('[0-9]{3}-[0-9]+');
            const match = regex.exec(ticketed.freeFlowText);
            regex.lastIndex = 0;
            if (match !== null) {
                tickets.push(match[0]);
            }
        }
        return tickets;
    }

    getTicketedSegments(): string[] {
        const segmentTatooNumbers = [];
        for (const ticketed of this.pnrObj.faElements) {
            const s = [];
            ticketed.fullNode.referenceForDataElement.reference.forEach(ref => {
                if (ref.qualifier === 'ST') {
                    s.push(ref.number);
                }
            });
            segmentTatooNumbers.push(s);
        }
        const segmentLines = [];
        segmentTatooNumbers.forEach(tatoos => {
            const s = [];
            tatoos.forEach(tatoo => {
                const segment = this.segments.filter(seg => seg.tatooNo === tatoo);
                if (segment && segment.length > 0) {
                    s.push(segment[0].lineNo);
                }
            });
            segmentLines.push(s.join(','));
        });

        return segmentLines;
    }


    getClientSubUnit() {
        const u25 = this.getRemarkText('U25/-');
        if (u25 && !this.clientSubUnitGuid) {
            this.clientSubUnitGuid = u25.replace('U25/-', '');
        } else {
            const syexgvs = this.getRemarkText('SYEXGVS:');
            if (syexgvs && !this.clientSubUnitGuid) {
                this.clientSubUnitGuid = syexgvs.split(' ')[1];
            }
        }
        return this.clientSubUnitGuid;
    }

    getLanguage() {
        const rirService = 'LANGUAGE-(EN-US|FR-CA)';
        const regx = new RegExp(rirService);
        const rems = this.getRemarksFromGDSByRegex(regx, 'RM');
        if (rems.length > 0 && rems[0].remarkText.substr(-5) === 'FR-CA') {
            return rems[0].remarkText.substr(-5);
        }
        return 'EN-GB';
    }

    hasPassRemark(): boolean {
        const u14 = this.getRemarkText('U14/-');
        if (u14 && u14.indexOf('PASS') > -1) {
            return true;
        }
        return false;
    }

    getExchangeTatooNumbers() {
        for (const fo of this.pnrObj.foElements) {
            for (const assoc of fo.associations) {
                if (assoc.segmentType === 'ST') {
                    this.exchangeTatooNumbers.push(assoc.tatooNumber);
                }
            }
        }
        return this.exchangeTatooNumbers;
    }

    getExchangeSegmentNumbers(): string[] {
        return this.getSegmentNumbers(this.exchangeTatooNumbers);
    }

    getTatooNumberFromSegmentNumber(segments: string[]): string[] {
        if (this.segments.length === 0) {
            this.getSegmentList();
        }
        const lineNos = this.segments.filter(s => segments.indexOf(s.lineNo) >= 0).map(x => x.tatooNo);
        return lineNos;
    }

    getSegmentNumbers(tatooNumbers: any[]): string[] {
        if (this.segments.length === 0) {
            this.getSegmentList();
        }
        const segmentLines = [];
        for (const tatooNo of tatooNumbers) {
            const segment = this.segments.filter(s => s.tatooNo === tatooNo);
            if (segment && segment.length > 0) {
                segmentLines.push(segment[0].lineNo);
            }
        }
        return segmentLines;
    }



    getTstTicketedSegments(): string[] {
        const segmentTatooNumbers = [];
        for (const ticketed of this.pnrObj.fvElements) {
            const s = [];
            ticketed.fullNode.referenceForDataElement.reference.forEach(ref => {
                if (ref.qualifier === 'ST') {
                    s.push(ref.number);
                }
            });
            segmentTatooNumbers.push(s);
        }
        const segmentLines = [];
        segmentTatooNumbers.forEach(tatoos => {
            const s = [];
            tatoos.forEach(tatoo => {
                const segment = this.segments.filter(seg => seg.tatooNo === tatoo);
                if (segment && segment.length > 0) {
                    s.push(segment[0].lineNo);
                }
            });
            segmentLines.push(s.join(','));
        });

        return segmentLines;
    }

    public isExistRemarksWithCategory(remarkText: string, cat: string, type: string): boolean {
        let search = [];
        if (this.isPNRLoaded) {
            switch (type) {
                case 'RI':
                    search = this.pnrObj.rmElements;
                    break;
                default:
                    search = this.pnrObj.riElements;
            }

            for (const rm of search) {
                if (rm.category === cat && rm.freeFlowText.indexOf(remarkText) > -1) {
                    return true;
                }
            }
        }
        return false;
    }

    public getFopElements(fop?) {
        for (const fp of this.pnrObj.fpElements) {
            if (fop) {
                if (fp.fullNode.otherDataFreetext.longFreetext.indexOf(fop) > -1) {
                    return fp.fullNode.otherDataFreetext.longFreetext;
                }
            } else {
                return fp.fullNode.otherDataFreetext.longFreetext;
            }
        }
        return '';
    }


    public getTkLineDescription(): string {
        if (this.pnrObj.tkElements && this.pnrObj.tkElements[0] && this.pnrObj.tkElements[0].freeFlowText) {
            return this.pnrObj.tkElements[0].freeFlowText.trim();
        }
        return '';
    }

    getAirDestinations() {
        if (this.isPNRLoaded) {
            for (const air of this.pnrObj.airSegments) {
                const airendpoint = air.arrivalAirport;
                this.pushDestination(airendpoint);
            }
            return this.destinationCity;
        }
    }

    public getFopElementLineNo(fop?) {
        let fopLineNo = '';
        let fopFreeText = '';
        for (const fp of this.pnrObj.fpElements) {
            if (fop) {
                if (fp.fullNode.otherDataFreetext.longFreetext.indexOf(fop) > -1) {
                    fopFreeText = fp.fullNode.otherDataFreetext.longFreetext;
                    fopLineNo = fp.elementNumber;
                }
            } else {
                fopFreeText = fp.fullNode.otherDataFreetext.longFreetext;
                fopLineNo = fp.elementNumber;
            }
        }
        return { fopLineNo, fopFreeText };
    }

    getCCVendorCode(): string {
        let val: string;
        val = '';
        for (const element of this.pnrObj.fpElements) {
            val = element.fullNode.otherDataFreetext.longFreetext.substr(2, 2);
        }
        return val;
    }

    getTicketList() {
        const ticketList = [];
        for (const ticketed of this.pnrObj.faElements) {
            ticketList.push({
                // tslint:disable-next-line: max-line-length
                freeFlowText: ticketed.freeFlowText.split('/')[0] + ' / ' + ticketed.freeFlowText.split('/')[1] + ' / ' + ticketed.freeFlowText.split('/')[2],
                tatooNo: ticketed.tatooNumber,
                segmentReference: ticketed.fullNode.referenceForDataElement
            });
        }
        return ticketList;
    }


    getTktNumber(): string {
        let ticket: string;
        if (this.pnrObj.faElements.length > 0) {
            for (const fa of this.pnrObj.faElements) {
                if (fa.freeFlowText.split('/')[1].substr(1, 1) === 'V') {
                    ticket = fa.freeFlowText.split('/')[0].split(' ')[1];
                } else { return ''; }
            }
            return ticket;
        }
    }

    getBookingInfo(): string {
        if (this.pnrObj.tkElements.length > 0) {
            if (this.pnrObj.tkElements[0].ticketingOfficeID === 'YYCWL2102') {
                return 'PASSENGER';
            } else { return ''; }
        }
    }

    getUnticketedCorpReceipts(): any[] {
        const allAir = this.pnrObj.allAirSegments;
        const tstData = [];
        const unticketedSegments = [];
        const tstObj = this.tstObj;
        const ticketedSegments = [];

        if (this.pnrObj.fullNode !== null) {
            for (const tst of this.pnrObj.fullNode.response.model.output.response.dataElementsMaster.dataElementsIndiv) {
                const segmentName = tst.elementManagementData.segmentName;
                if (segmentName === 'FA' || segmentName === 'FHA' || segmentName === 'FHE') {
                    if (tst.referenceForDataElement !== undefined) {
                        if (tst.referenceForDataElement.reference.length > 1) {
                            tst.referenceForDataElement.reference.forEach((ref) => {
                                if (ref.qualifier === 'ST') {
                                    ticketedSegments.push(ref.number);
                                }
                            });
                        } else {
                            if (tst.referenceForDataElement.reference.qualifier === 'ST') {
                                ticketedSegments.push(tst.referenceForDataElement.reference.number);
                            }
                        }
                    }
                }
            }
        }
        allAir.forEach((x) => {
            if (!ticketedSegments.find((p) => x.tatooNumber === p)) {
                unticketedSegments.push(x.tatooNumber);
            }
        });
        if (unticketedSegments.length > 0) {
            if (tstObj.length === 0) {
            } else if (tstObj.length > 0) {
                tstObj.forEach((x) => {
                    if (x.segmentInformation.length > 0) {
                        const segmentRef = [];
                        const segmentTatoo = [];
                        x.segmentInformation.forEach((p) => {
                            if (p.segmentReference !== undefined) {
                                segmentRef.push(this.getSegmentLineNo(p.segmentReference.refDetails.refNumber));
                                segmentTatoo.push(p.segmentReference.refDetails.refNumber);
                            }
                        });
                        if (segmentTatoo.length > 0) {
                            segmentTatoo.forEach((element) => {
                                if (unticketedSegments.includes(element)) {
                                    tstData.push({
                                        tstNumber: x.fareReference.uniqueReference,
                                        segmentNumber: segmentRef,
                                        tatooNumber: segmentTatoo,
                                        airline: x.validatingCarrier.carrierInformation.carrierCode,
                                        ccVendor: this.getFop(segmentTatoo),
                                        ccExp: this.getCCExp(segmentTatoo),
                                        ccNumber: this.getCCNo(segmentTatoo),
                                        paxName: this.getTstPassenger(x.paxSegReference.refDetails.refNumber),
                                        cost: this.getFare(x)
                                    });
                                }
                            });
                        } else {
                            if (unticketedSegments.includes(x.segmentReference.refDetails.refNumber)) {
                                tstData.push({
                                    tstNumber: x.fareReference.uniqueReference,
                                    segmentNumber: segmentRef,
                                    tatooNumber: segmentTatoo,
                                    airline: x.validatingCarrier.carrierInformation.carrierCode,
                                    ccVendor: this.getFop(segmentTatoo),
                                    ccExp: this.getCCExp(segmentTatoo),
                                    ccNumber: this.getCCNo(segmentTatoo),
                                    paxName: this.getTstPassenger(x.paxSegReference.refDetails.refNumber),
                                    cost: this.getFare(x)
                                });
                            }
                        }
                    } else {
                        if (unticketedSegments.find((p) => x.segmentInformation.segmentReference.refDetails.refNumber === p)) {
                            if (!ticketedSegments.includes(x.segmentInformation.segmentReference.refDetails.refNumber)) {
                                tstData.push({
                                    tstNumber: x.fareReference.uniqueReference,
                                    segmentNumber: this.getSegmentLineNo(x.segmentInformation.segmentReference.refDetails.refNumber),
                                    tatooNumber: x.segmentInformation.segmentReference.refDetails.refNumber,
                                    airline: x.validatingCarrier.carrierInformation.carrierCode,
                                    ccVendor: this.getFop(x.segmentInformation.segmentReference.refDetails.refNumber),
                                    ccExp: this.getCCExp(x.segmentInformation.segmentReference.refDetails.refNumber),
                                    ccNumber: this.getCCNo(x.segmentInformation.segmentReference.refDetails.refNumber),
                                    paxName: this.getTstPassenger(x.paxSegReference.refDetails.refNumber),
                                    cost: this.getFare(x)
                                });
                            }
                        }
                    }
                });
            } else {
                let x: any;
                x = tstObj;
                if (x.segmentInformation.length > 0) {
                    const segmentRef = [];
                    const segmentTatoo = [];
                    x.segmentInformation.forEach((p) => {
                        if (p.segmentReference !== undefined) {
                            segmentRef.push(this.getSegmentLineNo(p.segmentReference.refDetails.refNumber));
                            segmentTatoo.push(p.segmentReference.refDetails.refNumber);
                        }
                    });
                    tstData.push({
                        tstNumber: x.fareReference.uniqueReference,
                        segmentNumber: segmentRef,
                        tatooNumber: segmentTatoo,
                        airline: x.validatingCarrier.carrierInformation.carrierCode,
                        ccVendor: this.getFop(segmentTatoo),
                        ccExp: this.getCCExp(segmentTatoo),
                        ccNumber: this.getCCNo(segmentTatoo),
                        paxName: this.getTstPassenger(x.paxSegReference.refDetails.refNumber),
                        cost: this.getFare(x)
                    });
                } else {
                    tstData.push({
                        tstNumber: x.fareReference.uniqueReference,
                        segmentNumber: this.getSegmentLineNo(x.segmentInformation.segmentReference.refDetails.refNumber),
                        tatooNumber: x.segmentInformation.segmentReference.refDetails.refNumber,
                        airline: x.validatingCarrier.carrierInformation.carrierCode,
                        ccVendor: this.getFop(x.segmentInformation.segmentReference.refDetails.refNumber),
                        ccExp: this.getCCExp(x.segmentInformation.segmentReference.refDetails.refNumber),
                        ccNumber: this.getCCNo(x.segmentInformation.segmentReference.refDetails.refNumber),
                        paxName: this.getTstPassenger(x.paxSegReference.refDetails.refNumber),
                        cost: this.getFare(x)
                    });
                }
            }
        }
        if (tstData.length > 0) {
            return tstData;
        }
    }

    getSegmentLineNo(tatooNumber: string): string {
        const tatoos: string[] = [];
        tatooNumber.split(',').forEach((e) => {
            tatoos.push(e);
        });
        let segments = '';
        const seg = this.getSegmentList().filter((x) => tatoos.includes(x.tatooNo));
        seg.forEach((s) => {
            if (segments === '') {
                segments = s.lineNo;
            } else {
                segments = segments + ',' + s.lineNo;
            }
        });
        return segments;
    }

    getFop(segment: any) {
        let fop = '';
        this.pnrObj.fpElements.forEach((x) => {
            if (x.associations !== null && x.associations.length > 0) {
                if (x.associations[0].tatooNumber === segment) {
                    fop = x.fullNode.otherDataFreetext.longFreetext.split(' ')[1].substr(2, 2);
                }
            } else {
                for (const fp of this.pnrObj.fpElements) {
                    fop = fp.fullNode.otherDataFreetext.longFreetext.split('/')[0].substr(2, 2);
                }
            }
        });
        return fop;
    }
    getFare(segment: any) {
        let fare: string;
        segment.fareDataInformation.fareDataSupInformation.forEach((x) => {
            if (x.fareDataQualifier === 'TFT') {
                fare = x.fareAmount;
            }
        });
        return fare;
    }
    getCCExp(segment: any) {
        let exp = '';
        this.pnrObj.fpElements.forEach((x) => {
            if (x.associations !== null && x.associations.length > 0 && x.associations[0].tatooNumber === segment) {
                exp = x.fullNode.otherDataFreetext.longFreetext.split('/')[1];
            } else {
                for (const fp of this.pnrObj.fpElements) {
                    exp = fp.fullNode.otherDataFreetext.longFreetext.split('/')[1];
                }
            }
        });
        return exp;
    }
    getCCNo(segment: any) {
        let ccNo: string;
        let ccLength: number;
        if (segment !== '') {
            this.pnrObj.fpElements.forEach((x) => {
                if (x.associations !== null && x.associations.length > 0 && x.associations[0].tatooNumber === segment) {
                    ccLength = x.fullNode.otherDataFreetext.longFreetext.split('/')[0].length;
                    ccNo = x.fullNode.otherDataFreetext.longFreetext.split('/')[0].substr(8, ccLength);
                }
                if (x.associations == null) {
                    ccLength = x.fullNode.otherDataFreetext.longFreetext.split('/')[0].length;
                    ccNo = x.fullNode.otherDataFreetext.longFreetext.split('/')[0].substr(4, ccLength);
                }
            });
        }
        return ccNo;
    }
    getTstPassenger(tstNumber: any): string {
        let name: string;
        this.pnrObj.nameElements.forEach((x) => {
            if (x.fullNode.elementManagementPassenger.reference.number === tstNumber) {
                name = x.firstName + '-' + x.lastName;
            }
        });
        return name;
    }

    getTstLength() {
        let tstslength = 0;
        if (this.tstObj) {
            if (this.tstObj.length || this.tstObj.length === 0) {
                tstslength = this.tstObj.length;
            } else {
                tstslength = 1;
            }
        }
        return tstslength;
    }

    getTstSegmentNumbers() {
        let segments = [];
        if (this.tstObj.length && this.tstObj.length > 0) {
            segments =  segments.concat( this.tstObj.map(x => this.extractTstSegment(x)));
        }  else if (this.tstObj.length === undefined) {
            segments.push(this.extractTstSegment(this.tstObj));
        }
        return  segments.map(x => x.map(z => this.segments.find(y => y.tatooNo === z).lineNo).join(','));
     }


    extractTstSegment(tst: any) {
        const segments = [];
        if (tst.segmentInformation.length === undefined) {
            segments.push(tst.segmentInformation.segmentReference.refDetails.refNumber);
        } else {
            tst.segmentInformation.forEach((s) => {
                if (s.segmentReference) {
                    segments.push(s.segmentReference.refDetails.refNumber);
                }
            });
        }
        return segments;
    }

    getExchangeList() {
        const exchangeList = [];
        let index = 0;
        for (const fo of this.pnrObj.foElements) {
            const model = new ExchangeTicketModel();
            index = index + 1;
            model.exchangeNo = index;
            for (const assoc of fo.associations) {
                if (assoc.segmentType === 'ST') {
                    model.segmentAssociation.push(assoc.tatooNumber.toString());
                }
                if (assoc.segmentType === 'PT') {
                    model.passengerAssociation.push(assoc.tatooNumber);
                }
            }
            model.lineNumber = fo.elementNumber;
            model.tatooNumber = fo.tatooNumber;
            exchangeList.push(model);
        }
        return exchangeList;
    }

    getFEList() {
        const feList = [];
        for (const fe of this.pnrObj.feElements) {
            const segmentAssociation = [];
            for (const assoc of fe.associations) {
                if (assoc.segmentType === 'ST') {
                    segmentAssociation.push(assoc.tatooNumber.toString());
                }
            }
            feList.push({ lineNo: fe.elementNumber, segments: segmentAssociation });
        }
        return feList;
    }

    getSegmentsForNoHotel() {
        const noHotelSegment = [];
        const segments = this.getSegmentList()
        .filter(x => this.isCar(x)  || this.isHotel(x) || this.isRail(x) || x.segmentType === 'AIR')
        .sort((a, b) => {
          if (Number(a.lineNo) < Number(b.lineNo)) {
            return -1;
          } else if (Number(a.lineNo) < Number(b.lineNo)) {
            return 1;
          } else {
            return 0;
          }
        });
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < segments.length - 1; i++) {
          const seg1 = segments[i];
          const seg2 = segments[i + 1];

          if (this.isNotLess4hrDateDiff(seg1.arrivalDate, seg2.departureDate, seg1.arrivalTime, seg2.departureTime)) {
              noHotelSegment.push(seg1);
            } else if (this.isCar(seg1)) {
            const seg1Dep = new Date(this.utilHelper.convertSegmentDate(seg1.departureDate));
            const seg2Arr = new Date(this.utilHelper.convertSegmentDate(seg1.arrivalDate));
            const hotels = segments.filter(x => this.isHotel(x));
            hotels.forEach(x => {
                const xDep = new Date(this.utilHelper.convertSegmentDate(x.departureDate));
                const xArr = new Date(this.utilHelper.convertSegmentDate(x.arrivalDate));
                if (this.utilHelper.dateDiffInDays(seg1Dep, xDep) > 1 || this.utilHelper.dateDiffInDays(seg2Arr, xArr) > 1) {
                    noHotelSegment.push(seg1);
                    return;
                }
             });
          }

        }
        return noHotelSegment;
      }

      isHotel(segment) {
        return segment.segmentType === 'HTL' || segment.segmentType === 'HHL';
      }
      isCar(segment) {
        return segment.segmentType === 'CCR' || segment.segmentType === 'CAR';
      }
      isRail(segment) {
        return segment.passive === 'TYP-TRN';
      }

      isNotLess4hrDateDiff(date1, date2, time1, time2) {
        const seg1Date = new Date(this.utilHelper.convertSegmentDate(date1));
        const seg2Date = new Date(this.utilHelper.convertSegmentDate(date2));
        seg1Date.setHours(time1.substr(0, 2));
        seg1Date.setMinutes(time1.substr(2, 2));
        seg2Date.setHours(time2.substr(0, 2));
        seg2Date.setMinutes(time2.substr(2, 2));
        const hourDiff = this.utilHelper.dateDiffInHours(seg1Date, seg2Date);
        const dayDiff = this.utilHelper.dateDiffInDays(seg1Date, seg2Date);
        // day diff should be more than 4 hours
        return dayDiff > 0 && hourDiff > 4;
      }

      getSegmentRoutes() {
        const routes = [];
        this.segments.forEach(x => {
            if (x.departureAirport && routes.indexOf(x.departureAirport) === -1) {
                routes.push(x.departureAirport);
            }
            if (x.arrivalAirport && routes.indexOf(x.arrivalAirport) === -1) {
                routes.push(x.arrivalAirport);
            }
            if (x.cityCode && routes.indexOf(x.cityCode) === -1 ) {
                routes.push(x.cityCode);
            }
         });
        return routes;
      }
}
