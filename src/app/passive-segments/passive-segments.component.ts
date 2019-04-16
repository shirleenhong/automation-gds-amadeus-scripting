import { Component, ViewChild } from '@angular/core';
import { TourSegmentComponent } from './tour-segment/tour-segment.component';

@Component({
  selector: 'app-passive-segments',
  templateUrl: './passive-segments.component.html',
  styleUrls: ['./passive-segments.component.scss']
})

export class PassiveSegmentsComponent {
  @ViewChild(TourSegmentComponent) tourSegmentComponent: TourSegmentComponent;

  constructor() {

  }

  onEditReceipt() {

  }

  onAddReceipt() {

  }
  checkValid() {
    // add validation here if theres need to validate
    return true;
  }
}
