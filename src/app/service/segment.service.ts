
import { PassiveSegmentModel } from '../models/pnr/passive-segment.model';
// import { UpdateTourSegmentComponent } from '../passive-segments/tour-segment/update-tour-segment.component';
import { DatePipe } from '@angular/common';
import { RemarkGroup } from '../models/pnr/remark.group.model';
import { TourSegmentViewModel } from 'src/app/models/tour-segment-view.model';
import { Injectable } from '@angular/core';
import { PnrService } from './pnr.service';
import { RemarkHelper } from '../helper/remark-helper';
import { SwitchView } from '@angular/common/src/directives/ng_switch';
import { RemarkModel } from '../models/pnr/remark.model';
import { PassiveSegmentsModel } from '../models/pnr/passive-segments.model';

@Injectable({
    providedIn: 'root',
})

export class SegmentService {
    // check if this can be retrieved from ddb
    mexicoCities: Array<string> =
        ['ACA', 'MEX', 'TIJ', 'CUN', 'CNA', 'AGU', 'XAL', 'AZG', 'AZP', 'CPA', 'CYW', 'CTM', 'CZA', 'CUU',
            'ACN', 'CUA', 'CME', 'MMC', 'CJS', 'CEN', 'CVM', 'CLQ', 'CJT', 'CZM', 'CVJ', 'CUL', 'DGO', 'ESE',
            'GDL', 'GSV', 'GYM', 'GUB', 'HMO', 'HUX', 'ISJ', 'ZIH', 'IZT', 'LAP', 'LOM', 'LZC', 'BJX', 'LTO',
            'SJD', 'LMM', 'ZLO', 'MAM', 'MTH', 'MZT', 'MID', 'MXL', 'MTT', 'LOV', 'MTY', 'NTR', 'MLM', 'MUG',
            'NVJ', 'NOG', 'NCG', 'NLD', 'OAX', 'PQM', 'PDS', 'PCM', 'PAZ', 'PBC', 'PXM', 'PPE', 'PVR', 'QRO',
            'REX', 'SCX', 'SLW', 'SFH', 'SLP', 'UAC', 'NLU', 'SRL', 'TAM', 'TSL', 'TAP', 'TCN', 'TPQ', 'TZM',
            'TLC', 'TRC', 'TUY', 'TGZ', 'UPN', 'VER', 'VSA', 'JAL', 'ZCL', 'ZMM'];

    constructor(private pnrService: PnrService, private remarkHelper: RemarkHelper) { }


    GetSegmentRemark(segmentRemarks: PassiveSegmentsModel[]) {
        const datePipe = new DatePipe('en-US');
        const tourSegment = new Array<PassiveSegmentModel>();
        const remarks = new Array<RemarkModel>();
        let startTime = '';
        let endTime = '';
        let segdest = '';

        segmentRemarks.forEach(segment => {
            if (!segment.isNew) {
                return;
            }

            const passive = new PassiveSegmentModel();
            passive.passiveSegmentType = segment.segmentType;
            passive.startDate = datePipe.transform(segment.departureDate, 'ddMMyy');
            passive.endDate = datePipe.transform(segment.arrivalDate, 'ddMMyy');
            passive.startPoint = segment.departureCity;

            if (segment.destinationCity === undefined) { segdest = segment.departureCity; }
            else { segdest = segment.destinationCity; }
            passive.endPoint = segdest;

            if (segment.departureTime) { startTime = (segment.departureTime as string).replace(':', ''); }
            if (segment.arrivalTime) { endTime = (segment.arrivalTime as string).replace(':', ''); }

            if (segment.segmentType === 'AIR') {
                passive.vendor = segment.airlineCode;
                passive.startTime = startTime;
                passive.endTime = endTime;
                passive.segmentName = segment.segmentType;
                passive.function = '1';
                passive.quantity = Number(segment.noPeople);
                passive.status = 'GK';
                passive.classOfService = segment.classService;
                passive.controlNo = 'C1';
                passive.flightNo = segment.flightNumber;
                if (segment.airlineRecloc) { passive.controlNo = segment.airlineRecloc; }
            } else {
                passive.vendor = '1A';
                passive.startTime = '0000';
                passive.endTime = '0000';
                passive.segmentName = 'RU';
                passive.function = '12';
                passive.quantity = Number(segment.noPeople);
                passive.status = 'HK';
                passive.flightNo = '1';
                const datePipe2 = new DatePipe('en-US');
                const startdatevalue = datePipe2.transform(segment.departureDate, 'ddMMM');
                const enddatevalue = datePipe2.transform(segment.arrivalDate, 'ddMMM');
                const freetext = this.extractFreeText(segment, startdatevalue, startTime, enddatevalue, endTime);
                passive.freeText = freetext;
            }

            tourSegment.push(passive);
        });

        const passGroup = new RemarkGroup();
        passGroup.group = 'Segment Remark';
        passGroup.passiveSegments = tourSegment;
        return passGroup;
    }

