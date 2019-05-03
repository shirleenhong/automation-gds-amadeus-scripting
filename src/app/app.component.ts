import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { setTheme } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bpg-gds-scripting-amadeus';
  segmentForm: FormGroup;
  depDate = 'Departure Date';
  constructor() {

    this.segmentForm = new FormGroup({
      vendorName: new FormControl('', [Validators.required]),
      departureDate: new FormControl('', [Validators.required]),
      arrivalDate: new FormControl('', [Validators.required]),
    });
  }

}
