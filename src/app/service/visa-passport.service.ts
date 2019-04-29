import { Injectable } from '@angular/core';
import { PnrService } from './pnr.service';
import { FormGroup } from '@angular/forms';
import { RemarkModel } from '../models/pnr/remark.model';
import { RemarkGroup } from '../models/pnr/remark.group.model';
import { RemarkHelper } from '../helper/remark-helper';
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';

@Injectable({
    providedIn: 'root'
  })

  export class VisaPassportService {
    formGroup: FormGroup;
    remarkGroup: RemarkGroup;
    datePipe = new DatePipe('en-US');

    constructor(private pnrService: PnrService, private remarkHelper: RemarkHelper) { }

  GetRemarks(form: FormGroup) {
     this.formGroup = form;
     this.remarkGroup = new RemarkGroup();
     this.remarkGroup.group = 'Visa Passport Group';
     this.remarkGroup.remarks = new Array<RemarkModel>();
     this.formGroup.get('segments').enable();

     if (this.formGroup.get('isEnabled').value !== false) {
     this.AddAdvisory();
     this.DeleteExistingVisaSegmentRemarks();
     this.AddSegments();
     }

     let items: any;
     // tslint:disable-next-line:no-string-literal
     items = this.formGroup.get('segments')['controls'];
     // tslint:disable-next-line:prefer-for-of
     for (let i = 0; i < items.length; i ++) {
      // tslint:disable-next-line:no-string-literal
       items[i].controls['country'].disable();
      //  tslint:disable-next-line:no-string-literal
       items[i].controls['segmentLine'].disable();
          }
      //}
     return this.remarkGroup;
  }

  AddCitizenship(): void {
    this.remarkGroup.remarks.push(this.remarkHelper.createRemark('CITIZENSHIP-' + this.formGroup.controls.citizenship.value, 'RM', 'P'));
  }

  AddAdvisory(): void {
     // tslint:disable-next-line:max-line-length
    if (this.formGroup.controls.passportName.value !== '') {
       // tslint:disable-next-line:max-line-length
       if (this.pnrService.getRemarkText('ADVISED ' + this.formGroup.controls.passportName.value.toUpperCase() + ' VALID PASSPORT IS REQUIRED') === '') {
        // tslint:disable-next-line:max-line-length
        this.remarkGroup.remarks.push(this.remarkHelper.createRemark('ADVISED ' + this.formGroup.controls.passportName.value + ' VALID PASSPORT IS REQUIRED', 'RM', '*'));
       }
     }
    if (this.pnrService.getRemarkText('INTERNATIONAL TRAVEL ADVISORY SENT') === '') {
      this.remarkGroup.remarks.push(this.remarkHelper.createRemark('INTERNATIONAL TRAVEL ADVISORY SENT', 'RM', '*'));
     }
  }

  DeleteExistingVisaSegmentRemarks(): void {
     const pnr = this.pnrService.pnrObj;
     const rem = ' - A VALID PASSPORT';
     pnr.rirElements.forEach(x => {
     let remText: string;
     remText = x.fullNode.miscellaneousRemarks.remarks.freetext;
     if ( remText.indexOf(rem) !== -1 ) {
        this.remarkGroup.deleteRemarkByIds.push(x.elementNumber);
      }
     });
  }

  AddSegments(): void {
    this.formGroup.controls.segments.value.forEach(x => {
      if (!x.visa) {
        // tslint:disable-next-line:max-line-length
        this.remarkGroup.remarks.push(this.getRemarksModel(x.country.toUpperCase() + ' - A VALID PASSPORT IS REQUIRED', 'RI', 'R', x.tatooNumber));
      } else {
        // tslint:disable-next-line:max-line-length
        this.remarkGroup.remarks.push(this.getRemarksModel(x.country.toUpperCase() + ' - A VALID PASSPORT AND VISA ARE REQUIRED', 'RI', 'R', x.tatooNumber));
      }
    });
  }

  public getRemarksModel(remText, type, cat, segment?: string) {
    let segmentrelate = [];
    if (segment) {
        segmentrelate = segment.split(',');
    }

    const rem = new RemarkModel();
    rem.category = cat;
    rem.remarkText = remText;
    rem.remarkType = type;
    rem.relatedSegments = segmentrelate;
    return rem;
}
}
