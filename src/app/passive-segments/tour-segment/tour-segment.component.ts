import { Component, OnInit, OnChanges } from '@angular/core';
import { PassiveSegmentModel } from '../../models../../models/passive-segment.model';
import { UpdateTourSegmentComponent } from '../update-tour-segment/update-tour-segment.component';
import { RemarkModel } from 'src/app/models/remark.model';
import { DatePipe } from '@angular/common';
import { RemarkGroup } from '../../models/remark.group.model';
import { RemarkCollectionService } from '../../service/remark.collection.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-tour-segment',
  templateUrl: './tour-segment.component.html',
  styleUrls: ['./tour-segment.component.scss']
})
export class TourSegmentComponent implements OnInit, OnChanges {


  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    // this.buildRemark();
  }

  tourSegmentList: Array<PassiveSegmentModel>;
  private modalRef: BsModalRef;
  segmentList: Array<PassiveSegmentModel>;

  constructor(private modalService: BsModalService, private remarkCollectionService: RemarkCollectionService) {
    this.tourSegmentList = new Array<PassiveSegmentModel>();
    this.segmentList = new Array<PassiveSegmentModel>();
  }

  ngOnInit() {
  }

  buildRemark(dataModel) {
    var passive = new PassiveSegmentModel();
    var datePipe = new DatePipe("en-US");

    passive.endDate = dataModel.endDate;
    passive.vendor = "1A";
    passive.passiveSegmentType = "Tour";
    passive.startDate = datePipe.transform(dataModel.startDate, 'ddMMyy');
    passive.endDate = datePipe.transform(dataModel.endDate, "ddMMyy")
    passive.startTime = "";
    passive.endTime = "";
    passive.startPoint = dataModel.from;
    passive.endPoint = dataModel.to;
    passive.quantity = 1;

    var datePipe = new DatePipe("en-US");
    var startdatevalue = datePipe.transform(dataModel.startDate, 'ddMMM');
    var enddatevalue = datePipe.transform(dataModel.endDate, "ddMM")
    var startTime = (<string>dataModel.startTime).replace(':', '');
    var endTime = (<string>dataModel.endTime).replace(':', '');
    passive.status = "HK";

    var freetext = "TYP-TOR/SUC-ZZ/SC" + dataModel.startPoint + "/SD-" + startdatevalue +
      "/ST-" + startTime + "/EC-" + dataModel.endPoint + "/ED-" +
      enddatevalue + "/ET-" + endTime + "/PS-1";

    this.segmentList.push(passive);

    passive.freeText = freetext;
    var passGroup = new RemarkGroup();
    passGroup.group = "Segment Remark";
    passGroup.passiveSegments = this.segmentList

    this.remarkCollectionService.addUpdateRemarkGroup(passGroup);

  }



  addPassiveSegment() {

    var passiveSegment = new PassiveSegmentModel();
    this.modalRef = this.modalService.show(UpdateTourSegmentComponent);

    // TODO: convert to ngx
    // this.modalRef.componentInstance['title'] = "Add Tour Segment";
    // // tourSegment.rln = (this.tourSegmentList.length +1);
    // this.modalRef.componentInstance['passiveSegment'] = passiveSegment;
    // this.modalRef.result.then(x => {

    //   if (typeof (x) != "string") {
    //     this.tourSegmentList.push(x);
    //     this.buildRemark(x);
    //     // this.buildRemark();
    //   }
    // });

  }



}
