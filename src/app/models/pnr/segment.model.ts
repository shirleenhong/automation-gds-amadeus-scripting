import { Time } from '@angular/common';

export class SegmentModel {
  id: string;
  supplierName: string;
  from: string;
  to: string;
  startDate: Date;
  startTime: Time;
  endDate: Date;
  endTime: Time;
  confirmationNo: string;
  unitPrice: string;
  currency: string;
}
