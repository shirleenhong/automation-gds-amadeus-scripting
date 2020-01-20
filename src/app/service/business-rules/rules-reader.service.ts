import { Injectable } from '@angular/core';
import { PnrService } from '../pnr.service';
import { DDBService } from '../ddb.service';
import { UtilHelper } from 'src/app/helper/util.helper';

@Injectable({
  providedIn: 'root'
})
export class RulesReaderService {
  // businessEntities = new Map<string, string>();
  businessEntities = new Map<string, string>();
  format = [
    { type: 'RM', category: 'A', regex: /(?<PNR_A>.*)$/g },
    { type: 'RM', category: 'B', regex: /(?<PNR_B>.*)$/g },
    { type: 'RM', category: 'C', regex: /(?<PNR_C>.*)$/g },
    { type: 'RM', category: 'E', regex: /(?<PNR_E>.*)$/g },
    { type: 'RM', category: 'F', regex: /(?<PNR_F>.*)$/g },
    { type: 'RM', category: 'G', regex: /(?<PNR_G>.*)$/g },
    { type: 'RM', category: 'H', regex: /(?<PNR_H>.*)$/g },
    { type: 'RM', category: 'I', regex: /(?<PNR_I>.*)$/g },
    { type: 'RM', category: 'J', regex: /(?<PNR_J>.*)$/g },
    { type: 'RM', category: 'K', regex: /(?<PNR_K>.*)$/g },
    { type: 'RM', category: 'L', regex: /(?<PNR_L>.*)$/g },
    { type: 'RM', category: 'M', regex: /(?<PNR_M>.*)$/g },
    { type: 'RM', category: 'N', regex: /(?<PNR_N>.*)$/g },
    { type: 'RM', category: 'O', regex: /(?<PNR_O>.*)$/g },
    { type: 'RM', category: 'P', regex: /(?<PNR_P>.*)$/g },
    { type: 'RM', category: 'Q', regex: /(?<PNR_Q>.*)$/g },
    { type: 'RM', category: 'R', regex: /(?<PNR_R>.*)$/g },
    { type: 'RM', category: 'S', regex: /(?<PNR_S>.*)$/g },
    { type: 'RM', category: 'T', regex: /(?<PNR_T>.*)$/g },
    { type: 'RM', category: 'U', regex: /(?<PNR_U>.*)$/g },
    { type: 'RM', category: 'V', regex: /(?<PNR_V>.*)$/g },
    { type: 'RM', category: 'W', regex: /(?<PNR_W>.*)$/g },
    { type: 'RM', category: 'X', regex: /(?<PNR_X>.*)$/g },
    { type: 'RM', category: 'Y', regex: /(?<PNR_Y>.*)$/g },
    { type: 'RM', category: 'Z', regex: /(?<PNR_Z>.*)$/g },
    { type: 'UDID', category: '*', regex: /U(?<PNR_UDID>.*)\/-(?<PNR_UDID_value>.*)$/g },
    { type: 'RM', category: '*', regex: /CF\/-(?<PNR_CF>[A-Z0-9]{3})/g },
    { type: 'RM', category: '*', regex: /EB\/(?<PNR_EB>.*)/g },
    { type: 'RM', category: '*', regex: /DP\/-(?<PNR_DP>.*)/g }
  ];

  constructor(private pnrService: PnrService, private ddbService: DDBService, private utilHelper: UtilHelper) { }

  public async readPnr() {
    this.businessEntities = new Map<string, string>();
    await this.parseRemarks();
    this.checkRouteCode();
    this.parseAirSegments();
    this.parseAirlineCodes();
    this.getArrivaltime();
    this.getDepartureDateFromTodayCount();
    this.getSegmentTypes();
    this.parseCarSegments();
    this.checkAmExists();
  }

  private setMatchEntity(regex, text) {
    const regexp = new RegExp(regex);
    const match = regexp.exec(text);
    Object.keys(match.groups).forEach((key) => {
      if (this.businessEntities.has(key)) {
        this.businessEntities.set(key, this.businessEntities.get(key) + '\n' + match.groups[key]);
      } else {
        this.businessEntities.set(key, match.groups[key]);
      }
    });
  }

  private parseRemarks() {
    this.format.forEach((f) => {
      try {
        switch (f.type) {
          case 'RM':
            this.extractRemarks(this.pnrService.pnrObj.rmElements, f.category, f.regex);
            break;
          case 'RI':
            this.extractRemarks(this.pnrService.pnrObj.ri, f.category, f.regex);
            break;
          case 'UDID':
            this.parseUdid(f);
        }
      } catch (ex) {
        console.log(ex);
      }
    });
  }

  public getEntityValue(entity) {
    return this.businessEntities.get(entity);
  }

