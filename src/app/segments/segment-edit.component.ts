/**
 * Simple component to abstract the editing of a segment
 * object.
 */

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'segment-edit',
  template: `
    <form [formGroup]="segmentForm" (ngSubmit)="onSegmentFormSubmit()">
      <input type="hidden" formControlName="id">
      <div class="form-group">
        <label for="suppliername">Suppliername</label>
        <input type="text" class="form-control" id="suppliername" placeholder="Suppliername" formControlName="suppliername">
      </div>
      <div class="form-group">
        <label for="from">From</label>
        <input type="text" class="form-control" id="from" placeholder="From" formControlName="from">
      </div>
      <div class="form-group">
        <label for="to">To</label>
        <input type="text" class="form-control" id="to" placeholder="To" formControlName="to">
      </div>
      <button type="submit" class="btn btn-primary">Save</button>
    </form>
  `
})
export class SegmentEditComponent implements OnInit {
  segmentForm: FormGroup;

  @Input() segment;
  @Output() saveSegment = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.segmentForm = this.fb.group({
      id: '',
      suppliername: '',
      from: '',
      to: ''
    });
  }

  ngOnInit() {
    this.segmentForm.setValue({
      id: this.segment.id || -1,
      suppliername: this.segment.suppliername || '',
      from: this.segment.from || '',
      to: this.segment.to || ''
    });
  }

  onSegmentFormSubmit() {
    let dataModel = this.segmentForm.value;
    this.saveSegment.emit(dataModel);
  }
}
