import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-productivity-report',
  templateUrl: './productivity-report.component.html',
  styleUrls: ['./productivity-report.component.scss']
})
export class ProductivityReportComponent implements OnInit {
  countForManual: number;
  productivityReportForm: FormGroup;
  reportFileName: string;
  manualFileName: string;
  DATE_PIPE = new DatePipe('en-US');
  queueNumber: string;
  category: string;

  constructor() {}

  ngOnInit() {
    const dt = this.DATE_PIPE.transform(new Date(), 'yyyy-MM-dd');
    this.reportFileName = 'C:\\AmadeusOutput_Prod_' + dt + '.xls';
    this.manualFileName = 'C:\\AmadeusOutput_MProd_' + dt + '.xls';
    this.queueNumber = '50';
    this.category = '200';
    this.productivityReportForm = new FormGroup({
      forClosing: new FormControl(this.reportFileName, [Validators.required]),
      queueNumber: new FormControl(this.queueNumber, [Validators.required]),
      category: new FormControl(this.category, [Validators.required]),
      forManual: new FormControl(this.manualFileName, [])
    });
  }

  get f() {
    return this.productivityReportForm.controls;
  }
}
