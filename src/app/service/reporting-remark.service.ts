import { Injectable } from '@angular/core';
import { ReportingViewModel } from '../models/reporting-view.model';
import { RemarkGroup } from '../models/pnr/remark.group.model';
import { RemarkModel } from '../models/pnr/remark.model';
import { PnrService } from './pnr.service';
import { DatePipe } from '@angular/common';
import { TranslationService } from './translation.service';

@Injectable({
  providedIn: 'root'
})
export class ReportingRemarkService {
  language = '';
  // YES/NO insurance
  insuranceNo = [
    'I DECLINED TO PURCHASE THE FOLLOWING TRAVEL INSURANCE',
    'OPTIONS THAT MY TRAVEL AGENT HAS OFFERED AND EXPLAINED TO ME'
  ];
  insuranceYes = [
    'ALL INCLUSIVE OR PREMIUM PROTECTION INSURANCE HAS BEEN',
    'PURCHASED FOR THE FULL VALUE OF THE TRIP.'
  ];

  constructor(
    private pnrService: PnrService,
    private transService: TranslationService
  ) {}

  public GetRoutingRemark(reporting: ReportingViewModel) {
    this.language = this.pnrService.getItineraryLanguage();
    const rmGroup = new RemarkGroup();
    rmGroup.group = 'Routing';
    rmGroup.remarks = new Array<RemarkModel>();
    rmGroup.deleteRemarkByIds = new Array<string>();
    this.getFSRemarks(reporting, rmGroup);
    this.getDestinationRemarks(reporting, rmGroup);
    this.getUDIDRemarks(reporting, rmGroup);
    return rmGroup;
  }

  getFSRemarks(reporting: ReportingViewModel, rmGroup: RemarkGroup) {
    if (reporting.routeCode == null) {
      return;
    }
    const remText = reporting.routeCode + '' + reporting.tripType;
    rmGroup.remarks.push(this.getRemark(remText, 'FS', ''));

    const existNumber = this.pnrService.getFSLineNumber();
    if (existNumber !== '') {
      rmGroup.deleteRemarkByIds.push(existNumber);
    }
  }

  getDestinationRemarks(reporting: ReportingViewModel, rmGroup: RemarkGroup) {
    if (reporting.destination == null || reporting.destination === '') {
      return;
    }

    const remText = 'DE/-' + reporting.destination;
    rmGroup.remarks.push(this.getRemark(remText, 'RM', '*'));
    const existNumber = this.pnrService.getRemarkLineNumber('DE/-');
    if (existNumber !== '') {
      rmGroup.deleteRemarkByIds.push(existNumber);
    }
  }

  getUDIDRemarks(reporting: ReportingViewModel, rmGroup: RemarkGroup) {
    let remText = '';
    if (this.pnrService.getRemarkLineNumber('U86/-') === '') {
      // *U86
      remText = 'U86/-OVERRIDE LEI';
      rmGroup.remarks.push(this.getRemark(remText, 'RM', '*'));
    }

    if (!(reporting.cfLine.cfa === 'RBM' || reporting.cfLine.cfa === 'RBP')) {
      this.deleteDeclinedRemarks(rmGroup);
      this.deleteRemarks(['U10/-', 'U12/-'], rmGroup);
      // *U10
      if (reporting.cfLine.cfa === 'CVC') {
        const companyname = reporting.companyName;
        remText = 'U10/-' + companyname;
        rmGroup.remarks.push(this.getRemark(remText, 'RM', '*'));
      }

      if (!reporting.showInsurance) {
        // *U12
        const insuranceDeclined = reporting.insuranceDeclinedReason;
        if (insuranceDeclined !== null && insuranceDeclined !== '') {
          remText = 'U12/-' + insuranceDeclined;
          rmGroup.remarks.push(this.getRemark(remText, 'RM', '*'));
          this.addRemarksLang(this.insuranceNo, rmGroup, 'RI', 'R');
          this.addDeclinedOptionRemarks(reporting.declinedOption, rmGroup);
        }
      } else {
        this.addRemarksLang(this.insuranceYes, rmGroup, 'RI', 'R');
      }

      // todo : uncomment for ummend story
      const existNumber = this.pnrService.getRemarkLineNumber('U30/-NEWLEI');
      if (existNumber === '') {
        // *U30
        const datePipe = new DatePipe('en-US');
        const dateToday = datePipe.transform(Date.now(), 'ddMMM');
        remText = 'U30/-NEWLEI' + dateToday;
        rmGroup.remarks.push(this.getRemark(remText, 'RM', '*'));
      }
    }
  }

  addRemarksLang(remarks: string[], rmGroup, type, category, prefix?) {
    remarks.forEach(x => {
      rmGroup.remarks.push(
        this.getRemark(
          (prefix ? prefix : '') +
            this.transService.translate(x, this.language),
          type,
          category
        )
      );
    });
  }

  deleteDeclinedRemarks(rmGroup) {
    this.deleteRemarks(
      this.insuranceNo.concat(this.insuranceYes),
      rmGroup,
      'RIR'
    );

    // all RIR lines starts with ...
    const lines = this.pnrService.getRIRLineNumbers('...');
    let r = '';
    if (lines.length > 1) {
      r = lines[0] + '-' + lines[lines.length - 1];
    } else {
      r = lines[0];
    }
    if (r) {
      rmGroup.deleteRemarkByIds.push(r);
    }
  }

