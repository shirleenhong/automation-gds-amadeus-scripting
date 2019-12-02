import { Component, OnInit } from '@angular/core';
import { PnrService } from 'src/app/service/pnr.service';
import { FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { UtilHelper } from 'src/app/helper/util.helper';

@Component({
  selector: 'app-air-fare-commission',
  templateUrl: './air-fare-commission.component.html',
  styleUrls: ['./air-fare-commission.component.scss']
})
export class AirFareCommissionComponent implements OnInit {
  airFares = [];
  newFmElements = [];
  isGenericFmPresent = false;
  constructor(private pnrService: PnrService, private fb: FormBuilder, private utilHelper: UtilHelper) { }
  airFareCommissionFormGroup = this.fb.group({
    airFares: this.fb.array([])
  });
  ngOnInit() {
    this.checkForFMElements();
  }
  checkForFMElements() {
    const airFareObj = {
      segments: '',
      newCommission: '',
      oldCommission: '',
      segTatooNumbers: ''
    };
    const fmElements = this.pnrService.pnrObj.fmElements;
    this.newFmElements = this.formFMElements(fmElements);
    const tstData = this.pnrService.getUnticketedCorpReceipts();
    if (tstData.length > 0) {
      for (const tst of tstData) {
        const airfareObject = JSON.parse(JSON.stringify(airFareObj));
        for (const fmEle of this.newFmElements) {
          if (fmEle.segments.toString().trim() === tst.segmentNumber.toString().trim()) {
            airfareObject.oldCommission = fmEle.commission;
            break;
          }
        }
        airfareObject.segments = tst.segmentNumber.toString();
        airfareObject.segTatooNumbers = tst.tatooNumber.toString();
        this.airFares.push(airfareObject);
        this.addAirFares(airfareObject.segments, airfareObject.oldCommission);
      }
    }
  }
  getExchangeTatooNumbers() {
    const exchangeTatooNumbers = [];
    for (const fo of this.pnrService.pnrObj.foElements) {
      const tatooNums = [];
      for (const assoc of fo.associations) {
        if (assoc.segmentType === 'ST') {
          tatooNums.push(assoc.tatooNumber);
        }
      }
      exchangeTatooNumbers.push(tatooNums);
    }
    return exchangeTatooNumbers;
  }
  checkChange(group) {
    if (group.get('chkIncluded').value === true) {
      this.addValidation(group, 'commission');
      this.utilHelper.validateAllFields(group);
    } else {
      this.removeValidation(group, 'commission');
    }
  }
  addValidation(group: any, controlName: string) {
    const control = group.get(controlName);
    control.setValidators([Validators.required, Validators.pattern(/[0-9]{1,3}[.]{1}[0-9]{1,2}A|[0-9]{1,3}A|[0-9]{1,2}/)]);
    control.updateValueAndValidity();
  }
  removeValidation(group: any, controlName: string) {
    const control = group.get(controlName);
    control.setValidators(null);
    control.updateValueAndValidity();
  }
  createAirfareGroup(segment, commission) {
    const formGroup = this.fb.group({
      chkIncluded: new FormControl(''),
      segments: new FormControl(segment),
      commission: new FormControl(commission)
    });
    formGroup.get('segments').setValue(segment);
    formGroup.get('commission').setValue(commission);
    return formGroup;
  }
  addAirFares(segments, commission) {
    const items = this.airFareCommissionFormGroup.get('airFares') as FormArray;
    items.push(this.createAirfareGroup(segments, commission));
  }
  formFMElements(fmElements) {
    const updatedFmElements = [];
    const fmObj = {
      isPresent: false,
      commission: '',
      segments: [],
      lineNo: '',
      tatooNum: ''
    };
    for (const fmEle of fmElements) {
      const fmObject = JSON.parse(JSON.stringify(fmObj));
      const commission = fmEle.commission;
      const commRegex = /[0-9]{1,3}[.]{1}[0-9]{1,2}A|[0-9]{1,3}A|[0-9]{1,2}/g;
      const match = commission.match(commRegex);
      if (match && match[0]) {
        fmObject.commission = match[0];
      }
      fmObject.segments = this.getSegments(fmEle.associations);
      if (fmObject.segments.length === 0) {
        this.isGenericFmPresent = true;
      }
      fmObject.lineNo = fmEle.elementNumber;
      fmObj.tatooNum = fmEle.tatooNumber;
      updatedFmElements.push(fmObject);
    }
    return updatedFmElements;
  }
  getSegments(associations) {
    const segments = [];
    const allSegments = this.pnrService.getSegmentList();
    if (associations) {
      for (const assoc of associations) {
        if (assoc.segmentType === 'ST') {
          for (const allSeg of allSegments) {
            if (allSeg.tatooNo === assoc.tatooNumber) {
              segments.push(allSeg.lineNo);
              break;
            }
          }
        }
      }
    }
    return segments;
  }

}
