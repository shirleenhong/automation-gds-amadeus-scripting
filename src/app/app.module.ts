import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeisureComponent } from './leisure/leisure.component';
import { ReportingComponent } from './reporting/reporting.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentComponent } from './payment/payment.component';
import { RemarkComponent } from './remark/remark.component';
import { TourPackageComponent } from './remark/tour-package/tour-package.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';

import { MatrixReceiptComponent } from './payment/matrix-receipt/matrix-receipt.component';
import { UpdateMatrixReceiptComponent } from './payment/update-matrix-receipt/update-matrix-receipt.component';
import { TourSegmentComponent } from './passive-segments/tour-segment/tour-segment.component';
import { UpdateTourSegmentComponent } from './passive-segments/update-tour-segment/update-tour-segment.component';
import { PassiveSegmentsComponent } from './passive-segments/passive.segments.component';
import { AccordionComponent } from './shared/accordion/accordion.component';

import { AccordionModule, ModalModule, TabsModule, BsDatepickerModule } from 'ngx-bootstrap';

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
    AccordionComponent
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
    BsDatepickerModule.forRoot()
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

  ],
  bootstrap: [AppComponent],
  exports: [],
  entryComponents: [UpdateMatrixReceiptComponent, UpdateTourSegmentComponent]
})
export class AppModule { }
