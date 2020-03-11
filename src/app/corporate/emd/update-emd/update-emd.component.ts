import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmdModel } from 'src/app/models/pnr/emd.model';
import { BsModalRef } from 'ngx-bootstrap';
import { PnrService } from 'src/app/service/pnr.service';
import { DDBService } from 'src/app/service/ddb.service';

@Component({
  selector: 'app-update-emd',
  templateUrl: './update-emd.component.html',
  styleUrls: ['./update-emd.component.scss']
})
export class UpdateEmdComponent implements OnInit {
  emdForm: FormGroup;
  isSubmitted: boolean;
  title: string;
  ticketList = [];
  currencyList = [];
  passengerList = [];

  @Input() emdModel: EmdModel;

  constructor(public modalRef: BsModalRef, private pnrService: PnrService, private ddb: DDBService) {
    this.emdForm = new FormGroup({
      emdType: new FormControl('', [Validators.required]),
      ticketNumber: new FormControl('', [Validators.required]),
      baseAmount: new FormControl('', [Validators.required]),
      currency: new FormControl('', [Validators.required]),
      otherTaxes: new FormControl('', [Validators.required]),
      taxes: new FormControl('', [Validators.required]),
      totalCurrency: new FormControl('', [Validators.required]),
      totalCharge: new FormControl('', [Validators.required]),
      fop: new FormControl('', [Validators.required]),
      invoiceNumber: new FormControl('', [Validators.required]),
      passengerName: new FormControl('', [Validators.required])
    });

  }

  ngOnInit() {
    this.getListValues();
  }

  loadValues() {
    this.emdForm.patchValue({
      emdType: this.emdModel.emdType,
      ticketNumber: this.emdModel.ticketNumber,
      baseAmount: this.emdModel.baseAmount,
      currency: this.emdModel.currency,
      otherTaxes: this.emdModel.otherTaxes,
      taxes: this.emdModel.taxes,
      totalCurrency: this.emdModel.totalCurrency,
      totalCharge: this.emdModel.totalCharge,
      fop: this.emdModel.fop,
      invoiceNumber: this.emdModel.invoiceNumber,
      passengerName: this.emdModel.passengerName
    });
  }

  save() {
    if (this.emdModel) {
      this.emdModel.emdType = this.emdForm.get('emdType').value;
      this.emdModel.ticketNumber = this.emdForm.get('ticketNumber').value;
      this.emdModel.baseAmount = this.emdForm.get('baseAmount').value;
      this.emdModel.currency = this.emdForm.get('currency').value;
      this.emdModel.otherTaxes = this.emdForm.get('otherTaxes').value;
      this.emdModel.taxes = this.emdForm.get('taxes').value;
      this.emdModel.totalCurrency = this.emdForm.get('totalCurrency').value;
      this.emdModel.totalCharge = this.emdForm.get('totalCharge').value;
      this.emdModel.fop = this.emdForm.get('fop').value;
      this.emdModel.invoiceNumber = this.emdForm.get('invoiceNumber').value;
      this.emdModel.carrierCode = this.getCarrierCode();
      this.emdModel.passengerName = this.emdForm.get('passengerName').value;
      this.isSubmitted = true;
      this.modalRef.hide();
    }
  }

  getListValues() {
    this.ticketList = this.pnrService.getTicketList();
    this.currencyList = this.ddb.getCurrencies();
    this.emdForm.patchValue({
      currency: 'CAD',
      totalCurrency: 'CAD'
    });
    this.passengerList = this.pnrService.getPassengers();
  }

  getCarrierCode() {
    let ticketSegment = [];
    const segments = this.pnrService.getSegmentList();
    const look = this.ticketList.find((x) => x.ticketNumber === this.emdForm.get('ticketNumber').value);
    if (look) {
      ticketSegment = look.segmentReference.reference.filter((y) => y.qualifier === 'ST').map((seg) => seg.number);
    }
    return segments.find(x => x.tatooNo === ticketSegment[0]).airlineCode;
  }

}
