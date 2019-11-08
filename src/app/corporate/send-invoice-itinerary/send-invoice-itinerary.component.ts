import { Component, OnInit, ViewChild } from '@angular/core';
import { ResendInvoiceComponent } from './resend-invoice/resend-invoice.component';
import { UtilHelper } from 'src/app/helper/util.helper';

@Component({
  selector: 'app-send-invoice-itinerary',
  templateUrl: './send-invoice-itinerary.component.html',
  styleUrls: ['./send-invoice-itinerary.component.scss']
})
export class SendInvoiceItineraryComponent implements OnInit {

  constructor(private utilHelper: UtilHelper) { }
  @ViewChild(ResendInvoiceComponent) resendInvoiceComponent: ResendInvoiceComponent;
  ngOnInit() {
  }
  checkValid() {
    this.utilHelper.validateAllFields(this.resendInvoiceComponent.invoiceFormGroup);
    if (!this.resendInvoiceComponent.invoiceFormGroup.valid) {
      return false;
    }
    return true;
  }

}
