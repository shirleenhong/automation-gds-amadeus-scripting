import { Injectable } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { QueuePlaceModel } from 'src/app/models/pnr/queue-place.model';
import { formatDate } from '@angular/common';
import { AmadeusQueueService } from '../amadeus-queue.service';

declare var smartScriptSession: any;
@Injectable({
  providedIn: 'root'
})
export class QueueService {
  constructor(private queueRemarksService: AmadeusQueueService) {}

  public getQueuePlacement(queueGroup: FormGroup): void {
    const items = queueGroup.get('queues') as FormArray;

    for (const group of items.controls) {
      const queue = new QueuePlaceModel();
      queue.pcc = group.get('oid').value;
      queue.date = formatDate(Date.now(), 'ddMMyy', 'en').toString();
      queue.queueNo = group.get('queueNumber').value;
      queue.category = group.get('category').value;
      this.queueRemarksService.addQueueCollection(queue);
    }
  }

  public async oidQueuePlacement() {
    await smartScriptSession.send('QC7CE');
    await smartScriptSession.send('QAM7C1');
    await smartScriptSession.send('QAC7c1-8');
    await smartScriptSession.send('QAN7C6');
    await smartScriptSession.send('QAN7C7');
    await smartScriptSession.send('QAC7c11-11');
    await smartScriptSession.send('QAC7c14-14');
    await smartScriptSession.send('QAC7c16-16');
    await smartScriptSession.send('QC7CE');
  }
}
