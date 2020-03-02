import { Injectable } from '@angular/core';
import { RemarksManagerService } from './remarks-manager.service';
import { PnrService } from '../pnr.service';
import { FormGroup, FormArray } from '@angular/forms';
import { ReportingBSPComponent } from 'src/app/corporate/reporting/reporting-bsp/reporting-bsp.component';
import { ReportingNonbspComponent } from 'src/app/corporate/reporting/reporting-nonbsp/reporting-nonbsp.component';
import { WaiversComponent } from 'src/app/corporate/reporting/waivers/waivers.component';
import { ReportingViewModel } from 'src/app/models/reporting-view.model';
import { RemarkGroup } from 'src/app/models/pnr/remark.group.model';
import { RemarkModel } from 'src/app/models/pnr/remark.model';
import { ReportingRemarksComponent } from 'src/app/corporate/reporting/reporting-remarks/reporting-remarks.component';
import { CarSavingsCodeComponent } from 'src/app/corporate/reporting/car-savings-code/car-savings-code.component';
import { HotelSegmentsComponent } from 'src/app/corporate/reporting/hotel-segments/hotel-segments.component';
import { ObtComponent } from 'src/app/corporate/reporting/obt/obt.component';
import { NoBookedHotelComponent } from 'src/app/corporate/reporting/no-booked-hotel/no-booked-hotel.component';

@Injectable({
  providedIn: 'root'
})
export class ReportingRemarkService {
  hasTransborder: boolean;

  constructor(private remarksManager: RemarksManagerService, private pnrService: PnrService) { }

  WriteBspRemarks(rbc: ReportingBSPComponent, rptComp: ReportingRemarksComponent) {
    const bspGroup: FormGroup = rbc.bspGroup;
    const items = bspGroup.get('fares') as FormArray;
    this.writeHighLowFare(items, false, rptComp);
    this.writeExchangeIndicator(items);
  }
  writeCarSavingsRemarks(carSavings: CarSavingsCodeComponent, reAddRemarks) {
    const carSavingsGroup: FormGroup = carSavings.carSavingsCodeGroup;
    const items = carSavingsGroup.get('carSavings') as FormArray;
    this.writeCarSavings(items, reAddRemarks);
  }
  writeHotelSavingsRemarks(hotelSavings: HotelSegmentsComponent, reAddRemarks) {
    const carSavingsGroup: FormGroup = hotelSavings.hotelSegments;
    const items = carSavingsGroup.get('hotels') as FormArray;
    this.writeHotelSavings(items, reAddRemarks);
  }
  WriteNonBspRemarks(nrbc: ReportingNonbspComponent, rptComp: ReportingRemarksComponent) {
    const nbspGroup: FormGroup = nrbc.nonBspGroup;
    const items = nbspGroup.get('nonbsp') as FormArray;
    this.writeHighLowFare(items, true, rptComp);
  }

  writeExchangeIndicator(items: any) {
    const tstList = new Array();

    for (const bspControls of items.controls) {
      if (bspControls.get('isExchange').value === true) {
        tstList.push(bspControls.get('tstNumber').value);
      }
    }
    tstList
      .filter((elem, index, self) => index === self.indexOf(elem))
      .forEach((x) => {
        const exchangeIndicatorRemark = new Map<string, string>();
        exchangeIndicatorRemark.set('AirTicketId', x);
        exchangeIndicatorRemark.set('TktRemark', 'EXCH');
        this.remarksManager.createPlaceholderValues(exchangeIndicatorRemark);
      });
  }

  private writeHighLowFare(items: any, write: boolean, rptComp: ReportingRemarksComponent) {
    let counter = 1;
    for (const group of items.controls) {
      if (group.get('chkIncluded').value === true || write) {
        const highFareRemark = new Map<string, string>();
        const lowFareRemark = new Map<string, string>();
        const airReasonCodeRemark = new Map<string, string>();
        const segments: string[] = group.get('segment').value.split(',');
        const segmentrelate: string[] = this.getRemarkSegmentAssociation(segments);

        highFareRemark.set('CAAirHighFare', group.get('highFareText').value);
        lowFareRemark.set('CAAirLowFare', group.get('lowFareText').value);
        const output = group.get('reasonCodeText').value.split(':');
        airReasonCodeRemark.set('CAAirRealisedSavingCode', output[0].trim());

        this.remarksManager.createPlaceholderValues(highFareRemark, null, segmentrelate);
        this.remarksManager.createPlaceholderValues(lowFareRemark, null, segmentrelate);
        this.remarksManager.createPlaceholderValues(airReasonCodeRemark, null, segmentrelate);

        const otherTktMap = new Map<string, string>();
        otherTktMap.set('AirTicketId', counter.toString());
        otherTktMap.set('AirChargedFare', group.get('chargeFare').value);
        otherTktMap.set('AirLowFare', group.get('lowFareText').value);
        otherTktMap.set('AirSavingCode', output[0].trim());
        otherTktMap.set('AirHighFare', group.get('highFareText').value);
        otherTktMap.set('HemisphereId', rptComp.reportingForm.get('bspRouteCode').value);
        otherTktMap.set('TripTypeEquivalent', '1');
        const arr = rptComp.reportingForm.get('segments') as FormArray;
        let desti = '';
        for (const g of arr.controls) {
          if (g.get('segment').value === segments.join(',')) {
            desti = g.get('destinationList').value;
            break;
          } else if(g.get('segment').value === '' && write) {
             desti = g.get('destinationList').value;
          }
        }
        otherTktMap.set('CAPointOfTurnAround', desti);
        this.remarksManager.createPlaceholderValues(otherTktMap);

        const tktBFRemark = new Map<string, string>();
        tktBFRemark.set('AirTicketId', counter.toString());
        tktBFRemark.set('AirBaseCurrency', group.get('currency').value);
        tktBFRemark.set('AirBaseFare', group.get('baseFare').value);
        this.remarksManager.createPlaceholderValues(tktBFRemark, null, segmentrelate);
        counter++;
      }
    }
  }

