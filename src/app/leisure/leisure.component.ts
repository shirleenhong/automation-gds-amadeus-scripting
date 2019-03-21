import { Component, OnInit } from '@angular/core';
import { PnrService } from '../service/pnr.service';
import { RemarkService } from '../service/remark.service';
import { LeisureViewModel } from '../models/leisure-view.model';
import { PaymentRemarkService } from '../service/payment-remark.service';
import { RemarkGroup } from '../models/pnr/remark.group.model';
import { ReportingRemarkService } from '../service/reporting-remark.service';

@Component({
  selector: 'app-leisure',
  templateUrl: './leisure.component.html',
  styleUrls: ['./leisure.component.scss']
})

export class LeisureComponent implements OnInit {
  isPnrLoaded: boolean;
  message: string;
  leisure: LeisureViewModel;
  constructor(private pnrService: PnrService,
    private remarkService: RemarkService,
    private paymentRemarkService: PaymentRemarkService,
    private reportingRemarkService: ReportingRemarkService
  ) {
    this.leisure = new LeisureViewModel();
    this.loadPNR();
  }

  async loadPNR() {
    await this.pnrService.getPNR();
  }

  ngOnInit() {

  }

  public checkPNR() {
    this.isPnrLoaded = this.pnrService.isPNRLoaded;
    this.message = this.pnrService.getCFLine();
  }

  public SubmitToPNR() {
    const remarkCollection = new Array<RemarkGroup>();
    remarkCollection.push(this.paymentRemarkService.GetMatrixRemarks(this.leisure.paymentView.matrixReceipts));
    remarkCollection.push(this.reportingRemarkService.GetRoutingRemark(this.leisure.reportingView));

    this.remarkService.BuildRemarks(remarkCollection);
    this.remarkService.SubmitRemarks().then(x => {
      this.loadPNR();

    }, error => { alert(JSON.stringify(error)); });
  }
}
