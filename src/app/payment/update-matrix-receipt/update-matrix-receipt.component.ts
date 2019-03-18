
import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MatrixReceiptModel, PaymentType } from 'src/app/models/matrix-receipt.model';
import { SelectItem } from 'src/app/models/select.item.model';
import { PnrService } from 'src/app/service/pnr.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-update-matrix-receipt',
  templateUrl: './update-matrix-receipt.component.html',
  styleUrls: ['./update-matrix-receipt.component.scss']
})
export class UpdateMatrixReceiptComponent implements OnInit {
title:string;
matrixReceipt: MatrixReceiptModel;
bankAccountList: Array<SelectItem>;
passengerList: Array<any>;
matrixForm:FormGroup;
isSubmitted:boolean;

@ViewChild('bankAccount') bankAccEl: ElementRef;
  constructor( public activeModal: NgbActiveModal,private pnrService:PnrService,private formBuilder: FormBuilder) { 
    this.bankAccountList=new Array<SelectItem>();
    this.matrixReceipt= new MatrixReceiptModel();
    this.loadBankAccount();
    this.matrixForm = new FormGroup({
      'bankAccount': new FormControl('',[Validators.required]),
      'passengerName': new FormControl('', [Validators.required]), 
      'description': new FormControl('', [Validators.required]), 
      'cwtRef': new FormControl('', [Validators.required,Validators.minLength(6), Validators.maxLength(6)]), 
      'points': new FormControl('', [Validators.required,Validators.minLength(7)],), 
      'lastFourVi': new FormControl('',[Validators.required,Validators.minLength(4), Validators.maxLength(4)]), 
      'gcNumber': new FormControl('', [Validators.maxLength(19)]), 
      'amount': new FormControl('', [Validators.required,Validators.min(0),Validators.pattern('[0-9]*')]), 
      'vendorCode': new FormControl('', [Validators.required,Validators.maxLength(10)]), 
      'ccNo': new FormControl('', [Validators.required,Validators.minLength(16),Validators.required,Validators.maxLength(16)]), 
      'expDate': new FormControl('', [Validators.required])
      
    },{updateOn:'blur'});
    

  }

 ngOnInit() {
     if (!this.pnrService.isPNRLoaded ) this.pnrService.getPNR();
     this.passengerList = this.pnrService.getPassengers();
 
    
  }

get PaymentType() {return PaymentType; }

  bankAccountChange(newValue){

    switch (newValue){
      case  '224000':
          this.matrixReceipt.paymentType= PaymentType.Rbc
          this.enableFormControls(['gcNumber','ccNo','expDate','vendorCode'],true);
          this.enableFormControls(['cwtRef','points','lastFourVi'],false);
          break;
      case '115000':
      case '116000':
      case '117000':
      case '118000':
           this.matrixReceipt.paymentType = PaymentType.CreditCard
           this.enableFormControls(['cwtRef','points','lastFourVi'],true);
           this.enableFormControls(['gcNumber','ccNo','expDate','vendorCode'],false);
        break;
      default:
        this.matrixReceipt.paymentType = PaymentType.Undefined
        this.enableFormControls(['cwtRef','points','lastFourVi'],true);
        this.enableFormControls(['ccNo','expDate','vendorCode'],true)
        this.enableFormControls(['gcNumber'],false);
        break;
    }

  }

enableFormControls(controls:string[],disabled:boolean){
  controls.forEach(c => {
    if (disabled){
      this.matrixForm.get(c).disable();
    }else {
      this.matrixForm.get(c).enable();
    }
  });

}


get f() { return this.matrixForm.controls; }

saveReceipt(){  
  this.isSubmitted=true;


  if (this.matrixForm.invalid) {
    alert("Please Complete And Complete all the required Information");
    return;
  }

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


getAllErrors(form: FormGroup | FormArray): { [key: string]: any; } | null {
  let hasError = false;
  const result = Object.keys(this.matrixForm.controls).reduce((acc, key) => {
      const control = this.matrixForm.get(key);
      
      const errors = (control instanceof FormGroup || control instanceof FormArray)
          ? this.getAllErrors(control)
          : (control.touched? control.errors :'') ;
      if (errors) {
          acc[key] = errors;
          hasError = true;
      }
      return acc;
  }, {} as { [key: string]: any; });
  return hasError ? result : null;
}


}
