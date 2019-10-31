import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { PnrService } from 'src/app/service/pnr.service';

@Component({
  selector: 'app-codeshare',
  templateUrl: './codeshare.component.html',
  styleUrls: ['./codeshare.component.scss']
})
export class CodeshareComponent implements OnInit, AfterViewInit {
  codeShareGroup: FormGroup;
  total = 1;

  constructor(private fb: FormBuilder, private pnr: PnrService) {}

  ngOnInit() {
    this.codeShareGroup = this.fb.group({
      segments: this.fb.array([this.createFormGroup()])
    });
    this.getCodeShareFromPnr();
  }
  ngAfterViewInit(): void {}

  getCodeShareFromPnr() {
    const rirCheckin = 'CHECK-IN AT (?<airline>(.*)) TICKET COUNTER';
    const regx = new RegExp(rirCheckin);
    const rems = this.pnr.getRemarksFromGDSByRegex(regx, 'RIR');
    const items = this.codeShareGroup.get('segments') as FormArray;
    const segmentList = this.pnr.getSegmentList();
    if (rems.length > 0) {
      items.controls = [];
    }

    rems.forEach((r) => {
      const airline = r.remarkText.replace('CHECK-IN AT', '').replace('TICKET COUNTER', ''.trim());
      const segment = [];
      segmentList.forEach((x) => {
        if (r.segments.indexOf(x.tatooNo) >= 0) {
          segment.push(x.lineNo);
        }
      });
      items.push(this.createFormGroup({ segment: segment.join(','), airline }));
      this.total = items.length;
    });
  }

  createFormGroup(defaultValue?: any): FormGroup {
    const group = this.fb.group({
      segment: new FormControl('', [Validators.required]),
      airline: new FormControl('', [Validators.required])
    });

    if (defaultValue !== undefined && defaultValue !== null) {
      group.setValue(defaultValue);
    }
    return group;
  }
  addCodeShare() {
    const items = this.codeShareGroup.get('segments') as FormArray;
    items.push(this.createFormGroup());
    this.total = items.length;
  }
  removeCodeShare(i) {
    const items = this.codeShareGroup.get('segments') as FormArray;
    items.removeAt(i);
    this.total = items.length;
  }
}