    addSeaSegmentRir(segmentRemarks: PassiveSegmentsModel[]) {
        const datePipe = new DatePipe('en-US');
        const rmGroup = new RemarkGroup();
        rmGroup.group = 'RIR remark';
        rmGroup.remarks = new Array<RemarkModel>();

        const segments = this.pnrService.getSegmentTatooNumber();
        segmentRemarks.forEach(segmentrem => {
            if (!segmentrem.isNew) {
                return;
            }
            segments.forEach(pnrSegment => {
                if (segmentrem.segmentType === 'SEA') {
                    if (pnrSegment.segmentType === 'MIS') {
                        this.rirCruise(pnrSegment, datePipe, segmentrem, rmGroup);
                    }
                }

                if (segmentrem.segmentType === 'AIR' && pnrSegment.segmentType === 'AIR') {
                    this.rirAir(pnrSegment, datePipe, segmentrem, rmGroup);
                }
            });
        });

        return rmGroup;
    }

    private rirAir(pnrSegment: any, datePipe: DatePipe, segmentrem: PassiveSegmentsModel, rmGroup: RemarkGroup) {
        const ddate = datePipe.transform(segmentrem.departureDate, 'ddMMyy');
        if (pnrSegment.deptdate === ddate && pnrSegment.cityCode === segmentrem.departureCity) {
            if (segmentrem.zzairlineCode) {
                rmGroup.remarks.push(this.getRemarksModel
                    ('Flight is Confirmed with ' + segmentrem.zzairlineCode, 'RI', 'R', pnrSegment.tatooNo));
            }
            if (segmentrem.zzdepartureCity) {
                rmGroup.remarks.push(this.getRemarksModel
                    ('Departure City is ' + segmentrem.zzdepartureCity, 'RI', 'R', pnrSegment.tatooNo));
            }
            if (segmentrem.zzdestinationCity) {
                rmGroup.remarks.push(this.getRemarksModel
                    ('Arrival City is ' + segmentrem.zzdestinationCity, 'RI', 'R', pnrSegment.tatooNo));
            }
        }
    }

    private rirCruise(pnrSegment: any, datePipe: DatePipe, segmentrem: PassiveSegmentsModel, rmGroup: RemarkGroup) {
        const type = pnrSegment.freetext.substr(6, 3);
        if (type === 'SEA') {
            const ddate = datePipe.transform(segmentrem.departureDate, 'ddMMyy');
            if (pnrSegment.deptdate === ddate && pnrSegment.cityCode === segmentrem.departureCity) {
                let sroom = segmentrem.stateRoom;
                if (sroom === 'OTHER') {
                    sroom = segmentrem.othersText;
                }
                let remText = sroom + ' ' + segmentrem.cabinNo;
                rmGroup.remarks.push(this.getRemarksModel(remText, 'RI', 'R', pnrSegment.tatooNo));
            }
        }
    }

    public getRemarksModel(remText, type, cat, segment?: string) {
        let segmentrelate = [];
        if (segment) {
            segmentrelate = segment.split(',');
        }

        const rem = new RemarkModel();
        rem.category = cat;
        rem.remarkText = remText;
        rem.remarkType = type;
        rem.relatedSegments = segmentrelate;
        return rem;
    }

