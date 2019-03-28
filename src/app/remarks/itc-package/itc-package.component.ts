import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-itc-package',
  templateUrl: './itc-package.component.html',
  styleUrls: ['./itc-package.component.scss']
})
export class ItcPackageComponent implements OnInit {

  itcForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.itcForm = this.fb.group({
      noAdult: new FormControl('', [Validators.pattern('[0-9]*')]),
      noChild: new FormControl('', [Validators.pattern('[0-9]*')]),
      noInfant: new FormControl('', [Validators.pattern('[0-9]*')]),
      baseAdult: new FormControl('', [Validators.pattern('^[0-9]+\\.[0-9][0-9]$')]),
      baseChild: new FormControl('', [Validators.pattern('^[0-9]+\\.[0-9][0-9]$')]),
      baseInfant: new FormControl('', [Validators.pattern('^[0-9]+\\.[0-9][0-9]$')]),
      taxAdult: new FormControl('', [Validators.pattern('^[0-9]+\\.[0-9][0-9]$')]),
      taxChild: new FormControl('', [Validators.pattern('^[0-9]+\\.[0-9][0-9]$')]),
      taxInfant: new FormControl('', [Validators.pattern('^[0-9]+\\.[0-9][0-9]$')]),
      bcruiseAdult: new FormControl('', [Validators.pattern('^[0-9]+\\.[0-9][0-9]$')]),
      bcruiseChild: new FormControl('', [Validators.pattern('^[0-9]+\\.[0-9][0-9]$')]),
      bcruiseInfant: new FormControl('', [Validators.pattern('^[0-9]+\\.[0-9][0-9]$')]),
      tcruiseAdult: new FormControl('', [Validators.pattern('^[0-9]+\\.[0-9][0-9]$')]),
      tcruiseChild: new FormControl('', [Validators.pattern('^[0-9]+\\.[0-9][0-9]$')]),
      tcruiseInfant: new FormControl('', [Validators.pattern('^[0-9]+\\.[0-9][0-9]$')]),
      railAdult: new FormControl('', [Validators.pattern('^[0-9]+\\.[0-9][0-9]$')]),
      railChild: new FormControl('', [Validators.pattern('^[0-9]+\\.[0-9][0-9]$')]),
      railInfant: new FormControl('', [Validators.pattern('^[0-9]+\\.[0-9][0-9]$')]),
      insAdult: new FormControl('', [Validators.pattern('^[0-9]+\\.[0-9][0-9]$')]),
      insChild: new FormControl('', [Validators.pattern('^[0-9]+\\.[0-9][0-9]$')]),
      insInfant: new FormControl('', [Validators.pattern('^[0-9]+\\.[0-9][0-9]$')]),
      hotelAdult: new FormControl('', [Validators.pattern('^[0-9]+\\.[0-9][0-9]$')]),
      carAdult: new FormControl('', [Validators.pattern('^[0-9]+\\.[0-9][0-9]$')]),
      depAdult: new FormControl('', [Validators.pattern('^[0-9]+\\.[0-9][0-9]$')]),
      balance: new FormControl('', []),
      dueDate: new FormControl('', []),
      commission: new FormControl('', [Validators.pattern('^[0-9]+\\.[0-9][0-9]$')])
    });
  }

  ngOnInit() {


  }

  get f() {
    return this.itcForm.controls;
  }

  ComputeBalance() {
    let totalBalance = 0;
    totalBalance = this.ComputeAdult() + this.ComputeChild() + this.ComputeInfant();
    if (this.f.depAdult.value) { totalBalance = totalBalance - Number(this.f.depAdult.value); }
    // this.f.balance.value = totalBalance.toString();
    this.itcForm.controls['balance'].setValue(totalBalance);
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
      if (this.f.hotelAdult.value) { adultsum = adultsum + (Number(this.f.noAdult.value) * Number(this.f.hotelAdult.value)); }
      if (this.f.carAdult.value) { adultsum = adultsum + (Number(this.f.noAdult.value) * Number(this.f.carAdult.value)); }
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

}
