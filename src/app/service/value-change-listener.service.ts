import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ValueChangeListener {
  listObserver: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  accountingRemarkChange = this.listObserver.asObservable();

  constructor() {}
  accountingRemarksChange(accountingRemarks) {
    this.listObserver.next(accountingRemarks);
  }
}
