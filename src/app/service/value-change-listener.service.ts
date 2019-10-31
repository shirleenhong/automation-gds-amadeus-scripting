import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ValueChangeListener {
  accountingObserver: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  accountingRemarkChange = this.accountingObserver.asObservable();

  reasonCodeObserver = new BehaviorSubject([]);
  reasonCodeOnChange = this.reasonCodeObserver.asObservable();

  constructor() {}
  accountingRemarksChange(accountingRemarks) {
    this.accountingObserver.next(accountingRemarks);
  }

  reasonCodeChange(reasonCodes) {
    this.reasonCodeObserver.next(reasonCodes);
  }
}