    private extractFreeText(segment: PassiveSegmentsModel, startdatevalue: string,
        startTime: string, enddatevalue: string, endTime: string) {

        let freetext = '';
        switch (segment.segmentType) {
            case 'TOR':
                let tourName = segment.vendorName + ' ' + segment.tourName;
                if (segment.roomType !== undefined) { tourName = tourName + ' ' + segment.roomType; }
                if (segment.mealPlan !== undefined) { tourName = tourName + ' ' + segment.mealPlan; }
                freetext = '/TYP-' + segment.segmentType + '/SUN-' + tourName + ' ' + segment.noNights +
                    'NTS/SUC-' + segment.vendorCode + '/SC-' + segment.departureCity + '/SD-' + startdatevalue +
                    '/ST-' + startTime + '/EC-' + segment.destinationCity +
                    '/ED-' + enddatevalue + '/ET-' + endTime + '/CF-' + segment.confirmationNo;
                break;
            case 'SEA':
                freetext = '/TYP-' + segment.segmentType + '/SUN-' + segment.vendorName + ' ' + segment.tourName + ' ' + segment.dining +
                    ' ' + segment.noNights + 'NTS/SUC-' + segment.vendorCode + '/SC-' +
                    segment.departureCity + '/SD-' + startdatevalue + '/ST-' + startTime + segment.destinationCity +
                    '/ED-' + enddatevalue + '/ET-' + endTime + '/CF-' + segment.confirmationNo;
                break;
            case 'INS':
                freetext = '/TYP-' + segment.segmentType + '/SUN-MANULIFE INSURANCE/SUC-MLF/SC-' +
                    segment.departureCity + '/SD-' + startdatevalue + '/ST-0900' + '/EC-' + segment.departureCity +
                    '/ED-' + enddatevalue + '/ET-0900/CF-CWT' + segment.policyNo;
                break;
            default:
                break;
        }
        return freetext;
    }

    getRetentionLine() {
        const lastDeptDate = this.pnrService.getLatestDepartureDate();
        const odate = lastDeptDate;
        odate.setDate(odate.getDate() + 180);

        const today = new Date();
        const maxdate = today;
        maxdate.setDate(maxdate.getDate() + 331);
        // testing
        // const lastDeptDate = new Date('12/10/2019');
        // const odate = lastDeptDate;
        // odate.setDate(odate.getDate() + 180);
        // const test = odate.toDateString();
        // const today = new Date('11/05/2019');
        // const maxdate = today;
        // const test2 = maxdate.toDateString();
        // maxdate.setDate(maxdate.getDate() + 331);

        let finaldate = new Date();
        if (odate > maxdate) {
            finaldate.setDate(finaldate.getDate() - 35);
        } else {
            finaldate = odate;
        }

        const misSegment = new Array<PassiveSegmentModel>();


        const mis = this.setMisRemark(finaldate, odate, 'THANK YOU FOR CHOOSING CARLSON WAGONLIT TRAVEL');
        const passGroup = new RemarkGroup();
        passGroup.group = 'MIS Remark';
        misSegment.push(mis);
        passGroup.passiveSegments = misSegment;
        return passGroup;
    }

    removeTeamMateMisRetention() {
        const remGroup = new RemarkGroup();
        remGroup.group = 'TeamMate Retention';
        const lineNo = this.pnrService.getMISRetentionLineNumber('CWT RETENTION SEGMENT');
        if (lineNo !== '') {
            remGroup.deleteSegmentByIds = [];
            remGroup.deleteSegmentByIds.push(lineNo);
        }

        return remGroup;
    }


    private setMisRemark(finaldate: any, odate: any, freetext: string) {
        const mis = new PassiveSegmentModel();
        const day = this.padDate(finaldate.getDate().toString());
        const mo = this.padDate((finaldate.getMonth() + 1).toString());
        const yr = odate.getFullYear().toString().substr(-2);

        mis.vendor = '1A';
        mis.status = 'HK';
        mis.startDate = day + mo + yr;
        mis.endDate = day + mo + yr;
        mis.startPoint = 'YYZ';
        mis.endPoint = 'YYZ';
        mis.freeText = freetext;
        mis.quantity = 1;
        mis.startTime = '0000';
        mis.endTime = '0000';
        mis.segmentName = 'RU';
        mis.function = '12';
        return mis;
    }

