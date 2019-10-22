import { Component, ViewChild } from '@angular/core';
import { LeisureFeeComponent } from './leisure-fee/leisure-fee.component';
import { MatrixReceiptComponent } from './matrix-receipt/matrix-receipt.component';
import { AccountingRemarkComponent } from './accounting-remark/accounting-remark.component';
import { UtilHelper } from '../../helper/util.helper';
import { BspTicketFopComponent } from './bsp-ticket-fop/bsp-ticket-fop.component';
import { PnrService } from 'src/app/service/pnr.service';

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
  @ViewChild(BspTicketFopComponent) bspTicketFop: BspTicketFopComponent;

  bspTicketFopValid = false;
  constructor(private utilHelper: UtilHelper, private pnrService: PnrService) {
    this.isBspTicketFop();
  }

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

    if (this.bspTicketFop) {
      this.utilHelper.validateAllFields(this.bspTicketFop.bspTicketFopForm);
      if (!this.bspTicketFop.bspTicketFopForm.valid) {
        return false;
      }
    }

    return true;
  }

  checkEncryptedCreditCard() {
    const encruyptedList = [];
    const accs = this.checkEnryptedAccounting();
    if (accs !== null) {
      encruyptedList.push(accs);
    }
    const matrix = this.checkEncryptedMatrixReceipt();
    if (matrix !== null) {
      encruyptedList.push(matrix);
    }
    const fees = this.checkEncryptedLeisureFeeReceipt();
    if (fees !== null) {
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
    if ((updated || this.accountingRemark.accountingRemarksToDelete.length > 0) && accs.length > 0) {
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
    if ((updated || this.matrixReceipt.matrixReceiptsToDelete.length > 0) && receipts.length > 0) {
      return 'Matrix Receipt #: ' + receipts.join(',');
    }
    return null;
  }

  checkEncryptedLeisureFeeReceipt() {
    const fees = this.leisureFee.leisureFeeList
      .filter((x) => x.ccNo && x.ccNo.startsWith('XXX') && x.paymentType === 'C')
      .map((x) => {
        return x.fln;
      });
    const updated = this.leisureFee.leisureFeeList.filter((x) => x.status === 'UPDATED').length > 0;
    if ((updated || this.leisureFee.leisureFeesToDelete.length > 0) && fees.length > 0) {
      return 'Leisure Fee #: ' + fees.join(',');
    }
    return null;
  }

  private isBspTicketFop(): void {
    const segment = this.pnrService.getSegmentList();
    const look = segment.find(
      (x) =>
        x.segmentType === 'AIR' &&
        (x.airlineCode === 'AC' || x.airlineCode === 'WS' || x.airlineCode === 'PD') &&
        (x.status === 'DK' || x.status === 'HK')
    );
    const unticketedTst = this.pnrService.getUnticketedTst();
    if (look && unticketedTst) {
      this.bspTicketFopValid = true;
      // this.bspTicketFop.bspTicketFopForm.disable();
    } else {
      this.bspTicketFopValid = false;
    }
  }
}
