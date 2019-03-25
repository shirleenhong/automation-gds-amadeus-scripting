import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DDBService } from 'src/app/service/ddb.service';
import { SelectItem } from 'src/app/models/select-item.model';
import { PnrService } from 'src/app/service/pnr.service';
import { RemarkGroup } from 'src/app/models/pnr/remark.group.model';
import { RemarkModel } from 'src/app/models/pnr/remark.model';
import { DatePipe, DecimalPipe } from '@angular/common';
import { SWITCH_RENDERER2_FACTORY__POST_R3__ } from '@angular/core/src/render/api';
@Component({
  selector: 'app-leisure-fee',
  templateUrl: './leisure-fee.component.html',
  styleUrls: ['./leisure-fee.component.scss']
})
export class LeisureFeeComponent implements OnInit, AfterViewInit {

  leisureFeeForm: FormGroup;
  @Input()
  provinceList: SelectItem[];
  segmentList: Array<number>;
  provinceTaxes: any;
  decPipe: DecimalPipe;
  datePipe: DatePipe;
  isInvalid = true;

  constructor(private fb: FormBuilder, private ddbService: DDBService, private pnrService: PnrService) {
    this.provinceList = this.ddbService.getProvinces();
    this.provinceTaxes = this.ddbService.getProvinceTax();
    this.decPipe = new DecimalPipe('en-US');
    this.datePipe = new DatePipe('en-US');
  }
  ngAfterViewInit(): void {
    // throw new Error("Method not implemented.");
    this.f.segmentAssoc.patchValue('0');
    this.f.paymentType.patchValue('C');

  }
  ngOnInit() {
    this.leisureFeeForm = this.fb.group({

      segmentAssoc: new FormControl('', [Validators.required]),
      segmentNum: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      paymentType: new FormControl('', [Validators.required]),
      vendorCode: new FormControl('', [Validators.required, Validators.pattern('[A-Z]{2}')]),
      ccNo: new FormControl('', [Validators.required]),
      expDate: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required])
    });
    this.onControlChanges();
  }

  get f() { return this.leisureFeeForm.controls; }

  onControlChanges() {
    this.leisureFeeForm.get('segmentAssoc').valueChanges.subscribe(val => {
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
        case '0':
          this.enableDisbleControls(ctrls, true);
          break;
        default:
          this.leisureFeeForm.get('segmentNum').disable();
      }

    });
    this.leisureFeeForm.get('paymentType').valueChanges.subscribe(val => {
      const controls = ['vendorCode', 'ccNo', 'expDate'];
      this.enableDisbleControls(controls, (val === 'K'));
    });
  }

  enableDisbleControls(ctrls: string[], isDisabled: boolean) {
    ctrls.forEach(x => {
      if (isDisabled) {
        this.leisureFeeForm.get(x).disable();
      } else {
        this.leisureFeeForm.get(x).enable();
      }
    });

  }



  BuildRemark() {
    const remGroup = new RemarkGroup();
    remGroup.group = 'Matrix Remark';
    remGroup.remarks = new Array<RemarkModel>();
    const assoc = (this.f.segmentAssoc.value);
    remGroup.deleteRemarkByIds = [];
    let lineNum = this.pnrService.getSFCLineNumber();
    if (lineNum !== '') {
      remGroup.deleteRemarkByIds.push(lineNum);
    }
    lineNum = this.pnrService.getTaxLineNumber();
    if (lineNum !== '') {
      remGroup.deleteRemarkByIds.push(lineNum);
    }
    if (assoc > 0) {
      let remark = this.generateSFCRemark(assoc);
      remGroup.remarks.push(this.getRemark(remark, '*'));
      remark = 'TAX-' + this.f.address.value;
      remGroup.remarks.push(this.getRemark(remark, 'T'));
    }
    return remGroup;
  }

  getRemark(remarkText, remarkCategory) {
    const rem = new RemarkModel();
    rem.remarkType = 'RM';
    rem.remarkText = remarkText;
    rem.category = remarkCategory;
    return rem;
  }

  generateSFCRemark(assoc) {
    let remark = 'SFC';
    switch (assoc) {
      case '3':
        remark += '/-FA-H' + this.f.segmentNum.value;
        break;
      case '4':
        remark += '/-FA-C' + this.f.segmentNum.value;
        break;
      case '1':
        remark += '/-FA-T1';
        break;
    }

    remark += '/-FLN-F1/-FP-TRF';
    remark += '/-AMT-CAD' + this.decPipe.transform(this.f.amount.value, '1.2-2');
    remark += this.getProvinceTaxRemark();
    if (this.f.paymentType.value === 'C') {
      remark += '/FOP-CC' + this.f.vendorCode.value + this.f.ccNo.value;
      remark += '/EXP-' + this.datePipe.transform(this.f.expDate.value, 'MMyy');
    } else {
      remark += '/FOP-CK';
    }
    return remark;
  }


  getProvinceTaxRemark() {
    const provTax = this.provinceTaxes.filter(x => x.provinceCode === this.f.address.value);

    let tax1 = '0.00';
    let tax2 = '0.00';
    if (provTax.length > 0) {
      tax1 = this.decPipe.transform((+this.f.amount.value) * +provTax[0].tax1, '1.2-2');
      tax2 = this.decPipe.transform((+this.f.amount.value) * +provTax[0].tax2, '1.2-2');
    }
    let txt = '/-PT-' + tax1 + (this.f.address.value === 'NL' ? 'RC' : 'XG');
    txt += '/-PT-' + tax2 + 'XQ';
    return txt;
  }



}
