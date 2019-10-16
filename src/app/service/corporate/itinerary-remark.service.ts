import { Injectable, OnInit } from '@angular/core';
import { PnrService } from '../pnr.service';
import { QueuePlaceModel } from '../../models/pnr/queue-place.model';
import { formatDate } from '@angular/common';
import { FormGroup, FormArray } from '@angular/forms';
import { AmadeusQueueService } from '../amadeus-queue.service';
import { RemarkGroup } from 'src/app/models/pnr/remark.group.model';
import { RemarkModel } from 'src/app/models/pnr/remark.model';
import { RemarkHelper } from 'src/app/helper/remark-helper';
import { DDBService } from '../ddb.service';

@Injectable({
  providedIn: 'root'
})
export class ItineraryRemarkService implements OnInit {
  destination = [];
  leisureOnDemandOID: any = '';

  constructor(private pnrService: PnrService, private amadeusQueue: AmadeusQueueService,
              private remarkHelper: RemarkHelper, private ddbService: DDBService) {
  }

  async ngOnInit() {

  }
  addPersonalQueue(frmGroup: FormGroup) {
    if (frmGroup.controls.queueNo.value && frmGroup.controls.queueCategory.value) {
      this.getQueueMinder('personalQueue', frmGroup.controls.queueNo.value, frmGroup.controls.queueCategory.value);
    }
  }

  private getQueueMinder(controlname: string, queueno?: string, category?: string) {
    const queue = new QueuePlaceModel();
    const queuePlaceDescription = [
      { control: 'personalQueue', queueNo: '', pcc: '', text: 'personal Queue', category: '' },
      { control: 'invoice', queueNo: '66', pcc: 'YTOWL210E', text: 'invoice', category: '1' },
      { control: 'itinerary', queueNo: '65', pcc: 'YTOWL210E', text: 'itinerary', category: '1' },
      { control: 'vip', queueNo: '62', pcc: 'PARWL2877', text: '', category: '' },
      { control: 'pendingApproval', queueNo: '63', pcc: 'PARWL2877', text: 'pendingApproval', category: '1' },
      { control: 'confPending', queueNo: '66', pcc: '', text: '', category: '1' },
      { control: 'leadMgr', queueNo: '50', pcc: '', text: '', category: '227' },
      { control: 'groups', queueNo: '50', pcc: '', text: '', category: '228' },
      { control: 'urgentFollowUp', queueNo: '50', pcc: '', text: '', category: '229' },
      { control: 'specialServiceWaivers', queueNo: '50', pcc: '', text: '', category: '230' },
      { control: 'cpmplexIntPending', queueNo: '50', pcc: '', text: '', category: '231' },
      { control: 'splitTickets', queueNo: '50', pcc: '', text: '', category: '232' },
      { control: 'clientOptions1', queueNo: '50', pcc: '', text: '', category: '233' },
      { control: 'clientOptions2', queueNo: '50', pcc: '', text: '', category: '234' },
      { control: 'acFlipghtPass', queueNo: '50', pcc: '', text: '', category: '235' },
      { control: 'optional1', queueNo: '50', pcc: '', text: '', category: '236' },
      { control: 'optional2', queueNo: '50', pcc: '', text: '', category: '237' },
      { control: 'optional3', queueNo: '50', pcc: '', text: '', category: '238' },
      { control: 'optional4', queueNo: '50', pcc: '', text: '', category: '239' },
      { control: 'EMD', queueNo: '50', pcc: 'YTOWL2106 ', text: '', category: '221' }
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
      if (category) {
        queue.category = category;
      }
      queue.date = formatDate(Date.now(), 'ddMMyy', 'en').toString();
      this.amadeusQueue.addQueueCollection(queue);
    }
  }

  addItineraryQueue(frmGroup: FormGroup) {
    if (frmGroup.controls.typeTransaction.value) {
      let tanstype = '';
      if (frmGroup.controls.typeTransaction.value === 'invoice') {
        tanstype = 'invoice';
      } else if (frmGroup.controls.typeTransaction.value === 'itinerary') {
        tanstype = 'itinerary';
      }
      this.getQueueMinder(tanstype);
    }
  }

