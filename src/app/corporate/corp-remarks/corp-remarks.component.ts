import { Component, OnInit, ViewChild } from '@angular/core';
import { SeatsComponent } from './seats/seats.component';
import { IrdRemarksComponent } from './ird-remarks/ird-remarks.component';
import { UtilHelper } from 'src/app/helper/util.helper';
import { DocumentPnrComponent } from './document-pnr/document-pnr.component';
import { CounselorDetail } from '../../globals/counselor-identity';
import { EscRemarksComponent } from './esc-remarks/esc-remarks.component';
import { VisaPassportComponent } from 'src/app/shared/visa-passport/visa-passport.component';
import { PnrService } from '../../service/pnr.service';
import {AddContactComponent} from './add-contact/add-contact.component'

@Component({
  selector: 'app-corp-remarks',
  templateUrl: './corp-remarks.component.html',
  styleUrls: ['./corp-remarks.component.scss']
})
export class CorpRemarksComponent implements OnInit {
  @ViewChild(SeatsComponent) seatsComponent: SeatsComponent;
  @ViewChild(IrdRemarksComponent) irdRemarks: IrdRemarksComponent;
  @ViewChild(DocumentPnrComponent) documentComponent: DocumentPnrComponent;
  @ViewChild(EscRemarksComponent) escRemarksComponent: EscRemarksComponent;
  @ViewChild(AddContactComponent) addContactComponent: AddContactComponent;
  @ViewChild(VisaPassportComponent)
  viewPassportComponent: VisaPassportComponent;
  getPassiveSegments=[];
  isOfc = false;
  isEsc: boolean;
  isPassive: any;

  constructor(private utilHelper: UtilHelper,private counselorDetail:CounselorDetail,private pnrService: PnrService) {}

  ngOnInit() {
    this.counselorDetail.identityOnChange.subscribe((x) => {
    this.isEsc = x === 'ESC';
    });
    this.isPassive = this.checkIfPassiveSegmentPresent();
   }
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

  checkIfPassiveSegmentPresent() {
    this.getPassiveSegments = this.pnrService.getModelPassiveSegments();
    let count = 0;
    for (const seg of this.getPassiveSegments) {
      count = seg.isPassive === true ? count + 1 : count;
    }
    return count > 0 ? true : false;
  }
}
