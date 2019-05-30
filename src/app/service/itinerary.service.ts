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

  constructor(private remarkHelper: RemarkHelper,
    private pnrService: PnrService, private ddbService: DDBService) { }

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

    arr = frmGroup.get('services') as FormArray;
    for (const c of arr.controls) {
      const service = c.get('service').value;
      if (service) {
        rm = (this.remarkHelper.createRemark('*SERVICE**' + service, 'RI', 'R'));
        rmGroup.remarks.push(rm);
      }
    }

    arr = frmGroup.get('tickets') as FormArray;
    for (const c of arr.controls) {
      const ticket = c.get('ticket').value;
      if (ticket) {
        rm = (this.remarkHelper.createRemark('*TICKET**' + ticket, 'RI', 'R'));
        rmGroup.remarks.push(rm);
      }
    }

    arr = frmGroup.get('offers') as FormArray;
    for (const c of arr.controls) {
      if (frmGroup.value.typeTransaction === 'itinerary') {
        const offer = c.get('offer').value;
        if (offer) {
          rm = (this.remarkHelper.createRemark('*OFFER**' + offer, 'RI', 'R'));
          rmGroup.remarks.push(rm);
        }
      }
    }

    if (frmGroup.value.language) {
      rm = (this.remarkHelper.createRemark('LANGUAGE-' + frmGroup.value.language, 'RM', 'Z'));
      rmGroup.remarks.push(rm);
      rm = (this.remarkHelper.createRemark('CONF*LANG:' + frmGroup.value.language.substr(0, 2), 'RM', 'Z'));
      rmGroup.remarks.push(rm);
    }

    if (!this.pnrService.getRmqEmail()) {
      rm = (this.remarkHelper.createRemark('EMAIL ADD-NO', 'RM', 'Q'));
      rmGroup.remarks.push(rm);
    }
    rm = this.writeTktLine(rm, rmGroup);
    this.deleteItineraryRemarks(rmGroup, frmGroup);
    return rmGroup;
  }


  private deleteItineraryRemarks(rmGroup: RemarkGroup, frmGroup: FormGroup) {

    const listRegex = ['SEND TO MAIL (?<temp>.*)',
      'LANGUAGE-(EN-US|FR-CA)',
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

  private writeTktLine(rm: any, rmGroup: RemarkGroup) {
    const destinations = Array<string>();
    let air = this.pnrService.pnrObj.airSegments;
    if (air > 0) {
      air.forEach(x => {
        let cityCountry = this.ddbService.getCityCountry(x.arrivalAirport).country;
        if (this.ddbService.getCityCountry(x.arrivalAirport) !== '') {
          destinations.push(cityCountry);
        }
        cityCountry = this.ddbService.getCityCountry(x.departureAirport).country;
        if (this.ddbService.getCityCountry(x.departureAirport) !== '') {
          destinations.push(cityCountry);
        }
      });
      const route = this.getRouteType(destinations);
      rm = (this.remarkHelper.createRemark('TKT-' + route, 'RM', 'T'));
      rmGroup.remarks.push(rm);
    }
    return rm;
  }


  private getRouteType(destinations: string[]) {
    let route = 'DOM';
    destinations.forEach(x => {
      if (x !== 'Canada' && x !== 'United States') {
        return 'INTL';
      }
      if (x === 'United States') {
        route = 'TRANS';
      }
    });
    return route;
  }
}
