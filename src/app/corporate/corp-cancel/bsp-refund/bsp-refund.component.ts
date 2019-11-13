import { Component, OnInit, Input } from '@angular/core';
import { PnrService } from 'src/app/service/pnr.service';
import { UtilHelper } from 'src/app/helper/util.helper';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-bsp-refund',
  templateUrl: './bsp-refund.component.html',
  styleUrls: ['./bsp-refund.component.scss']
})
export class BspRefundComponent implements OnInit {
  constructor(private pnrService: PnrService, private fb: FormBuilder, private util: UtilHelper) {}
  @Input()
  refundType = '';
  refundForm: FormGroup;

  ngOnInit() {
    this.refundForm = this.fb.group({
      officeId: new FormControl(this.pnrService.extractOidFromBookRemark(), [Validators.required]),
      tickets: this.fb.array(this.getTicketFormArray()),
      partialFull: new FormControl('full', [Validators.required]),
      invoice: new FormControl(''),
      supplier: new FormControl('', [Validators.required]),
      refundAmount: new FormControl('', this.refundType === 'full' ? [Validators.required] : []),
      baseAmount: new FormControl('', [Validators.required]),
      tax: new FormControl('', [Validators.required]),
      gst: new FormControl('', [Validators.required]),
      commission: new FormControl('', [Validators.required]),
      freeFlow1: new FormControl(''),
      freeFlow2: new FormControl('')
    });

    this.enableDisablePartialRefund(false);
    this.refundForm.get('partialFull').valueChanges.subscribe(() => {
      this.enableDisablePartialRefund(this.refundForm.get('partialFull').value !== 'full');
    });
  }

  getTicketFormArray() {
    const frmArray = [];
    this.pnrService.getTicketedNumbers().forEach((ticketNum) => {
      const frm = this.fb.group({
        checked: new FormControl(''),
        ticketNum: new FormControl(ticketNum),
        coupon: new FormControl('', [Validators.required])
      });
      frm.get('coupon').disable();
      frm.get('checked').valueChanges.subscribe((checked) => {
        if (checked) {
          frm.get('coupon').enable();
        } else {
          frm.get('coupon').disable();
        }
      });
      frmArray.push(frm);
    });
    return frmArray;
  }

  enableDisablePartialRefund(enable: boolean) {
    const controls = ['baseAmount', 'tax', 'gst'];
    this.util.enableDisableControls(this.refundForm, controls, enable);
  }
}
