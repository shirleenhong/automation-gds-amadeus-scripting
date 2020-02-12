import { Component, OnInit } from '@angular/core';
import { PnrService } from 'src/app/service/pnr.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AddWaiverComponent } from 'src/app/corporate/reporting/waivers/add-waiver/add-waiver.component';

@Component({
  selector: 'app-waivers',
  templateUrl: './waivers.component.html',
  styleUrls: ['./waivers.component.scss']
})
export class WaiversComponent implements OnInit {
  ticketedSegments = [];
  ticketedForm: FormGroup;
  modalRef: BsModalRef;
  selectedGroup: FormGroup;

  constructor(private pnrService: PnrService, private fb: FormBuilder, private modalService: BsModalService) {
    this.ticketedForm = this.fb.group({
      waiver: new FormControl()
    });
  }

  async ngOnInit() {
  }

  getWaiverValue(): string {
    let val: string;

    for (const element of this.pnrService.pnrObj.rmElements) {
      if (element.freeFlowText.includes('U63')) {
        val = element.freeFlowText.split('U63/-')[1];
        return val;
      }
    }
  }


  modalSubscribeOnClose() {
    this.modalService.onHide.subscribe(() => {
      this.waiverChange();
    });
  }

  waiverChange() {
    const waiver = this.ticketedForm.get('waiver');
    if (this.ticketedForm.get('code').value === '') {
      waiver.setValidators([Validators.required]);
    } else {
      waiver.setValidators(null);
      waiver.setValue('');
    }
  }

  check(item): boolean {
    const waiver = item.controls.waiver.value;
    if (waiver !== null) {
      if (waiver.split('/').length === 3) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  checkRemove(item): boolean {
    const waiver = item.controls.waiver.value;
    if (waiver === null || waiver === '') {
      return false;
    } else {
      return true;
    }
  }

  removeWaivers() {
    const waiver = this.ticketedForm.get('waiver').value;
    const arr = waiver.split('/');
    const len = arr.length;

    if (len === 3) {
      this.ticketedForm.get('waiver').setValue(arr[0] + '/' + arr[1]);
    } else if (len === 2) {
      this.ticketedForm.get('waiver').setValue(arr[0]);
    } else {
      this.ticketedForm.get('waiver').setValue('');
    }
  }

  addWaivers() {
    const waiver = this.ticketedForm.get('waiver');
    if (waiver !== undefined) {
      const val = waiver.value;
      if (val !== null) {
        if (val.split('/').length === 3) {
        } else {
          this.modalRef = this.modalService.show(AddWaiverComponent, {
            backdrop: 'static'
          });
          this.modalRef.content.title = 'Add Waiver / Favor';
          this.modalRef.content.setWaiverItem(this.ticketedForm.get('waiver'));
        }
      } else {
        this.modalRef = this.modalService.show(AddWaiverComponent, {
          backdrop: 'static'
        });
        this.modalRef.content.title = 'Add Waiver / Favor';
        this.modalRef.content.setWaiverItem(this.ticketedForm.get('waiver'));
      }
    }
  }
}
