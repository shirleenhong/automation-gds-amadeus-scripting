import { Component, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PnrService } from '../../../service/pnr.service';

@Component({
  selector: 'app-aqua-ticketing',
  templateUrl: './aqua-ticketing.component.html',
  styleUrls: ['./aqua-ticketing.component.scss']
})
export class AquaTicketingComponent implements OnInit, ControlValueAccessor {
  @Input()
  val = '';
  aquaTicketingFormGroup: FormGroup;
  unticketedSegments = [];
  tstSelected = [];
  hasTst: boolean;

  onTouched: any = () => { };
  onChange: any = () => { };

  constructor(private fb: FormBuilder, private pnrService: PnrService) { }

  ngOnInit() {
    this.aquaTicketingFormGroup = this.fb.group({
      tst: new FormControl('', [Validators.required])
    });

    this.getUnticketedAirSegments();
    this.aquaTicketingFormGroup.get('tst').markAsDirty();
  }

  get value() {
    return this.val;
  }

  set value(val) {
    this.val = val;
    this.onChange(val);
    this.onTouched();
    this.aquaTicketingFormGroup.get('tst').markAsDirty();
  }

  writeValue(obj: any): void {
    this.aquaTicketingFormGroup.get('tst').setValue(obj);
    this.val = obj;
  }

  updateValue(val) {
    const newVal = val.currentTarget.value;
    const isChecked = val.currentTarget.checked;

    if (isChecked) {
      this.tstSelected.push(newVal);
    } else {
      this.tstSelected.splice(this.tstSelected.indexOf(newVal), 1);
    }

    this.value = this.tstSelected.join(',');
    this.aquaTicketingFormGroup.get('tst').setValue(this.val);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.aquaTicketingFormGroup.get('tst').disable();
    } else {
      this.aquaTicketingFormGroup.get('tst').enable();
    }
  }

  get f() {
    return this.aquaTicketingFormGroup.controls;
  }

  enableFormControls(controls: string[], disabled: boolean) {
    controls.forEach((c) => {
      if (disabled) {
        this.aquaTicketingFormGroup.get(c).disable();
        this.aquaTicketingFormGroup.get(c).reset();
      } else {
        this.aquaTicketingFormGroup.get(c).enable();
      }
    });
  }

  getSegmentLineNo(tatooNumber: string): string {
    const tatoos: string[] = [];
    tatooNumber.split(',').forEach((e) => {
      tatoos.push(e);
    });

    let segments = '';
    const seg = this.pnrService.getSegmentTatooNumber().filter((x) => x.segmentType === 'AIR' && tatoos.includes(x.tatooNo));
    seg.forEach((s) => {
      if (segments === '') {
        segments = s.lineNo;
      } else {
        segments = segments + ',' + s.lineNo;
      }
    });
    return segments;
  }

  getUnticketedAirSegments() {
    const allAir = this.pnrService.pnrObj.allAirSegments;
    const tstData = [];
    const segments = [];
    const tstObj = this.pnrService.tstObj;
    const ticketedSegments = [];

    for (const tst of this.pnrService.pnrObj.fullNode.response.model.output.response.dataElementsMaster.dataElementsIndiv) {
      const segmentName = tst.elementManagementData.segmentName;
      if (segmentName === 'FA' || segmentName === 'FHA' || segmentName === 'FHE') {
        tst.referenceForDataElement.reference.forEach((ref) => {
          if (ref.qualifier === 'ST') {
            ticketedSegments.push(ref.number);
          }
        });
      }
    }

    allAir.forEach((x) => {
      if (!ticketedSegments.find((p) => x.tatooNumber === p)) {
        segments.push(x.tatooNumber);
      }
    });

    if (tstObj.length === 0) {
      this.hasTst = false;
    } else if (tstObj.length > 0) {
      tstObj.forEach((x) => {
        if (x.segmentInformation.length > 0) {
          const segmentRef = [];
          const segmentTatoo = [];
          x.segmentInformation.forEach((p) => {
            if (p.segmentReference !== undefined) {
              segmentRef.push(this.getSegmentLineNo(p.segmentReference.refDetails.refNumber));
              segmentTatoo.push(p.segmentReference.refDetails.refNumber);
            }
          });
          tstData.push({
            tstNumber: x.fareReference.uniqueReference,
            segmentNumber: segmentRef,
            tatooNumber: segmentTatoo
          });
        } else {
          if (segments.find((p) => x.segmentInformation.segmentReference.refDetails.refNumber === p)) {
            tstData.push({
              tstNumber: x.fareReference.uniqueReference,
              segmentNumber: this.getSegmentLineNo(x.segmentInformation.segmentReference.refDetails.refNumber),
              tatooNumber: x.segmentInformation.segmentReference.refDetails.refNumber
            });
            this.hasTst = true;
            this.unticketedSegments = tstData;
          }
        }
      });
    } else {
      let x: any;
      x = tstObj;

      if (x.segmentInformation.length > 0) {
        const segmentRef = [];
        const segmentTatoo = [];
        x.segmentInformation.forEach((p) => {
          if (p.segmentReference !== undefined) {
            segmentRef.push(this.getSegmentLineNo(p.segmentReference.refDetails.refNumber));
            segmentTatoo.push(p.segmentReference.refDetails.refNumber);
          }
        });
        tstData.push({
          tstNumber: x.fareReference.uniqueReference,
          segmentNumber: segmentRef,
          tatooNumber: segmentTatoo
        });
      } else {
        tstData.push({
          tstNumber: x.fareReference.uniqueReference,
          segmentNumber: this.getSegmentLineNo(x.segmentInformation.segmentReference.refDetails.refNumber),
          tatooNumber: x.segmentInformation.segmentReference.refDetails.refNumber
        });
      }
      this.hasTst = true;
      this.unticketedSegments = tstData;
    }
  }
}
