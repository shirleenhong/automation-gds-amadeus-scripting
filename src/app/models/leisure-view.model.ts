
import { ReportingViewModel } from './reporting-view.model';
import { PaymentViewModel } from './payment-view.model';
import { RemarkViewModel } from './remark-view.model';
import { PassiveSegmentViewModel } from './passive-segment-view.model';

export class LeisureViewModel {

    passiveSegmentView: PassiveSegmentViewModel;
    paymentView: PaymentViewModel;
    remarkView: RemarkViewModel;
    reportingView: ReportingViewModel;

    constructor() {
        this.passiveSegmentView = new PassiveSegmentViewModel();
        this.paymentView = new PaymentViewModel();
        this.remarkView = new RemarkViewModel();
        this.reportingView = new ReportingViewModel();
    }


}