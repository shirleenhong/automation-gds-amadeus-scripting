import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  AfterViewChecked
} from '@angular/core';
import { PnrService } from '../service/pnr.service';
import { RemarkService } from '../service/remark.service';
import { LeisureViewModel } from '../models/leisure-view.model';
import { PaymentRemarkService } from '../service/payment-remark.service';
import { RemarkGroup } from '../models/pnr/remark.group.model';
import { ReportingRemarkService } from '../service/reporting-remark.service';
import { PaymentComponent } from '../payments/payment.component';
import { SegmentService } from '../service/segment.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS
} from '@angular/forms';
import { ReportingComponent } from '../reporting/reporting.component';
import { RemarkComponent } from '../remarks/remark.component';
import { DDBService } from '../service/ddb.service';
import { CfRemarkModel } from '../models/pnr/cf-remark.model';
import { CancelSegmentComponent } from '../cancel-segment/cancel-segment.component';
import { PassiveSegmentsComponent } from '../passive-segments/passive-segments.component';
import { PackageRemarkService } from '../service/package-remark.service';
import { ValidateModel } from '../models/validate-model';
import { BsModalService } from 'ngx-bootstrap';
import { MessageComponent } from '../shared/message/message.component';

import { invalid } from '@angular/compiler/src/render3/view/util';
// import { VisaPassportComponent } from '../remarks/visa-passport/visa-passport.component';
// >>>>>>> Stashed changes
import { VisaPassportService } from '../service/visa-passport.service';
import { InvoiceService } from '../service/invoice-remark.service';
import { MatrixInvoiceComponent } from '../invoice/matrix-invoice.component';
import { PackageRemarkHelper } from '../helper/packageRemark-helper';

