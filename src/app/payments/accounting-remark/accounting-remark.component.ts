import { Component, OnInit, Input } from '@angular/core';
import { MatrixAccountingModel } from '../../models/pnr/matrix-accounting.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UpdateAccountingRemarkComponent } from '../update-accounting-remark/update-accounting-remark.component';


@Component({
  selector: 'app-accounting-remark',
  templateUrl: './accounting-remark.component.html',
  styleUrls: ['./accounting-remark.component.scss']
})
export class AccountingRemarkComponent implements OnInit {


  @Input()
  accountingRemarks: MatrixAccountingModel[];
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  addAccountingRemarks() {
    const accountingRemarks = new MatrixAccountingModel();
    this.modalRef = this.modalService.show(UpdateAccountingRemarkComponent);
    this.modalRef.content.title = 'Add Accounting Remarks';
    accountingRemarks.tkMacLine = (this.accountingRemarks.length + 1);
    this.modalRef.content.accountingRemarks = accountingRemarks;
    this.modalService.onHide.subscribe(result => {
      if (this.modalRef.content.isSubmitted) {
        this.accountingRemarks.push(this.modalRef.content.accountingRemarks);
        this.modalRef.content.isSubmitted = false;
      }
      console.log('results', result);
    });

  }
}