    getMandatoryRemarks() {
        const mandatoryRemarkGroup = new RemarkGroup();
        mandatoryRemarkGroup.group = 'Mandatory Remarks';
        let itinLanguage = this.pnrService.getItineraryLanguage();
        itinLanguage = itinLanguage.substr(0, 2);
        switch (true) {
            case (itinLanguage === 'EN'): {
                const LLBMandatoryRemarkEN = this.pnrService.getRIRLineNumber('WWW.CWTVACATIONS.CA/CWT/DO/INFO/PRIVACY');
                if (LLBMandatoryRemarkEN === '') {
                    const commandEN = 'PBN/LLB MANDATORY REMARKS*';
                    mandatoryRemarkGroup.cryptics.push(commandEN);
                }
                const MexicoMandatoryRemark = this.pnrService.getRIRLineNumber('MEXICAN TOURIST CARD IS REQUIRED FOR ENTRY INTO MEXICO');
                if (this.checkCityInSegments(this.mexicoCities) && MexicoMandatoryRemark === '') {
                    const command = 'MEXICAN TOURIST CARD IS REQUIRED FOR ENTRY INTO MEXICO';
                    mandatoryRemarkGroup.remarks.push(this.remarkHelper.createRemark(command, 'RI', 'R'));
                }
                break;
            }
            case (itinLanguage === 'FR'): {
                const LLBMandatoryRemarkFR = this.pnrService.getRIRLineNumber('WWW.CWTVACANCES.CA/DO/INFO/PRIVACY');
                if (LLBMandatoryRemarkFR === '') {
                    const commandFR = 'PBN/LLB MANDATORY FRENCH*';
                    mandatoryRemarkGroup.cryptics.push(commandFR);
                }
                const MexicoMandatoryRemark = this.pnrService.getRIRLineNumber('VOUS DEVEZ AVOIR UNE CARTE DE TOURISTE MEXICAIN');
                if (this.checkCityInSegments(this.mexicoCities) && MexicoMandatoryRemark === '') {
                    let command = 'VOUS DEVEZ AVOIR UNE CARTE DE TOURISTE MEXICAIN';
                    mandatoryRemarkGroup.remarks.push(this.remarkHelper.createRemark(command, 'RI', 'R'));
                    command = 'POUR ENTRER AU MEXIQUE';
                    mandatoryRemarkGroup.remarks.push(this.remarkHelper.createRemark(command, 'RI', 'R'));
                }
                break;
            }
            default: {
                return;
                break;
            }
        }

        return mandatoryRemarkGroup;
    }

    checkCityInSegments(cities: string[]): boolean {
        let res: boolean;
        res = false;

        const pnr = this.pnrService.pnrObj;
        // check if this can be retrieved from DDB

        for (const airSegment of pnr.airSegments) {
            const origin = airSegment.fullNode.travelProduct.boardpointDetail.cityCode;
            const destination = airSegment.fullNode.travelProduct.offpointDetail.cityCode;

            if (cities.indexOf(origin) !== -1 || cities.indexOf(destination) !== -1) {
                res = true;
            }
        }

        for (const car of pnr.auxCarSegments) {
            const carendpoint =
                car.fullNode.travelProduct.boardpointDetail.cityCode;
            if (cities.indexOf(carendpoint) !== -1) {
                res = true;
            }
        }

        for (const hotel of pnr.auxHotelSegments) {
            const hotelendpoint =
                hotel.fullNode.travelProduct.boardpointDetail.cityCode;
            if (cities.indexOf(hotelendpoint) !== -1) {
                res = true;
            }
        }

        for (const misc of pnr.miscSegments) {
            const miscendpoint =
                misc.fullNode.travelProduct.boardpointDetail.cityCode;
            if (cities.indexOf(miscendpoint) !== -1) {
                res = true;
            }
        }

        return res;
    }


    padDate(num: string) {
        let padnum = num;
        if (num.length < 2) {
            padnum = '0' + num;
        }
        return padnum;
    }

