
import { ReportingViewModel } from './reporting-view.model';
import { RemarkViewModel } from './remark-view.model';
import { PassiveSegmentViewModel } from './passive-segment-view.model';
import { CfRemarkModel } from './pnr/cf-remark.model';

export class LeisureViewModel {

    passiveSegmentView: PassiveSegmentViewModel;
    remarkView: RemarkViewModel;
    reportingView: ReportingViewModel;

    constructor() {
        this.passiveSegmentView = new PassiveSegmentViewModel();
        this.remarkView = new RemarkViewModel();
        this.reportingView = new ReportingViewModel();
    }


}
