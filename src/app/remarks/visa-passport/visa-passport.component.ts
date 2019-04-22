import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DDBService } from 'src/app/service/ddb.service';
import { VisaPassportModel } from '../../models/visa-passport-view.model';
import { PnrService } from 'src/app/service/pnr.service';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
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
  segmentGroup: FormGroup;
  travelPort: any[];
  hasRemarkLine: string;
  segments = [];
  passport: true;
  visa: false;

  constructor(private fb: FormBuilder, private ddbService: DDBService, private pnrService: PnrService) {
  }

  ngOnInit() {
    this.visaPassportView = new VisaPassportModel();
    this.visaPassportFormGroup = new FormGroup({
      originDestination: new FormControl('', []),
      citizenship: new FormControl('', [Validators.required]),
      advisory: new FormControl('', []),
      btnAdvisory: new FormControl('', []),
      passportName: new FormControl('', [Validators.required]),
      segments: new FormArray([]),
    });
    this.segmentGroup = this.fb.group({
      passport: new FormControl('', [Validators.required]),
      visa: new FormControl('', [Validators.required]),
      segmentLine: new FormControl('', [Validators.required]),
    });

    if (this.pnrService.isPNRLoaded) {
      if (!this.getAdvisoryLine()) {
        this.enableFormControls(['originDestination'], false);
      } else {
        this.enableFormControls(['originDestination'], true);
      }
      this.getVisaTrips();
    }
  }

  changedAdvisory(): void {
     this.visaPassportView.advisory = this.f.advisory.value === 'Yes';
  }

  showTravelAdvisory(): void {
    const _popupId = smartScriptSession.getPopupId();
    smartScriptSession.requestService('popups.launchSmartTool', { popupId: _popupId, smartToolName: 'Traveladvisory' })
      .then(function (data) {
        console.log(data);
      }, function (error) {
        console.log(error);
      });
  }

  changedOriginDestination() {
    debugger;
    const originDestination = this.f.originDestination.value;
    if (originDestination === 'true') {
      this.enableFormControls(['citizenship'], false);
      this.getCitizenship();
      if (!this.getAdvisoryLine()) {
        this.enableFormControls(['advisory'], false);
      }
      this.enableFormControls(['passportName'], false);
      this.visaPassportFormGroup.get('segments').enable();
    } else {
      this.enableFormControls(['citizenship'], true);
      this.enableFormControls(['advisory'], true);
      this.enableFormControls(['passportName'], true);
      this.visaPassportFormGroup.get('segments').disable();
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

  private getFirstDate(airdate: any, firstDepDate: Date) {
    const lairdate = new Date(airdate.substr(2, 2) + '/' + airdate.substr(0, 2) + '/' + airdate.substr(4, 2));
    if (lairdate < firstDepDate) {
      firstDepDate = lairdate;
    }
    return firstDepDate;
  }

  private getLastDate(airdate: any, lastDepDate: Date) {
    const lairdate = new Date(airdate.substr(2, 2) + '/' + airdate.substr(0, 2) + '/' + airdate.substr(4, 2));
    if (lairdate > lastDepDate) {
      lastDepDate = lairdate;
    }
    return lastDepDate;
  }

  getVisaTrips() {
    const originDestination = [{ origin: '', destination: '', departuredate: '', segment: '' }];
    let firstDepDate = new Date();
    let lastDepDate = new Date();
    let firstLoop = true;
    let lastLoop = true;

    if (this.pnrService.isPNRLoaded) {
      const countryList = [{ country: '', passport: '' , visa: '', segmentLine: '' }];
      for (const air of this.pnrService.pnrObj.airSegments) {
        const departureCountry = this.ddbService.getCityCountry(air.departureAirport).country;
        const arrivalCountry = this.ddbService.getCityCountry(air.arrivalAirport).country;
        const airdate = air.departureDate;

        if (firstLoop) {
          firstDepDate = new Date(airdate.substr(2, 2) + '/' + airdate.substr(0, 2) + '/' + airdate.substr(4, 2));
          firstLoop = false;
        } else {
          firstDepDate = this.getFirstDate(airdate, firstDepDate);
        }

        if (lastLoop) {
          lastDepDate = new Date(airdate.substr(2, 2) + '/' + airdate.substr(0, 2) + '/' + airdate.substr(4, 2));
          lastLoop = false;
        } else {
          lastDepDate = this.getLastDate(airdate, lastDepDate);
        }

        // tslint:disable-next-line:max-line-length
        originDestination.push({ origin: departureCountry, destination: arrivalCountry, departuredate: air.departureDate, segment: air.elementNumber });
      }

      let convertedDate = new Date();
      let mainOrigin: string;
      let mainDestination: string;
      let excludeCity: string;

      for (let i = 1; i < originDestination.length; i++) {
        // tslint:disable-next-line:max-line-length
        convertedDate = new Date(originDestination[i].departuredate.substr(2, 2) + '/' + originDestination[i].departuredate.substr(0, 2) + '/' + originDestination[i].departuredate.substr(4, 2));
        if (convertedDate.toDateString() === firstDepDate.toDateString()) {
          mainOrigin = originDestination[i].origin;
        }
        if (convertedDate.toDateString() === lastDepDate.toDateString()) {
          mainDestination = originDestination[i].destination;
        }
      }

      if (mainOrigin === mainDestination) {
        excludeCity = mainOrigin;
      } else {
        excludeCity = '';
      }
      // tslint:disable-next-line:prefer-for-of
      for (let i = 1; i < originDestination.length; i++) {
        if (originDestination[i].destination !== excludeCity &&
          countryList.findIndex(x => x.country === originDestination[i].destination) === -1) {
          // tslint:disable-next-line:max-line-length
          countryList.push({ country: originDestination[i].destination, passport: '' , visa: '', segmentLine: originDestination[i].segment });
        }
      }
      countryList.splice(0, 1);
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