  parseUdid(f) {
    const remarks = this.pnrService.pnrObj.rmElements.filter((x) => x.category === f.category && x.freeFlowText.match(f.regex));
    remarks.forEach((rm) => {
      const regexp = new RegExp(f.regex);
      const match = regexp.exec(rm.freeFlowText);
      if (match.groups) {
        const num = match.groups.PNR_UDID;
        const val = match.groups.PNR_UDID_value;
        const key = 'PNR_UDID' + num;
        if (this.businessEntities.get(key) !== val) {
          if (this.businessEntities.has(key)) {
            this.businessEntities.set(key, this.businessEntities.get(key) + '\n' + val);
          } else {
            this.businessEntities.set(key, val);
          }
        }
      }
    });
  }

  private getDepartureDateFromTodayCount() {
    const segment = this.pnrService.segments;
    if (segment.length > 0) {
      let depDate = segment[0].departureDate;
      if (!depDate) {
        depDate = segment[0].deptdate;
      }
      const days = this.utilHelper.dateDiffInDays(new Date(), this.utilHelper.convertSegmentDate(depDate));
      this.assignKeyValue('PNR_COUNT_DEPARTURE_DATE_FROM_TODAY', days);
    }
  }

  private extractRemarks(remarksList, category, regex) {
    const regexp = new RegExp(regex);
    const remarks = remarksList.filter((x) => x.category === category && regexp.test(x.freeFlowText));
    remarks.forEach((rm) => {
      this.setMatchEntity(regex, rm.freeFlowText);
    });
  }

  private checkRouteCode() {
    const route = this.ddbService.isPnrTransBorder() ? 'TRANSBORDER' : this.ddbService.isPnrDomestic() ? 'DOMESTIC' : 'INTERNATIONAL';
    if (route) {
      this.businessEntities.set('PNR_AIR_SEGMENT_ROUTE_CODE', route);
    }
  }

  private parseAirSegments() {
    const codes = [];
    this.ddbService.airTravelPortInformation.forEach((element) => {
      codes.push(element.travelPortCode);
    });
    this.businessEntities.set('PNR_AIR_SEGMENT_AIRPORT_CODE', codes.join('\n'));
  }

  private parseAirlineCodes() {
    const codes = [];
    const serviceClass = [];
    if (this.pnrService.pnrObj.airSegments !== undefined && this.pnrService.pnrObj.airSegments.length > 0) {
      this.pnrService.pnrObj.airSegments.forEach((x) => {
        if (!codes.includes(x.airlineCode)) {
          codes.push(x.airlineCode);
        }
        serviceClass.push(x.class);
      });
    }
    this.businessEntities.set('PNR_AIR_SEGMENT_AIRLINE_CODE', codes.join('\n'));
    this.businessEntities.set('PNR_AS_ClassOfService', serviceClass.join('\n'));
  }

  private getArrivaltime() {
    const segment = this.pnrService.getSegmentList();
    const keyarr = 'PNR_AIR_SEGMENT_ARR_TIME';
    const keydept = 'PNR_AIR_SEGMENT_DEPT_TIME';
    if (segment) {
      segment.forEach((element) => {
        if (element.arrivalStation === 'CCS' || element.cityCode === 'CCS') {
          this.assignKeyValue(keyarr, element.arrivalTime);
          this.assignKeyValue(keydept, element.departureTime);
        }
      });
    }
  }

  private assignKeyValue(key, value) {
    if (this.businessEntities.has(key)) {
      this.businessEntities.set(key, this.businessEntities.get(key) + '\n' + value);
    } else {
      this.businessEntities.set(key, value);
    }
  }

  private getSegmentTypes() {
    let segmentsTypes = this.pnrService.segments.map((x) => ({
      types: x.segmentType
    }));
    segmentsTypes = segmentsTypes.filter((thing, i, arr) => arr.findIndex((t) => t.types === thing.types) === i);
    this.assignKeyValue('PNR_SEGMENT_TYPES_IN_PNR', segmentsTypes.map(t => t.types).join('\n'));
  }

  private checkAmExists() {
    const amElements = (this.pnrService.pnrObj.amElements.length >= 0);
    this.assignKeyValue('PNR_AM_REMARKS_EXIST', amElements.toString().toUpperCase());
  }

  parseCarSegments() {
    const codes = [];
    const segmentTypes = [];
    const segment = this.pnrService.getSegmentList();
    if (segment) {
      segment.forEach((element) => {
        if (element.segmentType === 'CAR' || element.segmentType === 'CCR') {
          codes.push(element.vendorCode);
          segmentTypes.push(element.passive);
        }
      });
    }
    this.businessEntities.set('PNR_CAR_SEGMENT_VENDOR_CODE', codes.join('|'));
    this.businessEntities.set('PNR_CAR_SEGMENT_TYPE', segmentTypes.join(','));
  }
}
