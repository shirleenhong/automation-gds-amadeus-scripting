import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ClientFeeItem } from 'src/app/models/ddb/client-fee-item.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AmountPipe } from 'src/app/pipes/amount.pipe';

@Component({
  selector: 'app-add-supplemental-fees',
  templateUrl: './add-supplemental-fees.component.html',
  styleUrls: ['./add-supplemental-fees.component.scss']
})
export class AddSupplementalFeesComponent implements OnInit {
  supplimentalFeeList = [];
  formGroup: FormGroup;
  feeControl: FormControl;
  amountPipe = new AmountPipe();
  title = '';

  constructor(private fb: FormBuilder, public modalRef: BsModalRef, public activeModal: BsModalService) {}
  ngOnInit() {
    this.formGroup = this.fb.group({
      fees: this.fb.array([this.createFormGroup(new ClientFeeItem(null))])
    });
  }

  setClientFees(feeList, feeControl: FormControl) {
    this.feeControl = feeControl;
    this.supplimentalFeeList = feeList;
    const formArray = [];
    this.supplimentalFeeList.forEach((fee) => {
      formArray.push(this.createFormGroup(fee));
    });

    this.formGroup = this.fb.group({
      fees: this.fb.array(formArray)
    });
  }

  createFormGroup(fee: ClientFeeItem) {
    let update = false;
    if (this.feeControl && this.feeControl.value) {
      const existingValue = this.feeControl.value.split('/');
      fee.selected = false;
      const matched = existingValue.filter((x: string) => x.includes(fee.outputFormat));
      if (matched.length > 0) {
        fee.selected = true;
        if (matched[0].length > 3) {
          fee.valueAmount = matched[0].replace(fee.outputFormat, '');
          update = true;
        }
      }
    }

    const group = this.fb.group({
      selected: new FormControl(fee.selected),
      code: new FormControl(fee.outputFormat),
      valueAmount: new FormControl(fee.valueAmount, [Validators.required]),
      description: new FormControl(fee.clientFeeDescription)
    });
    if (!update && fee.valueAmount > 0.01) {
      group.get('valueAmount').disable();
    } else {
      group.get('valueAmount').setValue('');
    }

    return group;
  }

  saveSupplementalFees() {
    const fees = (this.formGroup.get('fees') as FormArray).controls.filter((c) => c.get('selected').value === true);
    const values = [];
    fees.forEach((c) => {
      if (c.get('valueAmount').disabled) {
        values.push(c.get('code').value);
      } else {
        if (c.get('valueAmount').value > 0.01) {
          values.push(c.get('code').value + this.amountPipe.transform(c.get('valueAmount').value));
        } else {
          values.push(c.get('code').value);
        }
      }
    });
    this.feeControl.setValue(values.join('/'));
    this.modalRef.hide();
  }
}
