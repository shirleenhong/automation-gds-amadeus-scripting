import { Injectable } from '@angular/core';
import { RemarksManagerService } from './remarks-manager.service';
import { MatrixAccountingModel } from 'src/app/models/pnr/matrix-accounting.model';
import { AccountingRemarkComponent } from 'src/app/corporate/payments/accounting-remark/accounting-remark.component';
import { DatePipe } from '@angular/common';
import { PassiveSegmentModel } from 'src/app/models/pnr/passive-segment.model';
import { RemarkGroup } from 'src/app/models/pnr/remark.group.model';
import { RemarkModel } from 'src/app/models/pnr/remark.model';
import { PnrService } from '../pnr.service';



@Injectable({
  providedIn: 'root'
})
export class PaymentRemarkService {

  constructor(private remarksManager: RemarksManagerService, private pnrService: PnrService,
    private rms: RemarksManagerService) { }

  writeAccountingReamrks(accountingComponents: AccountingRemarkComponent) {
    const accList = accountingComponents.accountingRemarks;
    // tslint:disable-next-line:max-line-length
    this.writePassPurchase(accList.filter((x) => x.accountingTypeRemark === 'ACPP' || x.accountingTypeRemark === 'WCPP' || x.accountingTypeRemark === 'PCPP'));
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
      ticketRemarks.set('TktNbr', account.tktLine);
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
   * Write NonBSPExchange remarks to PNR.
   * Refer to US11134
   * 
   * @param accountingRemarks collection of NonBSP Exchange remarks
   */
  writeNonBSPExchange(accountingRemarks: MatrixAccountingModel[]) {
    debugger;
    accountingRemarks.forEach((account) => {
      const paymentRemark = new Map<string, string>();
      paymentRemark.set('PassName', account.passPurchase);
      paymentRemark.set('FareType', account.fareType);
      this.remarksManager.createPlaceholderValues(paymentRemark);

      const airlineCodeRemark = new Map<string, string>();
      airlineCodeRemark.set('AirlineCode', 'AC');
      airlineCodeRemark.set('TotalCost', account.baseAmount);
      this.remarksManager.createPlaceholderValues(airlineCodeRemark);
    });
  }

  addSegmentForPassPurchase(accounting: MatrixAccountingModel[]) {
    const remGroup = new RemarkGroup();
    remGroup.group = 'Accounting Remark';
    remGroup.remarks = new Array<RemarkModel>();
    remGroup.passiveSegments = [];

    if (accounting !== null) {
      accounting.forEach((account) => {
        const air = this.pnrService
          .getSegmentTatooNumber()
          .find((x) => x.segmentType === 'AIR' && x.controlNumber === account.supplierConfirmatioNo);

        if (!air) {
          const noOfPassenger = this.pnrService.getPassengers().length;
          const datePipe = new DatePipe('en-US');
          // add dummy segment
          const passive = new PassiveSegmentModel();
          passive.startPoint = account.departureCity;
          passive.endPoint = account.departureCity;
          passive.startDate = datePipe.transform(new Date(), 'ddMMyy');
          passive.vendor = 'AC';
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

  getRemarkSegmentAssociation(account: MatrixAccountingModel, segmentrelate: string[]) {
    const air = this.pnrService
      .getSegmentTatooNumber()
      .filter((x) => x.segmentType === 'AIR' && x.controlNumber === account.supplierConfirmatioNo
        && x.cityCode === account.departureCity && x.arrivalAirport === account.departureCity);

    air.forEach(airElement => {
      segmentrelate.push(airElement.tatooNo);
    });
  }

  extractAccountingModelFromPnr() {
    let accountingRemarks = new Array<MatrixAccountingModel>();
    // let model: MatrixAccountingModel;
    let placeholder: string[];
    placeholder = ['PassName', 'FareType'];

    let passPurchase = this.rms.getMatchedPlaceHoldersWithExactKeys(placeholder);
    // model.passPurchase = passPurchase.pl  .get('PassName'); 
    // let test1 = this.rms.getMatchedPlaceHoldersWithKey('PassName');
    // let test2 = this.rms.getValue('PassName');
    console.log(passPurchase);

    return accountingRemarks;
  }
}


