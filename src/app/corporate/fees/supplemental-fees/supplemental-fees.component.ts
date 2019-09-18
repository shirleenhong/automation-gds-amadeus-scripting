import { Component, OnInit } from '@angular/core';
import { PnrService } from 'src/app/service/pnr.service';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { DDBService } from 'src/app/service/ddb.service';
import { SelectItem } from 'src/app/models/select-item.model';
import { ClientFeeItem } from 'src/app/models/ddb/client-fee-item.model';
import { AmountPipe } from 'src/app/pipes/amount.pipe';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AddSupplementalFeesComponent } from '../add-supplemental-fees/add-supplemental-fees.component';
import { ValueChangeListener } from 'src/app/service/value-change-listener.service';
import { MatrixAccountingModel } from 'src/app/models/pnr/matrix-accounting.model';

@Component({
  selector: 'app-supplemental-fees',
  templateUrl: './supplemental-fees.component.html',
  styleUrls: ['./supplemental-fees.component.scss']
})
export class SupplementalFeesComponent implements OnInit {
  ticketedSegments = [];
  ticketedForm: FormGroup;
  noFeeCodes: Array<SelectItem> = [];
  supplementalFeeList: ClientFeeItem[];
  clientFees: Array<ClientFeeItem> = [];
  isObt = false;
  exchangeFee = 0;
  flatFee = 0;
  specialFee = 0;
  obFee = 0;
  cfa = '';
  codeDestination = '';
  exchangeSegments = [];
  modalRef: BsModalRef;
  selectedGroup: FormGroup;
  isApay = false;

  constructor(
    private pnrService: PnrService,
    private fb: FormBuilder,
    private ddbService: DDBService,
    private modalService: BsModalService,
    private valueChangeListener: ValueChangeListener
  ) {
    this.modalSubscribeOnClose();
    this.ticketedForm = this.fb.group({
      segments: this.fb.array([])
    });
  }

  async ngOnInit() {
    this.isApay = false;
    await this.loadData();

    this.exchangeFee = this.getFeeValue('Schedule Change Only Fee on Air Exchange Ticket');
    this.flatFee = this.getFeeValue('Flat Exchange Fee');
    this.specialFee = this.getFeeValue('Special Fee');

    this.checkObFee();
    this.handleApay();

    if (!this.isObt) {
      this.ticketedForm = this.fb.group({
        segments: this.fb.array([])
      });

      this.ticketedSegments = await this.pnrService.getTicketedSegments();
      for (const segment of this.ticketedSegments) {
        const group = this.createFormGroup(segment);
        if (this.exchangeSegments.filter((s) => segment.split(',').indexOf(s) >= 0).length > 0) {
          group.get('isExchange').setValue(true);
        } else {
          group.get('isExchange').setValue(false);
        }
        this.processExchange(group, false);
        try {
          (this.ticketedForm.get('segments') as FormArray).push(group);
        } catch (e) {
          e.console.log(e);
        }
        this.feeChange(group);
      }
    }
  }

  handleApay() {
    this.valueChangeListener.valueChange$.subscribe((event) => {
      if (event.name === 'Accounting Remarks') {
        const frmArray = [];
        (event.value as MatrixAccountingModel[])
          .filter((a) => a.accountingTypeRemark === 'APAY')
          .forEach((acc) => {
            const group = this.createFormGroup(acc.segmentNo);
            group.get('code').setValue(this.isObt ? 'NFR' : 'NFM');
            frmArray.push(group);
            this.feeChange(group);
          });
        if (frmArray.length > 0) {
          this.isApay = true;
          this.supplementalFeeList = [];
        } else {
          this.isApay = false;
        }

        this.ticketedForm = this.fb.group({
          segments: this.fb.array(frmArray)
        });
      }
    });
  }

  async loadData(): Promise<void> {
    this.noFeeCodes = await this.ddbService.getNoFeeCodes();
    this.exchangeSegments = await this.pnrService.getExchangeSegmentNumbers();

    this.cfa = this.pnrService.getCFLine().cfa;
    try {
      this.clientFees = await this.ddbService.getFees(this.pnrService.clientSubUnitGuid, this.cfa);
      this.supplementalFeeList = this.clientFees.filter((item) => item.feeTypeDescription === 'Supplemental Fee' && item.valueAmount > 0);
    } catch (e) {
      console.log(e);
    }
    this.codeDestination = 'I';
    if (this.ddbService.isPnrTransBorder()) {
      this.codeDestination = 'B';
    } else if (this.ddbService.isPnrDomestic()) {
      this.codeDestination = 'D';
    }
    this.isObt = this.pnrService.getRemarkText('EB/') !== '';
  }

  feeChange(group: FormGroup) {
    const noFeeCodeFg = group.get('noFeeCode');

    if (group.get('code').value === '' && group.get('supplementalFee').value === '') {
      noFeeCodeFg.setValidators([Validators.required]);
    } else {
      noFeeCodeFg.setValidators([]);
      noFeeCodeFg.setValue('');
    }
    noFeeCodeFg.updateValueAndValidity();
  }

