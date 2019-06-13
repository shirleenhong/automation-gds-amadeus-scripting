export class MatrixReceiptModel {
    rln: number;
    passengerName = '';
    bankAccount = '';
    glCode = '124000';
    description = '';
    points;
    amount;
    cwtRef = '';
    lastFourVi;
    ccNo: number;
    expDate: string;
    vendorCode: string;
    gcNumber: string;
    modePayment: string;
    paymentType: PaymentType;


}

export enum PaymentType {
    Undefined = -1,
    Rbc = 0,
    CreditCard = 1,
    Cash = 2,
    Check = 3
}