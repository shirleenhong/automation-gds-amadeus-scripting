import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmountMaskDirective } from './directives/amount-mask.directive';
import { CCDateExpMaskDirective } from './directives/cc-date-exp-mask.directive';
import { NumberOnlyMaskDirective } from './directives/number-only-mask.directive';
import { AlphaNumericMaskDirective } from './directives/alpha-numeric-mask.directive';
import { AllCapsMaskDirective } from './directives/all-caps-mask.directive';
import { AlphaMaskDirective } from './directives/alpha-only-mask.directive';
import { TabOrderDirective } from './directives/tab-order.directive';
import { SegmentSelectComponent } from './shared/segment-select/segment-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AccordionModule, ModalModule, TabsModule, BsDatepickerModule, BsDropdownModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { VisaPassportComponent } from './shared/visa-passport/visa-passport.component';
import { SegmentsComponent } from './passive-segments/segments/segments.component';
import { PassiveSegmentsComponent } from './passive-segments/passive-segments.component';
import { ItineraryComponent } from './leisure/itinerary-and-queue/itinerary/itinerary.component';
import { GenericSelectComponent } from './shared/generic-select/generic-select.component';
import { CancelSegmentComponent } from './shared/cancel-segment/cancel-segment.component';
import { BspRefundComponent } from './corporate/corp-cancel/bsp-refund/bsp-refund.component';
import { NonBspTicketCreditComponent } from './corporate/corp-cancel/non-bsp-ticket-credit/non-bsp-ticket-credit.component';

@NgModule({
  declarations: [
    AmountMaskDirective,
    CCDateExpMaskDirective,
    NumberOnlyMaskDirective,
    AlphaNumericMaskDirective,
    AllCapsMaskDirective,
    AlphaMaskDirective,
    TabOrderDirective,
    SegmentSelectComponent,
    VisaPassportComponent,
    SegmentsComponent,
    PassiveSegmentsComponent,
    ItineraryComponent,
    GenericSelectComponent,
    CancelSegmentComponent,
    BspRefundComponent,
    NonBspTicketCreditComponent
  ],
  imports: [
    CommonModule,
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
  exports: [
    AmountMaskDirective,
    CCDateExpMaskDirective,
    NumberOnlyMaskDirective,
    AlphaNumericMaskDirective,
    AllCapsMaskDirective,
    AlphaMaskDirective,
    TabOrderDirective,
    SegmentSelectComponent,
    VisaPassportComponent,
    SegmentsComponent,
    PassiveSegmentsComponent,
    ItineraryComponent,
    GenericSelectComponent,
    CancelSegmentComponent
  ]
})
export class MyCommonModule {}
