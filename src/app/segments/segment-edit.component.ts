/**
 * Simple component to abstract the editing of a segment
 * object.
 */

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {SelectItem} from '../models/select.item.model'

@Component({
  selector: 'segment-edit',
  templateUrl: './segment-edit.html'
})
export class SegmentEditComponent implements OnInit {
  segmentForm: FormGroup;
  bspSupplierName: SelectItem[];
  suppliername: String; 

  @Input() segment;
  @Output() saveSegment = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.segmentForm = this.fb.group({
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
    this.segmentForm.setValue({
      id: this.segment.id || -1,
      suppliername: this.segment.suppliername || '',
      from: this.segment.from || '',
      to: this.segment.to || '',
      startDate: this.segment.startDate || '',
      startTime: this.segment.startTime || '',
      endDate: this.segment.endDate || '',
      endTime: this.segment.endTime || '',
      confirmationNo: this.segment.confirmationNo || '',
      unitPrice: this.segment.unitPrice || '',
      currency: this.segment.currency || ''
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

  onSegmentFormSubmit() {
    let dataModel = this.segmentForm.value;
    this.saveSegment.emit(dataModel);
  }
}
