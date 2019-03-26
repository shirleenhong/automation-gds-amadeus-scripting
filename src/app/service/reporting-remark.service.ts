import { Injectable } from "@angular/core";
import { ReportingViewModel } from "../models/reporting-view.model";
import { RemarkGroup } from "../models/pnr/remark.group.model";
import { RemarkModel } from "../models/pnr/remark.model";
import { PnrService } from "./pnr.service";
import { DatePipe } from "@angular/common";

@Injectable({
  providedIn: "root"
})
export class ReportingRemarkService {
  constructor(private pnrService: PnrService) {}

  public GetRoutingRemark(reporting: ReportingViewModel) {
    const rmGroup = new RemarkGroup();
    rmGroup.group = "Routing";
    rmGroup.remarks = new Array<RemarkModel>();
    rmGroup.deleteRemarkByIds = new Array<string>();
    this.getFSRemarks(reporting, rmGroup);
    this.getDestinationRemarks(reporting, rmGroup);
    this.getUDIDRemarks(reporting, rmGroup);
    return rmGroup;
  }

  getFSRemarks(reporting: ReportingViewModel, rmGroup: RemarkGroup) {
    if (reporting.routeCode == null) {
      return;
    }
    const remText = reporting.routeCode + "" + reporting.tripType;
    rmGroup.remarks.push(this.getRemark(remText, "FS", ""));

    const existNumber = this.pnrService.getFSLineNumber();
    if (existNumber !== "") {
      rmGroup.deleteRemarkByIds.push(existNumber);
    }
  }

  getDestinationRemarks(reporting: ReportingViewModel, rmGroup: RemarkGroup) {
    if (reporting.destination == null) {
      return;
    }

    const remText = "DE/-" + reporting.destination;
    rmGroup.remarks.push(this.getRemark(remText, "RM", "*"));
    const existNumber = this.pnrService.getRemarkLineNumber("DE/-");
    if (existNumber !== "") {
      rmGroup.deleteRemarkByIds.push(existNumber);
    }
  }

  getUDIDRemarks(reporting: ReportingViewModel, rmGroup: RemarkGroup) {
    // *U86
    let remText = "U86/-OVERRIDE LEI";
    rmGroup.remarks.push(this.getRemark(remText, "RM", "*"));

    // *U10
    if (reporting.cfLine.cfa === "CVC") {
      const companyname = reporting.companyName;
      remText = "U10/-" + companyname;
      rmGroup.remarks.push(this.getRemark(remText, "RM", "*"));
    }

    // *U12
    const insuranceDeclined = reporting.insuranceDeclinedReason;
    remText = "U12/-" + insuranceDeclined;
    rmGroup.remarks.push(this.getRemark(remText, "RM", "*"));

    // *U13
    const datePipe = new DatePipe("en-US");
    const dateToday = datePipe.transform(Date.now(), "ddMMM");
    remText = "U30/-NEWLEI" + dateToday;
    rmGroup.remarks.push(this.getRemark(remText, "RM", "*"));
  }

  getRemark(remarkText, remarkType, remarkCategory) {
    const rem = new RemarkModel();
    rem.remarkType = remarkType;
    rem.remarkText = remarkText;
    rem.category = remarkCategory;
    return rem;
  }
}
