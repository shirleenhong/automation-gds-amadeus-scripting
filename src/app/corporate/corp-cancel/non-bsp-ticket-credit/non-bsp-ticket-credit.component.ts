import { Component, OnInit } from '@angular/core';
import { PnrService } from 'src/app/service/pnr.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UtilHelper } from 'src/app/helper/util.helper';

@Component({
  selector: 'app-non-bsp-ticket-credit',
  templateUrl: './non-bsp-ticket-credit.component.html',
  styleUrls: ['./non-bsp-ticket-credit.component.scss']
})
export class NonBspTicketCreditComponent implements OnInit {
  constructor(private pnrService: PnrService, private fb: FormBuilder, private util: UtilHelper) {}

  nonBspForm: FormGroup;

  ngOnInit() {
    const hasU14 = this.hasU14();
    this.nonBspForm = this.fb.group({
      officeId: new FormControl(this.pnrService.extractOidFromBookRemark(), [Validators.required]),
      ticketNum: new FormControl(''),
      isReCredit: new FormControl('Y'),
      partialFull: new FormControl('full', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      vendor: new FormControl('', [Validators.required]),
      baseAmount: new FormControl('', [Validators.required]),
      gst: new FormControl('', [Validators.required]),
      tax: new FormControl('', [Validators.required]),
      commission: new FormControl('', [Validators.required]),
      freeFlow1: new FormControl(''),
      freeFlow2: new FormControl(''),
      hasU14: new FormControl(hasU14)
    });
    if (!hasU14) {
      this.nonBspForm.clearValidators();
      this.nonBspForm.get('ticketNum').setValidators([Validators.required]);
    }

    this.nonBspForm.get('isReCredit').valueChanges.subscribe(() => {
      this.enableRecredit(this.nonBspForm.get('isReCredit').value === 'N');
    });
    this.nonBspForm.get('partialFull').valueChanges.subscribe(() => {
      this.enableFullRecredit(this.nonBspForm.get('partialFull').value !== 'full');
    });

    this.enableRecredit(hasU14 && this.nonBspForm.get('isReCredit').value === 'N');
  }

  enableRecredit(enable) {
    this.util.enableDisableControls(this.nonBspForm, ['partialFull', 'vendor', 'lastName', 'firstName'], enable);
    this.enableFullRecredit(this.nonBspForm.get('partialFull').value !== 'full');
  }

  enableFullRecredit(enable: boolean) {
    const controls = ['baseAmount', 'tax', 'gst', 'commission'];
    this.util.enableDisableControls(this.nonBspForm, controls, enable);
  }

  hasU14() {
    return this.pnrService.getRemarkText('U14/-') !== '';
  }
}
