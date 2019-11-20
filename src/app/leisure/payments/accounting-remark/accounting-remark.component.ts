import { Component, OnInit, Input } from '@angular/core';
import { MatrixAccountingModel } from '../../../models/pnr/matrix-accounting.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UpdateAccountingRemarkComponent } from '../update-accounting-remark/update-accounting-remark.component';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';
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
  accountingRemarksToDelete: MatrixAccountingModel[] = [];
  modalRef: BsModalRef;
  accountingForm: FormGroup;
  isAd1SwgSupplier = false;
  showU76 = false;
  showU71 = false;
  showU75 = false;
  showU72 = false;
  showU73 = false;
  showU74 = false;
  showU77 = false;
  isAddNew = false;

  constructor(
    private modalService: BsModalService,
    private pnrService: PnrService,
    private fb: FormBuilder,
    private utilHelper: UtilHelper
  ) {}

  ngOnInit() {
    this.accountingRemarks = this.pnrService.getAccountingRemarks();

    this.accountingForm = this.fb.group(
      {
        airOnly: new FormControl(''),
        exclusiveProperty: new FormControl(''),
        propertyName: new FormControl(''),
        flightType: new FormControl(''),
        priceVsSupplier: new FormControl(''),
        group: new FormControl(''),
        preferredVendor: new FormControl('')
      },
      { updateOn: 'change' }
    );

    this.f.airOnly.valueChanges.subscribe((x) => {
      this.showU71 = this.showU76 && x === 'NO' && this.pnrService.getRemarkLineNumber('U71/-') === '';
      this.showU75 = this.showU76 && x === 'NO' && this.pnrService.getRemarkLineNumber('U75/-') === '';
      this.setControlValidator(this.f.exclusiveProperty, this.showU71);
      this.setControlValidator(this.f.propertyName, this.showU75);
    });
    this.checkSupplierCode();
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

            if (
              cur.accountingTypeRemark === 'NAE' &&
              cur.supplierCodeName !== 'ACY' &&
              acc.supplierCodeName === 'ACY' &&
              Number(acc.penaltyBaseAmount) > 0
            ) {
              this.accountingRemarks.push(this.getA22Account(acc));
            } else if (acc.supplierCodeName === 'ACY' && cur.supplierCodeName === 'ACY' && acc.accountingTypeRemark === 'NAE') {
              const a22 = this.accountingRemarks.find((x) => x.tkMacLine === acc.tkMacLine + 1);
              if (Number(acc.penaltyBaseAmount) > 0) {
                this.getA22Account(acc, a22);
              } else {
                const indx = this.accountingRemarks.indexOf(a22);
                if (indx >= 0) {
                  this.accountingRemarksToDelete.push(a22);
                  this.accountingRemarks.splice(indx, 1);
                }
              }
            }
            acc.status = 'UPDATED';
            this.utilHelper.modelCopy(acc, cur);
          } else {
            this.accountingRemarks.push(acc);
            if (acc.accountingTypeRemark === 'NAE' && acc.supplierCodeName === 'ACY' && Number(acc.penaltyBaseAmount) > 0) {
              this.accountingRemarks.push(this.getA22Account(acc));
            }
          }
          this.modalRef.content.isSubmitted = false;
          this.checkSupplierCode();
        }
        if (this.modalRef.content.callerName === 'Accounting' && this.modalRef.content.response === 'YES') {
          const r = this.modalRef.content.paramValue;
          this.accountingRemarksToDelete.push(r);
          this.accountingRemarks.splice(this.accountingRemarks.indexOf(r), 1);
          let i = 1;
          this.accountingRemarks.forEach((x) => {
            x.tkMacLine = i;
            i++;
          });
          this.checkSupplierCode();
          this.modalRef.content.response = '';
        }
      }
    });
  }

  getA22Account(acc, acc2?) {
    if (!acc2) {
      acc2 = new MatrixAccountingModel();
    }

    this.utilHelper.modelCopy(acc, acc2);
    acc2.tkMacLine = Number(acc.tkMacLine) + 1;
    acc2.supplierCodeName = 'A22';
    acc2.baseAmount = acc.penaltyBaseAmount;
    acc2.gst = acc.penaltyGst;
    acc2.hst = acc.penaltyHst;
    acc2.qst = acc.penaltyQst;
    acc2.otherTax = undefined;
    acc2.commisionWithoutTax = '0.00';
    return acc2;
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
    // prevent using the default
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
    this.modalRef.content.accountingRemark.originalTktLine = '';
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

  checkSupplierCode() {
    this.isAd1SwgSupplier = false;
    if (this.accountingRemarks.length > 0) {
      this.accountingRemarks.forEach((acc) => {
        if (acc.supplierCodeName === 'AD1' || acc.supplierCodeName === 'SWG') {
          this.isAd1SwgSupplier = true;
          this.showUdids();
        }
      });
    }
  }

  showUdids() {
    this.showU76 = this.pnrService.getRemarkLineNumber('U76/-') === '';
    this.showU72 = this.pnrService.getRemarkLineNumber('U72/-') === '';
    this.showU73 = this.pnrService.getRemarkLineNumber('U73/-') === '';
    this.showU74 = this.pnrService.getRemarkLineNumber('U74/-') === '';
    this.showU77 = this.pnrService.getRemarkLineNumber('U77/-') === '';

    this.setControlValidator(this.f.airOnly, this.showU76);
    this.setControlValidator(this.f.flightType, this.showU72);
    this.setControlValidator(this.f.priceVsSupplier, this.showU73);
    // this.setControlValidator(this.f.group, this.showU74);
    this.setControlValidator(this.f.preferredVendor, this.showU77);
  }

  setControlValidator(ctrl: AbstractControl, val: boolean) {
    if (val) {
      ctrl.setValidators(Validators.required);
    } else {
      ctrl.clearValidators();
    }
  }
}
