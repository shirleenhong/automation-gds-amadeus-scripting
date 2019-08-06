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
  ccNo: string;
  expDate: string;
  vendorCode: string;
  gcNumber: string;
  modePayment: string;
  paymentType: PaymentType;
  status: string; // ADDED, UPDATED
}

export enum PaymentType {
  Undefined = -1,
  Rbc = 0,
  CreditCard = 1,
  Cash = 2,
  Check = 3
}
