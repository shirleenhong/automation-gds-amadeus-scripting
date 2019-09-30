import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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
  lblWaiver: string;
  waiverText: FormControl;
  title = '';

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
      amount: new FormControl(''),
      waiverText: new FormControl('', [Validators.maxLength(4), Validators.pattern('[0-9]{4}')])
    });
  }

  setWaiverText(value) {
    if (value !== '') {
      if (value === 'AFM' || value === 'AMT' || value === 'HNS') {
        this.showWaiverText = true;
        if (value === 'AFM') {
          this.lblWaiver = 'Fare Match:';
        }
        if (value === 'AMT') {
          this.lblWaiver = 'Client Missed Ticketing / Waive Advance Purch / Waive Penalty:';
        }
        if (value === 'HNS') {
          this.lblWaiver = 'Waived No-Show Charge:';
        }
      } else {
        this.showWaiverText = false;
      }
    }
  }

  createWaiverCodeList() {
    return [
      { display: 'AFM - Fair Match', code: 'AFM', cnNumber: this.cnNumber, amount: '' }, // this.amountText.value },
      { display: 'AMT - Client Missed Ticketing', code: 'AMT', cnNumber: this.cnNumber, amount: '' }, // this.amountText.value },
      { display: 'ANC/50 - Name Change', code: 'ANC', cnNumber: this.cnNumber, amount: '50' },
      { display: 'ASC/50 - Seat / Waitlist Change', code: 'ASC', cnNumber: this.cnNumber, amount: '50' },
      { display: 'CSR/50 - Car Certificate Usage ', code: 'CSR', cnNumber: this.cnNumber, amount: '50' },
      { display: 'HSR/50 - Hotel Certificate Usage', code: 'HSR', cnNumber: this.cnNumber, amount: '50' },
      { display: 'HNS - Waived No Show Charge', code: 'HNS', cnNumber: this.cnNumber, amount: '' } // this.amountText.value },
    ];
  }

  setWaiverItem(waiverControl: FormControl) {
    this.waiverControl = waiverControl;
  }

  saveWaiverItem() {
    let currentString: string;
    currentString = this.waiverControl.value;
    if (currentString !== null && currentString !== '') {
      switch (this.formGroup.controls.waiver.value) {
        case 'ANC':
        case 'ASC':
        case 'CSR':
        case 'HSR': {
          if (!this.formGroup.controls.waiver.value !== null) {
            this.waiverControl.setValue(currentString + '/' + this.formGroup.controls.waiver.value + this.cnNumber + '50');
          }

          break;
        }
        default: {
          if (!this.formGroup.controls.waiver.value !== null && this.formGroup.controls.waiverText.value !== '') {
            this.waiverControl.setValue(
              currentString + '/' + this.formGroup.controls.waiver.value + this.cnNumber + this.formGroup.controls.waiverText.value
            );
          }
          break;
        }
      }
    } else {
      switch (this.formGroup.controls.waiver.value) {
        case 'ANC':
        case 'ASC':
        case 'CSR':
        case 'HSR': {
          if (!this.formGroup.controls.waiver.value !== null) {
            this.waiverControl.setValue(this.formGroup.controls.waiver.value + this.cnNumber + '50');
          }
          break;
        }
        default: {
          if (!this.formGroup.controls.waiver.value !== null && this.formGroup.controls.waiverText.value !== '') {
            this.waiverControl.setValue(this.formGroup.controls.waiver.value + this.cnNumber + this.formGroup.controls.waiverText.value);
          }
          break;
        }
      }
    }
    this.modalRef.hide();
  }
}
