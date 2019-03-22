import { Component, OnInit, forwardRef } from '@angular/core';
import { PnrService } from '../service/pnr.service';
import { RemarkService } from '../service/remark.service';
import { LeisureViewModel } from '../models/leisure-view.model';
import { PaymentRemarkService } from '../service/payment-remark.service';
import { RemarkGroup } from '../models/pnr/remark.group.model';
import { ReportingRemarkService } from '../service/reporting-remark.service';
import { SegmentService } from '../service/segment.service';
import { FormGroup, FormBuilder, Validators, FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { TourPackageComponent } from '../remarks/tour-package/tour-package.component';
import { TourPackageRemarksService } from '../service/tour-package-remarks.service';

@Component({
  selector: 'app-leisure',
  templateUrl: './leisure.component.html',
  styleUrls: ['./leisure.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TourPackageComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TourPackageComponent),
      multi: true
    }
  ]
})

export class LeisureComponent implements OnInit {
  isPnrLoaded: boolean;
  message: string;
  leisure: LeisureViewModel;

  leisureForm: FormGroup;

  constructor(private pnrService: PnrService,
    private remarkService: RemarkService,
    private paymentRemarkService: PaymentRemarkService,
    private reportingRemarkService: ReportingRemarkService,

    private segmentService: SegmentService,
    private tourPackageRemarksService: TourPackageRemarksService,
    private fb: FormBuilder

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
        })
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

    // alert(JSON.stringify(this.leisure));
  }

  async loadPNR() {
    await this.pnrService.getPNR();
    this.isPnrLoaded=this.pnrService.isPNRLoaded;
  }

  ngOnInit() {

    this.leisure = new LeisureViewModel();


  }

  public checkPNR() {
    this.isPnrLoaded = this.pnrService.isPNRLoaded;
    this.message = this.pnrService.getCFLine();
  }

  public SubmitToPNR() {
    const remarkCollection = new Array<RemarkGroup>();
    
    remarkCollection.push(this.segmentService.GetSegmentRemark(this.leisure.passiveSegmentView.tourSegmentView));
    remarkCollection.push(this.paymentRemarkService.GetMatrixRemarks(this.leisure.paymentView.matrixReceipts));
    remarkCollection.push(this.reportingRemarkService.GetRoutingRemark(this.leisure.reportingView));

    // TODO: This is a sample of passing the FormGroup values to services to build remarks
    // this.tourPackageRemarksService.GetRemarks(this.leisureForm.value.remarks.tourPackage);
    this.remarkService.BuildRemarks(remarkCollection);
    this.remarkService.SubmitRemarks().then(x => {
      this.loadPNR();

    }, error => { alert(JSON.stringify(error)); });
  }
}
