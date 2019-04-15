
import { ReportingViewModel } from './reporting-view.model';
import { RemarkViewModel } from './remark-view.model';
import { PassiveSegmentViewModel } from './passive-segment-view.model';
import { VisaPassportModel } from './visa-passport-view.model';
import { CfRemarkModel } from './pnr/cf-remark.model';


export class LeisureViewModel {

    passiveSegmentView: PassiveSegmentViewModel;
    remarkView: RemarkViewModel;
    reportingView: ReportingViewModel;
    visaPassportView: VisaPassportModel;

    constructor() {
        this.passiveSegmentView = new PassiveSegmentViewModel();
        this.remarkView = new RemarkViewModel();
        this.reportingView = new ReportingViewModel();
        this.visaPassportView = new VisaPassportModel();
    }


}
