import { Component, OnInit, ViewChild } from '@angular/core';
import { SupplementalFeesComponent } from './supplemental-fees/supplemental-fees.component';
import { UtilHelper } from 'src/app/helper/util.helper';

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.scss']
})
export class FeesComponent implements OnInit {
  @ViewChild(SupplementalFeesComponent) supplemeentalFees: SupplementalFeesComponent;
  constructor(private utilHelper: UtilHelper) { }

  ngOnInit() { }

  checkValid() {
    debugger;
    this.utilHelper.validateAllFields(this.supplemeentalFees.ticketedForm);
    if (!this.supplemeentalFees.ticketedForm.valid && !this.supplemeentalFees.ticketedForm.disabled) {
      return false;
    }

    return true;
  }
}
