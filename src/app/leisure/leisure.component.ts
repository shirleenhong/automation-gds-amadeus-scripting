import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { PnrService } from '../service/pnr.service';
import { RemarkService } from '../service/remark.service';
import { LeisureViewModel } from '../models/leisure-view.model';
import { PaymentRemarkService } from '../service/payment-remark.service';
import { RemarkGroup } from '../models/pnr/remark.group.model';
import { ReportingRemarkService } from '../service/reporting-remark.service';
import { PaymentComponent } from '../payments/payment.component';
import { SegmentService } from '../service/segment.service';
import { ReportingComponent } from '../reporting/reporting.component';
import { RemarkComponent } from '../remarks/remark.component';
import { DDBService } from '../service/ddb.service';
import { CfRemarkModel } from '../models/pnr/cf-remark.model';
import { PassiveSegmentsComponent } from '../passive-segments/passive-segments.component';
import { PackageRemarkService } from '../service/package-remark.service';
import { ValidateModel } from '../models/validate-model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { MessageComponent } from '../shared/message/message.component';
import { VisaPassportService } from '../service/visa-passport.service';
import { InvoiceService } from '../service/invoice-remark.service';
import { MatrixInvoiceComponent } from '../invoice/matrix-invoice.component';
import { ItineraryService } from '../service/itinerary.service';
import { ItineraryAndQueueComponent } from '../itinerary-and-queue/itinerary-and-queue.component';
import { QueueService } from '../service/queue.service';
import { QueuePlaceModel } from '../models/pnr/queue-place.model';
import { MessageType } from '../shared/message/MessageType';
import { LoadingComponent } from '../shared/loading/loading.component';
import { CancelSegmentComponent } from '../cancel/cancel-segment/cancel-segment.component';

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
  workflow = 'start';
  cancelEnabled = true;
  validModel = new ValidateModel();
  invoiceEnabled = false;
  submitProcess = false;
  modalRef: BsModalRef;

  @ViewChild(PassiveSegmentsComponent)
  segmentComponent: PassiveSegmentsComponent;
  @ViewChild(PaymentComponent) paymentComponent: PaymentComponent;
  @ViewChild(ReportingComponent) reportingComponent: ReportingComponent;
  @ViewChild(RemarkComponent) remarkComponent: RemarkComponent;
  @ViewChild(CancelSegmentComponent)
  cancelSegmentComponent: CancelSegmentComponent;
  @ViewChild(PassiveSegmentsComponent)
  passiveSegmentsComponent: PassiveSegmentsComponent;
  @ViewChild(MatrixInvoiceComponent) invoiceComponent: MatrixInvoiceComponent;
  @ViewChild(ItineraryAndQueueComponent) itineraryqueueComponent: ItineraryAndQueueComponent;

  errorPnrMsg = '';
  eventSubscribe = false;
  segment = [];

  constructor(
    private pnrService: PnrService,
    private remarkService: RemarkService,
    private paymentRemarkService: PaymentRemarkService,
    private reportingRemarkService: ReportingRemarkService,
    private segmentService: SegmentService,
    private packageRemarkService: PackageRemarkService,
    private visaPassportService: VisaPassportService,
    private ddbService: DDBService,
    private modalService: BsModalService,
    private invoiceService: InvoiceService,
    private itineraryService: ItineraryService,
    private queueService: QueueService
  ) {
    this.getPnr();
    this.initData();
  }

  ngAfterViewChecked() {
    // Subscribe to event from child Component
  }

  ngAfterViewInit(): void { }

  async getPnr(queueCollection?: Array<QueuePlaceModel>) {
    this.errorPnrMsg = '';
    await this.getPnrService();
    this.cfLine = this.pnrService.getCFLine();
    if (queueCollection) {
      this.queueService.queuePNR(queueCollection);
    }
    // this.itineraryService.getCountry(this.pnrService.pnrObj.airSegments);
    await this.getCountryTravelInformation();
    if (this.pnrService.errorMessage.indexOf('Error') === 0) {
      this.errorPnrMsg = 'Unable to load PNR or no PNR is loaded in Amadeus. \r\n' + this.pnrService.errorMessage;
    } else if (this.cfLine == null || this.cfLine === undefined) {
      this.errorPnrMsg = 'PNR doesnt contain CF Remark, Please make sure CF remark is existing in PNR.';
      this.isPnrLoaded = true;
    }
    this.submitProcess = false;
    this.displayInvoice();
    this.modalRef.hide();
  }

  initData() {
    this.ddbService.loadSupplierCodesFromPowerBase();
  }

  async getPnrService() {
    this.pnrService.isPNRLoaded = false;
    await this.pnrService.getPNR();
    this.isPnrLoaded = this.pnrService.isPNRLoaded;
  }

  async getCountryTravelInformation() {
    await this.ddbService.getTravelPortInformation(this.pnrService.pnrObj.airSegments);
    this.workflow = '';
  }

  ngOnInit() {
    this.leisure = new LeisureViewModel();
  }

  checkValid() {
    this.validModel.isSubmitted = true;
    this.validModel.isPaymentValid = this.paymentComponent.checkValid();
    this.validModel.isReportingValid = this.reportingComponent.checkValid();
    this.validModel.isRemarkValid = this.remarkComponent.checkValid();
    this.validModel.isItineraryValid = this.itineraryqueueComponent.checkValid();
    return this.validModel.isAllValid();
  }

  public SubmitToPNR() {
    if (this.submitProcess) {
      return;
    }

    if (!this.checkValid()) {
      const modalRef = this.modalService.show(MessageComponent, {
        backdrop: 'static'
      });
      modalRef.content.modalRef = modalRef;
      modalRef.content.title = 'Invalid Inputs';
      modalRef.content.message = 'Please make sure all the inputs are valid and put required values!';
      this.submitProcess = false;
      return;
    }

    this.submitProcess = true;
    this.showLoading('Updating info to PNR...');

    const remarkCollection = new Array<RemarkGroup>();
    let queueCollection = Array<QueuePlaceModel>();

    remarkCollection.push(this.paymentRemarkService.GetMatrixRemarks(this.paymentComponent.matrixReceipt.matrixReceipts));
    remarkCollection.push(this.paymentRemarkService.GetAccountingRemarks(this.paymentComponent.accountingRemark.accountingRemarks));
    remarkCollection.push(this.paymentRemarkService.GetAccountingUdids(this.paymentComponent.accountingRemark));
    remarkCollection.push(this.visaPassportService.GetRemarks(this.remarkComponent.viewPassportComponent.visaPassportFormGroup));
    remarkCollection.push(this.segmentService.writeOptionalFareRule(this.remarkComponent.fareRuleSegmentComponent.fareRuleRemarks));
    remarkCollection.push(this.reportingRemarkService.GetRoutingRemark(this.leisure.reportingView));
    if (!this.pnrService.hasAmendMISRetentionLine()) {
      remarkCollection.push(this.segmentService.getRetentionLine());
    }

    remarkCollection.push(this.segmentService.removeTeamMateMisRetention());
    remarkCollection.push(this.segmentService.getMandatoryRemarks());

    if (this.cfLine.cfa === 'RBM' || this.cfLine.cfa === 'RBP') {
      const concierge = this.reportingComponent.conciergeComponent;
      remarkCollection.push(this.reportingRemarkService.GetConciergeUdids(concierge));
    }

    if (
      this.remarkComponent.remarkForm.controls.packageList.value !== null &&
      this.remarkComponent.remarkForm.controls.packageList.value !== '' &&
      this.remarkComponent.remarkForm.controls.packageList.value !== '1'
    ) {
      if (this.remarkComponent.remarkForm.controls.packageList.value === 'ITC') {
        remarkCollection.push(this.packageRemarkService.GetITCPackageRemarks(this.remarkComponent.itcPackageComponent.itcForm));
      } else {
        remarkCollection.push(this.packageRemarkService.GetTourPackageRemarks(this.remarkComponent.tourPackageComponent.group));
      }
    } else {
      remarkCollection.push(this.packageRemarkService.GetPackageRemarksForDeletion());
    }

    remarkCollection.push(this.packageRemarkService.GetCodeShare(this.remarkComponent.codeShareComponent.codeShareGroup));
    remarkCollection.push(
      this.packageRemarkService.GetRbcRedemptionRemarks(this.remarkComponent.rbcPointsRedemptionComponent.rbcRedemption)
    );

    if (!this.itineraryqueueComponent.itineraryComponent.itineraryForm.pristine) {
      remarkCollection.push(this.itineraryService.getItineraryRemarks(this.itineraryqueueComponent.itineraryComponent.itineraryForm));
    }

    queueCollection = this.itineraryService.addQueue(this.itineraryqueueComponent.queueComponent.queueForm);
    const itireraryQueue = this.itineraryService.addItineraryQueue(this.itineraryqueueComponent.itineraryComponent.itineraryForm);
    queueCollection = queueCollection.concat(itireraryQueue);

    const leisureFee = this.paymentComponent.leisureFee;
    remarkCollection.push(this.paymentRemarkService.GetLeisureFeeRemarks(leisureFee, this.cfLine.cfa));

    this.remarkService.BuildRemarks(remarkCollection);
    this.remarkService.SubmitRemarks().then(
      () => {
        this.submitProcess = false;
        this.isPnrLoaded = false;
        this.getPnr(queueCollection);
        this.workflow = '';
      },
      (error) => {
        this.showMessage('An Error occured upon updating PNR', MessageType.Error);
        console.log(JSON.stringify(error));
      }
    );
  }

  showMessage(msg, type: MessageType) {
    this.modalRef = this.modalService.show(MessageComponent, {
      backdrop: 'static'
    });
    this.modalRef.content.modalRef = this.modalRef;
    this.modalRef.content.title = 'PNR Updated';
    this.modalRef.content.message = msg;
    this.modalRef.content.callerName = 'SubmitToPnR';
    this.modalRef.content.response = '';
    this.modalRef.content.setMessageType(type);
  }

  showLoading(msg) {
    this.modalRef = this.modalService.show(LoadingComponent, {
      backdrop: 'static'
    });
    this.modalRef.content.modalRef = this.modalRef;
    this.modalRef.content.title = 'PNR Updated';
    this.modalRef.content.message = msg;
  }

  async cancelPnr() {
    if (this.submitProcess) {
      return;
    }

    if (!this.cancelSegmentComponent.checkValid()) {
      const modalRef = this.modalService.show(MessageComponent, {
        backdrop: 'static'
      });
      modalRef.content.modalRef = modalRef;
      modalRef.content.title = 'Invalid Inputs';
      modalRef.content.message = 'Please make sure all the inputs are valid and put required values!';
      return;
    }
    this.showLoading('Applying cancellation to PNR...');
    this.submitProcess = true;
    const osiCollection = new Array<RemarkGroup>();
    const remarkCollection = new Array<RemarkGroup>();
    const cancel = this.cancelSegmentComponent;
    const getSelected = cancel.submit();

    // if (getSelected.length >= 1) {
    osiCollection.push(this.segmentService.osiCancelRemarks(cancel.cancelForm));
    this.remarkService.BuildRemarks(osiCollection);
    await this.remarkService.cancelOSIRemarks().then(
      () => { },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );

    if (getSelected.length === this.segment.length) {
      remarkCollection.push(this.segmentService.cancelMisSegment());
    }

    remarkCollection.push(this.segmentService.buildCancelRemarks(cancel.cancelForm, getSelected));
    this.remarkService.BuildRemarks(remarkCollection);
    await this.remarkService.cancelRemarks(cancel.cancelForm.value.requestor).then(
      () => {
        this.isPnrLoaded = false;
        this.getPnr();
        this.workflow = '';
      },
      (error) => {
        this.showMessage('An error occured during cancellation', MessageType.Error);
        console.log(JSON.stringify(error));
        this.workflow = '';
      }
    );
  }

  async addSegmentToPNR() {
    if (this.submitProcess) {
      return;
    }
    this.showLoading('Adding Segment(s) to PNR...');
    this.submitProcess = true;
    const remarkCollection = new Array<RemarkGroup>();
    remarkCollection.push(this.segmentService.GetSegmentRemark(this.passiveSegmentsComponent.segmentRemark.segmentRemarks));
    this.remarkService.BuildRemarks(remarkCollection);
    await this.remarkService.SubmitRemarks().then(
      async () => {
        await this.getPnrService();
        await this.addSemgentsRirRemarks();
        this.workflow = '';
      },
      (error) => {
        this.showMessage('An error occured while adding segment', MessageType.Error);
        console.log(JSON.stringify(error));
      }
    );
  }

  async addSemgentsRirRemarks() {
    // await this.pnrService.getPNR();
    const remarkCollection2 = new Array<RemarkGroup>();
    remarkCollection2.push(this.segmentService.addSegmentRir(this.passiveSegmentsComponent.segmentRemark));

    await this.remarkService.BuildRemarks(remarkCollection2);
    this.remarkService.SubmitRemarks().then(
      () => {
        this.isPnrLoaded = false;
        this.getPnr();
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
  }

  displayInvoice() {
    if (this.isPnrLoaded) {
      if (this.pnrService.recordLocator()) {
        this.invoiceEnabled = true;
      } else {
        this.invoiceEnabled = false;
      }
    }
  }

  public SendInvoiceItinerary() {
    if (this.submitProcess) {
      return;
    }
    this.showLoading('Sending Invoice Itinerary...');
    this.submitProcess = true;
    const remarkCollection = new Array<RemarkGroup>();
    remarkCollection.push(this.invoiceService.GetMatrixInvoice(this.invoiceComponent.matrixInvoiceGroup));
    this.remarkService.endPNR(' Agent Invoicing'); // end PNR First before Invoice
    this.remarkService.BuildRemarks(remarkCollection);
    this.remarkService.SubmitRemarks().then(
      () => {
        this.isPnrLoaded = false;
        this.getPnr();
        this.workflow = '';
      },
      (error) => {
        this.showMessage('Error while sending Invoice Itinerary', MessageType.Error);
        console.log(JSON.stringify(error));
      }
    );
  }

  public async loadPnr() {
    if (this.isPnrLoaded) {
      await this.getPnrService();
      this.workflow = 'load';
    }
  }

  public async cancelSegment() {
    if (this.isPnrLoaded) {
      await this.getPnrService();
      this.workflow = 'cancel';
      this.segment = this.pnrService.getSegmentTatooNumber();
      this.setControl();
    }
  }

  public async AddSegment() {
    if (this.isPnrLoaded) {
      await this.getPnrService();
      this.workflow = 'segment';
    }
  }

  public async sendInvoice() {
    if (this.isPnrLoaded) {
      await this.getPnrService();
      this.workflow = 'invoice';
    }
  }

  back(): void {
    if (this.isPnrLoaded) {
      this.workflow = '';
    }
  }

  setControl() {
    if (this.isPnrLoaded) {
      if (this.pnrService.recordLocator()) {
        this.cancelEnabled = false;
      }
    }
  }
}
