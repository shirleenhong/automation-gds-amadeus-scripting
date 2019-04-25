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

     if (this.formGroup.controls.originDestination.value === 'true') {
     // this.AddCitizenship();
     this.AddAdvisory();
     this.AddSegments();

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
    }
     return this.remarkGroup;
  }

  AddCitizenship(): void {
    this.remarkGroup.remarks.push(this.remarkHelper.createRemark('CITIZENSHIP-' + this.formGroup.controls.citizenship.value, 'RM', 'P'));
  }

  AddAdvisory(): void {
     // tslint:disable-next-line:max-line-length
    this.remarkGroup.remarks.push(this.remarkHelper.createRemark('ADVISED ' + this.formGroup.controls.passportName.value + ' VALID PASSPORT IS REQUIRED', 'RI', 'R'));
    this.remarkGroup.remarks.push(this.remarkHelper.createRemark('INTERNATIONAL TRAVEL ADVISORY SENT', 'RM', '*'));
  }

  AddSegments(): void {
    this.formGroup.controls.segments.value.forEach(x => {
      if (x.visa === '') {
        // tslint:disable-next-line:max-line-length
        this.remarkGroup.remarks.push(this.getRemarksModel(x.country.toUpperCase() + ' - A VALID PASSPORT IS REQUIRED', 'RI', 'R', x.tatooNumber));
      } else if (x.visa) {
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