  noFeeChange(group, value) {
    if (value !== '') {
      group.get('fee').setValue('');
      group.get('supplementalFee').setValue('');
      group.get('code').setValue('');
      this.feeChange(group);
    } else {
      if (this.isApay) {
        group.get('code').setValue(this.isObt ? 'NFR' : 'NFM');
        this.feeChange(group);
      } else {
        this.processExchange(group, false);
      }
    }
  }

  createFormGroup(segmentNo) {
    return this.fb.group({
      segment: new FormControl(segmentNo),
      isChange: new FormControl(''),
      code: new FormControl(''),
      fee: new FormControl(''),
      noFeeCode: new FormControl('', []),
      supplementalFee: new FormControl(''),
      feeType: new FormControl(''),
      isExchange: new FormControl(false)
    });
  }

  getCode(segmentNumbers) {
    const segments = this.pnrService.getSegmentTatooNumber().filter((x) => segmentNumbers.split(',').indexOf(x.lineNo) >= 0);
    let code = 'A';
    if (segments.length > 0) {
      if (segments[0].segmentType === 'TRN') {
        code = 'R';
      }
    }
    return code + 'T' + this.codeDestination;
  }

  setFee(group, feeValue, feeType) {
    const amountPipe = new AmountPipe();
    let code = this.getCode(group.get('segment').value);
    let fee = amountPipe.transform(feeValue);
    if (feeValue === 0 && group.get('isChange').value === true) {
      code = 'NFR';
      fee = '';
    }
    if (fee === '0.01') {
      group.get('fee').enable();
    } else {
      group.get('fee').disable();
    }
    group.get('code').setValue(code);
    group.get('fee').setValue(fee);
    group.get('noFeeCode').setValue('');
    group.get('feeType').setValue(feeType);
  }

  modalSubscribeOnClose() {
    this.modalService.onHide.subscribe(() => {
      if (this.selectedGroup) {
        this.feeChange(this.selectedGroup);
      }
    });
  }

  processExchange(group, isChange) {
    if (isChange && group.get('isExchange').value && !this.isObt) {
      this.setFee(group, this.exchangeFee, 'exchange');
    } else {
      this.processFlatFee(group);
    }
  }

  processFlatFee(group) {
    if (this.flatFee > 0 && group.get('isExchange').value && !this.isObt) {
      this.setFee(group, this.flatFee, 'flat');
    } else {
      this.processSpecialFee(group);
    }
    this.feeChange(group);
  }

  processSpecialFee(group) {
    if (this.specialFee > 0 && !this.isObt) {
      this.setFee(group, this.specialFee, 'special');
    } else {
      group.get('fee').setValue('');
    }
  }

  checkObFee() {
    this.obFee = this.getFeeValue('OB Fee - Misc');
    if (this.obFee > 0) {
      const obfDesc = this.getObfClientDescription().filter((obf) => (obf.cfa = this.cfa));
      if (obfDesc.length > 0) {
        const clientFee = new ClientFeeItem(null);
        clientFee.outputFormat = 'OBF';
        clientFee.valueAmount = this.obFee;
        clientFee.clientFeeDescription = obfDesc[0].text;
        this.supplementalFeeList.push(clientFee);
      }
    }
  }

  addSupplementalFee(group) {
    if (!this.supplementalFeeList || this.supplementalFeeList.length === 0) {
      return;
    }
    this.modalRef = this.modalService.show(AddSupplementalFeesComponent, {
      backdrop: 'static'
    });
    this.selectedGroup = group;
    this.modalRef.content.title = 'Add Supplemental Fees';
    this.modalRef.content.setClientFees(this.supplementalFeeList, group.get('supplementalFee'));
  }

  getFeeValue(feeType: string): number {
    const fee = this.getFee(feeType);
    if (fee) {
      return fee.valueAmount;
    }
    return 0;
  }

  getFee(feeType: string): ClientFeeItem {
    const fees = this.clientFees.filter((fee) => fee.clientFeeDescription === feeType);
    if (fees.length > 0) {
      return fees[0];
    }
    return null;
  }

  getObfClientDescription() {
    return [
      { cfa: 'I8V', text: 'Outbound Call Fee For GK Hotel' },
      { cfa: 'M2J', text: 'Technical Help Support Desk' },
      { cfa: 'X5D', text: 'Technical Help Support Desk' },
      { cfa: 'J6O', text: 'Technical Help Support Desk' },
      { cfa: '2PX', text: 'CWT Technology Helpdesk Support' },
      { cfa: 'YPD', text: 'Web Session for OBT Training Only' },
      { cfa: 'YPF', text: 'Web Session for OBT Training Only' },
      { cfa: 'D4N', text: 'Web Session for OBT Training Only' },
      { cfa: 'F6D', text: 'Technical Help Support Desk' },
      { cfa: 'F3X', text: 'Virtual Card' }
    ];
  }
}
