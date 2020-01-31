import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppLeisureModule } from './app.leisure.module';
import { AppCorporateModule } from './app.corporate.module';
import { MyCommonModule } from './my-common.module';
import { ErrorService } from './log/error.service';

@NgModule({
  declarations: [AppComponent],
  imports: [AppLeisureModule, AppCorporateModule, BrowserModule, FormsModule, MyCommonModule],
  providers: [
    {
      provide: ErrorHandler,
      useClass: ErrorService
    }
  ],
  bootstrap: [AppComponent],
  exports: [],
  entryComponents: []
})
export class AppModule {}
