
import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { PassiveSegmentModel } from 'src/app/models/passive-segment.model';
import { SelectItem } from 'src/app/models/select.item.model';
import { PnrService } from 'src/app/service/pnr.service';
import { BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-update-tour-segment',
  templateUrl: './update-tour-segment.component.html',
  styleUrls: ['./update-tour-segment.component.scss']
})
export class UpdateTourSegmentComponent implements OnInit {
  title: string;
  passiveSegment: PassiveSegmentModel;



  @ViewChild('bankAccount') bankAccEl: ElementRef;
  constructor(public activeModal: BsModalService, private pnrService: PnrService) {
    this.passiveSegment = new PassiveSegmentModel();

  }

  ngOnInit() {
  }


  saveSegment() {

    this.activeModal.show(this.passiveSegment);
  }


}
