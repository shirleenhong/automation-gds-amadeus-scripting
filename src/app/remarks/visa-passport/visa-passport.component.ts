import { Component, OnInit, Input } from '@angular/core';
import { SelectItem } from 'src/app/models/select-item.model';
import { DDBService } from 'src/app/service/ddb.service';
import { VisaPassportModel } from 'src/app/models/visa-passport.model';
import { PnrService } from 'src/app/service/pnr.service';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { of } from 'rxjs';

@Component({
  selector: 'app-visa-passport',
  templateUrl: './visa-passport.html',
  styleUrls: ['./visa-passport.component.scss']
})

export class VisaPassportComponent implements OnInit {
  @Input()
  formGroup: FormGroup;
  visaPassportModelView: VisaPassportModel;
  travelPort: any[];
  hasRemarkLine: string;
  datePipe = new DatePipe('en-US');
  segments = [];

  constructor(private fb: FormBuilder, private ddbService: DDBService, private pnrService: PnrService ) {
    this.formGroup = this.fb.group({
      originDestination: new FormControl('', []),
      citizenship: new FormControl('', []),
      advisory : new FormControl('', []),
      travellerName: new FormControl('', []),
      segments: new FormArray([], []),
    });
  }

  ngOnInit() {
    if ( this.pnrService.isPNRLoaded) {
        if (!this.getAdvisoryLine()) {
          this.enableFormControls(['originDestination'], false);
        } else {
          this.enableFormControls(['originDestination'], true);
        }
        this.getVisaTrips();
        // tslint:disable-next-line:max-line-length
        // window.open('https://www.etraveladvisories.com/agent.html?POPUP_ID=smarTool_YGMnAMztuXbHrayudbpsjKqTmmPWatnv&EXTERNAL_CATALOG_VERSION=21.5.1', '_blank');
    }
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
    return this.formGroup.controls;
  }

  enableFormControls(controls: string[], disabled: boolean) {
    controls.forEach(c => {
      if (disabled) {
        this.formGroup.get(c).disable();
        this.formGroup.get(c).reset();
      } else {
        this.formGroup.get(c).enable();
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
          countryList.findIndex(x => x.country === originDestination[i].destination) === -1){
        countryList.push({country: originDestination[i].destination, passport: '', visa: '', segmentLine: ''});
      }
     }
     countryList.splice(0 , 1);
     this.segments = countryList;

     this.segments.map((o, i) => {
      const control = new FormControl(i === 0);
      (this.formGroup.controls.segments as FormArray).push(control);
    });
   }
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
