import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange, ViewEncapsulation } from '@angular/core';
import { RemarkViewModel } from '../models/remark-view.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
// import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormGroup, Validator, AbstractControl, ValidationErrors } from "@angular/forms";

@Component({
  selector: 'app-remarks',
  templateUrl: './remark.component.html',
  styleUrls: ['./remark.component.scss']
})
export class RemarkComponent implements OnInit, OnChanges {

  @Input() remarkSection: RemarkViewModel;

  @Input() group: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngAfterViewInit(): void {
    // throw new Error("Method not implemented.");
    this.f.priceRemarkSelector.patchValue('0');
  }

  ngOnInit() {
    this.group = this.fb.group({
      priceRemarkSelector: new FormControl('')
    });
  }

  get f() { return this.group.controls; }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('form group: ', this.group);
  }

}

