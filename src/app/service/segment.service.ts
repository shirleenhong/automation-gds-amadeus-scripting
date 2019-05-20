
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
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { RemarkService } from './remark.service';

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

    constructor(private pnrService: PnrService, private remarkHelper: RemarkHelper, private remarkService: RemarkService) { }


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
                if (segment.segmentType === 'CAR') {
                    passive.segmentName = 'CU';
                    passive.function = '9';
                    passive.carType = segment.carType;
                }
                if (segment.segmentType === 'HTL') {
                    passive.segmentName = 'HU';
                    passive.function = '8';
                    passive.quantity = Number(segment.numberOfRooms);
                }

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
                        this.rirTrain(pnrSegment, segmentrem, rmGroup, segRemark, amk, vib, itinLanguage);
                    }
                    if (segmentrem.segmentType === 'LIM') {
                        this.rirLimo(pnrSegment, segmentrem, rmGroup, segRemark, itinLanguage);
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
        segRemark: any, amk: number, vib: number, itinLanguage: string) {

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
            if (itinLanguage === 'FR') {
                segRemark.getVibFrenchRemark().forEach(c => {
                    rmGroup.remarks.push(this.getRemarksModel(c, 'RI', 'R', pnrSegment.tatooNo));
                });
            } else {
                segRemark.getVibEnglishRemark().forEach(c => {
                    rmGroup.remarks.push(this.getRemarksModel(c, 'RI', 'R', pnrSegment.tatooNo));
                });
            }
        }
        if (amk === 1 && segmentrem.vendorCode === 'AMK' && !this.pnrService.IsExistAmkVib('AMK')) {
            segRemark.getAmkRemark().forEach(c => {
                rmGroup.remarks.push(this.getRemarksModel(c, 'RI', 'R', pnrSegment.tatooNo));
            });
        }
    }

    private rirLimo(pnrSegment: any, segmentrem: PassiveSegmentsModel, rmGroup: RemarkGroup, segRemark: any, itinLanguage: string) {
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
            case 'TRN':

                freetext = '/TYP-' + segment.segmentType + '/SUN-' + segment.vendorName + '/SUC-' + segment.vendorCode + '/SC-' +
                    segment.fromStation + '/SD-' + startdatevalue + '/ST-' + startTime + '/EC-' + segment.arrivalStation +
                    '/ED-' + enddatevalue + '/ET-' + endTime + '/CF-' + segment.confirmationNo;
                break;
            case 'LIM':
                freetext = '/TYP-' + segment.segmentType + '/SUN-' + segment.vendorName + '/SUC-' + segment.vendorCode + '/STP-' +
                    segment.transferTo + '/SD-' + startdatevalue + '/ST-' + startTime + '/EC-' + segment.departureCity +
                    '/ED-' + startdatevalue + '/ET-' + startTime + '/CF-' + segment.confirmationNo;
                break;
            case 'CAR':
                freetext = 'SUC-' + segment.vendorCode + '/SUN-' + segment.vendorName + '/SD-' + startdatevalue + '/ST-' + startTime +
                    '/ED-' + enddatevalue + '/ET-' + endTime + '/TTL-' + segment.rentalCost + segment.currency +
                    '/DUR-' + segment.duration + '/MI-' + segment.mileage + segment.mileagePer + ' FREE/CF-' +
                    segment.confirmationNo;
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
            rmGroup.cryptics.push('RF' + cancel.value.requestor);
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

        const arr = cancel.get('tickets') as FormArray

        for (const c of arr.controls) {
            const ticket = c.get('ticket').value;
            const coupon = c.get('coupon').value.toString();
            if (arr.controls.length >= 1 && ticket && coupon) {
                remText = dateToday + '/TKT NBR-' + ticket + ' CPNS-' + coupon;
                rmGroup.remarks.push(this.remarkHelper.getRemark(remText, 'RM', 'X'));
            }
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


    executePDN(airlineCode: string) {
        const rmGroup = new RemarkGroup();
        rmGroup.group = 'Fare Rule PDN';
        rmGroup.remarks = new Array<RemarkModel>();
        rmGroup.cryptics.push('PDN/YTOWL210N/' + airlineCode + ' RULES');
        const remarkCollection = new Array<RemarkGroup>();
        remarkCollection.push(rmGroup);
        this.remarkService.BuildRemarks(remarkCollection);
    }

    writeOptionalFareRule(fareRuleModels: any) {

        const rmGroup = new RemarkGroup();
        rmGroup.group = 'Fare Rule';
        rmGroup.remarks = new Array<RemarkModel>();
        fareRuleModels.forEach(model => {
            if (model.fareRuleType !== '' && model.oid !== '') {
                smartScriptSession.send('PBN/' + model.oid + '/' + model.airlineCode + ' ' + model.fareRuleType + '*');
                rmGroup.remarks.push(this.remarkHelper.createRemark(model.cityPair, 'RI', 'R'));
            } else {

                // rmGroup.remarks.push(this.remarkHelper.createRemark(group.controls.fareRuleList.value, 'RM', ''));
                // rmGroup.remarks.push(this.remarkHelper.createRemark(group.controls.cityPair.value, 'RM', ''));
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
                debugger;
                if (model.ticketAmount && model.currencyType) {
                    // tslint:disable-next-line:max-line-length
                    rmGroup.remarks.push(this.remarkHelper.createRemark('YOUR TICKET IS ' + model.ticketAmount + ' ' +
                        model.currencyType + 'NON-REFUNDABLE IF CANCELLED.', 'RI', 'R'));
                    // tslint:disable-next-line:max-line-length
                    rmGroup.remarks.push(this.remarkHelper.createRemark('SOME CHANGES ARE ALLOWED UNDER RESTRICTIVE CONDITIONS FOR A', 'RI', 'R'));
                    rmGroup.remarks.push(this.remarkHelper.createRemark('CHANGE FEE AND / OR POSSIBLE INCREASE IN FARE.', 'RI', 'R'));
                }

                if (model.nonRefundable) {
                    // tslint:disable-next-line:max-line-length
                    rmGroup.remarks.push(this.remarkHelper.createRemark('YOUR TICKET IS ' + model.nonRefundable
                        + 'PERCENT NON-REFUNDABLE IF CANCELLED.', 'RI', 'R'));
                    // tslint:disable-next-line:max-line-length
                    rmGroup.remarks.push(this.remarkHelper.createRemark('SOME CHANGES ARE ALLOWED UNDER RESTRICTIVE CONDITIONS FOR A', 'RI', 'R'));
                    rmGroup.remarks.push(this.remarkHelper.createRemark('CHANGE FEE AND / OR POSSIBLE INCREASE IN FARE.', 'RI', 'R'));
                }

                if (model.minChangeFee) {
                    rmGroup.remarks.push(this.remarkHelper.createRemark('THE MINIMUM CHANGE FEE IS ' + model.minChangeFee
                        + ' ' + (model.currencyType), 'RI', 'R'));
                }
            }

            for (const fg of model.remark.controls) {
                if (fg instanceof FormGroup) {
                    // tslint:disable-next-line:max-line-length
                    rmGroup.remarks.push(this.remarkHelper.createRemark(fg.controls.remarkText.value + '/S' + model.segmentNo, 'RI', 'R'));
                }
            }
        });

        return rmGroup;
    }

}

