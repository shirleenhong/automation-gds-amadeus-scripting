import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SelectItem } from 'src/app/models/select-item.model';
import { DDBService } from 'src/app/service/ddb.service';
import { VisaPassportModel } from 'src/app/models/visa-passport.model';
import { PnrService } from 'src/app/service/pnr.service';

@Component({
  selector: 'app-visa-passport',
  templateUrl: './visa-passport.html',
  styleUrls: ['./visa-passport.component.scss']
})

export class VisaPassportComponent implements OnInit {
  visaPassportForm: FormGroup;
  visaPassportModelView: VisaPassportModel;
  travelPort: any[];

  constructor(private fb: FormBuilder, private ddbService: DDBService, private pnrService: PnrService ) {
    this.visaPassportForm = this.fb.group({
      originDestination: new FormControl('', []),
      citizenship: new FormControl('', [])
    });

  }

  ngOnInit() {
      this.f.originDestination.setValue('Yes');
      this.getVisaTrips();
  }

  changedOriginDestination() {
    this.visaPassportModelView.itineraryInSameCountry = this.f.originDestination.value;
  }

  get f() {
    return this.visaPassportForm.controls;
  }

  getVisaTrips() {
    const originDestination = [{ origin: '', destination: '', departuredate: '' }];
    if (this.pnrService.isPNRLoaded) {
     for (const air of this.pnrService.pnrObj.airSegments) {
       debugger;
       const departureCountry = this.ddbService.getCityCountry(air.departureAirport);
       const arrivalCountry =  this.ddbService.getCityCountry(air.arrivalAirport);
       const departureDate = air.departureDate;
     }
   }
 }
}
