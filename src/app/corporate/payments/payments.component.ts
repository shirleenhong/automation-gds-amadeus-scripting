import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountingRemarkComponent } from './accounting-remark/accounting-remark.component';
// import { UtilHelper } from '../../helper/util.helper';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  @ViewChild(AccountingRemarkComponent) accountingRemark: AccountingRemarkComponent;

  // constructor(private utilHelper: UtilHelper) { }
  constructor() { }

  ngOnInit() {
  }

  checkValid() {
    // this.utilHelper.validateAllFields(this.accountingRemark.accountingForm);
    // if (!this.accountingRemark.accountingForm.valid && !this.accountingRemark.accountingForm.disabled) {
    //   return false;
    // }

    return true;
  }

}
