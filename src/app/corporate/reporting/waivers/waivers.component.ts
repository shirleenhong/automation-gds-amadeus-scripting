import { Component, OnInit } from '@angular/core';
import { PnrService } from 'src/app/service/pnr.service';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
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
    this.modalSubscribeOnClose();
    this.ticketedForm = this.fb.group({
      segments: this.fb.array([])
    });
  }

  async ngOnInit() {
    await this.loadData();
    this.ticketedForm = this.fb.group({
      segments: this.fb.array([])
    });

    this.ticketedSegments = await this.pnrService.getTstSegments();
    for (const segment of this.ticketedSegments) {
      const group = this.createFormGroup(segment);
      (this.ticketedForm.get('segments') as FormArray).push(group);
    }
  }

  getWaiverValue(segmentNo): string {
    let val: string;

    for (const element of this.pnrService.pnrObj.rmElements) {
      if (element.freeFlowText.includes('U63')) {
        const tatoo = this.pnrService.getTatooNumberFromSegmentNumber(segmentNo);
        if (tatoo.includes(element.fullNode.referenceForDataElement.reference.number)) {
          val = element.freeFlowText.split('U63/-')[1];
          return val;
        }
      }
    }
  }

  async loadData(): Promise<void> { }
  createFormGroup(segmentNo) {
    const val = this.getWaiverValue(segmentNo);
    return this.fb.group({
      segment: new FormControl(segmentNo),
      waiver: new FormControl(val)
    });
  }

  modalSubscribeOnClose() {
    this.modalService.onHide.subscribe(() => {
      if (this.selectedGroup) {
        this.waiverChange(this.selectedGroup);
      }
    });
  }

  waiverChange(group: FormGroup) {
    const waiver = group.get('waiver');
    if (group.get('code').value === '') {
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

  removeWaivers(item) {
    const waiver = item.controls.waiver.value;
    const arr = waiver.split('/');
    const len = arr.length;

    if (len === 3) {
      item.controls.waiver.setValue(arr[0] + '/' + arr[1]);
    } else if (len === 2) {
      item.controls.waiver.setValue(arr[0]);
    } else {
      item.controls.waiver.setValue('');
    }
  }

  addWaivers(group) {
    const waiver = group.get('waiver');
    if (waiver !== undefined) {
      const val = waiver.value;
      if (val !== null) {
        if (val.split('/').length === 3) {
        } else {
          this.modalRef = this.modalService.show(AddWaiverComponent, {
            backdrop: 'static'
          });
          this.modalRef.content.title = 'Add Waiver / Favor';
          this.modalRef.content.setWaiverItem(group.get('waiver'));
        }
      } else {
        this.modalRef = this.modalService.show(AddWaiverComponent, {
          backdrop: 'static'
        });
        this.modalRef.content.title = 'Add Waiver / Favor';
        this.modalRef.content.setWaiverItem(group.get('waiver'));
      }
    }
  }
}
