import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
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
import { IrdRateRequestComponent } from './ird-rate-request/ird-rate-request.component';
// import { PricingComponent } from './pricing/pricing.component';
import { PricingService } from '../service/corporate/pricing.service';
import { RulesEngineService } from '../service/business-rules/rules-engine.service';
import { CommonRemarkService } from '../service/common-remark.service';
import { AquaFeesComponent } from './fees/aqua-fees/aqua-fees.component';
import { common } from 'src/environments/common';
import { TicketModel } from '../models/pnr/ticket.model';
import { formatDate } from '@angular/common';

declare var smartScriptUtils: any;
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
  dataErrorMessages = new Array<string>();
  migrationOBTSetting = '';
  segment = [];
  cfLine: CfRemarkModel;
  showIrdRequestButton = false;
  loading = false;
  showAquaFeeButton = false;
  showAmadeusQueueButton = false;
  withPasspurchaseAccess = false;
  version = common.LeisureVersionNumber;
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
  @ViewChild(IrdRateRequestComponent) irdRateRequestComponent: IrdRateRequestComponent;
  // @ViewChild(PricingComponent) pricingComponent: PricingComponent;
  @ViewChild(AquaFeesComponent) aquaFeesComponent: AquaFeesComponent;

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
    private corpCancelRemarkService: CorpCancelRemarkService,
    private pricingService: PricingService,
    private rulesEngine: RulesEngineService,
    private commonRemarkService: CommonRemarkService
  ) {
    this.loading = true;
    this.initData();
  }

  async ngOnInit(): Promise<void> {
    this.modalSubscribeOnClose();
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.shiftKey && event.altKey && event.key === 'C') {
      this.showClearCache();
    }
  }

  modalSubscribeOnClose() {
    this.modalService.onHide.subscribe(async () => {
      if (this.modalRef !== undefined && this.modalRef.content !== undefined) {
        if (this.modalRef.content.callerName === 'ClearCache' && this.modalRef.content.response === 'YES') {
          this.ddbService.clearCache();
        }
      }
    });
  }

  showClearCache() {
    this.showMessage(
      'Are you sure you want to Clear Cache DDB API? This will delete all the API Cache used by the script.',
      MessageType.YesNo,
      'Clear Cache',
      'ClearCache'
    );
  }

  showRule() {
    // get rule
    const isMarriottPopUP = this.rulesEngine.checkRuleResultExist('UI_Popup_Title', 'MARRIOTT POLICY VIOLATION');
    if (isMarriottPopUP) {
      this.showMessage(
        this.rulesEngine.getSpecificRuleResultItemValue('UI_Popup_Message').replace(/{br}/g, '<br>'),
        MessageType.Default,
        this.rulesEngine.getSpecificRuleResultItemValue('UI_Popup_Title'),
        'Loading'
      );
      return true;
    }
    return false;
  }

  hasAirportCode(airportCode: string) {
    let hasAC = false;
    this.pnrService.segments.forEach((segment) => {
      if (segment.airportCode === airportCode) {
        hasAC = true;
      }
    });
    return hasAC;
  }

  async getPnr() {
    this.errorPnrMsg = '';
    await this.getPnrService();
    this.amadeusQueueService.queuePNR();
    this.amadeusQueueService.newQueueCollection();
  }

  async getPnrService() {
    this.loading = true;
    this.pnrService.isPNRLoaded = false;
    await this.pnrService.getPNR();
    this.cfLine = this.pnrService.getCFLine();
    this.isPnrLoaded = this.pnrService.isPNRLoaded;

    const tst = smartScriptUtils.normalize(this.pnrService.tstObj);
    if (this.pnrService.recordLocator() && tst.length > 0) {
      this.showIrdRequestButton = true;
    }
    await this.checkValidForAquaFee();
    await this.hasAccessInPassPurchase();
    this.loading = false;
  }

  async initData() {
    this.ddbService.getAllMatrixSupplierCodes();
    await this.getPnrService();
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
    if (this.feesComponent) {
      this.validModel.isFeesValid = this.feesComponent.checkValid();
    } else {
      this.validModel.isFeesValid = true;
    }
    this.validModel.isQueueValid = this.queueComponent.checkValid();
    // this.validModel.isPricingValid = this.pricingComponent.checkValid();
    return this.validModel.isCorporateAllValid();
  }

  public async wrapPnr() {
    await this.loadPnrData();
    if (this.showRule()) {
      this.workflow = '';
    } else {
      this.workflow = 'wrap';
    }
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
    this.resetDataLoadError();
    if (!this.pnrService.getClientSubUnit()) {
      this.closePopup();
      this.showMessage('SubUnitGuid is not found in the PNR', MessageType.Error, 'Not Found', 'Loading');
      this.workflow = 'error';
    } else {
      try {
        // this.showLoading('Matching Remarks', 'initData');
        await this.rms.getMatchcedPlaceholderValues();
        // this.showLoading('Servicing Options', 'initData');
        await this.ddbService.getTravelPortInformation(
          this.pnrService.pnrObj.airSegments,
          this.pnrService.getSegmentList().filter((x) => x.segmentType === 'MIS')
        );
        await this.ddbService.getAllServicingOptions(this.pnrService.clientSubUnitGuid);
        // this.showLoading('ReasonCodes', 'initData');
        await this.ddbService.getApproverGroup(this.pnrService.clientSubUnitGuid, this.pnrService.getCFLine().cfa);
        await this.ddbService.getAirPolicyMissedSavingThreshold(this.pnrService.clientSubUnitGuid);
        await this.ddbService.getMigrationOBTFeeCFA().then((cfa) => {
          this.migrationOBTSetting = cfa;
        });
        await this.rulesEngine.initializeRulesEngine();
      } catch (e) {
        console.log(e);
      }
    }
    this.closePopup();
    this.checkHasDataLoadError();
  }

  checkHasDataLoadError() {
    this.dataErrorMessages.length = 0;
    if (!(this.rms.outputItems && this.rms.outputItems.length > 0)) {
      this.dataErrorMessages.push('Unable to Match PNR from PNR Layout');
    }
    if (!(this.ddbService.supplierCodes && this.ddbService.supplierCodes.length > 0)) {
      this.dataErrorMessages.push('Unable to get Supplier Codes from DDB');
    }
    // if (!(this.ddbService.reasonCodeList && this.ddbService.reasonCodeList.length > 0)) {
    //   this.dataErrorMessages.push('Unable to Reason Codes');
    // }
    if (!(this.ddbService.servicingOption && this.ddbService.servicingOption.length > 0)) {
      this.dataErrorMessages.push('Unable to Get Servicing Options');
    }

    if (!this.isPnrLoaded) {
      this.dataErrorMessages.push('Unable to Load PNR');
    }
  }

  resetDataLoadError() {
    this.dataErrorMessages.length = 0;
  }

  public async SubmitToPNR() {
    const remarkCollection = new Array<RemarkGroup>();
    if (!this.checkValid()) {
      this.shoInvalidInputMessage();
      return;
    }
    this.showLoading('Updating PNR...', 'SubmitToPnr');
    const passiveSegmentList = new Array<PassiveSegmentModel>();
    const accRemarks = new Array<RemarkGroup>();
    let remarkList = new Array<RemarkModel>();
    accRemarks.push(this.pricingService.getFMDetails(this.ticketingComponent.airfareCommissionComponent));
    if (this.ticketingComponent.exchangeEndorsementsComponent) {
      accRemarks.push(this.pricingService.getExchangeEndorsement(this.ticketingComponent.exchangeEndorsementsComponent));
    }

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

    this.paymentRemarkService.writeAccountingRemarks(this.paymentsComponent.accountingRemark);
    if (this.paymentsComponent.nonAcceptance !== undefined && this.paymentsComponent.nonAcceptance.unticketedSegments !== undefined) {
      this.paymentRemarkService.writeCorporateReceiptRemarks(this.paymentsComponent.nonAcceptance);
    }
    const isMigration = this.feesRemarkService.writeMigrationOBTFeeRemarks(this.migrationOBTSetting);
    if (this.feesComponent && !isMigration) {
      this.feesRemarkService.writeFeeRemarks(this.feesComponent.supplemeentalFees.ticketedForm);
    }

    this.corpRemarksService.writeSeatRemarks(this.corpRemarksComponent.seatsComponent.seats);

    this.invoiceRemarkService.WriteInvoiceRemark(this.reportingComponent.matrixReportingComponent);
    this.reportingRemarkService.WriteEscOFCRemark(this.councelorDetail.getIdentity());
    if (this.reportingComponent.reportingBSPComponent !== undefined) {
      this.reportingRemarkService.WriteBspRemarks(
        this.reportingComponent.reportingBSPComponent,
        this.reportingComponent.reportingRemarksComponent
      );
    }
    if (this.reportingComponent.carSavingsCodeComponent !== undefined) {
      this.reportingRemarkService.writeCarSavingsRemarks(
        this.reportingComponent.carSavingsCodeComponent,
        this.reportingComponent.carSavingsCodeComponent.reAddRemarks
      );
    }

    if (this.reportingComponent.hotelSegmentsComponent !== undefined) {
      this.reportingRemarkService.writeHotelSavingsRemarks(
        this.reportingComponent.hotelSegmentsComponent,
        this.reportingComponent.hotelSegmentsComponent.reAddRemarks
      );
    }

    if (this.reportingComponent.noBookedHotelComponent !== undefined) {
      this.reportingRemarkService.writeNoHotelBooked(this.reportingComponent.noBookedHotelComponent);
    }

    if (this.councelorDetail.getIdentity() === 'OFC') {
      this.ofcRemarkService.WriteOfcDocumentation(this.queueComponent.ofcDocumentation.ofcDocForm);
    }
    this.reportingRemarkService.WriteNonBspRemarks(
      this.reportingComponent.reportingNonbspComponent,
      this.reportingComponent.reportingRemarksComponent
    );
    this.corpRemarksService.writeIrdRemarks(this.corpRemarksComponent.irdRemarks);
    this.reportingRemarkService.WriteU63(this.reportingComponent.waiversComponent);
    this.reportingRemarkService.WriteDestinationCode(this.reportingComponent.reportingRemarksComponent);

    this.reportingRemarkService.writeEBRemarks(this.reportingComponent.reportingRemarksComponent.obtComponent);

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
    if (!this.queueComponent.itineraryComponent.itineraryForm.pristine) {
      this.itineraryService.getItineraryRemarks(this.queueComponent.itineraryComponent.itineraryForm);
    }
    this.itineraryService.addAquaQueue();
    if (!this.queueComponent.itineraryComponent.itineraryForm.touched) {
      this.itineraryService.addAquaOverrideRmk();
    }
    let commandList = [];
    if (!this.corpRemarksComponent.isPassive) {
      commandList = this.invoiceRemarkService.getSSRCommandsForContact(this.corpRemarksComponent.addContactComponent);
    }

    remarkCollection.push(this.rulesEngine.getRuleWriteRemarks());
    remarkCollection.push(this.rulesEngine.getRuleDeleteAPERemarks());
    remarkCollection.push(this.rulesEngine.getRuleDeleteRemarks());

    remarkCollection.push(
      await this.segmentService.writeOptionalFareRule(this.corpRemarksComponent.fareRuleSegmentComponent.fareRuleRemarks)
    );
    remarkCollection.push(
      this.commonRemarkService.buildAssociatedRemarks(this.corpRemarksComponent.associatedRemarksComponent.associatedRemarksForm)
    );

    this.getStaticModelRemarks(remarkCollection, remarkList, passiveSegmentList, forDeleteRemarks, commandList);

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

  public async addPassPurchaseToPNR() {
    this.showLoading('Updating PNR...', 'SubmitToPnr');
    const passiveSegmentList = new Array<PassiveSegmentModel>();
    const accRemarks = new Array<RemarkGroup>();
    const remarkCollection = new Array<RemarkGroup>();
    const remarkList = new Array<RemarkModel>();
    const commandList = [];
    const forDeleteRemarks = [];

    accRemarks.push(this.paymentRemarkService.addSegmentForPassPurchase(this.paymentsComponent.accountingRemark.accountingRemarks));
    this.corpRemarkService.BuildRemarks(accRemarks);
    await this.corpRemarkService.SubmitRemarks().then(async () => {
      await this.getPnrService();
      await this.rms.getMatchcedPlaceholderValues();
    });

    this.paymentRemarkService.deleteRemarksStandAlone();
    remarkCollection.push(this.paymentRemarkService.writeStandAlonePassPurchase(this.paymentsComponent.accountingRemark));
    this.getStaticModelRemarks(remarkCollection, remarkList, passiveSegmentList, forDeleteRemarks, commandList);

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

  async sendIrdRateParameters() {
    if (!this.irdRateRequestComponent.checkValid()) {
      this.shoInvalidInputMessage();
      return;
    }
    this.showLoading('Updating PNR...', 'SubmitToPnr');
    const remarkList = this.invoiceRemarkService.buildIrdCommentsRemarks(
      this.irdRateRequestComponent.irdInvoiceRequestComponent.commentsForm
    );
    this.invoiceRemarkService.writeIrdRateRequestRemarks(this.irdRateRequestComponent.irdInvoiceRequestComponent.irdRequestForm);
    this.invoiceRemarkService.addTravelTicketingQueue(this.irdRateRequestComponent.irdInvoiceRequestComponent.irdRequestForm);
    await this.rms.submitToPnr(remarkList, [], [], []).then(
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

  private getStaticModelRemarks(
    remarkCollection: RemarkGroup[],
    remarkList: RemarkModel[],
    passiveSegmentList: PassiveSegmentModel[],
    forDeleteRemarks: string[],
    commandList: string[]
  ) {
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
          forDeleteRemarks.push(del);
        });
      }
      if (rem.cryptics) {
        rem.cryptics.forEach((del) => {
          commandList.push(del);
        });
      }
    });
  }

  shoInvalidInputMessage() {
    const modalRef = this.modalService.show(MessageComponent, {
      backdrop: 'static'
    });
    modalRef.content.modalRef = modalRef;
    modalRef.content.title = 'Invalid Inputs';
    modalRef.content.message = 'Please make sure all the inputs are valid and put required values!';
  }

  async cancelPnr() {
    if (!this.cancelComponent.checkValid()) {
      this.shoInvalidInputMessage();
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
      cancel.cancelForm.controls.followUpOption.value === 'HOTELCARLIMO' ||
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
    this.getStaticModelRemarks(remarkCollection, remarkList, passiveSegmentList, forDeletion, commandList);
    this.corpCancelRemarkService.writeAquaTouchlessRemark(cancel.cancelForm);
    // if (this.cancelComponent.cancelSegmentComponent.showEBDetails) {
    //   this.corpCancelRemarkService.sendEBRemarks(this.cancelComponent.cancelSegmentComponent.cancelForm);
    // }
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
    this.resetDataLoadError();
    this.cleanupRemarkService.revertDelete();
  }

  async sendItineraryAndQueue() {
    this.showLoading('Loading PNR and Data', 'initData');
    await this.getPnrService();
    try {
      await this.rms.getMatchcedPlaceholderValues();
      await this.rulesEngine.initializeRulesEngine();
      this.workflow = 'sendQueue';
      this.closePopup();
    } catch (e) {
      console.log(e);
    }
  }

  async sendAquaFees() {
    if (!this.aquaFeesComponent.checkValid()) {
      this.shoInvalidInputMessage();
      return;
    }

    if (this.isPnrLoaded) {
      this.showLoading('Sending Aqua Fees...');
      if (this.aquaFeesComponent.obtComponent) {
        this.reportingRemarkService.writeEBRemarks(this.aquaFeesComponent.obtComponent);
      }
      const remarkCollection = new Array<RemarkGroup>();
      const ticketRemark = new TicketModel();
      ticketRemark.oid = this.pnrService.extractOidFromBookRemark();
      ticketRemark.tktDate = formatDate(Date.now(), 'ddMMM', 'en').toString();
      ticketRemark.tkLine = 'FEE';
      this.ticketRemarkService.deleteTicketingLine();
      const commandList = await this.feesRemarkService.writeAquaFees(this.aquaFeesComponent);
      remarkCollection.push(this.ticketRemarkService.submitTicketRemark(ticketRemark));
      let forDelete = new Array<string>();
      forDelete = remarkCollection[0].deleteRemarkByIds;

      if (commandList) {
        this.getStaticModelRemarks(remarkCollection, null, new Array<PassiveSegmentModel>(), new Array<string>(), commandList);
      }
      await this.rms.submitToPnr(null, forDelete, commandList).then(
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

  public async aquaFees() {
    this.showLoading('Loading PNR and Data', 'initData');
    await this.getPnrService();
    await this.ddbService.getTravelPortInformation(
      this.pnrService.pnrObj.airSegments,
      this.pnrService.getSegmentList().filter((x) => x.segmentType === 'MIS')
    );
    try {
      await this.rms.getMatchcedPlaceholderValues();
      this.workflow = 'aquaFees';
      this.closePopup();
    } catch (e) {
      console.log(e);
    }
  }

  public amadeusQueues() {
    this.showLoading('Queueing Data', 'initData');
    try {
      this.queueService.oidQueuePlacement().then(() => {
        this.closePopup();
      });
    } catch (e) {
      console.log(e);
    }
  }

  async irdRateRequest() {
    this.showLoading('Loading PNR and Data', 'initData');
    await this.getPnrService();

    try {
      await this.rms.getMatchcedPlaceholderValues();
      this.workflow = 'irdRateRequest';
      this.closePopup();
    } catch (e) {
      console.log(e);
    }
  }

  async corporatePassPurchase() {
    this.showLoading('Loading PNR and Data', 'initData');
    await this.getPnrService();

    try {
      await this.rms.getMatchcedPlaceholderValues();
      this.workflow = 'corporatePass';
      this.closePopup();
    } catch (e) {
      console.log(e);
    }
  }

  checkHasPowerHotel() {
    const segmentDetails = this.pnrService.getSegmentList();
    for (const seg of segmentDetails) {
      if (seg.segmentType === 'HHL' || (seg.segmentType === 'HTL' && seg.freetext.indexOf('CF:*H01*') > -1)) {
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
      this.shoInvalidInputMessage();
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

    this.itineraryService.addAquaQueue();
    if (!this.itineraryqueueComponent.itineraryComponent.itineraryForm.touched) {
      this.itineraryService.addAquaOverrideRmk();
    }
    const accRemarks = new Array<RemarkGroup>();
    if (this.itineraryqueueComponent.ticketingLineComponent.ticketForm.get('verifyAck').value) {
      accRemarks.push(
        this.ticketRemarkService.submitTicketRemark(
          this.itineraryqueueComponent.ticketingLineComponent.getTicketingDetails(),
          this.itineraryqueueComponent.ticketingLineComponent.approvalForm
        )
      );
    }
    this.corpRemarkService.BuildRemarks(accRemarks);
    await this.corpRemarkService.SubmitRemarks().then(async () => {
      await this.getPnrService();
      await this.rms.getMatchcedPlaceholderValues();
    });

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
      await this.rulesEngine.initializeRulesEngine();
      this.workflow = 'sendInvoice';
      this.closePopup();
    } catch (e) {
      console.log(e);
    }
  }
  async ReSendInvoice() {
    if (!this.sendInvoiceItineraryComponent.checkValid()) {
      this.shoInvalidInputMessage();
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

  async checkValidForAquaFee() {
    const response = await this.ddbService.getConfigurationParameter('CA_Script_Aqua_Fee_Excluded_CFA');
    this.showAquaFeeButton = false;
    if (response.ConfigurationParameters && response.ConfigurationParameters.length > 0) {
      const listCfa = response.ConfigurationParameters[0].ConfigurationParameterValue.split(',');
      this.showAquaFeeButton = listCfa.indexOf(this.pnrService.getCFLine().cfa) === -1;
    }
  }

  async hasAccessInPassPurchase() {
    await this.ddbService.getConfigurationParameter('UsersToStandAlonePassPurchase').then((response) => {
      const listUsers = response.ConfigurationParameters[0].ConfigurationParameterValue.split(',');
      this.withPasspurchaseAccess = listUsers.indexOf(this.pnrService.uid) > -1;
    });
  }

  async writeStandaloneRemarks() {
    this.showLoading('Loading PNR and Data', 'initData');
    await this.getPnrService();
    try {
      await this.rms.getMatchcedPlaceholderValues();
      await this.rulesEngine.initializeRulesEngine();
      this.workflow = 'WriteRemarks';
      this.closePopup();
    } catch (e) {
      console.log(e);
    }
  }

  async addRemarks() {
    const remarkCollection = new Array<RemarkGroup>();
    this.showLoading('Adding Remarks...', 'SubmitToPnr');
    let remarkList = new Array<RemarkModel>();
    const commandList = [];
    const passiveSegmentList = new Array<PassiveSegmentModel>();
    const forDeletion = new Array<string>();
    this.corpRemarksService.writeSeatRemarks(this.corpRemarksComponent.seatsComponent.seats);
    remarkList = remarkList.concat(this.corpRemarksService.buildDocumentRemarks(this.corpRemarksComponent.documentComponent.documentForm));
    remarkCollection.push(
      this.commonRemarkService.buildAssociatedRemarks(this.corpRemarksComponent.associatedRemarksComponent.associatedRemarksForm)
    );
    this.getStaticModelRemarks(remarkCollection, remarkList, passiveSegmentList, forDeletion, commandList);
    await this.rms.submitToPnr(remarkList, forDeletion, commandList, passiveSegmentList).then(
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
}
