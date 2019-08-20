import { Injectable } from '@angular/core';
import { RemarksManagerService } from './remarks-manager.service';
import { MatrixAccountingModel } from 'src/app/models/pnr/matrix-accounting.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentRemarkService {

  constructor(private remarksManager: RemarksManagerService) { }

  writeAccountingReamrks(accountingRemarks: MatrixAccountingModel[]) {
    // tslint:disable-next-line:max-line-length
    this.writePassPurchase(accountingRemarks.filter((x) => x.accountingTypeRemark === 'ACPP' || x.accountingTypeRemark === 'WCPP' || x.accountingTypeRemark === 'PCPP'));
  }

  writePassPurchase(accountingRemarks: MatrixAccountingModel[]) {
    accountingRemarks.forEach((account) => {
      const paymentRemark = new Map<string, string>();
      paymentRemark.set('%PassName%', account.fareType);
      this.remarksManager.createPlaceholderValues(paymentRemark);
    });
  }
}


