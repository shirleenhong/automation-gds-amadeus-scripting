import { Component, OnInit, ViewChild } from '@angular/core';
import { CancelSegmentComponent } from 'src/app/shared/cancel-segment/cancel-segment.component';
import { NonBspTicketCreditComponent } from './non-bsp-ticket-credit/non-bsp-ticket-credit.component';
import { UtilHelper } from 'src/app/helper/util.helper';

@Component({
  selector: 'app-corp-cancel',
  templateUrl: './corp-cancel.component.html',
  styleUrls: ['./corp-cancel.component.scss']
})
export class CorpCancelComponent implements OnInit {
  @ViewChild(NonBspTicketCreditComponent) nonBspTicketCreditComponent: NonBspTicketCreditComponent;

  @ViewChild(CancelSegmentComponent) cancelSegmentComponent: CancelSegmentComponent;

  constructor(private utilHelper: UtilHelper) {}

  ngOnInit(): void {}

  checkValid() {
    if (!this.cancelSegmentComponent.checkValid()) {
      return false;
    }

    this.utilHelper.validateAllFields(this.nonBspTicketCreditComponent.nonBspForm);
    if (!this.nonBspTicketCreditComponent.nonBspForm.valid) {
      return false;
    }

    return true;
  }
}
