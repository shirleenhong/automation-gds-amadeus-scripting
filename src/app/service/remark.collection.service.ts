import { Injectable } from '@angular/core';
import { RemarkGroup } from '../models/pnr/remark.group.model';
import { MatrixReceiptModel } from '../models/pnr/matrix-receipt.model';


@Injectable({
  providedIn: 'root',
})
export class RemarkCollectionService {
  remarkCollection: Array<RemarkGroup>;
  constructor() {
    this.remarkCollection = new Array<RemarkGroup>();
  }

  public addUpdateRemarkGroup(remarkGroup: RemarkGroup) {
    if (this.remarkCollection.length > 0) {
// tslint:disable-next-line: triple-equals
      const look = this.remarkCollection.find(x => x.group == remarkGroup.group);
      if (look != null) {
        const index = this.remarkCollection.indexOf(look);
        this.remarkCollection.splice(index, 1);
      }

    }
    this.remarkCollection.push(remarkGroup);
  }



}