    osiCancelRemarks(cancel: any) {
        let remText = '';
        let multiremText = '';
        const rmGroup = new RemarkGroup();
        rmGroup.group = 'Cancel OSI';
        rmGroup.remarks = new Array<RemarkModel>();
        rmGroup.deleteRemarkByIds = new Array<string>();


        if (cancel.value.reasonACCancel) {
            let pass = '1';
            if (cancel.value.acpassengerNo !== undefined) {
                pass = cancel.value.acpassengerNo;
            }
            switch (cancel.value.reasonACCancel) {
                case '1':
                    remText = 'OS AC NCC 014' + cancel.value.acTicketNo + '/P' + pass;
                    break;
                case '2':
                    remText = 'OS AC FREE NCC LEGAL CHNG 014' + cancel.value.acTicketNo + '/P' + pass;
                    break;
                case '3':
                    remText = 'OS AC DUPE REFUND 014' + cancel.value.acTicketNo;
                    break;
                case '4':
                    remText = 'OS AC 24 HOUR RULE';
                    break;
                case '5':
                    remText = 'OS AC ' + cancel.value.acFlightNo + ' '
                        + cancel.value.accityPair + ' ' + cancel.value.acdepDate
                        + ' RELATIONSHIP ' + cancel.value.relationship + '/P' + pass;
                    break;
                case '6':
                    remText = 'OS AC ' + cancel.value.acFlightNo + ' '
                        + cancel.value.acdepDate + ' - ' + + cancel.value.accityPair + '/P' + pass;
                    break;
                default:
                    break;
            }

            rmGroup.cryptics.push(remText);
            // if (multiremText !== '') {
            //     rmGroup.cryptics.push(multiremText);
            // }
        }

        if (cancel.value.reasonUACancel) {
            let uapass = '1';
            if (cancel.value.uaPassengerNo !== undefined) {
                uapass = cancel.value.uaPassengerNo;
            }
            if (cancel.value.reasonUACancel === '1') {
                remText = 'SROTHSUA-' + cancel.value.uasegNo + '/BSP24REFUND/P' + uapass;
            }
            rmGroup.cryptics.push(remText);
        }

        if (remText !== '') {
            rmGroup.cryptics.push('RFCWTPTEST');
            rmGroup.cryptics.push('ER');
        }

        const nuRemarks = this.pnrService.hasNUCRemarks();
        if (nuRemarks !== '0') {
            rmGroup.deleteRemarkByIds.push(nuRemarks);
        }
        return rmGroup;
    }

