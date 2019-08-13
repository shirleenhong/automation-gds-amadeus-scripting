import { Component, OnInit } from '@angular/core';

import { PnrService } from '../service/pnr.service';
import { RemarksManagerService } from '../service/corporate/remarks-manager.service';
import { DDBService } from '../service/ddb.service';

@Component({
  selector: 'app-corporate',
  templateUrl: './corporate.component.html',
  styleUrls: ['./corporate.component.scss']
})
export class CorporateComponent implements OnInit {
  title = 'bpg-gds-scripting-amadeus';
  errorPnrMsg = '';
  isPnrLoaded = false;

  constructor(private pnrService: PnrService, private rms: RemarksManagerService, private ddbService: DDBService) {
    this.getPnr();
    this.initData();
  }

  async ngOnInit(): Promise<void> {
    await this.getPnr();
    this.rms.TestSendToPnr(); // test
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

  initData() {
    this.ddbService.loadSupplierCodesFromPowerBase();
  }
}
