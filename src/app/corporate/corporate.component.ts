import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

import { LoadingComponent } from '../shared/loading/loading.component';
import { MessageComponent } from '../shared/message/message.component';
import { PaymentsComponent } from './payments/payments.component';
import { ReportingComponent } from '../corporate/reporting/reporting.component';
import { TicketingComponent } from './ticketing/ticketing.component';

import { PnrService } from '../service/pnr.service';
import { DDBService } from '../service/ddb.service';
import { RemarksManagerService } from '../service/corporate/remarks-manager.service';
import { PaymentRemarkService } from '../service/corporate/payment-remark.service';
import { ReportingRemarkService } from '../service/corporate/reporting-remark.service';
import { TicketRemarkService } from '../service/corporate/ticket-remark.service';
import { RemarkGroup } from '../models/pnr/remark.group.model';
import { ValidateModel } from '../models/validate-model';
import { MessageType } from '../shared/message/MessageType';
import { AmadeusRemarkService } from '../service/amadeus-remark.service';
import { FeesComponent } from './fees/fees.component';
import { FeesRemarkService } from '../service/corporate/fees-remarks.service';
import { MatrixReportingComponent } from '../corporate/reporting/matrix-reporting/matrix-reporting.component';
import { CorpRemarksComponent } from './corp-remarks/corp-remarks.component';
import { CorpRemarksService } from '../service/corporate/corp-remarks.service';
import { ItineraryRemarkService } from '../service/corporate/itinerary-remark.service';
import { AmadeusQueueService } from '../service/amadeus-queue.service';
import { RemarkModel } from '../models/pnr/remark.model';
import { CleanUpRemarkService } from '../service/corporate/cleanup-remark.service';
import { QueueService } from '../service/corporate/queue.service';
import { QueueComponent } from './queue/queue.component';
import { ItineraryAndQueueComponent } from './itinerary-and-queue/itinerary-and-queue.component';
import { OfcRemarkService } from '../service/corporate/ofc-remark.service';
import { CounselorDetail } from '../globals/counselor-identity';
import { VisaPassportRemarkService } from '../service/visa-passport-remark.service';
import { PassiveSegmentsComponent } from '../passive-segments/passive-segments.component';
import { SegmentService } from '../service/segment.service';
import { SendInvoiceItineraryComponent } from './send-invoice-itinerary/send-invoice-itinerary.component';
import { CorpCancelComponent } from './corp-cancel/corp-cancel.component';
import { CfRemarkModel } from '../models/pnr/cf-remark.model';
import { CancelSegmentComponent } from '../shared/cancel-segment/cancel-segment.component';
import { PassiveSegmentModel } from '../models/pnr/passive-segment.model';
import { CorpCancelRemarkService } from '../service/corporate/corp-cancel-remark.service';
import { InvoiceRemarkService } from '../service/corporate/invoice-remark.service';

@Component({
  selector: 'app-corporate',
  templateUrl: './corporate.component.html',
  styleUrls: ['./corporate.component.scss']
})
export class CorporateComponent implements OnInit {
  title = 'bpg-gds-scripting-amadeus';
  errorPnrMsg = '';
  isPnrLoaded = false;
  modalRef: BsModalRef;
  workflow = '';
  cancelEnabled = true;
  validModel = new ValidateModel();
  itinValidModel = new ValidateModel();
  dataError = { matching: false, supplier: false, reasonCode: false, servicingOption: false, pnr: false, hasError: false };
  migrationOBTDates: Array<string>;
  segment = [];
  cfLine: CfRemarkModel;

  @ViewChild(ItineraryAndQueueComponent) itineraryqueueComponent: ItineraryAndQueueComponent;
  @ViewChild(PaymentsComponent) paymentsComponent: PaymentsComponent;
  @ViewChild(ReportingComponent) reportingComponent: ReportingComponent;
  @ViewChild(TicketingComponent) ticketingComponent: TicketingComponent;
  @ViewChild(FeesComponent) feesComponent: FeesComponent;
  @ViewChild(MatrixReportingComponent) matrixReportingComponent: MatrixReportingComponent;
  @ViewChild(CorpRemarksComponent) corpRemarksComponent: CorpRemarksComponent;
  @ViewChild(QueueComponent) queueComponent: QueueComponent;
  @ViewChild(SendInvoiceItineraryComponent)
  sendInvoiceItineraryComponent: SendInvoiceItineraryComponent;
  @ViewChild(PassiveSegmentsComponent)
  passiveSegmentsComponent: PassiveSegmentsComponent;
  @ViewChild(CorpCancelComponent) cancelComponent: CorpCancelComponent;
  @ViewChild(CancelSegmentComponent) cancelSegmentComponent: CancelSegmentComponent;

