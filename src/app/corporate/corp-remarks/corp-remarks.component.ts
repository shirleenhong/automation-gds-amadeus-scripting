import { Component, OnInit, ViewChild } from '@angular/core';
import { SeatsComponent } from './seats/seats.component';
import { IrdRemarksComponent } from './ird-remarks/ird-remarks.component';
import { OfcDocumentationComponent } from './ofc-documentation/ofc-documentation.component';
import { CounselorDetail } from 'src/app/globals/counselor-identity';
import { UtilHelper } from 'src/app/helper/util.helper';
import { DocumentPnrComponent } from './document-pnr/document-pnr.component';


@Component({
  selector: 'app-corp-remarks',
  templateUrl: './corp-remarks.component.html',
  styleUrls: ['./corp-remarks.component.scss']
})
export class CorpRemarksComponent implements OnInit {
  @ViewChild(SeatsComponent) seatsComponent: SeatsComponent;
  @ViewChild(IrdRemarksComponent) irdRemarks: IrdRemarksComponent;
  @ViewChild(DocumentPnrComponent) documentComponent: DocumentPnrComponent;
  @ViewChild(OfcDocumentationComponent) ofcDocumentation: OfcDocumentationComponent;

  isOfc = false;

  constructor(private counselorDetail: CounselorDetail, private utilHelper: UtilHelper) {}

  ngOnInit() {
    this.counselorDetail.identityOnChange.subscribe((x) => {
      this.isOfc = x === 'OFC';
    });
  }


  checkValid() {
    if (this.irdRemarks !== undefined) {
      this.utilHelper.validateAllFields(this.irdRemarks.irdGroup);
      if (!this.irdRemarks.irdGroup.valid) {
        return false;
      }
    }

    // this.utilHelper.validateAllFields(this.seatsComponent);
    // if (!this.seatsComponent.valid) {
    //   return false;
    // }

    return true;
  }
}