  private writeCarSavings(items: any, reAddRemarks) {
    for (const group of items.controls) {
      if (group.get('chkIncluded').value === true) {
        const carSavingsMap = new Map<string, string>();
        carSavingsMap.set('CarFarePickUpDate', group.get('date').value);
        carSavingsMap.set('CarPickUpCity', group.get('city').value);
        const output = group.get('carReasonCode').value.split(':');
        carSavingsMap.set('CarFareSavingsCode', output[0].trim());
        this.remarksManager.createPlaceholderValues(carSavingsMap);
      }
    }
    for (const rmk of reAddRemarks) {
      const carRemarksMap = new Map<string, string>();
      carRemarksMap.set('CarFarePickUpDate', rmk.date);
      carRemarksMap.set('CarPickUpCity', rmk.city);
      carRemarksMap.set('CarFareSavingsCode', rmk.reasonCode);
      this.remarksManager.createPlaceholderValues(carRemarksMap);
    }
  }

  writeHotelSavings(items: any, reAddRemarks) {
    for (const group of items.controls) {
      if (group.get('chkIncluded').value === true) {
        const hotels = new Map<string, string>();
        hotels.set('HotelDate', group.get('checkInDate').value);
        if (group.get('hotelSavingsCode').value) {
          const output = group.get('hotelSavingsCode').value.split(':');
          hotels.set('HotelSavings', output[0].trim());
        }
        if (group.get('chainCode').value) {
          hotels.set('ChainCode', '/-CHN-' + group.get('chainCode').value);
        } else {
          hotels.set('ChainCode', '');
        }
        this.remarksManager.createPlaceholderValues(hotels);
      }
    }
    for (const rem of reAddRemarks) {
      const reAddHotelRemark = new Map<string, string>();
      reAddHotelRemark.set('HotelDate', rem.date);
      if (rem.savingsCode) {
        reAddHotelRemark.set('HotelSavings', rem.savingsCode);
      }
      if (rem.chainCode) {
        reAddHotelRemark.set('ChainCode', '/-CHN-' + rem.chainCode);
      } else {
        reAddHotelRemark.set('ChainCode', '');
      }
      this.remarksManager.createPlaceholderValues(reAddHotelRemark);
    }
  }
  getRemarkSegmentAssociation(segments: string[]): string[] {
    const segmentrelate: string[] = [];
    const segment = this.pnrService.getSegmentList().filter((x) => segments.indexOf(x.lineNo) >= 0);
    segment.forEach((x) => {
      segmentrelate.push(x.tatooNo);
    });

    return segmentrelate;
  }

  WriteEscOFCRemark(value: string) {
    this.remarksManager.createEmptyPlaceHolderValue(['CAOverrideValue']);
    if (value && value !== '') {
      const escOfc = new Map<string, string>();
      escOfc.set('CAOverrideValue', value);
      this.remarksManager.createPlaceholderValues(escOfc);
    }
  }

  WriteFareRemarks(bspGroup: FormGroup) {
    const items = bspGroup.get('fares') as FormArray;

    for (const control of items.controls) {
      if (control instanceof FormGroup) {
        const fg = control as FormGroup;
        const highFareRemark = new Map<string, string>();
        const lowFareRemark = new Map<string, string>();
        const airReasonCodeRemark = new Map<string, string>();
        const segments: string[] = [];
        let segmentrelate: string[] = [];
        let shouldWrite = false;

        Object.keys(fg.controls).forEach((key) => {
          if (key === 'segment') {
            fg.get(key)
              .value.split(',')
              .forEach((val) => {
                segments.push(val);
              });

            segmentrelate = this.getRemarkSegmentAssociation(segments);
          }

          if (key === 'chkIncluded') {
            shouldWrite = true;
          }

          if (key === 'highFareText') {
            highFareRemark.set('CAAirHighFare', fg.get(key).value);
          }
          if (key === 'lowFareText') {
            lowFareRemark.set('CAAirLowFare', fg.get(key).value);
          }
          if (key === 'reasonCodeText') {
            airReasonCodeRemark.set('CAAirRealisedSavingCode', fg.get(key).value);
          }
        });

        if (shouldWrite) {
          this.remarksManager.createPlaceholderValues(highFareRemark, null, segmentrelate);
          this.remarksManager.createPlaceholderValues(lowFareRemark, null, segmentrelate);
          this.remarksManager.createPlaceholderValues(airReasonCodeRemark, null, segmentrelate);
        }
      }
    }
  }