  constructor(
    private pnrService: PnrService,
    private rms: RemarksManagerService,
    private modalService: BsModalService,
    private paymentRemarkService: PaymentRemarkService,
    private corpRemarkService: AmadeusRemarkService,
    private corpRemarksService: CorpRemarksService,
    private ddbService: DDBService,
    private reportingRemarkService: ReportingRemarkService,
    private invoiceRemarkService: InvoiceRemarkService,
    private ticketRemarkService: TicketRemarkService,
    private feesRemarkService: FeesRemarkService,
    private itineraryService: ItineraryRemarkService,
    private cleanupRemarkService: CleanUpRemarkService,
    private amadeusQueueService: AmadeusQueueService,
    private queueService: QueueService,
    private councelorDetail: CounselorDetail,
    private ofcRemarkService: OfcRemarkService,
    private visaPassportService: VisaPassportRemarkService,
    private segmentService: SegmentService,
    private amadeusRemarkService: AmadeusRemarkService,
    private corpCancelRemarkService: CorpCancelRemarkService
  ) {
    this.initData();
    this.getPnrService();
  }

  async ngOnInit(): Promise<void> {
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }

  async getPnr() {
    this.errorPnrMsg = '';
    await this.getPnrService();
    this.amadeusQueueService.queuePNR();
    this.amadeusQueueService.newQueueCollection();
  }

  async getPnrService() {
    this.dataError.hasError = false;
    this.pnrService.isPNRLoaded = false;
    await this.pnrService.getPNR();
    this.cfLine = this.pnrService.getCFLine();
    this.isPnrLoaded = this.pnrService.isPNRLoaded;
  }

  initData() {
    this.ddbService.getAllMatrixSupplierCodes();
  }

  showLoading(msg, caller?) {
    const skip = this.modalRef && this.modalRef.content && this.modalRef.content.callerName === caller;
    if (!skip) {
      this.modalRef = this.modalService.show(LoadingComponent, {
        backdrop: 'static'
      });
    }
    this.modalRef.content.modalRef = this.modalRef;
    this.modalRef.content.title = 'PNR Updated';
    this.modalRef.content.message = msg;
    this.modalRef.content.callerName = caller;
  }

  closePopup() {
    this.modalRef.content = null;
    this.modalRef.hide();
  }

  showMessage(msg: string, type: MessageType, title: string, caller: string) {
    const skip = this.modalRef && this.modalRef.content && this.modalRef.content.callerName === caller;
    if (!skip) {
      this.modalRef = this.modalService.show(MessageComponent, { backdrop: 'static' });
    }
    this.modalRef.content.modalRef = this.modalRef;
    this.modalRef.content.title = title;
    this.modalRef.content.message = msg;
    this.modalRef.content.callerName = caller;
    this.modalRef.content.response = '';
    this.modalRef.content.setMessageType(type);
  }

  checkValid() {
    this.validModel.isSubmitted = true;
    this.validModel.isPaymentValid = this.paymentsComponent.checkValid();
    this.validModel.isReportingValid = this.reportingComponent.checkValid();
    this.validModel.isRemarkValid = this.corpRemarksComponent.checkValid();
    this.validModel.isTicketingValid = this.ticketingComponent.checkValid();
    this.validModel.isFeesValid = this.feesComponent.checkValid();
    this.validModel.isQueueValid = this.queueComponent.checkValid();
    return this.validModel.isCorporateAllValid();
  }

  public async wrapPnr() {
    await this.loadPnrData();
    this.workflow = 'wrap';
  }

