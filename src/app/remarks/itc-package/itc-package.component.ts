import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SelectItem } from 'src/app/models/select-item.model';
import { DecimalPipe } from '@angular/common';
import { DDBService } from 'src/app/service/ddb.service';

@Component({
  selector: 'app-itc-package',
  templateUrl: './itc-package.component.html',
  styleUrls: ['./itc-package.component.scss']
})
export class ItcPackageComponent implements OnInit {
  bspCurrencyList: SelectItem[];
  itcForm: FormGroup;
  decPipe = new DecimalPipe('en-US');

  constructor(private fb: FormBuilder, private ddb: DDBService) {
    this.itcForm = this.fb.group({
      itcCurrencyType: new FormControl(''),
      noAdult: new FormControl('', [Validators.pattern('[0-9]*')]),
      noChild: new FormControl('', [Validators.pattern('[0-9]*')]),
      noInfant: new FormControl('', [Validators.pattern('[0-9]*')]),
      baseAdult: new FormControl(''),
      baseChild: new FormControl(''),
      baseInfant: new FormControl(''),
      taxAdult: new FormControl(''),
      taxChild: new FormControl(''),
      taxInfant: new FormControl(''),
      bcruiseAdult: new FormControl(''),
      bcruiseChild: new FormControl(''),
      bcruiseInfant: new FormControl(''),
      tcruiseAdult: new FormControl(''),
      tcruiseChild: new FormControl(''),
      tcruiseInfant: new FormControl(''),
      railAdult: new FormControl(''),
      railChild: new FormControl(''),
      railInfant: new FormControl(''),
      insAdult: new FormControl(''),
      insChild: new FormControl(''),
      insInfant: new FormControl(''),
      hotelAdult: new FormControl(''),
      carAdult: new FormControl(''),
      depAdult: new FormControl(''),
      balance: new FormControl('', []),
      dueDate: new FormControl('', []),
      commission: new FormControl('')
    });
  }

  ngOnInit() {
    this.getCurrencies();

  }

  get f() {
    return this.itcForm.controls;
  }

  ComputeBalance() {
    let totalBalance = 0;
    totalBalance = this.ComputeAdult() + this.ComputeChild() + this.ComputeInfant();
    if (this.f.depAdult.value) { totalBalance = totalBalance - Number(this.f.depAdult.value); }

    // tslint:disable-next-line:no-string-literal
    this.itcForm.controls['balance'].setValue(this.decPipe.transform(totalBalance, '1.2-2'));
  }

  ComputeAdult() {
    let adultsum = 0;
    if (this.f.noAdult.value) {
      if (this.f.baseAdult.value) { adultsum = adultsum + (Number(this.f.noAdult.value) * Number(this.f.baseAdult.value)); }
      if (this.f.taxAdult.value) { adultsum = adultsum + (Number(this.f.noAdult.value) * Number(this.f.taxAdult.value)); }
      if (this.f.bcruiseAdult.value) { adultsum = adultsum + (Number(this.f.noAdult.value) * Number(this.f.bcruiseAdult.value)); }
      if (this.f.tcruiseAdult.value) { adultsum = adultsum + (Number(this.f.noAdult.value) * Number(this.f.tcruiseAdult.value)); }
      if (this.f.railAdult.value) { adultsum = adultsum + (Number(this.f.noAdult.value) * Number(this.f.railAdult.value)); }
      if (this.f.insAdult.value) { adultsum = adultsum + (Number(this.f.noAdult.value) * Number(this.f.insAdult.value)); }
      if (this.f.hotelAdult.value) { adultsum = adultsum + (Number(this.f.hotelAdult.value)); }
      if (this.f.carAdult.value) { adultsum = adultsum + (Number(this.f.carAdult.value)); }
    }
    return adultsum;
  }

  ComputeChild() {
    let childsum = 0;
    if (this.f.noChild.value) {
      if (this.f.baseChild.value) { childsum = childsum + (Number(this.f.noAdult.value) * Number(this.f.baseAdult.value)); }
      if (this.f.taxChild.value) { childsum = childsum + (Number(this.f.noAdult.value) * Number(this.f.taxAdult.value)); }
      if (this.f.bcruiseChild.value) { childsum = childsum + (Number(this.f.noAdult.value) * Number(this.f.bcruiseAdult.value)); }
      if (this.f.tcruiseChild.value) { childsum = childsum + (Number(this.f.noAdult.value) * Number(this.f.tcruiseAdult.value)); }
      if (this.f.railChild.value) { childsum = childsum + (Number(this.f.noAdult.value) * Number(this.f.railAdult.value)); }
      if (this.f.insChild.value) { childsum = childsum + (Number(this.f.noAdult.value) * Number(this.f.insAdult.value)); }
    }
    return childsum;
  }

  ComputeInfant() {
    let infantsum = 0;
    if (this.f.noInfant.value) {
      if (this.f.baseInfant.value) { infantsum = infantsum + (Number(this.f.noAdult.value) * Number(this.f.baseAdult.value)); }
      if (this.f.taxInfant.value) { infantsum = infantsum + (Number(this.f.noAdult.value) * Number(this.f.taxAdult.value)); }
      if (this.f.bcruiseInfant.value) { infantsum = infantsum + (Number(this.f.noAdult.value) * Number(this.f.bcruiseAdult.value)); }
      if (this.f.tcruiseInfant.value) { infantsum = infantsum + (Number(this.f.noAdult.value) * Number(this.f.tcruiseAdult.value)); }
      if (this.f.railInfant.value) { infantsum = infantsum + (Number(this.f.noAdult.value) * Number(this.f.railAdult.value)); }
      if (this.f.insInfant.value) { infantsum = infantsum + (Number(this.f.noAdult.value) * Number(this.f.insAdult.value)); }
    }
    return infantsum;
  }

  getCurrencies() {
    // TODO: Get from API DDB
    this.bspCurrencyList = this.ddb.getCurrencies();
  }

}
