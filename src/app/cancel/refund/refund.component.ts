import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SelectItem } from 'src/app/models/select-item.model';
import { DDBService } from 'src/app/service/ddb.service';

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.scss']
})
export class RefundComponent implements OnInit {
  refundForm: FormGroup;
  cancellationList: Array<SelectItem>;
  filterSupplierCodeList = [];

  constructor(private ddbService: DDBService
  ) {
    this.refundForm = new FormGroup({
      branch: new FormControl('', []),
      personRequesting: new FormControl('', []),
      passengerName: new FormControl('', []),
      cfa: new FormControl('', []),
      cancellation: new FormControl('', []),
      commission: new FormControl('', []),
      baseRefund: new FormControl('', []),
      taxesRef: new FormControl('', []),
      penaltyPoint: new FormControl('', []),
      commissionPoint: new FormControl('', []),
      taxRecall: new FormControl('', []),
      comments: new FormControl('', []),
      supplier: new FormControl('', []),
      isBsp: new FormControl('', [])
    });
    this.loadCancelList();
    this.filterSupplierCodeList = this.ddbService.getSupplierCodes();
  }

  ngOnInit() {
  }

  loadCancelList() {
    this.cancellationList = [
      { itemText: '', itemValue: '' },
      { itemText: 'YES', itemValue: 'YES' },
      { itemText: 'NO', itemValue: 'NO' }
    ];
  }

  get f() {
    return this.refundForm.controls;
  }

}
