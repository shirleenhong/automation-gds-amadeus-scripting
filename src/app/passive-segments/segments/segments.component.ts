import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { TourSegmentViewModel } from 'src/app/models/tour-segment-view.model';
import { UpdateSegmentComponent } from '../update-segment/update-segment.component';
import { PassiveSegmentsModel } from 'src/app/models/pnr/passive-segments.model';
import { SegmentsViewModel } from 'src/app/models/segments-view.model';
import { UtilHelper } from 'src/app/helper/util.helper';
import { PnrService } from 'src/app/service/pnr.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-segments',
  templateUrl: './segments.component.html',
  styleUrls: ['./segments.component.scss']
})
export class SegmentsComponent implements OnInit {

  private modalRef: BsModalRef;
  isAddNew = false;
  passengers = [];

  @Input()
  segmentRemarks: PassiveSegmentsModel[] = [];
  // segmentView: SegmentsViewModel;

  constructor(private modalService: BsModalService, private utilHelper: UtilHelper, private pnrService: PnrService) {
    //
  }

  ngOnInit() {
    this.segmentRemarks = this.pnrService.getModelPassiveSegments();
    this.modalSubscribeOnClose();
  }

  addPassiveSegment() {
    this.isAddNew = true;
    const passiveSegment = new PassiveSegmentsModel();
    this.modalRef = this.modalService.show(UpdateSegmentComponent, { backdrop: 'static' });
    this.modalRef.content.title = 'Add Passive Segment';
    passiveSegment.segmentNo = (this.segmentRemarks.length + 1);
    passiveSegment.isNew = true;
    passiveSegment.noPeople = this.getNoPassengers();
    this.modalRef.content.passiveSegments = passiveSegment;

  }

  modalSubscribeOnClose() {
    this.modalService.onHide.subscribe(result => {
      if (this.modalRef !== undefined && this.modalRef.content.isSubmitted) {
        if (!this.isAddNew) {
          const segmentNo = this.segmentRemarks.find(x => x.segmentNo === this.modalRef.content.passiveSegments.segmentNo);
          this.utilHelper.modelCopy(this.modalRef.content.passiveSegments, segmentNo);
        } else {
          this.segmentRemarks.push(this.modalRef.content.passiveSegments);
        }
        this.modalRef.content.isSubmitted = false;
      }
    });
  }

  updateItem(r: PassiveSegmentsModel) {
    this.isAddNew = false;
    this.modalRef = this.modalService.show(UpdateSegmentComponent, { backdrop: 'static' });
    this.modalRef.content.title = 'Update Matrix Receipt';
    this.modalRef.content.matrixReceipt = new PassiveSegmentsModel();
    this.utilHelper.modelCopy(r, this.modalRef.content.passiveSegments);
    this.modalRef.content.onChangeSegmentType(r.segmentType);
    this.modalRef.content.onChangeStateRoom(r.stateRoom);
  }

  deleteItem(r: PassiveSegmentsModel) {
    if (confirm('Are you sure you want to delete this Segment?')) {
      this.segmentRemarks.splice(this.segmentRemarks.indexOf(r), 1);
      let i = 1;
      this.segmentRemarks.forEach(x => {
        x.segmentNo = i;
        i++;
      });
    }
  }

  getNoPassengers() {
    this.passengers = this.pnrService.getPassengers();
    return this.passengers.length.toString();
  }

}
