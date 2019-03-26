import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange, ViewEncapsulation, ViewChild, AfterViewInit } from '@angular/core';
import { RemarkViewModel } from '../models/remark-view.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TourPackageComponent } from './tour-package/tour-package.component';
// import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormGroup, Validator, AbstractControl, ValidationErrors } from "@angular/forms";

@Component({
  selector: 'app-remarks',
  templateUrl: './remark.component.html',
  styleUrls: ['./remark.component.scss']
})
export class RemarkComponent {

  @ViewChild(TourPackageComponent) tourPackageComponent: TourPackageComponent;

  @Input() remarkSection: RemarkViewModel;

  group: FormGroup;

  constructor(private fb: FormBuilder) {
    this.group = new FormGroup({
      priceRemarkSelector: new FormControl('', [Validators.required])
    }, { updateOn: 'blur' });
  }

  getSelector() {
    // this.group.priceRemarkSelector = '1';
  }

}

