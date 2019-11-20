import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { PnrService } from '../../../service/pnr.service';
import { StaticValuesService } from '../../../service/static-values.services';
import { DDBService } from 'src/app/service/ddb.service';
import { SelectItem } from 'src/app/models/select-item.model';
import { validateCreditCard } from 'src/app/shared/validators/leisure.validators';

@Component({
  selector: 'app-non-acceptance',
  templateUrl: './non-acceptance.component.html',
  styleUrls: ['./non-acceptance.component.scss']
})
export class NonAcceptanceComponent implements OnInit {
  @Input()
  val = '';
  nonAcceptanceForm: FormGroup;
  unticketedSegments = [];
  tstSelected = [];
  hasAirTst: boolean;
  hasAirSegment: boolean;
  vendorCodeList: Array<SelectItem>;

  onTouched: any = () => {};
  onChange: any = () => {};

  constructor(
    private fb: FormBuilder,
    private pnrService: PnrService,
    private staticService: StaticValuesService,
    private ddbService: DDBService
  ) {}

  ngOnInit() {
    this.hasAirTst = false;
    this.hasAirSegment = false;
    this.getUnticketedAirSegments();
    this.nonAcceptanceForm = this.fb.group({
      tst: new FormControl('', [Validators.pattern('[0-9]+(,[0-9]+)*')]),
      segments: this.fb.array(this.createArray())
    });
    this.vendorCodeList = this.ddbService.getCcVendorCodeList();
  }

  createArray() {
    const frmArray = [];
    for (const fg in this.unticketedSegments) {
      if (fg) {
        const frm = this.fb.group({
          ccVendor: new FormControl(this.unticketedSegments[fg].ccVendor),
          ccNo: new FormControl('', [validateCreditCard('ccVendor')]).disable
        });
        frmArray.push(frm);
      }
    }
    return frmArray;
  }

  get value() {
    return this.val;
  }

  set value(val) {
    this.val = val;
    this.onChange(val);
    this.onTouched();
    this.nonAcceptanceForm.get('tst').markAsDirty();
  }

  writeValue(obj: any): void {
    this.nonAcceptanceForm.get('tst').setValue(obj);
    this.val = obj;
  }

