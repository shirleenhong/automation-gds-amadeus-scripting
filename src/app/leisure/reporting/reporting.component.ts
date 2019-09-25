import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { SelectItem } from '../../models/select-item.model';
import { PnrService } from '../../service/pnr.service';
import { RemarkModel } from '../../models/pnr/remark.model';
import { ReportingViewModel } from '../../models/reporting-view.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DDBService } from '../../service/ddb.service';
import { ConciergeUdidsComponent } from './concierge-udids/concierge-udids.component';
import { UtilHelper } from '../../helper/util.helper';
import { TranslationService } from '../../service/translation.service';
@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss']
})
export class ReportingComponent implements OnInit, OnChanges {
  @ViewChild(ConciergeUdidsComponent)
  conciergeComponent: ConciergeUdidsComponent;

  @Input()
  reportingView = new ReportingViewModel();
  bspRouteCodeList: SelectItem[];
  destinationList: Array<any>;
  remarkList: Array<RemarkModel>;
  reportingForm: FormGroup;
  enableReason = false;
  enableInsurance = false;
  countryList: Array<string>;
  isCVC = false;
  warningMessage = '';

  constructor(
    private pnrService: PnrService,
    private ddbService: DDBService,
    private utilHelper: UtilHelper,
    private translation: TranslationService
  ) { }
  get f() {
    return this.reportingForm.controls;
  }

  ngOnChanges(_changes: SimpleChanges) { }

  ngOnInit() {
    this.reportingForm = new FormGroup({
      bspRouteCode: new FormControl('', [Validators.required]),
      companyName: new FormControl(''),
      destinationList: new FormControl('', [Validators.required]),
      // u86: new FormControl('', [Validators.required]),
      showInsurance: new FormControl('', []),
      insuranceDeclinedReason: new FormControl(''),
      aa: new FormControl(''),
      bb: new FormControl(''),
      cc: new FormControl(''),
      dd: new FormControl(''),
      ee: new FormControl(''),
      ff: new FormControl('')
    });
    this.warningMessage = '';

    this.getRouteCodes();
    this.getPnrCFLine();
    this.getDestination();
    this.countryList = ['', 'GHANA', 'NIGERIA', 'PAKISTAN', 'JOHANNESBURG-SOUTH AFRICA', 'NONE OF THE ABOVE'];
    this.reportingView.showInsurance = true;
    this.loadRemarksFromGds();
  }

  loadRemarksFromGds() {
    const company = this.pnrService.getRemarkText('U10/-').replace('U10/-', '');
    const insuranceDeclinedReason = this.pnrService.getRemarkText('U12/-').replace('U12/-', '');
    this.checkInsurance(insuranceDeclinedReason === '' ? 'YES' : 'NO');
    const fs = this.pnrService.getFSRemark();
    const dest = this.pnrService.getRemarkText('DE/-').replace('DE/-', '');
    // todo remove model and use reactive form
    this.reportingView.companyName = company;
    this.reportingView.insuranceDeclinedReason = insuranceDeclinedReason;
    this.reportingView.destination = dest;
    this.reportingView.showInsurance = insuranceDeclinedReason === '';

    if (insuranceDeclinedReason) {
      this.f.showInsurance.setValue('NO');
    } else if (this.pnrService.getRirRemarkText('LE FORFAIT D ASSURANCE')
      || this.pnrService.getRirRemarkText('ALL INCLUSIVE OR PREMIUM PROTECTION INSURANCE HAS BEEN')) {
      this.f.showInsurance.setValue('YES');
    }

    // this.f.showInsurance.setValue(insuranceDeclinedReason === '' ? 'YES' : 'NO');
    if (fs !== undefined && fs !== '') {
      this.reportingView.routeCode = fs.substr(0, 1);
    }

    if (insuranceDeclinedReason !== '') {
      const rems = [
        'DELUXE PACKAGE INSURANCE',
        'CANCELLATION/INTERUPTION',
        'EMERGENCY MEDICAL/TRANSPORTATION',
        'FLIGHT AND TRAVEL ACCIDENT',
        'RENTAL CAR PHYSICAL DAMAGE',
        'COVERAGE FOR THE FULL DOLLAR VALUE OF THE TRIP'
      ];
      const lang = this.pnrService.getItineraryLanguage();
      let i = 1;
      rems.forEach((x) => {
        const rem = '...' + this.translation.translate(x, lang);
        if (this.pnrService.getRirRemarkText(rem) !== '') {
          // tslint:disable-next-line: no-shadowed-variable
          const opt = this.reportingView.declinedOption.find((x) => x.value === i.toString());
          opt.checked = opt !== undefined && opt !== null;
        }
        i++;
      });
    }
  }

