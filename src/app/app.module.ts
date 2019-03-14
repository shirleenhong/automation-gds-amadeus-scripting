import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeisureComponent } from './leisure/leisure.component';
import { AccordionComponent } from './shared/accordion/accordion.component';
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



@NgModule({
  declarations: [
    AppComponent,
    LeisureComponent,
    AccordionComponent,
    ReportingComponent,
    PassiveSegmentsComponent,
    TabsComponent,
    TabComponent,
    DynamicTabsDirective,
    SegmentEditComponent,
    SegmentsListComponent,
    PaymentComponent,
    ReceiptEditComponent,
    ReceiptsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule    
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports:[AccordionComponent],
  entryComponents: [TabComponent]
})
export class AppModule { }
