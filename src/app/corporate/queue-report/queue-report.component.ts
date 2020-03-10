import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MoveQueueComponent } from './move-queue/move-queue.component';
import { AccessQueueComponent } from './access-queue/access-queue.component';
import { ProductivityReportComponent } from './productivity-report/productivity-report.component';

@Component({
  selector: 'app-queue-report',
  templateUrl: './queue-report.component.html',
  styleUrls: ['./queue-report.component.scss']
})
export class QueueReportComponent implements OnInit {
  queueReportList: Array<any>;
  queueReportForm: FormGroup;

  @ViewChild(MoveQueueComponent) moveQueueComponent: MoveQueueComponent;
  @ViewChild(AccessQueueComponent) accessQueueComponent: AccessQueueComponent;
  @ViewChild(ProductivityReportComponent) productivityReportComponent: ProductivityReportComponent;

  constructor() {
    this.loadQueueReportType();
  }

  ngOnInit() {
    this.queueReportForm = new FormGroup({
      queueReport: new FormControl('', [Validators.required])
    });
  }

  loadQueueReportType() {
    this.queueReportList = [
      { itemText: '', itemValue: '' },
      { itemText: 'Move PNRs from a Queue to Work', itemValue: 'MOVE' },
      { itemText: 'Access Queue to work PNRs/Track Queue work', itemValue: 'ACCESS' },
      { itemText: 'Queue Productivity Report', itemValue: 'PRODUCTIVITY' }
    ];
  }

  get f() {
    return this.queueReportForm.controls;
  }
}
