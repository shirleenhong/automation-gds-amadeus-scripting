import { Injectable } from '@angular/core';
import { RemarksManagerService } from './remarks-manager.service';
import { MatrixAccountingModel } from 'src/app/models/pnr/matrix-accounting.model';
import { AccountingRemarkComponent } from 'src/app/corporate/payments/accounting-remark/accounting-remark.component';
import { DatePipe, DecimalPipe, formatDate } from '@angular/common';
import { PassiveSegmentModel } from 'src/app/models/pnr/passive-segment.model';
import { RemarkGroup } from 'src/app/models/pnr/remark.group.model';
import { RemarkModel } from 'src/app/models/pnr/remark.model';
import { PnrService } from '../pnr.service';
import { BehaviorSubject } from 'rxjs';
import { DDBService } from '../ddb.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentRemarkService {
  decPipe = new DecimalPipe('en-US');
  // nonbspInformation: MatrixAccountingModel[];
  nonbspInformation: BehaviorSubject<Array<MatrixAccountingModel>> = new BehaviorSubject([]);
  currentMessage = this.nonbspInformation.asObservable();

  constructor(
    private remarksManager: RemarksManagerService,
    private pnrService: PnrService,
    private rms: RemarksManagerService,
    private ddbService: DDBService
  ) {}

  writeAccountingReamrks(accountingComponents: AccountingRemarkComponent) {
    const accList = accountingComponents.accountingRemarks;
    // tslint:disable-next-line:max-line-length
    this.writePassPurchase(
      accList.filter(
        (x) =>
          x.accountingTypeRemark === 'ACPP' ||
          x.accountingTypeRemark === 'ACPR' ||
          x.accountingTypeRemark === 'WCPP' ||
          x.accountingTypeRemark === 'PCPP' // ||
        // x.accountingTypeRemark === 'ACPPC' ||
        // x.accountingTypeRemark === 'WCPPC' ||
        // x.accountingTypeRemark === 'PCPPC'
      )
    );

    // Write Non BSP Exhange Remarks
    this.writeNonBSPExchange(accList.filter((x) => x.accountingTypeRemark === 'NONBSPEXCHANGE'));
    this.writeNonBspApay(accList.filter((x) => x.accountingTypeRemark === 'APAY' || x.accountingTypeRemark === 'NONBSP'));
    this.writeAquaTicketingRemarks(accList.filter((x) => x.accountingTypeRemark === 'NONBSP'));
    this.writeCancelRemarks(accList.filter((x) => x.accountingTypeRemark === 'ACPPC'));
  }

  writeCancelRemarks(accountingRemarks: MatrixAccountingModel[]) {
    accountingRemarks.forEach((account) => {
      // tslint:disable-next-line: max-line-length
      if (account.accountingTypeRemark === 'ACPPC') {
        let airline = '';
        if (account.supplierCodeName === 'ACJ') {
          airline = 'AC';
        }
        if (account.supplierCodeName === 'WJP') {
          airline = 'WS';
        }
        if (account.supplierCodeName === 'PTP') {
          airline = 'PD';
        }

        const cancelSegmentrelate: string[] = [];
        const segmentDetails = this.pnrService.getSegmentList();

        const look = segmentDetails.find((x) => x.controlNumber === account.supplierConfirmatioNo);
        if (look) {
          cancelSegmentrelate.push(look.tatooNo);
        }

        this.writeTicketingLine(
          account.tkMacLine.toString(),
          account.baseAmount,
          account.gst,
          account.hst,
          account.qst,
          account.otherTax,
          '0',
          cancelSegmentrelate,
          account.supplierCodeName,
          account.tktLine
        );

        if (account.tktLine !== '') {
          const ticketAmountRemarks = new Map<string, string>();
          ticketAmountRemarks.set('TktRemarkNbr', account.tktLine);
          ticketAmountRemarks.set('SupplierCode', account.supplierCodeName);
          this.remarksManager.createEmptyPlaceHolderValue(['TktRemarkNbr', 'SupplierCode']);
        }

        const passCancellationRemark = new Map<string, string>();
        passCancellationRemark.set('AirlineCode', airline);
        passCancellationRemark.set('WebLocator', account.supplierConfirmatioNo);
        this.remarksManager.createPlaceholderValues(passCancellationRemark, null, cancelSegmentrelate);

        // TKT%TktRemarkNbr%-VEN/TK-%TktNbr%/VN-%SupplierCode%
        const tktWebTicket = new Map<string, string>();
        tktWebTicket.set('TktRemarkNbr', account.tkMacLine.toString());
        tktWebTicket.set('TktNbr', account.tktLine);
        tktWebTicket.set('SupplierCode', account.supplierCodeName);
        this.remarksManager.createPlaceholderValues(tktWebTicket, null, cancelSegmentrelate);

        // TKT%TktRemarkNbr%-BA-%CancelFee%/TX1-%CancelGst%XG/TX2-%CancelHst%RC/TX3-%CancelQst%XQ/TX4-%CancelOthTax%XT/COMM-0.00'
        const cancelFeeTktRemark = new Map<string, string>();
        cancelFeeTktRemark.set('TktRemarkNbr', account.tkMacLine.toString());
        cancelFeeTktRemark.set('CancelFee', account.baseAmountRefund);
        cancelFeeTktRemark.set('CancelGst', account.gstRefund);
        cancelFeeTktRemark.set('CancelHst', account.hstRefund);
        cancelFeeTktRemark.set('CancelQst', account.qstRefund);
        cancelFeeTktRemark.set('CancelOthTax', account.otherTaxRefund);
        this.remarksManager.createPlaceholderValues(cancelFeeTktRemark, null, cancelSegmentrelate);

        const refundStart = new Map<string, string>();
        refundStart.set('CARefundStart', 'true');
        this.remarksManager.createPlaceholderValues(null, refundStart, null, null, '**********************************************');

        const webLocatorRemark = new Map<string, string>();
        webLocatorRemark.set('WebLocator', account.supplierConfirmatioNo);
        webLocatorRemark.set('CurrentDateY', formatDate(Date.now(), 'ddMMM', 'en').toString());
        this.remarksManager.createPlaceholderValues(webLocatorRemark, null, null);

        const nonBspRemark = new Map<string, string>();
        nonBspRemark.set('SupplierCode', account.supplierCodeName);
        nonBspRemark.set('OrgOid', account.oidOrigTicketIssue);
        this.remarksManager.createPlaceholderValues(nonBspRemark, null, null);

        const refundBaseRemark = new Map<string, string>();
        refundBaseRemark.set('CancelFee', account.baseAmountRefund);
        refundBaseRemark.set('CancelGst', account.gstRefund);
        refundBaseRemark.set('CancelHst', account.hstRefund);
        refundBaseRemark.set('CancelQst', account.qstRefund);
        refundBaseRemark.set('CancelOthTax', account.otherTaxRefund);
        refundBaseRemark.set('CaRefundCommision', account.commisionRefund);
        this.remarksManager.createPlaceholderValues(refundBaseRemark, null, null);

        const notes1 = new Map<string, string>();
        notes1.set('CaAmadeusNotes1', account.additionalNotes1);
        this.remarksManager.createPlaceholderValues(notes1, null, null);

        const notes2 = new Map<string, string>();
        notes2.set('CaAmadeusNotes2', account.additionalNotes2);
        this.remarksManager.createPlaceholderValues(notes2, null, null);

        const refundEnd = new Map<string, string>();
        refundEnd.set('CARefundEnd', 'true');
        this.remarksManager.createPlaceholderValues(null, refundEnd, null, null, '**********************************************');

        const priceForRemark = new Map<string, string>();
        // tslint:disable-next-line: max-line-length
        const totalPrice =
          parseFloat(account.baseAmountRefund) +
          parseFloat(account.gstRefund) +
          parseFloat(account.hstRefund) +
          parseFloat(account.qstRefund) +
          parseFloat(account.otherTaxRefund);
        priceForRemark.set('CATotalPrice', this.decPipe.transform(totalPrice, '1.2-2').replace(',', ''));
        this.remarksManager.createPlaceholderValues(priceForRemark, null, null);

        const airlineCodeRemark = new Map<string, string>();
        airlineCodeRemark.set('AirlineCode', airline);
        airlineCodeRemark.set('TotalCost', this.decPipe.transform(totalPrice, '1.2-2').replace(',', ''));
        this.remarksManager.createPlaceholderValues(airlineCodeRemark, null);

        const passCancelledRemark = new Map<string, string>();
        passCancelledRemark.set('CancelAirlineCode', airline);
        this.remarksManager.createPlaceholderValues(passCancelledRemark, null, null);

        const cancelFeeRemark = new Map<string, string>();
        cancelFeeRemark.set('CancelFee', account.baseAmountRefund);
        this.remarksManager.createPlaceholderValues(cancelFeeRemark, null, null);

        const travellerCreditCardCondition = new Map<string, string>();
        travellerCreditCardCondition.set('CACancelRemark', 'true');
        this.remarksManager.createPlaceholderValues(null, travellerCreditCardCondition, null, null, 'THE TRAVELLERS CREDIT CARD.');

        // to do check if U14 exist
        if (this.pnrService.getRemarkText('U14/-' + airline + 'PASS') !== '') {
          const u14Remark = new Map<string, string>();
          u14Remark.set('CancelAirlineCodePassChg', airline);
          this.remarksManager.createPlaceholderValues(u14Remark, null, null);
        }
      }
    });
  }

  writePassPurchase(accountingRemarks: MatrixAccountingModel[]) {
    accountingRemarks.forEach((account) => {
      const paymentRemark = new Map<string, string>();
      const airlineCodeRemark = new Map<string, string>();
      const airlineCodeInvoice = new Map<string, string>();
      const staticRemarksCondition = new Map<string, string>();
      const airlineCorporatePassCondition = new Map<string, string>();
      const redemptionRemark = new Map<string, string>();
      const passNameRedemptionRemark = new Map<string, string>();
      const confNbrRem = new Map<string, string>();
      // let airline = '';
      confNbrRem.set('ConfNbr', account.supplierConfirmatioNo);

      if (account.accountingTypeRemark === 'ACPP' || account.accountingTypeRemark === 'ACPPC') {
        paymentRemark.set('PassName', account.passPurchase);
        paymentRemark.set('FareType', account.fareType);
        // airline = 'AC';
        airlineCodeRemark.set('AirlineCode', 'AC');
        airlineCodeInvoice.set('AirlineCode', 'AC');
        confNbrRem.set('AirlineCode', 'AC');
        redemptionRemark.set('PassName', 'Air Canada Individual');
        passNameRedemptionRemark.set('PassNameRedemption', 'Air Canada Individual');
      } else {
        if (account.accountingTypeRemark === 'WCPP' || account.accountingTypeRemark === 'WCPPC') {
          // airline = 'WS';
          airlineCodeRemark.set('AirlineCode', 'WS');
          airlineCodeInvoice.set('AirlineCode', 'WS');
          confNbrRem.set('AirlineCode', 'WS');
          redemptionRemark.set('PassName', 'Westjet Individual');
          passNameRedemptionRemark.set('PassNameRedemption', 'Westjet Individual');
        } else {
          // airline = 'PD';
          airlineCodeRemark.set('AirlineCode', 'PD');
          airlineCodeInvoice.set('AirlineCode', 'PD');
          confNbrRem.set('AirlineCode', 'PD');
          redemptionRemark.set('PassName', 'Porter Individual');
          passNameRedemptionRemark.set('PassNameRedemption', 'Porter Individual');
        }
        paymentRemark.set('PassNameNonAc', account.passPurchase);
      }

      airlineCodeRemark.set('TotalCost', account.baseAmount);

      let segmentrelate: string[] = [];
      this.getRemarkSegmentAssociation(account, segmentrelate);
      if (account.accountingTypeRemark === 'ACPR') {
        const { segmentAssoc } = this.GetSegmentAssociation(account);
        segmentrelate = segmentAssoc;
      }
      // const { uniqueairlineCode, segmentAssoc } = this.GetSegmentAssociation(account);

      this.writeTicketingLine(
        account.tkMacLine.toString(),
        account.baseAmount,
        account.gst,
        account.hst,
        account.qst,
        '0.00',
        account.commisionWithoutTax,
        segmentrelate,
        account.supplierCodeName,
        account.tktLine
      );

      // US10574: Airline Corporate Pass Redemption
      if (account.accountingTypeRemark === 'ACPR') {
        paymentRemark.set('PassName', account.passPurchase);
        paymentRemark.set('FareType', account.fareType);
        airlineCodeRemark.set('AirlineCode', account.airlineCorporatePass.airlineCode);
        airlineCodeInvoice.set('AirlineCode', account.airlineCorporatePass.airlineCode);
        airlineCodeInvoice.set('PassNumber', account.airlineCorporatePass.number.toString());
        airlineCodeInvoice.set('FareType', account.fareType);

        const cfaLine = this.pnrService.getCFLine();
        if (cfaLine !== undefined) {
          if (['ZZB', '92Z', 'YVQ', 'YFV'].includes(cfaLine.cfa)) {
            airlineCodeInvoice.set('GdsFare', account.gdsFare.toString());
          } else {
            airlineCodeInvoice.set('PassName', account.airlineCorporatePass.name);
          }
        }

        confNbrRem.set('AirlineCode', account.airlineCorporatePass.airlineCode);
        redemptionRemark.set('PassName', 'Airline Corporate');
        passNameRedemptionRemark.set('PassNameRedemption', 'Airline Corporate');

        // US10574: Airline Corporate Pass Redemption
        const tattooNumbers = this.pnrService.getTatooNumberFromSegmentNumber(account.segmentNo.split(','));
        // const tattooNumbers = account.segmentNo ? account.segmentNo.split(',') : null;
        // const tattooNumbers = ['2'];
        // const tattooNumbers = null;
        airlineCorporatePassCondition.set('AirlineCorporatePass', 'true');
        this.remarksManager.createPlaceholderValues(
          null,
          airlineCorporatePassCondition,
          tattooNumbers,
          null,
          'THE AIRLINE TICKET CHARGE ON THIS ITINERARY/INVOICE'
        );
        this.remarksManager.createPlaceholderValues(
          null,
          airlineCorporatePassCondition,
          tattooNumbers,
          null,
          'IS FOR INTERNAL COST RE-ALLOCATION PURPOSES ONLY.'
        );
        this.remarksManager.createPlaceholderValues(
          null,
          airlineCorporatePassCondition,
          tattooNumbers,
          null,
          '**PLEASE DO NOT EXPENSE** THIS CHARGE AS IT WILL NOT APPEAR'
        );
        this.remarksManager.createPlaceholderValues(
          null,
          airlineCorporatePassCondition,
          tattooNumbers,
          null,
          'ON YOUR CREDIT CARD STATEMENT.'
        );
        this.remarksManager.createPlaceholderValues(
          null,
          airlineCorporatePassCondition,
          tattooNumbers,
          null,
          'ALL OTHER CHARGES INDICATED WILL APPEAR'
        );
        this.remarksManager.createPlaceholderValues(
          null,
          airlineCorporatePassCondition,
          tattooNumbers,
          null,
          'ON YOUR CREDIT CARD AND SHOULD BE'
        );
        this.remarksManager.createPlaceholderValues(null, airlineCorporatePassCondition, tattooNumbers, null, 'EXPENSED ACCORDINGLY.');
      }

      staticRemarksCondition.set('PassPurchase', 'true');

      const totalCost = parseFloat(account.baseAmount) + parseFloat(account.gst) + parseFloat(account.hst) + parseFloat(account.qst);
      airlineCodeRemark.set('TotalCost', this.decPipe.transform(totalCost, '1.2-2').replace(',', ''));
      this.writeHighLowFareSavingCode(totalCost, totalCost, 'L', segmentrelate);
      const airReasonCodeRemark = new Map<string, string>();
      airReasonCodeRemark.set('CAAirRealisedSavingCode', 'L');

      this.remarksManager.createPlaceholderValues(paymentRemark, null, segmentrelate);

      this.remarksManager.createPlaceholderValues(airlineCodeRemark);
      this.remarksManager.createPlaceholderValues(airlineCodeInvoice);

      this.remarksManager.createPlaceholderValues(null, staticRemarksCondition, null, null, 'ALL DETAILS DISCUSSED AND');
      this.remarksManager.createPlaceholderValues(null, staticRemarksCondition, null, null, 'APPROVED BY CLIENT.');
      this.remarksManager.createPlaceholderValues(null, staticRemarksCondition, null, null, 'CHARGE TO CLIENTS CREDIT CARD');
      this.remarksManager.createPlaceholderValues(null, staticRemarksCondition, null, null, 'AUTHORIZED BY CLIENT.');

      if (account.fareType !== '') {
        passNameRedemptionRemark.set('FareType', account.fareType);
        this.remarksManager.createPlaceholderValues(passNameRedemptionRemark, null, segmentrelate);
      } else {
        this.remarksManager.createPlaceholderValues(redemptionRemark, null, segmentrelate);
      }
      this.remarksManager.createPlaceholderValues(confNbrRem, null, segmentrelate);
    });
  }

  getFareType(fareType: string) {
    if (fareType.includes('FLEX')) {
      return 'FLE';
    }

    if (fareType.includes('LATITUDE')) {
      return 'LAT';
    }

    if (fareType.includes('EXECUTIVE')) {
      return 'EXE';
    }

    if (fareType.includes('TANGO')) {
      return 'TAN';
    }

    if (fareType.includes('PREMIUM ECONOMY')) {
      return 'PEC';
    }

    return '';
  }

  moveProfile(accountingRemarks: MatrixAccountingModel[]) {
    if (accountingRemarks.length > 0) {
      let airline = 'AC';
      let fareType = '';
      if (accountingRemarks[0].accountingTypeRemark === 'ACPP') {
        fareType = this.getFareType(accountingRemarks[0].fareType);
      }
      if (accountingRemarks[0].accountingTypeRemark === 'ACPR') {
        // if (accountingRemarks[0].airlineCorporatePass.airlineCode === 'AC') {
        airline = accountingRemarks[0].airlineCorporatePass.airlineCode;
        fareType = accountingRemarks[0].fareType;
        // }
      }
      if (fareType !== '') {
        return 'PBN/YTOWL210N/' + airline + ' PASS ' + fareType + '/*';
      }
    }
  }

  writeHighLowFareSavingCode(highFare, lowFare, savingsCode, segmentAssoc) {
    const highFareRemark = new Map<string, string>();
    const lowFareRemark = new Map<string, string>();
    const airReasonCodeRemark = new Map<string, string>();

    highFareRemark.set('CAAirHighFare', this.decPipe.transform(highFare, '1.2-2').replace(',', ''));
    lowFareRemark.set('CAAirLowFare', this.decPipe.transform(lowFare, '1.2-2').replace(',', ''));
    airReasonCodeRemark.set('CAAirRealisedSavingCode', savingsCode);

    this.remarksManager.createPlaceholderValues(highFareRemark, null, segmentAssoc);
    this.remarksManager.createPlaceholderValues(lowFareRemark, null, segmentAssoc);
    this.remarksManager.createPlaceholderValues(airReasonCodeRemark, null, segmentAssoc);
  }

  writeTicketingLine(tktNo, baseAmount, gst, hst, qst, otherTax, comm, segmentrelate, supplierCodeName, tktline?) {
    const ticketAmountRemarks = new Map<string, string>();
    ticketAmountRemarks.set('TktRemarkNbr', tktNo.toString());
    ticketAmountRemarks.set('BaseAmt', this.decPipe.transform(baseAmount, '1.2-2').replace(',', ''));
    ticketAmountRemarks.set('Gst', this.decPipe.transform(gst, '1.2-2').replace(',', ''));
    ticketAmountRemarks.set('Hst', this.decPipe.transform(hst, '1.2-2').replace(',', ''));
    ticketAmountRemarks.set('Qst', this.decPipe.transform(qst, '1.2-2').replace(',', ''));
    ticketAmountRemarks.set('Comm', this.decPipe.transform(comm, '1.2-2').replace(',', ''));
    ticketAmountRemarks.set('OthTax', this.decPipe.transform(otherTax, '1.2-2').replace(',', ''));
    this.remarksManager.createPlaceholderValues(ticketAmountRemarks, null, segmentrelate);

    const ticketRemarks = new Map<string, string>();
    if (tktline) {
      ticketRemarks.set('TktNbr', tktline);
      this.rms.createEmptyPlaceHolderValue(['TktRemarkNbr', 'SupplierCode']);
    } else {
      this.rms.createEmptyPlaceHolderValue(['TktRemarkNbr', 'TktNbr', 'SupplierCode']);
    }
    ticketRemarks.set('TktRemarkNbr', tktNo);
    ticketRemarks.set('SupplierCode', supplierCodeName);
    this.remarksManager.createPlaceholderValues(ticketRemarks, null, segmentrelate);
  }

  /**
   * DOING
   * US11134: Write Non-BSP Exchange remarks to PNR.
   *
   * @param accountingRemarks collection of Non-BSP Exchange remarks
   */
  writeNonBSPExchange(accountingRemarks: MatrixAccountingModel[]) {
    accountingRemarks.forEach((account) => {
      const originalTicketRemarks = new Map<string, string>();
      const originalTicketCondition = new Map<string, string>();
      const airlineCodeRemark = new Map<string, string>();
      const cnNumberRemarks = new Map<string, string>();
      const passchange = new Map<string, string>();
      const gdsFare = new Map<string, string>();
      const consultantNoRemarkStatic = new Map<string, string>();
      const separatePenaltyRemark = new Map<string, string>();
      let totalBaseAmount = parseFloat(account.baseAmount);
      let totalGst = parseFloat(account.gst);
      let totalHst = parseFloat(account.hst);
      let totalQst = parseFloat(account.qst);

      if (account.originalTktLine !== undefined) {
        originalTicketRemarks.set('OriginalTicketNumber', account.originalTktLine);
      } else {
        originalTicketCondition.set('NoOriginalTicket', 'true');
      }

      const { uniqueairlineCode, segmentAssoc } = this.GetSegmentAssociation(account);

      if (parseFloat(account.penaltyBaseAmount) > 0 && account.supplierCodeName === 'ACY') {
        this.writeTicketingPenalty(
          account.tkMacLine.toString(),
          'A22',
          account.penaltyBaseAmount,
          account.penaltyGst,
          account.penaltyHst,
          account.penaltyQst,
          '0.00',
          segmentAssoc
        );
      }

      if (account.supplierCodeName !== 'ACY') {
        totalBaseAmount += parseFloat(account.penaltyBaseAmount);
        totalGst += parseFloat(account.penaltyGst);
        totalHst += parseFloat(account.penaltyHst);
        totalQst += parseFloat(account.penaltyQst);
      }

      this.writeTicketingLine(
        account.tkMacLine.toString(),
        totalBaseAmount,
        totalGst,
        totalHst,
        totalQst,
        account.otherTax,
        account.commisionWithoutTax,
        segmentAssoc,
        account.supplierCodeName,
        account.tktLine
      );

      const totalCost =
        totalBaseAmount + totalGst + totalHst + totalQst + parseFloat(account.otherTax) + parseFloat(account.commisionWithoutTax);

      airlineCodeRemark.set('AirlineCode', uniqueairlineCode);
      airlineCodeRemark.set('TotalCost', this.decPipe.transform(totalCost, '1.2-2').replace(',', ''));
      this.remarksManager.createPlaceholderValues(airlineCodeRemark);

      if (account.consultantNo) {
        cnNumberRemarks.set('BackOfficeAgentIdentifier', account.consultantNo);
        this.remarksManager.createPlaceholderValues(cnNumberRemarks);
        consultantNoRemarkStatic.set('IsNuc', 'true');
      }

      if (this.pnrService.hasPassRemark()) {
        passchange.set('ExchangeAirlineCode', uniqueairlineCode);
        this.remarksManager.createPlaceholderValues(passchange);
      }

      if (account.gdsFare !== undefined) {
        gdsFare.set('AirlineCode', uniqueairlineCode);
        gdsFare.set('PassNumber', account.tktLine);
        gdsFare.set('FareType', account.fareType);
        gdsFare.set('GdsFare', account.gdsFare.toString());
        this.remarksManager.createPlaceholderValues(gdsFare);
      }

      this.writeHighLowFareSavingCode(totalCost, totalCost, 'E', segmentAssoc);

      this.remarksManager.createPlaceholderValues(null, originalTicketCondition, null, null, 'NE/-EX-Y', true);
      this.remarksManager.createPlaceholderValues(originalTicketRemarks);
      this.remarksManager.createPlaceholderValues(separatePenaltyRemark, null, segmentAssoc);
      this.remarksManager.createPlaceholderValues(null, consultantNoRemarkStatic, null, null, 'NUC');
    });
  }

  writeTicketingPenalty(tkline, vnCode, baseAmount, gst, hst, qst, otherTax, segmentAssoc) {
    const separatePenaltyRemark = new Map<string, string>();
    separatePenaltyRemark.set('TktRemarkNbr', tkline);
    separatePenaltyRemark.set('VnCode', vnCode);
    separatePenaltyRemark.set('PenaltyAmt', baseAmount);
    separatePenaltyRemark.set('PenaltyGst', gst);
    separatePenaltyRemark.set('PenaltyHst', hst);
    separatePenaltyRemark.set('PenaltyQst', qst);
    separatePenaltyRemark.set('OtherTax', otherTax);
    this.remarksManager.createPlaceholderValues(separatePenaltyRemark, null, segmentAssoc);
  }

  writeNonBspApay(accountingRemarks: MatrixAccountingModel[]) {
    const totalcostlist = [];
    let hasApay: boolean;
    hasApay = false;

    accountingRemarks.forEach((account) => {
      const itiRemarks = new Map<string, string>();
      const { uniqueairlineCode, segmentAssoc } = this.GetSegmentAssociation(account);
      if (account.accountingTypeRemark === 'NONBSP') {
        this.writeTicketingLine(
          account.tkMacLine.toString(),
          account.baseAmount,
          account.gst,
          account.hst,
          account.qst,
          account.otherTax,
          account.commisionWithoutTax,
          segmentAssoc,
          account.supplierCodeName,
          account.tktLine
        );

        const totalCost =
          parseFloat(account.baseAmount) +
          parseFloat(account.gst) +
          parseFloat(account.hst) +
          parseFloat(account.qst) +
          parseFloat(account.otherTax);
        const lookindex = totalcostlist.findIndex((x) => x.AirlineCode === uniqueairlineCode);
        if (lookindex > -1) {
          totalcostlist[lookindex].totalAmount = totalcostlist[lookindex].totalAmount + totalCost;
        } else {
          totalcostlist.push({ AirlineCode: uniqueairlineCode, totalAmount: totalCost });
        }

        itiRemarks.set('ConfNbr', account.supplierConfirmatioNo);
      }

      if (account.accountingTypeRemark === 'APAY' && parseFloat(account.baseAmount) > 0) {
        this.writeTicketingPenalty(
          account.tkMacLine.toString(),
          account.supplierCodeName,
          account.baseAmount,
          account.gst,
          account.hst,
          account.qst,
          account.otherTax,
          segmentAssoc
        );

        if (account.tkMacLine.toString() !== null && account.tkMacLine.toString() !== '') {
          itiRemarks.set('ConfNbr', account.tktLine);
        }

        if (account.descriptionapay === 'OTHER COSTS') {
          itiRemarks.set('RemarkDescription', account.otherCostDescription);
        } else {
          itiRemarks.set('RemarkDescription', account.descriptionapay);
        }
        const totalTax = parseFloat(account.gst) + parseFloat(account.hst) + parseFloat(account.qst);

        itiRemarks.set('BaseAmt', account.baseAmount);
        itiRemarks.set(
          'TotalTax',
          this.decPipe
            .transform(totalTax, '1.2-2')
            .replace(',', '')
            .toString()
        );
        const ccVendor = this.pnrService.getCCVendorCode();
        if (ccVendor !== '') {
          itiRemarks.set('CCVendor', ccVendor);
        }
      }
      this.remarksManager.createPlaceholderValues(itiRemarks, null, segmentAssoc);
      hasApay = true;
    });

    totalcostlist.forEach((element) => {
      if (element.AirlineCode) {
        const airlineCodeRemark = new Map<string, string>();
        airlineCodeRemark.set('AirlineCode', element.AirlineCode);
        airlineCodeRemark.set('TotalCost', this.decPipe.transform(element.totalAmount, '1.2-2').replace(',', ''));
        this.remarksManager.createPlaceholderValues(airlineCodeRemark);
      }
    });

    if (hasApay) {
      const ebRemark = new Map<string, string>();
      ebRemark.set('TouchLevelCA', 'AMA/-GIS');
      this.remarksManager.createPlaceholderValues(ebRemark);
    }
  }

  private GetSegmentAssociation(account: MatrixAccountingModel) {
    const segmentNos = account.segmentNo.split(',');
    const segmentDetails = this.pnrService.getSegmentList();
    const segmentAssoc = new Array<string>();
    let uniqueairlineCode = '';
    segmentNos.forEach((segs) => {
      const look = segmentDetails.find((x) => segs === x.lineNo);
      if (look) {
        uniqueairlineCode = look.airlineCode;
        segmentAssoc.push(look.tatooNo);
      }
    });
    return { uniqueairlineCode, segmentAssoc };
  }

  deleteSegmentForPassPurchase(accounting: MatrixAccountingModel[]) {
    const remGroup = new RemarkGroup();
    remGroup.group = 'Accounting Remark';
    remGroup.remarks = new Array<RemarkModel>();
    remGroup.passiveSegments = [];
    accounting.forEach((account) => {
      if (account.accountingTypeRemark === 'ACPPC') {
        account.segments.forEach((element) => {
          remGroup.deleteRemarkByIds.push(element.lineNo);
        });
      }
    });
    return remGroup;
  }

  addSegmentForPassPurchase(accounting: MatrixAccountingModel[]) {
    const remGroup = new RemarkGroup();
    remGroup.group = 'Accounting Remark';
    remGroup.remarks = new Array<RemarkModel>();
    remGroup.passiveSegments = [];

    if (accounting !== null) {
      let airline = '';
      accounting.forEach((account) => {
        const air = this.pnrService
          .getSegmentList()
          .find((x) => x.segmentType === 'AIR' && x.controlNumber === account.supplierConfirmatioNo);

        if (account.accountingTypeRemark === 'ACPPC') {
          airline = this.getAirlineBySupplierCode(account.supplierCodeName);
        } else {
          airline = this.getAirline(account.accountingTypeRemark);
        }

        if (!air) {
          const noOfPassenger = this.pnrService.getPassengers().length;
          const datePipe = new DatePipe('en-US');
          // add dummy segment
          const passive = new PassiveSegmentModel();
          if (account.accountingTypeRemark === 'ACPPC') {
            passive.startPoint = 'YYZ';
            passive.endPoint = 'YYZ';
          } else {
            passive.startPoint = account.departureCity;
            passive.endPoint = account.departureCity;
          }

          passive.startDate = datePipe.transform(new Date(), 'ddMMyy');
          passive.vendor = airline;
          passive.startTime = '0700';
          passive.endTime = '0800';
          passive.segmentName = 'AIR';
          passive.passiveSegmentType = 'AIR';
          passive.function = '1';
          passive.quantity = noOfPassenger;
          passive.status = 'GK';
          passive.classOfService = 'Q';
          passive.controlNo = account.supplierConfirmatioNo;
          passive.flightNo = '123';
          //  passive.confirmationNo = accounting.supplierConfirmatioNo;
          remGroup.passiveSegments.push(passive);
        }
      });
    }
    return remGroup;
  }

  private getAirline(airline: string) {
    switch (airline) {
      case 'ACPP':
        airline = 'AC';
        break;
      case 'WCPP':
        airline = 'WS';
        break;
      case 'PCPP':
        airline = 'PD';
        break;
    }
    return airline;
  }

  private getAirlineBySupplierCode(suppliercode: string) {
    let airline = '';
    switch (suppliercode) {
      case 'ACJ':
        airline = 'AC';
        break;
      case 'WJP':
        airline = 'WS';
        break;
      case 'PTP':
        airline = 'PD';
        break;
    }
    return airline;
  }

  getRemarkSegmentAssociation(account: MatrixAccountingModel, segmentrelate: string[]) {
    const air = this.pnrService
      .getSegmentList()
      .filter(
        (x) =>
          x.segmentType === 'AIR' &&
          x.controlNumber === account.supplierConfirmatioNo.toUpperCase() &&
          x.cityCode === account.departureCity.toUpperCase() &&
          x.arrivalAirport === account.departureCity.toUpperCase()
      );

    air.forEach((airElement) => {
      segmentrelate.push(airElement.tatooNo);
    });
  }

  setNonBspInformation(accountingRemarks: MatrixAccountingModel[]) {
    this.nonbspInformation.next(accountingRemarks.filter((x) => x.accountingTypeRemark === 'NONBSP'));
  }

  allRailSegment(account: MatrixAccountingModel) {
    const segmentNos = account.segmentNo.split(',');
    const segmentDetails = this.pnrService.getSegmentList();
    let segmentAssoc = new Array<string>();
    let hasNonTrain = false;
    let route = '';

    segmentNos.forEach((segs) => {
      if (segmentDetails.find((x) => segs === x.lineNo && x.passive !== 'TYP-TRN')) {
        hasNonTrain = true;
      }
      const look = segmentDetails.find((x) => segs === x.lineNo && x.passive === 'TYP-TRN');
      if (look) {
        route = this.getRoute(this.ddbService.getCityCountry(look.cityCode), route);
        segmentAssoc.push(look.tatooNo);
      }
    });

    segmentAssoc = !hasNonTrain ? segmentAssoc : [];
    return { segmentAssoc, route };
  }

  getRoute(element: any, route: string) {
    if (element !== 'Canada' && element !== 'United States') {
      route = 'INTL';
    }
    if (element === 'United States' && route !== 'INTL') {
      route = 'TRANS';
    }
    return route;
  }

  writeAquaTicketingRemarks(accountingRemarks: MatrixAccountingModel[]): void {
    accountingRemarks.forEach((element) => {
      let idx = 1;
      const { segmentAssoc, route } = this.allRailSegment(element);
      if (segmentAssoc.length > 0) {
        const tktRemarks = new Map<string, string>();
        tktRemarks.set('NumberOfTickets', idx.toString());
        this.remarksManager.createPlaceholderValues(tktRemarks);

        const tktRoute = new Map<string, string>();
        tktRoute.set('TicketSequence', idx.toString());
        tktRoute.set('TktRoute', route);
        this.remarksManager.createPlaceholderValues(tktRoute);
        idx++;
      }
    });
  }
}
