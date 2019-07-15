import { Component, ViewChild } from '@angular/core';
import { SegmentsComponent } from './segments/segments.component';

@Component({
  selector: 'app-passive-segments',
  templateUrl: './passive-segments.component.html',
  styleUrls: ['./passive-segments.component.scss']
})
export class PassiveSegmentsComponent {
  @ViewChild(SegmentsComponent) segmentRemark: SegmentsComponent;

  constructor() {}

  onEditReceipt() {}

  onAddReceipt() {}
  checkValid() {
    // add validation here if theres need to validate
    return true;
  }
}
