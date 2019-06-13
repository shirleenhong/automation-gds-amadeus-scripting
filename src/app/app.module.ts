import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeisureComponent } from './leisure/leisure.component';
import { ReportingComponent } from './reporting/reporting.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentComponent } from './payments/payment.component';
import { RemarkComponent } from './remarks/remark.component';
import { TourPackageComponent } from './remarks/tour-package/tour-package.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { MatrixReceiptComponent } from './payments/matrix-receipt/matrix-receipt.component';
import { UpdateMatrixReceiptComponent } from './payments/update-matrix-receipt/update-matrix-receipt.component';
import { PassiveSegmentsComponent } from './passive-segments/passive-segments.component';
import {
  AccordionModule,
  ModalModule,
  TabsModule,
  BsDatepickerModule,
  BsDropdownModule
} from 'ngx-bootstrap';
import { UpdateAccountingRemarkComponent } from './payments/update-accounting-remark/update-accounting-remark.component';
import { AccountingRemarkComponent } from './payments/accounting-remark/accounting-remark.component';
import { LeisureFeeComponent } from './payments/leisure-fee/leisure-fee.component';
import { ItcPackageComponent } from './remarks/itc-package/itc-package.component';
import { CCDateExpMaskDirective } from './directives/cc-date-exp-mask.directive';
import { AmountMaskDirective } from './directives/amount-mask.directive';
import { NumberOnlyMaskDirective } from './directives/number-only-mask.directive';
import { AlphaNumericMaskDirective } from './directives/alpha-numeric-mask.directive';
import { ConciergeUdidsComponent } from './reporting/concierge-udids/concierge-udids.component';
import { AmountPipe } from './pipes/amount.pipe';
import { CancelSegmentComponent } from './cancel-segment/cancel-segment.component';
import { SegmentsComponent } from './passive-segments/segments/segments.component';
import { UpdateSegmentComponent } from './passive-segments/update-segment/update-segment.component';
import { AllCapsMaskDirective } from './directives/all-caps-mask.directive';
import { MessageComponent } from './shared/message/message.component';
import { CodeshareComponent } from './remarks/codeshare/codeshare.component';
import { SegmentSelectComponent } from './shared/segment-select/segment-select.component';
import { AlphaMaskDirective } from './directives/alpha-only-mask.directive';
import { VisaPassportComponent } from './remarks/visa-passport/visa-passport.component';
import { MatrixInvoiceComponent } from './invoice/matrix-invoice.component';
import { PassengerSelectComponent } from './shared/passenger-select/passenger-select.component';
import { FareRuleSegmentComponent } from './remarks/fare-rule-segment/fare-rule-segment.component';
import { UpdateFareRuleSegmentComponent } from './remarks/update-fare-rule-segment/update-fare-rule-segment.component';
import { RbcPointsRedemptionComponent } from './remarks/rbc-points-redemption/rbc-points-redemption.component';
import { UpdateRbcPointsRedemptionComponent } from './remarks/update-rbc-points-redemption/update-rbc-points-redemption.component';
import { UpdateLeisureFeeComponent } from './payments/update-leisure-fee/update-leisure-fee.component';
import { ItineraryComponent } from './itinerary-and-queue/itinerary/itinerary.component';
import { ItineraryAndQueueComponent } from './itinerary-and-queue/itinerary-and-queue.component';
import { QueueComponent } from './itinerary-and-queue/queue/queue.component';



@NgModule({
  declarations: [
    AppComponent,
    LeisureComponent,
    ReportingComponent,
    PassiveSegmentsComponent,
    RemarkComponent,
    TourPackageComponent,
    PaymentComponent,
    MatrixReceiptComponent,
    UpdateMatrixReceiptComponent,
    PassiveSegmentsComponent,
    UpdateAccountingRemarkComponent,
    AccountingRemarkComponent,
    LeisureFeeComponent,
    ItcPackageComponent,
    CCDateExpMaskDirective,
    AmountMaskDirective,
    NumberOnlyMaskDirective,
    AlphaNumericMaskDirective,
    AllCapsMaskDirective,
    ConciergeUdidsComponent,
    AmountPipe,
    CancelSegmentComponent,
    SegmentsComponent,
    UpdateSegmentComponent,
    MessageComponent,
    VisaPassportComponent,
    CodeshareComponent,
    SegmentSelectComponent,
    AlphaMaskDirective,
    FareRuleSegmentComponent,
    UpdateFareRuleSegmentComponent,
    MatrixInvoiceComponent,
    PassengerSelectComponent,
    RbcPointsRedemptionComponent,
    UpdateRbcPointsRedemptionComponent,
    UpdateLeisureFeeComponent,
    ItineraryComponent,
    ItineraryAndQueueComponent,
    QueueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    // ,{ provide: TourPackageRemarksService }
  ],
  bootstrap: [AppComponent],
  exports: [
    CCDateExpMaskDirective,
    AmountMaskDirective,
    NumberOnlyMaskDirective,
    AlphaNumericMaskDirective,
    AllCapsMaskDirective,
    AlphaMaskDirective
  ],
  entryComponents: [
    UpdateMatrixReceiptComponent,
    UpdateAccountingRemarkComponent,
    UpdateSegmentComponent,
    MessageComponent,
    UpdateFareRuleSegmentComponent,
    UpdateRbcPointsRedemptionComponent,
    UpdateLeisureFeeComponent
  ]
})
export class AppModule { }
