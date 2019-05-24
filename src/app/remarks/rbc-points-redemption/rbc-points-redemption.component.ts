import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { RBCRedemptionModel } from 'src/app/models/pnr/rbc-redemption.model';
import { UtilHelper } from 'src/app/helper/util.helper';
import { PnrService } from 'src/app/service/pnr.service';
import { UpdateRbcPointsRedemptionComponent } from '../update-rbc-points-redemption/update-rbc-points-redemption.component';
import { PackageRemarkService } from 'src/app/service/package-remark.service';

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

  constructor(
    private modalService: BsModalService,
    private utilHelper: UtilHelper,
    private pnrService: PnrService,
    private PackageRemarkService: PackageRemarkService
  ) {}

  ngOnInit() {
    // this.rbcRedemption = this.pnrService.getAccountingRemarks();
    this.modalSubscribeOnClose();
    this.rbcRedemption = this.PackageRemarkService.getRbcPointsRemarksFromPnr();
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
    this.modalService.onHide.subscribe(result => {
      if (this.modalRef !== undefined && this.modalRef.content.isSubmitted) {
        if (!this.isAddNew) {
          const rbcNo = this.rbcRedemption.find(
            x => x.rbcNo === this.modalRef.content.rbcPoints.rbcNo
          );
          this.utilHelper.modelCopy(this.modalRef.content.rbcPoints, rbcNo);
        } else {
          this.rbcRedemption.push(this.modalRef.content.rbcPoints);
        }
        this.modalRef.content.isSubmitted = false;
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
    if (
      confirm('Are you sure you want to delete this RBC points redemption?')
    ) {
      this.rbcRedemption.splice(this.rbcRedemption.indexOf(r), 1);
      let i = 1;
      this.rbcRedemption.forEach(x => {
        x.rbcNo = i;
        i++;
      });
    }
  }
}
