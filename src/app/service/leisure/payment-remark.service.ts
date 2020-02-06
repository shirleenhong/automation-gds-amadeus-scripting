import { Injectable } from '@angular/core';
import { MatrixReceiptModel } from '../../models/pnr/matrix-receipt.model';
import { MatrixAccountingModel } from '../../models/pnr/matrix-accounting.model';
import { RemarkGroup } from '../../models/pnr/remark.group.model';
import { RemarkModel } from '../../models/pnr/remark.model';
import { DecimalPipe, DatePipe } from '@angular/common';
import { PnrService } from '../pnr.service';
import { RemarkHelper } from '../../helper/remark-helper';
import { DDBService } from '../ddb.service';
import { AmountPipe } from '../../pipes/amount.pipe';
import { AccountingRemarkComponent } from '../../leisure/payments/accounting-remark/accounting-remark.component';
import { LeisureFeeComponent } from '../../leisure/payments/leisure-fee/leisure-fee.component';
import { LeisureFeeModel } from '../../models/pnr/leisure-fee.model';
import { PassiveSegmentModel } from '../../models/pnr/passive-segment.model';
import { BspTicketFopComponent } from 'src/app/leisure/payments/bsp-ticket-fop/bsp-ticket-fop.component';

@Injectable({
  providedIn: 'root'
})
export class PaymentRemarkService {
  amountPipe = new AmountPipe();
  constructor(private pnrService: PnrService, private remarkHelper: RemarkHelper, private ddbService: DDBService) { }

  accountingRemarks: Array<MatrixAccountingModel>;

  public GetMatrixRemarks(matrixRemarks: MatrixReceiptModel[], fordelete: MatrixReceiptModel[]) {
    const remGroup = new RemarkGroup();
    remGroup.group = 'Matrix Remark';
    remGroup.remarks = new Array<RemarkModel>();
    remGroup.deleteRemarkByIds = [];

    if (matrixRemarks.filter((x) => x.status === 'UPDATED' || x.status === 'ADDED').length === 0 && fordelete.length === 0) {
      // if no change was done
      return remGroup;
    }

    let matrixReceiptsToUpdate = Array<MatrixReceiptModel>();
    if (matrixRemarks) {
      matrixReceiptsToUpdate = matrixRemarks.filter((x) => x.status === 'UPDATED');
    }
    if (matrixReceiptsToUpdate.length > 0 || fordelete.length > 0) {
      remGroup.deleteRemarkByIds = this.pnrService.getMatrixReceiptLineNumbers();
    }

    if (matrixRemarks !== undefined) {
      matrixRemarks.forEach((matrix) => {
        if (matrixReceiptsToUpdate.length > 0 || fordelete.length > 0 || matrix.status === 'ADDED') {
          if (matrix.bankAccount === '224000') {
            this.processRBCredemptionRemarks(matrix, remGroup.remarks);
          } else {
            this.processOtherPaymentRemarks(matrix, remGroup.remarks);
          }
        }
      });
    }
    return remGroup;
  }

