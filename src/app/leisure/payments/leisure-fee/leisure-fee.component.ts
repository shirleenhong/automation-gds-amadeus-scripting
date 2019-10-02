import { Component, OnInit } from '@angular/core';
import { LeisureFeeModel } from 'src/app/models/pnr/leisure-fee.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { PnrService } from 'src/app/service/pnr.service';
import { UtilHelper } from 'src/app/helper/util.helper';
import { MessageComponent } from 'src/app/shared/message/message.component';
import { MessageType } from 'src/app/shared/message/MessageType';
import { UpdateLeisureFeeComponent } from '../update-leisure-fee/update-leisure-fee.component';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-leisure-fee',
  templateUrl: './leisure-fee.component.html',
  styleUrls: ['./leisure-fee.component.scss']
})
export class LeisureFeeComponent implements OnInit {
  leisureFeeList = new Array<LeisureFeeModel>();
  leisureFeesToDelete: LeisureFeeModel[] = [];
  modalRef: BsModalRef;
  isAddNew = false;
  showReasonFee = false;
  leisureFeeForm: FormGroup;
  disableAdd = false;
  exemption = [
    { label: 'HST Exempt', value: 'RC', checked: false, fln: '' },
    { label: 'GST Exempt', value: 'XG', checked: false, fln: '' },
    { label: 'QST Exempt', value: 'XQ', checked: false, fln: '' }
  ];

  constructor(
    private modalService: BsModalService,
    private pnrService: PnrService,
    private fb: FormBuilder,
    private utilHelper: UtilHelper
  ) { }

  ngOnInit(): void {
    this.modalSubscribeOnClose();
    this.leisureFeeForm = this.fb.group({
      noFeeReason: new FormControl('', [Validators.required])
    });
    this.leisureFeeList = this.pnrService.getSFCRemarks();
    this.loadExemption();
    this.checkReasonFee();
    this.leisureFeeForm.get('noFeeReason').setValue(this.pnrService.getRemarkText('U11/-').replace('U11/-', ''));
  }

  loadExemption() {
    const ex = this.pnrService.getRemarkText('TEX/');
    if (ex) {
      const arr = ex.split('/-');
      arr.forEach((x) => {
        // tslint:disable-next-line: no-shadowed-variable
        const e = this.exemption.find((e) => e.value === x);
        if (e) {
          e.checked = true;
          e.fln = '1';
        }
      });
    }
  }

  modalSubscribeOnClose() {
    this.modalService.onHide.subscribe(() => {
      if (this.modalRef !== undefined && this.modalRef.content !== undefined) {
        if (this.modalRef.content.isSubmitted) {
          if (!this.isAddNew) {
            const cur = this.leisureFeeList.find((x) => x.fln === this.modalRef.content.leisureFee.fln);
            this.modalRef.content.leisureFee.status = 'UPDATED';
            this.utilHelper.modelCopy(this.modalRef.content.leisureFee, cur);
          } else {
            this.leisureFeeList.push(this.modalRef.content.leisureFee);
          }
          this.modalRef.content.isSubmitted = false;
        }
        if (this.modalRef.content.callerName === 'leisureFee' && this.modalRef.content.response === 'YES') {
          const r = this.modalRef.content.paramValue;
          this.leisureFeesToDelete.push(r);
          this.leisureFeeList.splice(this.leisureFeeList.indexOf(r), 1);
          let i = 1;
          this.leisureFeeList.forEach((x) => {
            x.fln = i.toString();
            i++;
          });
          this.modalRef.content.response = '';
        }
      }
      this.checkReasonFee();
    });
  }

  deleteItem(r: LeisureFeeModel) {
    this.modalRef = this.modalService.show(MessageComponent, {
      backdrop: 'static'
    });
    this.modalRef.content.modalRef = this.modalRef;
    this.modalRef.content.title = 'Delete?';
    this.modalRef.content.message = 'Are you sure you want to delete this Leisure Fee?';
    this.modalRef.content.callerName = 'leisureFee';
    this.modalRef.content.paramValue = r;
    this.modalRef.content.setMessageType(MessageType.YesNo);
  }

  updateItem(r: LeisureFeeModel) {
    // r.status = 'UPDATED';
    this.isAddNew = false;

    this.modalRef = this.modalService.show(UpdateLeisureFeeComponent, {
      backdrop: 'static'
    });
    this.modalRef.content.title = 'Update Leisure Fee Collection';
    this.modalRef.content.leisureFee = new LeisureFeeModel();
    this.modalRef.content.leisureFee.status = 'UPDATED';
    this.modalRef.content.exemption = this.exemption;
    this.utilHelper.modelCopy(r, this.modalRef.content.leisureFee);
  }

  addLeisureFee() {
    this.isAddNew = true;
    const leisureFee = new LeisureFeeModel();
    leisureFee.status = 'ADDED';

    if (this.leisureFeeList.length > 0) {
      this.utilHelper.modelCopy(this.leisureFeeList[0], leisureFee);
      leisureFee.amount = undefined;
      leisureFee.paymentType = '';
      leisureFee.vendorCode = '';
      leisureFee.ccNo = '';
      leisureFee.expDate = undefined;
    }

    leisureFee.fln = (this.leisureFeeList.length + 1).toString();
    this.modalRef = this.modalService.show(UpdateLeisureFeeComponent, {
      backdrop: 'static'
    });

    if (this.leisureFeeList.length > 0) {
      const ccs = [];
      this.leisureFeeList.forEach((x) => {
        if (x.ccNo !== undefined && x.ccNo !== '') {
          ccs.push(x.ccNo);
        }
      });
      this.modalRef.content.setPreviousCCno(ccs);
    }
    this.modalRef.content.title = 'Add Leisure Fee Collection';
    this.modalRef.content.exemption = this.exemption;
    this.modalRef.content.leisureFee = leisureFee;
    // this.modalRef.content.withcheque = ((this.leisureFeeList.findIndex((x) => x.paymentType === 'K')) < 0);
  }

  public getAssocInfo(assoc) {
    const assoclist = ['', 'Ticket', 'Tour/Cruise', 'Hotel', 'Car'];
    return assoclist[Number(assoc)];
  }

  checkReasonFee() {
    const cfa = this.pnrService.getCFLine();
    if (cfa) {
      if (cfa.cfa === 'RBM' || cfa.cfa === 'RBP' || this.leisureFeeList.length > 0) {
        this.showReasonFee = false;
        this.leisureFeeForm.get('noFeeReason').setValue('');
        this.leisureFeeForm.get('noFeeReason').disable();
      } else {
        this.showReasonFee = true;
        this.leisureFeeForm.get('noFeeReason').enable();
      }
    }
    const exempts = this.exemption.find((x) => x.checked === true);
    if (exempts) {
      this.disableAdd = true;
    } else {
      this.disableAdd = false;
    }
  }
}
