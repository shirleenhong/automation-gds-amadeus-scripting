import { MatrixReceiptModel } from './pnr/matrix-receipt.model';
import { MatrixAccountingModel } from './pnr/matrix-accounting.model';
import { LeisureFeeModel } from './pnr/leisure-fee.model';

export class PaymentViewModel {
    matrixReceipts: Array<MatrixReceiptModel>;
    accountingRemarks: Array<MatrixAccountingModel>;

    leisureFee: LeisureFeeModel;
    constructor() {
        this.matrixReceipts = new Array<MatrixReceiptModel>();
        this.accountingRemarks = new Array<MatrixAccountingModel>();

    }

}
