import { Injectable } from '@angular/core';
import { QueueMinderComponent } from 'src/app/corporate/queue/queue-minder/queue-minder.component';
import { FormGroup, FormArray } from '@angular/forms';
import { QueuePlaceModel } from 'src/app/models/pnr/queue-place.model';
import { formatDate } from '@angular/common';
import { QueueRemarkService } from '../queue-remark.service';

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  constructor(private queueRemarksService: QueueRemarkService) { }

  public getQueuePlacement(queueComp: QueueMinderComponent): void {
    const queueGroup: FormGroup = queueComp.queueMinderForm;
    const items = queueGroup.get('queues') as FormArray;

    for (const group of items.controls) {
      const queue = new QueuePlaceModel();
      queue.pcc = group.get('oid').value;
      queue.date = formatDate(Date.now(), 'ddMMyy', 'en').toString();
      queue.queueNo = group.get('queueNumber').value;
      queue.category = group.get('category').value;
      this.queueRemarksService.queueCollection.push(queue);
    }
  }
}
