
import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { PassiveSegmentModel } from 'src/app/models/passive-segment.model';
import { SelectItem } from 'src/app/models/select.item.model';
import { PnrService } from 'src/app/service/pnr.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-update-tour-segment',
  templateUrl: './update-tour-segment.component.html',
  styleUrls: ['./update-tour-segment.component.scss']
})
export class UpdateTourSegmentComponent implements OnInit {
  title: string;
  passiveSegment: PassiveSegmentModel;
  isSubmitted:boolean;


  @ViewChild('bankAccount') bankAccEl: ElementRef;
  constructor(public activeModal: BsModalService, private pnrService: PnrService,private modalRef:BsModalRef) {
    this.passiveSegment = new PassiveSegmentModel();

  }

  ngOnInit() {
  }


  saveSegment() {
     this.isSubmitted=true;
    this.modalRef.hide();
  }


}
