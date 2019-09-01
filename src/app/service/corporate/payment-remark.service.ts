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
    this.writePassPurchase(
      accList.filter((x) => x.accountingTypeRemark === 'ACPP' || x.accountingTypeRemark === 'WCPP' || x.accountingTypeRemark === 'PCPP')
    );
  }

  writePassPurchase(accountingRemarks: MatrixAccountingModel[]) {
    accountingRemarks.forEach((account) => {
      const paymentRemark = new Map<string, string>();
      const airlineCodeRemark = new Map<string, string>();
      const ticketRemarks = new Map<string, string>();
      const ticketAmountRemarks = new Map<string, string>();
      const airlineCodeInvoice = new Map<string, string>();
      const staticRemarksCondition = new Map<string, string>();

      switch (account.accountingTypeRemark) {
        case 'ACPP':
          paymentRemark.set('PassName', account.passPurchase);
          paymentRemark.set('FareType', account.fareType);
          airlineCodeRemark.set('AirlineCode', 'AC');
          airlineCodeInvoice.set('AirlineCode', 'AC');
          break;
        case 'WCPP':
          airlineCodeRemark.set('AirlineCode', 'WS');
          airlineCodeInvoice.set('AirlineCode', 'WS');
          paymentRemark.set('PassNameNonAc', account.passPurchase);
          break;
        case 'PCPP':
          airlineCodeRemark.set('AirlineCode', 'PD');
          airlineCodeInvoice.set('AirlineCode', 'PD');
          paymentRemark.set('PassNameNonAc', account.passPurchase);
          break;
      }

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
      highFareRemark.set('CAAirHighFare', this.decPipe.transform(totalCost, '1.2-2').replace(',', ''));

      const lowFareRemark = new Map<string, string>();
      lowFareRemark.set('CAAirLowFare', this.decPipe.transform(totalCost, '1.2-2').replace(',', ''));
      airlineCodeRemark.set('TotalCost', this.decPipe.transform(totalCost, '1.2-2').replace(',', ''));

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
