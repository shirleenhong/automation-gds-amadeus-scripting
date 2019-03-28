import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange, ViewEncapsulation, ViewChild, AfterViewInit } from '@angular/core';
import { RemarkViewModel } from '../models/remark-view.model';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormGroup, Validator, AbstractControl, ValidationErrors, Validators, FormBuilder } from "@angular/forms";
import { SelectItem } from '../models/select-item.model';
// import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TourPackageComponent } from './tour-package/tour-package.component';
import { ItcPackageComponent } from './itc-package/itc-package.component';
// import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormGroup, Validator, AbstractControl, ValidationErrors } from "@angular/forms";

@Component({
  selector: 'app-remarks',
  templateUrl: './remark.component.html',
  styleUrls: ['./remark.component.scss']
})
export class RemarkComponent implements OnInit {

  @ViewChild(TourPackageComponent) tourPackageComponent: TourPackageComponent;
  @ViewChild(ItcPackageComponent) itcPackageComponent: ItcPackageComponent;
  remarkForm: FormGroup;
  @Input() remarkSection: RemarkViewModel;

  // @Input() group: FormGroup;
  packageList: Array<SelectItem>;

  constructor(private fb: FormBuilder) {
    this.loadtourPackage();
    this.remarkForm = this.fb.group({
      packageList: new FormControl('', [Validators.required])
      // packageList: new FormControl('', [Validators.required])
      // segmentNum: new FormControl('', [Validators.required])
    });
  }
  ngOnInit() {
    this.remarkForm.controls.packageList.patchValue('1');
  }

  getSelector() {
    // this.group.priceRemarkSelector = '1';
  }


  loadtourPackage() {
    this.packageList = [{ itemText: '', itemValue: '' },
    { itemText: 'ITC', itemValue: 'ITC' },
    { itemText: 'Tour Package', itemValue: 'TP' }
    ];
  }

  // showPackage(tourValue) {
  //   this.remarkForm.packageList = tourValue
  // }

  get f() {
    return this.remarkForm.controls;
  }

}

