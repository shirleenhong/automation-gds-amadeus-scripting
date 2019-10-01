import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DDBService } from 'src/app/service/ddb.service';
import { SelectItem } from 'src/app/models/select-item.model';
import { PnrService } from 'src/app/service/pnr.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import { CfRemarkModel } from 'src/app/models/pnr/cf-remark.model';
import { validateCreditCard, validateExpDate, validateNotEqualTo } from 'src/app/shared/validators/leisure.validators';
import { LeisureFeeModel } from 'src/app/models/pnr/leisure-fee.model';
import { BsModalRef } from 'ngx-bootstrap';
import { UtilHelper } from 'src/app/helper/util.helper';

@Component({
  selector: 'app-update-leisure-fee',
  templateUrl: './update-leisure-fee.component.html',
  styleUrls: ['./update-leisure-fee.component.scss']
})
export class UpdateLeisureFeeComponent implements OnInit {
  title: string;
  leisureFeeForm: FormGroup;
  leisureFee = new LeisureFeeModel();
  @Input()
  provinceList: SelectItem[];
  segmentList: Array<string>;
  provinceTaxes: any;
  decPipe: DecimalPipe;
  datePipe: DatePipe;
  isInvalid = true;
  vendorCodeList: Array<SelectItem>;
  cfaLine: CfRemarkModel;
  isSubmitted = false;
  exemption = [];
  passengerList: Array<any>;
  // withcheque = true;

  constructor(
    public modalRef: BsModalRef,
    private fb: FormBuilder,
    private ddbService: DDBService,
    private pnrService: PnrService,
    private util: UtilHelper
  ) {
    this.provinceList = this.ddbService.getProvinces();
    this.provinceTaxes = this.ddbService.getProvinceTax();
    this.vendorCodeList = this.ddbService.getCcVendorCodeList();
    this.decPipe = new DecimalPipe('en-US');
    this.datePipe = new DatePipe('en-US');
    this.cfaLine = this.pnrService.getCFLine();
  }

  creditcardMaxValidator() {
    // retrigger validation
    this.f.ccNo.setValue(this.f.ccNo.value);
  }

  ngOnInit() {
    this.leisureFeeForm = this.fb.group({
      fln: new FormControl('', [Validators.required]),
      segmentAssoc: new FormControl('', [Validators.required]),
      segmentNum: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      paymentType: new FormControl('', [Validators.required]),
      vendorCode: new FormControl('', [Validators.required, Validators.pattern('[A-Z]{2}')]),
      ccNo: new FormControl('', [Validators.required, validateCreditCard('vendorCode')]),
      expDate: new FormControl('', [Validators.required, validateExpDate()]),
      address: new FormControl('', [Validators.required]),
      exempt: new FormControl(''),
      passengerNo: new FormControl('')
    });

    this.onControlChanges();
    this.util.validateAllFields(this.leisureFeeForm);
    this.passengerList = this.pnrService.getPassengers();
  }

  setPreviousCCno(ccNumbers) {
    if (ccNumbers && ccNumbers.length > 0) {
      this.leisureFeeForm.get('ccNo').clearValidators();
      this.leisureFeeForm.get('ccNo').setValidators([Validators.required, validateCreditCard('vendorCode'), validateNotEqualTo(ccNumbers)]);
    }
  }

  changeFeeState() {
    const controls = ['vendorCode', 'ccNo', 'expDate'];
    this.enableDisbleControls(controls, this.f.paymentType.value === 'K');
  }

  enableDisableCredits() {
    if (this.leisureFeeForm.controls.paymentType.value === 'K') {
      const controls = ['vendorCode', 'ccNo', 'expDate'];
      this.enableDisbleControls(controls, true);
    }
  }

  get f() {
    return this.leisureFeeForm.controls;
  }

  onControlChanges() {
    this.leisureFeeForm.get('segmentAssoc').valueChanges.subscribe((val) => {
      this.processAssocValues(val);
    });
    this.leisureFeeForm.get('paymentType').valueChanges.subscribe((val) => {
      const controls = ['vendorCode', 'ccNo', 'expDate'];
      this.enableDisbleControls(controls, val === 'K');
    });
  }

  processAssocValues(val) {
    const ctrls = ['segmentNum', 'amount', 'paymentType', 'vendorCode', 'ccNo', 'expDate', 'address'];
    this.enableDisbleControls(ctrls, false);

    switch (val) {
      case '3':
      case '4':
        this.leisureFeeForm.get('segmentNum').enable();
        if (val === '3') {
          this.segmentList = this.pnrService.getPassiveHotelSegmentNumbers();
        } else {
          this.segmentList = this.pnrService.getPassiveCarSegmentNumbers();
        }
        break;

      default:
        this.leisureFeeForm.get('segmentNum').disable();
    }
    // this.enableDisbleControls(['address'], this.leisureFee.fln !== '1');

  }

  enableDisbleControls(ctrls: string[], isDisabled: boolean) {
    ctrls.forEach((x) => {
      if (isDisabled) {
        this.leisureFeeForm.get(x).disable();
      } else {
        this.leisureFeeForm.get(x).enable();
      }
    });
  }

  saveLeisureFee() {
    this.exemption.forEach((x) => {
      if (x.fln === '' && x.checked) {
        x.fln = this.leisureFee.fln;
      }
    });
    this.isSubmitted = true;
    this.modalRef.hide();
  }
}
