import { Component, OnInit, ViewChild } from '@angular/core';
import { SeatsComponent } from './seats/seats.component';
import { IrdRemarksComponent } from './ird-remarks/ird-remarks.component';
import { OfcDocumentationComponent } from './ofc-documentation/ofc-documentation.component';
import { CounselorDetail } from 'src/app/globals/counselor-identity';

@Component({
  selector: 'app-corp-remarks',
  templateUrl: './corp-remarks.component.html',
  styleUrls: ['./corp-remarks.component.scss']
})
export class CorpRemarksComponent implements OnInit {
  @ViewChild(SeatsComponent) seatsComponent: SeatsComponent;
  @ViewChild(IrdRemarksComponent) irdRemarks: IrdRemarksComponent;
  @ViewChild(OfcDocumentationComponent) ofcDocumentation: OfcDocumentationComponent;

  isOfc = false;

  constructor(private counselorDetail: CounselorDetail) {}

  ngOnInit() {
    this.counselorDetail.identityOnChange.subscribe((x) => {
      this.isOfc = x === 'OFC';
    });
  }
}
