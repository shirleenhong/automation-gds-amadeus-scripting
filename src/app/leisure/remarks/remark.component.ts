import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { SelectItem } from '../../models/select-item.model';
import { TourPackageComponent } from './tour-package/tour-package.component';
import { ItcPackageComponent } from './itc-package/itc-package.component';
import { PnrService } from 'src/app/service/pnr.service';
import { UtilHelper } from '../../helper/util.helper';
import { CodeshareComponent } from './codeshare/codeshare.component';

// import { VisaPassportComponent } from '../../shared/visa-passport/visa-passport.component';
import { FareRuleSegmentComponent } from './fare-rule-segment/fare-rule-segment.component';
import { RbcPointsRedemptionComponent } from './rbc-points-redemption/rbc-points-redemption.component';
import { PackageRemarkHelper } from '../../helper/packageRemark-helper';
import { AssociatedRemarksComponent } from './associated-remarks/associated-remarks.component';
import { VisaPassportComponent } from 'src/app/shared/visa-passport/visa-passport.component';

@Component({
  selector: 'app-remarks',
  templateUrl: './remark.component.html',
  styleUrls: ['./remark.component.scss']
})
export class RemarkComponent implements OnInit {
  @ViewChild(TourPackageComponent) tourPackageComponent: TourPackageComponent;
  @ViewChild(ItcPackageComponent) itcPackageComponent: ItcPackageComponent;
  @ViewChild(VisaPassportComponent)
  viewPassportComponent: VisaPassportComponent;
  @ViewChild(CodeshareComponent) codeShareComponent: CodeshareComponent;
  @ViewChild(FareRuleSegmentComponent)
  fareRuleSegmentComponent: FareRuleSegmentComponent;
  @ViewChild(RbcPointsRedemptionComponent)
  rbcPointsRedemptionComponent: RbcPointsRedemptionComponent;
  @ViewChild(AssociatedRemarksComponent)
  associatedRemarksComponent: AssociatedRemarksComponent;

  remarkForm: FormGroup;
  isRbmRbp = false;
  packageList: Array<SelectItem>;

  constructor(
    private fb: FormBuilder,
    private pnrService: PnrService,
    private utilHelper: UtilHelper,
    private packageRemarkHelper: PackageRemarkHelper
  ) {
    this.loadtourPackage();
    this.remarkForm = this.fb.group({
      packageList: new FormControl('', [Validators.required])
    });
  }
  ngOnInit() {
    this.packageRemarkHelper.clearForDeletionRemarks();
    this.remarkForm.controls.packageList.patchValue('1');
    this.setPackageListValue();
    this.isRbmRbp = this.pnrService.isRbpRbm();
  }

  getSelector() {
    // this.group.priceRemarkSelector = '1';
  }

  loadtourPackage() {
    this.packageList = [
      { itemText: '', itemValue: '' },
      { itemText: 'Itemize Package Cost Remarks', itemValue: 'ITC' },
      { itemText: 'Tour Package', itemValue: 'TP' }
    ];
  }

  private setPackageListValue() {
    if (this.pnrService.getRirRemarkText('THE FOLLOWING COSTS ARE SHOWN IN')) {
      this.remarkForm.controls.packageList.patchValue('TP');
      if (this.pnrService.getRirRemarkText('ADULT PRICE--') !== '') {
        this.remarkForm.controls.packageList.patchValue('ITC');
      }
      this.packageList[0].itemText = 'Delete Package Remarks';
    } else {
      this.packageList[0].itemText = '';
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
    if (arr.length === 1) {
      const val1 = arr.controls[0].get('segment').value;
      const val2 = arr.controls[0].get('airline').value;
      if (val1 === '' && val2 === '') {
      } else if (val1 === '' || val2 === '') {
        this.utilHelper.validateAllFields(this.codeShareComponent.codeShareGroup);
        return false;
      }
    } else {
      if (arr.length > 1 && !this.codeShareComponent.codeShareGroup.valid) {
        this.utilHelper.validateAllFields(this.codeShareComponent.codeShareGroup);
        return false;
      }
    }

    // Check Visa and Passport
    if (this.viewPassportComponent.isInternational
      && (!this.viewPassportComponent.visaPassportView.citizenship.length
        || !this.viewPassportComponent.visaPassportView.passportName.length
        && (!this.viewPassportComponent.advisoryClicked || !this.viewPassportComponent.isInternationalTravelAdvisorySent))
    ) {
      // Indicate invalidities of the required Visa and Passport Advisory fields...
      this.viewPassportComponent.visaPassportFormGroup.controls['isInternationalTravelAdvisorySent'].markAsTouched();
      this.viewPassportComponent.visaPassportFormGroup.controls['citizenship'].markAsTouched();
      this.viewPassportComponent.visaPassportFormGroup.controls['passportName'].markAsTouched();

      return false;
    }

    return true;
  }

  get f() {
    return this.remarkForm.controls;
  }
}
