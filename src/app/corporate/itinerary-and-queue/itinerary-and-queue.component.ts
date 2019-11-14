import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilHelper } from '../../helper/util.helper';
import { ItineraryInvoiceQueue } from './itinerary-invoice-queue/itinerary-invoice-queue.component';
import { ItineraryComponent } from 'src/app/leisure/itinerary-and-queue/itinerary/itinerary.component';
import { TicketingLineComponent } from 'src/app/corporate/ticketing/ticketing-line/ticketing-line.component';
import { ValidateModel } from 'src/app/models/validate-model';

@Component({
  selector: 'app-itinerary-and-queue',
  templateUrl: './itinerary-and-queue.component.html',
  styleUrls: ['./itinerary-and-queue.component.scss']
})
export class ItineraryAndQueueComponent implements OnInit {
  @ViewChild(ItineraryInvoiceQueue) queueComponent: ItineraryInvoiceQueue;
  @ViewChild(ItineraryComponent) itineraryComponent: ItineraryComponent;
  @ViewChild(TicketingLineComponent) ticketingLineComponent: TicketingLineComponent;
  validModel = new ValidateModel();
  constructor(private utilHelper: UtilHelper) {}

  ngOnInit() {}

  checkValid() {
    if (!this.queueComponent.queueForm.valid) {
      return false;
    }
    this.utilHelper.validateAllFields(this.itineraryComponent.itineraryForm);
    if (this.itineraryComponent.itineraryForm.touched && !this.itineraryComponent.itineraryForm.valid) {
      return false;
    }

    this.utilHelper.validateAllFields(this.ticketingLineComponent.ticketForm);
    if (this.ticketingLineComponent.ticketForm.touched && !this.ticketingLineComponent.ticketForm.valid) {
      return false;
    }

    return true;
  }
}