  updateValue(val: any, i: any) {
    const newVal = val.currentTarget.value;
    const isChecked = val.currentTarget.checked;

    let items: any;
    // tslint:disable-next-line: no-string-literal
    items = this.nonAcceptanceForm.get('segments')['controls'];
    if (isChecked) {
      this.tstSelected.push(newVal);
      items[i].controls.ccNo.enable();
      items[i].controls.ccNo.setValidators([Validators.required, validateCreditCard('ccVendor')]);
      items[i].controls.ccNo.updateValueAndValidity();
    } else {
      this.tstSelected.splice(this.tstSelected.indexOf(newVal), 1);
      items[i].controls.ccNo.disable();
      items[i].controls.ccNo.clearValidators();
      items[i].controls.ccNo.updateValueAndValidity();
    }

    this.value = this.tstSelected.join(',');
    this.nonAcceptanceForm.get('tst').setValue(this.val);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.nonAcceptanceForm.get('tst').disable();
    } else {
      this.nonAcceptanceForm.get('tst').enable();
    }
  }

  get f() {
    return this.nonAcceptanceForm.controls;
  }

  enableFormControls(controls: string[], disabled: boolean) {
    controls.forEach((c) => {
      if (disabled) {
        this.nonAcceptanceForm.get(c).disable();
        this.nonAcceptanceForm.get(c).reset();
      } else {
        this.nonAcceptanceForm.get(c).enable();
      }
    });
  }

  getSegmentLineNo(tatooNumber: string): string {
    const tatoos: string[] = [];
    tatooNumber.split(',').forEach((e) => {
      tatoos.push(e);
    });

    let segments = '';
    const seg = this.pnrService.getSegmentList().filter((x) => x.segmentType === 'AIR' && tatoos.includes(x.tatooNo));
    seg.forEach((s) => {
      if (segments === '') {
        segments = s.lineNo;
      } else {
        segments = segments + ',' + s.lineNo;
      }
    });
    return segments;
  }

  getUnticketedAirSegments(): boolean {
    const allAir = this.pnrService.pnrObj.allAirSegments;
    const tstData = [];
    const unticketedSegments = [];
    const tstObj = this.pnrService.tstObj;
    const ticketedSegments = [];

    debugger;
    for (const tst of this.pnrService.pnrObj.fullNode.response.model.output.response.dataElementsMaster.dataElementsIndiv) {
      const segmentName = tst.elementManagementData.segmentName;
      if (segmentName === 'FA' || segmentName === 'FHA' || segmentName === 'FHE') {
        if (tst.referenceForDataElement !== undefined) {
          if (tst.referenceForDataElement.reference.length > 1) {
            tst.referenceForDataElement.reference.forEach((ref) => {
              if (ref.qualifier === 'ST') {
                ticketedSegments.push(ref.number);
                this.hasAirSegment = true;
              }
            });
          } else {
            if (tst.referenceForDataElement.reference.qualifier === 'ST') {
              ticketedSegments.push(tst.referenceForDataElement.reference.number);
              this.hasAirSegment = true;
            }
          }
        }
      }
    }

    allAir.forEach((x) => {
      if (!ticketedSegments.find((p) => x.tatooNumber === p)) {
        unticketedSegments.push(x.tatooNumber);
        this.hasAirSegment = true;
      }
    });

    if (unticketedSegments.length > 0) {
      if (tstObj.length === 0) {
        this.hasAirTst = false;
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

            if (segmentTatoo.length > 0) {
              segmentTatoo.forEach((element) => {
                if (unticketedSegments.includes(element)) {
                  tstData.push({
                    tstNumber: x.fareReference.uniqueReference,
                    segmentNumber: segmentRef,
                    tatooNumber: segmentTatoo,
                    airline: x.validatingCarrier.carrierInformation.carrierCode,
                    ccVendor: this.getFop(segmentTatoo),
                    ccExp: this.getCCExp(segmentTatoo),
                    ccNumber: this.getCCNo(segmentTatoo),
                    paxName: this.getTstPassenger(x.paxSegReference.refDetails.refNumber),
                    cost: this.getFare(x)
                  });
                }
              });
            } else {
              if (unticketedSegments.includes(x.segmentReference.refDetails.refNumber)) {
                tstData.push({
                  tstNumber: x.fareReference.uniqueReference,
                  segmentNumber: segmentRef,
                  tatooNumber: segmentTatoo,
                  airline: x.validatingCarrier.carrierInformation.carrierCode,
                  ccVendor: this.getFop(segmentTatoo),
                  ccExp: this.getCCExp(segmentTatoo),
                  ccNumber: this.getCCNo(segmentTatoo),
                  paxName: this.getTstPassenger(x.paxSegReference.refDetails.refNumber),
                  cost: this.getFare(x)
                });
              }
            }
          } else {
            if (unticketedSegments.find((p) => x.segmentInformation.segmentReference.refDetails.refNumber === p)) {
              if (!ticketedSegments.includes(x.segmentInformation.segmentReference.refDetails.refNumber)) {
                tstData.push({
                  tstNumber: x.fareReference.uniqueReference,
                  segmentNumber: this.getSegmentLineNo(x.segmentInformation.segmentReference.refDetails.refNumber),
                  tatooNumber: x.segmentInformation.segmentReference.refDetails.refNumber,
                  airline: x.validatingCarrier.carrierInformation.carrierCode,
                  ccVendor: this.getFop(x.segmentInformation.segmentReference.refDetails.refNumber),
                  ccExp: this.getCCExp(x.segmentInformation.segmentReference.refDetails.refNumber),
                  ccNumber: this.getCCNo(x.segmentInformation.segmentReference.refDetails.refNumber),
                  paxName: this.getTstPassenger(x.paxSegReference.refDetails.refNumber),
                  cost: this.getFare(x)
                });
              }
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
            tatooNumber: segmentTatoo,
            airline: x.validatingCarrier.carrierInformation.carrierCode,
            ccVendor: this.getFop(segmentTatoo),
            ccExp: this.getCCExp(segmentTatoo),
            ccNumber: this.getCCNo(segmentTatoo),
            paxName: this.getTstPassenger(x.paxSegReference.refDetails.refNumber),
            cost: this.getFare(x)
          });
        } else {
          tstData.push({
            tstNumber: x.fareReference.uniqueReference,
            segmentNumber: this.getSegmentLineNo(x.segmentInformation.segmentReference.refDetails.refNumber),
            tatooNumber: x.segmentInformation.segmentReference.refDetails.refNumber,
            airline: x.validatingCarrier.carrierInformation.carrierCode,
            ccVendor: this.getFop(x.segmentInformation.segmentReference.refDetails.refNumber),
            ccExp: this.getCCExp(x.segmentInformation.segmentReference.refDetails.refNumber),
            ccNumber: this.getCCNo(x.segmentInformation.segmentReference.refDetails.refNumber),
            paxName: this.getTstPassenger(x.paxSegReference.refDetails.refNumber),
            cost: this.getFare(x)
          });
        }
      }
    }

    if (tstData.length > 0) {
      this.hasAirTst = true;
      this.unticketedSegments = tstData;
      return true;
    }
  }

  getFop(segment: any) {
    let fop = '';
    this.pnrService.pnrObj.fpElements.forEach((x) => {
      if (x.associations !== null && x.associations.length > 0) {
        if (x.associations[0].tatooNumber === segment) {
          fop = x.fullNode.otherDataFreetext.longFreetext.split(' ')[1].substr(2, 2);
        }
      } else {
        for (const fp of this.pnrService.pnrObj.fpElements) {
          fop = fp.fullNode.otherDataFreetext.longFreetext.split('/')[0].substr(2, 2);
        }
      }
    });
    return fop;
  }

  getFare(segment: any) {
    let fare: string;
    segment.fareDataInformation.fareDataSupInformation.forEach((x) => {
      if (x.fareDataQualifier === 'TFT') {
        fare = x.fareAmount;
      }
    });
    return fare;
  }

  getCCExp(segment: any) {
    let exp = '';
    this.pnrService.pnrObj.fpElements.forEach((x) => {
      if (x.associations !== null && x.associations.length > 0 && x.associations[0].tatooNumber === segment) {
        exp = x.fullNode.otherDataFreetext.longFreetext.split('/')[1];
      } else {
        for (const fp of this.pnrService.pnrObj.fpElements) {
          exp = fp.fullNode.otherDataFreetext.longFreetext.split('/')[1];
        }
      }
    });
    return exp;
  }

  getCCNo(segment: any) {
    let ccNo: string;
    let ccLength: number;
    this.pnrService.pnrObj.fpElements.forEach((x) => {
      if (x.associations !== null && x.associations.length > 0 && x.associations[0].tatooNumber === segment) {
        ccLength = x.fullNode.otherDataFreetext.longFreetext.split('/')[0].length;
        ccNo = x.fullNode.otherDataFreetext.longFreetext.split('/')[0].substr(8, ccLength);
      } else {
        ccLength = x.fullNode.otherDataFreetext.longFreetext.split('/')[0].length;
        ccNo = x.fullNode.otherDataFreetext.longFreetext.split('/')[0].substr(4, ccLength);
      }
    });
    return ccNo;
  }

  creditcardMaxValidator() {
    this.f.ccNo.setValue(this.f.ccNo.value);
  }

  getTstPassenger(tstNumber: any): string {
    let name: string;
    this.pnrService.pnrObj.nameElements.forEach((x) => {
      if (x.fullNode.elementManagementPassenger.reference.number === tstNumber) {
        name = x.firstName + '-' + x.lastName;
      }
    });
    return name;
  }

  check(airline: any, cc: any) {
    const result = this.staticService.getAirlineVendor(airline, cc);
    if (result === -1) {
      return false;
    } else {
      return true;
    }
  }
}
