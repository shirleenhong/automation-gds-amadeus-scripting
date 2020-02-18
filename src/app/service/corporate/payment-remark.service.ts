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
import { AmadeusQueueService } from '../amadeus-queue.service';
import { QueuePlaceModel } from 'src/app/models/pnr/queue-place.model';
import { NonAcceptanceComponent } from 'src/app/corporate/payments/non-acceptance/non-acceptance.component';


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
    private ddbService: DDBService,
    private queService: AmadeusQueueService
  ) { }

  writeAccountingRemarks(accountingComponents: AccountingRemarkComponent) {
    const accList = accountingComponents.accountingRemarks;
    // tslint:disable-next-line:max-line-length
    this.writePassPurchase(
      accList.filter(
        (x) =>
          x.accountingTypeRemark === 'ACPP' ||
          x.accountingTypeRemark === 'ACPR' ||
          x.accountingTypeRemark === 'WCPP' ||
          x.accountingTypeRemark === 'PCPP'
      )
    );

    // Write Non BSP Exhange Remarks
    this.writeNonBSPExchange(accList.filter((x) => x.accountingTypeRemark === 'NONBSPEXCHANGE'));
    this.writeNonBspApay(accList.filter((x) => x.accountingTypeRemark === 'APAY' || x.accountingTypeRemark === 'NONBSP'
      || x.accountingTypeRemark === 'RAIL'));
    this.writeAquaTicketingRemarks(accList.filter((x) => x.accountingTypeRemark === 'NONBSP'));
    this.writeCancelRemarks(accList.filter((x) => x.accountingTypeRemark === 'ACPPC'));
    accountingComponents.accountingRemarks.length = 0;
  }

  writeStandAlonePassPurchase(accountingComponents: AccountingRemarkComponent) {
    const accList = accountingComponents.accountingRemarks;
    const remGroup = new RemarkGroup();
    remGroup.group = 'Accounting Remark';
    remGroup.remarks = new Array<RemarkModel>();
    remGroup.passiveSegments = [];

    accList.forEach((account) => {
      const segmentrelate: string[] = [];
      this.getRemarkSegmentAssociation(account, segmentrelate);
      let airlineCode = '';
      let airlineName = '';
      let faretype = '';
      switch (account.accountingTypeRemark) {
        case 'ACPP':
          airlineCode = 'AC';
          airlineName = 'Air Canada';
          faretype = (account.fareType === 'FLEX') ? 'FLE' :
            (account.fareType === 'LATITUDE') ? 'LAT' :
              (account.fareType === 'EXECUTIVE') ? 'EXE' :
                (account.fareType === 'TANGO') ? 'TAP' :
                  (account.fareType === 'PREMIUM ECONOMY') ? 'PRE' : '';
          break;
        case 'WCPP':
          airlineCode = 'WS';
          airlineName = 'Westjet';
          break;
        case 'PCPP':
          airlineCode = 'PD';
          airlineName = 'Porter';
          break;
        case 'ANCPP':
          airlineCode = '4N';
          airlineName = 'Air North';
          break;
        case 'PCCPP':
          airlineCode = '8P';
          airlineName = 'Pacific Coastal';
          break;

      }
      faretype = (faretype === '') ? account.fareType : faretype;
      this.writePPRemarks(account, segmentrelate, airlineCode, airlineName, faretype);
    });

    return remGroup;
  }

  private writePPRemarks(account: MatrixAccountingModel, segmentrelate: string[],
                         airlineCode: string, airlineName: string, faretype: string) {
    if (account.billingType === 'POS') {
      this.createRemarks(['SupFeeTicketId', 'SupFeeInfo'], ['1', 'ATD' + account.feeAmount]);
      this.createRemarks(null, null, 'ONE TIME CWT FEE FOR PASS TRANSACTIONS', null, ['IsPos'], ['true']);
      this.createRemarks(null, null, 'ADMINISTRATION FEE OF [FEE] PLUS TAX', null, ['IsPos'], ['true']);
      this.createRemarks(null, null, 'TOTAL FEE IS NONREFUNDABLE', null, ['IsPos'], ['true']);
    } else {
      this.createRemarks(null, null, 'ONE TIME CWT FEE FOR PASS TRANSACTIONS', null, ['IsPos'], ['false']);
      this.createRemarks(null, null, 'ADMINISTRATION FEE OF [FEE] PLUS TAX', null, ['IsPos'], ['false']);
      this.createRemarks(null, null, 'TOTAL FEE IS NONREFUNDABLE', null, ['IsPos'], ['false']);
      this.createRemarks(['SupFeeTicketId', 'SupFeeInfo'], ['1', 'NFR']);
      this.createRemarks(['PassFeeAmount'], [account.feeAmount]);
    }
    this.createRemarks(['PassName', 'FareType'], [account.passPurchase, faretype + ' FARE'], null, segmentrelate);
    this.createRemarks(['AirlineCode', 'PassNumber', 'PassName', 'FareType'],
      [airlineCode, account.tktLine, account.passPurchase, faretype], null, null);

    const comm = (!account.commisionWithoutTax) ? '0.00' : account.commisionWithoutTax;
    this.writeTicketingLine(account.tkMacLine.toString(), '0.00', '0.00', '0.00', '0.00', '0.00',
      comm, segmentrelate, account.supplierCodeName, account.tktLine);
    this.createRemarks(['AirlineCode', 'PassName', 'FareType', 'TktNbr', 'PassSegmentCost', 'PassExpDate'],
      [airlineCode, account.passPurchase, faretype, account.tktLine, account.segmentCost, account.passExpDate]);

    this.createRemarks(['CCVendor', 'CCNo', 'CCExpDate'], [account.vendorCode, account.cardNumber, account.expDate]);
    this.createRemarks(['AirlineCode', 'TotalCost'], [airlineCode, '0.00']);
    this.createRemarks(['BackOfficeAgentIdentifier'], ['A9I']);
    this.createRemarks(['WaiverLine'], ['NO-0.00']);
    this.createRemarks(['PassNameNonAc'], [airlineName + ' ' + account.fareType + ' ' + account.passPurchase]);
    this.createRemarks(['PassExpDate'], [account.passExpDate]);
    this.createRemarks(['AirlineName', 'TktNbr'], [airlineName, account.tktLine]);
  }

  deleteRemarksStandAlone() {
    this.remarksManager.createEmptyPlaceHolderValue(['SupFeeTicketId', 'SupFeeInfo'], null, 'SUPFEE');
    this.remarksManager.createEmptyPlaceHolderValue(['PassFeeAmount']);
    this.remarksManager.createEmptyPlaceHolderValue(['AirlineCode', 'PassName', 'FareType', 'TktNbr', 'PassSegmentCost', 'PassExpDate']);
    this.remarksManager.createEmptyPlaceHolderValue(['CCVendor', 'CCNo', 'CCExpDate']);
    this.remarksManager.createEmptyPlaceHolderValue(['AirlineCode', 'TotalCost']);
    this.remarksManager.createEmptyPlaceHolderValue(['PassNameNonAc'], null, 'PASS');
    this.remarksManager.createEmptyPlaceHolderValue(['PassExpDate']);
    this.remarksManager.createEmptyPlaceHolderValue(['AirlineName', 'TktNbr']);
    this.remarksManager.createEmptyPlaceHolderValue(['WaiverLine']);
    this.remarksManager.createEmptyPlaceHolderValue(['BackOfficeAgentIdentifier']);
    this.remarksManager.createEmptyPlaceHolderValue(['TktRemarkNbr', 'BaseAmt', 'Gst', 'Hst', 'Qst', 'Comm', 'OthTax'], null, 'TKT');
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

        if (account.gst === undefined) {
          account.gst = '0.00';
        }
        if (account.qst === undefined) {
          account.qst = '0.00';
        }
        if (account.hst === undefined) {
          account.hst = '0.00';
        }
        if (account.otherTax === undefined) {
          account.otherTax = '0.00';
        }

        if (account.gstRefund === undefined) {
          account.gstRefund = '0.00';
        }
        if (account.qstRefund === undefined) {
          account.qstRefund = '0.00';
        }
        if (account.hstRefund === undefined) {
          account.hstRefund = '0.00';
        }
        if (account.otherTaxRefund === undefined) {
          account.otherTaxRefund = '0.00';
        }
        if (account.otherTax === undefined) {
          account.otherTax = '0.00';
        }

        const cancelSegmentrelate: string[] = [];
        const segmentDetails = this.pnrService.getSegmentList();

        const look = segmentDetails.find((x) => x.controlNumber === account.supplierConfirmatioNo);
        if (look) {
          cancelSegmentrelate.push(look.tatooNo);
        }

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
        cancelFeeTktRemark.set('CancelFee', account.baseAmount);
        cancelFeeTktRemark.set('CancelGst', account.gst);
        cancelFeeTktRemark.set('CancelHst', account.hst);
        cancelFeeTktRemark.set('CancelQst', account.qst);
        cancelFeeTktRemark.set('CancelOthTax', account.otherTax);
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

        // RMX/REFUND BASE-[refund_Base]  GST-[refund_GST]  HST-[refund_Hst]  QST-[refund_Qst]  OTH TAX-[refund_Othtax]
        const refundBaseRemark = new Map<string, string>();
        refundBaseRemark.set('CancelFee', account.baseAmountRefund);
        refundBaseRemark.set('CancelGst', account.gstRefund);
        refundBaseRemark.set('CancelHst', account.hstRefund);
        refundBaseRemark.set('CancelQst', account.qstRefund);
        refundBaseRemark.set('CancelOthTax', account.otherTaxRefund);
        this.remarksManager.createPlaceholderValues(refundBaseRemark, null, null);

        const refundBaseCommisionRemark = new Map<string, string>();
        refundBaseCommisionRemark.set('CaRefundCommision', account.commisionRefund);
        this.remarksManager.createPlaceholderValues(refundBaseCommisionRemark, null, null);

        if (account.additionalNotes1) {
          const notes1 = new Map<string, string>();
          notes1.set('CaAmadeusNotes1', account.additionalNotes1);
          this.remarksManager.createPlaceholderValues(notes1, null, null);
        }
        if (account.additionalNotes2) {
          const notes2 = new Map<string, string>();
          notes2.set('CaAmadeusNotes2', account.additionalNotes2);
          this.remarksManager.createPlaceholderValues(notes2, null, null);
        }
        const refundEnd = new Map<string, string>();
        refundEnd.set('CARefundEnd', 'true');
        this.remarksManager.createPlaceholderValues(null, refundEnd, null, null, '**********************************************');

        const priceForRemark = new Map<string, string>();

        const totalPrice =
          parseFloat(account.baseAmount) +
          parseFloat(account.gst) +
          parseFloat(account.hst) +
          parseFloat(account.qst) +
          parseFloat(account.otherTax);
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
        cancelFeeRemark.set('CancelFee', account.baseAmount);
        this.remarksManager.createPlaceholderValues(cancelFeeRemark, null, null);

        const travellerCreditCardCondition = new Map<string, string>();
        travellerCreditCardCondition.set('CACancelRemark', 'true');
        this.remarksManager.createPlaceholderValues(null, travellerCreditCardCondition, null, null, 'THE TRAVELLERS CREDIT CARD.');

        if (this.pnrService.getRemarkText('U14/-' + airline + 'PASS') !== '') {
          const u14Remark = new Map<string, string>();
          u14Remark.set('CancelAirlineCodePassChg', airline);
          this.remarksManager.createPlaceholderValues(u14Remark, null, null);
        }

        const highFareRemark = new Map<string, string>();
        const lowFareRemark = new Map<string, string>();
        const airReasonCodeRemark = new Map<string, string>();

        highFareRemark.set('CAAirHighFare', this.decPipe.transform(totalPrice, '1.2-2').replace(',', ''));
        lowFareRemark.set('CAAirLowFare', this.decPipe.transform(totalPrice, '1.2-2').replace(',', ''));
        airReasonCodeRemark.set('CAAirRealisedSavingCode', 'E');

        this.remarksManager.createPlaceholderValues(highFareRemark, null, cancelSegmentrelate);
        this.remarksManager.createPlaceholderValues(lowFareRemark, null, cancelSegmentrelate);
        this.remarksManager.createPlaceholderValues(airReasonCodeRemark, null, cancelSegmentrelate);

        const originalTicketRemarks = new Map<string, string>();
        originalTicketRemarks.set('OriginalTicketNumber', account.tktLine);
        this.remarksManager.createPlaceholderValues(originalTicketRemarks, null, null);
        const consultantNoRemarkStatic = new Map<string, string>();
        consultantNoRemarkStatic.set('IsNuc', 'true');
        this.remarksManager.createPlaceholderValues(null, consultantNoRemarkStatic, null, null, 'NUC');
        this.queService.addQueueCollection(new QueuePlaceModel('YTOWL210O', 41, 98));
        this.queService.addQueueCollection(new QueuePlaceModel('YTOWL210E', 70, 1));
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
        paymentRemark.set('FareType', account.fareType + ' FARE');
        // airline = 'AC';
        airlineCodeRemark.set('AirlineCode', 'AC');
        airlineCodeInvoice.set('AirlineCode', 'AC');
        confNbrRem.set('AirlineCode', 'AC');
        if (account.accountingTypeRemark === 'ACPPC') {
          redemptionRemark.set('PassName', 'Air Canada Individual');
          passNameRedemptionRemark.set('PassNameRedemption', 'Air Canada Individual');
        }
      } else {
        if (account.accountingTypeRemark === 'WCPP' || account.accountingTypeRemark === 'WCPPC') {
          // airline = 'WS';
          airlineCodeRemark.set('AirlineCode', 'WS');
          airlineCodeInvoice.set('AirlineCode', 'WS');
          confNbrRem.set('AirlineCode', 'WS');
          // redemptionRemark.set('PassName', 'Westjet Individual');
          // passNameRedemptionRemark.set('PassNameRedemption', 'Westjet Individual');
        } else {
          // airline = 'PD';
          airlineCodeRemark.set('AirlineCode', 'PD');
          airlineCodeInvoice.set('AirlineCode', 'PD');
          confNbrRem.set('AirlineCode', 'PD');
          // redemptionRemark.set('PassName', 'Porter Individual');
          // passNameRedemptionRemark.set('PassNameRedemption', 'Porter Individual');
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
        paymentRemark.set('PassName', account.airlineCorporatePass.name);
        paymentRemark.set('FareType', account.airlineCorporatePass.fareType);
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
        passNameRedemptionRemark.set('PassNameRedemption', account.airlineCorporatePass.name);

        // US10574: Airline Corporate Pass Redemption
        const tattooNumbers = this.pnrService.getTatooNumberFromSegmentNumber(account.segmentNo.split(','));
        // const tattooNumbers = account.segmentNo ? account.segmentNo.split(',') : null;
        // const tattooNumbers = ['2'];
        // const tattooNumbers = null;
        airlineCorporatePassCondition.set('AirlineCorporatePass', 'true');
        // if (account.accountingTypeRemark === 'NONBSPEXCHANGE') {
        //   airlineCorporatePassCondition.set('AirlineCorporatePass', 'false');
        // }

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

  // writeRMGPassCancelledRemark(airline: string) {
  //   const u14 = this.pnrService.getRemarkText('U14/-');
  //   if (u14.indexOf(airline + 'PASS') > -1) {
  //     const passCancelledRemark = new Map<string, string>();
  //     passCancelledRemark.set('CancelAirlineCodePassChg', airline);
  //     this.remarksManager.createPlaceholderValues(passCancelledRemark);
  //   }
  // }

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
    if (comm === undefined) {
      comm = '0.00';
    }
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
      const exchangeIndicatorRemark = new Map<string, string>();

      let totalBaseAmount = parseFloat(account.baseAmount);
      let totalGst = parseFloat(account.gst);
      let totalHst = parseFloat(account.hst);
      let totalQst = parseFloat(account.qst);

      exchangeIndicatorRemark.set('AirTicketId', (accountingRemarks.indexOf(account) + 1).toString());
      exchangeIndicatorRemark.set('TktRemark', 'EXCH');
      this.remarksManager.createPlaceholderValues(exchangeIndicatorRemark);

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

      
      const airlineCorporatePassCondition = new Map<string, string>();
      airlineCorporatePassCondition.set('AirlineCorporatePass', 'false');
      const tattooNumbers = this.pnrService.getTatooNumberFromSegmentNumber(account.segmentNo.split(','));
      this.remarksManager.createPlaceholderValues(
        null,
        airlineCorporatePassCondition,
        tattooNumbers,
        null,
        'THE AIRLINE TICKET CHARGE ON THIS ITINERARY/INVOICE'
      );

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
      if (account.accountingTypeRemark === 'NONBSP' || account.accountingTypeRemark === 'RAIL') {
        this.tktNonBSPRail(account, segmentAssoc, totalcostlist, uniqueairlineCode, itiRemarks);
      }
      if (account.accountingTypeRemark === 'APAY' && parseFloat(account.baseAmount) > 0) {
        this.tktApay(account, segmentAssoc, itiRemarks);
        hasApay = true;
      }
      this.remarksManager.createPlaceholderValues(itiRemarks, null, segmentAssoc);
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
      // const ebRemark = new Map<string, string>();
      // ebRemark.set('TouchLevelCA', 'AMA/-GIS');
      // this.remarksManager.createPlaceholderValues(ebRemark);

      const map = new Map<string, string>();
      map.set('TouchLevel', 'AM');
      map.set('OBTVendorCode', 'A');
      map.set('TouchType', 'GI');
      map.set('TouchReason', 'S');
      this.remarksManager.createPlaceholderValues(map);

    }
  }

  private tktApay(account: MatrixAccountingModel, segmentAssoc: string[], itiRemarks: Map<string, string>) {
    this.writeTicketingPenalty(account.tkMacLine.toString(), account.supplierCodeName,
      account.baseAmount, account.gst, account.hst, account.qst, account.otherTax, segmentAssoc);
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
    itiRemarks.set('TotalTax', this.decPipe
      .transform(totalTax, '1.2-2')
      .replace(',', '')
      .toString());
    const ccVendor = this.pnrService.getCCVendorCode();
    if (ccVendor !== '') {
      itiRemarks.set('CCVendor', ccVendor);
    }
  }

  private tktNonBSPRail(account: MatrixAccountingModel, segmentAssoc: string[],
                        totalcostlist: any[], uniqueairlineCode: string, itiRemarks: Map<string, string>) {
    this.writeTicketingLine(account.tkMacLine.toString(), account.baseAmount, account.gst, account.hst, account.qst, account.otherTax,
      account.commisionWithoutTax, segmentAssoc, account.supplierCodeName, account.tktLine);
    // if (account.accountingTypeRemark === 'NONBSP') {
    const totalCost = parseFloat(account.baseAmount) +
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
    // }
  }

  private createRemarks(keys, values, statictext?, segments?, conditionsKeys?, conditionValues?) {
    const map = new Map<string, string>();
    const conditions = new Map<string, string>();
    if (keys) {
      keys.forEach((key, i) => {
        map.set(key, values[i]);
      });
    }
    if (conditionsKeys) {
      conditionsKeys.forEach((ckey, i) => {
        conditions.set(ckey, conditionValues[i]);
      });
    }

    this.remarksManager.createPlaceholderValues(map, conditions, segments, null, statictext);
  }

  private GetSegmentAssociation(account: MatrixAccountingModel) {
    const segmentNos = account.segmentNo.split(',');
    const segmentDetails = this.pnrService.getSegmentList();
    const segmentAssoc = new Array<string>();
    let uniqueairlineCode = '';
    segmentNos.forEach((segs) => {
      const look = segmentDetails.find((x) => segs === x.lineNo);
      if (look) {
        uniqueairlineCode = (look.airlineCode) ? look.airlineCode : look.vendorCode;
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
          remGroup.deleteSegmentByIds.push(element.lineNo);
        });
      }

      if (account.accountingTypeRemark === 'NONBSPEXCHANGE') {
        remGroup.deleteRemarkByIds.push(this.getRemarkNumbers('THE AIRLINE TICKET CHARGE ON THIS ITINERARY/INVOICE'));
        remGroup.deleteRemarkByIds.push(this.getRemarkNumbers('IS FOR INTERNAL COST RE-ALLOCATION PURPOSES ONLY.'));
        remGroup.deleteRemarkByIds.push(this.getRemarkNumbers('**PLEASE DO NOT EXPENSE** THIS CHARGE AS IT WILL NOT APPEAR'));
        remGroup.deleteRemarkByIds.push(this.getRemarkNumbers('ON YOUR CREDIT CARD STATEMENT.'));
      }
    });

    return remGroup;
  }

  getRemarkNumbers(searchText: string) {
    const lineNos: any = new Array<string>();
    for (const ri of this.pnrService.pnrObj.rirElements) {
      const text = ri.fullNode.miscellaneousRemarks.remarks.freetext;
      if (text.indexOf(searchText) === 0) {
        lineNos.push(ri.elementNumber);
      }
    }
    return lineNos;
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
      case 'ANCPP':
        airline = '4N';
        break;
      case 'PCCPP':
        airline = '8P';
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

  writeCorporateReceiptRemarks(nonAcceptance: NonAcceptanceComponent) {
    let rln = 1;
    nonAcceptance.unticketedSegments.forEach((x) => {
      if (nonAcceptance.tstSelected.includes(x.tstNumber)) {
        let remarkSet = new Map<string, string>();
        let glCode: string;
        remarkSet.set('PAXLastName', x.paxName.split('-')[1]);

        if (x.paxName.split('-')[0].includes('MR')) {
          remarkSet.set(
            'PAXFirstName',
            x.paxName
              .split('-')[0]
              .replace('MR', '')
              .trim()
          );
        } else if (x.paxName.split('-')[0].includes('MS')) {
          remarkSet.set(
            'PAXFirstName',
            x.paxName
              .split('-')[0]
              .replace('MS', '')
              .trim()
          );
        } else if (x.paxName.split('-')[0].includes('MRS')) {
          remarkSet.set(
            'PAXFirstName',
            x.paxName
              .split('-')[0]
              .replace('MRS', '')
              .trim()
          );
        } else {
          remarkSet.set('PAXFirstName', x.paxName.split('-')[0]);
        }

        if (x.cost) {
          remarkSet.set('TotalCost', x.cost);
        }
        remarkSet.set('RlnNo', rln.toString());
        this.remarksManager.createPlaceholderValues(remarkSet);

        remarkSet = new Map<string, string>();
        remarkSet.set('CCVendor', x.ccVendor);

        let ccN = '';
        if (x.ccNumber) {
          // tslint:disable-next-line: no-string-literal
          const look = nonAcceptance.nonAcceptanceForm.controls['segments'].value;
          ccN = look[look.findIndex((z) => z.ccVendor === x.ccVendor)].ccNo;
        }
        if (x.ccVendor === 'VI') {
          glCode = '115000';
        } else if (x.ccVendor === 'CA') {
          glCode = '116000';
        } else if (x.ccVendor === 'AX') {
          glCode = '117000';
        }

        remarkSet.set('CCExp', x.ccExp);
        remarkSet.set('RlnNo', rln.toString());
        remarkSet.set('GlCode', glCode);
        remarkSet.set('CCNo', ccN.toString());
        this.remarksManager.createPlaceholderValues(remarkSet);

        remarkSet = new Map<string, string>();
        remarkSet.set('RlnNo', rln.toString());
        this.remarksManager.createPlaceholderValues(remarkSet);

        rln += 1;
      }
    });
  }
}
