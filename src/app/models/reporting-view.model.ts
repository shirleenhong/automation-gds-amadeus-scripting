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
  leisureFeeType = 0;
  showInsurance = false;
  declinedOption = [
    { name: 'aa', value: '1', checked: false },
    { name: 'bb', value: '2', checked: false },
    { name: 'cc', value: '3', checked: false },
    { name: 'dd', value: '4', checked: false },
    { name: 'ee', value: '5', checked: false },
    { name: 'ff', value: '6', checked: false }
  ];
}
