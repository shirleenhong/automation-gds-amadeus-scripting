import { Injectable } from '@angular/core';
import { PnrService } from '../pnr.service';
import { RemarksManagerService } from './remarks-manager.service';
import { MatrixReportingComponent } from 'src/app/corporate/reporting/matrix-reporting/matrix-reporting.component';
import {EscRemarksComponent} from 'src/app/corporate/corp-remarks/esc-remarks/esc-remarks.component'
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class InvoiceRemarkService {
  DATE_PIPE = new DatePipe('en-US');
  
  constructor(private pnrService: PnrService, private rms: RemarksManagerService
 ) { }
  sendU70Remarks(): any {
    if (this.checkAquaComplianceRemarks()) {
      console.log('send u70 remark');
      const u70map = new Map<string, string>();
      u70map.set('RecordLocator', this.pnrService.pnrObj.header.recordLocator);
      this.rms.createPlaceholderValues(u70map);
    }
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

  WriteInvoiceRemark(mrc: MatrixReportingComponent) {
    if (mrc.isMatrixPnr) {
      const backOfficeIdentifier = new Map<string, string>();
      const staticRemarksCondition = new Map<string, string>();
      if (mrc.invoiceMessageForm.get('cicNumber').value !== undefined) {
        backOfficeIdentifier.set('BackOfficeAgentIdentifier', mrc.invoiceMessageForm.get('cicNumber').value);
        this.rms.createPlaceholderValues(backOfficeIdentifier);
      }
      staticRemarksCondition.set('IsNuc', 'true');
      this.rms.createPlaceholderValues(null, staticRemarksCondition, null, null, 'NUC');
    }
  }
  writeESCRemarks(escComp: EscRemarksComponent) {
    let esc = escComp.escRemarksForm;
    let currentDate:any = new Date();
    let currentTime = currentDate.getHours() + ":" + (currentDate.getMinutes() <= 9 ? "0" + currentDate.getMinutes() : currentDate.getMinutes());
    currentDate = this.DATE_PIPE.transform(new Date(), 'ddMMM'); // DDOCT

    if (esc.controls.isESCRead.value === 'Y') {
      this.rms.createEmptyPlaceHolderValue(['CurrentTimeN', 'CurrentDateN'], null, 'ESC AGENT DID NOT HAVE TIME TO READ ESC REMARKS');
      const escMap = new Map<string, string>();
      escMap.set('CurrentDateY', currentDate);
      escMap.set('CurrentTimeY', currentTime);
      this.rms.createPlaceholderValues(escMap);
    }
    if (esc.controls.isESCRead.value === 'N') {
      this.rms.createEmptyPlaceHolderValue(['CurrentTimeY', 'CurrentDateY'], null, 'ESC AGENT READ ESC REMARKS');
      const escMap = new Map<string, string>();
      escMap.set('CurrentDateN', currentDate);
      escMap.set('CurrentTimeN', currentTime);
      this.rms.createPlaceholderValues(escMap);
    }
    
  }
}
