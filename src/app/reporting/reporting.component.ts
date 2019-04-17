import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  OnChanges,
  SimpleChange,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { SelectItem } from '../models/select-item.model';
import { PnrService } from '../service/pnr.service';
import { RemarkModel } from '../models/pnr/remark.model';
import { ReportingViewModel } from '../models/reporting-view.model';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl
} from '@angular/forms';
import { DDBService } from '../service/ddb.service';
import { ConciergeUdidsComponent } from './concierge-udids/concierge-udids.component';
import { UtilHelper } from '../helper/util.helper';
@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss']
})
export class ReportingComponent implements OnInit, OnChanges {

  @ViewChild(ConciergeUdidsComponent) conciergeComponent: ConciergeUdidsComponent;

  @Input()
  reportingView: ReportingViewModel;
  bspRouteCodeList: SelectItem[];
  destinationList: Array<any>;
  remarkList: Array<RemarkModel>;
  reportingForm: FormGroup;
  enableReason = false;
  enableInsurance = false;
  countryList: Array<string>;
  isCVC = false;

  constructor(private pnrService: PnrService, private ddbService: DDBService, private utilHelper: UtilHelper) {

  }
  get f() { return this.reportingForm.controls; }

  ngOnChanges(changes: SimpleChanges) { }

  ngOnInit() {
    this.reportingForm = new FormGroup({
      bspRouteCode: new FormControl('', [Validators.required]),
      companyName: new FormControl(''),
      destinationList: new FormControl('', [Validators.required]),
      u86: new FormControl('', [Validators.required]),
      showInsurance: new FormControl('', []),
      insuranceDeclinedReason: new FormControl('')
    });

    this.getRouteCodes();
    this.getPnrCFLine();
    this.getDestination();
    this.countryList = [
      '',
      'GHANA',
      'NIGERIA',
      'PAKISTAN',
      'JOHANNESBURG-SOUTH AFRICA',
      'NONE OF THE ABOVE'
    ];
    this.reportingView.showInsurance = true;
    this.loadRemarksFromGds();
  }


  loadRemarksFromGds() {
    const company = this.pnrService.getRemarkText('U10/-').replace('U10/-', '');
    const insuranceDeclinedReason = this.pnrService.getRemarkText('U12/-').replace('U12/-', '');
    // this.f.companyName.setValue(company);
    // this.f.insuranceDeclinedReason.setValue(insuranceDeclinedReason);
    // 
    const fs = this.pnrService.getFSRemark();

    //  if (fs !== '') { this.f.bspRouteCode.setValue(fs.substr(0, 1), { onlySelf: false }); }
    const dest = this.pnrService.getRemarkText('DE/-').replace('DE/-', '');
    // this.f.destinationList.setValue(dest);
    // todo remove model and use reactive form
    this.reportingView.companyName = company;
    this.reportingView.insuranceDeclinedReason = insuranceDeclinedReason;
    this.reportingView.destination = dest;
    this.reportingView.showInsurance = (insuranceDeclinedReason === '');
    this.f.showInsurance.setValue(insuranceDeclinedReason === '' ? 'Yes' : 'No');
    if (fs !== undefined && fs !== '') { this.reportingView.routeCode = fs.substr(0, 1); }


  }


  isRbmRbp() {
    if (this.reportingView.cfLine === null) { return false; }
    return ((this.reportingView.cfLine.cfa === 'RBM' || this.reportingView.cfLine.cfa === 'RBP'));

  }

  enableDisbleControls(ctrls: string[], isDisabled: boolean) {
    ctrls.forEach(x => {
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

  showInsurance() {
    this.f.insuranceDeclinedReason.clearValidators();
    this.reportingView.showInsurance = (this.f.showInsurance.value === 'Yes');
    this.f.insuranceDeclinedReason.setValidators(Validators.required);
  }

  checkInsurance() {
    this.enableDisbleControls(['insuranceDeclinedReason'], (this.f.showInsurance.value === 'YES'));
    if (this.f.showInsurance.value === 'YES') {
      this.reportingView.insuranceDeclinedReason = '';
      this.f.insuranceDeclinedReason.setValue('');
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
        this.isCVC = (this.reportingView.cfLine.cfa === 'CVC');
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
      if (!this.conciergeComponent.conciergeForm.valid) { return false; }
    }


    this.utilHelper.validateAllFields(this.reportingForm);
    if (!this.reportingForm.valid) {
      return false;
    }

    return true;
  }

}
