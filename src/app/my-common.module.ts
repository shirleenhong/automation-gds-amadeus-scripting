import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmountMaskDirective } from './directives/amount-mask.directive';
import { CCDateExpMaskDirective } from './directives/cc-date-exp-mask.directive';
import { NumberOnlyMaskDirective } from './directives/number-only-mask.directive';
import { AlphaNumericMaskDirective } from './directives/alpha-numeric-mask.directive';
import { AllCapsMaskDirective } from './directives/all-caps-mask.directive';
import { AlphaMaskDirective } from './directives/alpha-only-mask.directive';

@NgModule({
  declarations: [AmountMaskDirective,
    CCDateExpMaskDirective,
    NumberOnlyMaskDirective,
    AlphaNumericMaskDirective,
    AllCapsMaskDirective,
    AlphaMaskDirective],
  imports: [
    CommonModule
  ],
  exports: [AmountMaskDirective,
    CCDateExpMaskDirective,
    NumberOnlyMaskDirective,
    AlphaNumericMaskDirective,
    AllCapsMaskDirective,
    AlphaMaskDirective],
})
export class MyCommonModule { }
