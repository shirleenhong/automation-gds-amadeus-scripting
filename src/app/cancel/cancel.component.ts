import { Component, OnInit, ViewChild } from '@angular/core';
import { RefundComponent } from './refund/refund.component';
import { CancelSegmentComponent } from './cancel-segment/cancel-segment.component';
import { UtilHelper } from '../helper/util.helper';



@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.scss']
})
export class CancelComponent implements OnInit {
  @ViewChild(RefundComponent) refundComponent: RefundComponent;
  @ViewChild(CancelSegmentComponent) cancelSegmentComponent: CancelSegmentComponent;

  constructor(private utilHelper: UtilHelper) { }

  ngOnInit() {
  }

  checkValid() {
    this.utilHelper.validateAllFields(this.refundComponent.refundForm);
    if (
      !this.refundComponent.refundForm.valid
    ) {
      return false;
    }

    this.utilHelper.validateAllFields(this.cancelSegmentComponent.cancelForm);
    if (!this.cancelSegmentComponent.cancelForm.valid) {
      return false;
    }
    return true;
  }
}
