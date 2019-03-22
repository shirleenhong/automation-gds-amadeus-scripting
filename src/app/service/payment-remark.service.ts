import { Injectable } from '@angular/core';
import { MatrixReceiptModel } from '../models/pnr/matrix-receipt.model';
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

    getRemarksModel(remText) {
        const rem = new RemarkModel();
        rem.category = '*';
        rem.remarkText = remText;
        rem.remarkType = 'RM';
        return rem;
    }

    processRBCredemptionRemarks(matrix: MatrixReceiptModel, remarkList: Array<RemarkModel>) {
        const rem1 = 'REC/-RLN-' + matrix.rln + '/-RF-' + matrix.passengerName + '/-AMT-' + matrix.amount;
        const rem2 = 'REC/-RLN-' + matrix.rln + '/-PR-' + matrix.lastFourVi + '/-BA-' + matrix.bankAccount + '/-GL-' + matrix.glCode;
        const rem3 = 'REC/-RLN-' + matrix.rln + '/-RM-' + matrix.points + '/-REF-' + matrix.cwtRef;
        remarkList.push(this.getRemarksModel(rem1));
        remarkList.push(this.getRemarksModel(rem2));
        remarkList.push(this.getRemarksModel(rem3));
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
            var year = matrix.expDate.toString().substr(2,2);
            fop = "CC" + matrix.vendorCode + matrix.ccNo + '/-EXP' + month + year;
        } else {
            fop = matrix.modePayment;
        }

        var gcNo = ''
        if(matrix.gcNumber != null && (matrix.gcNumber.toString() !== ""))
        {   
            gcNo = '/-GC' + matrix.gcNumber;
        }

        const rem1 = 'REC/-RLN-' + matrix.rln + '/-RF-' + matrix.passengerName + '/-AMT-' + matrix.amount;
        const rem2 = 'REC/-RLN-' + matrix.rln + '/-FOP-' + fop + '/-LK-T/-BA-' + matrix.bankAccount + '/-GL-' + matrix.glCode;
        const rem3 = 'REC/-RLN-' + matrix.rln + '/-RM-' + matrix.description + gcNo;

        remarkList.push(this.getRemarksModel(rem1));
        remarkList.push(this.getRemarksModel(rem2));
        remarkList.push(this.getRemarksModel(rem3));
    }


}
