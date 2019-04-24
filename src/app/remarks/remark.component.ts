import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { SelectItem } from '../models/select-item.model';
import { TourPackageComponent } from './tour-package/tour-package.component';
import { ItcPackageComponent } from './itc-package/itc-package.component';
import { PnrService } from 'src/app/service/pnr.service';
import { UtilHelper } from '../helper/util.helper';
import { CodeshareComponent } from './codeshare/codeshare.component';


@Component({
  selector: 'app-remarks',
  templateUrl: './remark.component.html',
  styleUrls: ['./remark.component.scss']
})
export class RemarkComponent implements OnInit {

  @ViewChild(TourPackageComponent) tourPackageComponent: TourPackageComponent;
  @ViewChild(ItcPackageComponent) itcPackageComponent: ItcPackageComponent;
  @ViewChild(CodeshareComponent) codeShareComponent: CodeshareComponent;
  remarkForm: FormGroup;


  
  packageList: Array<SelectItem>;

  constructor(private fb: FormBuilder, private pnrService: PnrService, private utilHelper: UtilHelper) {
    this.loadtourPackage();
    this.remarkForm = this.fb.group({
      packageList: new FormControl('', [Validators.required])
    });
  }
  ngOnInit() {
    this.remarkForm.controls.packageList.patchValue('1');
    this.setPackageListValue();
  }

  getSelector() {
    // this.group.priceRemarkSelector = '1';
  }


  loadtourPackage() {
    this.packageList = [{ itemText: '', itemValue: '' },
    { itemText: 'Itemize Package Cost Remarks', itemValue: 'ITC' },
    { itemText: 'Tour Package', itemValue: 'TP' }
    ];
  }

  private setPackageListValue() {
    if (this.pnrService.getRIIRemarkText('THE FOLLOWING COSTS ARE SHOWN IN')) {
      this.remarkForm.controls.packageList.patchValue('TP');
      if (this.pnrService.getRIIRemarkText('HOTEL/ACCOMMODATION') !== '' ||
        this.pnrService.getRIIRemarkText('CAR RENTAL') !== '') {
        this.remarkForm.controls.packageList.patchValue('ITC');
      }
    }
  }

  checkValid() {

    if (this.f.packageList.value === 'ITC') {
      this.utilHelper.validateAllFields(this.itcPackageComponent.itcForm);
      if (!this.itcPackageComponent.itcForm.valid) {
        return false;
      }
    } else if (this.f.packageList.value === 'TP') {
      this.utilHelper.validateAllFields(this.tourPackageComponent.group);
      if (!this.tourPackageComponent.group.valid) {
        return false;
      }
    }
    const arr = this.codeShareComponent.codeShareGroup.get('segments') as FormArray;
    // debugger;
    if (arr.length === 1) {
      const val1 = arr.controls[0].get('segment').value;
      const val2 = arr.controls[0].get('airline').value;
      if ((val1 === '' && val2 === '')) { } else if ((val1 === '' || val2 === '')) {
        this.utilHelper.validateAllFields(this.codeShareComponent.codeShareGroup);
        return false;
      }
    } else {

      if (arr.length > 1 && !this.codeShareComponent.codeShareGroup.valid) {
        this.utilHelper.validateAllFields(this.codeShareComponent.codeShareGroup);
        return false;
      }
    }
    return true;
  }


  get f() {
    return this.remarkForm.controls;
  }

}

