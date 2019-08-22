import { Injectable } from '@angular/core';
import { RemarksManagerService } from './remarks-manager.service';
import { MatrixAccountingModel } from 'src/app/models/pnr/matrix-accounting.model';
import { AccountingRemarkComponent } from 'src/app/corporate/payments/accounting-remark/accounting-remark.component';
import { DatePipe } from '@angular/common';
import { PassiveSegmentModel } from 'src/app/models/pnr/passive-segment.model';


@Injectable({
  providedIn: 'root'
})
export class PaymentRemarkService {
  pnrService: any;

  constructor(private remarksManager: RemarksManagerService) { }

  writeAccountingReamrks(accountingComponents: AccountingRemarkComponent) {
    const accList = accountingComponents.accountingRemarks;
    // tslint:disable-next-line:max-line-length
    this.writePassPurchase(accList.filter((x) => x.accountingTypeRemark === 'ACPP' || x.accountingTypeRemark === 'WCPP' || x.accountingTypeRemark === 'PCPP'));
  }

  writePassPurchase(accountingRemarks: MatrixAccountingModel[]) {
    accountingRemarks.forEach((account) => {
      const paymentRemark = new Map<string, string>();
      paymentRemark.set('PassName', account.passPurchase);
      paymentRemark.set('FareType', account.fareType);

      const airlineCodeRemark = new Map<string, string>();
      airlineCodeRemark.set('AirlineCode', 'AC');
      airlineCodeRemark.set('TotalCost', account.baseAmount);
      this.remarksManager.createPlaceholderValues(airlineCodeRemark);
    });
  }

  addSegmentForPassPurchase(accounting, remGroup) {
    const air = this.pnrService
      .getSegmentTatooNumber()
      .find((x) => x.segmentType === 'AIR' && x.controlNumber === accounting.supplierConfirmatioNo);

    if (!air) {
      const noOfPassenger = this.pnrService.getPassengers().length;
      const datePipe = new DatePipe('en-US');
      // add dummy segment
      const passive = new PassiveSegmentModel();
      passive.startPoint = accounting.departureCity;
      passive.endPoint = accounting.departureCity;
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
      passive.controlNo = accounting.supplierConfirmatioNo;
      passive.flightNo = '123';
      //  passive.confirmationNo = accounting.supplierConfirmatioNo;
      remGroup.passiveSegments = [];
      remGroup.passiveSegments.push(passive);
    }
  }
}


