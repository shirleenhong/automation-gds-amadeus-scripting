import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountingRemarkComponent } from './accounting-remark/accounting-remark.component';
import { NonAcceptanceComponent } from './non-acceptance/non-acceptance.component';
import { PnrService } from '../../service/pnr.service';
import { UtilHelper } from 'src/app/helper/util.helper';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  @ViewChild(AccountingRemarkComponent) accountingRemark: AccountingRemarkComponent;
  @ViewChild(NonAcceptanceComponent) nonAcceptance: NonAcceptanceComponent;
  hasUnticketed = false;
  hasFop = false;
  constructor(private pnrService: PnrService, private utilHelper: UtilHelper) {}

  ngOnInit() {
    this.checkUnticketedAirSegments();
    if (this.pnrService.getFopElements() !== '') {
      this.hasFop = true;
    } else {
      this.hasFop = false;
    }
  }

  checkValid() {
    if (this.nonAcceptance !== undefined) {
      this.utilHelper.validateAllFields(this.nonAcceptance.nonAcceptanceForm);
      if (!this.nonAcceptance.nonAcceptanceForm.valid) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  checkUnticketedAirSegments() {
    const allAir = this.pnrService.pnrObj.allAirSegments;
    const unticketedSegments = [];
    const ticketedSegments = [];

    for (const tst of this.pnrService.pnrObj.fullNode.response.model.output.response.dataElementsMaster.dataElementsIndiv) {
      const segmentName = tst.elementManagementData.segmentName;
      if (segmentName === 'FA' || segmentName === 'FHA' || segmentName === 'FHE') {
        if (tst.referenceForDataElement !== undefined) {
          if (tst.referenceForDataElement.reference.length > 1) {
            tst.referenceForDataElement.reference.forEach((ref) => {
              if (ref.qualifier === 'ST') {
                ticketedSegments.push(ref.number);
              }
            });
          } else {
            if (tst.referenceForDataElement.reference.qualifier === 'ST') {
              ticketedSegments.push(tst.referenceForDataElement.reference.number);
            }
          }
        }
      }
    }

    allAir.forEach((x) => {
      if (!ticketedSegments.find((p) => x.tatooNumber === p)) {
        unticketedSegments.push(x.tatooNumber);
      }
    });

    if (unticketedSegments.length > 0) {
      this.hasUnticketed = true;
    } else {
      this.hasUnticketed = false;
    }
  }
}
