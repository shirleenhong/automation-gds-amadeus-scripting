import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SelectItem } from 'src/app/models/select-item.model';
import { DDBService } from 'src/app/service/ddb.service';
import { VisaPassportModel } from 'src/app/models/visa-passport.model';

@Component({
  selector: 'app-visa-passport',
  templateUrl: './visa-passport.html',
  styleUrls: ['./visa-passport.component.scss']
})

export class VisaPassportComponent implements OnInit {
  visaPassportForm: FormGroup;
  visaPassportModelView: VisaPassportModel;

  constructor(private fb: FormBuilder, private ddb: DDBService) {
    this.visaPassportForm = this.fb.group({
      originDestination: new FormControl('', []),
    });
  }

  ngOnInit() {
      this.f.originDestination.setValue('Yes');
  }

  changedOriginDestination() {
    this.visaPassportModelView.itineraryInSameCountry = this.f.originDestination.value;
  }

  get f() {
    return this.visaPassportForm.controls;
  }
}
