import { Injectable } from '@angular/core';
import { RemarksManagerService } from './remarks-manager.service';
import { PnrService } from '../pnr.service';
import { FormGroup, FormArray } from '@angular/forms';
import { ReportingBSPComponent } from 'src/app/corporate/reporting/reporting-bsp/reporting-bsp.component';
import { ReportingNonbspComponent } from 'src/app/corporate/reporting/reporting-nonbsp/reporting-nonbsp.component';
import { AquaTicketingComponent } from 'src/app/corporate/ticketing/aqua-ticketing/aqua-ticketing.component';
import { DDBService } from '../ddb.service';

@Injectable({
  providedIn: 'root'
})
export class ReportingRemarkService {
  hasTransborder: boolean;

  constructor(private remarksManager: RemarksManagerService, private pnrService: PnrService, private ddbService: DDBService) { }

  WriteBspRemarks(rbc: ReportingBSPComponent) {
    const bspGroup: FormGroup = rbc.bspGroup;
    const items = bspGroup.get('fares') as FormArray;
    this.writeHighLowFare(items, false);
  }

  WriteNonBspRemarks(nrbc: ReportingNonbspComponent) {
    const nbspGroup: FormGroup = nrbc.nonBspGroup;
    const items = nbspGroup.get('nonbsp') as FormArray;
    this.writeHighLowFare(items, true);
  }

