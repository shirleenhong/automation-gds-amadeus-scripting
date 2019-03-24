import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DDBService } from 'src/app/service/ddb.service';
import { SelectItem } from 'src/app/models/select-item.model';
import { PnrService } from 'src/app/service/pnr.service';
import { RemarkGroup } from 'src/app/models/pnr/remark.group.model';
import { RemarkModel } from 'src/app/models/pnr/remark.model';

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

  constructor(private fb: FormBuilder, private ddbService: DDBService, private pnrService: PnrService) {
    this.provinceList = this.ddbService.getProvinces();

  }
  ngAfterViewInit(): void {
    // throw new Error("Method not implemented.");
    this.f.segmentAssoc.setValue(0);


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
      if (val === '3' || val === '4') {
        this.leisureFeeForm.get('segmentNum').enable();
        if (val === '3') {
          this.segmentList = this.pnrService.getPassiveHotelSegmentNumbers();
        } else {
          this.segmentList = this.pnrService.getPassiveCarSegmentNumbers();
        }
      } else {
        this.leisureFeeForm.get('segmentNum').disable();
      }

    });

  }

  BuildRemark() {
    const remGroup = new RemarkGroup();
    remGroup.group = 'Matrix Remark';
    remGroup.remarks = new Array<RemarkModel>();
    const assoc = (this.f.segmentAssoc.value);
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
    remark += '/-AMTCAD' + this.f.amount.value;
    remark += '/-PT-0.00XG/-PT-0.00XQ';

    remark += 'FOP/-CC' + this.f.vendorCode.value + this.f.ccNo.value;
    remark += '/EXP-' + this.f.expDate.value;

    return remark;
  }



}
