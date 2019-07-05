import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { UpdateFareRuleSegmentComponent } from '../update-fare-rule-segment/update-fare-rule-segment.component';
import { FareRuleModel } from 'src/app/models/pnr/fare-rule.model';
import { UtilHelper } from 'src/app/helper/util.helper';

@Component({
  selector: 'app-fare-rule-segment',
  templateUrl: './fare-rule-segment.component.html',
  styleUrls: ['./fare-rule-segment.component.scss']
})
export class FareRuleSegmentComponent implements OnInit {
  private modalRef: BsModalRef;
  isAddNew = false;

  // @Input()
  fareRuleRemarks: FareRuleModel[] = [];

  constructor(
    private modalService: BsModalService,
    private utilHelper: UtilHelper
  ) {}

  ngOnInit() {
    // this.fareRuleRemarks = this.pnrService.getModelPassiveSegments();
    this.modalSubscribeOnClose();
  }

  addFareRuleSegment() {
    this.isAddNew = true;
    const fareRule = new FareRuleModel();
    this.modalRef = this.modalService.show(UpdateFareRuleSegmentComponent, {
      backdrop: 'static'
    });
    this.modalRef.content.title = 'Add Fare Rule';
    this.modalRef.content.fareRules = fareRule;
  }

  modalSubscribeOnClose() {
    this.modalService.onHide.subscribe(() => {
      if (this.modalRef !== undefined && this.modalRef.content.isSubmitted) {
        if (!this.isAddNew) {
          const segmentNo = this.fareRuleRemarks.find(
            x => x.segmentNo === this.modalRef.content.fareRules.segmentNo
          );
          this.utilHelper.modelCopy(this.modalRef.content.fareRules, segmentNo);
        } else {
          this.fareRuleRemarks.push(this.modalRef.content.fareRules);
        }
        this.modalRef.content.isSubmitted = false;
      }
    });
  }

  updateItem(r: FareRuleModel) {
    this.isAddNew = false;
    this.modalRef = this.modalService.show(UpdateFareRuleSegmentComponent, {
      backdrop: 'static'
    });
    this.modalRef.content.title = 'Update Matrix Receipt';
    this.modalRef.content.fareRules = new FareRuleModel();
    this.utilHelper.modelCopy(r, this.modalRef.content.fareRules);
    this.modalRef.content.loadModel();
    // this.modalRef.content.onChangeSegmentType(r.segmentType);
    // this.modalRef.content.onChangeStateRoom(r.stateRoom);
  }

  deleteItem(r: FareRuleModel) {
    if (confirm('Are you sure you want to delete this Fare Rule?')) {
      this.fareRuleRemarks.splice(this.fareRuleRemarks.indexOf(r), 1);
      let i = 1;
      this.fareRuleRemarks.forEach(x => {
        x.segmentNo = i;
        i++;
      });
    }
  }
}
