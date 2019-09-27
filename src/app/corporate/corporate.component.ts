import { Component, OnInit, ViewChild, Input } from '@angular/core';
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
import { InvoiceRemarkService } from '../service/corporate/invoice-remark.service';
import { MatrixReportingComponent } from '../corporate/reporting/matrix-reporting/matrix-reporting.component';
import { CorpRemarksComponent } from './corp-remarks/corp-remarks.component';
import { CorpRemarksService } from '../service/corporate/corp-remarks.service';
import { QueuePlaceModel } from '../models/pnr/queue-place.model';
import { QueueRemarkService } from '../service/queue-remark.service';

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
  validModel = new ValidateModel();
  dataError = { matching: false, supplier: false, reasonCode: false, servicingOption: false, pnr: false, hasError: false };
  migrationOBTDates: Array<string>;

  @ViewChild(PaymentsComponent) paymentsComponent: PaymentsComponent;
  @ViewChild(ReportingComponent) reportingComponent: ReportingComponent;
  @ViewChild(TicketingComponent) ticketingComponent: TicketingComponent;
  @ViewChild(FeesComponent) feesComponent: FeesComponent;
  @ViewChild(MatrixReportingComponent) matrixReportingComponent: MatrixReportingComponent;
  @ViewChild(CorpRemarksComponent) corpRemarksComponent: CorpRemarksComponent;

  @Input() overrideValue: any;

  constructor(
    private pnrService: PnrService,
    private rms: RemarksManagerService,
    // private ddbService: DDBService, // TEMP: Comment-out due to errors not needed on US11134
    private modalService: BsModalService,
    private paymentRemarkService: PaymentRemarkService,
    private corpRemarkService: AmadeusRemarkService,
    private corpRemarksService: CorpRemarksService,
    private ddbService: DDBService,
    private reportingRemarkService: ReportingRemarkService,
    private invoiceRemarkService: InvoiceRemarkService,
    private ticketRemarkService: TicketRemarkService,
    private feesRemarkService: FeesRemarkService,
    private queueService: QueueRemarkService
  ) {
    this.initData();
  }

  async ngOnInit(): Promise<void> {
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }

  async getPnr(queueCollection?: Array<QueuePlaceModel>) {
    this.errorPnrMsg = '';
    await this.getPnrService();
    if (queueCollection) {
      this.queueService.queuePNR(queueCollection);
    }
  }

  async getPnrService() {
    this.pnrService.isPNRLoaded = false;
    await this.pnrService.getPNR();
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
    // this.validModel.isRemarkValid = this.remarkComponent.checkValid();
    this.validModel.isTicketingValid = this.ticketingComponent.checkValid();
    this.validModel.isFeesValid = this.feesComponent.checkValid();
    return this.validModel.isCorporateAllValid();
  }

  public async wrapPnr() {
    await this.loadPnrData();
    this.workflow = 'wrap';
  }

  async loadPnrData() {
    this.showLoading('Loading PNR and Data', 'initData');
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
        await this.ddbService.getAllServicingOptions(this.pnrService.clientSubUnitGuid);
        // this.showLoading('ReasonCodes', 'initData');
        await this.ddbService.getReasonCodes(this.pnrService.clientSubUnitGuid);
        await this.ddbService.getApproverGroup(this.pnrService.clientSubUnitGuid, this.pnrService.getCFLine().cfa);
        await this.ddbService.getAirPolicyMissedSavingThreshold(this.pnrService.clientSubUnitGuid);
        await this.ddbService.getTravelPortInformation(this.pnrService.pnrObj.airSegments);
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
    const accRemarks = new Array<RemarkGroup>();
    accRemarks.push(this.paymentRemarkService.addSegmentForPassPurchase(this.paymentsComponent.accountingRemark.accountingRemarks));
    accRemarks.push(
      this.ticketRemarkService.submitTicketRemark(
        this.ticketingComponent.ticketlineComponent.getTicketingDetails(),
        this.ticketingComponent.ticketlineComponent.approvalForm
      )
    );

    this.corpRemarkService.BuildRemarks(accRemarks);
    await this.corpRemarkService.SubmitRemarks().then(async () => {
      await this.getPnrService();
    });

    this.paymentRemarkService.writeAccountingReamrks(this.paymentsComponent.accountingRemark);

    this.feesRemarkService.writeFeeRemarks(this.feesComponent.supplemeentalFees.ticketedForm);

    this.feesRemarkService.writeMigrationOBTFeeRemarks(this.migrationOBTDates);

    this.corpRemarksService.writeSeatRemarks(this.corpRemarksComponent.seatsComponent.seats);

    this.invoiceRemarkService.WriteInvoiceRemark(this.reportingComponent.matrixReportingComponent);
    this.reportingRemarkService.WriteEscOFCRemark(this.overrideValue);
    if (this.reportingComponent.reportingBSPComponent !== undefined) {
      this.reportingRemarkService.WriteBspRemarks(this.reportingComponent.reportingBSPComponent);
    }

    this.reportingRemarkService.WriteNonBspRemarks(this.reportingComponent.reportingNonbspComponent);

    this.reportingRemarkService.WriteU63(this.reportingComponent.waiversComponent);

    this.invoiceRemarkService.sendU70Remarks();

    this.ticketRemarkService.WriteAquaTicketing(this.ticketingComponent.aquaTicketingComponent);
    // below additional process not going through remarks manager
    const additionalRemarks = this.ticketRemarkService.getApprovalRemarks(this.ticketingComponent.ticketlineComponent.approvalForm);
    const forDeleteRemarks = this.ticketRemarkService.getApprovalRemarksForDelete(this.ticketingComponent.ticketlineComponent.approvalForm);

    let queueCollection = Array<QueuePlaceModel>();
    queueCollection = this.ticketRemarkService.getApprovalQueue(this.ticketingComponent.ticketlineComponent.approvalForm);
    await this.rms.submitToPnr(additionalRemarks, forDeleteRemarks).then(
      () => {
        this.isPnrLoaded = false;
        this.workflow = '';
        this.getPnr(queueCollection);
        this.closePopup();
      },
      (error) => {
        console.log(JSON.stringify(error));
        this.workflow = '';
      }
    );
  }

  back() {
    this.workflow = '';
  }
}
