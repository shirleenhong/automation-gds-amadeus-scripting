import { CfRemarkModel } from './pnr/cf-remark.model';

export class ReportingViewModel {
    routeCode: string;
    tripType: number;
    reasonForTravel: string;
    isDisabled: boolean;
    destination: string;
    companyName: string;
    noFeeReason: string;
    insuranceDeclinedReason: string;
    cfLine: CfRemarkModel;
}