  public async AddSegment() {
    // this.showLoading('Loading PNR and Data', 'initData');
    await this.getPnrService();
    if (!this.pnrService.getClientSubUnit()) {
      this.closePopup();
      this.showMessage('SubUnitGuid is not found in the PNR', MessageType.Error, 'Not Found', 'Loading');
      this.workflow = 'error';
    } else {
      try {
        this.workflow = 'segment';
        // this.showLoading('Matching Remarks', 'initData');
        await this.rms.getMatchcedPlaceholderValues();
      } catch (e) {
        console.log(e);
      }
      this.closePopup();
    }
  }

  async loadPnrData() {
    this.showLoading('Loading PNR and Data', 'initData');
    await this.getPnrService();
    this.cleanupRemarkService.cleanUpRemarks();
    await this.getPnrService();

    if (!this.pnrService.getClientSubUnit()) {
      this.closePopup();
      this.showMessage('SubUnitGuid is not found in the PNR', MessageType.Error, 'Not Found', 'Loading');
      this.workflow = 'error';
    } else {
      try {
        // this.showLoading('Matching Remarks', 'initData');
        await this.rms.getMatchcedPlaceholderValues();
        // this.showLoading('Servicing Options', 'initData');
        await this.ddbService.getTravelPortInformation(this.pnrService.pnrObj.airSegments);
        await this.ddbService.getAllServicingOptions(this.pnrService.clientSubUnitGuid);
        // this.showLoading('ReasonCodes', 'initData');
        await this.ddbService.getApproverGroup(this.pnrService.clientSubUnitGuid, this.pnrService.getCFLine().cfa);
        await this.ddbService.getAirPolicyMissedSavingThreshold(this.pnrService.clientSubUnitGuid);
        await this.ddbService.getMigrationOBTFeeDates().then((dates) => {
          this.migrationOBTDates = dates;
        });
      } catch (e) {
        console.log(e);
      }
    }
    this.closePopup();
    this.checkHasDataLoadError();
  }

  checkHasDataLoadError() {
    this.dataError.matching = !(this.rms.outputItems && this.rms.outputItems.length > 0);
    this.dataError.pnr = !this.isPnrLoaded;
    this.dataError.reasonCode = !(this.ddbService.reasonCodeList && this.ddbService.reasonCodeList.length > 0);
    this.dataError.servicingOption = !(this.ddbService.servicingOption && this.ddbService.servicingOption.length > 0);
    this.dataError.supplier = !(this.ddbService.supplierCodes && this.ddbService.supplierCodes.length > 0);
    this.dataError.hasError =
      this.dataError.matching ||
      this.dataError.pnr ||
      this.dataError.reasonCode ||
      this.dataError.servicingOption ||
      this.dataError.supplier;
  }

