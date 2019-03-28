import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked, AfterContentInit } from '@angular/core';
import { PnrService } from '../service/pnr.service';
import { RemarkService } from '../service/remark.service';
import { LeisureViewModel } from '../models/leisure-view.model';
import { PaymentRemarkService } from '../service/payment-remark.service';
import { RemarkGroup } from '../models/pnr/remark.group.model';
import { ReportingRemarkService } from '../service/reporting-remark.service';
import { LeisureFeeComponent } from '../payments/leisure-fee/leisure-fee.component';
import { PaymentComponent } from '../payments/payment.component';
import { SegmentService } from '../service/segment.service';
import { FormGroup, FormBuilder, Validators, FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { TourPackageComponent } from '../remarks/tour-package/tour-package.component';
import { TourPackageRemarksService } from '../service/tour-package-remarks.service';
import { ReportingComponent } from '../reporting/reporting.component';
import { ITCPackageCostRemarkService } from '../service/itc-packagecost-remarks.service';
import { RemarkComponent } from '../remarks/remark.component';

@Component({
  selector: 'app-leisure',
  templateUrl: './leisure.component.html',
  styleUrls: ['./leisure.component.scss']
})

export class LeisureComponent implements OnInit, AfterViewInit, AfterViewChecked {
  isPnrLoaded: boolean;
  message: string;
  leisure: LeisureViewModel;

  @ViewChild(PaymentComponent) paymentComponent: PaymentComponent;
  @ViewChild(ReportingComponent) reportingComponent: ReportingComponent; 
  @ViewChild(RemarkComponent) remarkComponent: RemarkComponent;
  errorPnrMsg = '';
  eventSubscribe = false;


  constructor(private pnrService: PnrService,
    private remarkService: RemarkService,
    private paymentRemarkService: PaymentRemarkService,
    private reportingRemarkService: ReportingRemarkService,
    private segmentService: SegmentService,
    private tourPackageRemarksService: TourPackageRemarksService,
    private itcPackageCostRemarkService: ITCPackageCostRemarkService,
    private fb: FormBuilder
  ) {
      this.loadPNR();
  }


  ngAfterViewChecked() {
    // Subscribe to event from child Component
    // if (this.eventSubscribe) { return; }
    // this.paymentComponent.leisureFee.leisureFeeForm.get('segmentAssoc').valueChanges.subscribe(val => {
    //   this.reportingComponent.reportingView.leisureFeeType = val;
    //   this.reportingComponent.checkSFC();
    // });
    //this.eventSubscribe = true;
  }


  ngAfterViewInit(): void {
  }

  async loadPNR() {
    this.errorPnrMsg = '';
    await this.pnrService.getPNR();
    this.isPnrLoaded = this.pnrService.isPNRLoaded;
    if (this.pnrService.errorMessage.indexOf('Error') === 0) {
      this.errorPnrMsg = this.pnrService.errorMessage;
    }

  }

  ngOnInit() {
    this.leisure = new LeisureViewModel();
  }

  public SubmitToPNR() {
    console.log('fix 1');
    const remarkCollection = new Array<RemarkGroup>();

    remarkCollection.push(this.segmentService.GetSegmentRemark(this.leisure.passiveSegmentView.tourSegmentView));
    remarkCollection.push(this.paymentRemarkService.GetMatrixRemarks(this.leisure.paymentView.matrixReceipts));
    remarkCollection.push(this.paymentRemarkService.GetAccountingRemarks(this.leisure.paymentView.accountingRemarks));

    remarkCollection.push(this.segmentService.getRetentionLine());


    // tslint:disable-next-line:no-string-literal
    if (this.remarkComponent.remarkForm.controls['packageList'].value !== null && 
        this.remarkComponent.remarkForm.controls['packageList'].value !== '') {
        if (this.remarkComponent.remarkForm.controls['packageList'].value === 'ITC') {
          remarkCollection.push(this.itcPackageCostRemarkService.GetRemarks(this.remarkComponent.itcPackageComponent.itcForm));
        } else {
          remarkCollection.push(this.tourPackageRemarksService.GetRemarks(this.remarkComponent.tourPackageComponent.group));
        }
    }

    const leisureFee = this.paymentComponent.leisureFee;

    if (leisureFee.leisureFeeForm.valid) {
      remarkCollection.push(leisureFee.BuildRemark());
    }

    this.remarkService.BuildRemarks(remarkCollection);
    this.remarkService.SubmitRemarks().then(x => {
     // this.loadPNR();

    }, error => { alert(JSON.stringify(error)); });
  }
}
