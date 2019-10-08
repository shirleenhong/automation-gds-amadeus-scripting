import { Injectable, OnInit } from '@angular/core';
import { PnrService } from '../pnr.service';
import { QueuePlaceModel } from '../../models/pnr/queue-place.model';
import { formatDate } from '@angular/common';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ItineraryRemarkService implements OnInit {
  destination = [];
  leisureOnDemandOID: any = "";
  
  constructor(private pnrService: PnrService) {
   }
  
  async ngOnInit() {
  
  }
  addQueue(frmGroup: FormGroup) {
    const queueGroup = Array<QueuePlaceModel>();

    if (frmGroup.controls.personalQueue.value && frmGroup.controls.queueNo.value) {
      this.getQueueMinder(queueGroup, 'personalQueue', frmGroup.controls.queueNo.value);
    }
    return queueGroup;
  }

  private getQueueMinder(queueGroup: Array<QueuePlaceModel>, controlname: string, queueno?: string) { 
    const queue = new QueuePlaceModel();
    const queuePlaceDescription = [
      { control: 'personalQueue', queueNo: '', pcc: '', text: 'personal Queue', category: '' },
      { control: 'invoice', queueNo: '66', pcc: 'YTOWL210E', text: 'invoice', category: '1' },
      { control: 'itinerary', queueNo: '65', pcc: 'YTOWL210E', text: 'itinerary', category: '1' },
      { control: 'vip', queueNo: '62', pcc: 'PARWL2877', text: '', category: '' },
      { control: 'pendingApproval', queueNo: '63', pcc: 'PARWL2877', text: 'pendingApproval', category: '1' },
      { control: 'confPending', queueNo: '66', pcc: '', text: '', category: '1' },
      { control: 'leadMgr', queueNo: '227', pcc: '', text: '', category: '50' },
      { control: 'groups', queueNo: '228', pcc: '', text: '', category: '50' },
      { control: 'urgentFollowUp', queueNo: '229', pcc: '', text: '', category: '50' },
      { control: 'specialServiceWaivers', queueNo: '230', pcc: '', text: '', category: '50' },
      { control: 'cpmplexIntPending', queueNo: '231', pcc: '', text: '', category: '50' },
      { control: 'splitTickets', queueNo: '232', pcc: '', text: '', category: '50' },
      { control: 'clientOptions1', queueNo: '233', pcc: '', text: '', category: '50' },
      { control: 'clientOptions2', queueNo: '234', pcc: '', text: '', category: '50' },
      { control: 'acFlipghtPass', queueNo: '235', pcc: '', text: '', category: '50' },
      { control: 'optional1', queueNo: '236', pcc: '', text: '', category: '50' },
      { control: 'optional2', queueNo: '237', pcc: '', text: '', category: '50' },
      { control: 'optional3', queueNo: '238', pcc: '', text: '', category: '50' },
      { control: 'optional4', queueNo: '239', pcc: '', text: '', category: '50' }
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

  addItineraryQueue(frmGroup: FormGroup) { 
    const queueGroup = Array<QueuePlaceModel>();
    if (frmGroup.controls.typeTransaction.value) {
      let tanstype = '';
      if (frmGroup.controls.typeTransaction.value === 'invoice') {
        tanstype = 'invoice';
      } else if (frmGroup.controls.typeTransaction.value === 'itinerary') {
        tanstype = 'itinerary';
      }
      this.getQueueMinder(queueGroup, tanstype);
    }
    return queueGroup;
  }

  addTeamQueue(frmGroup: FormGroup) { 
    const queueGroup = Array<QueuePlaceModel>();
    if (frmGroup.controls.teamQueue.value) {
     
      this.getQueueMinder(queueGroup, frmGroup.controls.teamQueue.value);
    }
    return queueGroup;
  }
}
