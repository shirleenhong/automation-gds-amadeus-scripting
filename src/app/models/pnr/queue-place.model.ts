import { formatDate } from '@angular/common';

export class QueuePlaceModel {
  queueNo: string;
  pcc: string;
  freetext: string;
  date: string;
  category: string;

  constructor(pcc?, queueNo?, category?) {
    this.pcc = pcc;
    this.queueNo = queueNo;
    this.category = category;
    this.date = formatDate(Date.now(), 'ddMMyy', 'en').toString();
  }
}
