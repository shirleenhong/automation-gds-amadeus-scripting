import { Observable, Observer } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ValueChangeListener {
  valueChange$: Observable<any>;
  private _observer: Observer<any>;
  constructor() {
    this.valueChange$ = new Observable((observer) => (this._observer = observer));
  }
  accountingRemarksChange(accountingRemarks) {
    this._observer.next({ name: 'Accounting Remarks', value: accountingRemarks });
  }
  /// - addMore c
}
