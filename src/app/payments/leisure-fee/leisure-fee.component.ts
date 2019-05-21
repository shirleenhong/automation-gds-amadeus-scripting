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
  modalRef: BsModalRef;
  isAddNew = false;
  showReasonFee = false;
  leisureFeeForm: FormGroup;

  constructor(private modalService: BsModalService,
    private pnrService: PnrService,
    private fb: FormBuilder,
    private utilHelper: UtilHelper) { }
  ngOnInit(): void {
    this.modalSubscribeOnClose();
    this.leisureFeeForm = this.fb.group({
      noFeeReason: new FormControl('', [Validators.required])
    });
    this.checkReasonFee();
  }

  modalSubscribeOnClose() {
    this.modalService.onHide.subscribe(result => {
      if (this.modalRef !== undefined && this.modalRef.content !== undefined) {
        if (this.modalRef.content.isSubmitted) {
          if (!this.isAddNew) {
            const cur = this.leisureFeeList.find(x => x.fln === this.modalRef.content.leisureFee.fln);
            this.utilHelper.modelCopy(this.modalRef.content.leisureFee, cur);
          } else {
            this.leisureFeeList.push(this.modalRef.content.leisureFee);
          }
          this.modalRef.content.isSubmitted = false;
        }
        if (this.modalRef.content.callerName === 'leisureFee' && this.modalRef.content.response === 'YES') {
          const r = this.modalRef.content.paramValue;
          this.leisureFeeList.splice(this.leisureFeeList.indexOf(r), 1);
          let i = 1;
          this.leisureFeeList.forEach(x => {
            x.fln = i;
            i++;
          });
          this.modalRef.content.response = '';
        }
      }
      this.checkReasonFee();
    });
  }


  deleteItem(r: LeisureFeeModel) {
    this.modalRef = this.modalService.show(MessageComponent, { backdrop: 'static' });
    this.modalRef.content.modalRef = this.modalRef;
    this.modalRef.content.title = 'Delete?';
    this.modalRef.content.message = 'Are you sure you want to delete this Leisure Fee?';
    this.modalRef.content.callerName = 'leisureFee';
    this.modalRef.content.paramValue = r;
    this.modalRef.content.setMessageType(MessageType.YesNo);
  }


  updateItem(r: LeisureFeeModel) {
    this.isAddNew = false;
    this.modalRef = this.modalService.show(UpdateLeisureFeeComponent, { backdrop: 'static' });
    this.modalRef.content.title = 'Update Leisure Fee Collection';
    this.modalRef.content.leisureFee = new LeisureFeeModel();
    this.utilHelper.modelCopy(r, this.modalRef.content.leisureFee);

  }




  addLeisureFee() {
    this.isAddNew = true;
    const leisureFee = new LeisureFeeModel();
    leisureFee.fln = (this.leisureFeeList.length + 1);
    this.modalRef = this.modalService.show(UpdateLeisureFeeComponent, { backdrop: 'static' });
    this.modalRef.content.title = 'Add Leisure Fee Collection';
    this.modalRef.content.leisureFee = leisureFee;
  }

  public getAssocInfo(assoc) {
    const assoclist = ['', 'Ticket', 'Tour/Cruise', 'Hotel', 'Car'];
    return assoclist[Number(assoc)];
  }

  checkReasonFee() {
    const cfa = this.pnrService.getCFLine();
    if (cfa.cfa === 'RBM' || cfa.cfa === 'RBP' || this.leisureFeeList.length > 0) {
      this.showReasonFee = false;
      this.leisureFeeForm.get('noFeeReason').setValue('');
      this.leisureFeeForm.get('noFeeReason').disable();
    } else {
      this.showReasonFee = true;
      this.leisureFeeForm.get('noFeeReason').enable();
    }
  }


}
