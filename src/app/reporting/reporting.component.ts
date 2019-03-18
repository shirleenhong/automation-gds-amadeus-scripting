import { Component, OnInit } from '@angular/core';
import { SelectItem } from '../models/select.item.model'
import { PnrService } from '../service/pnr.service'
import { RemarkCollectionService } from '../service/remark.collection.service';
import { RemarkGroup } from '../models/remark.group.model';
import { RemarkModel } from '../models/remark.model';
@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss']
})
export class ReportingComponent implements OnInit {
  bspRouteCodeList: SelectItem[];
  routeCode: string;
  tripType: number;
  reasonForTravel: string;
  isDisabled: boolean;

  constructor(private pnrService: PnrService, private remarkCollectionService: RemarkCollectionService) { }

  ngOnInit() {
    if (!this.pnrService.isPNRLoaded) this.pnrService.getPNR();
    this.getRouteCodes();
    this.getPnrCFLine();
  }

  getRouteCodes() {
    //todo Get from API DDB 
    this.bspRouteCodeList = [{ itemText: "", itemValue: "-1" },
    { itemText: "USA incl. all US Territories and Possessions", itemValue: "0" },
    { itemText: "Mexico/Central America/Canal Zone/Costa Rica", itemValue: "1" },
    { itemText: "Caribbean and Bermuda", itemValue: "2" },
    { itemText: "South America4", itemValue: "3" },
    { itemText: "Europe-incl. Morocco/Tunisia/Algeria/Greenland", itemValue: "4" },
    { itemText: "Africa", itemValue: "5" },
    { itemText: "Middle East/Western Asia", itemValue: "6" },
    { itemText: "Asia incl. India", itemValue: "7" },
    { itemText: "Australia/New Zealand/Islands of the Pacific incl. Hawaii excl. Guam", itemValue: "8" },
    { itemText: "Canada and St. Pierre et Miquelon", itemValue: "9" }
    ];
  }

  getPnrCFLine() {

    var cfLine = this.pnrService.getCFLine();

    if (cfLine != '') {
      if (cfLine.slice(-1) == 'N') {
        this.tripType = 1;
      } else if (cfLine.slice(-1) == 'C') {
        this.tripType = 2;
      }
      var cfa = cfLine.substring(4, 3);
      if (cfa == "" || cfa == "") this.tripType = 2;
      this.isDisabled = false
    } else {
      this.isDisabled = true;
    }


  }

  routeCodeChange() {
    this.getPnrCFLine();
    this.buildRemark();
  }

  buildRemark() {
    var remText = "FS" + this.routeCode + '' + this.tripType;
    var rmGroup = new RemarkGroup();
    rmGroup.group = "BSP Routing"
    rmGroup.cryptics = new Array<string>();

    var existNumber = this.pnrService.getFSLineNumber();
    if (existNumber != "") {
      rmGroup.deleteRemarkByIds = new Array<string>();
      rmGroup.deleteRemarkByIds.push(existNumber);
    }
    rmGroup.cryptics.push(remText);
    this.remarkCollectionService.addUpdateRemarkGroup(rmGroup);


  }



}
