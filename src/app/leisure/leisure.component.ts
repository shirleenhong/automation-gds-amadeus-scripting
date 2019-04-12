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
import { DDBService } from '../service/ddb.service';
import { CfRemarkModel } from '../models/pnr/cf-remark.model';
import { CancelSegmentComponent } from '../cancel-segment/cancel-segment.component';

@Component({
  selector: 'app-leisure',
  templateUrl: './leisure.component.html',
  styleUrls: ['./leisure.component.scss']
})

export class LeisureComponent implements OnInit, AfterViewInit, AfterViewChecked {
  isPnrLoaded: boolean;
  message: string;
  leisure: LeisureViewModel;
  cfLine: CfRemarkModel;
  workflow: string = '';
  cancelEnabled: boolean = true;



  @ViewChild(PaymentComponent) paymentComponent: PaymentComponent;
  @ViewChild(ReportingComponent) reportingComponent: ReportingComponent;
  @ViewChild(RemarkComponent) remarkComponent: RemarkComponent;
  @ViewChild(CancelSegmentComponent) cancelSegmentComponent: CancelSegmentComponent;
  errorPnrMsg = '';
  eventSubscribe = false;
  segment = [];



  constructor(private pnrService: PnrService,

    private remarkService: RemarkService,
    private paymentRemarkService: PaymentRemarkService,
    private reportingRemarkService: ReportingRemarkService,
    private segmentService: SegmentService,
    private tourPackageRemarksService: TourPackageRemarksService,
    private itcPackageCostRemarkService: ITCPackageCostRemarkService,
    private fb: FormBuilder,
    private ddbService: DDBService

  ) {
    // this.leisureMainForm = new FormGroup({
    //   cancelsegment: new FormControl('', []),
    //   backMain: new FormControl('', [])
    // });

    this.loadPNR();
  }

  ngAfterViewChecked() {
    // Subscribe to event from child Component
    // if (this.eventSubscribe) { return; }
    // this.paymentComponent.leisureFee.leisureFeeForm.get('segmentAssoc').valueChanges.subscribe(val => {
    //   this.reportingComponent.reportingView.leisureFeeType = val;
    //   this.reportingComponent.checkSFC();
    // });
    // this.eventSubscribe = true;
  }
  ngAfterViewInit(): void {
  }

  async loadPNR() {
    this.errorPnrMsg = '';
    // this.ddbService.sampleSupplier();
    await this.pnrService.getPNR();
    this.isPnrLoaded = this.pnrService.isPNRLoaded;
    this.cfLine = this.pnrService.getCFLine();
    if (this.pnrService.errorMessage.indexOf('Error') === 0) {
      this.errorPnrMsg = 'Unable to load PNR or no PNR is loaded in Amadeus. \r\n' + this.pnrService.errorMessage;
    } else if (this.cfLine == null || this.cfLine === undefined) {
      this.errorPnrMsg = 'PNR doesnt contain CF Remark, Please make sure CF remark is existing in PNR.';
      this.isPnrLoaded = false;
    }
  }

  ngOnInit() {
    this.leisure = new LeisureViewModel();

  }

  public SubmitToPNR() {
    const remarkCollection = new Array<RemarkGroup>();

    remarkCollection.push(this.segmentService.GetSegmentRemark(this.leisure.passiveSegmentView.tourSegmentView));
    remarkCollection.push(this.paymentRemarkService.GetMatrixRemarks(this.paymentComponent.matrixReceipt.matrixReceipts));
    remarkCollection.push(this.paymentRemarkService.GetAccountingRemarks(this.paymentComponent.accountingRemark.accountingRemarks));
    remarkCollection.push(this.paymentRemarkService.GetAccountingUdids(this.paymentComponent.accountingRemark.accountingForm));


    remarkCollection.push(this.reportingRemarkService.GetRoutingRemark(this.leisure.reportingView));
    if (!this.pnrService.hasAmendMISRetentionLine()) {
      remarkCollection.push(this.segmentService.getRetentionLine());
    }
    remarkCollection.push(this.segmentService.setMandatoryRemarks());

    if (this.cfLine.cfa === 'RBM' || this.cfLine.cfa === 'RBP') {
      const concierge = this.reportingComponent.conciergeComponent;
      remarkCollection.push(this.reportingRemarkService.getConciergeUdids(concierge.conciergeForm,
        concierge.getConciergeForDeletion(), concierge.getConciergeRetain()));
    }

    // tslint:disable-next-line:no-string-literal
    if (this.remarkComponent.remarkForm.controls['packageList'].value !== null &&
      this.remarkComponent.remarkForm.controls.packageList.value !== ''
      && this.remarkComponent.remarkForm.controls.packageList.value !== '1') {
      if (this.remarkComponent.remarkForm.controls.packageList.value === 'ITC') {
        remarkCollection.push(this.itcPackageCostRemarkService.GetRemarks(this.remarkComponent.itcPackageComponent.itcForm));
      } else {
        remarkCollection.push(this.tourPackageRemarksService.GetRemarks(this.remarkComponent.tourPackageComponent.group));
      }
    }

    const leisureFee = this.paymentComponent.leisureFee;

    if (leisureFee.leisureFeeForm.valid) {
      remarkCollection.push(this.paymentRemarkService.GetLeisureFeeRemarks(leisureFee.leisureFeeForm, this.cfLine.cfa));
    }

    this.remarkService.BuildRemarks(remarkCollection);
    this.remarkService.SubmitRemarks().then(x => {
    }, error => { alert(JSON.stringify(error)); });
    this.remarkService.endPNR();
  }

  async cancelPnr() {
    const osiCollection = new Array<RemarkGroup>();
    const remarkCollection = new Array<RemarkGroup>();
    const cancel = this.cancelSegmentComponent;
    let getSelected = cancel.submit();

    if (getSelected.length >= 1) {
      osiCollection.push(this.segmentService.osiCancelRemarks(cancel.cancelForm));
      this.remarkService.BuildRemarks(osiCollection);
      await this.remarkService.cancelRemarks().then(x => {
      }, error => { alert(JSON.stringify(error)); });

      if (getSelected.length === this.segment.length) {
        remarkCollection.push(this.segmentService.cancelMisSegment());
      }

      remarkCollection.push(this.segmentService.buildCancelRemarks(cancel.cancelForm, getSelected));
      this.remarkService.BuildRemarks(remarkCollection);
      await this.remarkService.cancelRemarks().then(x => {
      }, error => { alert(JSON.stringify(error)); });
      this.remarkService.endPNR();
    }
  }

  public loadPnr() {
    if (this.isPnrLoaded) {
      this.workflow = 'load';
    }

  }

  public cancelSegment() {
    if (this.isPnrLoaded) {
      this.workflow = 'cancel';
      this.segment = this.pnrService.getSegmentTatooNumber();
      this.setControl();
    }
  }

  public back() {
    if (this.isPnrLoaded) {
      this.workflow = '';
    }
  }

  setControl() {
    if (this.isPnrLoaded) {
      if (this.pnrService.hasRecordLocator() !== undefined && (this.segment.length > 0
        || (this.pnrService.IsMISRetention() && this.pnrService.hasHotelCancelSegments()))) {
        this.cancelEnabled = false;
      }
    }
  }
}
