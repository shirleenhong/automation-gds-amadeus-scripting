import { RemarkModel } from '../models/pnr/remark.model';
import { Injectable } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RemarkHelper {
  decPipe = new DecimalPipe('en-US');
  constructor() {}

  createRemark(remarkText, remarkType, remarkCategory, segmentAssoc?) {
    const rem = new RemarkModel();
    rem.remarkType = remarkType;
    rem.remarkText = remarkText;
    rem.category = remarkCategory;
    rem.relatedSegments = segmentAssoc;
    return rem;
  }

  addSpaces(rm2: string, textToformat: string, len: number, type: string) {
    let newformat: string = rm2;

    if (textToformat.length + rm2.length < len) {
      for (let i = 1; i < len - (textToformat.length + rm2.length); i++) {
        newformat = newformat + '-';
      }
    }
    if (type === 'prefix') {
      newformat = newformat + ' ' + textToformat;
    } else {
      newformat = textToformat + ' ' + newformat;
    }

    return newformat;
  }

  getMaxLength(remtype) {
    let maxlen = 0;
    switch (remtype) {
      case 'General': {
        maxlen = 127;
        break;
      }
      case 'Itinerary': {
        maxlen = 65;
        break;
      }
      default: {
        maxlen = 127;
        break;
      }
    }
    return maxlen;
  }

  getRemark(remarkText, remarkType, remarkCategory, segmentAssoc?: any) {
    let segmentrelate = [];
    if (segmentAssoc) {
      segmentrelate = segmentAssoc.split(',');
    }
    const rem = new RemarkModel();
    rem.remarkType = remarkType;
    rem.remarkText = remarkText;
    rem.category = remarkCategory;
    rem.relatedSegments = segmentrelate;
    return rem;
  }
}
