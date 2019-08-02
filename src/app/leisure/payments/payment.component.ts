import { Component, ViewChild } from '@angular/core';
import { LeisureFeeComponent } from './leisure-fee/leisure-fee.component';
import { MatrixReceiptComponent } from './matrix-receipt/matrix-receipt.component';
import { AccountingRemarkComponent } from './accounting-remark/accounting-remark.component';
import { UtilHelper } from '../../helper/util.helper';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  @ViewChild(LeisureFeeComponent) leisureFee: LeisureFeeComponent;
  @ViewChild(MatrixReceiptComponent) matrixReceipt: MatrixReceiptComponent;
  @ViewChild(AccountingRemarkComponent)
  accountingRemark: AccountingRemarkComponent;

  constructor(private utilHelper: UtilHelper) {}

  onEditReceipt() {}

  onAddReceipt() {}

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

  checkEncryptedCreditCard() {
    const encruyptedList = [];
    encruyptedList.push('');
    const accs = this.checkEnryptedAccounting();
    if (accs !== undefined) {
      encruyptedList.push(accs);
    }
    const matrix = this.checkEncryptedMatrixReceipt();
    if (matrix !== undefined) {
      encruyptedList.push(matrix);
    }
    const fees = this.checkEncryptedLeisureFeeReceipt();
    if (fees !== undefined) {
      encruyptedList.push(fees);
    }
    return encruyptedList;
  }

  checkEnryptedAccounting() {
    const accs = this.accountingRemark.accountingRemarks
      .filter((x) => x.cardNumber && x.cardNumber.startsWith('XXX') && ['CC', 'AP'].indexOf(x.fop) >= 0)
      .map((x) => {
        return x.tkMacLine;
      });
    const updated = this.accountingRemark.accountingRemarks.filter((x) => x.status === 'UPDATED').length > 0;
    if (updated && accs.length > 0) {
      return 'Accounting Remarks #: ' + accs.join(',');
    }
    return null;
  }

  checkEncryptedMatrixReceipt() {
    const receipts = this.matrixReceipt.matrixReceipts
      .filter((x) => x.ccNo && x.ccNo.startsWith('XXX'))
      .map((x) => {
        return x.rln;
      });
    const updated = this.matrixReceipt.matrixReceipts.filter((x) => x.status === 'UPDATED').length > 0;
    if (updated && receipts.length > 0) {
      return 'Matrix Receipt #: ' + receipts.join(',');
    }
  }

  checkEncryptedLeisureFeeReceipt() {
    const fees = this.leisureFee.leisureFeeList
      .filter((x) => x.ccNo && x.ccNo.startsWith('XXX') && x.paymentType === 'C')
      .map((x) => {
        return x.fln;
      });
    const updated = this.leisureFee.leisureFeeList.filter((x) => x.status === 'UPDATED').length > 0;
    if (updated && fees.length > 0) {
      return 'Leisure Fee #: ' + fees.join(',');
    }
  }
}
