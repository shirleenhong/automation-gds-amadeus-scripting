
import { ReportingViewModel } from './reporting-view.model';
import { PaymentViewModel } from './payment-view.model';
import { RemarkViewModel } from './remark-view.model';
import { PassiveSegmentViewModel } from './passive-segment-view.model';

export class LeisureViewModel {

    passiveSegmentSection:PassiveSegmentViewModel;
    paymentSection:PaymentViewModel;
    remarkSection:RemarkViewModel;
    reportingSection:ReportingViewModel;
    
    constructor(){
        this.passiveSegmentSection= new PassiveSegmentViewModel();
        this.paymentSection= new PaymentViewModel();
        this.remarkSection=new RemarkViewModel();
        this.reportingSection=new ReportingViewModel();
    }


}