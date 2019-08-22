import { Component, OnInit, Input } from '@angular/core';
import { MatrixAccountingModel } from '../../../models/pnr/matrix-accounting.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UpdateAccountingRemarkComponent } from '../update-accounting-remark/update-accounting-remark.component';
import { FormGroup, Validators, AbstractControl } from '@angular/forms';
import { PnrService } from 'src/app/service/pnr.service';
import { UtilHelper } from 'src/app/helper/util.helper';
import { MessageComponent } from 'src/app/shared/message/message.component';
import { MessageType } from 'src/app/shared/message/MessageType';


@Component({
  selector: 'app-accounting-remark',
  templateUrl: './accounting-remark.component.html',
  styleUrls: ['./accounting-remark.component.scss']
})
export class AccountingRemarkComponent implements OnInit {

  @Input()
  accountingRemarks = new Array<MatrixAccountingModel>();
  modalRef: BsModalRef;
  accountingForm: FormGroup;
  isAddNew = false;

  constructor(
    private modalService: BsModalService,
    private pnrService: PnrService,
    private utilHelper: UtilHelper
  ) { }

  ngOnInit() {
    this.accountingRemarks = this.pnrService.getAccountingRemarks();
    this.modalSubscribeOnClose();
  }

  deleteItem(r: MatrixAccountingModel) {
    this.modalRef = this.modalService.show(MessageComponent, {
      backdrop: 'static'
    });
    this.modalRef.content.modalRef = this.modalRef;
    this.modalRef.content.title = 'Delete?';
    this.modalRef.content.message = 'Are you sure you want to delete this Accounting Remark?';
    this.modalRef.content.callerName = 'Accounting';
    this.modalRef.content.response = '';
    this.modalRef.content.paramValue = r;
    this.modalRef.content.setMessageType(MessageType.YesNo);
  }

  modalSubscribeOnClose() {
    this.modalService.onHide.subscribe(() => {
      if (this.modalRef !== undefined && this.modalRef.content !== undefined) {
        if (this.modalRef.content.isSubmitted) {
          // new/Updated
          const acc = this.modalRef.content.accountingRemark;
          if (!this.isAddNew) {
            const cur = this.accountingRemarks.find((x) => x.tkMacLine === acc.tkMacLine);
            acc.status = 'UPDATED';
            this.utilHelper.modelCopy(acc, cur);
          } else {
            this.accountingRemarks.push(acc);
          }
          this.modalRef.content.isSubmitted = false;
        }
        if (this.modalRef.content.callerName === 'Accounting' && this.modalRef.content.response === 'YES') {
          const r = this.modalRef.content.paramValue;
          this.accountingRemarks.splice(this.accountingRemarks.indexOf(r), 1);
          let i = 1;
          this.accountingRemarks.forEach((x) => {
            x.tkMacLine = i;
            i++;
          });
          this.modalRef.content.response = '';
        }
      }
    });
  }


  updateItem(r: MatrixAccountingModel) {
    // r.status = 'UPDATED';
    this.isAddNew = false;
    this.modalRef = this.modalService.show(UpdateAccountingRemarkComponent, {
      backdrop: 'static'
    });
    this.modalRef.content.title = 'Update Accounting Remarks';
    this.modalRef.content.accountingRemark = new MatrixAccountingModel();
    this.utilHelper.modelCopy(r, this.modalRef.content.accountingRemark);
    const code = r.supplierCodeName;
    this.modalRef.content.isAddNew = false;
    this.modalRef.content.onChangeAccountingType(r.accountingTypeRemark);
    r.supplierCodeName = code;
    this.modalRef.content.FormOfPaymentChange(r.fop);
    this.modalRef.content.loadData();
  }

  copyItem(r: MatrixAccountingModel) {
    this.isAddNew = true;
    this.modalRef = this.modalService.show(UpdateAccountingRemarkComponent, {
      backdrop: 'static'
    });
    this.modalRef.content.title = 'Copy Accounting Remarks';
    this.modalRef.content.accountingRemark = new MatrixAccountingModel();
    this.utilHelper.modelCopy(r, this.modalRef.content.accountingRemark);
    const code = r.supplierCodeName;
    this.modalRef.content.isAddNew = false;
    this.modalRef.content.isCopy = true;
    this.modalRef.content.accountingRemark.supplierCodeName = code;
    this.modalRef.content.accountingRemark.tkMacLine = this.accountingRemarks.length + 1;
    this.modalRef.content.accountingRemark.status = 'ADDED';
    this.modalRef.content.onChangeAccountingType(r.accountingTypeRemark);
    this.modalRef.content.FormOfPaymentChange(r.fop);
    this.modalRef.content.loadData();
  }

  get f() {
    return this.accountingForm.controls;
  }

  addAccountingRemarks() {
    const accountingRemark = new MatrixAccountingModel();
    accountingRemark.status = 'ADDED';
    this.modalRef = this.modalService.show(UpdateAccountingRemarkComponent, {
      backdrop: 'static'
    });
    this.modalRef.content.title = 'Add Accounting Remarks';
    accountingRemark.tkMacLine = this.accountingRemarks.length + 1;
    this.modalRef.content.isAddNew = true;
    this.modalRef.content.accountingRemark = accountingRemark;
    this.isAddNew = true;
    this.modalSubscribeOnClose();
  }

  setControlValidator(ctrl: AbstractControl, val: boolean) {
    if (val) {
      ctrl.setValidators(Validators.required);
    } else {
      ctrl.clearValidators();
    }
  }
}
