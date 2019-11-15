import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatrixReceiptModel, PaymentType } from 'src/app/models/pnr/matrix-receipt.model';
import { SelectItem } from 'src/app/models/select-item.model';
import { PnrService } from 'src/app/service/pnr.service';
import { FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { BankAccount } from 'src/app/models/bank-account.model';
import { validateCreditCard, validateExpDate } from 'src/app/shared/validators/leisure.validators';
import { UtilHelper } from 'src/app/helper/util.helper';

@Component({
  selector: 'app-update-matrix-receipt',
  templateUrl: './update-matrix-receipt.component.html',
  styleUrls: ['./update-matrix-receipt.component.scss']
})
export class UpdateMatrixReceiptComponent implements OnInit {
  title: string;

  @Input()
  matrixReceipt: MatrixReceiptModel;

  // TODO: Via service
  bankAccountList: Array<BankAccount>;
  passengerList: Array<any>;
  matrixForm: FormGroup;
  isSubmitted: boolean;
  PaymentModeList: Array<SelectItem>;
  enablePayment = true;

  @ViewChild('bankAccount') bankAccEl: ElementRef;

  constructor(public activeModal: BsModalService, private pnrService: PnrService, public modalRef: BsModalRef, private util: UtilHelper) {
    this.bankAccountList = new Array<SelectItem>();
    this.matrixReceipt = new MatrixReceiptModel();
    this.loadBankAccount();
    this.loadPaymentMode();
    this.matrixForm = new FormGroup({
      bankAccount: new FormControl('', [Validators.required]),
      passengerName: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      cwtRef: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
      points: new FormControl('', [Validators.required, Validators.maxLength(7)]),
      lastFourVi: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
      gcNumber: new FormControl('', [Validators.maxLength(19)]),
      amount: new FormControl('', [Validators.required, Validators.min(0)]),
      vendorCode: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      ccNo: new FormControl('', [Validators.required, validateCreditCard('vendorCode')]),
      expDate: new FormControl('', [Validators.required, validateExpDate()]),
      modePayment: new FormControl('', [Validators.required])
    });

    this.util.validateAllFields(this.matrixForm);
  }

  ngOnInit() {
    this.passengerList = this.pnrService.getPassengers();
  }

  hideModel() {}

  get PaymentType() {
    return PaymentType;
  }

  bankAccountChange(newValue) {
    this.enablePayment = true;
    switch (newValue) {
      case '224000':
        this.matrixReceipt.paymentType = PaymentType.Rbc;
        this.enableFormControls(['gcNumber', 'ccNo', 'expDate', 'vendorCode', 'modePayment', 'description'], true);
        this.enableFormControls(['cwtRef', 'points', 'lastFourVi'], false);
        break;
      case '115000':
      case '116000':
      case '117000':
      case '118000':
        this.matrixReceipt.paymentType = PaymentType.CreditCard;
        this.enableFormControls(['cwtRef', 'points', 'lastFourVi', 'modePayment'], true);
        this.enableFormControls(['gcNumber', 'ccNo', 'expDate', 'vendorCode', 'description'], false);
        break;
      case '109000':
      case '227000':
        this.enableFormControls(['modePayment'], true);
        this.enableFormControls(['cwtRef', 'points', 'lastFourVi'], true);
        this.enableFormControls(['ccNo', 'expDate', 'vendorCode'], true);
        this.enablePayment = false;
        break;
      default:
        this.matrixReceipt.paymentType = PaymentType.Undefined;
        this.enableFormControls(['cwtRef', 'points', 'lastFourVi'], true);
        this.enableFormControls(['ccNo', 'expDate', 'vendorCode'], true);
        this.enableFormControls(['gcNumber', 'modePayment', 'description'], false);
        break;
    }

    this.SelectVendorCode(newValue);
  }

  enableFormControls(controls: string[], disabled: boolean) {
    controls.forEach((c) => {
      if (disabled) {
        this.matrixForm.get(c).disable();
      } else {
        this.matrixForm.get(c).enable();
      }
    });
  }

  get f() {
    return this.matrixForm.controls;
  }

  saveReceipt() {
    if (this.matrixForm.invalid) {
      alert('Please Complete And Complete all the required Information');
      this.isSubmitted = false;
      return;
    }
    this.isSubmitted = true;
    this.modalRef.hide();
  }

  loadBankAccount() {
    this.bankAccountList = [
      { itemText: '', itemValue: '' },
      { itemText: 'CAD Funds (outside of QC) | 101000  ', itemValue: '101000' },
      { itemText: 'USD Funds (outside of QC) | 102000', itemValue: '102000' },
      { itemText: 'USD Trust (QC only) | 106000', itemValue: '106000' },
      { itemText: 'Canadian Trust (QC only) | 108000', itemValue: '108000' },
      { itemText: 'Debit Card (POS receipts) | 109000', itemValue: '109000' },
      { itemText: 'RBC Point Redemptions | 224000', itemValue: '224000' },
      { itemText: 'CWT Gift Card Redemptions | 227000', itemValue: '227000' },
      {
        itemText: 'Customer Credit Card - CWT (Visa) | 115000',
        itemValue: '115000'
      },
      {
        itemText: 'Customer Credit Card - CWT (Mastercard) | 116000',
        itemValue: '116000'
      },
      {
        itemText: 'Customer Credit Card - CWT (Amex) | 117000',
        itemValue: '117000'
      },
      {
        itemText: 'Customer Credit Card - CWT (Diners) | 118000 ',
        itemValue: '118000'
      }
    ];
  }

  getAllErrors(): { [key: string]: any } | null {
    let hasError = false;
    const result = Object.keys(this.matrixForm.controls).reduce(
      (acc, key) => {
        const control = this.matrixForm.get(key);

        const errors =
          control instanceof FormGroup || control instanceof FormArray ? this.getAllErrors() : control.touched ? control.errors : '';
        if (errors) {
          acc[key] = errors;
          hasError = true;
        }
        return acc;
      },
      {} as { [key: string]: any }
    );
    return hasError ? result : null;
  }

  loadPaymentMode() {
    this.PaymentModeList = [
      { itemText: '', itemValue: '' },
      { itemText: 'Cash', itemValue: 'CA' },
      { itemText: 'Cheque', itemValue: 'CK' }
    ];
  }

  SelectVendorCode(newValue) {
    let modeOfPayment: string;
    switch (newValue) {
      case '115000': {
        modeOfPayment = 'VI';
        break;
      }
      case '116000': {
        modeOfPayment = 'CA';
        break;
      }
      case '117000': {
        modeOfPayment = 'AX';
        break;
      }
      case '118000': {
        modeOfPayment = 'DC';
        break;
      }
      default: {
        modeOfPayment = '';
        break;
      }
    }

    this.matrixReceipt.vendorCode = modeOfPayment;
    this.f.ccNo.setValue('');
  }
}
