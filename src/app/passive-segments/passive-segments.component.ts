
import { Component, Input, ViewChild } from '@angular/core';
// import { PassiveSegmentViewModel } from '../models/passive-segment-view.model';
import { SegmentsComponent } from './segments/segments.component';
import { TourSegmentComponent } from './tour-segment/tour-segment.component';


@Component({
  selector: 'app-passive-segments',
  templateUrl: './passive-segments.component.html',
  styleUrls: ['./passive-segments.component.scss']
})

export class PassiveSegmentsComponent {

  @ViewChild(SegmentsComponent) segmentRemark: SegmentsComponent;
  // @Input()
  // passiveSegmentView: PassiveSegmentViewModel;
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
