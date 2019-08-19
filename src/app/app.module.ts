import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppLeisureModule } from './app.leisure.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppCorporateModule } from './app.corporate.module';

@NgModule({
  declarations: [AppComponent],
  imports: [AppLeisureModule, AppCorporateModule, BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
  entryComponents: []
})
export class AppModule { }