  public GetAccountingRemarks(accountingRemarks: MatrixAccountingModel[], fordelete: MatrixAccountingModel[] = []) {
    const remGroup = new RemarkGroup();
    remGroup.group = 'Accounting Remark';
    remGroup.remarks = new Array<RemarkModel>();

    if (accountingRemarks.filter((x) => x.status === 'UPDATED' || x.status === 'ADDED').length === 0 && fordelete.length === 0) {
      // if no change was done
      return remGroup;
    }

    let matrixAccountingReceiptsToUdpate = Array<MatrixAccountingModel>();
    if (accountingRemarks) {
      matrixAccountingReceiptsToUdpate = accountingRemarks.filter((x) => x.status === 'UPDATED');
    }

    // - delete existing lines
    if (matrixAccountingReceiptsToUdpate.length > 0 || fordelete.length > 0) {
      const existingLines = this.pnrService.getMatrixAccountingLineNumbers();
      if (existingLines.length > 0) {
        remGroup.deleteRemarkByIds = this.pnrService.getMatrixAccountingLineNumbers();
      }

      const apays = this.pnrService.getApayRirRemarkLines();
      if (apays !== null && apays.length > 0) {
        if (remGroup.deleteRemarkByIds === undefined) {
          remGroup.deleteRemarkByIds = [];
        }
        apays.forEach((x) => {
          remGroup.deleteRemarkByIds.push(x.lineNum);
        });
      }

      this.deleteRemarksByRegex(/(.*) PASS REDEMPTION-(.*) FARE/g, remGroup, 'RIR');
      this.deleteRemarksByRegex(/(.*) PASS-(.*) FARE/g, remGroup, 'RIR');
    }

    const lineNums = this.pnrService.getRemarkLineNumbers('U14/-');
    if (lineNums.length > 0) {
      remGroup.deleteRemarkByIds = remGroup.deleteRemarkByIds.concat(lineNums);
    }

    // write new Lines
    if (accountingRemarks !== null) {
      let found = false;
      // let nucFound = false;
      accountingRemarks.forEach((account) => {
        if (account.accountingTypeRemark === 'NAE') {
          if (account.supplierCodeName !== 'ACY' && account.supplierCodeName !== 'A22') {
            account.baseAmount = this.amountPipe.transform(Number(account.baseAmount) + Number(account.penaltyBaseAmount)).toString();
            account.gst = this.amountPipe.transform(Number(account.gst) + Number(account.penaltyGst)).toString();
            account.hst = this.amountPipe.transform(Number(account.hst) + Number(account.penaltyHst)).toString();
            account.qst = this.amountPipe.transform(Number(account.qst) + Number(account.penaltyQst)).toString();
          }
          if (account.supplierCodeName !== 'A22') {
            let neRem = 'NE/-EX-Y';
            if (account.originalTktLine) {
              neRem += '/-OTK-' + account.originalTktLine;
              if (this.pnrService.getRemarkLineNumber(neRem) === '') {
                remGroup.remarks.push(this.getRemarksModel(neRem, '*', 'RM'));
              }
            } else if (this.pnrService.getRemarkLineNumber(neRem) === '') {
              remGroup.remarks.push(this.getRemarksModel(neRem, '*', 'RM'));
            }
          }

          // const nuc = 'NUC';
          // if (!nucFound && this.pnrService.getRemarkLineNumber(nuc) === '') {
          //   remGroup.remarks.push(this.getRemarksModel(nuc, '*', 'RM'));
          //   nucFound = true;
          // }
        }

        if (matrixAccountingReceiptsToUdpate.length > 0 || fordelete.length > 0 || account.status === 'ADDED') {
          this.processAccountingRemarks(account, remGroup);
        }

        if (!found && account.supplierCodeName === 'ACJ') {
          remGroup.remarks.push(this.getRemarksModel('U14/-ACPASS-INDIVIDUAL', '*', 'RM'));
          found = true;
        }
      });
    }
    return remGroup;
  }

  deleteRemarksByRegex(regex, remGroup, type?) {
    const redemRIR = this.pnrService.getRemarksFromGDSByRegex(regex, type);

    if (redemRIR.length > 0) {
      redemRIR.forEach((x) => {
        remGroup.deleteRemarkByIds.push(x.lineNo);
      });
    }
  }

  public getRemarksModel(remText, cat, type?, segment?: string, passenger?: string) {
    let segmentrelate = [];
    let passengerRelate = [];
    if (segment) {
      segmentrelate = segment.split(',');
    }

    if (passenger) {
      passengerRelate = passenger.split(',');
    }

    if (!type) {
      type = 'RM';
    }

    const rem = new RemarkModel();
    rem.category = cat;
    rem.remarkText = remText;
    rem.remarkType = type;
    rem.relatedSegments = this.getSegmentTatooValue(segmentrelate);
    rem.relatedPassengers = this.pnrService.getPassengerTatooValue(passengerRelate);
    return rem;
  }

