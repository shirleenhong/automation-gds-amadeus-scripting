import { Component, OnInit, ViewChild } from '@angular/core';
import { QueueMinderComponent } from './queue-minder/queue-minder.component';
import { CounselorDetail } from 'src/app/globals/counselor-identity';
import { ItineraryInvoiceQueue } from '../itinerary-and-queue/itinerary-invoice-queue/itinerary-invoice-queue.component';
import { OfcDocumentationComponent } from './ofc-documentation/ofc-documentation.component';
import { UtilHelper } from 'src/app/helper/util.helper';
import { ContainerComponent } from '../business-rules/container/container.component';
import { RulesEngineService } from 'src/app/service/business-rules/rules-engine.service';

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

  isEsc = false;
  isOfc = false;
  constructor(private counselorDetail: CounselorDetail, private utilHelper: UtilHelper, private rulesEngineService: RulesEngineService) {}

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

  hasRules(entityName: string, resultValue: string) {
    console.log(name);

    return this.rulesEngineService.checkRuleResultExist(entityName, resultValue);
  }
}
