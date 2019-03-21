
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { PassiveSegmentModel } from 'src/app/models/pnr/passive-segment.model';
import { PnrService } from 'src/app/service/pnr.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { TourSegmentViewModel } from 'src/app/models/tour-segment-view.model';

@Component({
  selector: 'app-update-tour-segment',
  templateUrl: './update-tour-segment.component.html',
  styleUrls: ['./update-tour-segment.component.scss']
})
export class UpdateTourSegmentComponent implements OnInit {
  title: string;
  @Input()
  passiveSegment: PassiveSegmentModel;
  isSubmitted: boolean;

  @ViewChild('bankAccount') bankAccEl: ElementRef;
  constructor(public activeModal: BsModalService, private pnrService: PnrService, private modalRef: BsModalRef) {
    this.passiveSegment = new PassiveSegmentModel();

  }

  ngOnInit() {
  }


  saveSegment() {
    this.isSubmitted = true;
    this.modalRef.hide();
  }


}
