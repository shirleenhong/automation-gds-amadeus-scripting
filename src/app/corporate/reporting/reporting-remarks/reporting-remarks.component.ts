import { Component, OnInit } from '@angular/core';
import { PnrService } from 'src/app/service/pnr.service';
import { FormGroup, Validators, FormControl, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-reporting-remarks',
  templateUrl: './reporting-remarks.component.html',
  styleUrls: ['./reporting-remarks.component.scss']
})
export class ReportingRemarksComponent implements OnInit {
  destinations: Array<any>;
  segments: any[];
  reportingForm: FormGroup;

  constructor(private pnrService: PnrService, private fb: FormBuilder) {
    this.destinations = pnrService.getAirDestinations();
    this.reportingForm = new FormGroup({
      segments: this.fb.array([])
    });
  }

  async loadData(): Promise<void> {}
  async ngOnInit() {
    await this.loadData();
    this.segments = await this.pnrService.getTstSegments();
    for (const segment of this.segments) {
      const group = this.createFormGroup(segment);
      (this.reportingForm.get('segments') as FormArray).push(group);
    }
  }

  createFormGroup(segmentNo) {
    const val = this.getDestinationValue(segmentNo);
    return this.fb.group({
      segment: new FormControl(segmentNo),
      destinationList: new FormControl(val, [Validators.required])
    });
  }

  enableFormControls(controls: string[], disabled: boolean) {
    controls.forEach((c) => {
      if (disabled) {
        this.reportingForm.get(c).disable();
        this.reportingForm.get(c).reset();
      } else {
        this.reportingForm.get(c).enable();
      }
    });
  }

  getDestinationValue(segmentNo): string {
    let val: string;

    for (const element of this.pnrService.pnrObj.rmElements) {
      if (element.freeFlowText.includes('*DE/-')) {
        const tatoo = this.pnrService.getTatooNumberFromSegmentNumber(segmentNo);
        const ref = element.fullNode.referenceForDataElement.reference;

        if (ref.length > 0) {
          if (ref[0].number === tatoo.toString().split(',')[0]) {
            val = element.freeFlowText.split('*DE/-')[1];
            return val;
          }
        } else if (tatoo.includes(ref.number)) {
          val = element.freeFlowText.split('*DE/-')[1];
          return val;
        }
      }
    }
  }
}
