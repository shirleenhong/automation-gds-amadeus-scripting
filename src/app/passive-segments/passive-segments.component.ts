import { Component, Input } from '@angular/core';
import { PassiveSegmentViewModel } from '../models/passive-segment-view.model';

@Component({
  selector: 'app-passive-segments',
  templateUrl: './passive-segments.component.html',
  styleUrls: ['./passive-segments.component.scss']
})

export class PassiveSegmentsComponent {
  @Input()
  passiveSegmentView: PassiveSegmentViewModel;

  onEditReceipt() {

  }

  onAddReceipt() {

  }
}
