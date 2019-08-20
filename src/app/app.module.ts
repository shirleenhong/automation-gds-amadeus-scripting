import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppLeisureModule } from './app.leisure.module';
import { AppCorporateModule } from './app.corporate.module';

@NgModule({
  declarations: [AppComponent],
  imports: [AppLeisureModule, AppCorporateModule, BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
  entryComponents: []
})
export class AppModule {}
