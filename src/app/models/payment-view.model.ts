import { MatrixReceiptModel } from './pnr/matrix-receipt.model';

export class PaymentViewModel {
    matrixReceipts: Array<MatrixReceiptModel>;
    constructor() {
        this.matrixReceipts = new Array<MatrixReceiptModel>();

    }

}
