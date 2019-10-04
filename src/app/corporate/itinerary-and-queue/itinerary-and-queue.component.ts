import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilHelper } from '../../helper/util.helper';
import { QueueComponent } from 'src/app/corporate/itinerary-and-queue/queue/queue.component';

@Component({
  selector: 'app-itinerary-and-queue', 
  templateUrl: './itinerary-and-queue.component.html',
  styleUrls: ['./itinerary-and-queue.component.scss']
})
export class ItineraryAndQueueComponent implements OnInit {

  @ViewChild(QueueComponent) queueComponent: QueueComponent;
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
