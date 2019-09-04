import { Injectable } from '@angular/core';
import { RemarksManagerService } from './remarks-manager.service';
import { MatrixAccountingModel } from 'src/app/models/pnr/matrix-accounting.model';
import { AccountingRemarkComponent } from 'src/app/corporate/payments/accounting-remark/accounting-remark.component';
import { DatePipe, DecimalPipe } from '@angular/common';
import { PassiveSegmentModel } from 'src/app/models/pnr/passive-segment.model';
import { RemarkGroup } from 'src/app/models/pnr/remark.group.model';
import { RemarkModel } from 'src/app/models/pnr/remark.model';
import { PnrService } from '../pnr.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentRemarkService {
  decPipe = new DecimalPipe('en-US');

  constructor(private remarksManager: RemarksManagerService, private pnrService: PnrService, private rms: RemarksManagerService) { }

  writeAccountingReamrks(accountingComponents: AccountingRemarkComponent) {
    const accList = accountingComponents.accountingRemarks;
    // tslint:disable-next-line:max-line-length
    this.writePassPurchase(
      accList.filter((x) => x.accountingTypeRemark === 'ACPP' || x.accountingTypeRemark === 'WCPP' || x.accountingTypeRemark === 'PCPP')
    );

    // Write Non BSP Exhange Remarks
    this.writeNonBSPExchange(accList.filter((x) => x.accountingTypeRemark === 'NONBSPEXCHANGE'));
  }

  writePassPurchase(accountingRemarks: MatrixAccountingModel[]) {
    accountingRemarks.forEach((account) => {
      const paymentRemark = new Map<string, string>();
      const airlineCodeRemark = new Map<string, string>();
      const airlineCodeInvoice = new Map<string, string>();
      const staticRemarksCondition = new Map<string, string>();

      if (account.accountingTypeRemark === 'ACPP') {
        paymentRemark.set('PassName', account.passPurchase);
        paymentRemark.set('FareType', account.fareType);
        airlineCodeRemark.set('AirlineCode', 'AC');
        airlineCodeInvoice.set('AirlineCode', 'AC');
      } else {
        if (account.accountingTypeRemark === 'WCPP') {
          airlineCodeRemark.set('AirlineCode', 'WS');
          airlineCodeInvoice.set('AirlineCode', 'WS');
        } else {
          airlineCodeRemark.set('AirlineCode', 'PD');
          airlineCodeInvoice.set('AirlineCode', 'PD');
        }
        paymentRemark.set('PassNameNonAc', account.passPurchase);
      }

      airlineCodeRemark.set('TotalCost', account.baseAmount);
      const segmentrelate: string[] = [];
      this.getRemarkSegmentAssociation(account, segmentrelate);

      this.writeTicketingLine(account.tkMacLine.toString(), account.baseAmount, account.gst,
        account.hst, account.qst, account.commisionWithoutTax, segmentrelate, account.supplierCodeName, account.tktLine);

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
    });
  }

  writeHighLowFareSavingCode(highFare, lowFare, savingsCode, segmentAssoc) {
    const highFareRemark = new Map<string, string>();
    const lowFareRemark = new Map<string, string>();
    const airReasonCodeRemark = new Map<string, string>();

    highFareRemark.set('CAAirHighFare', this.decPipe.transform(highFare, '1.2-2').replace(',', ''));
    lowFareRemark.set('CAAirHighFare', this.decPipe.transform(lowFare, '1.2-2').replace(',', ''));
    airReasonCodeRemark.set('CAAirRealisedSavingCode', savingsCode);

    this.remarksManager.createPlaceholderValues(highFareRemark, null, segmentAssoc);
    this.remarksManager.createPlaceholderValues(lowFareRemark, null, segmentAssoc);
    this.remarksManager.createPlaceholderValues(airReasonCodeRemark, null, segmentAssoc);

  }

  writeTicketingLine(tktNo, baseAmount, gst, hst, qst, comm, segmentrelate, supplierCodeName, tktline?) {
    const ticketAmountRemarks = new Map<string, string>();
    ticketAmountRemarks.set('TktRemarkNbr', tktNo.toString());
    ticketAmountRemarks.set('BaseAmt', baseAmount);
    ticketAmountRemarks.set('Gst', gst);
    ticketAmountRemarks.set('Hst', hst);
    ticketAmountRemarks.set('Qst', qst);
    ticketAmountRemarks.set('Comm', comm);
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
    debugger;
    accountingRemarks.forEach((account) => {
      const originalTicketRemarks = new Map<string, string>();
      const originalTicketCondition = new Map<string, string>();
      const airlineCodeRemark = new Map<string, string>();
      const cnNumberRemarks = new Map<string, string>();
      const passchange = new Map<string, string>();
      const gdsFare = new Map<string, string>();
      const consultantNoRemarkStatic = new Map<string, string>();
      const separatePenaltyRemark = new Map<string, string>();

      if (account.originalTktLine) {
        originalTicketRemarks.set('OriginalTicketNumber', account.originalTktLine);
      } else {
        originalTicketCondition.set('NoOriginalTicket', 'true');
      }

      const segmentrelate: string[] = [];
      this.getRemarkSegmentAssociation(account, segmentrelate);

      if (parseFloat(account.penaltyBaseAmount) > 0 && account.supplierCodeName === 'ACY') {
        separatePenaltyRemark.set('TktRemarkNbr', account.tkMacLine.toString());
        separatePenaltyRemark.set('VnCode', 'A22');
        separatePenaltyRemark.set('PenaltyAmt', account.penaltyBaseAmount);
        separatePenaltyRemark.set('PenaltyGst', account.penaltyGst);
        separatePenaltyRemark.set('PenaltyHst', account.penaltyHst);
        separatePenaltyRemark.set('PenaltyQst', account.penaltyQst);
        separatePenaltyRemark.set('OtherTax', '0.00');
      }
      if (parseFloat(account.penaltyBaseAmount) > 0 && account.supplierCodeName !== 'ACY') {
        this.writeTicketingLine(
          account.tkMacLine.toString(),
          (parseFloat(account.baseAmount) + parseFloat(account.penaltyBaseAmount)).toString(),
          (parseFloat(account.gst) + parseFloat(account.penaltyGst)).toString(),
          (parseFloat(account.hst) + parseFloat(account.penaltyHst)).toString(),
          (parseFloat(account.qst) + parseFloat(account.penaltyQst)).toString(),
          account.commisionWithoutTax,
          segmentrelate,
          account.supplierCodeName,
          account.tktLine
        );
      } else {
        this.writeTicketingLine(account.tkMacLine.toString(), account.baseAmount, account.gst,
          account.hst, account.qst, account.commisionWithoutTax, segmentrelate, account.supplierCodeName, account.tktLine);
      }

      const totalCost = parseFloat(account.baseAmount) + parseFloat(account.gst) + parseFloat(account.hst)
        + parseFloat(account.qst) + parseFloat(account.commisionWithoutTax);

      airlineCodeRemark.set('AirlineCode', 'AC');
      airlineCodeRemark.set('TotalCost', totalCost.toString());
      this.remarksManager.createPlaceholderValues(airlineCodeRemark);

      // Consultant Number
      if (account.consultantNo !== '') {
        cnNumberRemarks.set('CnNumber', account.consultantNo);
        this.remarksManager.createPlaceholderValues(cnNumberRemarks);
        consultantNoRemarkStatic.set('IsNuc', 'true');
        this.remarksManager.createPlaceholderValues(null, consultantNoRemarkStatic, null, null, 'NUC');
      }

      if (this.pnrService.hasPassRemark) {
        passchange.set('ExchangeAirlineCode', 'AC');
        this.remarksManager.createPlaceholderValues(passchange);
      }

      if (gdsFare) {
        gdsFare.set('AirlineCode', 'AC');
        gdsFare.set('PassNumber', account.passPurchase);
        gdsFare.set('FareType', account.fareType);
        gdsFare.set('GdsFare', account.gdsFare.toString());
        this.remarksManager.createPlaceholderValues(passchange);
      }

      this.remarksManager.createPlaceholderValues(null, originalTicketCondition, null, null, 'NE/-EX-Y');
      this.remarksManager.createPlaceholderValues(originalTicketRemarks);
      this.remarksManager.createPlaceholderValues(separatePenaltyRemark, null, segmentrelate);
    });
  }

  /**
   * Get the 2-character reset of the given Airline Code.
   * 
   * @param originalAirlineCode 2-character string
   */
  getAirlineCodeReset(originalAirlineCode: string) {
    let newAirlineCode: string;

    switch (originalAirlineCode) {
      case 'ACY': newAirlineCode = 'AC'; break;
      case 'ACJ': newAirlineCode = 'AC'; break;
      case 'WJ3': newAirlineCode = 'WS'; break;
      case 'WJP': newAirlineCode = 'WS'; break;
      case 'PTA': newAirlineCode = 'PD'; break;
      case 'PTP': newAirlineCode = 'PD'; break;
      case 'CMA': newAirlineCode = '9M'; break;
      case 'C5A': newAirlineCode = 'MO'; break;
      case 'K9P': newAirlineCode = 'YP'; break;
      case 'A5N': newAirlineCode = '4N'; break;
      case 'A5P': newAirlineCode = '4N'; break;
      case 'PF3': newAirlineCode = '8P'; break;
      case 'PSI': newAirlineCode = '8P'; break;
      case 'ALO': newAirlineCode = 'WJ'; break;
      case 'SOA': newAirlineCode = 'WN'; break;
      default: break;
    }

    return newAirlineCode;

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
          .getSegmentTatooNumber()
          .find((x) => x.segmentType === 'AIR' && x.controlNumber === account.supplierConfirmatioNo);

        airline = this.getAirline(account.accountingTypeRemark);

        if (!air) {
          const noOfPassenger = this.pnrService.getPassengers().length;
          const datePipe = new DatePipe('en-US');
          // add dummy segment
          const passive = new PassiveSegmentModel();
          passive.startPoint = account.departureCity;
          passive.endPoint = account.departureCity;
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

  getRemarkSegmentAssociation(account: MatrixAccountingModel, segmentrelate: string[]) {
    const air = this.pnrService
      .getSegmentTatooNumber()
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

  extractAccountingModelsFromPnr() {
    debugger;
    console.log('================ DEBUG extractAccountingModelFromPnr() ================');

    const accountingRemarks = new Array<MatrixAccountingModel>();
    const ticketRemarkNumbers = this.rms.getValue('TktRemarkNbr');

    for (let i = 0; i < ticketRemarkNumbers.length; i++) {
      const model = new MatrixAccountingModel();

      debugger;
      model.tkMacLine = Number.parseInt(ticketRemarkNumbers[i]);

      console.log('ticketRemarkNumber');
      console.log(ticketRemarkNumbers[i]);
      console.log('this.rms.getValue("TktRemarkNbr"):');
      console.log(this.rms.getValue('TktRemarkNbr'));

      if (model.tkMacLine) {
        const pholder = this.rms.getMatchedPlaceHoldersWithKey('TktRemarkNbr');
        const slineNo = pholder[i].segmentNumberReferences[i];
        const segment = this.pnrService.getSegmentTatooNumber().filter((x) => x.tatooNo === slineNo);

        if (segment.length > 0) {
          model.departureCity = segment[i].cityCode;
          model.supplierConfirmatioNo = segment[i].controlNumber;
        }
        model.fareType = this.rms.getValue('FareType')[i];
        model.tktLine = this.rms.getValue('TktNbr')[i];
        debugger;
        model.supplierCodeName = this.rms.getValue('SupplierCode')[i];
        model.baseAmount = this.rms.getValue('BaseAmt')[i];
        model.gst = this.rms.getValue('Gst')[i];
        model.hst = this.rms.getValue('Hst')[i];
        model.qst = this.rms.getValue('Qst')[i];
        model.commisionWithoutTax = this.rms.getValue('Comm')[i];

        const airlinecode = this.rms.getValue('AirlineCode')[i];
        const totalcost = this.rms.getValue('TotalCost')[i];

        if (totalcost) {
          switch (airlinecode) {
            case 'AC':
              model.accountingTypeRemark = 'ACPP';
              model.passPurchase = this.rms.getValue('PassName')[i];
              break;
            case 'WS':
              model.accountingTypeRemark = 'WCPP';
              model.passPurchase = this.rms.getValue('PassNameNonAc')[i];
              break;
            case 'PD':
              model.accountingTypeRemark = 'PCPP';
              model.passPurchase = this.rms.getValue('PassNameNonAc')[i];
              break;
          }
        }

        accountingRemarks.push(model);
      }
    }

    console.log('accountingRemarks');
    console.log(accountingRemarks);
    debugger;

    return accountingRemarks;
  }
}