  private writeHighLowFare(items: any, write: boolean) {
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
      }
    }
  }

  getRemarkSegmentAssociation(segments: string[]): string[] {
    const segmentrelate: string[] = [];
    const air = this.pnrService.getSegmentTatooNumber().filter((x) => x.segmentType === 'AIR' && segments.indexOf(x.lineNo) >= 0);
    air.forEach((airElement) => {
      segmentrelate.push(airElement.tatooNo);
    });

    return segmentrelate;
  }

  WriteEscOFCRemark(value: string) {
    this.remarksManager.createEmptyPlaceHolderValue(['CAOverrideValue']);
    if (value !== '') {
      const escOfc = new Map<string, string>();
      escOfc.set('CAOverrideValue', value);
      this.remarksManager.createPlaceholderValues(escOfc);
    }
  }

  WriteAquaTicketing(aqua: AquaTicketingComponent) {
    // this.WriteAquaTicketingRemarks(aqua.aquaTicketingFormGroup, aqua.unticketedSegments);
    this.WriteAquaTicketingRemarks(aqua.unticketedSegments, aqua.tstSelected);
  }

  private WriteAquaTicketingRemarks(unticketed: any[], tstSelected: any[]) {
    // aquaFormGroup: FormGroup,
    let ticketNumber: number;
    ticketNumber = 0;

    tstSelected.forEach((x) => {
      unticketed.forEach((p) => {
        if (x === p.tatooNumber) {
          const tstRemark = new Map<string, string>();
          let segmentrelate: string[] = [];
          tstRemark.set('TicketSequence', p.tstNumber);
          segmentrelate = p.tatooNumber;
          let tripType: string;
          tripType = this.getTripType(segmentrelate);
          this.remarksManager.createPlaceholderValues(tstRemark, null, segmentrelate);
          this.remarksManager.createPlaceholderValues(tstRemark, null, segmentrelate, null, tripType);
          ticketNumber++;
        }
      });
    });

    const limoSegments = this.pnrService.getSegmentTatooNumber().filter((x) => x.passive === 'TYP-LIM');
    limoSegments.forEach((limo) => {
      const tstRemark = new Map<string, string>();
      let segmentrelate: string[] = [];
      tstRemark.set('TicketSequence', '1');
      segmentrelate = limo.tatooNo;
      this.remarksManager.createPlaceholderValues(tstRemark, null, segmentrelate, null, 'TYP-LIM');
    });

    // hotel
    // this.writePassiveHotelSegmentRemark();
    const htlSegments = this.pnrService.getSegmentTatooNumber().filter((x) => x.passive === 'TYP-HHL');
    htlSegments.forEach((htl) => {
      const tstRemark = new Map<string, string>();
      let segmentrelate: string[] = [];
      tstRemark.set('TicketSequence', '1');
      segmentrelate = htl.tatooNo;
      this.remarksManager.createPlaceholderValues(tstRemark, null, segmentrelate, null, 'INV-HTL');
    });

    // car
    const carSegments = this.pnrService.getSegmentTatooNumber().filter((x) => x.passive === 'TYP-CAR');
    carSegments.forEach((car) => {
      const tstRemark = new Map<string, string>();
      let segmentrelate: string[] = [];
      tstRemark.set('TicketSequence', '1');
      segmentrelate = car.tatooNo;
      this.remarksManager.createPlaceholderValues(tstRemark, null, segmentrelate, null, 'INV-CAR');
    });

    const numberOfTicketRemark = new Map<string, string>();
    numberOfTicketRemark.set('NumberOfTickets', ticketNumber.toString());
    this.remarksManager.createPlaceholderValues(numberOfTicketRemark, null);

    if (this.hasTransborder) {
      const staticRemarksCondition = new Map<string, string>();
      staticRemarksCondition.set('AquaTicketingCondition', 'true');
      this.remarksManager.createPlaceholderValues(
        null,
        staticRemarksCondition,
        null,
        null,
        'ADVISED USTRAVEL A PASSPORT AND VISA ARE REQUIRED'
      );

      this.remarksManager.createPlaceholderValues(null, staticRemarksCondition, null, null, 'ADVISED USTRAVEL 6 MONTH FROM DEPARTURE');
    }
  }

  getTripType(segmentRefList?: any[]) {
    const cityList = [];
    let tripType = 'DOM';
    if (segmentRefList.length > 1) {
      segmentRefList.forEach((x) => {
        this.pnrService.pnrObj.allAirSegments.forEach((p) => {
          if (p.tatooNumber === x) {
            this.ddbService.airTravelPortInformation.forEach((element) => {
              if (element.travelPortCode === p.fullNode.travelProduct.boardpointDetail.cityCode) {
                cityList.push(element.countryCode);
              }
              if (element.travelPortCode === p.fullNode.travelProduct.offpointDetail.cityCode) {
                cityList.push(element.countryCode);
              }
            });
          }
        });
      });
    } else {
      if (segmentRefList.length === 1) {
        this.pnrService.pnrObj.allAirSegments.forEach((x) => {
          if (segmentRefList === x.tatooNumber) {
            this.ddbService.airTravelPortInformation.forEach((element) => {
              if (element.travelPortCode === x.fullNode.travelProduct.boardpointDetail.cityCode) {
                cityList.push(element.countryCode);
              }
              if (element.travelPortCode === x.fullNode.travelProduct.offpointDetail.cityCode) {
                cityList.push(element.countryCode);
              }
            });
          }
        });
      }
    }

    cityList.forEach((element) => {
      if (element === 'US') {
        tripType = 'TRANS';
        this.hasTransborder = true;
      }
    });
    cityList.forEach((element) => {
      if (element !== 'CA' && element !== 'US') {
        tripType = 'INTL';
        this.hasTransborder = false;
      }
    });

    return tripType;
  }

  /**
   * Write passive hotel segment remarks to PNR.
   * @return void
   */
  writePassiveHotelSegmentRemark(): void {
    // Check if the PNR is only Hotel
    if (this.isPnrHotelOnly()) {
      const passiveHotelSegmentNumbers = this.pnrService.getPassiveHotelSegmentNumbers();
      const hotelOnlyPnrRemarks = new Map<string, string>();
      hotelOnlyPnrRemarks.set('TicketSequence', '1');

      const passiveHotelSegmentTattooNumbers: string[] = [];

      passiveHotelSegmentNumbers.forEach((passiveHotelSegmentNumber) => {
        passiveHotelSegmentTattooNumbers.push(passiveHotelSegmentNumber.tatooNo);
      });

      this.remarksManager.createPlaceholderValues(hotelOnlyPnrRemarks, null, passiveHotelSegmentTattooNumbers, null, 'INV-HTL');
    }
  }

  /**
   * Check if the PNR only has hotel passive segments.
   * @return boolean
   */
  isPnrHotelOnly(): boolean {
    const passiveSegments = this.pnrService.getModelPassiveSegments();

    passiveSegments.forEach((passiveSegment) => {
      if (passiveSegment.segmentType === 'AIR') {
        return false;
      }
    });

    return true;
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

}
