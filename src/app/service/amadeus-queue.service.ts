import { Injectable } from '@angular/core';
import { PnrService } from './pnr.service';
import { QueuePlaceModel } from '../models/pnr/queue-place.model';

declare var smartScriptSession: any;

@Injectable({
  providedIn: 'root'
})
export class AmadeusQueueService {
  responseMessage: string;
  queueElement: Array<any>;
  queueCollection: Array<QueuePlaceModel>;

  constructor(private pnrService: PnrService) {
    this.queueCollection = new Array<QueuePlaceModel>();
  }

  addQueueCollection(queueModel: QueuePlaceModel) {
    this.queueCollection.push(queueModel);
  }

  newQueueCollection() {
    this.queueCollection = new Array<QueuePlaceModel>();
  }

  async queuePNR() {
    this.queueElement = new Array<any>();
    const selectionDetails = {
      option: 'QEQ'
    };

    const placementOption = {
      selectionDetails
    };

    const pnr = this.pnrService.recordLocator();
    const reservation = {
      controlNumber: pnr
    };

    const recordLocator = {
      reservation
    };

    if (this.queueCollection != null && this.queueCollection.length > 0) {
      this.queueCollection.forEach((element) => {
        this.queueElement.push(this.buildQueueDetails(element));
      });
    }

    const queueElements = {
      placementOption,
      targetDetails: this.queueElement,
      recordLocator
    };

    console.log(JSON.stringify(queueElements));
    await smartScriptSession.requestService('ws.queuePlacePnr_v03.1', queueElements).then(
      () => {
        this.responseMessage = 'Remarks Updated';

        smartScriptSession.getActiveTask().then((x) => {
          if (x.subtype === 'PNR') {
            smartScriptSession.requestService('bookingfile.refresh', null, {
              fn: '',
              scope: this
            });
          }
        });
      },
      (error) => {
        this.responseMessage = JSON.stringify(error);
      }
    );
  }

  buildQueueDetails(queue: QueuePlaceModel) {
    const subQueueInfoDetails = {
      identificationType: 'C',
      itemNumber: queue.category
    };

    const categoryDetails = {
      subQueueInfoDetails
    };

    const queueDetails = {
      number: queue.queueNo
    };

    const queueNumber = {
      queueDetails
    };

    let type = '3';
    if (queue.pcc) {
      type = '4';
    }

    const sourceType = {
      sourceQualifier1: type
    };

    let originatorDetails: { inHouseIdentification1: any };

    if (type === '4') {
      originatorDetails = {
        inHouseIdentification1: queue.pcc
      };
    }
    const targetOffice = {
      sourceType,
      originatorDetails
    };

    return { targetOffice, queueNumber, categoryDetails };
  }
}
