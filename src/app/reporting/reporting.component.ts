import { Component, OnInit, Input, AfterViewInit, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { SelectItem } from '../models/select-item.model';
import { PnrService } from '../service/pnr.service';
import { RemarkModel } from '../models/pnr/remark.model';
import { ReportingViewModel } from '../models/reporting-view.model';
import { CfRemarkModel } from '../models/pnr/cf-remark.model';
@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss']
})
export class ReportingComponent implements OnInit, AfterViewInit, OnChanges {

  @Input()
  reportingView: ReportingViewModel;
  bspRouteCodeList: SelectItem[];
  destinationList: SelectItem[];
  remarkList: Array<RemarkModel>;

  constructor(private pnrService: PnrService) {

  }

  ngAfterViewInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    this.getPnrCFLine();
  }

  ngOnInit() {
    this.destinationList = this.pnrService.getPnrDestinations();
    this.getRouteCodes();

  }

  getRouteCodes() {
    // todo Get from API DDB
    this.bspRouteCodeList = [{ itemText: '', itemValue: '-1' },
    { itemText: 'USA incl. all US Territories and Possessions', itemValue: '0' },
    { itemText: 'Mexico/Central America/Canal Zone/Costa Rica', itemValue: '1' },
    { itemText: 'Caribbean and Bermuda', itemValue: '2' },
    { itemText: 'South America4', itemValue: '3' },
    { itemText: 'Europe-incl. Morocco/Tunisia/Algeria/Greenland', itemValue: '4' },
    { itemText: 'Africa', itemValue: '5' },
    { itemText: 'Middle East/Western Asia', itemValue: '6' },
    { itemText: 'Asia incl. India', itemValue: '7' },
    { itemText: 'Australia/New Zealand/Islands of the Pacific incl. Hawaii excl. Guam', itemValue: '8' },
    { itemText: 'Canada and St. Pierre et Miquelon', itemValue: '9' }
    ];
  }

  reportingChange() {
    this.getPnrCFLine();
  }

  getPnrCFLine() {

    const cfLine = this.pnrService.getCFLine();

    this.reportingView.cfLine = new CfRemarkModel();

    if (cfLine !== '') {
      this.reportingView.cfLine.lastLetter = cfLine.substr(-1);
      if (this.reportingView.cfLine.lastLetter === 'N') {
        this.reportingView.tripType = 2;
      } else if (this.reportingView.cfLine.lastLetter === 'C') {
        this.reportingView.tripType = 1;
      }
      const cfa = cfLine.substr(4, 3);
      if (cfa === 'RBM' || cfa === 'RBP') { this.reportingView.tripType = 2; }
      this.reportingView.isDisabled = false;
      this.reportingView.cfLine.cfa = cfa;
      this.reportingView.cfLine.code = cfLine;
    } else {
      this.reportingView.isDisabled = true;
    }

  }


}