    buildCancelRemarks(cancel: any, segmentselected: any) {
        let remText = '';
        const rmGroup = new RemarkGroup();
        rmGroup.group = 'Cancel';
        rmGroup.remarks = new Array<RemarkModel>();
        rmGroup.deleteRemarkByIds = new Array<string>();
        remText = '';
        const datePipe = new DatePipe('en-US');
        const dateToday = datePipe.transform(Date.now(), 'ddMMM');

        remText = dateToday + '/CANCEL REQUESTED BY ' + cancel.value.requestor;
        rmGroup.remarks.push(this.remarkHelper.getRemark(remText, 'RM', 'X'));

        remText = dateToday + '/' + cancel.value.desc1;
        rmGroup.remarks.push(this.remarkHelper.getRemark(remText, 'RM', 'X'));


        if (cancel.value.desc2) {
            remText = dateToday + '/' + cancel.value.desc2;
            rmGroup.remarks.push(this.remarkHelper.getRemark(remText, 'RM', 'X'));
        }

        const hotellook = segmentselected.find(x => x.segmentType === 'HTL');
        if (hotellook) {
            remText = dateToday + '/HTL SEGMENT INCLUDED IN CANCEL';
            rmGroup.remarks.push(this.remarkHelper.getRemark(remText, 'RM', 'X'));
        } else {
            remText = dateToday + '/NO HTL SEGMENT INCLUDED IN CANCEL';
            rmGroup.remarks.push(this.remarkHelper.getRemark(remText, 'RM', 'X'));
        }

        if (this.pnrService.getSegmentTatooNumber().length === segmentselected.length) {
            remText = dateToday + '/CANCELLED/CXLD SEG-ALL';
            rmGroup.remarks.push(this.remarkHelper.getRemark(remText, 'RM', 'X'));

            remText = '*FULLCXL**' + dateToday + '*';
            rmGroup.remarks.push(this.remarkHelper.getRemark(remText, 'RI', 'R'));
        } else {
            segmentselected.forEach(element => {
                remText = dateToday + '/CANCELLED/CXLD SEG-' + element.lineNo;
                rmGroup.remarks.push(this.remarkHelper.getRemark(remText, 'RM', 'X'));
            });
            const prevCancel = this.pnrService.getRemarksFromGDS().find(x => x.remarkText.indexOf('/CXLD SEG') > -1);
            const preCancel = this.pnrService.getRemarksFromGDS().find(x => x.remarkText.indexOf('/CXLD SEG-PRE') === -1);
            if (prevCancel && preCancel) {
                remText = dateToday + '/CANCELLED/CXLD SEG-PRE';
                rmGroup.remarks.push(this.remarkHelper.getRemark(remText, 'RM', 'X'));
            }
        }

        if (cancel.value.airlineNo) {
            remText = dateToday + '/CANCEL NR DUE TO IROP OR SKD CHG';
            rmGroup.remarks.push(this.remarkHelper.getRemark(remText, 'RM', 'X'));

            remText = dateToday + '/' + cancel.value.airlineNo;
            rmGroup.remarks.push(this.remarkHelper.getRemark(remText, 'RM', 'X'));
        }

        if (cancel.value.ticket1 && cancel.value.coupon1) {
            remText = dateToday + '/TKT NBR-' + cancel.value.ticket1 + ' CPNS-' + cancel.value.coupon1;
            rmGroup.remarks.push(this.remarkHelper.getRemark(remText, 'RM', 'X'));
        }

        if (cancel.value.ticket2 && cancel.value.coupon2) {
            remText = dateToday + '/TKT NBR-' + cancel.value.ticket2 + ' CPNS-' + cancel.value.coupon2;
            rmGroup.remarks.push(this.remarkHelper.getRemark(remText, 'RM', 'X'));
        }

        if (cancel.value.ticket3 && cancel.value.coupon3) {
            remText = dateToday + '/TKT NBR-' + cancel.value.ticket3 + ' CPNS-' + cancel.value.coupon3;
            rmGroup.remarks.push(this.remarkHelper.getRemark(remText, 'RM', 'X'));

        }
        if (cancel.value.ticket4 && cancel.value.coupon4) {
            remText = dateToday + '/TKT NBR-' + cancel.value.ticket4 + ' CPNS-' + cancel.value.coupon4;
            rmGroup.remarks.push(this.remarkHelper.getRemark(remText, 'RM', 'X'));
        }

        if (cancel.value.ticket5 && cancel.value.coupon5) {
            remText = dateToday + '/TKT NBR-' + cancel.value.ticket5 + ' CPNS-' + cancel.value.coupon5;
            rmGroup.remarks.push(this.remarkHelper.getRemark(remText, 'RM', 'X'));
        }

        if (cancel.value.ticket6 && cancel.value.coupon6) {
            remText = dateToday + '/TKT NBR-' + cancel.value.ticket6 + ' CPNS-' + cancel.value.coupon6;
            rmGroup.remarks.push(this.remarkHelper.getRemark(remText, 'RM', 'X'));
        }


        segmentselected.forEach(element => {
            rmGroup.deleteRemarkByIds.push(element.lineNo);
        });

        return rmGroup;
    }

    cancelMisSegment() {
        const misSegment = new Array<PassiveSegmentModel>();
        const datePipe = new DatePipe('en-US');
        const dateToday = datePipe.transform(Date.now(), 'ddMMM');
        let finaldate = new Date();

        finaldate.setDate(finaldate.getDate() + 90);
        const mis = this.setMisRemark(finaldate, finaldate, 'PNR CANCELLED ' + dateToday);
        const passGroup = new RemarkGroup();
        passGroup.group = 'MIS Remark';
        misSegment.push(mis);
        passGroup.passiveSegments = misSegment;

        return passGroup;
    }

}

