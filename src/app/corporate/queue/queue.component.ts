import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { QueueMinderComponent } from './queue-minder/queue-minder.component';
import { CounselorDetail } from 'src/app/globals/counselor-identity';
import { ItineraryInvoiceQueue } from '../itinerary-and-queue/itinerary-invoice-queue/itinerary-invoice-queue.component';
import { OfcDocumentationComponent } from './ofc-documentation/ofc-documentation.component';
import { UtilHelper } from 'src/app/helper/util.helper';
import { ContainerComponent } from '../business-rules/container/container.component';
import { RulesEngineService } from 'src/app/service/business-rules/rules-engine.service';
import { ItineraryComponent } from 'src/app/leisure/itinerary-and-queue/itinerary/itinerary.component';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {
  @ViewChild(QueueMinderComponent) queueMinderComponent: QueueMinderComponent;
  @ViewChild(ItineraryInvoiceQueue) itineraryInvoiceQueue: ItineraryInvoiceQueue;
  @ViewChild(OfcDocumentationComponent) ofcDocumentation: OfcDocumentationComponent;
  @ViewChild(ContainerComponent) containerComponent: ContainerComponent;
  @ViewChild(ItineraryComponent) itineraryComponent: ItineraryComponent;
  hasRules = false;
  isEsc = false;
  isOfc = false;

  @Input()
  workflow;

  constructor(private counselorDetail: CounselorDetail, private utilHelper: UtilHelper, private rulesEngineService: RulesEngineService) {}

  ngOnInit() {
    this.hasRules = this.rulesEngineService.checkRuleResultExist('UI_DISPLAY_CONTAINER', 'QUEUE');
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
    this.utilHelper.validateAllFields(this.itineraryComponent.itineraryForm);
    if (this.itineraryComponent.itineraryForm.touched && !this.itineraryComponent.itineraryForm.valid) {
      return false;
    }

    if (this.containerComponent) {
      this.utilHelper.validateAllFields(this.containerComponent.containerForm);
      if (!this.containerComponent.containerForm.valid) {
        return false;
      }
    }

    return true;
  }
}
