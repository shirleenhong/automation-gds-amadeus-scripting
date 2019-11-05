import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CounselorDetail } from './globals/counselor-identity';
import { StaticValuesService } from './service/static-values.services';
import { SelectItem } from 'src/app/models/select-item.model';
import { HttpParams } from '@angular/common/http';
import { MatrixReportingComponent } from 'src/app/corporate/reporting/matrix-reporting/matrix-reporting.component';
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
  @ViewChild(MatrixReportingComponent) matrixReportingComponent: MatrixReportingComponent;

  identityList: Array<SelectItem> = null;

  constructor(private counselorDetail: CounselorDetail, private staticValues: StaticValuesService) { }

  ngOnInit(): void {
    this.isCorporate = this.getParamValueQueryString('corporate') === 'true';
    this.counselorDetail.setCorporate(this.isCorporate);
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
    this.counselorDetail.updateIdentity(this.counselorIdentity);
  }

  getParamValueQueryString(paramName) {
    const url = window.location.href;
    let paramValue;
    if (url.includes('?')) {
      const httpParams = new HttpParams({ fromString: url.split('?')[1] });
      paramValue = httpParams.get(paramName);
    }
    return paramValue;
  }
}
