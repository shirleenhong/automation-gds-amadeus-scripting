export class ValidateModel {
  isPaymentValid = false;
  isReportingValid = false;
  isRemarkValid = false;
  isSegmentValid = false;
  isSubmitted = false;
  // isItineraryValid = false;
  paymentValidCss = '';
  reportingValidCss = '';
  remarkValidCss = '';
  segmentValidCss = '';
  itineraryValidCss = '';

  setCssClass() {
    this.paymentValidCss = this.getCss(this.isPaymentValid);
    this.reportingValidCss = this.getCss(this.isReportingValid);
    this.remarkValidCss = this.getCss(this.isRemarkValid);
    this.segmentValidCss = this.getCss(this.isSegmentValid);
    // this.itineraryValidCss = this.getCss(this.isItineraryValid);
  }

  getCss(val: boolean) {
    if (this.isSubmitted) {
      return val ? 'fas fa-check checkValid' : 'fas fa-times crossInvalid';
    } else {
      return '';
    }
  }

  isAllValid() {
    this.setCssClass();
    return this.isPaymentValid && this.isReportingValid && this.isRemarkValid;
  }

  isCorporateAllValid() {
    this.setCssClass();
    return this.isPaymentValid && this.isReportingValid;
  }
}