  addDeclinedOptionRemarks(option, rmGroup) {
    const prefix = '...';
    let text = [];
    switch (option) {
      case '1':
        text = ['DELUXE PACKAGE INSURANCE'];
        break;
      case '2':
        text = ['CANCELLATION/INTERUPTION'];
        break;
      case '3':
        text = ['EMERGENCY MEDICAL/TRANSPORTATION'];
        break;
      case '4':
        text = ['FLIGHT AND TRAVEL ACCIDENT'];
        break;
      case '5':
        text = ['RENTAL CAR PHYSICAL DAMAGE'];
        break;
      case '6':
        text = ['COVERAGE FOR THE FULL DOLLAR VALUE OF THE TRIP'];
        break;
    }

    this.addRemarksLang(text, rmGroup, 'RI', 'R', prefix);
    // Add Group of Remarks
    rmGroup.remarks.push(this.getRemark(prefix, 'RI', 'R'));
    const groups = this.transService.getRemarkGroup(
      'DeclinedReason',
      this.language
    );
    if (groups) {
      groups.forEach(x => {
        rmGroup.remarks.push(this.getRemark(prefix + x, 'RI', 'R'));
      });
    }
    rmGroup.remarks.push(this.getRemark(prefix, 'RI', 'R'));
  }

  deleteRemarks(udids, rmGroup, type?) {
    udids.forEach(x => {
      let existNumber = '';
      if (type === 'RIR') {
        existNumber = this.pnrService.getRIRLineNumber(x);
      } else {
        existNumber = this.pnrService.getRemarkLineNumber(x);
      }

      if (existNumber !== '') {
        rmGroup.deleteRemarkByIds.push(existNumber);
      }
    });
  }

  getRemark(remarkText, remarkType, remarkCategory) {
    const rem = new RemarkModel();
    rem.remarkType = remarkType;
    rem.remarkText = remarkText;
    rem.category = remarkCategory;
    return rem;
  }

  getConciergeUdids(
    concierge: any,
    forDeletion: Array<any>,
    forRetain: Array<any>
  ) {
    let remText = '';
    const rmGroup = new RemarkGroup();
    rmGroup.group = 'Concierge';
    rmGroup.remarks = new Array<RemarkModel>();
    rmGroup.deleteRemarkByIds = new Array<string>();

    if (!concierge.valid) {
      return;
    }

    if (concierge.value.redemptionAdded) {
      if (concierge.value.redemptionAdded === 'WITHIN 48HRS OF BKNG') {
        remText = 'U3/-WITHIN 48HRS OF BKNG';
      } else {
        remText = 'U4/-OUTSIDE 48HRS OF BKNG';
      }
      rmGroup.remarks.push(this.getRemark(remText, 'RM', '*'));
    }

    if (concierge.value.reservationReq) {
      if (concierge.value.reservationReq === 'EMAIL REQUEST') {
        remText = 'U6/-EMAIL REQUEST';
      } else {
        remText = 'U5/-PHONE REQUEST';
      }
      rmGroup.remarks.push(this.getRemark(remText, 'RM', '*'));
    }

    if (concierge.value.bookingType) {
      switch (concierge.value.bookingType) {
        case 'AIR ONLY BOOKING':
          remText = 'U8/-AIR ONLY BOOKING';
          break;
        case 'AIR AND HOTEL AND/OR CAR':
          remText = 'U9/-AIR AND HOTEL AND/OR CAR';
          break;
        case 'CRUISE/TOUR/FIT':
          remText = 'U10/-CRUISE/TOUR/FIT';
          break;
        default:
          break;
      }
      rmGroup.remarks.push(this.getRemark(remText, 'RM', '*'));
    }

    if (concierge.value.chCallerName !== '') {
      remText = 'U11/-' + concierge.value.chCallerName;
      rmGroup.remarks.push(this.getRemark(remText, 'RM', '*'));
    }

    if (concierge.value.delegateName !== '') {
      remText = 'U12/-' + concierge.value.delegateName;
      rmGroup.remarks.push(this.getRemark(remText, 'RM', '*'));
    }

    if (concierge.value.hotelName !== '') {
      remText = 'U13/-' + concierge.value.hotelName;
      rmGroup.remarks.push(this.getRemark(remText, 'RM', '*'));
    } else if (forRetain.indexOf('U13') === -1) {
      remText = 'U13/-' + 'NO HTL BKD';
      rmGroup.remarks.push(this.getRemark(remText, 'RM', '*'));
    }

    if (concierge.value.businessTravel) {
      remText = 'U15/-' + concierge.value.businessTravel;
      rmGroup.remarks.push(this.getRemark(remText, 'RM', '*'));
    }

    if (concierge.value.hotelRes) {
      remText = 'U17/-' + concierge.value.hotelRes;
      rmGroup.remarks.push(this.getRemark(remText, 'RM', '*'));
    }

    if (concierge.value.reasonHotelBooked) {
      remText = 'U18/-' + concierge.value.reasonHotelBooked;
      rmGroup.remarks.push(this.getRemark(remText, 'RM', '*'));
    }

    if (forRetain.indexOf('U30') === -1) {
      const datePipe = new DatePipe('en-US');
      const dateToday = datePipe.transform(Date.now(), 'ddMMM');
      remText = 'U30/-TGIF' + dateToday;
      rmGroup.remarks.push(this.getRemark(remText, 'RM', '*'));
    }

    forDeletion.forEach(element => {
      rmGroup.deleteRemarkByIds.push(element);
    });

    return rmGroup;
  }
}
