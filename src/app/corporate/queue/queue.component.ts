import { Component, OnInit, ViewChild } from '@angular/core';
import { QueueMinderComponent } from './queue-minder/queue-minder.component';
import { CounselorDetail } from 'src/app/globals/counselor-identity';
import { ItineraryInvoiceQueue } from '../itinerary-and-queue/itinerary-invoice-queue/itinerary-invoice-queue.component';
import { OfcDocumentationComponent } from './ofc-documentation/ofc-documentation.component';
import { UtilHelper } from 'src/app/helper/util.helper';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {
  @ViewChild(QueueMinderComponent) queueMinderComponent: QueueMinderComponent;
  @ViewChild(ItineraryInvoiceQueue) itineraryInvoiceQueue: ItineraryInvoiceQueue;
  @ViewChild(OfcDocumentationComponent) ofcDocumentation: OfcDocumentationComponent;

  isEsc = false;
  isOfc = false;
  constructor(private counselorDetail: CounselorDetail, private utilHelper: UtilHelper) {}

  ngOnInit() {
    this.counselorDetail.identityOnChange.subscribe((x) => {
      this.isEsc = x === 'ESC';
      this.isOfc = x === 'OFC';
    });
  }

  checkValid() {
    if (this.ofcDocumentation !== undefined && this.isOfc) {
      this.utilHelper.validateAllFields(this.ofcDocumentation.ofcDocForm);
      if (!this.ofcDocumentation.ofcDocForm.valid) {
        return false;
      }
    }
    return true;
  }
}
