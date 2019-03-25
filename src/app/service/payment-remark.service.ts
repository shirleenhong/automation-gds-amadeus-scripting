import { Injectable } from '@angular/core';
import { MatrixReceiptModel } from '../models/pnr/matrix-receipt.model';
import { MatrixAccountingModel } from '../models/pnr/matrix-accounting.model';
import { RemarkGroup } from '../models/pnr/remark.group.model';
import { RemarkModel } from '../models/pnr/remark.model';
import { DatePipe } from '@angular/common';



@Injectable({
    providedIn: 'root',
})
export class PaymentRemarkService {


    public GetMatrixRemarks(matrixRemarks: MatrixReceiptModel[]) {

        const remGroup = new RemarkGroup();
        remGroup.group = 'Matrix Remark';
        remGroup.remarks = new Array<RemarkModel>();
        matrixRemarks.forEach(matrix => {
            if (matrix.bankAccount === '224000') {
                this.processRBCredemptionRemarks(matrix, remGroup.remarks);
            } else {
                this.processOtherPaymentRemarks(matrix, remGroup.remarks);
            }
        });

        return remGroup;

    }

    accountingRemarks: Array<MatrixAccountingModel>;

    public GetAccountingRemarks(accountingRemarks: MatrixAccountingModel[]) {

        const remGroup = new RemarkGroup();
        remGroup.group = 'Accounting Remark';
        remGroup.remarks = new Array<RemarkModel>();
        accountingRemarks.forEach(account => {
            this.processAccountingRemarks(account, remGroup.remarks);
        });

        return remGroup;

    }

    getRemarksModel(remText, cat, type) {
        const rem = new RemarkModel();
        rem.category = cat;
        rem.remarkText = remText;
        rem.remarkType = type;
        return rem;
    }

    getFOP(modeofPayment, creditCardNo, vendorCode, expDate) {
        const datePipe = new DatePipe('en-US');
        let fop = '';
        if (modeofPayment == 'CC') {
            var month = datePipe.transform(expDate, 'MM');
            var year = expDate.toString().substr(2, 2);
            fop = "CC" + vendorCode + creditCardNo + '/-EXP' + month + year;
        } else {
            fop = modeofPayment;
        }
        return fop;
    }

    getTKTline(tktLine) {
        let tline = '';
        if (tktLine !== null && tktLine.toString() !== '') {
            tline = '/-TK-' + tktLine.toString().trim();
        }
        return tline;
    }

    processAccountingRemarks(accounting: MatrixAccountingModel, remarkList: Array<RemarkModel>) {
        const acc1 = 'RM*MAC/-SUP-' + accounting.supplierCodeName.trim() + '/-LK-MAC' + accounting.tkMacLine.toString().trim() + '/-AMT-' + accounting.baseAmount.toString().trim() + '/-PT-' + accounting.hst.toString().trim() + 'RC/-PT-' + accounting.gst.toString().trim() + 'XG/-PT-' + accounting.qst.toString().trim() + ' XQ/-PT- ' + accounting.otherTax.toString().trim() + 'XT /-CD-' + accounting.commisionWithoutTax.toString().trim();
        const acc2 = 'RM*MAC/-SUP-' + accounting.supplierCodeName.toString().trim() + '/-LK-MAC' + accounting.tkMacLine.toString().trim() + '/-FOP-' + this.getFOP(accounting.fop, accounting.cardNumber, accounting.vendorCode, accounting.expDate) +
            this.getTKTline(accounting.tktLine) + '/-MP-' + accounting.passengerNo.toString().trim() + '/-BKN-' + accounting.supplierConfirmatioNo.toString().trim() + '/S' + accounting.segmentNo.toString().trim();

        remarkList.push(this.getRemarksModel(acc1, '*', 'RM'));
        remarkList.push(this.getRemarksModel(acc2, '*', 'RM'));

        if (!accounting.bsp) {
            var ttltax = accounting.gst + accounting.hst + accounting.qst;
            const acc3 = 'PAID ' + accounting.description + ' CF-' + accounting.supplierConfirmatioNo + ' CAD' + accounting.baseAmount + 'PLUS ' + ttltax.toString() + 'TAX ON ' + this.getFOP(accounting.fop, accounting.cardNumber, accounting.vendorCode, accounting.expDate) + '/S' + accounting.segmentNo.toString().trim();
            remarkList.push(this.getRemarksModel(acc3, 'I', 'RI'));
        }
    }

    processRBCredemptionRemarks(matrix: MatrixReceiptModel, remarkList: Array<RemarkModel>) {
        const rem1 = 'REC/-RLN-' + matrix.rln + '/-RF-' + matrix.passengerName + '/-AMT-' + matrix.amount;
        const rem2 = 'REC/-RLN-' + matrix.rln + '/-PR-' + matrix.lastFourVi + '/-BA-' + matrix.bankAccount + '/-GL-' + matrix.glCode;
        const rem3 = 'REC/-RLN-' + matrix.rln + '/-RM-' + matrix.points + '/-REF-' + matrix.cwtRef;
        remarkList.push(this.getRemarksModel(rem1, '*', 'RM'));
        remarkList.push(this.getRemarksModel(rem2, '*', 'RM'));
        remarkList.push(this.getRemarksModel(rem3, '*', 'RM'));
    }

    processOtherPaymentRemarks(matrix: MatrixReceiptModel, remarkList: Array<RemarkModel>) {
        enum CardType {
            VI = '115000',
            MC = '116000',
            AMEX = '117000',
            Diners = '118000'
        }
        const datePipe = new DatePipe('en-US');
        let fop = '';
        if (Object.values(CardType).includes(matrix.bankAccount)) {
            var month = datePipe.transform(matrix.expDate, 'MM');
            var year = matrix.expDate.toString().substr(2, 2);
            fop = "CC" + matrix.vendorCode + matrix.ccNo + '/-EXP' + month + year;
        } else {
            fop = matrix.modePayment;
        }

        var gcNo = ''
        if (matrix.gcNumber != null && (matrix.gcNumber.toString() !== "")) {
            gcNo = '/-GC-' + matrix.gcNumber;
        }

        const rem1 = 'REC/-RLN-' + matrix.rln + '/-RF-' + matrix.passengerName + '/-AMT-' + matrix.amount;
        const rem2 = 'REC/-RLN-' + matrix.rln + '/-FOP-' + fop + '/-LK-T/-BA-' + matrix.bankAccount + '/-GL-' + matrix.glCode;
        const rem3 = 'REC/-RLN-' + matrix.rln + '/-RM-' + matrix.description + gcNo;

        remarkList.push(this.getRemarksModel(rem1, '*', 'RM'));
        remarkList.push(this.getRemarksModel(rem2, '*', 'RM'));
        remarkList.push(this.getRemarksModel(rem3, '*', 'RM'));
    }


}
