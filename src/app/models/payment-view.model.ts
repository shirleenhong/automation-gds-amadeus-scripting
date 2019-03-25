import { MatrixReceiptModel } from './pnr/matrix-receipt.model';
import { LeisureFeeModel } from './pnr/leisure-fee.model';

export class PaymentViewModel {
    matrixReceipts: Array<MatrixReceiptModel>;
    leisureFee: LeisureFeeModel;
    constructor() {
        this.matrixReceipts = new Array<MatrixReceiptModel>();

    }

}
