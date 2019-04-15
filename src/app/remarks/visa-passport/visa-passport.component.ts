import { Component, OnInit, Input, ViewChild  } from '@angular/core';
import { DDBService } from 'src/app/service/ddb.service';
import { VisaPassportModel } from '../../models/visa-passport-view.model';
import { PnrService } from 'src/app/service/pnr.service';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
declare var smartScriptSession: any;

@Component({
  selector: 'app-visa-passport',
  templateUrl: './visa-passport.html',
  styleUrls: ['./visa-passport.component.scss']
})

export class VisaPassportComponent implements OnInit {

  @Input()
  visaPassportView: VisaPassportModel;
  visaPassportFormGroup: FormGroup;
  travelPort: any[];
  hasRemarkLine: string;
  segments = [];

  constructor(private fb: FormBuilder, private ddbService: DDBService, private pnrService: PnrService ) {
  }

  ngOnInit() {
    this.visaPassportView = new VisaPassportModel();
    this.visaPassportFormGroup = new FormGroup({
      originDestination: new FormControl('', []),
      citizenship: new FormControl('', []),
      advisory : new FormControl('', []),
      travellerName: new FormControl('', []),
      segments: new FormArray([]),
    });

    if ( this.pnrService.isPNRLoaded) {
        if (!this.getAdvisoryLine()) {
          this.enableFormControls(['originDestination'], false);
        } else {
          this.enableFormControls(['originDestination'], true);
        }
        this.getVisaTrips();
        this.startSmartTool();
      }
  }

  startSmartTool(): void {
    this.pnrService.startSmartTool();
  }

  changedOriginDestination() {
    const originDestination = this.f.originDestination.value;
    if (originDestination === 'true') {
      this.enableFormControls(['citizenship'], false);
      this.getCitizenship();
      if (!this.getAdvisoryLine()) {
        this.enableFormControls(['advisory'], false);
      }
      this.enableFormControls(['travellerName'] , false);
    } else {
      this.enableFormControls(['citizenship'], true);
      this.enableFormControls(['advisory'], true);
      this.enableFormControls(['travellerName'] , true);
    }
  }

  get f() {
    return this.visaPassportFormGroup.controls;
  }

  enableFormControls(controls: string[], disabled: boolean) {
    controls.forEach(c => {
      if (disabled) {
        this.visaPassportFormGroup.get(c).disable();
        this.visaPassportFormGroup.get(c).reset();
      } else {
        this.visaPassportFormGroup.get(c).enable();
      }
    });
  }

  getVisaTrips() {
    const originDestination = [{ origin: '', destination: '', departuredate: '' }];
    if (this.pnrService.isPNRLoaded) {
     for (const air of this.pnrService.pnrObj.airSegments) {
       const departureCountry = this.ddbService.getCityCountry(air.departureAirport).country;
       const arrivalCountry =  this.ddbService.getCityCountry(air.arrivalAirport).country;
       originDestination.push( {origin: departureCountry, destination: arrivalCountry, departuredate: air.departureDate} );
     }

     const countryList = [{country: '', passport: '', visa: '', segmentLine: ''}];
     // tslint:disable-next-line:prefer-for-of
     for (let i = 1;  i < originDestination.length; i++ ) {
      const mainOrigin = originDestination[1].origin;
      let exclude: string;
      if (mainOrigin === originDestination[originDestination.length - 1].destination) {
         exclude = mainOrigin;
      }

      if (originDestination[i].destination !== exclude &&
          countryList.findIndex(x => x.country === originDestination[i].destination) === -1) {
        countryList.push({country: originDestination[i].destination, passport: '', visa: '', segmentLine: ''});
      }
     }
     countryList.splice(0 , 1);
     this.segments = countryList;

     const segmentArray = this.visaPassportFormGroup.controls.segments as FormArray;

     this.segments.forEach(x => {
       segmentArray.push(this.fb.group({
         country: x.country,
         passport: x.passport,
         visa: x.visa,
         segmentLine: x.segmentLine
       }));
     });
   }
 }

 passportChanged() {
 // this.visaPassportView = (this.f.showInsurance.value === 'Yes');
}

 visaChanged() {
  //this.visaPassportView.showInsurance = (this.f.showInsurance.value === 'Yes');
}


 getCitizenship() {
    let citizenship: string;
    let country: string;
    citizenship = this.pnrService.getRemarkText('CITIZENSHIP-');
    if (citizenship !== '') {
      citizenship = citizenship.substr(12, 3);
      country = this.ddbService.getCitizenship(citizenship).country;
      this.f.citizenship.setValue(country);
    }
}

getAdvisoryLine(): boolean {
  this.hasRemarkLine = this.pnrService.getRemarkLineNumber('INTERNATIONAL TRAVEL ADVISORY SENT');
  if (this.hasRemarkLine !== '') {
    return true;
  } else {
    return false;
  }
}
}
