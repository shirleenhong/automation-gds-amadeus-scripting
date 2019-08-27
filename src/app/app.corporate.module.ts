import { NgModule } from '@angular/core';
import { CorporateComponent } from './corporate/corporate.component';
import { AccordionModule, ModalModule, TabsModule, BsDatepickerModule, BsDropdownModule } from 'ngx-bootstrap';
import { CommonModule } from '@angular/common';
import { PaymentsComponent } from './corporate/payments/payments.component';
import { ReportingBSPComponent } from './corporate/reporting/reporting-bsp/reporting-bsp.component';
import { ReportingComponent } from './corporate/reporting/reporting.component';
import { TicketingComponent } from './corporate/ticketing/ticketing.component';
import { AccountingRemarkComponent } from './corporate/payments/accounting-remark/accounting-remark.component';
import { UpdateAccountingRemarkComponent } from './corporate/payments/update-accounting-remark/update-accounting-remark.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    CorporateComponent,
    PaymentsComponent,
    AccountingRemarkComponent,
    UpdateAccountingRemarkComponent,
    ReportingComponent,
    ReportingBSPComponent,
    TicketingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [],
  exports: [CorporateComponent],
  entryComponents: [UpdateAccountingRemarkComponent]
})
export class AppCorporateModule {}
