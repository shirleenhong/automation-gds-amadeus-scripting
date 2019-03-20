export class MatrixReceiptModel {
    rln: number;
    passengerName: string = "";
    bankAccount: string = "";
    glCode: string = "124000";
    description: string = "";
    points: number = 0;
    amount: number = 0;
    cwtRef: string = "";
    lastFourVi: number = 0;
    ccNo: number;
    expDate: Date;
    vendorCode: string;
    gcNumber: number;
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