import { Component, OnInit, ViewChild } from '@angular/core';
import { CancelSegmentComponent } from 'src/app/shared/cancel-segment/cancel-segment.component';
import { UtilHelper } from 'src/app/helper/util.helper';

@Component({
  selector: 'app-corp-cancel',
  templateUrl: './corp-cancel.component.html',
  styleUrls: ['./corp-cancel.component.scss']
})
export class CorpCancelComponent implements OnInit {

  @ViewChild(CancelSegmentComponent) cancelSegmentComponent: CancelSegmentComponent;

  constructor(private utilHelper: UtilHelper) { }

  ngOnInit() {
  }

  checkValid() {
    this.utilHelper.validateAllFields(this.cancelSegmentComponent.cancelForm);
    if (!this.cancelSegmentComponent.cancelForm.valid) {
      return false;
    }
    return true;
  }

}
