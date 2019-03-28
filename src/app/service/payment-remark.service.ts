import { Injectable } from '@angular/core';
import { MatrixReceiptModel } from '../models/pnr/matrix-receipt.model';
import { MatrixAccountingModel } from '../models/pnr/matrix-accounting.model';
import { RemarkGroup } from '../models/pnr/remark.group.model';
import { RemarkModel } from '../models/pnr/remark.model';
import { DatePipe, DecimalPipe } from '@angular/common';
import { PnrService } from './pnr.service';
import { IfStmt } from '@angular/compiler';


@Injectable({
    providedIn: 'root',
})
export class PaymentRemarkService {

    constructor(private pnrService: PnrService) {
    }

    accountingRemarks: Array<MatrixAccountingModel>;

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

    public GetAccountingRemarks(accountingRemarks: MatrixAccountingModel[]) {

        const remGroup = new RemarkGroup();
        remGroup.group = 'Accounting Remark';
        remGroup.remarks = new Array<RemarkModel>();
        accountingRemarks.forEach(account => {
            this.processAccountingRemarks(account, remGroup.remarks);
        });

        return remGroup;

    }

    getRemarksModel(remText, cat, type, segment?: string) {
        let segmentrelate = [];
        if (segment) {
            segmentrelate = segment.split(',');
        }

        const rem = new RemarkModel();
        rem.category = cat;
        rem.remarkText = remText;
        rem.remarkType = type;
        rem.relatedSegments = this.getSegmentTatooValue(segmentrelate);
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
        // alert(JSON.stringify(relatedSegment));
        return relatedSegment;
    }

    getFOP(modeofPayment, creditCardNo, vendorCode, expDate) {
        const datePipe = new DatePipe('en-US');
        let fop = '';

        switch (modeofPayment) {
            case 'CC': {

                fop = 'CC' + vendorCode + creditCardNo + '/-EXP-' + expDate.replace('/', '');
                break;
            }
            case 'ACC': {
                fop = 'CCVI4111111111111111/-EXP-1229';
                break;
            }
            default: {
                fop = modeofPayment;
                break;
            }

        }
        return fop;
    }

    getTKTline(tktLine) {
        let tline = '';
        // if (tktLine tktLine !== null && tktLine !== '') {
        if (tktLine) {
            tline = '/-TK-' + tktLine.toString().trim();
        }
        return tline;
    }


    processAccountingRemarks(accounting: MatrixAccountingModel, remarkList: Array<RemarkModel>) {
        const acc1 = 'MAC/-SUP-' + accounting.supplierCodeName.trim() +
            '/-LK-MAC' + accounting.tkMacLine.toString().trim() + '/-AMT-' +
            accounting.baseAmount.toString().trim() + '/-PT-' +
            accounting.hst.toString().trim() + 'RC/-PT-' + accounting.gst.toString().trim() +
            'XG/-PT-' + accounting.qst.toString().trim() + 'XQ';

        let facc = acc1;
        if (accounting.bsp === '1') {
            facc = acc1 + '/-PT-' + accounting.otherTax.toString().trim()
                + 'XT/-CD-' + accounting.commisionWithoutTax.toString().trim();
        }

        const acc2 = 'MAC/-SUP-' + accounting.supplierCodeName.toString().trim() +
            '/-LK-MAC' + accounting.tkMacLine.toString().trim() + '/-FOP-' +
            this.getFOP(accounting.fop, accounting.cardNumber, accounting.vendorCode, accounting.expDate) +
            this.getTKTline(accounting.tktLine) + '/-MP-' + accounting.passengerNo.toString().trim() +
            '/-BKN-' + accounting.supplierConfirmatioNo.toString().trim();
        // + '/S' + accounting.segmentNo.toString().trim();

        remarkList.push(this.getRemarksModel(facc, '*', 'RM'));
        remarkList.push(this.getRemarksModel(acc2, '*', 'RM', accounting.segmentNo.toString()));

        if (accounting.bsp === '2') {
            // tslint:disable-next-line:prefer-const
            let ttltax: number = Number(accounting.gst) + Number(accounting.hst) + Number(accounting.qst);
            ttltax = Math.round(ttltax * 100) / 100;
            const decPipe = new DecimalPipe('en-Us');

            let vcode = '';
            if (accounting.vendorCode) {
                vcode = accounting.vendorCode;
            }
            const acc3 = 'PAID ' + accounting.description + ' CF-' + accounting.supplierConfirmatioNo +
                ' CAD' + accounting.baseAmount + ' PLUS ' + decPipe.transform(ttltax, '1.2-2') + ' TAX ON ' + vcode;
            // + '/S' + accounting.segmentNo.toString().trim();

            remarkList.push(this.getRemarksModel(acc3, 'I', 'RI', accounting.segmentNo.toString()));
        }
    }

    processRBCredemptionRemarks(matrix: MatrixReceiptModel, remarkList: Array<RemarkModel>) {
        const rem1 = 'REC/-RLN-' + matrix.rln + '/-RF-' + matrix.passengerName + '/-AMT-' + matrix.amount;
        const rem2 = 'REC/-RLN-' + matrix.rln + '/-PR' + matrix.lastFourVi + '/-BA-' + matrix.bankAccount + '/-GL-' + matrix.glCode;
        const rem3 = 'REC/-RLN-' + matrix.rln + '/-RM-POINTS ' + matrix.points + ' REF-' + matrix.cwtRef;
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
            fop = 'CC' + matrix.vendorCode + matrix.ccNo + '/-EXP-' + matrix.expDate.replace('/', '');
        } else {
            fop = matrix.modePayment;
        }

        let gcNo = '';

        if (matrix.gcNumber != null && (matrix.gcNumber.toString() !== '')) {
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