  getSegmentTatooValue(segmentrelate) {
    if (!segmentrelate) {
      return null;
    }
    const relatedSegment = [];
    const tatooSegment = this.pnrService.getSegmentList();
    segmentrelate.forEach((element) => {
      if (tatooSegment.length > 0) {
        const look = tatooSegment.find((x) => x.lineNo === element);
        if (look) {
          relatedSegment.push(look.tatooNo);
        }
      }
    });

    return relatedSegment;
  }

  getFOP(modeofPayment, creditCardNo, fopvendorCode, expDate) {
    let fop = '';
    let paymentvendorCode = fopvendorCode;
    const formOfPaymentList = [];
    let payment: { foptxt: string; vendorCode: string };

    switch (modeofPayment) {
      case 'CC': {
        fop = 'CC' + fopvendorCode + creditCardNo + '/-EXP-' + expDate.replace('/', '');
        break;
      }
      case 'AP': {
        // fop = 'APVI4111111111111111/-EXP-1229';
        // paymentvendorCode = 'VI';
        fop = 'AP' + fopvendorCode + creditCardNo + '/-EXP-' + expDate.replace('/', '');
        break;
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

  processPastPurchaseSegment(accounting: MatrixAccountingModel, remGroup: RemarkGroup) {
    const remarkList = remGroup.remarks;
    const fopObj = this.getFOP(accounting.fop, accounting.cardNumber, accounting.vendorCode, accounting.expDate);
    this.processAirCanadaPass(accounting, remGroup);
    if (accounting.bsp === '2') {
      this.extractApayRemark(accounting, remarkList, fopObj);
    }
  }

  processAccountingRemarks(accounting: MatrixAccountingModel, remGroup: RemarkGroup) {
    const remarkList = remGroup.remarks;

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

    if (['ACPP', 'ACPR'].indexOf(accounting.accountingTypeRemark) < 0 && accounting.commisionWithoutTax) {
      line1 = '/-CD-' + accounting.commisionWithoutTax.toString().trim();
    }

    let bknLine = '/-BKN-';

    if (accounting.bsp === '3') {
      line1 = '/-CP-' + accounting.commisionPercentage.toString().trim();
      bknLine = '/-BKN-CWT';
    }

    if (accounting.bsp === '1' && accounting.otherTax) {
      facc = acc1 + '/-PT-' + accounting.otherTax.toString().trim() + 'XT';
    }

    if (['ACPP', 'ACPR'].indexOf(accounting.accountingTypeRemark) >= 0) {
      facc += '/-CD-0.00';
    }

    facc = facc + line1;

    const fopObj = this.getFOP(accounting.fop, accounting.cardNumber, accounting.vendorCode, accounting.expDate);
    const acc2 =
      'MAC/-LK-MAC' +
      accounting.tkMacLine.toString().trim() +
      '/-FOP-' +
      fopObj[0].foptxt +
      this.getTKTline(accounting.tktLine) +
      '/-MP-ALL' +
      bknLine +
      accounting.supplierConfirmatioNo.toString().trim();

    const pass = accounting.passengerNo !== undefined ? accounting.passengerNo : '1';
    const segmentrelate = accounting.segmentNo !== undefined ? accounting.segmentNo.toString() : '';

    if (accounting.accountingTypeRemark !== 'ACPP' || (accounting.accountingTypeRemark === 'ACPP' && segmentrelate)) {
      remarkList.push(this.getRemarksModel(facc, '*', 'RM', '', pass.toString()));
      remarkList.push(this.getRemarksModel(acc2, '*', 'RM', segmentrelate, pass.toString()));
    }

    this.processAirCanadaPass(accounting, remGroup);
    if (accounting.bsp === '2') {
      this.extractApayRemark(accounting, remarkList, fopObj);
    }
  }

  processAirCanadaPass(accounting, remGroup) {
    const remarkList = remGroup.remarks;
    if (accounting.accountingTypeRemark === 'ACPR') {
      remarkList.push(
        this.getRemarksModel(accounting.passPurchase + ' PASS REDEMPTION-' + accounting.fareType + ' FARE', 'R', 'RI', accounting.segmentNo)
      );
    } else if (accounting.accountingTypeRemark === 'ACPP') {
      if (accounting.segmentNo) {
        remarkList.push(
          this.getRemarksModel(accounting.passPurchase + ' PASS-' + accounting.fareType + ' FARE', 'R', 'RI', accounting.segmentNo)
        );
      }

      const air = this.pnrService
        .getSegmentList()
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

  private extractApayRemark(accounting: MatrixAccountingModel, remarkList: RemarkModel[], fopObj: Array<any>) {
    let ttltax: number = Number(accounting.gst) + Number(accounting.hst) + Number(accounting.qst);
    ttltax = Math.round(ttltax * 100) / 100;
    const decPipe = new DecimalPipe('en-Us');

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
      const templen: number = accounting.descriptionapay.length - (lessChar + 1);
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

    remarkList.push(this.getRemarksModel(acc3, 'R', 'RI', accounting.segmentNo.toString()));
  }

  processRBCredemptionRemarks(matrix: MatrixReceiptModel, remarkList: Array<RemarkModel>) {
    const rem1 = 'REC/-RLN-' + matrix.rln + '/-RF-' + matrix.passengerName + '/-AMT-' + matrix.amount;
    const rem2 = 'REC/-RLN-' + matrix.rln + '/-FOP-PR-' + matrix.lastFourVi + '/-BA-' + matrix.bankAccount + '/-GL-' + matrix.glCode;
    const rem3 = 'REC/-RLN-' + matrix.rln + '/-RM-POINTS ' + matrix.points + ' REF-' + matrix.cwtRef;
    remarkList.push(this.getRemarksModel(rem1, '*', 'RM'));
    remarkList.push(this.getRemarksModel(rem2, '*', 'RM'));
    remarkList.push(this.getRemarksModel(rem3, '*', 'RM'));
  }

  processOtherPaymentRemarks(matrix: MatrixReceiptModel, remarkList: Array<RemarkModel>) {
    enum CardType {
      VI = '115000',
      CA = '116000',
      AX = '117000',
      DC = '118000'
    }
    let fop = '';
    if (CardType[matrix.vendorCode] === matrix.bankAccount) {
      fop = 'CC' + matrix.vendorCode + matrix.ccNo + '/-EXP-' + matrix.expDate.replace('/', '');
    } else {
      fop = matrix.bankAccount === '109000' ? 'DB' : matrix.bankAccount === '227000' ? 'GC-' + matrix.gcNumber : matrix.modePayment;
    }

    let gcNo = '';

    if (matrix.gcNumber != null && matrix.gcNumber.toString() !== '') {
      gcNo = '/-GC-' + matrix.gcNumber;
    }

    const rem1 = 'REC/-RLN-' + matrix.rln + '/-RF-' + matrix.passengerName + '/-AMT-' + matrix.amount;
    const rem2 = 'REC/-RLN-' + matrix.rln + '/-FOP-' + fop + '/-LK-T/-BA-' + matrix.bankAccount + '/-GL-' + matrix.glCode;
    const rem3 = 'REC/-RLN-' + matrix.rln + '/-RM-' + matrix.description + gcNo;

    remarkList.push(this.getRemarksModel(rem1, '*', 'RM'));
    remarkList.push(this.getRemarksModel(rem2, '*', 'RM'));
    remarkList.push(this.getRemarksModel(rem3, '*', 'RM'));
  }

  getNoFeeReason(remGroup, feeList, fg, cfa) {
    const lineNum = this.pnrService.getRemarkLineNumber('U11/-');
    if (lineNum !== '') {
      remGroup.deleteRemarkByIds.push(lineNum);
    }
    if (feeList.length === 0 && (cfa !== 'RBM' && cfa !== 'RBP') && fg.get('noFeeReason').value !== '') {
      // *U11
      const noFeeReason = fg.get('noFeeReason').value;
      const remark = 'U11/-' + noFeeReason;
      remGroup.remarks.push(this.getRemarksModel(remark, '*'));
    }
  }

  public GetLeisureFeeRemarks(comp: LeisureFeeComponent, cfa: string) {
    const fg = comp.leisureFeeForm;
    const feeList = comp.leisureFeeList;
    const remGroup = new RemarkGroup();
    remGroup.group = 'Leisure Fee';
    remGroup.remarks = new Array<RemarkModel>();
    remGroup.deleteRemarkByIds = [];

    this.getNoFeeReason(remGroup, feeList, fg, cfa);

    if (feeList.filter((x) => x.status === 'UPDATED' || x.status === 'ADDED').length === 0 && comp.leisureFeesToDelete.length === 0) {
      // return if no Change
      return remGroup;
    }

    let leisureFeesToUpdate = Array<LeisureFeeModel>();
    if (feeList) {
      leisureFeesToUpdate = feeList.filter((x) => x.status === 'UPDATED');
    }

    if (leisureFeesToUpdate.length > 0 || comp.leisureFeesToDelete.length > 0) {
      const remarksForDelete = ['SFC/-', 'FEE/-', 'TAX-', 'TEX/'];
      remarksForDelete.forEach((rem) => {
        const lineNums = this.pnrService.getRemarkLineNumbers(rem);
        if (lineNums.length > 0) {
          remGroup.deleteRemarkByIds = remGroup.deleteRemarkByIds.concat(lineNums);
        }
      });
    }

    let remark = '';

    if (feeList.length > 0) {
      remark = 'TAX-' + feeList[0].address;
      remGroup.remarks.push(this.getRemarksModel(remark, 'Y'));
      feeList.forEach((f) => {
        if (leisureFeesToUpdate.length > 0 || comp.leisureFeesToDelete.length > 0 || f.status === 'ADDED') {
          remark = this.generateSFCRemark(f, comp.exemption);
          const pass = f.passengerNo !== undefined ? f.passengerNo : '1';
          remGroup.remarks.push(this.getRemarksModel(remark, '*', '', '', pass));
          // RM FEE
          const remarkFee = [];
          remark.split('/').forEach((x) => {
            if (x.indexOf('SFC') < 0 && x.indexOf('-PT') < 0 && x.indexOf('-FP-TRF') < 0) {
              remarkFee.push(x);
              if (x.indexOf('-AMT') >= 0) {
                remarkFee.push('-FP-FEE');
              }
            }
          });
          remGroup.remarks.push(this.getRemarksModel('FEE/' + remarkFee.join('/'), '*', '', '', pass));
        }
      });
      const ex = [];
      comp.exemption.forEach((x) => {
        if (x.checked) {
          ex.push('-' + x.value);
        }
      });
      if (ex.length > 0) {
        remGroup.remarks.push(this.getRemarksModel('TEX/' + ex.join('/'), '*'));
      }
    }

    return remGroup;
  }

  getSegmentValue(value: string) {
    if (value.length > 0) {
      const output = value.split(' ');

      return output[0];
    }
  }

  generateSFCRemark(fee: LeisureFeeModel, exemp: any) {
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
        remark += '/-FA-T' + fee.fln;
        break;
    }

    remark += '/-FLN-F' + fee.fln + '/-FP-TRF';
    remark += '/-AMT-CAD' + this.amountPipe.transform(fee.amount);

    remark += this.getProvinceTaxRemark(fee, exemp);
    if (fee.paymentType === 'C') {
      remark += '/-FOP-CC' + fee.vendorCode + fee.ccNo;
      remark += '/-EXP-' + fee.expDate.replace('/', '');
    } else {
      remark += '/-FOP-CK';
    }
    return remark;
  }

  getProvinceTaxRemark(fee: LeisureFeeModel, exempt: Array<any>) {
    const provTax = this.ddbService.getProvinceTax().filter((x) => x.provinceCode === fee.address);
    let tax1 = '0.00';
    let tax2 = '0.00';
    let taxType1 = 'XG';
    if (provTax.length > 0) {
      tax1 = this.amountPipe.transform(+fee.amount * +provTax[0].tax1);
      tax2 = this.amountPipe.transform(+fee.amount * +provTax[0].tax2);
      taxType1 = provTax[0].taxType1 === 'GST' ? 'XG' : 'RC';
    }

    tax1 = taxType1 === 'XG' && exempt.find((x) => x.checked === true && x.label === 'GST Exempt') ? '0.00' : tax1;
    tax1 = taxType1 === 'RC' && exempt.find((x) => x.checked === true && x.label === 'HST Exempt') ? '0.00' : tax1;
    tax2 = exempt.find((x) => x.checked === true && x.label === 'QST Exempt') ? '0.00' : tax2;
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
    const udids = ['U76/-', 'U71/-', 'U75/-', 'U72/-', 'U73/-', 'U74/-', 'U77/-'];
    const values = ['airOnly', 'exclusiveProperty', 'propertyName', 'flightType', 'priceVsSupplier', 'group', 'preferredVendor'];
    let i = 0;

    if (acc.isAd1SwgSupplier) {
      udids.forEach((udid) => {
        const line = this.pnrService.getRemarkLineNumber(udid);
        if (line === '') {
          const val = fg.get(values[i]).value;
          if (val !== null && val !== undefined && val !== '' && !fg.get(values[i]).disabled) {
            remark = udid + val;
            remGroup.remarks.push(this.getRemarksModel(remark, '*'));
          }
        }
        i++;
      });
    } else {
      udids.forEach((udid) => {
        const line = this.pnrService.getRemarkLineNumber(udid);
        if (line !== '') {
          remGroup.deleteRemarkByIds.push(line);
        }
      });
    }
    return remGroup;
  }

  public removePayment() {
    const remGroup = new RemarkGroup();
    remGroup.group = 'FOP';
    remGroup.remarks = new Array<RemarkModel>();
    remGroup.deleteRemarkByIds = [];

    const line = this.pnrService.getRemarkLineNumber('FOP/-AP');
    if (line) {
      remGroup.deleteRemarkByIds.push(line);
    }
    return remGroup;
  }

  public addRmFop() {
    const remGroup = new RemarkGroup();
    remGroup.group = 'FOP';
    remGroup.remarks = new Array<RemarkModel>();
    remGroup.deleteRemarkByIds = [];
    remGroup.remarks.push(this.getRemarksModel('FOP/-AP', '*'));
    return remGroup;
  }

  public addBspTicketFop(ticketfop: BspTicketFopComponent) {
    const remGroup = new RemarkGroup();
    remGroup.group = 'FOP';
    remGroup.remarks = new Array<RemarkModel>();
    remGroup.deleteRemarkByIds = [];
    let deletePayment = false;
    if (ticketfop) {
      const fg = ticketfop.bspTicketFopForm;
      switch (fg.get('bspfop').value) {
        case 'CC':
          remGroup.cryptics.push('FPCC' + fg.get('vendorCode').value +
          fg.get('ccNo').value + '/' + fg.get('expDate').value.replace('/', ''));
          deletePayment = true;
          break;
        case 'CK':
          remGroup.cryptics.push('FPCHEQUE');
          deletePayment = true;
          break;
        case 'AP':
          remGroup.cryptics.push('PBN/YTOWL210N/PCIFOPCWT BSP/*');
          remGroup.remarks.push(this.getRemarksModel('FOP/-AP', '*'));
          deletePayment = true;
          break;
        default:
          break;
      }
    }
    this.deleteBspTicketFop(remGroup, deletePayment);
    return remGroup;
  }

  private deleteBspTicketFop(remGroup: RemarkGroup, deletePayment: boolean) {
    const line = this.pnrService.getRemarkLineNumber('FOP/-AP');
    if (line) {
      remGroup.deleteRemarkByIds.push(line);
    }
    const fop = this.pnrService.getFopElementLineNo();
    if (fop.fopFreeText && (fop.fopFreeText.indexOf('0639/') > -1 || deletePayment)) {
      remGroup.deleteRemarkByIds.push(fop.fopLineNo);
    }
  }
}
