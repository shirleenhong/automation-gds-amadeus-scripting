import { NgModule } from '@angular/core';
import { CorporateComponent } from './corporate/corporate.component';
import { AccordionModule, ModalModule, TabsModule, BsDatepickerModule, BsDropdownModule, AlertModule } from 'ngx-bootstrap';
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
import { MyCommonModule } from './my-common.module';
import { FeesComponent } from './corporate/fees/fees.component';
import { SupplementalFeesComponent } from './corporate/fees/supplemental-fees/supplemental-fees.component';
import { AddSupplementalFeesComponent } from './corporate/fees/add-supplemental-fees/add-supplemental-fees.component';
import { ReportingNonbspComponent } from './corporate/reporting/reporting-nonbsp/reporting-nonbsp.component';
import { AquaTicketingComponent } from './corporate/ticketing/aqua-ticketing/aqua-ticketing.component';
import { TicketingLineComponent } from './corporate/ticketing/ticketing-line/ticketing-line.component';
import { CorpRemarksComponent } from './corporate/corp-remarks/corp-remarks.component';
import { MatrixReportingComponent } from './corporate/reporting/matrix-reporting/matrix-reporting.component';
import { SeatsComponent } from './corporate/corp-remarks/seats/seats.component';
import { SeatsFormComponent } from './corporate/corp-remarks/seats/seats-form/seats-form.component';
import { WaiversComponent } from './corporate/reporting/waivers/waivers.component';
import { AddWaiverComponent } from './corporate/reporting/waivers/add-waiver/add-waiver.component';
import { ReportingRemarksComponent } from './corporate/reporting/reporting-remarks/reporting-remarks.component';

@NgModule({
  declarations: [
    CorporateComponent,
    PaymentsComponent,
    AccountingRemarkComponent,
    UpdateAccountingRemarkComponent,
    ReportingComponent,
    ReportingBSPComponent,
    ReportingNonbspComponent,
    TicketingComponent,
    FeesComponent,
    SupplementalFeesComponent,
    AddSupplementalFeesComponent,
    TicketingComponent,
    AquaTicketingComponent,
    TicketingLineComponent,
    CorpRemarksComponent,
    MatrixReportingComponent,
    SeatsComponent,
    SeatsFormComponent,
    WaiversComponent,
    AddWaiverComponent,
    ReportingRemarksComponent
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
    BsDropdownModule.forRoot(),
    MyCommonModule,
    AlertModule.forRoot()
  ],
  providers: [],
  bootstrap: [],
  exports: [CorporateComponent],
  entryComponents: [
    AddSupplementalFeesComponent,
    AddWaiverComponent,
    SeatsFormComponent,
    UpdateAccountingRemarkComponent
  ]
})
export class AppCorporateModule {}
