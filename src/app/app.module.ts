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
import { TourpackageComponent } from './remark/tourpackage/tourpackage.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import {NgbModule, NgbActiveModal,NgbDateAdapter, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import { MatrixReceiptComponent } from './payment/matrix-receipt/matrix-receipt.component';
import { UpdateMatrixReceiptComponent } from './payment/update-matrix-receipt/update-matrix-receipt.component';
import { TourSegmentComponent } from './passive-segments/tour-segment/tour-segment.component';
import { UpdateTourSegmentComponent } from './passive-segments/update-tour-segment/update-tour-segment.component';
import { PassiveSegmentsComponent } from './passive-segments/passive.segments.component';
import { AccordionComponent } from './shared/accordion/accordion.component';


@NgModule({
  declarations: [
    AppComponent,
    LeisureComponent,
    ReportingComponent,
    RemarkComponent,
    TourpackageComponent,
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
   HttpClientModule    ,
   NgbModule 
  ],
  providers: [{provide: HTTP_INTERCEPTORS,useClass: AuthInterceptor,multi:true},NgbActiveModal,
    {		
        provide: NgbDateAdapter,		
        useClass: NgbDateNativeAdapter		
    }
  ],
  bootstrap: [AppComponent],
  exports:[],
  entryComponents: [UpdateMatrixReceiptComponent, UpdateTourSegmentComponent]
})
export class AppModule { }
