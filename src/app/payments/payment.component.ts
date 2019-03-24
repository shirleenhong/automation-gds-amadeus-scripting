import { Component, Input, ViewChild } from '@angular/core';
import { PaymentViewModel } from '../models/payment-view.model';
import { LeisureFeeComponent } from './leisure-fee/leisure-fee.component';
import { MatrixReceiptComponent } from './matrix-receipt/matrix-receipt.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  @Input()
  paymentView: PaymentViewModel;
  @ViewChild(LeisureFeeComponent) liesureFee: LeisureFeeComponent;
  @ViewChild(MatrixReceiptComponent) matrixReceipt: MatrixReceiptComponent;


  onEditReceipt() {

  }

  onAddReceipt() {

  }
}

