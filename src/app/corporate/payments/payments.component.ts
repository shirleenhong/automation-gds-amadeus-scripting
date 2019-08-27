import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountingRemarkComponent } from './accounting-remark/accounting-remark.component';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  @ViewChild(AccountingRemarkComponent) accountingRemark: AccountingRemarkComponent;

  constructor() { }

  ngOnInit() {
  }

}
