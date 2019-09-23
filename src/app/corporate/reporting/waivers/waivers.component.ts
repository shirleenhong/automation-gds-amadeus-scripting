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

    this.ticketedSegments = await this.pnrService.getTicketedSegments();
    for (const segment of this.ticketedSegments) {
      const group = this.createFormGroup(segment);
      (this.ticketedForm.get('segments') as FormArray).push(group);
    }
  }

  async loadData(): Promise<void> {}
  createFormGroup(segmentNo) {
    return this.fb.group({
      segment: new FormControl(segmentNo),
      waiver: new FormControl('')
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

  addWaivers(group) {
    const waiver = group.get('waiver');
    if (waiver !== undefined) {
      const val = waiver.value.toString();
      if (val.split('/').length === 3) {
        alert('Max number of waivers that can be added is 3');
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
