import { CfRemarkModel } from './pnr/cf-remark.model';

export class ReportingViewModel {
    routeCode: string;
    tripType: number;
    reasonForTravel: string;
    isDisabled = false;
    destination: string;
    companyName: string;
    noFeeReason: string;
    insuranceDeclinedReason: string;
    cfLine: CfRemarkModel;
    isDisabledDest = false;
    sfcLineAdded: boolean;
    leisureFeeType: number;
}
