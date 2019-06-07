import { Injectable } from '@angular/core';
import { RemarkGroup } from '../models/pnr/remark.group.model';
import { RemarkModel } from '../models/pnr/remark.model';
import { FormArray, FormGroup } from '@angular/forms';
import { PnrService } from './pnr.service';
import { RemarkHelper } from '../helper/remark-helper';
import { DDBService } from './ddb.service';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {
  destination = [];
  constructor(private remarkHelper: RemarkHelper,
    private pnrService: PnrService, private ddbService: DDBService) {
  }


  getItineraryRemarks(frmGroup: FormGroup) {
    const rmGroup = new RemarkGroup();
    rmGroup.group = 'Itinerary';
    rmGroup.remarks = new Array<RemarkModel>();
    let rm;
    rmGroup.deleteRemarkByIds = [];

    let arr = frmGroup.get('emailAddresses') as FormArray;
    for (const c of arr.controls) {
      const email = c.get('emailAddress').value;
      if (email) {
        rm = (this.remarkHelper.createRemark('CONF*SEND TO MAIL ' + email, 'RM', 'Z'));
        rmGroup.remarks.push(rm);
      }
    }

    if (frmGroup.value.typeTransaction) {
      arr = frmGroup.get('services') as FormArray;
      for (const c of arr.controls) {
        const service = c.get('service').value;
        if (service) {
          rm = (this.remarkHelper.createRemark('*SERVICE**' + service + '*', 'RI', 'R'));
          rmGroup.remarks.push(rm);
        }
      }

      arr = frmGroup.get('tickets') as FormArray;
      for (const c of arr.controls) {
        const ticket = c.get('ticket').value;
        if (ticket) {
          rm = (this.remarkHelper.createRemark('*TICKET**' + ticket + '*', 'RI', 'R'));
          rmGroup.remarks.push(rm);
        }
      }

      arr = frmGroup.get('offers') as FormArray;
      for (const c of arr.controls) {
        if (frmGroup.value.typeTransaction === 'itinerary') {
          const offer = c.get('offer').value;
          if (offer) {
            rm = (this.remarkHelper.createRemark('*OFFER**' + offer + '*', 'RI', 'R'));
            rmGroup.remarks.push(rm);
          }
        }
      }
    }


    if (frmGroup.value.language) {
      const rirService = 'LANGUAGE-(EN-US|FR-CA)';
      const regx = new RegExp(rirService);
      const rems = this.pnrService.getRemarksFromGDSByRegex(regx, 'RM');
      if (rems.length === 0) {
        rm = (this.remarkHelper.createRemark('LANGUAGE-' + frmGroup.value.language, 'RM', 'Z'));
        rmGroup.remarks.push(rm);
      }

      if (rems.length > 0 && rems[0].remarkText.substr(-5) !== frmGroup.value.language) {
        rm = (this.remarkHelper.createRemark('CONF*LANG:' + frmGroup.value.language.substr(0, 2), 'RM', 'Z'));
        rmGroup.remarks.push(rm);
      }
    }

    if (!this.pnrService.getRmqEmail()) {
      rm = (this.remarkHelper.createRemark('EMAIL ADD-NO', 'RM', 'Q'));
      rmGroup.remarks.push(rm);
    }
    rm = this.writeTktLine(rmGroup);
    this.deleteItineraryRemarks(rmGroup, frmGroup);
    return rmGroup;
  }


  private deleteItineraryRemarks(rmGroup: RemarkGroup, frmGroup: FormGroup) {
    const listRegex = ['SEND TO MAIL (?<temp>.*)',
      'LANG:(EN|FR)'];
    let regx: RegExp;
    let rems: any[];
    listRegex.forEach(element => {
      if ((element.indexOf('LANG') > -1 && frmGroup.value.language) || element.indexOf('LANG') === -1) {
        regx = new RegExp(element);
        rems = this.pnrService.getRemarksFromGDSByRegex(regx, 'RM');
        if (rems.length > 0) {
          rems.forEach(r => {
            rmGroup.deleteRemarkByIds.push(r.lineNo);
          });
        }
      }
    });

    const listRemark = ['SERVICE', 'TICKET', 'OFFER'];
    listRemark.forEach(element => {
      const rirService = '/*' + element + '/*/*(?<service>(.*))/*';
      regx = new RegExp(rirService);
      rems = this.pnrService.getRemarksFromGDSByRegex(regx, 'RIR');
      if (rems.length > 0) {
        rems.forEach(r => {
          rmGroup.deleteRemarkByIds.push(r.lineNo);
        });
      }
    });
  }


  async writeTktLine(rmGroup: RemarkGroup) {
    const air = this.pnrService.pnrObj.airSegments;
    const regx = new RegExp('TKT-(?<service>(.*))');
    const rems = this.pnrService.getRemarksFromGDSByRegex(regx, 'RM');
    let writetkt = true;
    rems.forEach(element => {
      if (element.qualifier === 'T') {
        writetkt = false;
      }
    });
    let route = '';
    if (air.length > 0 && writetkt) {
      route = this.writeRouteType();
      const rm = (this.remarkHelper.createRemark('TKT-' + route, 'RM', 'T'));
      rmGroup.remarks.push(rm);
    }

  }

  async getCountry(air) {
    // const air = this.pnrService.pnrObj.airSegments;
    air.forEach(async x => {
      await this.ddbService.getTravelPort(x.arrivalAirport).then(x => {
        const c = JSON.stringify(x);
        let obj: any;
        obj = JSON.parse(c);
        this.destination.push(obj.TravelPorts[0].CountryName);
      });

      await this.ddbService.getTravelPort(x.departureAirport).then(x => {
        const c = JSON.stringify(x);
        let obj: any;
        obj = JSON.parse(c);
        this.destination.push(obj.TravelPorts[0].CountryName);
      });
    });
  }

  writeRouteType() {
    let route = 'DOM';
    this.pnrService.pnrObj.airSegments.forEach(element => {
      const arrival = this.ddbService.getCityCountry(element.arrivalAirport);
      route = this.getRoute(arrival, route);
      const departure = this.ddbService.getCityCountry(element.departureAirport);
      route = this.getRoute(departure, route);
    });
    return route;
  }

  private getRoute(element: any, route: string) {
    if (element !== 'Canada' && element !== 'United States') {
      route = 'INTL';
    }
    if (element === 'United States' && route !== 'INTL') {
      route = 'TRANS';
    }
    return route;
  }
}
