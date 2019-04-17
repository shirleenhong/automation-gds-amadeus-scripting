import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { PnrService } from '../service/pnr.service';
import { RemarkService } from '../service/remark.service';
import { LeisureViewModel } from '../models/leisure-view.model';
import { PaymentRemarkService } from '../service/payment-remark.service';
import { RemarkGroup } from '../models/pnr/remark.group.model';
import { ReportingRemarkService } from '../service/reporting-remark.service';
import { PaymentComponent } from '../payments/payment.component';
import { SegmentService } from '../service/segment.service';
import { FormGroup, FormBuilder, Validators, FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { TourPackageComponent } from '../remarks/tour-package/tour-package.component';
import { ReportingComponent } from '../reporting/reporting.component';
import { RemarkComponent } from '../remarks/remark.component';
import { DDBService } from '../service/ddb.service';
import { CfRemarkModel } from '../models/pnr/cf-remark.model';
import { CancelSegmentComponent } from '../cancel-segment/cancel-segment.component';
import { SegmentsComponent } from '../passive-segments/segments/segments.component';
import { PassiveSegmentsComponent } from '../passive-segments/passive-segments.component';
import { PackageRemarkService } from '../service/package-remark.service';
import { ValidateModel } from '../models/validate-model';
import { PassiveSegmentsComponent } from '../passive-segments/passive-segments.component';
import { BsModalService } from 'ngx-bootstrap';
import { MessageComponent } from '../shared/message/message.component';
import { invalid } from '@angular/compiler/src/render3/view/util';


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
  segmentEnabled: boolean = true;
  validModel = new ValidateModel();



  @ViewChild(PassiveSegmentsComponent) segmentComponent: PassiveSegmentsComponent;
  @ViewChild(PaymentComponent) paymentComponent: PaymentComponent;
  @ViewChild(ReportingComponent) reportingComponent: ReportingComponent;
  @ViewChild(RemarkComponent) remarkComponent: RemarkComponent;
  @ViewChild(CancelSegmentComponent) cancelSegmentComponent: CancelSegmentComponent;
  @ViewChild(PassiveSegmentsComponent) passiveSegmentsComponent: PassiveSegmentsComponent;
  errorPnrMsg = '';
  eventSubscribe = false;
  segment = [];



  constructor(private pnrService: PnrService,
    private remarkService: RemarkService,
    private paymentRemarkService: PaymentRemarkService,
    private reportingRemarkService: ReportingRemarkService,
    private segmentService: SegmentService,
    private packageRemarkService: PackageRemarkService,
    private fb: FormBuilder,
    private ddbService: DDBService,
    private modalService: BsModalService
  ) {

    this.getPnr();
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

  async getPnr() {
    this.errorPnrMsg = '';
    // this.ddbService.sampleSupplier();
    // this.ddbService.sample();
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

  checkValid() {
    this.validModel.isSubmitted = true;
    this.validModel.isPaymentValid = this.paymentComponent.checkValid();
    this.validModel.isSegmentValid = this.segmentComponent.checkValid();
    this.validModel.isReportingValid = this.reportingComponent.checkValid();
    this.validModel.isRemarkValid = this.remarkComponent.checkValid();
    return this.validModel.isAllValid();
  }

  public SubmitToPNR() {
    // if (!this.checkValid()) {
    //   const modalRef = this.modalService.show(MessageComponent, { backdrop: 'static' });
    //   modalRef.content.modalRef = modalRef;
    //   modalRef.content.title = 'Invalid Inputs';
    //   modalRef.content.message = ('Please make sure all the inputs are valid and put required values!');
    //   return;
    // }

    const remarkCollection = new Array<RemarkGroup>();
    remarkCollection.push(this.paymentRemarkService.GetMatrixRemarks(this.paymentComponent.matrixReceipt.matrixReceipts));
    remarkCollection.push(this.paymentRemarkService.GetAccountingRemarks(this.paymentComponent.accountingRemark.accountingRemarks));
    remarkCollection.push(this.paymentRemarkService.GetAccountingUdids(this.paymentComponent.accountingRemark));


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
        remarkCollection.push(this.packageRemarkService.GetITCPackageRemarks(this.remarkComponent.itcPackageComponent.itcForm));
      } else {
        remarkCollection.push(this.packageRemarkService.GetTourPackageRemarks(this.remarkComponent.tourPackageComponent.group));
      }
    }

    const leisureFee = this.paymentComponent.leisureFee;
    if (leisureFee.leisureFeeForm.valid) {
      remarkCollection.push(this.paymentRemarkService.GetLeisureFeeRemarks(leisureFee.leisureFeeForm, this.cfLine.cfa));
    }

    this.remarkService.BuildRemarks(remarkCollection);
    this.remarkService.SubmitRemarks().then(x => {
      this.isPnrLoaded = false;
      this.getPnr();
      //  this.workflow = '';
      //this.loadPnr();

    }, error => { alert(JSON.stringify(error)); });
    this.remarkService.endPNR();
  }

  async cancelPnr() {
    const osiCollection = new Array<RemarkGroup>();
    const remarkCollection = new Array<RemarkGroup>();
    const cancel = this.cancelSegmentComponent;
    const getSelected = cancel.submit();

    // if (getSelected.length >= 1) {
    osiCollection.push(this.segmentService.osiCancelRemarks(cancel.cancelForm));
    this.remarkService.BuildRemarks(osiCollection);
    await this.remarkService.cancelRemarks().then(x => {
    }, error => { alert(JSON.stringify(error)); });

    if (getSelected.length === this.segment.length && !this.pnrService.IsMISRetention()) {
      remarkCollection.push(this.segmentService.cancelMisSegment());
    }

    remarkCollection.push(this.segmentService.buildCancelRemarks(cancel.cancelForm, getSelected));
    this.remarkService.BuildRemarks(remarkCollection);
    await this.remarkService.cancelRemarks().then(x => {
    }, error => { alert(JSON.stringify(error)); });
    this.remarkService.endPNR();
  }

  async addSegmentToPNR() {
    const remarkCollection = new Array<RemarkGroup>();
    remarkCollection.push(this.segmentService.GetSegmentRemark(this.passiveSegmentsComponent.segmentRemark.segmentRemarks));
    this.remarkService.BuildRemarks(remarkCollection);
    await this.remarkService.SubmitRemarks().then(x => {
    }, error => { alert(JSON.stringify(error)); });
    await this.addRir();
  }

  async addRir() {
    await this.pnrService.getPNR();
    const remarkCollection2 = new Array<RemarkGroup>();
    remarkCollection2.push(this.segmentService.addSeaSegmentRir(this.passiveSegmentsComponent.segmentRemark.segmentRemarks));
    await this.remarkService.BuildRemarks(remarkCollection2);
    this.remarkService.SubmitRemarks().then(x => {
    }, error => { alert(JSON.stringify(error)); });
    this.segmentEnabled = false;
  }
  // }

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

  public AddSegment() {
    if (this.isPnrLoaded) {
      this.workflow = 'segment';
    }
  }

  back(): void {
    window.location.reload();
    if (this.isPnrLoaded) {
      this.workflow = '';
    }
  }

  setControl() {
    if (this.isPnrLoaded) {
      if (this.pnrService.hasRecordLocator() !== undefined && (this.segment.length > 0 || (this.pnrService.IsMISRetention()))) {
        this.cancelEnabled = false;
      }
    }
  }

}
