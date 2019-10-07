import { Component, OnInit, Input} from '@angular/core';
import { SelectItem } from 'src/app/models/select-item.model';
import { PnrService } from 'src/app/service/pnr.service';
import { DDBService } from 'src/app/service/ddb.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ReportingViewModel } from 'src/app/models/reporting-view.model';

@Component({
  selector: 'app-reporting-remarks',
  templateUrl: './reporting-remarks.component.html',
  styleUrls: ['./reporting-remarks.component.scss']
})
export class ReportingRemarksComponent implements OnInit {
  bspRouteCodeList: SelectItem[];
  isTripTypeCorporate = false;
  countryDest = '';
  reportingForm: FormGroup;
  routeCode = '';
  @Input()reportingRemarksView = new ReportingViewModel();
  constructor(private pnrService: PnrService,
              private ddbService: DDBService) { }

  ngOnInit() {
    this.reportingForm = new FormGroup({
      bspRouteCode: new FormControl('', [Validators.required]),
    });
    this.bspRoutingCodeProcess();
  }
  bspRoutingCodeProcess() {
    if (this.checkTripType()) {
      this.isTripTypeCorporate = true;
      this.getRouteCodes();
      this.reportingRemarksView.tripType = 1;
    }
  }
  getCountryDest(item) {
    this.reportingRemarksView.routeCode = item;
  }
  checkTripType(): boolean {
    const rmElements = this.pnrService.pnrObj.rmElements;
    for (const rmElement of rmElements) {
      if (rmElement.category === '*' && rmElement.freeFlowText.indexOf('CF/-') > -1) {
        const lastLetter = rmElement.freeFlowText.substr(-1);
        if (lastLetter === 'C') {
          return true;
        }
      }
    }
    return false;
  }
  getRouteCodes() {
    this.bspRouteCodeList = this.ddbService.getRouteCodeList();
  }
}
