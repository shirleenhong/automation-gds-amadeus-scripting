import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import {
  validateSegmentNumbers,
  validatePassengerNumbers
} from 'src/app/shared/validators/leisure.validators';
import { PnrService } from 'src/app/service/pnr.service';

@Component({
  selector: 'app-matrix-invoice',
  templateUrl: './matrix-invoice.component.html',
  styleUrls: ['./matrix-invoice.component.scss']
})
export class MatrixInvoiceComponent implements OnInit {
  matrixInvoiceGroup: FormGroup;
  passengerList: Array<any>;
  segments = [];
  passengers = [];
  selection: string;
  pnrRecordId: string; // The PNR Record Locator/Id

  constructor(private fb: FormBuilder, private pnrService: PnrService) { }

  ngOnInit() {
    this.pnrRecordId = this.pnrService.recordLocator();

    this.matrixInvoiceGroup = this.fb.group({
      segmentNo: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]+(,[0-9]+)*'),
        validateSegmentNumbers(this.segments)
      ]),
      passengerNo: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]+(,[0-9]+)*'),
        validatePassengerNumbers(this.passengers)
      ]),
      selection: new FormControl('', [])
    });
    //  this.select('itinerary');
  }

  get f() {
    return this.matrixInvoiceGroup.controls;
  }

  select(selected: string) {
    this.selection = selected;
    this.f.selection.setValue(selected);
  }
}
