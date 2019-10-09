import { Component, OnInit, ViewChild } from '@angular/core';
import { SeatsComponent } from './seats/seats.component';
import { IrdRemarksComponent } from './ird-remarks/ird-remarks.component';

@Component({
  selector: 'app-corp-remarks',
  templateUrl: './corp-remarks.component.html',
  styleUrls: ['./corp-remarks.component.scss']
})
export class CorpRemarksComponent implements OnInit {

  @ViewChild(SeatsComponent) seatsComponent: SeatsComponent;
  @ViewChild(IrdRemarksComponent) irdRemarks: IrdRemarksComponent;
  constructor() { }

  ngOnInit() {
  }

}
