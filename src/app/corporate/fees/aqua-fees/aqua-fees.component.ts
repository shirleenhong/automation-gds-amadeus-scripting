import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { PnrService } from 'src/app/service/pnr.service';
import { ObtComponent } from '../../reporting/obt/obt.component';
import { SupplementalFeesComponent } from '../supplemental-fees/supplemental-fees.component';
import { DDBService } from 'src/app/service/ddb.service';
import { UtilHelper } from 'src/app/helper/util.helper';
import { StaticValuesService } from 'src/app/service/static-values.services';

@Component({
  selector: 'app-aqua-fees',
  templateUrl: './aqua-fees.component.html',
  styleUrls: ['./aqua-fees.component.scss']
})
export class AquaFeesComponent implements OnInit {
  aquaFeeForm: FormGroup;
  segmentList: Array<any>;
  hasPFS = false;
  isShowSupFee = false;
  isObt = false;
  selectedFeeType = '';
  feeCode = '';
  feeValue = '';
  @ViewChild(ObtComponent) obtComponent: ObtComponent;
  @ViewChild(SupplementalFeesComponent) suppFeeComponent: SupplementalFeesComponent;
  hasAir = false;
  feeCodes = [];

  constructor(
    private pnrService: PnrService,
    private ddbService: DDBService,
    private utilHelper: UtilHelper,
    private staticValues: StaticValuesService
  ) {}

  ngOnInit() {
    this.segmentList = new Array<any>();
    this.hasPFS = this.pnrService.getRemarkLineNumber('MAC/-SUP-PFS') !== '';
    this.aquaFeeForm = new FormGroup({
      feeType: new FormControl('', [Validators.required]),
      segments: new FormControl(''),
      enableSupFee: new FormControl(''),
      ticketNumber: new FormControl(''),
      feeValue: new FormControl(''),
      feeCode: new FormControl('')
    });
    this.isObt = this.pnrService.getRemarkText('EB/-') !== '';
    this.hasAir = this.pnrService.getSegmentList().filter((x) => x.segmentType === 'AIR').length > 0;

    this.aquaFeeForm.get('feeValue').valueChanges.subscribe(() => {
      this.updateFeeCode();
    });
  }

  selectFeeType(val) {
    this.getFeeCodes(val);
    this.segmentList = new Array<any>();
    let types = [];
    switch (val) {
      case 'C':
        types = ['CAR', 'CCR'];
        break;
      case 'H':
        types = ['HTL', 'HHL'];
        break;
      case 'L':
        types = ['LIM', 'MIS'];
        break;
    }
    if (types.length > 0) {
      this.pnrService
        .getSegmentList()
        .filter((s) => types.indexOf(s.segmentType) >= 0)
        .forEach((x) => {
          const selectAllObj = {
            lineNo: x.lineNo,
            freeText: x.longFreeText,
            isChecked: false
          };
          this.segmentList.push(selectAllObj);
        });
    }
    this.selectedFeeType = val;
  }
  updateFeeCode() {
    this.feeCode = this.aquaFeeForm.get('feeCode').value;
    this.feeValue = this.aquaFeeForm.get('feeValue').value;
    if (this.isShowSupFee) {
      this.suppFeeComponent.resetFees(this.feeCode, this.feeValue);
    }
  }

  getFeeCode(feeType, ebRemark) {
    let route = '';

    if (feeType === 'L') {
      route = 'BD';
    } else if (ebRemark === '') {
      if (this.ddbService.isPnrTransBorder()) {
        route = 'TB';
      } else if (this.ddbService.isPnrDomestic()) {
        route = 'TD';
      } else {
        route = 'TI';
      }
      if (feeType === 'C' || feeType === 'H') {
        route = 'BD';
      }
    } else if (ebRemark.indexOf('EB/-EB') >= 0) {
      if (feeType === 'A' || feeType === 'R') {
        route = 'TE';
      } else if (feeType === 'C' || feeType === 'H') {
        route = 'BE';
      }
    } else if (ebRemark.indexOf('EB/-AM') >= 0) {
      if (feeType === 'A' || feeType === 'R') {
        route = 'TA';
      } else if (feeType === 'C' || feeType === 'H') {
        route = 'BA';
      }
    }
    return feeType + route;
  }

  checkValid() {
    this.utilHelper.validateAllFields(this.aquaFeeForm);
    if (!this.aquaFeeForm.valid) {
      return false;
    }
    return true;
  }

  getFeeCodes(val) {
    switch (val) {
      case 'C':
        this.feeCodes = this.staticValues.getCarFees();
        break;
      case 'H':
        this.feeCodes = this.staticValues.getHotelFees();
        break;
      case 'A':
        this.feeCodes = this.staticValues.getAirFees();
        break;
      case 'R':
        this.feeCodes = this.staticValues.getRailFees();
        break;
      case 'L':
        this.feeCodes = [{ itemText: 'LBD', itemValue: 'LBD' }];
        break;
    }
  }
}
