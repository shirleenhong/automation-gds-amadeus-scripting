import { Component, OnInit } from '@angular/core';
import { PlatformLocation } from '@angular/common';

declare var smartScriptSession: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'bpg-gds-scripting-amadeus';
  isCorporate = false;
  isMinimize = false;
  header = 'Leisure';
  constructor(private location: PlatformLocation) {}
  url = '';
  ngOnInit(): void {
    this.isCorporate = this.location.getBaseHrefFromDOM().indexOf('corporate') > 0;
    if (this.isCorporate) {
      this.header = 'Corporate';
    }
  }

  resize() {
    const width = 800;
    let height = 567;
    if (!this.isMinimize) {
      height = 32;
    }
    this.isMinimize = !this.isMinimize;

    smartScriptSession.resizeSmartTool({ id: smartScriptSession.getPopupId(), width, height }).then((x) => {
      console.log(JSON.stringify(x));
    });
  }
}
