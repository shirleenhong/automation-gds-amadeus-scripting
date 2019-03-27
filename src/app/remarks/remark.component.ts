import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange, ViewEncapsulation } from '@angular/core';
import { RemarkViewModel } from '../models/remark-view.model';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormGroup, Validator, AbstractControl, ValidationErrors, Validators, FormBuilder } from "@angular/forms";
import { SelectItem } from '../models/select-item.model';

@Component({
  selector: 'app-remarks',
  templateUrl: './remark.component.html',
  styleUrls: ['./remark.component.scss']
})
export class RemarkComponent implements OnInit, OnChanges {
  remarkForm: FormGroup;
  @Input() remarkSection: RemarkViewModel;

  @Input() group: FormGroup;
  packageList: Array<SelectItem>;

  constructor(private fb: FormBuilder) {
    this.loadtourPackage();
    this.remarkForm = this.fb.group({
      packageList: new FormControl('', [Validators.required])
      // segmentNum: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('form group: ', this.group);
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

