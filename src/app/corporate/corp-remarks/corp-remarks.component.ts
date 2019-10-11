import { Component, OnInit, ViewChild } from '@angular/core';
import { SeatsComponent } from './seats/seats.component';
import { IrdRemarksComponent } from './ird-remarks/ird-remarks.component';
import { UtilHelper } from 'src/app/helper/util.helper';
import { DocumentPnrComponent } from './document-pnr/document-pnr.component';
import { VisaPassportComponent } from 'src/app/shared/visa-passport/visa-passport.component';

@Component({
  selector: 'app-corp-remarks',
  templateUrl: './corp-remarks.component.html',
  styleUrls: ['./corp-remarks.component.scss']
})
export class CorpRemarksComponent implements OnInit {
  @ViewChild(SeatsComponent) seatsComponent: SeatsComponent;
  @ViewChild(IrdRemarksComponent) irdRemarks: IrdRemarksComponent;
  @ViewChild(DocumentPnrComponent) documentComponent: DocumentPnrComponent;
  @ViewChild(VisaPassportComponent)
  viewPassportComponent: VisaPassportComponent;

  isOfc = false;

  constructor(private utilHelper: UtilHelper) { }

  ngOnInit() { }

  checkValid() {
    if (this.irdRemarks !== undefined) {
      this.utilHelper.validateAllFields(this.irdRemarks.irdGroup);
      if (!this.irdRemarks.irdGroup.valid) {
        return false;
      }
    }

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

    // this.utilHelper.validateAllFields(this.seatsComponent);
    // if (!this.seatsComponent.valid) {
    //   return false;
    // }

    return true;
  }
}