  WriteU63(wc: WaiversComponent) {
    const bspGroup: FormGroup = wc.ticketedForm;
    if (bspGroup.get('waiver').value) {
      const waiverRemark = new Map<string, string>();
      waiverRemark.set('WaiverLine', bspGroup.get('waiver').value);
      this.remarksManager.createPlaceholderValues(waiverRemark, null, null);
    }    
  }
  public GetRoutingRemark(reporting: ReportingViewModel) {
    const rmGroup = new RemarkGroup();
    rmGroup.group = 'Routing';
    rmGroup.remarks = new Array<RemarkModel>();
    rmGroup.deleteRemarkByIds = new Array<string>();
    this.getFSRemarks(reporting, rmGroup);
    return rmGroup;
  }
  getFSRemarks(reporting: ReportingViewModel, rmGroup: RemarkGroup) {
    if (reporting.routeCode == null) {
      return;
    }
    const remText = reporting.routeCode + '' + reporting.tripType;
    rmGroup.remarks.push(this.getRemark(remText, 'FS', ''));
  }
  getRemark(remarkText, remarkType, remarkCategory) {
    const rem = new RemarkModel();
    rem.remarkType = remarkType;
    rem.remarkText = remarkText;
    rem.category = remarkCategory;
    return rem;
  }

  WriteDestinationCode(rc: ReportingRemarksComponent) {
    const reportingRemarksGroup: FormGroup = rc.reportingForm;
    const items = reportingRemarksGroup.get('segments') as FormArray;
    for (const control of items.controls) {
      if (control instanceof FormGroup) {
        const fg = control as FormGroup;
        const destinationRemark = new Map<string, string>();

        const segments: string[] = [];
        let segmentrelate: string[] = [];

        Object.keys(fg.controls).forEach((key) => {
          if (key === 'segment') {
            fg.get(key)
              .value.split(',')
              .forEach((val) => {
                segments.push(val);
              });
            segmentrelate = this.getRemarkSegmentAssociation(segments);
          }

          if (key === 'destinationList') {
            if (fg.get(key).value !== null && fg.get(key).value !== '') {
              destinationRemark.set('PointOfTurnAround', fg.get(key).value);
            }
          }
        });

        this.remarksManager.createPlaceholderValues(destinationRemark, null, segmentrelate);
      }
    }
  }
  writeEBRemarks(obtComponent: ObtComponent) {
    const touchReasonForm = obtComponent.obtForm;
    if (obtComponent.showEBDetails && touchReasonForm.controls.ebR.value) {
      const map = new Map<string, string>();
      map.set('TouchLevel', touchReasonForm.controls.ebR.value);
      map.set('OBTVendorCode', touchReasonForm.controls.ebT.value);
      map.set('TouchType', touchReasonForm.controls.ebN.value);
      map.set('TouchReason', touchReasonForm.controls.ebC.value);
      this.remarksManager.createPlaceholderValues(map);
    }
  }

  writeNoHotelBooked(comp: NoBookedHotelComponent) {
    const items = comp.segmentForm.get('segments') as FormArray;
    const rems = [];
    for (const control of items.controls) {
      if (control instanceof FormGroup) {
        const days = control.get('numDays').value.padStart(2, '0');
        const rm = control.get('date').value + control.get('cityCode').value + 'H' + control.get('reasonCode').value + days;
        rems.push(rm);
      }
    }

    if (rems.length > 0) {
      let map = new Map<string, string>();
      map.set('HotelReasonCodes1', rems[0] + (rems.length > 1 ? '/' + rems[1] : ''));
      this.remarksManager.createPlaceholderValues(map);
      if (rems.length > 2) {
        map = new Map<string, string>();
        map.set('HotelReasonCodes2', rems[2] + (rems.length > 3 ? '/' + rems[3] : ''));
        this.remarksManager.createPlaceholderValues(map);
      }
    } else {
      this.remarksManager.createEmptyPlaceHolderValue(['HotelReasonCodes1']);
    }
    if (rems.length < 3) {
      this.remarksManager.createEmptyPlaceHolderValue(['HotelReasonCodes2']);
    }
  }
}
