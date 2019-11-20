import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { RBCRedemptionModel } from 'src/app/models/pnr/rbc-redemption.model';
import { UtilHelper } from 'src/app/helper/util.helper';
import { UpdateRbcPointsRedemptionComponent } from '../update-rbc-points-redemption/update-rbc-points-redemption.component';
import { RemarkService } from 'src/app/service/leisure/remark-remark.service';
import { MessageComponent } from 'src/app/shared/message/message.component';
import { MessageType } from 'src/app/shared/message/MessageType';

@Component({
  selector: 'app-rbc-points-redemption',
  templateUrl: './rbc-points-redemption.component.html',
  styleUrls: ['./rbc-points-redemption.component.scss']
})
export class RbcPointsRedemptionComponent implements OnInit {
  // @Input()
  // rbcRemarks = new Array<RBCRedemptionModel>();

  private modalRef: BsModalRef;
  isAddNew = false;

  // @Input()
  rbcRedemption: RBCRedemptionModel[] = [];

  constructor(private modalService: BsModalService, private utilHelper: UtilHelper, private remarkService: RemarkService) {}

  ngOnInit() {
    // this.rbcRedemption = this.pnrService.getAccountingRemarks();
    this.modalSubscribeOnClose();
    this.rbcRedemption = this.remarkService.getRbcPointsRemarksFromPnr();
  }

  addRBCRedemptionPoints() {
    this.isAddNew = true;
    const rbcPoints = new RBCRedemptionModel();
    this.modalRef = this.modalService.show(UpdateRbcPointsRedemptionComponent, {
      backdrop: 'static'
    });
    rbcPoints.rbcNo = this.rbcRedemption.length + 1;
    this.modalRef.content.title = 'Add RBC Points Redemption';
    this.modalRef.content.rbcPoints = rbcPoints;
  }

  modalSubscribeOnClose() {
    this.modalService.onHide.subscribe(() => {
      if (this.modalRef !== undefined && this.modalRef.content.isSubmitted) {
        if (!this.isAddNew) {
          const rbcNo = this.rbcRedemption.find((x) => x.rbcNo === this.modalRef.content.rbcPoints.rbcNo);
          this.utilHelper.modelCopy(this.modalRef.content.rbcPoints, rbcNo);
        } else {
          this.rbcRedemption.push(this.modalRef.content.rbcPoints);
        }
        this.modalRef.content.isSubmitted = false;
      }

      if (
        this.modalRef &&
        this.modalRef.content &&
        this.modalRef.content.callerName === 'RBC-Redemption' &&
        this.modalRef.content.response === 'YES'
      ) {
        const r = this.modalRef.content.paramValue;
        this.rbcRedemption.splice(this.rbcRedemption.indexOf(r), 1);
        let i = 1;
        this.rbcRedemption.forEach((x) => {
          x.rbcNo = i;
          i++;
        });
        this.modalRef.content.response = '';
      }
    });
  }

  updateItem(r: RBCRedemptionModel) {
    this.isAddNew = false;
    this.modalRef = this.modalService.show(UpdateRbcPointsRedemptionComponent, {
      backdrop: 'static'
    });
    this.modalRef.content.title = 'Update RBC Points Redemption';
    this.modalRef.content.rbcPoints = new RBCRedemptionModel();
    this.utilHelper.modelCopy(r, this.modalRef.content.rbcPoints);
    this.modalRef.content.onChangeProductType(r.productType);
    // this.modalRef.content.onChangeStateRoom(r.stateRoom);
  }

  deleteItem(r: RBCRedemptionModel) {
    this.modalRef = this.modalService.show(MessageComponent, {
      backdrop: 'static'
    });
    this.modalRef.content.modalRef = this.modalRef;
    this.modalRef.content.title = 'Delete?';
    this.modalRef.content.message = 'Are you sure you want to delete this RBC points redemption?';
    this.modalRef.content.callerName = 'RBC-Redemption';
    this.modalRef.content.response = '';
    this.modalRef.content.paramValue = r;
    this.modalRef.content.setMessageType(MessageType.YesNo);
  }
}
