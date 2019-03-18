import { Component, OnInit, OnChanges } from '@angular/core';
import {MatrixReceiptModel} from '../../models../../models/matrix-receipt.model'
import { NgbActiveModal, NgbModal,NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UpdateMatrixReceiptComponent } from '../update-matrix-receipt/update-matrix-receipt.component';
import { RemarkModel } from 'src/app/models/remark.model';
import { DatePipe } from '@angular/common';
import { RemarkCollectionService } from 'src/app/service/remark.collection.service';
import { RemarkGroup } from 'src/app/models/remark.group.model';

@Component({
  selector: 'app-matrix-receipt',
  templateUrl: './matrix-receipt.component.html',
  styleUrls: ['./matrix-receipt.component.scss']
})
export class MatrixReceiptComponent implements OnInit, OnChanges {
  

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    this.buildRemarks();
  }
  
  matrixReceiptList:Array<MatrixReceiptModel>;
  private modalRef: NgbModalRef;
  remarkList : Array<RemarkModel>;

  constructor(private modalService: NgbModal, private remarkCollectionService:RemarkCollectionService) {
    this.matrixReceiptList=new Array<MatrixReceiptModel>();
    this.remarkList= new Array<RemarkModel>();
   }

  ngOnInit() {
  }

buildRemarks(){
    this.remarkList.length=0;

    this.matrixReceiptList.forEach(matrix => {
      
      if (matrix.bankAccount=='224000'){
          this.processRBCredemptionRemarks(matrix);
      }else {
        this.processOtherPaymentRemarks(matrix);
      }
     
    });

}

processRBCredemptionRemarks(matrix:MatrixReceiptModel){
  let rem1 = 'REC/-RLN-' + matrix.rln + '/-RF-' + matrix.passengerName+'/-AMT-'+matrix.amount;
  let rem2 = 'REC/-RLN-' + matrix.rln + '/-PR-'+ matrix.lastFourVi + '/-BA-'+ matrix.bankAccount + '/-GL-'+matrix.glCode;
  let rem3 = 'REC/-RLN-' + matrix.rln + '/-RM-'+ matrix.points + '/-REF-'+ matrix.cwtRef ;
  this.remarkList.push(this.getRemarksModel(rem1));
  this.remarkList.push(this.getRemarksModel(rem2));
  this.remarkList.push(this.getRemarksModel(rem3));
}

updateRemarkGroup(){
  var remGroup = new RemarkGroup();
  remGroup.group = "Matrix Remark";
  remGroup.remarks = this.remarkList;
  this.remarkCollectionService.addUpdateRemarkGroup(remGroup);
}

processOtherPaymentRemarks(matrix:MatrixReceiptModel){

        enum CardType {
          VI = '115000',
          MC = '116000',
          AMEX = '117000',
          Diners ='118000'
      }

    var datePipe = new DatePipe("en-US");
    var fop = ""
    if (Object.values(CardType).includes(matrix.bankAccount))
    {
      fop = "CC" + matrix.ccNo + '/-EXP' + datePipe.transform(matrix.expDate, 'mmYY');
    }else{
        fop = 'CA'
    }


  let rem1 = 'REC/-RLN-' + matrix.rln + '/-RF-' + matrix.passengerName+'/-AMT-'+matrix.amount;
  let rem2 = 'REC/-RLN-' + matrix.rln + '/-FOP-'+ fop + '/-LK-T/-BA-'+ matrix.bankAccount + '/-GL-'+matrix.glCode;
  let rem3 = 'REC/-RLN-' + matrix.rln + '/-RM-'+ matrix.description + '/-GC';
  this.remarkList.push(this.getRemarksModel(rem1));
  this.remarkList.push(this.getRemarksModel(rem2));
  this.remarkList.push(this.getRemarksModel(rem3));
}

getRemarksModel(remText){
  var rem = new RemarkModel;
  rem.category = "*";
  rem.remarkText = remText;
  rem.remarkType="RM";
  return rem;
}



  addMatrixReceipt(){

    var matrixReceipt = new MatrixReceiptModel();
    this.modalRef =  this.modalService.open(UpdateMatrixReceiptComponent);
    this.modalRef.componentInstance['title'] ="Add Matrix Receipt";
    matrixReceipt.rln = (this.matrixReceiptList.length +1);
    this.modalRef.componentInstance['matrixReceipt']= matrixReceipt;

    this.modalRef.result.then(x=>{     
      if (typeof  (x) !="string"){
        this.matrixReceiptList.push(x);
        this.buildRemarks();
        this.updateRemarkGroup();
      }
     
    });

  }



}
