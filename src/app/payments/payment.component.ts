import { Component, Input, ViewChild } from '@angular/core';
import { LeisureFeeComponent } from './leisure-fee/leisure-fee.component';
import { MatrixReceiptComponent } from './matrix-receipt/matrix-receipt.component';
import { AccountingRemarkComponent } from './accounting-remark/accounting-remark.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  @ViewChild(LeisureFeeComponent) leisureFee: LeisureFeeComponent;
  @ViewChild(MatrixReceiptComponent) matrixReceipt: MatrixReceiptComponent;
  @ViewChild(AccountingRemarkComponent) accountingRemark: AccountingRemarkComponent;

  onEditReceipt() {

  }

  onAddReceipt() {

  }
}

