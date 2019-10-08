import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilHelper } from '../../helper/util.helper';
import { ItineraryInvoiceQueue } from 'src/app/corporate/itinerary-and-queue/itinerary-invoice-queue/itinerary-invoice-queue.component';

@Component({
  selector: 'app-itinerary-and-queue', 
  templateUrl: './itinerary-and-queue.component.html',
  styleUrls: ['./itinerary-and-queue.component.scss']
})
export class ItineraryAndQueueComponent implements OnInit {

  @ViewChild(ItineraryInvoiceQueue) queueComponent: ItineraryInvoiceQueue;
  constructor(private utilHelper: UtilHelper ) { }

  ngOnInit() {
  }

  checkValid() {
    this.utilHelper.validateAllFields(this.queueComponent.queueForm);
    if (
      !this.queueComponent.queueForm.valid
    ) {
      return false;
    }

    return true;
  }

  
}
