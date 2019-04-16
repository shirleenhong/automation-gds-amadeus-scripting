import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { PassiveSegmentModel } from '../../models/pnr/passive-segment.model';
import { UpdateTourSegmentComponent } from '../update-tour-segment/update-tour-segment.component';
import { DatePipe } from '@angular/common';
import { RemarkGroup } from '../../models/pnr/remark.group.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { TourSegmentViewModel } from 'src/app/models/tour-segment-view.model';

@Component({
  selector: 'app-tour-segment',
  templateUrl: './tour-segment.component.html',
  styleUrls: ['./tour-segment.component.scss']
})
export class TourSegmentComponent implements OnInit, OnChanges {

  private modalRef: BsModalRef;
  tourSegmentView = new TourSegmentViewModel();

  constructor(private modalService: BsModalService) {
    //
  }

  ngOnChanges(changes: SimpleChanges): void {

  }


  ngOnInit() {
    this.tourSegmentView.tourSegmentList = [];
  }


  addPassiveSegment() {


    this.modalRef = this.modalService.show(UpdateTourSegmentComponent, { backdrop: 'static' });
    this.modalRef.content.title = 'Add Tour Segment';
    this.modalRef.content.passiveSegment = new PassiveSegmentModel();

    this.modalService.onHide.subscribe(result => {
      if (this.modalRef.content.isSubmitted) {
        this.tourSegmentView.tourSegmentList.push(this.modalRef.content.passiveSegment);
        //  this.buildRemark(this.modalRef.content.passiveSegment);

      }
    });

  }

  checkValid() {
    return true;
  }



}
