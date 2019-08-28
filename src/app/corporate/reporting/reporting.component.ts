import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportingBSPComponent } from './reporting-bsp/reporting-bsp.component';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss']
})
export class ReportingComponent implements OnInit {
  @ViewChild(ReportingBSPComponent) reportingBSPComponent: ReportingBSPComponent;

  constructor() {}

  ngOnInit() {}
}
