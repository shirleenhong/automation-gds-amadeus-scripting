import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { UpdateSegmentComponent } from '../update-segment/update-segment.component';
import { PassiveSegmentsModel } from 'src/app/models/pnr/passive-segments.model';
import { UtilHelper } from 'src/app/helper/util.helper';
import { PnrService } from 'src/app/service/pnr.service';
import { MessageComponent } from 'src/app/shared/message/message.component';
import { MessageType } from 'src/app/shared/message/MessageType';

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
    this.modalRef = this.modalService.show(UpdateSegmentComponent, {
      backdrop: 'static'
    });
    this.modalRef.content.title = 'Add Passive Segment';
    this.modalRef.content.segmentList = this.segmentRemarks;
    this.modalRef.content.isAddNew = true;
    passiveSegment.segmentNo = this.segmentRemarks.length + 1;
    passiveSegment.isNew = true;
    passiveSegment.noPeople = this.getNoPassengers();
    this.modalRef.content.passiveSegments = passiveSegment;
  }

  modalSubscribeOnClose() {
    this.modalService.onHide.subscribe(() => {
      if (this.modalRef !== undefined && this.modalRef.content.isSubmitted) {
        if (!this.isAddNew) {
          const segmentNo = this.segmentRemarks.find((x) => x.segmentNo === this.modalRef.content.passiveSegments.segmentNo);
          this.utilHelper.modelCopy(this.modalRef.content.passiveSegments, segmentNo);
        } else {
          this.segmentRemarks.push(this.modalRef.content.passiveSegments);
        }
        this.modalRef.content.isSubmitted = false;
      } else {
        if (this.modalRef.content.callerName === 'Segment' && this.modalRef.content.response === 'YES') {
          const r = this.modalRef.content.paramValue;
          this.segmentRemarks.splice(this.segmentRemarks.indexOf(r), 1);
          let i = 1;
          this.segmentRemarks.forEach((x) => {
            x.segmentNo = i;
            i++;
          });
        }
      }
    });
  }

  updateItem(r: PassiveSegmentsModel) {
    this.isAddNew = false;
    this.modalRef = this.modalService.show(UpdateSegmentComponent, {
      backdrop: 'static'
    });
    this.modalRef.content.title = 'Update Segments';
    this.modalRef.content.segmentList = this.segmentRemarks;
    this.modalRef.content.isAddNew = false;
    this.modalRef.content.matrixReceipt = new PassiveSegmentsModel();
    this.utilHelper.modelCopy(r, this.modalRef.content.passiveSegments);
    this.modalRef.content.onChangeSegmentType(r.segmentType);
    this.modalRef.content.onChangeStateRoom(r.stateRoom);
  }

  deleteItem(r: PassiveSegmentsModel) {
    this.modalRef = this.modalService.show(MessageComponent, {
      backdrop: 'static'
    });
    this.modalRef.content.modalRef = this.modalRef;
    this.modalRef.content.title = 'Delete?';
    this.modalRef.content.message = 'Are you sure you want to delete this Segment?';
    this.modalRef.content.callerName = 'Segment';
    this.modalRef.content.response = '';
    this.modalRef.content.paramValue = r;
    this.modalRef.content.setMessageType(MessageType.YesNo);
  }

  getNoPassengers() {
    this.passengers = this.pnrService.getPassengers();
    return this.passengers.length.toString();
  }
}