  public async SubmitToPNR() {
    if (!this.checkValid()) {
      const modalRef = this.modalService.show(MessageComponent, {
        backdrop: 'static'
      });
      modalRef.content.modalRef = modalRef;
      modalRef.content.title = 'Invalid Inputs';
      modalRef.content.message = 'Please make sure all the inputs are valid and put required values!';
      return;
    }
    this.showLoading('Updating PNR...', 'SubmitToPnr');
    const passiveSegmentList = new Array<PassiveSegmentModel>();
    const accRemarks = new Array<RemarkGroup>();
    let remarkList = new Array<RemarkModel>();
    accRemarks.push(this.paymentRemarkService.deleteSegmentForPassPurchase(this.paymentsComponent.accountingRemark.accountingRemarks));
    accRemarks.push(this.paymentRemarkService.addSegmentForPassPurchase(this.paymentsComponent.accountingRemark.accountingRemarks));
    accRemarks.push(
      this.ticketRemarkService.submitTicketRemark(
        this.ticketingComponent.ticketlineComponent.getTicketingDetails(),
        this.ticketingComponent.ticketlineComponent.approvalForm
      )
    );
    accRemarks.push(this.reportingRemarkService.GetRoutingRemark(this.reportingComponent.reportingRemarksView));

    this.corpRemarkService.BuildRemarks(accRemarks);
    await this.corpRemarkService.SubmitRemarks().then(async () => {
      await this.getPnrService();
      await this.rms.getMatchcedPlaceholderValues();
    });

    // if (
    //   this.paymentsComponent.accountingRemark.accountingRemarks !== undefined &&
    //   this.paymentsComponent.accountingRemark.accountingRemarks.length > 0
    // ) {
    //   if (this.paymentsComponent.accountingRemark.accountingRemarks[0].accountingTypeRemark === 'ACPPC') {
    //     const forDeletion = new Array<string>();
    //     this.paymentsComponent.accountingRemark.accountingRemarks[0].segments.forEach((element) => {
    //       forDeletion.push(element.lineNo);
    //     });
    //     await this.rms.deleteSegments(forDeletion).then(async () => {
    //       await this.getPnr();
    //       await this.rms.getMatchcedPlaceholderValues();
    //     });
    //   }
    // }

    this.paymentRemarkService.writeAccountingReamrks(this.paymentsComponent.accountingRemark);

    this.feesRemarkService.writeFeeRemarks(this.feesComponent.supplemeentalFees.ticketedForm);

    this.feesRemarkService.writeMigrationOBTFeeRemarks(this.migrationOBTDates);

    this.corpRemarksService.writeSeatRemarks(this.corpRemarksComponent.seatsComponent.seats);

    this.invoiceRemarkService.WriteInvoiceRemark(this.reportingComponent.matrixReportingComponent);
    this.reportingRemarkService.WriteEscOFCRemark(this.councelorDetail.getIdentity());
    if (this.reportingComponent.reportingBSPComponent !== undefined) {
      this.reportingRemarkService.WriteBspRemarks(this.reportingComponent.reportingBSPComponent);
    }
    if (this.reportingComponent.carSavingsCodeComponent !== undefined) {
      this.reportingRemarkService.writeCarSavingsRemarks(this.reportingComponent.carSavingsCodeComponent,
        this.reportingComponent.carSavingsCodeComponent.reAddRemarks);
    }
    if (this.councelorDetail.getIdentity() === 'OFC') {
      this.ofcRemarkService.WriteOfcDocumentation(this.queueComponent.ofcDocumentation.ofcDocForm);
    }

    this.reportingRemarkService.WriteNonBspRemarks(this.reportingComponent.reportingNonbspComponent);
    this.corpRemarksService.writeIrdRemarks(this.corpRemarksComponent.irdRemarks);
    this.reportingRemarkService.WriteU63(this.reportingComponent.waiversComponent);
    this.reportingRemarkService.WriteDestinationCode(this.reportingComponent.reportingRemarksComponent);

    this.invoiceRemarkService.sendU70Remarks();

    this.ticketRemarkService.WriteAquaTicketing(this.ticketingComponent.aquaTicketingComponent);
    this.visaPassportService.writeCorporateRemarks(this.corpRemarksComponent.viewPassportComponent.visaPassportFormGroup);

    this.cleanupRemarkService.writePossibleAquaTouchlessRemark();
    this.cleanupRemarkService.writePossibleConcurObtRemark();
    // below additional process not going through remarks manager
    remarkList = this.ticketRemarkService.getApprovalRemarks(this.ticketingComponent.ticketlineComponent.approvalForm);
    remarkList = remarkList.concat(this.corpRemarksService.buildDocumentRemarks(this.corpRemarksComponent.documentComponent.documentForm));
    const forDeleteRemarks = this.ticketRemarkService.getApprovalRemarksForDelete(this.ticketingComponent.ticketlineComponent.approvalForm);
    this.ticketRemarkService.getApprovalQueue(this.ticketingComponent.ticketlineComponent.approvalForm);

    if (this.queueComponent.queueMinderComponent) {
      this.queueService.getQueuePlacement(this.queueComponent.queueMinderComponent.queueMinderForm);
    }
    if (this.councelorDetail.getIdentity() === 'ESC') {
      this.invoiceRemarkService.writeESCRemarks(this.corpRemarksComponent.escRemarksComponent);
    }

    if (!this.queueComponent.itineraryInvoiceQueue.queueForm.pristine) {
      this.itineraryService.addItineraryQueue(this.queueComponent.itineraryInvoiceQueue.queueForm);
      this.itineraryService.addTeamQueue(this.queueComponent.itineraryInvoiceQueue.queueForm);
      this.itineraryService.addPersonalQueue(this.queueComponent.itineraryInvoiceQueue.queueForm);
    }

    let commandList = [];
    if (!this.corpRemarksComponent.isPassive) {
      commandList = this.invoiceRemarkService.getSSRCommandsForContact(this.corpRemarksComponent.addContactComponent);
    }

    await this.rms.SendCommand(
      this.paymentRemarkService.moveProfile(
        this.paymentsComponent.accountingRemark.accountingRemarks.filter(
          (x) => x.accountingTypeRemark === 'ACPP' || x.accountingTypeRemark === 'ACPR'
        )
      )
    );
    await this.rms.submitToPnr(remarkList, forDeleteRemarks, commandList, passiveSegmentList).then(
      async () => {
        this.isPnrLoaded = false;
        this.workflow = '';
        this.getPnr();
        this.closePopup();
      },
      (error) => {
        console.log(JSON.stringify(error));
        this.workflow = '';
      }
    );
  }

