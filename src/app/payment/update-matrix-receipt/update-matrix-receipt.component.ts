
import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MatrixReceiptModel } from 'src/app/models/matrix-receipt.model';
import { SelectItem } from 'src/app/models/select.item.model';
import { PnrService } from 'src/app/service/pnr.service';

@Component({
  selector: 'app-update-matrix-receipt',
  templateUrl: './update-matrix-receipt.component.html',
  styleUrls: ['./update-matrix-receipt.component.scss']
})
export class UpdateMatrixReceiptComponent implements OnInit {
title:string;
matrixReceipt: MatrixReceiptModel;
bankAccountList: Array<SelectItem>;
passengerList:Array<string>;
@ViewChild('bankAccount') bankAccEl: ElementRef;
  constructor( public activeModal: NgbActiveModal,private pnrService:PnrService) { 
    if (!this.pnrService.isPNRLoaded ) this.pnrService.getPNR();
    this.passengerList = new Array<string>();
    this.bankAccountList=new Array<SelectItem>();
    this.matrixReceipt= new MatrixReceiptModel();
    this.loadBankAccount();
    this.loadPassenger();
  }

  ngOnInit() {

  }


saveReceipt(){
  
  this.activeModal.close(this.matrixReceipt);
}

loadBankAccount(){

this.bankAccountList = [{itemText:"",itemValue:""},
                            {itemText:"CAD Funds (outside of QC) | 101000  ",itemValue:"101000"},
                            {itemText:"USD Funds (outside of QC) | 102000",itemValue:"102000"},
                            {itemText:"USD Trust (QB only) | 108000",itemValue:"108000"},
                            {itemText:"Canadian Trust (QB only) | 106000",itemValue:"106000"},
                            {itemText:"Debit Card (POS receipts) | 109000",itemValue:"109000"},
                            {itemText:"RBC Point Redemptions | 224000",itemValue:"224000"},
                            {itemText:"CWT Gift Card Redemptions | 227000",itemValue:"227000"},
                            {itemText:"Customer Credit Card - CWT (Visa) | 115000",itemValue:"115000"},
                            {itemText:"Customer Credit Card - CWT (Mastercard) | 116000",itemValue:"116000"},
                            {itemText:"Customer Credit Card - CWT (Amex) | 117000",itemValue:"117000"},
                            {itemText:"Customer Credit Card - CWT (Diners) | 118000 ",itemValue:"118000"},
                      ] ;


}

loadPassenger(){
  this.passengerList= this.pnrService.getPassengers();  
  this.passengerList = ["Test Pass","Test Pass 2"];
}

}
