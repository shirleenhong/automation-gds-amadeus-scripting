import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'src/app/models/select-item.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-bsp-ticket-fop',
  templateUrl: './bsp-ticket-fop.component.html',
  styleUrls: ['./bsp-ticket-fop.component.scss']
})
export class BspTicketFopComponent implements OnInit {
  bspTicketFopForm: FormGroup;
  bspfopList: Array<SelectItem>;
  vendorCodeList: Array<SelectItem>;

  constructor() {
    this.bspTicketFopForm = new FormGroup({
      bspfop: new FormControl('', [Validators.required]),
      ccNo: new FormControl('', [Validators.required]),
      expDate: new FormControl('', [Validators.required]),
      vendorCode: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.loadStaticValue();
  }


  loadStaticValue(): void {
    this.bspfopList = [
      { itemText: '', itemValue: '' },
      { itemText: 'Client Credit Card', itemValue: 'CC' },
      { itemText: 'Cheque', itemValue: 'CK' },
      { itemText: 'CWT BSP Agency Plastic Card for AC/PD/WS Tickets Only', itemValue: 'AP' },
      { itemText: 'FOP Exists in PNR and No Update is Required', itemValue: 'NO' },
    ];

    this.vendorCodeList = [
      { itemText: '', itemValue: '' },
      { itemText: 'VI- Visa', itemValue: 'VI' },
      { itemText: 'CA - Mastercard', itemValue: 'CA' },
      { itemText: 'AX - American Express', itemValue: 'AX' },
      { itemText: 'DC -Diners', itemValue: 'DC' }
    ];

  }
  get f() {
    return this.bspTicketFopForm.controls;
  }

  onchangePaymentType(selected: string) {
    if (selected === 'CC') {
      this.enableFormControls(['ccNo', 'expDate', 'vendorCode'], false);
    } else {
      this.enableFormControls(['ccNo', 'expDate', 'vendorCode'], true);
    }
  }

  enableFormControls(controls: string[], disabled: boolean) {
    controls.forEach((c) => {
      if (disabled) {
        this.bspTicketFopForm.get(c).disable();
      } else {
        this.bspTicketFopForm.get(c).enable();
      }
    });
  }

}
