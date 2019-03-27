import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  OnChanges,
  SimpleChange,
  SimpleChanges
} from '@angular/core';
import { SelectItem } from '../models/select-item.model';
import { PnrService } from '../service/pnr.service';
import { RemarkModel } from '../models/pnr/remark.model';
import { ReportingViewModel } from '../models/reporting-view.model';
import { CfRemarkModel } from '../models/pnr/cf-remark.model';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl
} from '@angular/forms';
import { DDBService } from '../service/ddb.service';
@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss']
})
export class ReportingComponent implements OnInit, AfterViewInit, OnChanges {
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

  constructor(private pnrService: PnrService, private ddbService: DDBService) { }

  ngAfterViewInit() {

  }

  ngOnChanges(changes: SimpleChanges) { }

  ngOnInit() {
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

  checkInsurance() {
    if (this.pnrService.getRemarkLineNumber('U12/-') === '') {
      return false;
    } else {
      return true;
    }
  }

  getPnrCFLine() {
    const cfLine = this.pnrService.getRemarkText('CF/-');

    this.reportingView.cfLine = new CfRemarkModel();

    if (cfLine !== '') {
      this.reportingView.cfLine.lastLetter = cfLine.substr(-1);
      if (this.reportingView.cfLine.lastLetter === 'N') {
        this.reportingView.tripType = 2;
      } else if (this.reportingView.cfLine.lastLetter === 'C') {
        this.reportingView.tripType = 1;
      }
      const cfa = cfLine.substr(4, 3);
      if (cfa === 'RBM' || cfa === 'RBP') {
        this.reportingView.tripType = 2;
      }

      this.reportingView.isDisabled = false;
      this.reportingView.cfLine.cfa = cfa;
      this.reportingView.cfLine.code = cfLine;
      this.checkDestination();
      this.isCVC = (cfa === 'CVC');

    } else {
      this.reportingView.isDisabledDest = true;
      this.reportingView.isDisabled = true;
    }
  }
}