  isRbmRbp() {
    if (this.reportingView.cfLine === null) {
      return false;
    }

    this.enableDisbleControls(['showInsurance'],
      (this.reportingView.cfLine.cfa === 'RBM' || this.reportingView.cfLine.cfa === 'RBP'));

    if (!(this.reportingView.cfLine.cfa === 'RBM' || this.reportingView.cfLine.cfa === 'RBP')) {
      this.f.showInsurance.setValidators(Validators.required);
    } else {
      this.f.showInsurance.clearValidators();
    }

    return this.reportingView.cfLine.cfa === 'RBM' || this.reportingView.cfLine.cfa === 'RBP';
  }

  enableDisbleControls(ctrls: string[], isDisabled: boolean) {
    ctrls.forEach((x) => {
      if (isDisabled) {
        this.reportingForm.get(x).disable();
      } else {
        this.reportingForm.get(x).enable();
      }
    });
  }

  getRouteCodes() {
    this.bspRouteCodeList = this.ddbService.getRouteCodeList();
  }

  getDestination() {
    this.destinationList = this.pnrService.getPnrDestinations();
  }

  checkDestination() {
    if (this.destinationList !== undefined && this.destinationList.length <= 1) {
      this.reportingView.isDisabledDest = true;
    } else {
      this.reportingView.isDisabledDest = false;
    }
  }

  checkInsurance(val) {
    this.enableDisbleControls(['insuranceDeclinedReason'], val === 'YES');
    this.reportingView.showInsurance = val === 'YES';
    if (val === 'YES') {
      this.reportingView.insuranceDeclinedReason = '';
      this.f.insuranceDeclinedReason.setValue('');
      this.f.insuranceDeclinedReason.clearValidators();
      // this.f.declinedOption.clearValidators();
    } else {
      this.f.insuranceDeclinedReason.setValidators(Validators.required);
      // this.f.declinedOption.setValidators(Validators.required);
    }
  }

  getPnrCFLine() {
    this.reportingView.cfLine = this.pnrService.getCFLine();

    if (this.reportingView.cfLine != null) {
      if (this.reportingView.cfLine.code !== '') {
        if (this.reportingView.cfLine.lastLetter === 'N') {
          this.reportingView.tripType = 2;
        } else if (this.reportingView.cfLine.lastLetter === 'C') {
          this.reportingView.tripType = 1;
        }
        if (this.reportingView.cfLine.cfa === 'RBM' || this.reportingView.cfLine.cfa === 'RBP') {
          this.reportingView.tripType = 2;
        }
        this.reportingView.isDisabled = false;
        this.isCVC = this.reportingView.cfLine.cfa === 'CVC';
        if (this.isCVC) {
          this.f.companyName.setValidators(Validators.required);
        }
        this.checkDestination();
      } else {
        this.reportingView.isDisabledDest = true;
        this.reportingView.isDisabled = true;
      }
    }
  }

  checkValid() {
    if (this.isRbmRbp()) {
      this.utilHelper.validateAllFields(this.conciergeComponent.conciergeForm);
      this.enableDisbleControls(['insuranceDeclinedReason'], true);
      if (!this.conciergeComponent.conciergeForm.valid) {
        return false;
      }
    } else if (!this.reportingView.showInsurance) {
      const opt = this.reportingView.declinedOption.find((x) => x.checked === true);
      if (!opt) {
        this.warningMessage = '*Please select insurance type.';
        return false;
      }
    }

    this.utilHelper.validateAllFields(this.reportingForm);
    if (!this.reportingForm.valid) {
      return false;
    }

    return true;
  }
}
