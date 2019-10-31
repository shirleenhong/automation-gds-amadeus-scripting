import { AirlineCorporatePass } from 'src/app/models/pnr/airline-corporate-pass.model';

export class MatrixAccountingModel {
  airlineRecordLocator: string; // 10-characters
  bsp: string;
  consultantNo: string; // 3 alpha-numeric, optional
  type: string;
  tkMacLine: number;
  accountingTypeRemark: string;
  segmentNo: string;
  passengerNo: string;
  fop: string;
  vendorCode: string;
  expDate: string;
  expYear: string;
  cardNumber: string;
  baseAmount: string;
  commisionWithoutTax: string;
  gst: string;
  hst: string;
  qst: string;
  otherTax: string;
  supplierCodeName: string;
  supplierConfirmatioNo = ''; // Alias for airlineRecordLocator
  airAccountingRemark: string;
  tktLine: string;
  descriptionapay: string;
  commisionPercentage: string;
  passRelate: boolean;
  passPurchase = '';
  fareType = '';
  departureCity: string;
  originalTktLine: string;
  penaltyBaseAmount = '0.00';
  penaltyGst = '0.00';
  penaltyHst = '0.00';
  penaltyQst = '0.00';
  penaltyOtherTax = '0.00';
  status: string; // ADDED, UPDATED

  // Non BSP Exchange properties
  gdsFare: number;
  otherCostDescription: string;
  typeCode: string;
  airlineCorporatePass: AirlineCorporatePass;
}
