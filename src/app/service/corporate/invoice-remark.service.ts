import { Injectable } from '@angular/core';
import { RemarksManagerService } from './remarks-manager.service';
import { MatrixReportingComponent } from 'src/app/corporate/reporting/matrix-reporting/matrix-reporting.component';

@Injectable({
  providedIn: 'root'
})
export class InvoiceRemarkService {
  constructor(private remarksManager: RemarksManagerService) {}

  WriteInvoiceRemark(mrc: MatrixReportingComponent) {
    if (mrc.isMatrixPnr) {
      const backOfficeIdentifier = new Map<string, string>();
      const staticRemarksCondition = new Map<string, string>();

      backOfficeIdentifier.set('BackOfficeAgentIdentifier', mrc.invoiceMessageForm.get('cicNumber').value);
      this.remarksManager.createPlaceholderValues(backOfficeIdentifier);

      staticRemarksCondition.set('IsNuc', 'true');
      this.remarksManager.createPlaceholderValues(null, staticRemarksCondition, null, null, 'NUC');
    }
  }
}
