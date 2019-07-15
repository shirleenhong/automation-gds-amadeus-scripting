import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'bpg-gds-scripting-amadeus';
  isCorporate = false;
  constructor(private location: Location) {}
  url = '';
  ngOnInit(): void {
    this.isCorporate = this.location.path().indexOf('corporate') > 0;
  }
}
