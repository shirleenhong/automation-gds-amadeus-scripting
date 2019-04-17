import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { UpdateFareRuleSegmentComponent } from '../update-fare-rule-segment/update-fare-rule-segment.component';

@Component({
  selector: 'app-fare-rule-segment',
  templateUrl: './fare-rule-segment.component.html',
  styleUrls: ['./fare-rule-segment.component.scss']
})
export class FareRuleSegmentComponent implements OnInit {

  private modalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  addFareRuleSegment() {
    this.modalRef = this.modalService.show(UpdateFareRuleSegmentComponent, { backdrop: 'static' });
    this.modalRef.content.title = 'Add Fare Rule';
    //   this.modalRef.content.passiveSegment = new PassiveSegmentModel();

    this.modalService.onHide.subscribe(result => {
      if (this.modalRef.content.isSubmitted) {
        // this.tourSegmentView.tourSegmentList.push(this.modalRef.content.passiveSegment);
        //  this.buildRemark(this.modalRef.content.passiveSegment);

      }
    });
  }
}
