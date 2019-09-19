import { Injectable } from '@angular/core';
import { PnrService } from '../pnr.service';
import { RemarksManagerService } from './remarks-manager.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceRemarkService {
  constructor(private pnrService:PnrService,private rms: RemarksManagerService) { }


  sendU70Remarks(): any {
    if (this.checkAquaComplianceRemarks()) { 
      console.log("send u70 remark");
      const u70map = new Map<string, string>();
      u70map.set('RecordLocator', this.pnrService.pnrObj.header.recordLocator); 
      this.rms.createPlaceholderValues(u70map)
    };
  }
  checkAquaComplianceRemarks(): any {
    let createRemark = false;
    if (this.pnrService.pnrObj.header.recordLocator) {
      const u70 = this.pnrService.getRemarkText('U70/-');
      if (!u70) {
        createRemark = true;
        }
    }
    return createRemark;
  }

 
}
