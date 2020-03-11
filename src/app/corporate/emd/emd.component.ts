import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmdModel } from 'src/app/models/pnr/emd.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { MessageComponent } from 'src/app/shared/message/message.component';
import { MessageType } from 'src/app/shared/message/MessageType';
import { UpdateEmdComponent } from './update-emd/update-emd.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-emd',
  templateUrl: './emd.component.html',
  styleUrls: ['./emd.component.scss'],
  providers: [BsModalService]
})
export class EmdComponent implements OnInit, OnDestroy {

  emdList: EmdModel[] = [];
  modalRef: BsModalRef;
  isAddNew = false;
  emds: EmdModel;
  emdFormGroup: FormGroup;

  modalRefConfig = {
    backdrop: 'static',
    ignoreBackdropClick: false,
    class: 'modal-lg'
  };

  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.modalSubscribeOnClose();
  }

  ngOnDestroy() {
    this.emdList = [];
  }

  modalSubscribeOnClose() {
    this.modalService.onHide.subscribe(() => {
      if (this.modalRef.content.isSubmitted) {
        if (!this.isAddNew) {
          const cur = this.emdList.findIndex(
            x => x.id === this.modalRef.content.emdModel.id
          );
          if (cur >= 0) {
            this.emdList[cur] = this.modalRef.content.emdModel;
          }
        } else {
          const newEmd = this.modalRef.content.emdModel;
          this.emdList.push(newEmd);
        }
        this.modalRef.content.isSubmitted = false;
      }
      if (this.modalRef.content.response === 'YES') {
        const r = this.modalRef.content.paramValue;
        this.emdList.splice(this.emdList.indexOf(r), 1);
        let i = 1;
        this.emdList.forEach(x => {
          x.id = i;
          i++;
        });
        this.modalRef.content.response = '';
      }
    });
  }

  deleteItem(r: EmdModel) {
    this.modalRef = this.modalService.show(MessageComponent, {
      backdrop: 'static'
    });
    this.modalRef.content.modalRef = this.modalRef;
    this.modalRef.content.title = 'Delete?';
    this.modalRef.content.message =
      'Are you sure you want to delete this EMD?';
    this.modalRef.content.callerName = 'emds';
    this.modalRef.content.paramValue = r;
    this.modalRef.content.setMessageType(MessageType.YesNo);
  }

  updateItem(r: EmdModel) {
    this.isAddNew = false;
    this.modalRef = this.modalService.show(UpdateEmdComponent, {
      backdrop: 'static',
      class: 'modal-lg'
    });
    this.modalRef.content.title = 'Update EMD';
    this.modalRef.content.callerName = 'emds';
    const index = this.emdList.findIndex((x) => x.id === r.id);
    this.modalRef.content.emdModel = this.emdList[index];
    this.modalRef.content.loadValues();
  }

  addEmd() {
    this.isAddNew = true;
    const emds = new EmdModel();
    this.modalRef = this.modalService.show(UpdateEmdComponent, {
      backdrop: 'static',
      class: 'modal-lg'
    });
    this.modalRef.content.title = 'Add EMD';
    this.modalRef.content.callerName = 'emds';
    emds.id = this.emdList.length + 1;
    this.modalRef.content.emdModel = emds;
  }
}
