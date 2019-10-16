import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilHelper } from '../../helper/util.helper';
import { ItineraryInvoiceQueue } from './itinerary-invoice-queue/itinerary-invoice-queue.component';
import { ItineraryComponent } from './itinerary/itinerary.component';


@Component({
  selector: 'app-itinerary-and-queue',
  templateUrl: './itinerary-and-queue.component.html',
  styleUrls: ['./itinerary-and-queue.component.scss']
})
export class ItineraryAndQueueComponent implements OnInit {

  @ViewChild(ItineraryInvoiceQueue) queueComponent: ItineraryInvoiceQueue;
  @ViewChild(ItineraryComponent) itineraryComponent: ItineraryComponent;
  constructor(private utilHelper: UtilHelper) { }

  ngOnInit() {
  }

  checkValid() {
    this.utilHelper.validateAllFields(this.queueComponent.queueForm);
    if (
      !this.queueComponent.queueForm.valid
    ) {
      return false;
    }
    this.utilHelper.validateAllFields(this.itineraryComponent.itineraryForm);
    if (this.itineraryComponent.itineraryForm.touched && !this.itineraryComponent.itineraryForm.valid) {
      return false;
    }

    return true;
  }


}
