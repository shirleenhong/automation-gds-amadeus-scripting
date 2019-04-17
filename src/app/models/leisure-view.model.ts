
import { ReportingViewModel } from './reporting-view.model';
import { RemarkViewModel } from './remark-view.model';

export class LeisureViewModel {

    remarkView: RemarkViewModel;
    reportingView: ReportingViewModel;

    constructor() {
        this.remarkView = new RemarkViewModel();
        this.reportingView = new ReportingViewModel();
    }


}

