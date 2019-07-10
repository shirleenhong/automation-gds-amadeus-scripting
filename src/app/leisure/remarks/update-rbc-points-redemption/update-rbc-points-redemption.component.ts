import { Component, OnInit, Input } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { SelectItem } from 'src/app/models/select-item.model';
import { RBCRedemptionModel } from 'src/app/models/pnr/rbc-redemption.model';
import { UtilHelper } from 'src/app/helper/util.helper';

@Component({
  selector: 'app-update-rbc-points-redemption',
  templateUrl: './update-rbc-points-redemption.component.html',
  styleUrls: ['./update-rbc-points-redemption.component.scss']
})
export class UpdateRbcPointsRedemptionComponent implements OnInit {
  title: string;
  @Input()
  rbcPoints: RBCRedemptionModel;
  isSubmitted: boolean;

  rbcPointsForm: FormGroup;
  productTypeList: Array<SelectItem>;

  constructor(
    private fb: FormBuilder,
    public activeModal: BsModalService,
    public modalRef: BsModalRef,
    private util: UtilHelper
  ) {
    this.rbcPoints = new RBCRedemptionModel();
  }

  ngOnInit() {
    this.rbcPointsForm = this.fb.group({
      // rbcNo: new FormControl('', [Validators.required]),
      productType: new FormControl('', [Validators.required]),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      firstvisanumber: new FormControl('', [Validators.required]),
      lastvisanumber: new FormControl('', [Validators.required]),
      pointsRedeemed: new FormControl('', [Validators.required]),
      valuepoints: new FormControl('', [Validators.required]),
      suppliername: new FormControl('', [Validators.required]),
      numberbookings: new FormControl('', [Validators.required]),
      totalbasecost: new FormControl('', [Validators.required]),
      noofadult: new FormControl('', [Validators.required]),
      totalbasecostadult: new FormControl('', [Validators.required]),
      gst: new FormControl('', [Validators.required]),
      hst: new FormControl('', [Validators.required]),
      qst: new FormControl('', [Validators.required]),
      otherTaxes: new FormControl('', [Validators.required]),
      noofchildren: new FormControl(''),
      totalbasecostchild: new FormControl(''),
      cgst: new FormControl(''),
      chst: new FormControl(''),
      cqst: new FormControl(''),
      cotherTaxes: new FormControl(''),
      pct: new FormControl(''),
      othValue: new FormControl('')
    });
    this.loadProductTypeList();

    this.util.validateAllFields(this.rbcPointsForm);
  }

  get f() {
    return this.rbcPointsForm.controls;
  }

  loadProductTypeList() {
    this.productTypeList = [
      { itemText: '', itemValue: '' },
      { itemText: 'AIR PRODUCT', itemValue: 'AIR PRODUCT' },
      { itemText: 'CAR', itemValue: 'CAR' },
      { itemText: 'CRUISE', itemValue: 'CRUISE' },
      { itemText: 'HOTEL', itemValue: 'HOTEL' },
      { itemText: 'INSURANCE', itemValue: 'INSURANCE' },
      { itemText: 'RAIL', itemValue: 'RAIL' },
      { itemText: 'TOUR', itemValue: 'TOUR' },
      { itemText: 'VACATION PACKAGE', itemValue: 'VACATION PACKAGE' },
      { itemText: 'OTHER', itemValue: 'OTHER' }
    ];
  }

  onChangeProductType(productType) {
    switch (productType) {
      case 'CAR':
      case 'HOTEL':
        this.enableFormControls(
          [
            'totalbasecostadult',
            'noofadult',
            'noofchildren',
            'totalbasecostchild',
            'cgst',
            'chst',
            'cqst',
            'cotherTaxes'
          ],
          true
        );
        this.enableFormControls(['numberbookings', 'totalbasecost'], false);
        this.rbcPointsForm.controls.pct.setValue('1');

        break;
      default:
        if (productType === 'AIR') {
          // this.itcForm.controls['holidayCost'].setValue(
          this.rbcPointsForm.controls.pct.setValue('1.5');
        } else {
          this.rbcPointsForm.controls.pct.setValue('1');
        }
        this.enableFormControls(
          [
            'totalbasecostadult',
            'noofadult',
            'noofchildren',
            'totalbasecostchild',
            'cgst',
            'chst',
            'cqst',
            'cotherTaxes'
          ],
          false
        );
        this.enableFormControls(['numberbookings', 'totalbasecost'], true);
        break;
    }
  }

  enableFormControls(controls: string[], disabled: boolean) {
    controls.forEach(c => {
      if (disabled) {
        this.rbcPointsForm.get(c).disable();
      } else {
        this.rbcPointsForm.get(c).enable();
      }
    });
  }

  saveRbcPoints() {
    if (this.rbcPointsForm.invalid) {
      alert('Please Complete And Complete all the required Information');
      this.isSubmitted = false;
      return;
    }
    this.isSubmitted = true;
    this.modalRef.hide();
  }

  // test() {
  //   debuger;
  //   let test = this.rbcPointsForm.invalid
  // }
}
