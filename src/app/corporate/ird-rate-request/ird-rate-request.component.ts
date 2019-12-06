import { Component, OnInit, ViewChild } from '@angular/core';
//import { UtilHelper } from '../../helper/util.helper';

import { ValidateModel } from 'src/app/models/validate-model';
import { IrdInvoiceRequestComponent } from './ird-invoice-request/ird-invoice-request.component';
import { UtilHelper } from '../../helper/util.helper';

@Component({
  selector: 'app-ird-rate-request',
  templateUrl: './ird-rate-request.component.html',
  styleUrls: ['./ird-rate-request.component.scss']
})
export class IrdRateRequestComponent implements OnInit {

  @ViewChild(IrdInvoiceRequestComponent) irdInvoiceRequestComponent: IrdInvoiceRequestComponent;
  validModel = new ValidateModel();
  constructor(private utilHelper: UtilHelper) {}

  ngOnInit() {}

  checkValid() {
    this.utilHelper.validateAllFields(this.irdInvoiceRequestComponent.irdRequestForm);
    if (!this.irdInvoiceRequestComponent.irdRequestForm.valid) {
      return false;
    }

    return true; 
  }
}
