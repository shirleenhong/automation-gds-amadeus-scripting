import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PnrService } from '../pnr.service';
import { RemarksManagerService } from './remarks-manager.service';
import { QueuePlaceModel } from 'src/app/models/pnr/queue-place.model';
import { formatDate } from '@angular/common';
import { AmadeusQueueService } from '../amadeus-queue.service';

@Injectable({
  providedIn: 'root'
})
export class OfcRemarkService {
  queues: Array<QueuePlaceModel> = [];
  ofcQueue = '75C110';

  constructor(private pnrService: PnrService, private remarksManager: RemarksManagerService, private amdeusQueue: AmadeusQueueService) {}

  public WriteOfcDocumentation(fg: FormGroup) {
    this.queues = [];
    const isOscTravel = fg.get('isOscTravel').value;
    const isOscQueue = fg.get('isOscQueue').value;

    if (fg.get('ticketType').value === 'non-bsp') {
      if (isOscTravel === 'Y') {
        const map = new Map<string, string>();
        map.set('OfcQueue', this.ofcQueue);
        this.remarksManager.createPlaceholderValues(map, null, null);
        this.setRfInfo();
        this.setQueue(this.ofcQueue);
      }

      if (isOscQueue === 'Y') {
        const map = new Map<string, string>();
        map.set('OscQueue', this.ofcQueue);
        this.remarksManager.createPlaceholderValues(map, null, null);
      }

      if (isOscQueue === 'N' && isOscTravel === 'N') {
        this.setRfInfo();
      }
    } else if (fg.get('ticketType').value === 'bsp') {
      if (isOscTravel === 'Y' && isOscQueue === 'N') {
        this.setRfInfo();
      } else if (isOscTravel === 'N' && isOscQueue === 'Y') {
        this.setRfInfo();
        this.setQueue(this.ofcQueue);
      }
    }
  }

  setRfInfo() {
    const agentSign = this.pnrService.getAgentIdCreatedPnr();
    this.remarksManager.setReceiveFrom('OSC AGT/' + agentSign);
  }

  setQueue(queue: string) {
    const q = new QueuePlaceModel();
    q.pcc = this.pnrService.PCC;
    q.date = formatDate(Date.now(), 'ddMMyy', 'en').toString();
    const categoryqueue = queue.split('C');
    q.queueNo = categoryqueue[0];
    q.category = categoryqueue[1];
    this.amdeusQueue.addQueueCollection(q);
  }
}
