import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { MatrixAccountingModel } from 'src/app/models/pnr/matrix-accounting.model';
import { SelectItem } from 'src/app/models/select-item.model';
import { DecimalPipe } from '@angular/common';
import { ValueChangeListener } from 'src/app/service/value-change-listener.service';

@Component({
  selector: 'app-reporting-nonbsp',
  templateUrl: './reporting-nonbsp.component.html',
  styleUrls: ['./reporting-nonbsp.component.scss']
})
export class ReportingNonbspComponent implements OnInit {
  nonBspGroup: FormGroup;
  nonBspInformation: MatrixAccountingModel[];
  nonBspReasonList: Array<SelectItem>;
  decPipe = new DecimalPipe('en-US');

  constructor(private fb: FormBuilder, private valueChagneListener: ValueChangeListener) {}

  ngOnInit() {
    this.nonBspGroup = this.fb.group({
      nonbsp: this.fb.array([])
    });

    this.valueChagneListener.accountingRemarkChange.subscribe((accRemarks) => {
      this.nonBspInformation = accRemarks.filter((x) => x.accountingTypeRemark === 'NONBSP');
      this.drawControlsForNonBsp();
    });
  }

  drawControlsForNonBsp() {
    this.nonBspReasonList = [{ itemText: '', itemValue: '' }, { itemText: 'L- Lower Fare', itemValue: 'L' }];

    const items = this.nonBspGroup.get('nonbsp') as FormArray;
    while (items.length !== 0) {
      items.removeAt(0);
    }
    this.nonBspInformation.forEach((element) => {
      const totalCost =
        parseFloat(element.baseAmount) +
        parseFloat(element.gst) +
        parseFloat(element.hst) +
        parseFloat(element.qst) +
        parseFloat(element.otherTax);

      const formatCost = this.decPipe.transform(totalCost, '1.2-2').replace(',', '');
      items.push(this.createFormGroup(element.segmentNo, formatCost.toString(), formatCost.toString(), 'L'));
      this.valueChagneListener.reasonCodeChange(['L']);
    });
  }

  createFormGroup(segmentNo: string, highFare: string, lowFare: string, reasonCode: string): FormGroup {
    const group = this.fb.group({
      segment: new FormControl(segmentNo),
      highFareText: new FormControl(highFare, [Validators.required]),
      lowFareText: new FormControl(lowFare, [Validators.required]),
      reasonCodeText: new FormControl(reasonCode, [Validators.required]),
      chkIncluded: new FormControl('')
    });

    return group;
  }
}
