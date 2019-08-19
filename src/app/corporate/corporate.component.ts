import { Component, OnInit } from '@angular/core';

import { PnrService } from '../service/pnr.service';
import { RemarksManagerService } from '../service/corporate/remarks-manager.service';
import { DDBService } from '../service/ddb.service';
import { MessageComponent } from '../shared/message/message.component';
import { MessageType } from '../shared/message/MessageType';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { LoadingComponent } from '../shared/loading/loading.component';

@Component({
  selector: 'app-corporate',
  templateUrl: './corporate.component.html',
  styleUrls: ['./corporate.component.scss']
})
export class CorporateComponent implements OnInit {
  title = 'bpg-gds-scripting-amadeus';
  errorPnrMsg = '';
  isPnrLoaded = false;
  modalRef: BsModalRef;

  constructor(
    private pnrService: PnrService,
    private rms: RemarksManagerService,
    private ddbService: DDBService,
    private modalService: BsModalService
  ) {
    this.initData();
  }

  async ngOnInit(): Promise<void> {
    if (this.modalRef) {
      this.modalRef.hide();
    }

    // this.rms.TestSendToPnr(); // test
    // if (this.pnrService.errorMessage.indexOf('Error') === 0) {
    //   this.errorPnrMsg = 'Unable to load PNR or no PNR is loaded in Amadeus. \r\n' + this.pnrService.errorMessage;
    // } else if (this.pnrService.cfLine == null || this.pnrService.cfLine === undefined) {
    //   this.errorPnrMsg = 'PNR doesnt contain CF Remark, Please make sure CF remark is existing in PNR.';
    //   this.isPnrLoaded = true;
    // }
  }

  async getPnr() {
    this.errorPnrMsg = '';
    await this.getPnrService();
  }

  async getPnrService() {
    this.pnrService.isPNRLoaded = false;
    await this.pnrService.getPNR();
    this.isPnrLoaded = this.pnrService.isPNRLoaded;
  }

  async initData() {
    this.showLoading('Loading Suppliers', 'initData');
    await this.ddbService.loadSupplierCodesFromPowerBase();
    this.showLoading('Loading PNR', 'initData');
    await this.getPnrService();
    this.showLoading('Matching Remarks', 'initData');
    await this.rms.getMatchcedPlaceholderValues();
    this.closeLoading();
  }

  showLoading(msg, caller?) {
    const skip = this.modalRef && this.modalRef.content.callerName === caller;
    if (!skip) {
      this.modalRef = this.modalService.show(LoadingComponent, {
        backdrop: 'static'
      });
    }
    this.modalRef.content.modalRef = this.modalRef;
    this.modalRef.content.title = 'PNR Updated';
    this.modalRef.content.message = msg;
    this.modalRef.content.callerName = caller;
  }

  closeLoading() {
    this.modalRef.hide();
  }

  showMessage(msg: string, type: MessageType, title: string, caller: string) {
    const skip = this.modalRef && this.modalRef.content.callerName === caller;
    if (!skip) {
      this.modalRef = this.modalService.show(MessageComponent, { backdrop: 'static' });
    }
    this.modalRef.content.modalRef = this.modalRef;
    this.modalRef.content.title = title;
    this.modalRef.content.message = msg;
    this.modalRef.content.callerName = caller;
    this.modalRef.content.response = '';
    this.modalRef.content.setMessageType(type);
  }
}