  addTeamQueue(frmGroup: FormGroup) {
    if (frmGroup.controls.teamQueue.value) {
      this.getQueueMinder(frmGroup.controls.teamQueue.value);
    }
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
        rm = this.remarkHelper.createRemark('CONF*SEND TO MAIL ' + email, 'RM', 'Z');
        rmGroup.remarks.push(rm);
      }
    }

    if (frmGroup.value.typeTransaction) {
      arr = frmGroup.get('services') as FormArray;
      for (const c of arr.controls) {
        const service = c.get('service').value;
        if (service) {
          rm = this.remarkHelper.createRemark('*SERVICE**' + service + '*', 'RI', 'R');
          rmGroup.remarks.push(rm);
        }
      }

      arr = frmGroup.get('tickets') as FormArray;
      for (const c of arr.controls) {
        const ticket = c.get('ticket').value;
        if (ticket) {
          rm = this.remarkHelper.createRemark('*TICKET**' + ticket + '*', 'RI', 'R');
          rmGroup.remarks.push(rm);
        }
      }

      arr = frmGroup.get('offers') as FormArray;
      for (const c of arr.controls) {
        if (frmGroup.value.typeTransaction === 'itinerary') {
          const offer = c.get('offer').value;
          if (offer) {
            rm = this.remarkHelper.createRemark('*OFFER**' + offer + '*', 'RI', 'R');
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
        rm = this.remarkHelper.createRemark('LANGUAGE-' + frmGroup.value.language, 'RM', 'Z');
        rmGroup.remarks.push(rm);
      }

      if (rems.length > 0 && rems[0].remarkText.substr(-5) !== frmGroup.value.language) {
        rm = this.remarkHelper.createRemark('CONF*LANG:' + frmGroup.value.language.substr(0, 2), 'RM', 'Z');
        rmGroup.remarks.push(rm);
      }
    }

    if (!this.pnrService.getRmqEmail()) {
      rm = this.remarkHelper.createRemark('EMAIL ADD-NO', 'RM', 'Q');
      rmGroup.remarks.push(rm);
    }
    rm = this.writeTktLine(rmGroup);
    this.deleteItineraryRemarks(rmGroup, frmGroup);
    return rmGroup;
  }
  private deleteItineraryRemarks(rmGroup: RemarkGroup, frmGroup: FormGroup) {
    const listRegex = ['SEND TO MAIL (?<temp>.*)', 'LANG:(EN|FR)'];
    let regx: RegExp;
    let rems: any[];
    listRegex.forEach((element) => {
      if ((element.indexOf('LANG') > -1 && frmGroup.value.language) || element.indexOf('LANG') === -1) {
        regx = new RegExp(element);
        rems = this.pnrService.getRemarksFromGDSByRegex(regx, 'RM');
        if (rems.length > 0) {
          rems.forEach((r) => {
            rmGroup.deleteRemarkByIds.push(r.lineNo);
          });
        }
      }
    });
    const listRemark = ['SERVICE', 'TICKET', 'OFFER'];
    listRemark.forEach((element) => {
      const rirService = '\\*' + element + '\\*\\*(?<service>(.*))\\*';
      regx = new RegExp(rirService);
      rems = this.pnrService.getRemarksFromGDSByRegex(regx, 'RIR');
      if (rems.length > 0) {
        rems.forEach((r) => {
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
    rems.forEach((element) => {
      if (element.qualifier === 'T') {
        writetkt = false;
      }
    });
    let route = '';
    if (air.length > 0 && writetkt) {
      route = this.writeRouteType();
      const rm = this.remarkHelper.createRemark('TKT-' + route, 'RM', 'T');
      rmGroup.remarks.push(rm);
    }
  }
  writeRouteType() {
    let route = 'DOM';
    this.pnrService.pnrObj.airSegments.forEach((element) => {
      const arrival = this.ddbService.getCityCountry(element.arrivalAirport);
      route = this.getRoute(arrival.country, route);
      const departure = this.ddbService.getCityCountry(element.departureAirport);
      route = this.getRoute(departure.country, route);
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
