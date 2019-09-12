import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

import { LoadingComponent } from '../shared/loading/loading.component';
import { MessageComponent } from '../shared/message/message.component';
import { PaymentsComponent } from './payments/payments.component';
import { ReportingComponent } from '../corporate/reporting/reporting.component';
import { TicketingComponent } from './ticketing/ticketing.component';
import { PnrService } from '../service/pnr.service';
import { DDBService } from '../service/ddb.service';
import { CorporateRemarksService } from '../service/corporate/corporate-remarks.service';
import { RemarksManagerService } from '../service/corporate/remarks-manager.service';
import { PaymentRemarkService } from '../service/corporate/payment-remark.service';
import { ReportingRemarkService } from '../service/corporate/reporting-remark.service';
import { TicketRemarkService } from '../service/corporate/ticket-remark.service';
import { RemarkGroup } from '../models/pnr/remark.group.model';
import { ValidateModel } from '../models/validate-model';
import { MessageType } from '../shared/message/MessageType';

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

  @ViewChild(PaymentsComponent) paymentsComponent: PaymentsComponent;
  @ViewChild(ReportingComponent) reportingComponent: ReportingComponent;
  @ViewChild(TicketingComponent) ticketingComponent: TicketingComponent;
  @Input() overrideValue: any;

  constructor(
    private pnrService: PnrService,
    private rms: RemarksManagerService,
    // private ddbService: DDBService, // TEMP: Comment-out due to errors not needed on US11134
    private modalService: BsModalService,
    private paymentRemarkService: PaymentRemarkService,
    private corpRemarkService: CorporateRemarksService,
    private ddbService: DDBService,
    private reportingRemarkService: ReportingRemarkService,
    private ticketRemarkService: TicketRemarkService
  ) {
    this.initData();
  }

  async ngOnInit(): Promise<void> {
    if (this.modalRef) {
      this.modalRef.hide();
    }

    // this.rms.TestSendToPnr(); // test
    // if (this.pnrService.errorMessage.indexOf('Error') === 0) {
    //   this.errorPnrMsg = 'Unable to load PNR or no PNR is loaded in Amadeus. \r\n' + this.pnrService.errorMessage;
    // } else if (this.pnrService.cfLine == null || this.pnrService.cfLine === undefined) {
    //   this.errorPnrMsg = 'PNR doesnt contain CF Remark, Please make sure CF remark is existing in PNR.';
    //   this.isPnrLoaded = true;
    // }
  }

  async getPnr() {
    this.errorPnrMsg = '';
    await this.getPnrService();
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
    const skip = this.modalRef && this.modalRef.content.callerName === caller;
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
      // this.showLoading('Matching Remarks', 'initData');
      this.rms.getMatchcedPlaceholderValues().catch((x) => {
        this.showMessage('Error on Matching Data in the PNR: ' + x.message, MessageType.Error, 'Not Found', 'Loading');
        this.closePopup();
        this.isPnrLoaded = false;
        return;
      });
      // this.showLoading('Servicing Options', 'initData');
      await this.ddbService.getAllServicingOptions(this.pnrService.clientSubUnitGuid);
      // this.showLoading('ReasonCodes', 'initData');
      await this.ddbService.getReasonCodes(this.pnrService.clientSubUnitGuid);
      await this.ddbService.getAirPolicyMissedSavingThreshold(this.pnrService.clientSubUnitGuid);
      await this.ddbService.getTravelPortInformation(this.pnrService.pnrObj.airSegments);
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
    accRemarks.push(this.ticketRemarkService.submitTicketRemark(this.ticketingComponent.getTicketingDetails()));

    this.corpRemarkService.BuildRemarks(accRemarks);
    await this.corpRemarkService.SubmitRemarks().then(async () => {
      await this.getPnrService();
    });

    this.paymentRemarkService.writeAccountingReamrks(this.paymentsComponent.accountingRemark);
    this.reportingRemarkService.WriteEscOFCRemark(this.overrideValue);
    if (this.reportingComponent.reportingBSPComponent !== undefined) {
      this.reportingRemarkService.WriteBspRemarks(this.reportingComponent.reportingBSPComponent);
    }

    this.reportingRemarkService.WriteNonBspRemarks(this.reportingComponent.reportingNonbspComponent);
    await this.rms.submitToPnr().then(
      () => {
        this.isPnrLoaded = false;
        this.workflow = '';
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
