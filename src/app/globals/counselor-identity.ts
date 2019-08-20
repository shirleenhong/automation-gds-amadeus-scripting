import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounselorDetail {
  private identity: string = null;

  getIdentity(): string {
    return this.identity;
  }

  updateIdentity(newIdentity: string): void {
    this.identity = newIdentity;
  }
}
