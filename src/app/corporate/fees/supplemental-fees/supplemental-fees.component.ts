import { Component, OnInit } from '@angular/core';
import { PnrService } from 'src/app/service/pnr.service';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
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
  maxCount = 0;
  isExchange = false;
  hasAir = false;
  hasTrain = false;

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
    if (this.pnrService.tstObj) {
      this.maxCount = this.pnrService.tstObj.length;
    } else {
      this.maxCount = 1;
    }
    this.exchangeFee = this.getFeeValue('Schedule Change Only Fee on Air Exchange Ticket');
    this.flatFee = this.getFeeValue('Flat Exchange Fee');
    this.specialFee = this.getFeeValue('Special Fee');

    this.checkObFee();

    if (!this.isObt) {
      this.isExchange = this.exchangeSegments.length > 0;
      this.addFee();
    }

    this.handleApay();
  }

  handleApay() {
    this.valueChangeListener.accountingRemarkChange.subscribe((list) => {
      if (list) {
        const frmArray = [];
        const count = (list as MatrixAccountingModel[]).filter((a) => a.accountingTypeRemark === 'APAY').length;

        if (count > 0) {
          this.maxCount = count;
          const group = this.createFormGroup(false);
          group.get('code').setValue(this.isObt ? 'NFR' : 'NFM');
          frmArray.push(group);
          this.feeChange(group);
        }
        if (frmArray.length > 0) {
          this.isApay = true;
          this.supplementalFeeList = [];
          this.ticketedForm = this.fb.group({
            segments: this.fb.array(frmArray)
          });
        } else {
          if (this.isApay) {
            this.ticketedForm = this.fb.group({
              segments: this.fb.array([])
            });
          }
          this.maxCount = this.pnrService.tstObj.length;
          this.isApay = false;
        }
      }
    });
  }

  async loadData(): Promise<void> {
    this.noFeeCodes = this.ddbService.getNoFeeCodes();
    this.hasAir = this.pnrService.getSegmentTatooNumber().filter((x) => x.segmentType === 'AIR').length > 0;
    this.hasTrain = this.pnrService.getSegmentTatooNumber().filter((x) => x.segmentType === 'TRN' || x.passive === 'TYP-TRN').length > 0;
    this.exchangeSegments = this.pnrService.getExchangeSegmentNumbers();

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
    const noFeeCodeFg = group.get('noFeeCode') as FormControl;
    if (group.get('code').value === '' && group.get('supplementalFee').value === '') {
      // noFeeCodeFg.setValidators([Validators.required]);
    } else {
      // noFeeCodeFg.setValidators(null);
      noFeeCodeFg.setValue('');
    }
  }

  noFeeChange(group, value) {
    if (value !== '') {
      group.get('fee').setValue('');
      group.get('supplementalFee').setValue('');
      group.get('code').setValue('');
      group.get('isChange').setValue(false);
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

  createFormGroup(exchange) {
    return this.fb.group({
      isChange: new FormControl(''),
      code: new FormControl(''),
      fee: new FormControl({ value: '', disabled: true }),
      noFeeCode: new FormControl(''),
      supplementalFee: new FormControl(''),
      feeType: new FormControl(''),
      isExchange: new FormControl(exchange)
    });
  }

  getCode() {
    // const segments = this.pnrService.getSegmentTatooNumber().filter((x) => x.segmentType === 'AIR' || x.segmentType === 'TRN');
    let code = 'A';
    if (!this.hasAir && this.hasTrain) {
      code = 'R';
    }
    return code + 'T' + this.codeDestination;
  }

  setFee(group: FormGroup, feeValue, feeType) {
    const amountPipe = new AmountPipe();
    let code = this.getCode();
    let fee = amountPipe.transform(feeValue);
    if (feeValue === 0 && group.get('isChange').value === true) {
      code = 'NFR';
      fee = '';
    }

    if (fee === '0.01') {
      group.get('fee').enable();
      fee = '';
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

  processExchange(group: FormGroup, isChange: boolean) {
    if (isChange && group.get('isExchange').value && !this.isObt) {
      this.setFee(group, this.exchangeFee, 'exchange');
    } else {
      this.processFlatFee(group);
    }
    this.feeChange(group);
  }

  processFlatFee(group: FormGroup) {
    if (this.flatFee > 0 && group.get('isExchange').value && !this.isObt) {
      this.setFee(group, this.flatFee, 'flat');
    } else {
      this.processSpecialFee(group);
    }
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

  addFee(): void {
    const group = this.createFormGroup(this.isExchange);
    (this.ticketedForm.get('segments') as FormArray).push(group);
    this.processExchange(group, false);
  }

  removeFee(indx) {
    (this.ticketedForm.get('segments') as FormArray).removeAt(indx);
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
