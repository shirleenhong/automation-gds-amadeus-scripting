/**
 * Simple component to abstract the editing of a receipt
 * object.
 */

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {SelectItem} from '../models/select.item.model'

@Component({
  selector: 'receipt-edit',
  templateUrl: './receipt-edit.html'
})
export class ReceiptEditComponent implements OnInit {
  receiptForm: FormGroup;
  bspSupplierName: SelectItem[];
  suppliername: String; 

  @Input() receipt;
  @Output() saveReceipt = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.receiptForm = this.fb.group({
      id: '',
      suppliername: '',
      from: '',
      to: '',
      startDate:'',
      startTime:'',
      endDate:'',
      endTime:'',
      confirmationNo:'',
      unitPrice:'',
      currency:''
    });
  }

  ngOnInit() {
    this.receiptForm.setValue({
      id: this.receipt.id || -1,
      suppliername: this.receipt.suppliername || '',
      from: this.receipt.from || '',
      to: this.receipt.to || '',
      startDate: this.receipt.startDate || '',
      startTime: this.receipt.startTime || '',
      endDate: this.receipt.endDate || '',
      endTime: this.receipt.endTime || '',
      confirmationNo: this.receipt.confirmationNo || '',
      unitPrice: this.receipt.unitPrice || '',
      currency: this.receipt.currency || ''
    });
    // this.getSupplierCode();
  }

  getSupplierCode(){
    //todo Get from API DDB 
      this.bspSupplierName =[ {itemText:"",itemValue:"-1"},
            {itemText:"Eurostar",itemValue:"0"},
            {itemText:"Eurotunnel",itemValue:"1"},
            {itemText:"Test",itemValue:"2"}
          ];
    }

  onReceiptFormSubmit() {
    let dataModel = this.receiptForm.value;
    this.saveReceipt.emit(dataModel);
  }
}
