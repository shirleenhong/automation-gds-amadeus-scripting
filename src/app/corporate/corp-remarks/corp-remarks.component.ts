import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { SeatsComponent } from './seats/seats.component';
import { IrdRemarksComponent } from './ird-remarks/ird-remarks.component';
import { UtilHelper } from 'src/app/helper/util.helper';
import { DocumentPnrComponent } from './document-pnr/document-pnr.component';
import { CounselorDetail } from '../../globals/counselor-identity';
import { EscRemarksComponent } from './esc-remarks/esc-remarks.component';
import { VisaPassportComponent } from 'src/app/shared/visa-passport/visa-passport.component';
import { PnrService } from '../../service/pnr.service';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ContainerComponent } from '../business-rules/container/container.component';
import { RulesEngineService } from 'src/app/service/business-rules/rules-engine.service';
import { AssociatedRemarksComponent } from 'src/app/leisure/remarks/associated-remarks/associated-remarks.component';
import { FareRuleSegmentComponent } from 'src/app/leisure/remarks/fare-rule-segment/fare-rule-segment.component';

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
  @ViewChild(ContainerComponent) containerComponent: ContainerComponent;
  @ViewChild(AssociatedRemarksComponent)
  associatedRemarksComponent: AssociatedRemarksComponent;
  @ViewChild(FareRuleSegmentComponent)
  fareRuleSegmentComponent: FareRuleSegmentComponent;

  getPassiveSegments = [];
  isOfc = false;
  isEsc: boolean;
  isPassive: any;
  hasRules = false;
  @Input() windowFilter: string;
  isStandalone = false;

  constructor(
    private utilHelper: UtilHelper,
    private counselorDetail: CounselorDetail,
    private pnrService: PnrService,
    private rulesEngineService: RulesEngineService
  ) {}

  ngOnInit() {
    this.counselorDetail.identityOnChange.subscribe((x) => {
      this.isEsc = x === 'ESC';
    });
    this.isPassive = this.checkIfPassiveSegmentPresent();
    this.hasRules = this.rulesEngineService.checkRuleResultExist('UI_DISPLAY_CONTAINER', 'REMARKS');

    if (this.windowFilter === 'STANDALONE') {
      this.isStandalone = true;
    }
  }
  checkValid() {
    if (this.irdRemarks !== undefined) {
      this.utilHelper.validateAllFields(this.irdRemarks.irdGroup);
      if (!this.irdRemarks.irdGroup.valid) {
        return false;
      }
    }

    if (
      this.viewPassportComponent.isInternational &&
      (!this.viewPassportComponent.visaPassportView.citizenship.length ||
        (!this.viewPassportComponent.visaPassportView.passportName.length &&
          (!this.viewPassportComponent.advisoryClicked || !this.viewPassportComponent.isInternationalTravelAdvisorySent)))
    ) {
      // Indicate invalidities of the required Visa and Passport Advisory fields...
      const group = this.viewPassportComponent.visaPassportFormGroup;
      group.get('isInternationalTravelAdvisorySent').markAsTouched();
      group.get('citizenship').markAsTouched();
      group.get('passportName').markAsTouched();

      return false;
    }

    if (this.addContactComponent && this.addContactComponent.addContactForm) {
      this.utilHelper.validateAllFields(this.addContactComponent.addContactForm);
      if (!this.addContactComponent.addContactForm.valid) {
        return false;
      }
    }

    // this.utilHelper.validateAllFields(this.seatsComponent);
    // if (!this.seatsComponent.valid) {
    //   return false;
    // }

    return true;
  }

  checkIfPassiveSegmentPresent() {
    for (const seg of this.pnrService.pnrObj.airSegments) {
      if (seg.status !== 'GK') {
        return false;
      }
    }

    return true;
  }
}
