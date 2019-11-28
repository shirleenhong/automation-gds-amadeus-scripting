import { Component, OnInit } from '@angular/core';
import { PnrService } from 'src/app/service/pnr.service';
import { FormBuilder, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-air-fare-commission',
  templateUrl: './air-fare-commission.component.html',
  styleUrls: ['./air-fare-commission.component.scss']
})
export class AirFareCommissionComponent implements OnInit {

  constructor(private pnrService: PnrService, private fb: FormBuilder) { }
  airFareCommissionFormGroup = this.fb.group({
    airFares: this.fb.array([])
  });
  ngOnInit() {
    this.checkForFMElements();
  }
  checkForFMElements() {
    const airFares = [];
    const airFareObj = {
      segments: '',
      newCommission: '',
      oldCommission: '',
    };
    const fmElements = this.pnrService.pnrObj.fmElements;
    const formFmElements = this.formFMElements(fmElements);
    // const unticketedTst = this.pnrService.getUnticketedTst();
    const tstData = this.pnrService.getUnticketedCorpReceipts();
    if (tstData.length > 0) {
      for (const tst of tstData) {
        const airfareObject = JSON.parse(JSON.stringify(airFareObj));
        airfareObject.segments = tst.segmentNumber.toString();
        airFares.push(airfareObject);
        this.addAirFares(airfareObject.segments, '');
      }
    }
    console.log(tstData);
    // for(const fmEle of fmElements) {
    //   let commission = fmEle.commission;
    //   const commRegex = /[0-9]{1,3}[.]{1}[0-9]{1,2}A|[0-9]{1,2}/g;
    //   const match = commission.match(commRegex);
    //   if(match && match[0]) {
    //     this.addAirFares('', match[0]);
    //   }
    // }
    // console.log(fmElements);
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
    };
    for (const fmEle of fmElements) {
      const fmObject = JSON.parse(JSON.stringify(fmObj));
      const commission = fmEle.commission;
      const commRegex = /[0-9]{1,3}[.]{1}[0-9]{1,2}A|[0-9]{1,2}/g;
      const match = commission.match(commRegex);
      if (match && match[0]) {
        fmObject.commission = match[0];
      }
      fmObject.segments = this.getSegments(fmEle.associations);
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
