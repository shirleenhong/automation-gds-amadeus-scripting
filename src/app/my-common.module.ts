import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmountMaskDirective } from './directives/amount-mask.directive';
import { CCDateExpMaskDirective } from './directives/cc-date-exp-mask.directive';
import { NumberOnlyMaskDirective } from './directives/number-only-mask.directive';
import { AlphaNumericMaskDirective } from './directives/alpha-numeric-mask.directive';
import { AllCapsMaskDirective } from './directives/all-caps-mask.directive';
import { AlphaMaskDirective } from './directives/alpha-only-mask.directive';
import { SegmentSelectComponent } from './shared/segment-select/segment-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AccordionModule, ModalModule, TabsModule, BsDatepickerModule, BsDropdownModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AmountMaskDirective,
    CCDateExpMaskDirective,
    NumberOnlyMaskDirective,
    AlphaNumericMaskDirective,
    AllCapsMaskDirective,
    AlphaMaskDirective,
    SegmentSelectComponent],
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
  exports: [AmountMaskDirective,
    CCDateExpMaskDirective,
    NumberOnlyMaskDirective,
    AlphaNumericMaskDirective,
    AllCapsMaskDirective,
    AlphaMaskDirective,
    SegmentSelectComponent],
})
export class MyCommonModule { }
