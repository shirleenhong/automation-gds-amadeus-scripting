import { Injectable } from '@angular/core';
import { PnrService } from './pnr.service';
import { FormGroup } from '@angular/forms';
import { RemarkModel } from '../models/pnr/remark.model';
import { RemarkGroup } from '../models/pnr/remark.group.model';
import { RemarkHelper } from '../helper/remark-helper';
import { DatePipe } from '@angular/common';
import { RemarksManagerService } from './corporate/remarks-manager.service';

@Injectable({
  providedIn: 'root'
})
export class VisaPassportRemarkService {
  formGroup: FormGroup;
  remarkGroup: RemarkGroup;
  datePipe = new DatePipe('en-US');
  isEnabled: boolean;
  corpRemarks = [];

  constructor(private pnrService: PnrService, private remarkHelper: RemarkHelper, private rms: RemarksManagerService) {}

  private writeCorpAdvisory() {    
    if (!this.corpRemarks.find((x) => x.placeholder === 'CountryVisaRequires')) {
      this.rms.createEmptyPlaceHolderValue(['CountryVisaRequires'], null, '- A VALID PASSPORT IS REQUIRED');
    }

    if (!this.corpRemarks.find((x) => x.placeholder === 'CountryVisaPassportRequires')) {
      this.rms.createEmptyPlaceHolderValue(['CountryVisaPassportRequires'], null, '- A VALID PASSPORT AND VISA ARE REQUIRED');
    }

    this.corpRemarks.forEach((element) => {
      const remarks = new Map<string, string>();
      if (element.placeholder) {
        remarks.set(element.placeholder, element.placeholdervalue);
        // this.rms.createPlaceholderValues(remarks, null, null);
        this.rms.createPlaceholderValues(remarks, null, element.segment);
      }

      if (element.condition) {
        remarks.set(element.condition, element.conditionvalue);
        this.rms.createPlaceholderValues(null, remarks, null, null, 'INTERNATIONAL TRAVEL ADVISORY SENT');
      }
    });
  }

  GetRemarks(form: FormGroup) {
    this.formGroup = form;
    this.remarkGroup = new RemarkGroup();
    this.remarkGroup.group = 'Visa Passport Group';
    this.remarkGroup.remarks = new Array<RemarkModel>();
    this.formGroup.get('segments').enable();

    if (this.isEnabled === true) {
      this.AddAdvisory();
      this.DeleteExistingVisaSegmentRemarks();
      this.AddSegments();
    }

    let items: any;
    // tslint:disable-next-line:no-string-literal
    items = this.formGroup.get('segments')['controls'];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < items.length; i++) {
      items[i].controls.country.disable();
      items[i].controls.segmentLine.disable();
      items[i].controls.passport.disable();
    }
    // }
    return this.remarkGroup;
  }

  writeCorporateRemarks(form: FormGroup) {
    this.corpRemarks = new Array<any>();
    this.formGroup = form;
    this.formGroup.get('segments').enable();
    if (this.isEnabled === true) {
      this.AddAdvisory(true);
      this.AddSegments(true);
      this.writeCorpAdvisory();
    }
  }

  AddCitizenship(): void {
    this.remarkGroup.remarks.push(this.remarkHelper.createRemark('CITIZENSHIP-' + this.formGroup.controls.citizenship.value, 'RM', 'P'));
  }

  AddAdvisory(isCorp?: boolean): void {
    if (this.formGroup.controls.passportName.value !== '') {
      const remarkText = this.pnrService.getRemarkText('ADVISED').substr(8, 60);
      const passportName = remarkText.substr(0, remarkText.indexOf('VALID') - 1);
      if (passportName !== this.formGroup.controls.passportName.value.toUpperCase()) {
        if (isCorp) {
          this.corpRemarks.push({
            placeholder: 'PassportName',
            placeholdervalue: this.formGroup.controls.passportName.value,
            condition: null,
            segment: null
          });
        } else {
          const search = 'ADVISED ' + remarkText;
          this.remarkGroup.deleteRemarkByIds.push(this.pnrService.getRemarkLineNumber(search));
          this.remarkGroup.remarks.push(
            this.remarkHelper.createRemark(
              'ADVISED ' + this.formGroup.controls.passportName.value + ' VALID PASSPORT IS REQUIRED',
              'RM',
              ''
            )
          );
        }
      }
    }

    if (this.pnrService.getRemarkText('INTERNATIONAL TRAVEL ADVISORY SENT') === '') {
      if (isCorp) {
        this.corpRemarks.push({
          placeholder: null,
          placeholdervalue: null,
          condition: 'InternationalTravelSent',
          conditionvalue: 'true',
          segment: null
        });
      } else {
        this.remarkGroup.remarks.push(this.remarkHelper.createRemark('INTERNATIONAL TRAVEL ADVISORY SENT', 'RM', ''));
      }
    }
  }

  DeleteExistingVisaSegmentRemarks(): void {
    const pnr = this.pnrService.pnrObj;
    const rem = ' - A VALID PASSPORT';
    pnr.rirElements.forEach((x) => {
      let remText: string;
      remText = x.fullNode.miscellaneousRemarks.remarks.freetext;
      if (remText.indexOf(rem) !== -1) {
        this.remarkGroup.deleteRemarkByIds.push(x.elementNumber);
      }
    });
  }

  AddSegments(corp?: boolean): void {    
    this.formGroup.controls.segments.value.forEach((x) => {
      if (!x.visa) {
        const segments = x.tatooNumber;
        const rm = this.remarkHelper.createRemark(x.country.toUpperCase() + ' - A VALID PASSPORT IS REQUIRED', 'RI', 'R');
        rm.relatedSegments = [];
        const s = segments.split(',');
        // tslint:disable-next-line: no-shadowed-variable
        s.forEach((x) => {
          rm.relatedSegments.push(x);
        });
        if (corp) {
          this.corpRemarks.push(
            // tslint:disable-next-line:max-line-length
            {
              placeholder: 'CountryVisaRequires',
              placeholdervalue: x.country.toUpperCase(),
              condition: null,
              conditionvalue: null,
              segment: rm.relatedSegments
            }
          );
        } else {
          this.remarkGroup.remarks.push(rm);
        }
      } else {
        const segments = x.tatooNumber;
        const rm = this.remarkHelper.createRemark(x.country.toUpperCase() + ' - A VALID PASSPORT AND VISA ARE REQUIRED', 'RI', 'R');
        rm.relatedSegments = [];
        const s = segments.split(',');
        // tslint:disable-next-line: no-shadowed-variable
        s.forEach((x) => {
          rm.relatedSegments.push(x);
        });
        if (corp) {
          this.corpRemarks.push(
            // tslint:disable-next-line:max-line-length
            {
              placeholder: 'CountryVisaPassportRequires',
              placeholdervalue: x.country.toUpperCase(),
              condition: null,
              conditionvalue: null,
              segment: rm.relatedSegments
            }
          );
        } else {
          this.remarkGroup.remarks.push(rm);
        }
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
