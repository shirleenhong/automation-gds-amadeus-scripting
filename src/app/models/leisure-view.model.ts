import { ReportingViewModel } from './reporting-view.model';
import { RemarkViewModel } from './remark-view.model';
import { VisaPassportModel } from './visa-passport-view.model';

export class LeisureViewModel {
  remarkView: RemarkViewModel;
  reportingView: ReportingViewModel;
  visaPassportView: VisaPassportModel;

  constructor() {
    this.remarkView = new RemarkViewModel();
    this.reportingView = new ReportingViewModel();
    this.visaPassportView = new VisaPassportModel();
  }
}
