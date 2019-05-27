import { Injectable } from '@angular/core';
import { MatrixReceiptModel } from '../models/pnr/matrix-receipt.model';
import { MatrixAccountingModel } from '../models/pnr/matrix-accounting.model';
import { RemarkGroup } from '../models/pnr/remark.group.model';
import { RemarkModel } from '../models/pnr/remark.model';
import { DatePipe, DecimalPipe } from '@angular/common';
import { PnrService } from './pnr.service';
import { RemarkHelper } from '../helper/remark-helper';
import { FormGroup } from '@angular/forms';
import { DDBService } from './ddb.service';
import { AmountPipe } from '../pipes/amount.pipe';
import { AccountingRemarkComponent } from '../payments/accounting-remark/accounting-remark.component';
import { LeisureFeeComponent } from '../payments/leisure-fee/leisure-fee.component';
import { LeisureFeeModel } from '../models/pnr/leisure-fee.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentRemarkService {
  amountPipe = new AmountPipe();
  constructor(
    private pnrService: PnrService,
    private remarkHelper: RemarkHelper,
    private ddbService: DDBService
  ) {}

  accountingRemarks: Array<MatrixAccountingModel>;

  public GetMatrixRemarks(matrixRemarks: MatrixReceiptModel[]) {
    const remGroup = new RemarkGroup();
    remGroup.group = 'Matrix Remark';
    remGroup.remarks = new Array<RemarkModel>();
    remGroup.deleteRemarkByIds = this.pnrService.getMatrixReceiptLineNumbers();
    if (matrixRemarks !== undefined) {
      matrixRemarks.forEach(matrix => {
        if (matrix.bankAccount === '224000') {
          this.processRBCredemptionRemarks(matrix, remGroup.remarks);
        } else {
          this.processOtherPaymentRemarks(matrix, remGroup.remarks);
        }
      });
    }
    return remGroup;
  }

  public GetAccountingRemarks(accountingRemarks: MatrixAccountingModel[]) {
    const remGroup = new RemarkGroup();
    remGroup.group = 'Accounting Remark';
    remGroup.remarks = new Array<RemarkModel>();

    const existingLines = this.pnrService.getMatrixAccountingLineNumbers();
    if (existingLines.length > 0) {
      remGroup.deleteRemarkByIds = existingLines;
    }
    const apays = this.pnrService.getApayRirRemarkLines();
    if (apays !== null && apays.length > 0) {
      if (remGroup.deleteRemarkByIds === undefined) {
        remGroup.deleteRemarkByIds = [];
      }

      apays.forEach(x => {
        remGroup.deleteRemarkByIds.push(x.lineNum);
      });
    }

    if (accountingRemarks !== null) {
      accountingRemarks.forEach(account => {
        this.processAccountingRemarks(account, remGroup.remarks);
      });
    }
    return remGroup;
  }

  public getRemarksModel(
    remText,
    cat,
    type?,
    segment?: string,
    passenger?: string
  ) {
    let segmentrelate = [];
    let passengerRelate = [];
    if (segment) {
      segmentrelate = segment.split(',');
    }

    if (passenger) {
      passengerRelate = passenger.split(',');
    }

    if (type == null) {
      type = 'RM';
    }

    const rem = new RemarkModel();
    rem.category = cat;
    rem.remarkText = remText;
    rem.remarkType = type;
    rem.relatedSegments = this.getSegmentTatooValue(segmentrelate);
    rem.relatedPassengers = this.getPassengerTatooValue(passengerRelate);
    return rem;
  }

  getSegmentTatooValue(segmentrelate) {
    const relatedSegment = [];
    const tatooSegment = this.pnrService.getSegmentTatooNumber();
    segmentrelate.forEach(element => {
      if (tatooSegment.length > 0) {
        const look = tatooSegment.find(x => x.lineNo === element);
        if (look) {
          relatedSegment.push(look.tatooNo);
        }
      }
    });

    return relatedSegment;
  }

  getPassengerTatooValue(passengerRelate) {
    const relatedPassenger = [];
    const tatooPassenger = this.pnrService.getPassengers();
    passengerRelate.forEach(element => {
      if (tatooPassenger.length > 0) {
        const look = tatooPassenger.find(x => x.id === element);
        if (look) {
          relatedPassenger.push(look.tatooNo);
        }
      }
    });

    return relatedPassenger;
  }

  getFOP(modeofPayment, creditCardNo, fopvendorCode, expDate) {
    let fop = '';
    let paymentvendorCode = fopvendorCode;
    const formOfPaymentList = [];
    let payment: { foptxt: string; vendorCode: string };

    switch (modeofPayment) {
      case 'CC': {
        fop =
          'CC' +
          fopvendorCode +
          creditCardNo +
          '/-EXP-' +
          expDate.replace('/', '');
        break;
      }
      case 'AP': {
        fop = 'APVI4111111111111111/-EXP-1229';
        paymentvendorCode = 'VI';
        break;
      }
      default: {
        fop = modeofPayment;
        paymentvendorCode = modeofPayment;
        break;
      }
    }
    payment = { foptxt: fop, vendorCode: paymentvendorCode };
    formOfPaymentList.push(payment);
    return formOfPaymentList;
  }

  getTKTline(tktLine) {
    let tline = '';
    // if (tktLine tktLine !== null && tktLine !== '') {
    if (tktLine) {
      tline = '/-TK-' + tktLine.toString().trim();
    }
    return tline;
  }

  processAccountingRemarks(
    accounting: MatrixAccountingModel,
    remarkList: Array<RemarkModel>
  ) {
    const acc1 =
      'MAC/-SUP-' +
      accounting.supplierCodeName.trim() +
      '/-LK-MAC' +
      accounting.tkMacLine.toString().trim() +
      '/-AMT-' +
      accounting.baseAmount.toString().trim() +
      '/-PT-' +
      accounting.hst.toString().trim() +
      'RC/-PT-' +
      accounting.gst.toString().trim() +
      'XG/-PT-' +
      accounting.qst.toString().trim() +
      'XQ';

    let facc = acc1;

    let line1 = '';

    if (accounting.commisionWithoutTax !== undefined) {
      line1 = 'XT/-CD-' + accounting.commisionWithoutTax.toString().trim();
    }

    let bknLine = '/-BKN-';

    if (accounting.bsp === '3') {
      line1 = '/-CP-' + accounting.commisionPercentage.toString().trim();
      bknLine = '/-BKN-CWT';
    }

    if (accounting.bsp === '1' && accounting.otherTax) {
      facc = acc1 + '/-PT-' + accounting.otherTax.toString().trim();
      // + line1;
    }

    facc = facc + line1;

    const fopObj = this.getFOP(
      accounting.fop,
      accounting.cardNumber,
      accounting.vendorCode,
      accounting.expDate
    );
    const acc2 =
      'MAC/-LK-MAC' +
      accounting.tkMacLine.toString().trim() +
      '/-FOP-' +
      fopObj[0].foptxt +
      this.getTKTline(accounting.tktLine) +
      '/-MP-ALL' +
      bknLine +
      accounting.supplierConfirmatioNo.toString().trim();
    // + '/S' + accounting.segmentNo.toString().trim();
    remarkList.push(
      this.getRemarksModel(
        facc,
        '*',
        'RM',
        '',
        accounting.passengerNo.toString()
      )
    );
    remarkList.push(
      this.getRemarksModel(
        acc2,
        '*',
        'RM',
        accounting.segmentNo.toString(),
        accounting.passengerNo.toString()
      )
    );

    if (accounting.bsp === '2') {
      this.extractApayRemark(accounting, remarkList, fopObj);
    }
  }

  private extractApayRemark(
    accounting: MatrixAccountingModel,
    remarkList: RemarkModel[],
    fopObj: Array<any>
  ) {
    let ttltax: number =
      Number(accounting.gst) + Number(accounting.hst) + Number(accounting.qst);
    ttltax = Math.round(ttltax * 100) / 100;
    const decPipe = new DecimalPipe('en-Us');
    let vcode = '';
    if (accounting.vendorCode) {
      vcode = accounting.vendorCode;
    }

    let acc3 =
      'PAID ' +
      accounting.descriptionapay +
      ' CF-' +
      accounting.supplierConfirmatioNo +
      ' CAD' +
      accounting.baseAmount +
      ' PLUS ' +
      decPipe.transform(ttltax, '1.2-2') +
      ' TAX ON ' +
      fopObj[0].vendorCode;

    const maxlen = this.remarkHelper.getMaxLength('Itinerary');

    if (acc3.length > maxlen) {
      const lessChar: number = acc3.length - Number(maxlen);
      const templen: number =
        accounting.descriptionapay.length - (lessChar + 1);
      const tempdec = accounting.descriptionapay.substr(0, templen);
      acc3 =
        'PAID ' +
        tempdec +
        ' CF-' +
        accounting.supplierConfirmatioNo +
        ' CAD' +
        accounting.baseAmount +
        ' PLUS ' +
        decPipe.transform(ttltax, '1.2-2') +
        ' TAX ON ' +
        fopObj[0].vendorCode;
    }

    remarkList.push(
      this.getRemarksModel(acc3, 'R', 'RI', accounting.segmentNo.toString())
    );
  }

  processRBCredemptionRemarks(
    matrix: MatrixReceiptModel,
    remarkList: Array<RemarkModel>
  ) {
    const rem1 =
      'REC/-RLN-' +
      matrix.rln +
      '/-RF-' +
      matrix.passengerName +
      '/-AMT-' +
      matrix.amount;
    const rem2 =
      'REC/-RLN-' +
      matrix.rln +
      '/-PR' +
      matrix.lastFourVi +
      '/-BA-' +
      matrix.bankAccount +
      '/-GL-' +
      matrix.glCode;
    const rem3 =
      'REC/-RLN-' +
      matrix.rln +
      '/-RM-POINTS ' +
      matrix.points +
      ' REF-' +
      matrix.cwtRef;
    remarkList.push(this.getRemarksModel(rem1, '*', 'RM'));
    remarkList.push(this.getRemarksModel(rem2, '*', 'RM'));
    remarkList.push(this.getRemarksModel(rem3, '*', 'RM'));
  }

  processOtherPaymentRemarks(
    matrix: MatrixReceiptModel,
    remarkList: Array<RemarkModel>
  ) {
    enum CardType {
      VI = '115000',
      MC = '116000',
      AMEX = '117000',
      Diners = '118000'
    }
    const datePipe = new DatePipe('en-US');
    let fop = '';
    if (Object.values(CardType).includes(matrix.bankAccount)) {
      fop =
        'CC' +
        matrix.vendorCode +
        matrix.ccNo +
        '/-EXP-' +
        matrix.expDate.replace('/', '');
    } else {
      fop = matrix.modePayment;
    }

    let gcNo = '';

    if (matrix.gcNumber != null && matrix.gcNumber.toString() !== '') {
      gcNo = '/-GC-' + matrix.gcNumber;
    }

    const rem1 =
      'REC/-RLN-' +
      matrix.rln +
      '/-RF-' +
      matrix.passengerName +
      '/-AMT-' +
      matrix.amount;
    const rem2 =
      'REC/-RLN-' +
      matrix.rln +
      '/-FOP-' +
      fop +
      '/-LK-T/-BA-' +
      matrix.bankAccount +
      '/-GL-' +
      matrix.glCode;
    const rem3 = 'REC/-RLN-' + matrix.rln + '/-RM-' + matrix.description + gcNo;

    remarkList.push(this.getRemarksModel(rem1, '*', 'RM'));
    remarkList.push(this.getRemarksModel(rem2, '*', 'RM'));
    remarkList.push(this.getRemarksModel(rem3, '*', 'RM'));
  }

  public GetLeisureFeeRemarks(comp: LeisureFeeComponent, cfa: string) {
    const fg = comp.leisureFeeForm;
    const feeList = comp.leisureFeeList;
    const remGroup = new RemarkGroup();
    remGroup.group = 'Leisure Fee';
    remGroup.remarks = new Array<RemarkModel>();
    remGroup.deleteRemarkByIds = [];

    let remark = '';
    let lineNums = this.pnrService.getRemarkLineNumbers('SFC/-');
    if (lineNums.length > 0) {
      remGroup.deleteRemarkByIds = remGroup.deleteRemarkByIds.concat(lineNums);
    }

    lineNums = this.pnrService.getRemarkLineNumbers('TAX-');
    if (lineNums.length > 0) {
      remGroup.deleteRemarkByIds = remGroup.deleteRemarkByIds.concat(lineNums);
    }
    lineNums = this.pnrService.getRemarkLineNumbers('TEX/');
    if (lineNums.length > 0) {
      remGroup.deleteRemarkByIds = remGroup.deleteRemarkByIds.concat(lineNums);
    }
    if (feeList.length > 0) {
      remark = 'TAX-' + feeList[0].address;
      remGroup.remarks.push(this.getRemarksModel(remark, 'Y'));

      feeList.forEach(f => {
        remark = this.generateSFCRemark(f);
        remGroup.remarks.push(this.getRemarksModel(remark, '*'));
      });
      const ex = [];
      comp.exemption.forEach(x => {
        if (x.checked) {
          ex.push('-' + x.value);
        }
      });
      if (ex.length > 0) {
        remGroup.remarks.push(this.getRemarksModel('TEX/' + ex.join('/'), '*'));
      }
    }

    const lineNum = this.pnrService.getRemarkLineNumber('U11/-');
    if (lineNum !== '') {
      remGroup.deleteRemarkByIds.push(lineNum);
    }

    if (
      feeList.length === 0 &&
      (cfa !== 'RBM' && cfa !== 'RBP') &&
      fg.get('noFeeReason').value !== ''
    ) {
      // *U11
      const noFeeReason = fg.get('noFeeReason').value;
      remark = 'U11/-' + noFeeReason;
      remGroup.remarks.push(this.getRemarksModel(remark, '*'));
    }

    return remGroup;
  }

  getSegmentValue(value: string) {
    if (value.length > 0) {
      const output = value.split(' ');

      return output[0];
    }
  }

  generateSFCRemark(fee: LeisureFeeModel) {
    let remark = 'SFC';
    switch (fee.segmentAssoc) {
      case '3':
        remark += '/-FA-H' + this.getSegmentValue(fee.segmentNum.toString());
        break;
      case '4':
        remark += '/-FA-C' + this.getSegmentValue(fee.segmentNum.toString());
        break;
      case '1':
      case '2':
        remark += '/-FA-T1';
        break;
    }

    remark += '/-FLN-F' + fee.fln + '/-FP-TRF';
    remark += '/-AMT-CAD' + this.amountPipe.transform(fee.amount);

    remark += this.getProvinceTaxRemark(fee);
    if (fee.paymentType === 'C') {
      remark += '/-FOP-CC' + fee.vendorCode + fee.ccNo;
      remark += '/-EXP-' + fee.expDate.replace('/', '');
    } else {
      remark += '/-FOP-CK';
    }
    return remark;
  }

  getProvinceTaxRemark(fee: LeisureFeeModel) {
    const provTax = this.ddbService
      .getProvinceTax()
      .filter(x => x.provinceCode === fee.address);
    let tax1 = '0.00';
    let tax2 = '0.00';
    let taxType1 = 'XG';
    if (provTax.length > 0) {
      tax1 = this.amountPipe.transform(+fee.amount * +provTax[0].tax1);
      tax2 = this.amountPipe.transform(+fee.amount * +provTax[0].tax2);
      taxType1 = provTax[0].taxType1 === 'GST' ? 'XG' : 'RC';
    }
    let txt = '/-PT-' + tax1 + taxType1;
    txt += '/-PT-' + tax2 + 'XQ';
    return txt;
  }

  public GetAccountingUdids(acc: AccountingRemarkComponent) {
    const fg = acc.accountingForm;
    const remGroup = new RemarkGroup();
    remGroup.group = 'Accounting UDIDs';
    remGroup.remarks = new Array<RemarkModel>();
    remGroup.deleteRemarkByIds = [];
    let remark = '';
    const udids = [
      'U76/-',
      'U71/-',
      'U75/-',
      'U72/-',
      'U73/-',
      'U74/-',
      'U77/-'
    ];
    const values = [
      'airOnly',
      'exclusiveProperty',
      'propertyName',
      'flightType',
      'priceVsSupplier',
      'group',
      'preferredVendor'
    ];
    let i = 0;

    if (acc.isAd1SwgSupplier) {
      udids.forEach(udid => {
        const line = this.pnrService.getRemarkLineNumber(udid);
        if (line === '') {
          const val = fg.get(values[i]).value;
          if (
            val !== null &&
            val !== undefined &&
            val !== '' &&
            !fg.get(values[i]).disabled
          ) {
            remark = udid + val;
            remGroup.remarks.push(this.getRemarksModel(remark, '*'));
          }
        }
        i++;
      });
    } else {
      udids.forEach(udid => {
        const line = this.pnrService.getRemarkLineNumber(udid);
        if (line !== '') {
          remGroup.deleteRemarkByIds.push(line);
        }
      });
    }
    return remGroup;
  }
}
