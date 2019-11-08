import { Component, OnInit, ViewChild } from '@angular/core';
import { CancelSegmentComponent } from 'src/app/shared/cancel-segment/cancel-segment.component';

@Component({
  selector: 'app-corp-cancel',
  templateUrl: './corp-cancel.component.html',
  styleUrls: ['./corp-cancel.component.scss']
})
export class CorpCancelComponent implements OnInit {
  @ViewChild(CancelSegmentComponent) cancelSegmentComponent: CancelSegmentComponent;

  constructor() {}

  ngOnInit(): void {}

  checkValid() {
    if (!this.cancelSegmentComponent.checkValid()) {
      return false;
    }

    return true;
  }
}
