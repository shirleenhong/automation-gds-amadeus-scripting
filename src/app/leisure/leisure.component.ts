import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { PnrService } from '../service/pnr.service';
// import { AmadeusRemarkService } from '../service/remark.service';
import { PaymentRemarkService } from '../service/leisure/payment-remark.service';
import { RemarkGroup } from '../models/pnr/remark.group.model';
import { ReportingRemarkService } from '../service/leisure/reporting-remark.service';
import { PaymentComponent } from './payments/payment.component';
import { SegmentService } from '../service/segment.service';
import { ReportingComponent } from './reporting/reporting.component';
import { RemarkComponent } from './remarks/remark.component';
import { DDBService } from '../service/ddb.service';
import { CfRemarkModel } from '../models/pnr/cf-remark.model';
import { PassiveSegmentsComponent } from '../passive-segments/passive-segments.component';
import { RemarkService } from '../service/leisure/remark-remark.service';
import { ValidateModel } from '../models/validate-model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { MessageComponent } from '../shared/message/message.component';
import { VisaPassportRemarkService } from '../service/leisure/visa-passport-remark.service';
import { InvoiceRemarkService } from '../service/leisure/invoice-remark.service';
import { MatrixInvoiceComponent } from './invoice/matrix-invoice.component';
import { ItineraryRemarkService } from '../service/leisure/itinerary-remark.service';
import { ItineraryAndQueueComponent } from './itinerary-and-queue/itinerary-and-queue.component';
import { AmadeusQueueService } from '../service/amadeus-queue.service';
import { MessageType } from '../shared/message/MessageType';
import { LoadingComponent } from '../shared/loading/loading.component';
import { CancelComponent } from './cancel/cancel.component';
import { common } from '../../environments/common';
import { MatrixAccountingModel } from '../models/pnr/matrix-accounting.model';
import { OtherRemarksService } from '../service/leisure/other-remarks.service';
import { AmadeusRemarkService } from '../service/amadeus-remark.service';

@Component({
  selector: 'app-leisure',
  templateUrl: './leisure.component.html',
  styleUrls: ['./leisure.component.scss']
})
export class LeisureComponent implements OnInit, AfterViewInit, AfterViewChecked {
  isPnrLoaded: boolean;
  message: string;
  cfLine: CfRemarkModel;
  workflow = 'start';
  cancelEnabled = true;
  validModel = new ValidateModel();
  invoiceEnabled = false;
  submitProcess = false;
  modalRef: BsModalRef;
  version = common.LeisureVersionNumber;
  issuingBsp = false;
  bspReply = false;
  errorAccounting: string;
  paymentWarning = '';

  @ViewChild(PassiveSegmentsComponent)
  segmentComponent: PassiveSegmentsComponent;
  @ViewChild(PaymentComponent) paymentComponent: PaymentComponent;
  @ViewChild(ReportingComponent) reportingComponent: ReportingComponent;
  @ViewChild(RemarkComponent) remarkComponent: RemarkComponent;
  @ViewChild(PassiveSegmentsComponent)
  passiveSegmentsComponent: PassiveSegmentsComponent;
  @ViewChild(MatrixInvoiceComponent) invoiceComponent: MatrixInvoiceComponent;
  @ViewChild(ItineraryAndQueueComponent) itineraryqueueComponent: ItineraryAndQueueComponent;
  @ViewChild(CancelComponent) cancelComponent: CancelComponent;

  errorPnrMsg = '';
  eventSubscribe = false;
  segment = [];

  constructor(
    private pnrService: PnrService,
    private leisureRemarkService: AmadeusRemarkService,
    private paymentRemarkService: PaymentRemarkService,
    private reportingRemarkService: ReportingRemarkService,
    private segmentService: SegmentService,
    private packageRemarkService: RemarkService,
    private visaPassportService: VisaPassportRemarkService,
    private ddbService: DDBService,
    private modalService: BsModalService,
    private invoiceService: InvoiceRemarkService,
    private itineraryService: ItineraryRemarkService,
    private queueService: AmadeusQueueService,
    private otherService: OtherRemarksService
  ) {
    this.getPnr();
    this.initData();
  }

  ngAfterViewChecked() {
    // Subscribe to event from child Component
  }

  ngAfterViewInit(): void { }

