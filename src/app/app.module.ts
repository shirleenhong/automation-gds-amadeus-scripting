import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeisureComponent } from './leisure/leisure.component';
import { ReportingComponent } from './reporting/reporting.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PassiveSegmentsComponent } from './passive-segments/passive-segments.component';
import { TabsComponent } from './shared/tabs/tabs.component';
import { TabComponent } from './shared/tabs/tab.component';
import { DynamicTabsDirective } from './shared/tabs/dynamic-tabs.directive';
import { SegmentEditComponent } from './segments/segment-edit.component';
import { SegmentsListComponent } from './segments/segments-list.component';
import { PaymentComponent } from './payment/payment.component';
import { ReceiptEditComponent } from './receipts/receipt-edit.component';
import { ReceiptsListComponent } from './receipts/receipts-list.component';
import { RemarkComponent } from './remark/remark.component';
import { TourpackageComponent } from './remark/tourpackage/tourpackage.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import {NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { MatrixReceiptComponent } from './payment/matrix-receipt/matrix-receipt.component';
import { UpdateMatrixReceiptComponent } from './payment/update-matrix-receipt/update-matrix-receipt.component';

@NgModule({
  declarations: [
    AppComponent,
    LeisureComponent,
    ReportingComponent,
    PassiveSegmentsComponent,
    TabsComponent,
    TabComponent,
    DynamicTabsDirective,
    SegmentEditComponent,
    SegmentsListComponent,  
    RemarkComponent,
    TourpackageComponent,
    PaymentComponent,
    ReceiptEditComponent,
    ReceiptsListComponent,
    MatrixReceiptComponent,
    UpdateMatrixReceiptComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,  
   HttpClientModule    ,
   NgbModule 
  ],
  providers: [{provide: HTTP_INTERCEPTORS,useClass: AuthInterceptor,multi:true},NgbActiveModal],
  bootstrap: [AppComponent],
  exports:[],
  entryComponents: [TabComponent,UpdateMatrixReceiptComponent]
})
export class AppModule { }
