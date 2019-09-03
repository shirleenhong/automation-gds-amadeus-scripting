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

  constructor(private remarksManager: RemarksManagerService, private pnrService: PnrService, private rms: RemarksManagerService) {}

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
      const ticketRemarks = new Map<string, string>();
      const ticketAmountRemarks = new Map<string, string>();
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
      ticketRemarks.set('TktRemarkNbr', account.tkMacLine.toString());
      if (account.tktLine) {
        ticketRemarks.set('TktNbr', account.tktLine);
        // delete exsting remark that has no tktnbr
        this.rms.createEmptyPlaceHolderValue(['TktRemarkNbr', 'SupplierCode']);
      } else {
        this.rms.createEmptyPlaceHolderValue(['TktRemarkNbr', 'TktNbr', 'SupplierCode']);
      }
      ticketRemarks.set('SupplierCode', account.supplierCodeName);

      ticketAmountRemarks.set('TktRemarkNbr', account.tkMacLine.toString());
      ticketAmountRemarks.set('BaseAmt', account.baseAmount);
      ticketAmountRemarks.set('Gst', account.gst);
      ticketAmountRemarks.set('Hst', account.hst);
      ticketAmountRemarks.set('Qst', account.qst);
      ticketAmountRemarks.set('Comm', account.commisionWithoutTax);
      staticRemarksCondition.set('PassPurchase', 'true');

      const segmentrelate: string[] = [];
      this.getRemarkSegmentAssociation(account, segmentrelate);

      const totalCost = parseFloat(account.baseAmount) + parseFloat(account.gst) + parseFloat(account.hst) + parseFloat(account.qst);
      const highFareRemark = new Map<string, string>();
      highFareRemark.set('CAAirHighFare', totalCost.toString());

      const lowFareRemark = new Map<string, string>();
      lowFareRemark.set('CAAirLowFare', totalCost.toString());

      const airReasonCodeRemark = new Map<string, string>();
      airReasonCodeRemark.set('CAAirRealisedSavingCode', 'L');

      this.remarksManager.createPlaceholderValues(highFareRemark, null, segmentrelate);
      this.remarksManager.createPlaceholderValues(lowFareRemark, null, segmentrelate);
      this.remarksManager.createPlaceholderValues(airReasonCodeRemark, null, segmentrelate);
      this.remarksManager.createPlaceholderValues(paymentRemark, null, segmentrelate);
      this.remarksManager.createPlaceholderValues(ticketRemarks, null, segmentrelate);
      this.remarksManager.createPlaceholderValues(ticketAmountRemarks, null, segmentrelate);
      this.remarksManager.createPlaceholderValues(airlineCodeRemark);
      this.remarksManager.createPlaceholderValues(airlineCodeInvoice);

      this.remarksManager.createPlaceholderValues(null, staticRemarksCondition, null, null, 'ALL DETAILS DISCUSSED AND');
      this.remarksManager.createPlaceholderValues(null, staticRemarksCondition, null, null, 'APPROVED BY CLIENT.');
      this.remarksManager.createPlaceholderValues(null, staticRemarksCondition, null, null, 'CHARGE TO CLIENTS CREDIT CARD');
      this.remarksManager.createPlaceholderValues(null, staticRemarksCondition, null, null, 'AUTHORIZED BY CLIENT.');
    });
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
      const airlineCodeRemark        = new Map<string, string>();
      const paymentRemark            = new Map<string, string>();
      const ticketRemarks            = new Map<string, string>();
      const ticketAmountRemarks      = new Map<string, string>();
      const airlineCodeInvoice       = new Map<string, string>();
      const staticRemarksCondition   = new Map<string, string>();

      // Remarks specific to Non BSP Exchange
      const consultantNoRemark       = new Map<string, string>();
      const consultantNoRemarkStatic = new Map<string, string>();
      const separatePenaltyRemark    = new Map<string, string>();
      // const powerExpressCostRemark   = new Map<string, string>();

      paymentRemark.set('PassNameNonAc', account.passPurchase);
      ticketRemarks.set('AirlineRecordLocator', account.airlineRecordLocator);
      airlineCodeRemark.set('TotalCost', account.baseAmount);

      ticketRemarks.set('TktRemarkNbr', account.tkMacLine.toString()); 
      ticketRemarks.set('TktNbr', account.tktLine);
      ticketRemarks.set('SupplierCode', account.supplierCodeName);

      const segmentrelate: string[] = [];
      this.getRemarkSegmentAssociation(account, segmentrelate);

      // US11134 - Section 8.
      debugger;
      if (parseFloat(account.penaltyBaseAmount) === 0 && account.supplierCodeName !== 'ACY') {
        // DONE
        ticketAmountRemarks.set('TktRemarkNbr', account.tkMacLine.toString());
        ticketAmountRemarks.set('BaseAmt', account.baseAmount);
        ticketAmountRemarks.set('Gst', account.gst);
        ticketAmountRemarks.set('Hst', account.hst);
        ticketAmountRemarks.set('Qst', account.qst);
        ticketAmountRemarks.set('Comm', account.commisionWithoutTax);
        this.remarksManager.createPlaceholderValues(ticketAmountRemarks, null, segmentrelate);
      }
      if (parseFloat(account.penaltyBaseAmount) > 0 && account.supplierCodeName !== 'ACY') {
        // DONE
        ticketAmountRemarks.set('TktRemarkNbr', account.tkMacLine.toString());
        ticketAmountRemarks.set('BaseAmt', (parseFloat(account.baseAmount) + parseFloat(account.penaltyBaseAmount)).toString());
        ticketAmountRemarks.set('Gst', (parseFloat(account.gst) + parseFloat(account.penaltyGst)).toString());
        ticketAmountRemarks.set('Hst', (parseFloat(account.hst) + parseFloat(account.penaltyHst)).toString());
        ticketAmountRemarks.set('Qst', (parseFloat(account.qst) + parseFloat(account.penaltyQst)).toString());
        ticketAmountRemarks.set('Comm', account.commisionWithoutTax);
        this.remarksManager.createPlaceholderValues(ticketAmountRemarks, null, segmentrelate);
      }
      if (parseFloat(account.penaltyBaseAmount) > 0 && account.supplierCodeName === 'ACY') {
        // DOING
        debugger;
        ticketAmountRemarks.set('TktRemarkNbr', account.tkMacLine.toString());
        ticketAmountRemarks.set('BaseAmt', account.baseAmount);
        ticketAmountRemarks.set('Gst', account.gst);
        ticketAmountRemarks.set('Hst', account.hst);
        ticketAmountRemarks.set('Qst', account.qst);
        ticketAmountRemarks.set('Comm', account.commisionWithoutTax);
        this.remarksManager.createPlaceholderValues(ticketAmountRemarks, null, segmentrelate);

        // test: this works
        // separatePenaltyRemark.set('TktRemarkNbr', account.tkMacLine.toString());
        // separatePenaltyRemark.set('BaseAmt', '999');
        // separatePenaltyRemark.set('Gst', '999');
        // separatePenaltyRemark.set('Hst', '999');
        // separatePenaltyRemark.set('Qst', '999');
        // separatePenaltyRemark.set('Comm', '999');
        // this.remarksManager.createPlaceholderValues(separatePenaltyRemark, null, segmentrelate);

        // doing: not working
        separatePenaltyRemark.set('TktRemarkNbr', account.tkMacLine.toString());
        separatePenaltyRemark.set('PenaltyAmt', account.penaltyBaseAmount);
        separatePenaltyRemark.set('PenaltyGst', account.penaltyGst);
        separatePenaltyRemark.set('PenaltyHst', account.penaltyHst);
        separatePenaltyRemark.set('PenaltyQst', account.penaltyQst);
        ticketAmountRemarks.set('Comm', account.commisionWithoutTax);
        this.remarksManager.createPlaceholderValues(separatePenaltyRemark, null, segmentrelate);
      }

      // TODO: Write Power Express Cost Remark in US11134, Section 9.
      // powerExpressCostRemark.set('', '');

      // DOING: Optional Consultant No. See US11134 - Section 10
      // TODO: Check DB script
      if (consultantNoRemark) {
        consultantNoRemark.set('ConsultantNo', account.penaltyBaseAmount);
        consultantNoRemarkStatic.set('ConsultantNoStatic', 'true');
        this.remarksManager.createPlaceholderValues(consultantNoRemark, null, segmentrelate);
        this.remarksManager.createPlaceholderValues(null, consultantNoRemarkStatic, null, null, 'RM*NUC');
      }

      // TODO: Build other remarks in US11134

      // TODO: Search for existing RM*U14-[airline_Code]PASS in US11134, Section 11.
      // TODO: Write GDS Fare

      this.remarksManager.createPlaceholderValues(paymentRemark, null, segmentrelate);
      this.remarksManager.createPlaceholderValues(ticketRemarks, null, segmentrelate);
      // this.remarksManager.createPlaceholderValues(ticketAmountRemarks, null, segmentrelate);
      this.remarksManager.createPlaceholderValues(airlineCodeRemark);
      this.remarksManager.createPlaceholderValues(airlineCodeInvoice);

      // DOING
      // US11134 - Section 12
      staticRemarksCondition.set('IsNonBSPExchange', 'false');
      this.remarksManager.createPlaceholderValues(null, staticRemarksCondition, null, null, 'THE AIRLINE TICKET CHARGE ON THIS ITINERARY/INVOICE');
      this.remarksManager.createPlaceholderValues(null, staticRemarksCondition, null, null, 'IS FOR INTERNAL COST RE - ALLOCATION PURPOSES ONLY.');
      this.remarksManager.createPlaceholderValues(null, staticRemarksCondition, null, null, '**PLEASE DO NOT EXPENSE** THIS CHARGE AS IT WILL NOT APPEAR');
      this.remarksManager.createPlaceholderValues(null, staticRemarksCondition, null, null, 'ON YOUR CREDIT CARD STATEMENT.');
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

  extractAccountingModelFromPnr() {
    const accountingRemarks = new Array<MatrixAccountingModel>();
    const model = new MatrixAccountingModel();

    model.tkMacLine = Number.parseInt(this.rms.getValue('TktRemarkNbr')[0]);

    if (model.tkMacLine) {
      const pholder = this.rms.getMatchedPlaceHoldersWithKey('TktRemarkNbr');
      const slineNo = pholder[0].segmentNumberReferences[0];
      const segment = this.pnrService.getSegmentTatooNumber().filter((x) => x.tatooNo === slineNo);

      if (segment.length > 0) {
        model.departureCity = segment[0].cityCode;
        model.supplierConfirmatioNo = segment[0].controlNumber;
      }
      model.fareType = this.rms.getValue('FareType')[0];
      model.tktLine = this.rms.getValue('TktNbr')[0];
      model.supplierCodeName = this.rms.getValue('SupplierCode')[0];
      model.baseAmount = this.rms.getValue('BaseAmt')[0];
      model.gst = this.rms.getValue('Gst')[0];
      model.hst = this.rms.getValue('Hst')[0];
      model.qst = this.rms.getValue('Qst')[0];
      model.commisionWithoutTax = this.rms.getValue('Comm')[0];

      const airlinecode = this.rms.getValue('AirlineCode')[0];
      const totalcost = this.rms.getValue('TotalCost')[0];

      if (totalcost) {
        switch (airlinecode) {
          case 'AC':
            model.accountingTypeRemark = 'ACPP';
            model.passPurchase = this.rms.getValue('PassName')[0];
            break;
          case 'WS':
            model.accountingTypeRemark = 'WCPP';
            model.passPurchase = this.rms.getValue('PassNameNonAc')[0];
            break;
          case 'PD':
            model.accountingTypeRemark = 'PCPP';
            model.passPurchase = this.rms.getValue('PassNameNonAc')[0];
            break;
        }
      }

      accountingRemarks.push(model);
    }

    return accountingRemarks;
  }
}
