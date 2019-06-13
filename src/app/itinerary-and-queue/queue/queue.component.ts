import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PnrService } from 'src/app/service/pnr.service';
import { CfRemarkModel } from 'src/app/models/pnr/cf-remark.model';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {
  queueForm: FormGroup;
  cfLine: CfRemarkModel;

  constructor(private pnrService: PnrService) {
    this.queueForm = new FormGroup({
      nonBsp: new FormControl('', []),
      ticketExchange: new FormControl('', []),
      bspTicket: new FormControl('', []),
      refund: new FormControl('', []),
      cwtItinerary: new FormControl('', []),
      bspRefund: new FormControl('', []),
      personalQueue: new FormControl('', []),
      queueNo: new FormControl('', [])
    });
  }

  ngOnInit() {
    this.cfLine = this.pnrService.getCfLine();
  }

  get f() {
    return this.queueForm.controls;
  }
}
