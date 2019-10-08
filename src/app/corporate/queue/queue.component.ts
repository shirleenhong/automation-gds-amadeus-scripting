import { Component, OnInit, ViewChild } from '@angular/core';
import { QueueMinderComponent } from './queue-minder/queue-minder.component';
import { CounselorDetail } from 'src/app/globals/counselor-identity';
import { ItineraryInvoiceQueue } from '../itinerary-and-queue/itinerary-invoice-queue/itinerary-invoice-queue.component';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {

  @ViewChild(QueueMinderComponent) queueMinderComponent: QueueMinderComponent;
  @ViewChild(ItineraryInvoiceQueue) itineraryInvoiceQueue: ItineraryInvoiceQueue;

  isEsc = false;
  constructor(private counselorDetail: CounselorDetail) { }

  ngOnInit() {
    this.counselorDetail.identityOnChange.subscribe((x) => {
      this.isEsc = x === 'ESC';
    });
  }

}
