import { Injectable, OnInit } from '@angular/core';
import { PnrService } from '../pnr.service';
import { QueuePlaceModel } from '../../models/pnr/queue-place.model';
import { formatDate } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { AmadeusQueueService } from '../amadeus-queue.service';

@Injectable({
  providedIn: 'root'
})
export class ItineraryRemarkService implements OnInit {
  destination = [];
  leisureOnDemandOID: any = "";

  constructor(private pnrService: PnrService, private amadeusQueue: AmadeusQueueService) {
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
}
