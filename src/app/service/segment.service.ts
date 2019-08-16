import { PassiveSegmentModel } from '../models/pnr/passive-segment.model';
import { DatePipe, formatDate } from '@angular/common';
import { RemarkGroup } from '../models/pnr/remark.group.model';
import { Injectable } from '@angular/core';
import { PnrService } from './pnr.service';
import { RemarkHelper } from '../helper/remark-helper';
import { RemarkModel } from '../models/pnr/remark.model';
import { PassiveSegmentsModel } from '../models/pnr/passive-segments.model';
import { FormArray, FormGroup } from '@angular/forms';
import { QueuePlaceModel } from '../models/pnr/queue-place.model';
import { CfRemarkModel } from '../models/pnr/cf-remark.model';
import { TranslationService } from './translation.service';

declare var smartScriptSession: any;
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

    constructor(private pnrService: PnrService, private remarkHelper: RemarkHelper, private translations: TranslationService) { }


    GetSegmentRemark(segmentRemarks: PassiveSegmentsModel[]) {
        const datePipe = new DatePipe('en-US');
        const tourSegment = new Array<PassiveSegmentModel>();
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

            if (segment.destinationCity === undefined) { segdest = segment.departureCity; } else { segdest = segment.destinationCity; }
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
                let relatePass = [];
                if (segment.segmentType === 'CAR') {
                    passive.segmentName = 'CU';
                    passive.function = '9';
                    passive.carType = segment.carType;
                    passive.quantity = 1;
                    relatePass.push('1');
                    relatePass = this.pnrService.getPassengerTatooValue(relatePass);
                }

                if (segment.segmentType === 'HTL') {
                    passive.segmentName = 'HU';
                    passive.function = '8';
                    passive.quantity = Number(segment.numberOfRooms);
                    for (let i = 1; i <= segment.numberOfRooms; i++) {
                        relatePass.push(i.toString());
                    }
                    relatePass = this.pnrService.getPassengerTatooValue(relatePass);
                }
                passive.relatedPassengers = relatePass;
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

    addSegmentRir(segRemark: any) {

        let segmentRemarks: PassiveSegmentsModel[];
        segmentRemarks = segRemark.segmentRemarks;
        const datePipe = new DatePipe('en-US');
        const rmGroup = new RemarkGroup();
        rmGroup.group = 'RIR remark';
        rmGroup.remarks = new Array<RemarkModel>();
        let amk = 0;
        let vib = 0;
        let itinLanguage = this.pnrService.getItineraryLanguage();
        itinLanguage = itinLanguage.substr(0, 2);

        const segments = this.pnrService.getSegmentTatooNumber();
        segmentRemarks.forEach(segmentrem => {
            if (!segmentrem.isNew) {
                return;
            }
            segments.forEach(pnrSegment => {
                const ddate = datePipe.transform(segmentrem.departureDate, 'ddMMyy');
                if (pnrSegment.deptdate !== ddate || pnrSegment.cityCode !== segmentrem.departureCity) {
                    return;
                }
                if (pnrSegment.segmentType === 'MIS') {
                    if (segmentrem.segmentType === 'SEA') {
                        this.rirCruise(pnrSegment, segmentrem, rmGroup);
                    }
                    if (segmentrem.segmentType === 'TRN') {
                        if (segmentrem.vendorCode === 'AMK') {
                            amk = amk + 1;
                        }
                        if (segmentrem.vendorCode === 'VIB') {
                            vib = vib + 1;
                        }
                        this.rirTrain(pnrSegment, segmentrem, rmGroup, amk, vib, itinLanguage);
                    }
                    if (segmentrem.segmentType === 'LIM') {
                        this.rirLimo(pnrSegment, segmentrem, rmGroup, itinLanguage);
                    }
                }

                if (segmentrem.segmentType === 'AIR' && pnrSegment.segmentType === 'AIR') {
                    this.rirAir(pnrSegment, segmentrem, rmGroup);
                }

                if (segmentrem.segmentType === 'CAR' && pnrSegment.segmentType === 'CAR') {
                    this.rirCar(pnrSegment, segmentrem, rmGroup);
                }

                if (segmentrem.segmentType === 'HTL' && pnrSegment.segmentType === 'HTL') {
                    this.rirHotel(pnrSegment, segmentrem, rmGroup);
                }
            });
        });

        return rmGroup;
    }

    private rirAir(pnrSegment: any, segmentrem: PassiveSegmentsModel, rmGroup: RemarkGroup) {
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

    private rirHotel(pnrSegment: any, segmentrem: PassiveSegmentsModel, rmGroup: RemarkGroup) {
        let province = '';
        let zip = '';
        const optionalHotelRemarks = [{ include: segmentrem.confirmedWith, description: 'ROOM CONFIRMED WITH - ' },
        { include: segmentrem.additionalInfo, description: 'ADDITONAL INFORMATION - ' }];


        if (segmentrem.province) { province = segmentrem.province; }
        if (segmentrem.zipCode) { zip = segmentrem.zipCode; }

        const mandatoryHotelRemarks = ['ADDRESS-' + segmentrem.address,
        segmentrem.hotelCityName + ' ' + province,
        segmentrem.country + ' ' + zip,
        'GUARANTEED  FOR LATE ARRIVAL - ' + segmentrem.guaranteedLate,
        'CANCELLATION POLICY - ' + segmentrem.policyNo];

        mandatoryHotelRemarks.forEach(c => {
            rmGroup.remarks.push(this.getRemarksModel(c, 'RI', 'R', pnrSegment.tatooNo));
        });

        // Add new remark line for each hotel. Refer to US13461;
        rmGroup.remarks.push(this.getRemarksModel("HS" + formatDate(Date.parse(segmentrem.departureDate), 'ddMMM', 'en-us') + '/-CHN-' + segmentrem.chainCode, 'RM', '*'));

        optionalHotelRemarks.forEach(c => {
            if (c.include) {
                rmGroup.remarks.push(this.getRemarksModel(c.description + c.include, 'RI', 'R', pnrSegment.tatooNo));
            }
        });
    }

    private rirCar(pnrSegment: any, segmentrem: PassiveSegmentsModel, rmGroup: RemarkGroup) {
        const optionalCarRemarks = [{ include: segmentrem.specialRequest, description: '' },
        { include: segmentrem.specialEquipment, description: '' },
        { include: segmentrem.pickupOffAddress, description: 'Pick Up-' },
        { include: segmentrem.dropOffAddress, description: 'Drop off-' },
        { include: segmentrem.dropOffFee, description: 'Drop Fee-' }];

        const optionalcdid = [{ include: segmentrem.cdNumber, description: 'CD-' },
        { include: segmentrem.idNumber, description: 'ID-' }];

        optionalCarRemarks.forEach(c => {
            if (c.include) {
                rmGroup.remarks.push(this.getRemarksModel(c.description + c.include, 'RI', 'R', pnrSegment.tatooNo));
            }
        });

        let cdid = '';
        optionalcdid.forEach(c => {
            if (c.include) {
                cdid = cdid + ' ' + c.description + c.include;
            }
        });

        if (cdid !== '') {
            rmGroup.remarks.push(this.getRemarksModel(cdid.substr(1), 'RI', 'R', pnrSegment.tatooNo));
        }

        if (segmentrem.frequentFlierNumber && segmentrem.frequentflightNumber) {
            rmGroup.remarks.push(this.getRemarksModel('Airline FF-' +
                segmentrem.frequentFlierNumber + segmentrem.frequentflightNumber, 'RI', 'R', pnrSegment.tatooNo));
        }
    }

    private rirCruise(pnrSegment: any, segmentrem: PassiveSegmentsModel, rmGroup: RemarkGroup) {
        const type = pnrSegment.freetext.substr(6, 3);
        let remText = '';
        if (type === 'SEA') {
            if (segmentrem.stateRoom) {
                remText = segmentrem.stateRoom;
                if (segmentrem.stateRoom === 'OTHER') {
                    remText = segmentrem.othersText;
                }
            }

            if (segmentrem.cabinNo) {
                remText = remText + ' ' + segmentrem.cabinNo;
            }
            rmGroup.remarks.push(this.getRemarksModel(remText, 'RI', 'R', pnrSegment.tatooNo));
        }
    }

    private rirTrain(pnrSegment: any, segmentrem: PassiveSegmentsModel, rmGroup: RemarkGroup,
        amk: number, vib: number, itinLanguage: string) {

        if (segmentrem.trainNumber && segmentrem.classService) {
            rmGroup.remarks.push(this.getRemarksModel
                ('TRAIN NUMBER-' + segmentrem.trainNumber.toString()
                    + ' CLASS-' + segmentrem.classService, 'RI', 'R', pnrSegment.tatooNo));
        }

        let carseat = '';
        if (segmentrem.carNumber) {
            carseat = carseat + 'CAR-' + segmentrem.carNumber;
        }

        if (segmentrem.seatNumber) {
            carseat = carseat + ' SEAT NUMBER-' + segmentrem.seatNumber;
        }

        if (carseat !== '') {
            rmGroup.remarks.push(this.getRemarksModel
                (carseat, 'RI', 'R', pnrSegment.tatooNo));
        }

        if (vib === 1 && segmentrem.vendorCode === 'VIB' && !this.pnrService.IsExistAmkVib('vib')) {
            const segRemarks = this.translations.getRemarkGroup('VibRemarksSegment', itinLanguage);
            segRemarks.forEach(c => {
                rmGroup.remarks.push(this.getRemarksModel(c, 'RI', 'R', pnrSegment.tatooNo));
            });
        }
        if (amk === 1 && segmentrem.vendorCode === 'AMK' && !this.pnrService.IsExistAmkVib('AMK')) {
            this.getAmkRemark().forEach(c => {
                rmGroup.remarks.push(this.getRemarksModel(c, 'RI', 'R', pnrSegment.tatooNo));
            });
        }
    }
    getAmkRemark() {
        const amkRemark = [
            'VALID IDENTIFICATION IS REQUIRED FOR ALL PASSENGERS 18 AND OVER.',
            'ALL AMTRAK TRAINS EXCEPT AUTO TRAIN ARE NON-SMOKING.',
            'TRAIN CHANGES ARE PERMITTED ANYTIME SUBJECT TO AVAILABILITY',
            'IF YOU NEED TO CHANGE OR CANCEL YOUR RESERVATION-',
            'REFUND/CHANGE FEES MAY APPLY',
            'RECOMMENDED ARRIVAL TIME AT THE STATION AT LEAST 30 MINUTES',
            'PRIOR TO YOUR SCHEDULES DEPARTURE.',
            'ALLOW ADDITIONAL TIME IF YOU NEED HELP WITH BAGGAGE OR TICKETS.',
            'IF YOU ARE TRAVELLING ON THE AUTO TRAIN YOU MUST CHECK IN',
            'AT LEAST 2 HOURS BEFORE SCHEDULED DEPARTURE.',
            'THIS CONFIRMATION NOTICE IS NOT A TICKET',
            'YOU MUST OBTAIN YOUR TICKET BEFORE BOARDING ANY TRAIN.',
            'THIS CONFIRMATION WILL NOT BE ACCEPTED ONBOARD.',
            'YOUR ENTIRE RESERVATION -ALL SEGMENTS- WILL BE CANCELLED',
            'IF YOU DO NOT PICK UP YOUR TICKET BEFORE YOUR FIRST DEPARTURE OR',
            'IF YOU NO-SHOW FOR ANY SEGMENT IN YOUR RESERVATION.',
            'IF YOUR RESERVATION CANCELS YOU WILL NEED TO MAKE NEW',
            'RESERVATIONS WHICH MAY BE AT A HIGHER FARE.'
        ];
        return amkRemark;
    }
    private rirLimo(pnrSegment: any, segmentrem: PassiveSegmentsModel, rmGroup: RemarkGroup, itinLanguage: string) {
        let taxRemarks = '';
        let nottaxRemarks = '';

        const rirTaxes = [{ include: segmentrem.includeTax, description: '-TAXES', rate: segmentrem.taxOnRate },
        { include: segmentrem.includeToll, description: '-TOLLS', rate: segmentrem.toll },
        { include: segmentrem.includeGratuities, description: '-Gratuities', rate: segmentrem.gratuities },
        { include: segmentrem.includeParking, description: '-Parking', rate: segmentrem.parking }];

        if (itinLanguage === 'FR') {
            this.getLimoRirFrenckRemarks(rmGroup, segmentrem, pnrSegment);

        } else {
            this.getLimoEnglisgRemarks(rmGroup, segmentrem, pnrSegment);

        }

        rirTaxes.forEach(c => {
            if (c.include) {
                taxRemarks = taxRemarks + c.description;
            } else {
                if (c.rate) {
                    nottaxRemarks = nottaxRemarks + c.description + ' ' + c.rate;
                } else {
                    nottaxRemarks = nottaxRemarks + c.description;
                }
            }
        });

        if (nottaxRemarks !== '') {
            rmGroup.remarks.push(this.getRemarksModel(
                'RATE DOES NOT INCLUDE ' + nottaxRemarks.substr(1), 'RI', 'R', pnrSegment.tatooNo));
        }

        if (taxRemarks !== '') {
            rmGroup.remarks.push(this.getRemarksModel(
                'Rate Includes ' + taxRemarks.substr(1), 'RI', 'R', pnrSegment.tatooNo));
        }
    }


    private getLimoEnglisgRemarks(rmGroup: RemarkGroup, segmentrem: PassiveSegmentsModel, pnrSegment: any) {
        const optionalEnglishRemarks = [{ include: segmentrem.limoCoAgent, description: 'CONFIRMED WITH ' },
        { include: segmentrem.meetDriveAt, description: 'MEET DRIVER AT ' },
        { include: segmentrem.additionalInfo, description: '' },
        { include: segmentrem.cancellationInfo, description: 'CANCEL INFO-' }];

        rmGroup.remarks.push(this.getRemarksModel('Phone Number ' + segmentrem.phone, 'RI', 'R', pnrSegment.tatooNo));
        rmGroup.remarks.push(this.getRemarksModel('Pick Up-' + segmentrem.pickupLoc +
            ' Time-' + segmentrem.departureTime, 'RI', 'R', pnrSegment.tatooNo));
        rmGroup.remarks.push(this.getRemarksModel('Transfer To-' + segmentrem.transferTo, 'RI', 'R', pnrSegment.tatooNo));
        rmGroup.remarks.push(this.getRemarksModel('Rate -' + segmentrem.rate + ' ' + segmentrem.rateType, 'RI', 'R', pnrSegment.tatooNo));

        optionalEnglishRemarks.forEach(c => {
            if (c.include) {
                rmGroup.remarks.push(this.getRemarksModel(c.description + c.include, 'RI', 'R', pnrSegment.tatooNo));
            }
        });
    }

    private getLimoRirFrenckRemarks(rmGroup: RemarkGroup, segmentrem: PassiveSegmentsModel, pnrSegment: any) {

        const optionalFrenchRemarks = [{ include: segmentrem.limoCoAgent, description: 'CONFIRME PAR ' },
        { include: segmentrem.meetDriveAt, description: 'LE CHAUFFEUR SERA A ' },
        { include: segmentrem.additionalInfo, description: '' },
        { include: segmentrem.cancellationInfo, description: 'CANCEL INFO-' }];

        rmGroup.remarks.push(this.getRemarksModel('Phone ' + segmentrem.phone, 'RI', 'R', pnrSegment.tatooNo));
        rmGroup.remarks.push(this.getRemarksModel('DE ' + segmentrem.pickupLoc + ' CUEILLETTE A-' +
            segmentrem.departureTime, 'RI', 'R', pnrSegment.tatooNo));
        rmGroup.remarks.push(this.getRemarksModel('A ' + segmentrem.transferTo, 'RI', 'R', pnrSegment.tatooNo));
        rmGroup.remarks.push(this.getRemarksModel('TARIF -' + segmentrem.rate + ' ' + segmentrem.rateType, 'RI', 'R', pnrSegment.tatooNo));
        optionalFrenchRemarks.forEach(c => {
            if (c.include) {
                rmGroup.remarks.push(this.getRemarksModel(c.description + c.include, 'RI', 'R', pnrSegment.tatooNo));
            }
        });
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
        let suplierName = '';
        if (segment.vendorName) {
            suplierName = segment.vendorName.replace(/ *\([^)]*\) */g, ' ').trim();
        }

        switch (segment.segmentType) {
            case 'TOR':
                let tourName = suplierName + ' ' + segment.tourName;
                if (segment.roomType !== undefined) { tourName = tourName + ' ' + segment.roomType; }
                if (segment.mealPlan !== undefined) { tourName = tourName + ' ' + segment.mealPlan; }
                freetext = '/TYP-' + segment.segmentType + '/SUN-' + tourName + ' ' + segment.noNights +
                    'NTS/SUC-' + segment.vendorCode + '/SC-' + segment.departureCity + '/SD-' + startdatevalue +
                    '/ST-' + startTime + '/EC-' + segment.destinationCity +
                    '/ED-' + enddatevalue + '/ET-' + endTime + '/CF-' + segment.confirmationNo;
                break;
            case 'SEA':
                freetext = '/TYP-' + segment.segmentType + '/SUN-' + suplierName + ' ' + segment.tourName + ' ' + segment.dining +
                    ' ' + segment.noNights + 'NTS/SUC-' + segment.vendorCode + '/SC-' +
                    segment.departureCity + '/SD-' + startdatevalue + '/ST-' + startTime + segment.destinationCity +
                    '/ED-' + enddatevalue + '/ET-' + endTime + '/CF-' + segment.confirmationNo;
                break;
            case 'INS':
                freetext = '/TYP-' + segment.segmentType + '/SUN-MANULIFE INSURANCE/SUC-MLF/SC-' +
                    segment.departureCity + '/SD-' + startdatevalue + '/ST-0900' + '/EC-' + segment.departureCity +
                    '/ED-' + enddatevalue + '/ET-0900/CF-CWT' + segment.policyNo;
                break;
            case 'TRN':

                freetext = '/TYP-' + segment.segmentType + '/SUN-' + suplierName + '/SUC-' + segment.vendorCode + '/SC-' +
                    segment.fromStation + '/SD-' + startdatevalue + '/ST-' + startTime + '/EC-' + segment.arrivalStation +
                    '/ED-' + enddatevalue + '/ET-' + endTime + '/CF-' + segment.confirmationNo;
                break;
            case 'LIM':
                freetext = '/TYP-' + segment.segmentType + '/SUN-' + suplierName + '/SUC-' + segment.vendorCode + '/STP-' +
                    segment.transferTo + '/SD-' + startdatevalue + '/ST-' + startTime + '/EC-' + segment.departureCity +
                    '/ED-' + startdatevalue + '/ET-' + startTime + '/CF-' + segment.confirmationNo;
                break;
            case 'CAR':
                freetext = 'SUC-' + segment.vendorCode + '/SUN-' + suplierName + '/SD-' + startdatevalue + '/ST-' + startTime +
                    '/ED-' + enddatevalue + '/ET-' + endTime + '/TTL-' + segment.rentalCost + segment.currency +
                    '/DUR-' + segment.duration + '/MI-' + segment.mileage + segment.mileagePer +
                    (segment.mileage === 'UNL' ? '' : ' FREE') +
                    '/URA-' + segment.rateBooked + segment.currency + '/CF-' + segment.confirmationNo;
                break;
            case 'HTL':

                let hotelfax = '';
                let additionalInfo = '';
                let roomType = '';
                if (segment.fax) { hotelfax = ',FAX-' + segment.fax; }
                if (segment.additionalInfo) { additionalInfo = ',SI-' + segment.additionalInfo; }
                if (segment.roomType) { roomType = ',' + segment.roomType; }

                freetext = segment.hotelCityName + ',' + segment.hotelName + ',TEL-' + segment.phone + hotelfax +
                    ',CF:' + segment.confirmationNo + roomType + ',RATE:' + segment.rateType + ' ' +
                    segment.currency + segment.nightlyRate + '/NIGHT' + additionalInfo;
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
        const noOfPassenger = this.pnrService.getPassengers().length;

        mis.vendor = '1A';
        mis.status = 'HK';
        mis.startDate = day + mo + yr;
        mis.endDate = day + mo + yr;
        mis.startPoint = 'YYZ';
        mis.endPoint = 'YYZ';
        mis.freeText = freetext;
        mis.quantity = noOfPassenger;
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
                const llbMandatoryRemarkEn = this.pnrService.getRIRLineNumber('WWW.CWTVACATIONS.CA/CWT/DO/INFO/PRIVACY');
                if (llbMandatoryRemarkEn === '') {
                    const commandEN = 'PBN/LLB MANDATORY REMARKS*';
                    mandatoryRemarkGroup.cryptics.push(commandEN);
                }
                const mexicoMandatoryRemark = this.pnrService.getRIRLineNumber('MEXICAN TOURIST CARD IS REQUIRED FOR ENTRY INTO MEXICO');
                if (this.checkCityInSegments(this.mexicoCities) && mexicoMandatoryRemark === '') {
                    const command = 'MEXICAN TOURIST CARD IS REQUIRED FOR ENTRY INTO MEXICO';
                    mandatoryRemarkGroup.remarks.push(this.remarkHelper.createRemark(command, 'RI', 'R'));
                }
                break;
            }
            case (itinLanguage === 'FR'): {
                const llbMandatoryRemarkFR = this.pnrService.getRIRLineNumber('WWW.CWTVACANCES.CA/DO/INFO/PRIVACY');
                if (llbMandatoryRemarkFR === '') {
                    const commandFR = 'PBN/LLB MANDATORY FRENCH*';
                    mandatoryRemarkGroup.cryptics.push(commandFR);
                }
                const mexicoMandatoryRemark = this.pnrService.getRIRLineNumber('VOUS DEVEZ AVOIR UNE CARTE DE TOURISTE MEXICAIN');
                if (this.checkCityInSegments(this.mexicoCities) && mexicoMandatoryRemark === '') {
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
        const rmGroup = new RemarkGroup();
        rmGroup.group = 'Cancel OSI';
        rmGroup.remarks = new Array<RemarkModel>();
        rmGroup.deleteRemarkByIds = new Array<string>();

        if (cancel.value.reasonACCancel) {
            const arr = cancel.get('actickets') as FormArray;
            if (arr.status !== 'DISABLED') {
                for (const c of arr.controls) {
                    const acTicketNo = c.get('acTicketNo').value;
                    let acpassengerNo = 1;
                    if (c.get('acpassengerNo').value) {
                        acpassengerNo = c.get('acpassengerNo').value.toString();
                    }
                    switch (cancel.value.reasonACCancel) {
                        case '1':
                            remText = 'OS AC NCC 014' + acTicketNo + '/P' + acpassengerNo;
                            break;
                        case '2':
                            remText = 'OS AC FREE NCC LEGAL CHNG 014' + cancel.value.acTicketNo + '/P' + acpassengerNo;
                            break;
                        case '3':
                            remText = 'OS AC DUPE REFUND 014' + acTicketNo + ' TO BE USED';
                            break;
                        default:
                            break;
                    }
                    if (remText) {
                        rmGroup.cryptics.push(remText);
                    }
                }
            }
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
            rmGroup.cryptics.push('RF' + cancel.value.requestor);
            rmGroup.cryptics.push('ER');
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

        if (cancel.value.airlineNo || (cancel.value.acFlightNo && cancel.value.reasonACCancel === '6')) {
            let affectedairline = '';
            if (cancel.value.airlineNo) {
                affectedairline = cancel.value.airlineNo;
            }
            if (cancel.value.acFlightNo) {
                affectedairline = affectedairline + ',' + cancel.value.acFlightNo;
            }

            affectedairline = affectedairline.replace(/^,+/, '');
            remText = dateToday + '/CANCEL NR DUE TO IROP OR SKD CHG';
            rmGroup.remarks.push(this.remarkHelper.getRemark(remText, 'RM', 'X'));
            remText = dateToday + '/' + affectedairline;
            rmGroup.remarks.push(this.remarkHelper.getRemark(remText, 'RM', 'X'));
        }

        const arr = cancel.get('tickets') as FormArray;

        for (const c of arr.controls) {
            const ticket = c.get('ticket').value;
            const coupon = c.get('coupon').value.toString();
            if (arr.controls.length >= 1 && ticket && coupon) {
                remText = dateToday + '/TKT NBR-' + ticket + ' CPNS-' + coupon;
                rmGroup.remarks.push(this.remarkHelper.getRemark(remText, 'RM', 'X'));
            }
        }

        if (cancel.value.reasonACCancel) {
            switch (cancel.value.reasonACCancel) {
                case '4':
                    remText = 'AC Refund Waiver Code - AC24HRRULE';
                    rmGroup.remarks.push(this.remarkHelper.getRemark(remText, 'RM', 'X'));
                    break;
                case '5':
                    remText = 'AC Refund Waiver Code - ACDUEDEATH' + cancel.value.relationship;
                    rmGroup.remarks.push(this.remarkHelper.getRemark(remText, 'RM', 'X'));
                    break;
                case '6':
                    remText = 'AC Refund Waiver Code - ACFLTIRROP' + cancel.value.acFlightNo;
                    rmGroup.remarks.push(this.remarkHelper.getRemark(remText, 'RM', 'X'));
                    break;
                case '9':
                    remText = 'AC Refund Waiver Code - ACUSKEDCHG' + cancel.value.acFlightNo;
                    rmGroup.remarks.push(this.remarkHelper.getRemark(remText, 'RM', 'X'));
                    break;
                case '10':
                    remText = 'AC Refund Waiver Code - ACUDELAY02' + cancel.value.acFlightNo;
                    rmGroup.remarks.push(this.remarkHelper.getRemark(remText, 'RM', 'X'));
                    break;
                case '11':
                    remText = 'AC Refund Waiver Code - ACCAL2DUTY' + cancel.value.acCancelMonth + cancel.value.acCancelYear;
                    rmGroup.remarks.push(this.remarkHelper.getRemark(remText, 'RM', 'X'));
                    break;
                default:
                    break;
            }
        }


        segmentselected.forEach(element => {
            rmGroup.deleteSegmentByIds.push(element.lineNo);
        });

        const regex = /\*FULLCXL\*\*(?<date>.*)/g;
        const rems = this.pnrService.getRemarksFromGDSByRegex(regex, 'RIR');
        if (rems.length > 0) {
            rems.forEach((r) => {
                rmGroup.deleteRemarkByIds.push(r.lineNo);
            });
        }

        return rmGroup;
    }

    cancelMisSegment() {
        const misSegment = new Array<PassiveSegmentModel>();
        const datePipe = new DatePipe('en-US');
        const dateToday = datePipe.transform(Date.now(), 'ddMMM');
        const finaldate = new Date();

        finaldate.setDate(finaldate.getDate() + 90);
        const mis = this.setMisRemark(finaldate, finaldate, 'PNR CANCELLED ' + dateToday);
        const passGroup = new RemarkGroup();
        passGroup.group = 'MIS Remark';
        misSegment.push(mis);
        passGroup.passiveSegments = misSegment;
        const fordeletion = this.pnrService.getmisCancel();
        if (fordeletion > 0) {
            passGroup.deleteSegmentByIds.push(fordeletion);
        }
        return passGroup;
    }


    writeOptionalFareRule(fareRuleModels: any) {
        const rmGroup = new RemarkGroup();
        rmGroup.group = 'Fare Rule';
        rmGroup.remarks = new Array<RemarkModel>();
        fareRuleModels.forEach(model => {
            if (model.fareRuleType !== '') {
                smartScriptSession.send('PBN/' + this.pnrService.PCC + '/' + model.airlineCode + ' ' + model.fareRuleType + '*');
                rmGroup.remarks.push(this.remarkHelper.createRemark(model.cityPair, 'RI', 'R'));
            } else {

                if (model.isTicketNonRefundable) {
                    rmGroup.remarks.push(this.remarkHelper.createRemark('TICKET IS NONREFUNDABLE - NO CHANGES CAN BE MADE.', 'RI', 'R'));
                }

                if (model.isTicketMinMax) {
                    rmGroup.remarks.push(this.remarkHelper.createRemark('TICKET HAS A MINIMUM AND/OR MAXIMUM STAY REQUIREMENT.',
                        'RI', 'R'));
                }

                if (model.isTicketNonRef) {
                    rmGroup.remarks.push(this.remarkHelper.createRemark('TICKET IS NON-REFUNDABLE - UNDER CERTAIN CONDITIONS', 'RI', 'R'));
                    rmGroup.remarks.push(this.remarkHelper.createRemark('VALUE MAY BE APPLIED FOR FUTURE TRAVEL.', 'RI', 'R'));
                }

                if (model.ticketAmount && model.currencyType) {
                    rmGroup.remarks.push(this.remarkHelper.createRemark('YOUR TICKET IS ' + model.ticketAmount + ' ' +
                        model.currencyType + ' NON-REFUNDABLE IF CANCELLED.', 'RI', 'R'));
                    rmGroup.remarks.push(this.remarkHelper.createRemark('SOME CHANGES ARE ALLOWED UNDER RESTRICTIVE CONDITIONS FOR A',
                        'RI', 'R'));
                    rmGroup.remarks.push(this.remarkHelper.createRemark('CHANGE FEE AND/OR POSSIBLE INCREASE IN FARE.', 'RI', 'R'));
                }

                if (model.nonRefundable) {
                    rmGroup.remarks.push(this.remarkHelper.createRemark('YOUR TICKET IS ' + model.nonRefundable
                        + ' PERCENT NON-REFUNDABLE IF CANCELLED.', 'RI', 'R'));
                    rmGroup.remarks.push(this.remarkHelper.createRemark('SOME CHANGES ARE ALLOWED UNDER RESTRICTIVE CONDITIONS FOR A',
                        'RI', 'R'));
                    rmGroup.remarks.push(this.remarkHelper.createRemark('CHANGE FEE AND/OR POSSIBLE INCREASE IN FARE.', 'RI', 'R'));
                }

                if (model.minChangeFee) {
                    rmGroup.remarks.push(this.remarkHelper.createRemark('THE MINIMUM CHANGE FEE IS ' + model.minChangeFee
                        + ' ' + (model.currencyType), 'RI', 'R'));
                }
            }

            const segments = this.pnrService.getSegmentTatooNumber();
            for (const fg of model.remarkList) {
                const remark = this.remarkHelper.createRemark(fg, 'RI', 'R');
                const s = model.segmentNo.split(',');
                s.forEach(x => {
                    const tat = segments.find(z => z.lineNo === x);
                    if (tat) {
                        remark.relatedSegments.push(tat.tatooNo);
                    }
                });
                rmGroup.remarks.push(remark);
            }
        });

        return rmGroup;
    }

    writeRefundRemarks(refund: FormGroup) {
        const remGroup = new RemarkGroup();
        remGroup.group = 'Refund Remark';
        remGroup.remarks = new Array<RemarkModel>();

        const rmxRemarks = [
            { include: refund.controls.branch.value, description: 'BRANCH ', include2: 'ok' },
            { include: refund.controls.personRequesting.value, description: 'PERSON REQUESTING ', include2: 'ok' },
            { include: refund.controls.passengerName.value, description: 'PASSENGER ', include2: 'ok' },
            {
                include: refund.controls.cfa.value, description: 'CFA ',
                include2: refund.controls.cancellation.value, description2: 'CANCELLATION '
            },
            {
                include: refund.controls.commission.value, description: 'COMM RECALL ONLY ',
                include2: refund.controls.supplier.value, description2: 'SUPPLIER '
            },
            { include: refund.controls.baseRefund.value, description: 'BASE REFUND BEFORE PENALTY  ', include2: 'ok' },
            { include: refund.controls.taxesRef.value, description: 'TAXES REFUNDED ', include2: 'ok' },
            { include: refund.controls.penaltyPoint.value, description: 'PENALTY ', include2: 'ok' },
            {
                include: refund.controls.commissionPoint.value, description: 'COMM RECALL ',
                include2: refund.controls.taxRecall.value, description2: 'TAX ON COMM RECALL '
            },
            { include: refund.controls.comments.value, description: 'COMMENTS ', include2: 'ok' }
        ];

        rmxRemarks.forEach((c) => {
            if (c.include && c.include2 === 'ok') {
                remGroup.remarks.push(this.remarkHelper.createRemark(c.description + c.include, 'RM', 'X'));
            } else if ((c.include && c.include2 !== 'ok') || (c.include2 && c.include2 !== 'ok')) {
                let remarkText = '';
                if (c.include) {
                    remarkText = c.description + c.include + ' ';
                }
                if (c.include2) {
                    remarkText = remarkText + c.description2 + c.include2;
                }
                remGroup.remarks.push(this.remarkHelper.createRemark(remarkText, 'RM', 'X'));
            }
        });

        return remGroup;
    }


    queueCancel(frmCancel: FormGroup, cfa: CfRemarkModel) {
        const queueGroup = Array<QueuePlaceModel>();
        if (frmCancel.controls.followUpOption.value === 'BSP Queue') {
            this.getQueueMinder(queueGroup, 'bspAllCfa');
            if (cfa.cfa === 'RBP' || cfa.cfa === 'RBM') {
                this.getQueueMinder(queueGroup, 'rbpRbm');
            }
        }

        if (frmCancel.controls.followUpOption.value === 'Non BSP Refund') {
            this.getQueueMinder(queueGroup, 'nonBspAllCfa');
        }

        return queueGroup;
    }


    private getQueueMinder(queueGroup: Array<QueuePlaceModel>, controlname: string, queueno?: string) {
        const queue = new QueuePlaceModel();

        const queuePlaceDescription = [
            { control: 'rbpRbm', queueNo: '41', pcc: 'YTOWL2104', text: 'RBP RBM', category: '98' },
            { control: 'bspAllCfa', queueNo: '41', pcc: 'YTOWL210O', text: 'BSP ALL CFA', category: '94' },
            { control: 'nonBspAllCfa', queueNo: '41', pcc: 'YTOWL2108', text: 'NON BSP', category: '97' }
        ];
        const look = queuePlaceDescription.find((x) => x.control === controlname);
        if (look) {
            queue.queueNo = look.queueNo;
            if (queueno) {
                queue.queueNo = queueno;
            }
            queue.pcc = look.pcc;
            if (look.pcc === '') {
                queue.pcc = this.pnrService.PCC;
            }
            queue.freetext = look.text;
            queue.category = look.category;
            queue.date = formatDate(Date.now(), 'ddMMyy', 'en').toString();
            queueGroup.push(queue);
        }
    }
}

