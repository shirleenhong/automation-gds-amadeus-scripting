import { Component, OnInit, Input } from '@angular/core';
import { MatrixReceiptModel } from '../../models/pnr/matrix-receipt.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UpdateMatrixReceiptComponent } from '../update-matrix-receipt/update-matrix-receipt.component';
import { RemarkModel } from 'src/app/models/pnr/remark.model';
import { DatePipe } from '@angular/common';
import { RemarkGroup } from '../../models/pnr/remark.group.model';
import { RemarkCollectionService } from '../../service/remark.collection.service';
import { PaymentViewModel } from '../../models/payment-view.model';

@Component({
  selector: 'app-matrix-receipt',
  templateUrl: './matrix-receipt.component.html',
  styleUrls: ['./matrix-receipt.component.scss']
})
export class MatrixReceiptComponent implements OnInit {

  @Input()
  matrixReceiptList: PaymentViewModel;
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService, private remarkCollectionService: RemarkCollectionService) {
    // this.matrixReceiptList=new Array<MatrixReceiptModel>();
    // this.remarkList= new Array<RemarkModel>();
  }

  ngOnInit() {
  }

  buildRemarks() {

    // this.remarkList.length = 0;

    // this.matrixReceiptList.forEach(matrix => {

    //   if (matrix.bankAccount == '224000') {
    //     this.processRBCredemptionRemarks(matrix);
    //   } else {
    //     this.processOtherPaymentRemarks(matrix);
    //   }

    // });

  }

  processRBCredemptionRemarks(matrix: MatrixReceiptModel) {
    // let rem1 = 'REC/-RLN-' + matrix.rln + '/-RF-' + matrix.passengerName + '/-AMT-' + matrix.amount;
    // let rem2 = 'REC/-RLN-' + matrix.rln + '/-PR-' + matrix.lastFourVi + '/-BA-' + matrix.bankAccount + '/-GL-' + matrix.glCode;
    // let rem3 = 'REC/-RLN-' + matrix.rln + '/-RM-' + matrix.points + '/-REF-' + matrix.cwtRef;
    // this.remarkList.push(this.getRemarksModel(rem1));
    // this.remarkList.push(this.getRemarksModel(rem2));
    // this.remarkList.push(this.getRemarksModel(rem3));
  }


  processOtherPaymentRemarks(matrix: MatrixReceiptModel) {

    // enum CardType {
    //   VI = '115000',
    //   MC = '116000',
    //   AMEX = '117000',
    //   Diners = '118000'
    // }

    // var datePipe = new DatePipe("en-US");
    // var fop = ""
    // if (Object.values(CardType).includes(matrix.bankAccount)) {
    //   fop = "CC" + matrix.ccNo + '/-EXP' + datePipe.transform(matrix.expDate, 'mmYY');
    // } else {
    //   fop = matrix.modePayment;
    // }

    // let rem1 = 'REC/-RLN-' + matrix.rln + '/-RF-' + matrix.passengerName + '/-AMT-' + matrix.amount;
    // let rem2 = 'REC/-RLN-' + matrix.rln + '/-FOP-' + fop + '/-LK-T/-BA-' + matrix.bankAccount + '/-GL-' + matrix.glCode;
    // let rem3 = 'REC/-RLN-' + matrix.rln + '/-RM-' + matrix.description + '/-GC' + matrix.gcNumber;
    // this.remarkList.push(this.getRemarksModel(rem1));
    // this.remarkList.push(this.getRemarksModel(rem2));
    // this.remarkList.push(this.getRemarksModel(rem3));
  }

  getRemarksModel(remText) {
    var rem = new RemarkModel;
    rem.category = "*";
    rem.remarkText = remText;
    rem.remarkType = "RM";
    return rem;
  }


  UpdateRemarkGroup() {
    // var remGroup = new RemarkGroup();
    // remGroup.group = "Matrix Remark";
    // remGroup.remarks = this.remarkList;
    // this.remarkCollectionService.addUpdateRemarkGroup(remGroup);
  }


  addMatrixReceipt() {
    // var matrixReceipt = new MatrixReceiptModel();
    // this.modalRef = this.modalService.show(UpdateMatrixReceiptComponent);
    // this.modalRef.content.title = "Add Matrix Receipt";
    // matrixReceipt.rln = (this.matrixReceiptList.length + 1);
    // this.modalRef.content.matrixReceipt = matrixReceipt;
    // this.modalService.onHide.subscribe(result => {
    //   if (this.modalRef.content.isSubmitted) {
    //     this.matrixReceiptList.push(this.modalRef.content.matrixReceipt);
    //   }
    //   console.log('results', result);
    // });

  }



}
