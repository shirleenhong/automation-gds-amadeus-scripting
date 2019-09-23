import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AmountPipe } from 'src/app/pipes/amount.pipe';
import { PnrService } from 'src/app/service/pnr.service';

@Component({
  selector: 'app-add-waiver',
  templateUrl: './add-waiver.component.html',
  styleUrls: ['./add-waiver.component.scss']
})
export class AddWaiverComponent implements OnInit {
  formGroup: FormGroup;
  waiver: FormControl;
  amountText: FormControl;
  waiverControl: FormControl;
  amountPipe = new AmountPipe();
  waiverList = [];
  cnNumber: string;
  amount: string;
  showWaiverText: boolean;

  constructor(private fb: FormBuilder, public modalRef: BsModalRef, public activeModal: BsModalService, public pnrService: PnrService) {}
  ngOnInit() {
    this.waiverList = this.createWaiverCodeList();
    this.cnNumber = this.pnrService.getRemarkText('CN');
    this.amount = '50';
    this.showWaiverText = false;

    if (this.cnNumber !== undefined) {
      this.cnNumber = this.cnNumber.split('CN/-')[1];
    }
    this.formGroup = this.fb.group({
      waiver: new FormControl(''),
      cnNumber: new FormControl(''),
      amount: new FormControl('')
    });
  }

  setWaiverText(value) {
    if (value !== '') {
      if (value === 'AFM' || value === 'AMT' || value === 'HNS') {
        this.showWaiverText = true;
      } else {
        this.showWaiverText = false;
      }
    }
  }

  createWaiverCodeList() {
    return [
      { code: 'AFM', cnNumber: this.cnNumber, amount: '50' }, // this.amountText.value },
      { code: 'AMT', cnNumber: this.cnNumber, amount: '50' }, // this.amountText.value },
      { code: 'ANC', cnNumber: this.cnNumber, amount: '50' },
      { code: 'ASC', cnNumber: this.cnNumber, amount: '50' },
      { code: 'CSR', cnNumber: this.cnNumber, amount: '50' },
      { code: 'HSR', cnNumber: this.cnNumber, amount: '50' },
      { code: 'HNS', cnNumber: this.cnNumber, amount: '50' } // this.amountText.value },
    ];
  }

  setWaiverItem(waiverControl: FormControl) {
    this.waiverControl = waiverControl;
  }

  saveWaiverItem() {
    let currentString: string;
    currentString = this.waiverControl.value;

    if (currentString !== '') {
      this.waiverControl.setValue(currentString + '/' + this.formGroup.controls.waiver.value + this.cnNumber + this.amount);
    } else {
      this.waiverControl.setValue(this.formGroup.controls.waiver.value + this.cnNumber + this.amount);
    }
    this.modalRef.hide();
  }
}