  async cancelPnr() {
    if (!this.cancelComponent.checkValid()) {
      const modalRef = this.modalService.show(MessageComponent, {
        backdrop: 'static'
      });
      modalRef.content.modalRef = modalRef;
      modalRef.content.title = 'Invalid Inputs';
      modalRef.content.message = 'Please make sure all the inputs are valid and put required values!';
      return;
    }

    // this.showLoading('Applying cancellation to PNR...', 'CancelPnr');
    const osiCollection = new Array<RemarkGroup>();
    const cancel = this.cancelComponent.cancelSegmentComponent;
    const getSelected = cancel.submit();

    if (!(cancel.cancelForm.controls.followUpOption.value === 'Void BSP' && cancel.hasUnvoided)) {
      this.showLoading('Applying cancellation to PNR...', 'CancelPnr');
      // if (getSelected.length >= 1) {
      osiCollection.push(this.segmentService.osiCancelRemarks(cancel.cancelForm));
      this.corpRemarkService.BuildRemarks(osiCollection);
      await this.corpRemarkService.cancelOSIRemarks().then(
        async () => {
          this.getPnr();
          await this.addCancelRemarksRemarks(cancel, getSelected);
        },
        (error) => {
          console.log(JSON.stringify(error));
        }
      );
    } else {
      this.isPnrLoaded = false;
      this.getPnr();
      this.workflow = '';
      this.closePopup();
    }
  }

