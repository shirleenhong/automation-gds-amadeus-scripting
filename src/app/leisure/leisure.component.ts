import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
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

@Component({
  selector: 'app-leisure',
  templateUrl: './leisure.component.html',
  styleUrls: ['./leisure.component.scss']
})

export class LeisureComponent implements OnInit, AfterViewInit {
  isPnrLoaded: boolean;
  message: string;
  leisure: LeisureViewModel;
  @ViewChild(PaymentComponent) paymentComponent: PaymentComponent;
  leisureForm: FormGroup;



  constructor(private pnrService: PnrService,
    private remarkService: RemarkService,
    private paymentRemarkService: PaymentRemarkService,
    private reportingRemarkService: ReportingRemarkService,
    private segmentService: SegmentService,
    private fb: FormBuilder,
    private tourPackageRemarksService: TourPackageRemarksService

  ) {

    this.leisureForm = this.fb.group({
      remarks: this.fb.group({
        tourPackage: this.fb.group({
          adultNum: new FormControl('', [Validators.required, Validators.min(1), Validators.max(9)]),
          userIdFirstWay: new FormControl('', [Validators.required]),
          baseCost: new FormControl('', [Validators.required, Validators.maxLength(7)]),
          taxesPerAdult: new FormControl('', [Validators.required]),
          childrenNumber: new FormControl('', [Validators.required]),
          childBaseCost: new FormControl('', [Validators.required]),
          insurancePerAdult: new FormControl('', [Validators.required]),
          insurancePerChild: new FormControl('', [Validators.required]),
          taxesPerChild: new FormControl('', [Validators.required]),
          infantNumber: new FormControl('', [Validators.required]),
          totalCostPerInfant: new FormControl('', [Validators.required]),
          depositPaid: new FormControl('', [Validators.required]),
          totalCostHoliday: new FormControl('', [Validators.required]),
          lessDepositPaid: new FormControl('', [Validators.required]),
          balanceToBePaid: new FormControl('', [Validators.required]),
          balanceDueDate: new FormControl('', [Validators.required]),
          commisionAmount: new FormControl('', [Validators.required])
        }, { updateOn: 'blur' })
      }),
      reporting: this.fb.group({
        bspRoutingCode: new FormControl('', [Validators.required]),
        destinationCode: new FormControl('', [Validators.required])
      })
    });

    this.leisureForm.valueChanges.subscribe(val => {
      console.log(val);
    });

    this.loadPNR();

  }

  ngAfterViewInit(): void {

  }

  async loadPNR() {
    await this.pnrService.getPNR();
    this.isPnrLoaded = this.pnrService.isPNRLoaded;
  }

  ngOnInit() {

    this.leisure = new LeisureViewModel();


  }


  public SubmitToPNR() {
    const remarkCollection = new Array<RemarkGroup>();

    remarkCollection.push(this.segmentService.GetSegmentRemark(this.leisure.passiveSegmentView.tourSegmentView));
    remarkCollection.push(this.paymentRemarkService.GetMatrixRemarks(this.leisure.paymentView.matrixReceipts));
    remarkCollection.push(this.paymentRemarkService.GetAccountingRemarks(this.leisure.paymentView.accountingRemarks));
    remarkCollection.push(this.reportingRemarkService.GetRoutingRemark(this.leisure.reportingView));
    remarkCollection.push(this.tourPackageRemarksService.GetRemarks(this.leisureForm.value.remarks.tourPackage));
    // TODO: This is a sample of passing the FormGroup values to services to build remarks
    const leisureFee = this.paymentComponent.leisureFee;

    if (leisureFee.leisureFeeForm.valid) {
      remarkCollection.push(leisureFee.BuildRemark());
    }
    this.remarkService.BuildRemarks(remarkCollection);
    this.remarkService.SubmitRemarks().then(x => {
      this.loadPNR();

    }, error => { alert(JSON.stringify(error)); });
  }
}
