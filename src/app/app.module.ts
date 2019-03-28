import { BrowserModule } from '@angular/platform-browser';
import { NgModule, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
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
import { TourSegmentComponent } from './passive-segments/tour-segment/tour-segment.component';
import { UpdateTourSegmentComponent } from './passive-segments/update-tour-segment/update-tour-segment.component';
import { PassiveSegmentsComponent } from './passive-segments/passive-segments.component';
import { AccordionComponent } from './shared/accordion/accordion.component';

import { AccordionModule, ModalModule, TabsModule, BsDatepickerModule } from 'ngx-bootstrap';
import { UpdateAccountingRemarkComponent } from './payments/update-accounting-remark/update-accounting-remark.component';
import { AccountingRemarkComponent } from './payments/accounting-remark/accounting-remark.component';
// import { TourPackageRemarksService } from './service/tour-package-remarks.service';
import { LeisureFeeComponent } from './payments/leisure-fee/leisure-fee.component';
import { ItcPackageComponent } from './remarks/itc-package/itc-package.component';
import { CCDateExpMaskDirective } from './directives/cc-date-exp-mask.directive';
import { AmountMaskDirective } from './directives/amount-mask.directive';
import { NumberOnlyMaskDirective } from './directives/number-only-mask.directive';



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
    TourSegmentComponent,
    UpdateTourSegmentComponent,
    PassiveSegmentsComponent,
    AccordionComponent,
    UpdateAccountingRemarkComponent,
    AccountingRemarkComponent,
    LeisureFeeComponent,
    ItcPackageComponent,
    CCDateExpMaskDirective, AmountMaskDirective, NumberOnlyMaskDirective

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
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    // ,{ provide: TourPackageRemarksService }
  ],
  bootstrap: [AppComponent],
  exports: [CCDateExpMaskDirective, AmountMaskDirective, NumberOnlyMaskDirective],
  entryComponents: [UpdateMatrixReceiptComponent, UpdateTourSegmentComponent, UpdateAccountingRemarkComponent]
})
export class AppModule { }