  async addCancelRemarksRemarks(cancel: CancelSegmentComponent, getSelected: any[]) {
    this.segmentService.queueCancel(cancel.cancelForm, this.cfLine);
    const remarkCollection = new Array<RemarkGroup>();
    const remarkList = new Array<RemarkModel>();
    const passiveSegmentList = new Array<PassiveSegmentModel>();
    const deleteSegments = new Array<string>();
    const forDeletion = new Array<string>();
    const commandList = new Array<string>();
    let sendTkt = false;

    getSelected.forEach((element) => {
      deleteSegments.push(element.lineNo);
    });
    await this.rms.deleteSegments(deleteSegments).then(async () => {
      await this.getPnr();
      await this.rms.getMatchcedPlaceholderValues();
    });

    if (cancel.nonBspTicketCreditComponent) {
      const nonBspTicket = this.corpCancelRemarkService.WriteNonBspTicketCredit(cancel.nonBspTicketCreditComponent.nonBspForm);
      if (nonBspTicket) {
        nonBspTicket.remarks.forEach((rem) => remarkList.push(rem));
        nonBspTicket.commands.forEach((c) => commandList.push(c));
      }
    }

    if (cancel.bspRefundComponent) {
      const refundTicket = this.corpCancelRemarkService.WriteTicketRefund(
        cancel.bspRefundComponent.refundForm,
        cancel.bspRefundComponent.refundType
      );
      if (refundTicket) {
        if (refundTicket.SendTicket) {
          sendTkt = true;
        }
        if (refundTicket.remarks) {
          refundTicket.remarks.forEach((rem) => remarkList.push(rem));
        }
        if (refundTicket.commands) {
          refundTicket.commands.forEach((c) => commandList.push(c));
        }
      }
    }

    if (
      cancel.cancelForm.controls.followUpOption.value === 'NONBSPKT' ||
      cancel.cancelForm.controls.followUpOption.value === 'BSPKT' ||
      sendTkt
    ) {
      const canceltktl = this.ticketRemarkService.cancelTicketRemark();
      if (canceltktl) {
        canceltktl.cryptics.forEach((c) => commandList.push(c));

        if (this.pnrService.getTkLineNumber() && canceltktl.cryptics.length > 0) {
          forDeletion.push(this.pnrService.getTkLineNumber().toString());
        }
      }
      remarkCollection.push(this.ticketRemarkService.deleteTicketingLine());
    }

    if (getSelected.length === this.segment.length) {
      remarkCollection.push(this.segmentService.cancelMisSegment());
    }
    remarkCollection.push(this.corpCancelRemarkService.buildVoidRemarks(cancel.cancelForm));
    remarkCollection.push(this.segmentService.buildCancelRemarks(cancel.cancelForm, getSelected));
    remarkCollection.forEach((rem) => {
      rem.remarks.forEach((remModel) => {
        remarkList.push(remModel);
      });
      if (rem.passiveSegments) {
        rem.passiveSegments.forEach((pasModel) => {
          passiveSegmentList.push(pasModel);
        });
      }
      if (rem.deleteRemarkByIds) {
        rem.deleteRemarkByIds.forEach((del) => {
          forDeletion.push(del);
        });
      }
    });

    this.corpCancelRemarkService.writeAquaTouchlessRemark(cancel.cancelForm);
    if (this.cancelComponent.cancelSegmentComponent.showEBDetails) {
      this.corpCancelRemarkService.sendEBRemarks(this.cancelComponent.cancelSegmentComponent.cancelForm);
    }
    this.rms.setReceiveFrom(cancel.cancelForm.value.requestor);

    await this.rms.submitToPnr(remarkList, forDeletion, commandList, passiveSegmentList).then(
      () => {
        this.isPnrLoaded = false;
        this.getPnr();
        this.workflow = '';
        this.closePopup();
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
  }

  back() {
    this.workflow = '';
    this.cleanupRemarkService.revertDelete();
  }

  async sendItineraryAndQueue() {
    this.showLoading('Loading PNR and Data', 'initData');
    await this.getPnrService();
    try {
      await this.rms.getMatchcedPlaceholderValues();
      this.workflow = 'sendQueue';
      this.closePopup();
    } catch (e) {
      console.log(e);
    }
  }

  public async cancelSegment() {
    if (this.isPnrLoaded) {
      await this.getPnrService();
      if (this.checkHasPowerHotel()) {
        this.showMessage(
          'Power Hotel segment(s) must be cancelled in Power Hotel first before launching cancellation script',
          MessageType.Default,
          'Hotel(s) booked via Power Hotel',
          'CancelHotel'
        );
      } else {
        // this.showLoading('Loading PNR and Data', 'initData');
        // await this.rms.getMatchcedPlaceholderValues();
        this.workflow = 'cancel';
        this.segment = this.pnrService.getSegmentList();
        this.setControl();
        // this.closePopup();
      }
    }
  }

  checkHasPowerHotel() {
    const segmentDetails = this.pnrService.getSegmentList();
    for (const seg of segmentDetails) {
      if (seg.segmentType === 'HHL') {
        return true;
      }
    }
    return false;
  }

  setControl() {
    if (this.isPnrLoaded) {
      if (this.pnrService.recordLocator()) {
        this.cancelEnabled = false;
      }
    }
  }

  CheckValidItinModel() {
    this.itinValidModel.isSubmitted = true;
    this.itinValidModel.isItineraryValid = this.itineraryqueueComponent.checkValid();
    return this.itinValidModel.isItineraryValid;
  }

  async SendItineraryAndQueue() {
    // if (!this.itineraryqueueComponent.checkValid()) {
    if (!this.CheckValidItinModel()) {
      const modalRef = this.modalService.show(MessageComponent, {
        backdrop: 'static'
      });
      modalRef.content.modalRef = modalRef;
      modalRef.content.title = 'Invalid Inputs';
      modalRef.content.message = 'Please make sure all the inputs are valid and put required values!';
      return;
    }
    this.showLoading('Sending Itinerary and Queueing...');
    if (!this.itineraryqueueComponent.queueComponent.queueForm.pristine) {
      this.itineraryService.addItineraryQueue(this.itineraryqueueComponent.queueComponent.queueForm);
      this.itineraryService.addTeamQueue(this.itineraryqueueComponent.queueComponent.queueForm);
      this.itineraryService.addPersonalQueue(this.itineraryqueueComponent.queueComponent.queueForm);
    }
    if (!this.itineraryqueueComponent.itineraryComponent.itineraryForm.pristine) {
      this.itineraryService.getItineraryRemarks(this.itineraryqueueComponent.itineraryComponent.itineraryForm);
    }

    await this.rms.submitToPnr().then(
      () => {
        this.isPnrLoaded = false;
        this.workflow = '';
        this.getPnr();
        this.closePopup();
      },
      (error) => {
        console.log(JSON.stringify(error));
        this.workflow = '';
      }
    );
  }

  async addSegmentToPNR() {
    this.showLoading('Adding Segment(s) to PNR...', 'initData');
    const remarkCollection = new Array<RemarkGroup>();
    remarkCollection.push(this.segmentService.deleteSegments(this.passiveSegmentsComponent.segmentRemark.segmentRemarks));
    remarkCollection.push(this.segmentService.GetSegmentRemark(this.passiveSegmentsComponent.segmentRemark.segmentRemarks));
    this.amadeusRemarkService.BuildRemarks(remarkCollection);
    await this.amadeusRemarkService.SubmitRemarks().then(
      async () => {
        this.isPnrLoaded = false;
        await this.getPnrService();
        await this.addSemgentsRirRemarks();
        this.workflow = '';
        this.closePopup();
      },
      (error) => {
        console.log(JSON.stringify(error));
        this.workflow = '';
      }
    );
  }

  async addSemgentsRirRemarks() {
    const remarkCollection = new Array<RemarkGroup>();
    const remarkList = new Array<RemarkModel>();
    remarkCollection.push(this.segmentService.addSegmentRir({ segRemark: this.passiveSegmentsComponent.segmentRemark, isCorp: true }));
    remarkCollection.forEach((rem) => {
      rem.remarks.forEach((remModel) => {
        remarkList.push(remModel);
      });
    });

    this.rms.submitToPnr(remarkList).then(
      () => {
        this.isPnrLoaded = false;
        this.getPnr();
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
  }
  async sendInvoice() {
    this.showLoading('Loading PNR and Data', 'initData');
    await this.getPnrService();
    try {
      await this.rms.getMatchcedPlaceholderValues();
      this.workflow = 'sendInvoice';
      this.closePopup();
    } catch (e) {
      console.log(e);
    }
  }
  async ReSendInvoice() {
    if (!this.sendInvoiceItineraryComponent.checkValid()) {
      const modalRef = this.modalService.show(MessageComponent, {
        backdrop: 'static'
      });
      modalRef.content.modalRef = modalRef;
      modalRef.content.title = 'Invalid Inputs';
      modalRef.content.message = 'Please make sure all the inputs are valid and put required values!';
      return;
    }
    this.showLoading('Sending Invoice...');
    const resendCompData = this.sendInvoiceItineraryComponent.resendInvoiceComponent;
    this.invoiceRemarkService.addEmailRemarks(resendCompData.invoiceFormGroup);
    const deletedInvoiceLines = this.invoiceRemarkService.getDeletedInvoiceLines(
      resendCompData.selectedElementsUI,
      resendCompData.invoiceList
    );
    this.invoiceRemarkService.addETicketRemarks(resendCompData.selectedElementsUI, resendCompData.eTicketsList);
    this.invoiceRemarkService.addFeeLinesRemarks(resendCompData.selectedElementsUI, resendCompData.feeRemarks);
    this.invoiceRemarkService.addNonBspRemarks(resendCompData.selectedElementsUI, resendCompData.nonBspRemarks);
    await this.rms.submitToPnr(null, deletedInvoiceLines).then(
      () => {
        this.isPnrLoaded = false;
        this.workflow = '';
        this.getPnr();
        this.closePopup();
      },
      (error) => {
        console.log(JSON.stringify(error));
        this.workflow = '';
      }
    );
  }
}