  async getPnr() {
    this.errorPnrMsg = '';
    await this.getPnrService();
    this.cfLine = this.pnrService.getCFLine();
    this.queueService.queuePNR();
    this.queueService.newQueueCollection();

    // await this.getServicingOptions();
    await this.getCountryTravelInformation();
    if (this.pnrService.errorMessage.indexOf('Error') === 0) {
      this.errorPnrMsg = 'Unable to load PNR or no PNR is loaded in Amadeus. \r\n' + this.pnrService.errorMessage;
    } else if (this.cfLine == null || this.cfLine === undefined) {
      this.errorPnrMsg = 'PNR doesnt contain CF Remark, Please make sure CF remark is existing in PNR.';
      this.isPnrLoaded = true;
    }

    this.submitProcess = false;
    this.displayInvoice();
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }

  initData() {
    this.ddbService.getAllMatrixSupplierCodes();
  }

  async getPnrService() {
    this.pnrService.isPNRLoaded = false;
    await this.pnrService.getPNR();
    this.isPnrLoaded = this.pnrService.isPNRLoaded;
    this.paymentWarning = this.getPaymentExistRemark();
  }

  async getCountryTravelInformation() {
    await this.ddbService.getTravelPortInformation(this.pnrService.pnrObj.airSegments);
    this.workflow = '';
  }

  async ngOnInit() {
    this.modalSubscribeOnClose();
  }

  checkValid() {
    this.validModel.isSubmitted = true;
    this.validModel.isPaymentValid = this.paymentComponent.checkValid();
    this.validModel.isReportingValid = this.reportingComponent.checkValid();
    this.validModel.isRemarkValid = this.remarkComponent.checkValid();
    return this.validModel.isAllValid();
  }

  getPaymentExistRemark() {
    const exist = [];
    if (this.pnrService.getMatrixAccountingLineNumbers().length > 0) {
      exist.push('Accounting');
    }
    if (this.pnrService.getMatrixReceiptLineNumbers().length > 0) {
      exist.push('Receipt');
    }
    if (this.pnrService.getSFCRemarks().length > 0) {
      exist.push('Service Fee');
    }
    return exist.join('/');
  }

