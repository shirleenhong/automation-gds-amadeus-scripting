import { Component, Input, OnInit } from '@angular/core';
import { PlatformLocation } from '@angular/common';

import { CounselorDetail } from './globals/counselor-identity';
import { StaticValuesService } from './service/static-values.services';
import { SelectItem } from 'src/app/models/select-item.model';

declare var smartScriptSession: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'bpg-gds-scripting-amadeus';
  isCorporate = false;
  isMinimize = false;
  header = 'Leisure';

  @Input()
  counselorIdentity: string;

  identityList: Array<SelectItem> = null;

  constructor(private location: PlatformLocation, private counselorDetail: CounselorDetail, private staticValues: StaticValuesService) {}
  url = '';

  ngOnInit(): void {
    this.isCorporate = this.location.getBaseHrefFromDOM().indexOf('corporate') > 0;
    if (this.isCorporate) {
      this.header = 'Corporate';
      this.loadCounselorIdentityList();
    }
  }

  resize() {
    const width = 800;
    let height = 567;
    if (!this.isMinimize) {
      height = 32;
    }
    this.isMinimize = !this.isMinimize;

    smartScriptSession.resizeSmartTool({ id: smartScriptSession.getPopupId(), width, height }).then((x) => {
      console.log(JSON.stringify(x));
    });
  }

  loadCounselorIdentityList() {
    this.identityList = this.staticValues.getCounselorIdentityList();
  }

  onChangeIdentity() {
    this.counselorDetail.identity = this.counselorIdentity;
  }
}
