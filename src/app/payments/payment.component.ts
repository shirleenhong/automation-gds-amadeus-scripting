import { Component, Input } from '@angular/core';
import { PaymentViewModel } from '../models/payment-view.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  @Input()
  paymentView: PaymentViewModel;

  onEditReceipt() {

  }

  onAddReceipt() {

  }
}

