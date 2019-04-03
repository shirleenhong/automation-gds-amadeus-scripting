import { Component, OnInit, Input } from '@angular/core';
import { MatrixAccountingModel } from '../../models/pnr/matrix-accounting.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UpdateAccountingRemarkComponent } from '../update-accounting-remark/update-accounting-remark.component';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { PnrService } from 'src/app/service/pnr.service';


@Component({
  selector: 'app-accounting-remark',
  templateUrl: './accounting-remark.component.html',
  styleUrls: ['./accounting-remark.component.scss']
})
export class AccountingRemarkComponent implements OnInit {


  @Input()
  accountingRemarks = new Array<MatrixAccountingModel>();
  modalRef: BsModalRef;
  accountingForm: FormGroup;
  isAd1SwgSupplier = false;
  showU76 = false;
  showU71 = false;
  showU75 = false;
  showU72 = false;
  showU73 = false;
  showU74 = false;
  showU77 = false;



  constructor(private modalService: BsModalService, private pnrService: PnrService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.accountingRemarks = this.pnrService.getAccountingRemarks();

    this.accountingForm = this.fb.group({
      airOnly: new FormControl(''),
      exclusiveProperty: new FormControl(''),
      propertyName: new FormControl(''),
      flightType: new FormControl(''),
      priceVsSupplier: new FormControl(''),
      group: new FormControl(''),
      preferredVendor: new FormControl('')
    }, { updateOn: 'change' });

    this.f.airOnly.valueChanges.subscribe(x => {
      this.showU71 = (this.showU76 && (x === 'NO') && (this.pnrService.getRemarkLineNumber('U71/-') === ''));
      this.showU75 = (this.showU76 && (x === 'NO') && (this.pnrService.getRemarkLineNumber('U75/-') === ''));
      this.setControlValidator(this.f.exclusiveProperty, this.showU71);
      this.setControlValidator(this.f.propertyName, this.showU75);
    });
    this.checkSupplierCode();
  }





  get f() { return this.accountingForm.controls; }

  addAccountingRemarks() {
    const accountingRemarks = new MatrixAccountingModel();
    this.modalRef = this.modalService.show(UpdateAccountingRemarkComponent, { backdrop: 'static' });
    this.modalRef.content.title = 'Add Accounting Remarks';
    accountingRemarks.tkMacLine = (this.accountingRemarks.length + 1);
    this.modalRef.content.accountingRemarks = accountingRemarks;
    this.modalService.onHide.subscribe(result => {
      if (this.modalRef.content.isSubmitted) {
        this.accountingRemarks.push(this.modalRef.content.accountingRemarks);
        this.modalRef.content.isSubmitted = false;
        this.checkSupplierCode();
      }
      console.log('results', result);
    });
  }

  checkSupplierCode() {
    this.isAd1SwgSupplier = false;
    if (this.accountingRemarks.length > 0) {
      this.accountingRemarks.forEach(acc => {
        if (acc.supplierCodeName === 'AD1' || acc.supplierCodeName === 'SWG') {
          this.isAd1SwgSupplier = true;
          this.showUdids();
        }
      });
    }
  }


  showUdids() {
    this.showU76 = (this.pnrService.getRemarkLineNumber('U76/-') === '');
    this.showU72 = ((this.pnrService.getRemarkLineNumber('U72/-') === ''));
    this.showU73 = ((this.pnrService.getRemarkLineNumber('U73/-') === ''));
    this.showU74 = ((this.pnrService.getRemarkLineNumber('U74/-') === ''));
    this.showU77 = ((this.pnrService.getRemarkLineNumber('U77/-') === ''));

    this.setControlValidator(this.f.airOnly, this.showU76);
    this.setControlValidator(this.f.flightType, this.showU72);
    this.setControlValidator(this.f.priceVsSupplier, this.showU73);
    // this.setControlValidator(this.f.group, this.showU74);
    this.setControlValidator(this.f.preferredVendor, this.showU75);

  }

  setControlValidator(ctrl: AbstractControl, val: boolean) {
    if (val) {
      ctrl.setValidators(Validators.required);
    } else {
      ctrl.clearValidators();
    }
  }
}
