import { Component, Input, ViewChild } from '@angular/core';
import { PassiveSegmentViewModel } from '../models/passive-segment-view.model';
import { SegmentsComponent } from './segments/segments.component';

@Component({
  selector: 'app-passive-segments',
  templateUrl: './passive-segments.component.html',
  styleUrls: ['./passive-segments.component.scss']
})

export class PassiveSegmentsComponent {

  @ViewChild(SegmentsComponent) segmentRemark: SegmentsComponent;

  @Input()
  passiveSegmentView: PassiveSegmentViewModel;

  constructor() {

  }

  onEditReceipt() {

  }

  onAddReceipt() {

  }
}