@Component({
  selector: 'app-leisure',
  templateUrl: './leisure.component.html',
  styleUrls: ['./leisure.component.scss']
})
export class LeisureComponent
  implements OnInit, AfterViewInit, AfterViewChecked {
  isPnrLoaded: boolean;
  message: string;
  leisure: LeisureViewModel;
  cfLine: CfRemarkModel;
  workflow = '';
  cancelEnabled = true;
  validModel = new ValidateModel();
  invoiceEnabled = false;

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
    private invoiceService: InvoiceService
  ) {
    this.getPnr();
    this.initData();
  }

  ngAfterViewChecked() {
    // Subscribe to event from child Component
  }

  ngAfterViewInit(): void {}

  async getPnr() {
    this.errorPnrMsg = '';
    await this.getPnrService();
    this.cfLine = this.pnrService.getCFLine();
    if (this.pnrService.errorMessage.indexOf('Error') === 0) {
      this.errorPnrMsg =
        'Unable to load PNR or no PNR is loaded in Amadeus. \r\n' +
        this.pnrService.errorMessage;
    } else if (this.cfLine == null || this.cfLine === undefined) {
      this.errorPnrMsg =
        'PNR doesnt contain CF Remark, Please make sure CF remark is existing in PNR.';
      this.isPnrLoaded = true;
    }
    this.displayInvoice();
  }

  initData() {
    this.ddbService.loadSupplierCodesFromPowerBase();
  }

  async getPnrService() {
    this.pnrService.isPNRLoaded = false;
    await this.pnrService.getPNR();
    this.isPnrLoaded = this.pnrService.isPNRLoaded;
  }

  ngOnInit() {
    this.leisure = new LeisureViewModel();
  }

  checkValid() {
    this.validModel.isSubmitted = true;
    this.validModel.isPaymentValid = this.paymentComponent.checkValid();
    this.validModel.isReportingValid = this.reportingComponent.checkValid();
    this.validModel.isRemarkValid = this.remarkComponent.checkValid();
    return this.validModel.isAllValid();
  }

  public SubmitToPNR() {
    if (!this.checkValid()) {
      const modalRef = this.modalService.show(MessageComponent, {
        backdrop: 'static'
      });
      modalRef.content.modalRef = modalRef;
      modalRef.content.title = 'Invalid Inputs';
      modalRef.content.message =
        'Please make sure all the inputs are valid and put required values!';
      return;
    }

    const remarkCollection = new Array<RemarkGroup>();
    remarkCollection.push(
      this.paymentRemarkService.GetMatrixRemarks(
        this.paymentComponent.matrixReceipt.matrixReceipts
      )
    );
    remarkCollection.push(
      this.paymentRemarkService.GetAccountingRemarks(
        this.paymentComponent.accountingRemark.accountingRemarks
      )
    );
    remarkCollection.push(
      this.paymentRemarkService.GetAccountingUdids(
        this.paymentComponent.accountingRemark
      )
    );
    remarkCollection.push(
      this.visaPassportService.GetRemarks(
        this.remarkComponent.viewPassportComponent.visaPassportFormGroup
      )
    );
    remarkCollection.push(
      this.segmentService.writeOptionalFareRule(
        this.remarkComponent.fareRuleSegmentComponent.fareRuleRemarks
      )
    );
    remarkCollection.push(
      this.reportingRemarkService.GetRoutingRemark(this.leisure.reportingView)
    );
    if (!this.pnrService.hasAmendMISRetentionLine()) {
      remarkCollection.push(this.segmentService.getRetentionLine());
    }

    remarkCollection.push(this.segmentService.removeTeamMateMisRetention());
    remarkCollection.push(this.segmentService.getMandatoryRemarks());

    if (this.cfLine.cfa === 'RBM' || this.cfLine.cfa === 'RBP') {
      const concierge = this.reportingComponent.conciergeComponent;
      remarkCollection.push(
        this.reportingRemarkService.getConciergeUdids(
          concierge.conciergeForm,
          concierge.getConciergeForDeletion(),
          concierge.getConciergeRetain()
        )
      );
    }

    // tslint:disable-next-line:no-string-literal
    if (
      this.remarkComponent.remarkForm.controls.packageList.value !== null &&
      this.remarkComponent.remarkForm.controls.packageList.value !== '' &&
      this.remarkComponent.remarkForm.controls.packageList.value !== '1'
    ) {
      if (
        this.remarkComponent.remarkForm.controls.packageList.value === 'ITC'
      ) {
        remarkCollection.push(
          this.packageRemarkService.GetITCPackageRemarks(
            this.remarkComponent.itcPackageComponent.itcForm
          )
        );
      } else {
        remarkCollection.push(
          this.packageRemarkService.GetTourPackageRemarks(
            this.remarkComponent.tourPackageComponent.group
          )
        );
      }
    } else {
      remarkCollection.push(
        this.packageRemarkService.GetPackageRemarksForDeletion()
      );
    }

    remarkCollection.push(
      this.packageRemarkService.GetCodeShare(
        this.remarkComponent.codeShareComponent.codeShareGroup
      )
    );
    remarkCollection.push(
      this.packageRemarkService.GetRbcRedemptionRemarks(
        this.remarkComponent.rbcPointsRedemptionComponent.rbcRedemption
      )
    );

    const leisureFee = this.paymentComponent.leisureFee;
    remarkCollection.push(
      this.paymentRemarkService.GetLeisureFeeRemarks(
        leisureFee,
        this.cfLine.cfa
      )
    );

    this.remarkService.BuildRemarks(remarkCollection);
    this.remarkService.SubmitRemarks().then(
      x => {
        this.isPnrLoaded = false;
        this.getPnr();
        this.workflow = '';
      },
      error => {
        alert(JSON.stringify(error));
      }
    );
  }

  async cancelPnr() {
    if (!this.cancelSegmentComponent.checkValid()) {
      const modalRef = this.modalService.show(MessageComponent, {
        backdrop: 'static'
      });
      modalRef.content.modalRef = modalRef;
      modalRef.content.title = 'Invalid Inputs';
      modalRef.content.message =
        'Please make sure all the inputs are valid and put required values!';
      return;
    }

    const osiCollection = new Array<RemarkGroup>();
    const remarkCollection = new Array<RemarkGroup>();
    const cancel = this.cancelSegmentComponent;
    const getSelected = cancel.submit();

    // if (getSelected.length >= 1) {
    osiCollection.push(this.segmentService.osiCancelRemarks(cancel.cancelForm));
    this.remarkService.BuildRemarks(osiCollection);
    await this.remarkService.cancelRemarks().then(
      x => {
        // this.isPnrLoaded = false;
        // this.getPnr();
      },
      error => {
        alert(JSON.stringify(error));
      }
    );

    if (
      getSelected.length === this.segment.length &&
      !this.pnrService.IsMISRetention()
    ) {
      remarkCollection.push(this.segmentService.cancelMisSegment());
    }

    remarkCollection.push(
      this.segmentService.buildCancelRemarks(cancel.cancelForm, getSelected)
    );
    this.remarkService.BuildRemarks(remarkCollection);
    await this.remarkService.cancelRemarks().then(
      x => {
        this.isPnrLoaded = false;
        this.getPnr();
        this.workflow = '';
      },
      error => {
        alert(JSON.stringify(error));
      }
    );
    this.remarkService.endPNR(cancel.cancelForm.value.requestor);
  }

  async addSegmentToPNR() {
    const remarkCollection = new Array<RemarkGroup>();
    remarkCollection.push(
      this.segmentService.GetSegmentRemark(
        this.passiveSegmentsComponent.segmentRemark.segmentRemarks
      )
    );
    // tslint:disable-next-line:max-line-length
    this.remarkService.BuildRemarks(remarkCollection);
    await this.remarkService.SubmitRemarks().then(
      async x => {
        this.isPnrLoaded = false;
        await this.getPnr();
        this.addRir();
      },
      error => {
        alert(JSON.stringify(error));
      }
    );
  }

  async addRir() {
    // await this.pnrService.getPNR();
    const remarkCollection2 = new Array<RemarkGroup>();
    remarkCollection2.push(
      this.segmentService.addSegmentRir(
        this.passiveSegmentsComponent.segmentRemark
      )
    );

    await this.remarkService.BuildRemarks(remarkCollection2);
    this.remarkService.SubmitRemarks().then(
      x => {
        this.isPnrLoaded = false;
        this.getPnr();
      },
      error => {
        alert(JSON.stringify(error));
      }
    );
  }

  displayInvoice() {
    if (this.isPnrLoaded) {
      if (this.pnrService.recordLocator() !== undefined) {
        this.invoiceEnabled = true;
      } else {
        this.invoiceEnabled = false;
      }
    }
  }

  public SendInvoiceItinerary() {
    const remarkCollection = new Array<RemarkGroup>();
    remarkCollection.push(
      this.invoiceService.GetMatrixInvoice(
        this.invoiceComponent.matrixInvoiceGroup
      )
    );
    this.remarkService.endPNR(' Agent Invoicing'); // end PNR First before Invoice
    this.remarkService.BuildRemarks(remarkCollection);
    this.remarkService.SubmitRemarks().then(
      x => {
        this.isPnrLoaded = false;
        this.getPnr();
        this.workflow = '';
      },
      error => {
        alert(JSON.stringify(error));
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
      if (this.pnrService.recordLocator() !== undefined) {
        this.cancelEnabled = false;
      }
    }
  }
}
