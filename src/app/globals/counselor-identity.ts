import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounselorDetail {
  private identity: string = null;
  isCorporate = false;
  identityObserver = new BehaviorSubject<string>(this.identity);
  identityOnChange = this.identityObserver.asObservable();
  getIdentity(): string {
    return this.identity;
  }

  updateIdentity(newIdentity: string): void {
    this.identity = newIdentity;
    this.identityObserver.next(newIdentity);
  }

  setCorporate(isCorp: boolean) {
    this.isCorporate = isCorp;
  }

  getIsCorporate(): boolean {
    return this.isCorporate;
  }
}
