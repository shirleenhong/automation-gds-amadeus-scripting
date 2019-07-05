import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
      // cwtItinerary: new FormControl('', []),
      bspRefund: new FormControl('', []),
      personalQueue: new FormControl('', []),
      queueNo: new FormControl('', [])
    });
  }

  ngOnInit() {
    this.cfLine = this.pnrService.getCFLine();
  }

  get f() {
    return this.queueForm.controls;
  }

  showQueueNumber(controlValue) {
    if (controlValue) {
      this.queueForm.get('queueNo').enable();
      this.queueForm.get('queueNo').setValidators(Validators.required);
      this.queueForm.get('queueNo').updateValueAndValidity();
    } else {
      this.queueForm.get('queueNo').disable();
    }
  }
}
