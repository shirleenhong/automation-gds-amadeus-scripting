import { Component, Input, ViewChild } from '@angular/core';
import { LeisureFeeComponent } from './leisure-fee/leisure-fee.component';
import { MatrixReceiptComponent } from './matrix-receipt/matrix-receipt.component';
import { AccountingRemarkComponent } from './accounting-remark/accounting-remark.component';
import { UtilHelper } from '../helper/util.helper';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  @ViewChild(LeisureFeeComponent) leisureFee: LeisureFeeComponent;
  @ViewChild(MatrixReceiptComponent) matrixReceipt: MatrixReceiptComponent;
  @ViewChild(AccountingRemarkComponent) accountingRemark: AccountingRemarkComponent;

  constructor(private utilHelper: UtilHelper) {

  }

  onEditReceipt() {

  }

  onAddReceipt() {

  }

  checkValid() {
    this.utilHelper.validateAllFields(this.leisureFee.leisureFeeForm);
    if (!this.leisureFee.leisureFeeForm.valid && !this.leisureFee.leisureFeeForm.disabled) {
      return false;
    }

    this.utilHelper.validateAllFields(this.accountingRemark.accountingForm);
    if (!this.accountingRemark.accountingForm.valid) {
      return false;
    }
    return true;
  }

}