  public async SubmitToPNR() {
    if (this.submitProcess) {
      return;
    }

    const encryptedCC = this.paymentComponent.checkEncryptedCreditCard();
    if (encryptedCC.length > 0) {
      this.accountingModal(encryptedCC);
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

    if (!this.bspReply && this.pnrService.getTSTTicketed()) {
      this.issueBsp();
      return;
    }

    this.submitProcess = true;
    this.showLoading('Updating PNR remarks...');

    const remarkCollection = new Array<RemarkGroup>();

    remarkCollection.push(this.paymentRemarkService.removeRmFop());

    if (this.issuingBsp) {
      remarkCollection.push(this.paymentRemarkService.addRmFop());
      this.issuingBsp = false;
    }
    this.bspReply = false;
    remarkCollection.push(
      this.paymentRemarkService.GetMatrixRemarks(
        this.paymentComponent.matrixReceipt.matrixReceipts,
        this.paymentComponent.matrixReceipt.matrixReceiptsToDelete
      )
    );
    remarkCollection.push(
      this.paymentRemarkService.GetAccountingRemarks(
        this.paymentComponent.accountingRemark.accountingRemarks,
        this.paymentComponent.accountingRemark.accountingRemarksToDelete
      )
    );

    remarkCollection.push(this.paymentRemarkService.GetAccountingUdids(this.paymentComponent.accountingRemark));
    remarkCollection.push(this.visaPassportService.GetRemarks(this.remarkComponent.viewPassportComponent.visaPassportFormGroup));
    remarkCollection.push(this.segmentService.writeOptionalFareRule(this.remarkComponent.fareRuleSegmentComponent.fareRuleRemarks));
    remarkCollection.push(this.otherService.writeConceirgeRemarks());
    remarkCollection.push(this.reportingRemarkService.GetRoutingRemark(this.reportingComponent.reportingView));
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
    if (this.remarkComponent.rbcPointsRedemptionComponent) {
      remarkCollection.push(
        this.packageRemarkService.GetRbcRedemptionRemarks(this.remarkComponent.rbcPointsRedemptionComponent.rbcRedemption)
      );
    }

    const leisureFee = this.paymentComponent.leisureFee;
    remarkCollection.push(this.paymentRemarkService.GetLeisureFeeRemarks(leisureFee, this.cfLine.cfa));
    remarkCollection.push(
      this.packageRemarkService.buildAssociatedRemarks(this.remarkComponent.associatedRemarksComponent.associatedRemarksForm)
    );

    const acpp = this.paymentComponent.accountingRemark.accountingRemarks.filter((x) => x.accountingTypeRemark === 'ACPP');
    this.leisureRemarkService.BuildRemarks(remarkCollection);
    await this.leisureRemarkService.SubmitRemarks().then(
      async () => {
        if (acpp && acpp.length > 0) {
          await this.processPassPurchase(this.paymentComponent.accountingRemark.accountingRemarks);
        } else {
          await this.resetReloadUI();
        }
      },
      (error) => {
        this.showMessage('An Error occured upon updating PNR', MessageType.Error);
        console.log(JSON.stringify(error));
      }
    );

    if (this.invoiceComponent.matrixInvoiceGroup.controls.selection.value) {
      this.SendInvoiceItinerary();
    }
  }

  processPassPurchase(accountingRemarks: MatrixAccountingModel[]) {
    this.getPnrService().then(async () => {
      const accounts = accountingRemarks;
      let acpp = Array<MatrixAccountingModel>();

      const matrixAccountingReceiptsToUdpate = accountingRemarks.filter((x) => x.status === 'UPDATED');
      if (matrixAccountingReceiptsToUdpate.length > 0) {
        acpp = accounts;
      } else {
        acpp = accounts.filter((x) => x.accountingTypeRemark === 'ACPP' && (x.status === 'UPDATED' || x.status === 'ADDED'));
      }

      let found = false;
      acpp.forEach((a) => {
        const dummy = this.pnrService.getSegmentTatooNumber().find((x) => x.controlNumber === a.supplierConfirmatioNo);
        if (dummy) {
          found = true;
          a.segmentNo = dummy.lineNo;
        }
      });
      if (found) {
        const accRemarks = new Array<RemarkGroup>();
        accRemarks.push(this.paymentRemarkService.GetAccountingRemarks(acpp));
        this.leisureRemarkService.BuildRemarks(accRemarks);
        await this.leisureRemarkService.SubmitRemarks().then(async () => {
          await this.resetReloadUI();
        });
      } else {
        await this.resetReloadUI();
      }
    });
  }

  async resetReloadUI() {
    this.submitProcess = false;
    this.isPnrLoaded = false;
    await this.getPnr();
    this.workflow = '';
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
    // let queueCollection = Array<QueuePlaceModel>();

    if (this.submitProcess) {
      return;
    }

    if (!this.cancelComponent.checkValid()) {
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
    const cancel = this.cancelComponent.cancelSegmentComponent;
    const getSelected = cancel.submit();

    // if (getSelected.length >= 1) {
    osiCollection.push(this.segmentService.osiCancelRemarks(cancel.cancelForm));
    this.leisureRemarkService.BuildRemarks(osiCollection);
    await this.leisureRemarkService.cancelOSIRemarks().then(
      () => { },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );

    if (getSelected.length === this.segment.length) {
      remarkCollection.push(this.segmentService.cancelMisSegment());
    }

    this.segmentService.queueCancel(cancel.cancelForm, this.cfLine);
    if (this.cancelComponent.refundComponent) {
      remarkCollection.push(this.segmentService.writeRefundRemarks(this.cancelComponent.refundComponent.refundForm));
    }
    remarkCollection.push(this.segmentService.buildCancelRemarks(cancel.cancelForm, getSelected));
    this.leisureRemarkService.BuildRemarks(remarkCollection);
    await this.leisureRemarkService.SubmitRemarks(cancel.cancelForm.value.requestor).then(
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

  public async SendInvoiceItinerary() {
    if (this.submitProcess) {
      return;
    }
    this.showLoading('Sending Invoice Itinerary...');
    this.submitProcess = true;
    const remarkCollection = new Array<RemarkGroup>();
    remarkCollection.push(this.invoiceService.GetMatrixInvoice(this.invoiceComponent.matrixInvoiceGroup));
    // this.remarkService.endPNR(' Agent Invoicing', true); // end PNR First before Invoice
    this.leisureRemarkService.BuildRemarks(remarkCollection);
    await this.leisureRemarkService.SubmitRemarks().then(
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

  async addSegmentToPNR() {
    if (this.submitProcess) {
      return;
    }
    this.showLoading('Adding Segment(s) to PNR...');
    this.submitProcess = true;
    const remarkCollection = new Array<RemarkGroup>();
    remarkCollection.push(this.segmentService.deleteSegments(this.passiveSegmentsComponent.segmentRemark.segmentRemarks));
    remarkCollection.push(this.segmentService.GetSegmentRemark(this.passiveSegmentsComponent.segmentRemark.segmentRemarks));
    this.leisureRemarkService.BuildRemarks(remarkCollection);
    await this.leisureRemarkService.SubmitRemarks().then(
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
    const remarkCollection2 = new Array<RemarkGroup>();
    remarkCollection2.push(this.segmentService.addSegmentRir(this.passiveSegmentsComponent.segmentRemark));

    await this.leisureRemarkService.BuildRemarks(remarkCollection2);
    this.leisureRemarkService.SubmitRemarks().then(
      () => {
        this.isPnrLoaded = false;
        this.getPnr();
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
  }

  public SendItineraryAndQueue() {
    if (!this.itineraryqueueComponent.checkValid()) {
      const modalRef = this.modalService.show(MessageComponent, {
        backdrop: 'static'
      });
      modalRef.content.modalRef = modalRef;
      modalRef.content.title = 'Invalid Inputs';
      modalRef.content.message = 'Please make sure all the inputs are valid and put required values!';
      return;
    }

    if (this.submitProcess) {
      return;
    }
    this.showLoading('Sending Itinerary and Queueing...');
    const remarkCollection = new Array<RemarkGroup>();

    if (!this.itineraryqueueComponent.itineraryComponent.itineraryForm.pristine) {
      remarkCollection.push(this.itineraryService.getItineraryRemarks(this.itineraryqueueComponent.itineraryComponent.itineraryForm));
      this.itineraryService.addItineraryQueue(this.itineraryqueueComponent.itineraryComponent.itineraryForm);
    }
    this.itineraryService.addQueue(this.itineraryqueueComponent.queueComponent.queueForm);
    this.leisureRemarkService.BuildRemarks(remarkCollection);
    this.leisureRemarkService.SubmitRemarks().then(
      () => {
        this.isPnrLoaded = false;
        this.getPnr();
        this.workflow = '';
      },
      (error) => {
        this.showMessage('Error while sending Itinerary and Queueing', MessageType.Error);
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

  public async sendItineraryAndQueue() {
    if (this.isPnrLoaded) {
      await this.getPnrService();
      this.workflow = 'sendItinerary';
    }
  }

  accountingModal(errorLines) {
    const modalRef = this.modalService.show(MessageComponent, {
      backdrop: 'static'
    });
    modalRef.content.modalRef = modalRef;
    modalRef.content.title = 'Warning';
    modalRef.content.message = 'Please re-enter Credit Card numbers on the following: <br>' + errorLines.join('<br>');
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

  issueBsp() {
    this.issuingBsp = false;
    this.modalRef = this.modalService.show(MessageComponent, {
      backdrop: 'static'
    });
    this.modalRef.content.modalRef = this.modalRef;
    this.modalRef.content.title = 'Issuing a BSP ticket';
    this.modalRef.content.message = 'Are you issuing a BSP ticket on a CWT Agency Plastic Credit Card?';
    this.modalRef.content.note =
      'For BSP Ticketing ensure only tickets being charged to the Agency Plastic Card are issued while the' +
      'RM*FOP/-AP format is in the PNR. \r\n' +
      'If issuing BSP ticket using Traveller’s Personal Credit Card, delete the RM*FOP/-AP remark.';
    this.modalRef.content.callerName = 'issuingBSP';
    this.modalRef.content.setMessageType(MessageType.YesNo);
  }

  modalSubscribeOnClose() {
    this.modalService.onHide.subscribe(() => {
      if (this.modalRef !== undefined && this.modalRef.content !== undefined && this.modalRef.content.callerName === 'issuingBSP') {
        if (this.modalRef.content.response === 'YES') {
          this.issuingBsp = true;
        } else {
          this.issuingBsp = false;
        }
        this.bspReply = true;
        this.modalRef.content.response = '';
        this.SubmitToPNR();
      }
    });
  }
}
