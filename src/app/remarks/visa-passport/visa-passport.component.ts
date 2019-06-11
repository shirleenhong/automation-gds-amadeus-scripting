import { Component, OnInit, Input } from '@angular/core';
import { DDBService } from 'src/app/service/ddb.service';
import { VisaPassportModel } from '../../models/visa-passport-view.model';
import { PnrService } from 'src/app/service/pnr.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { VisaPassportService } from 'src/app/service/visa-passport.service';
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
  departureCountry: string;
  arrivalCountry: string;
  advisoryClicked: boolean;
  citizenship: string;
  passportName: string;

  constructor(
    private fb: FormBuilder,
    private ddbService: DDBService,
    private pnrService: PnrService,
    private visaService: VisaPassportService
  ) {}

  ngOnInit() {
    this.visaPassportView = new VisaPassportModel();
    this.visaPassportFormGroup = new FormGroup({
      originDestination: new FormControl('', []),
      citizenship: new FormControl('', [Validators.required]),
      advisory: new FormControl('', []),
      btnAdvisory: new FormControl('', []),
      passportName: new FormControl('', [Validators.required]),
      segments: new FormArray([]),
      senttraveladvicory: new FormControl('', [])
    });
    this.segmentGroup = this.fb.group({
      passport: new FormControl('', [Validators.required]),
      visa: new FormControl('', [Validators.required]),
      segmentLine: new FormControl('', [Validators.required])
    });

    if (this.pnrService.isPNRLoaded) {
      let remarkText: string;
      this.visaPassportView.citizenship = this.pnrService.getRemarkText('CITIZENSHIP-').substr(12, 3);
      remarkText = this.pnrService.getRemarkText('ADVISED').substr(8, 30);
      this.visaPassportView.passportName = remarkText.substr(0, remarkText.indexOf('VALID') - 1);
      this.visaService.isEnabled = this.hasAdvisoryLine();
      this.getVisaTrips();
    }
  }

  changedAdvisory(): void {
    this.visaPassportView.advisory = this.f.advisory.value === 'Yes';
  }

  showTravelAdvisory(): void {
    this.advisoryClicked = true;
    this.visaService.isEnabled = true;
    // tslint:disable-next-line: variable-name
    const _popupId = smartScriptSession.getPopupId();
    smartScriptSession
      .requestService('popups.launchSmartTool', {
        popupId: _popupId,
        smartToolName: 'Traveladvisory'
      })
      .then(
        // tslint:disable-next-line: only-arrow-functions
        function(data) {
          console.log(data);
        },
        // tslint:disable-next-line: only-arrow-functions
        function(error) {
          console.log(error);
        }
      );
  }

  showSentTravelAdvisory(checkValue): void {
    if (checkValue) {
      this.visaService.isEnabled = true;
    } else if (!this.advisoryClicked) {
      this.visaService.isEnabled = false;
    }
  }

  changedOriginDestination() {
    if (!this.hasAdvisoryLine()) {
      this.enableFormControls(['advisory'], false);
    }
    this.visaPassportFormGroup.get('segments').enable();
    let items: any;
    // tslint:disable-next-line:no-string-literal
    items = this.visaPassportFormGroup.get('segments')['controls'];

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < items.length; i++) {
      items[i].controls.country.disable();
      items[i].controls.segmentLine.disable();
      items[i].controls[this.newMethod()].disable();
    }
  }

  private newMethod() {
    return 'passport';
  }

  get f() {
    return this.visaPassportFormGroup.controls;
  }

  enableFormControls(controls: string[], disabled: boolean) {
    controls.forEach((c) => {
      if (disabled) {
        this.visaPassportFormGroup.get(c).disable();
        this.visaPassportFormGroup.get(c).reset();
      } else {
        this.visaPassportFormGroup.get(c).enable();
      }
    });
  }

  hasInternationalFlights(): boolean {
    // let firstDepDate = new Date();
    // let firstLoop = true;
    let cityCountry: string;
    if (this.pnrService.isPNRLoaded) {
      const destinations = Array<string>();
      this.pnrService.pnrObj.airSegments.forEach((x) => {
        cityCountry = this.ddbService.getCityCountry(x.arrivalAirport).country;
        if (this.ddbService.getCityCountry(x.arrivalAirport) !== '') {
          destinations.push(cityCountry);
        }

        cityCountry = this.ddbService.getCityCountry(x.departureAirport).country;
        if (this.ddbService.getCityCountry(x.departureAirport) !== '') {
          destinations.push(cityCountry);
        }

        //   const airdate = x.departureDate;
        //   if (firstLoop) {
        //     firstDepDate = new Date(x.departureDate.substr(2, 2)
        // + '/' + x.departureDate.substr(0, 2) + '/' + x.departureDate.substr(4, 2));
        //     firstLoop = false;
        //   } else {
        //     firstDepDate = this.getFirstDate(airdate, firstDepDate);
        //   }
        // });

        // let countryOrigin: string;
        // this.pnrService.pnrObj.airSegments.forEach(x => {
        //   let depDate = new Date();
        //   depDate = new Date(x.departureDate.substr(2, 2) + '/' + x.departureDate.substr(0, 2) + '/' + x.departureDate.substr(4, 2));
        //   if (depDate.toDateString() === firstDepDate.toDateString()) {
        //     if (this.ddbService.getCityCountry(x.departureAirport) !== '') {
        //  countryOrigin = this.ddbService.getCityCountry(x.departureAirport).country;
        // }
        //   }
      });

      let hasInternationalFlight: boolean;
      destinations.forEach((x) => {
        if (x !== 'Canada' && x !== 'United States') {
          hasInternationalFlight = true;
        }
      });
      return hasInternationalFlight;
    }
  }

  getFirstDate(airdate: any, firstDepDate: Date) {
    const lairdate = new Date(airdate.substr(2, 2) + '/' + airdate.substr(0, 2) + '/' + airdate.substr(4, 2));
    if (lairdate < firstDepDate) {
      firstDepDate = lairdate;
    }
    return firstDepDate;
  }

  getLastDate(airdate: any, lastDepDate: Date) {
    const lairdate = new Date(airdate.substr(2, 2) + '/' + airdate.substr(0, 2) + '/' + airdate.substr(4, 2));
    if (lairdate > lastDepDate) {
      lastDepDate = lairdate;
    }
    return lastDepDate;
  }

  async getVisaTrips() {
    const originDestination = [
      {
        origin: '',
        destination: '',
        departuredate: '',
        tatooNumber: '',
        segmentLine: ''
      }
    ];
    let firstDepDate = new Date();
    let lastDepDate = new Date();
    let firstLoop = true;
    let lastLoop = true;

    if (this.pnrService.isPNRLoaded) {
      const countryList = [
        {
          country: '',
          passport: true,
          visa: true,
          tatooNumber: '',
          segmentLine: ''
        }
      ];
      for (const air of this.pnrService.pnrObj.airSegments) {
        // debugger;
        // await this.ddbService.getTravelPort(air.departureAirport).then(x => {
        //   const c = JSON.stringify(x);
        //   let obj: any;
        //   obj = JSON.parse(c);
        //   this.departureCountry = obj[0].countryName;
        // });
        // await this.ddbService.getTravelPort(air.arrivalAirport).then(x => {
        //   const c = JSON.stringify(x);
        //   let obj: any;
        //   obj = JSON.parse(c);
        //   this.arrivalCountry = obj[0].countryName;
        // test
        if (this.ddbService.getCityCountry(air.departureAirport) === '') {
          this.departureCountry = '';
        } else {
          this.departureCountry = this.ddbService.getCityCountry(air.departureAirport).country;
        }
        if (this.ddbService.getCityCountry(air.arrivalAirport) === '') {
          this.arrivalCountry = '';
        } else {
          this.arrivalCountry = this.ddbService.getCityCountry(air.arrivalAirport).country;
        }
        // });
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

        originDestination.push({
          origin: this.departureCountry,
          destination: this.arrivalCountry,
          departuredate: air.departureDate,
          tatooNumber: air.tatooNumber,
          segmentLine: air.elementNumber
        });
      }
      let convertedDate = new Date();
      let mainOrigin: string;
      let mainDestination: string;
      let excludeCity: string;

      for (let i = 1; i < originDestination.length; i++) {
        convertedDate = new Date(
          originDestination[i].departuredate.substr(2, 2) +
            '/' +
            originDestination[i].departuredate.substr(0, 2) +
            '/' +
            originDestination[i].departuredate.substr(4, 2)
        );
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

      for (let i = 1; i < originDestination.length; i++) {
        if (originDestination[i].destination !== excludeCity) {
          if (countryList.findIndex((x) => x.country === originDestination[i].destination) === -1) {
            countryList.push({
              country: originDestination[i].destination,
              passport: true,
              visa: this.getVisaChecked(originDestination[i].destination),
              tatooNumber: originDestination[i].tatooNumber,
              segmentLine: originDestination[i].segmentLine
            });
          } else {
            let index: number;
            index = countryList.findIndex((x) => x.country === originDestination[i].destination);
            countryList[index].segmentLine = countryList[index].segmentLine + ',' + originDestination[i].segmentLine;
            countryList[index].tatooNumber = countryList[index].tatooNumber + ',' + originDestination[i].tatooNumber;
          }
        }
      }
      countryList.splice(0, 1);
      this.segments = countryList;

      const segmentArray = this.visaPassportFormGroup.controls.segments as FormArray;
      this.segments.forEach((x) => {
        segmentArray.push(
          this.fb.group({
            country: x.country,
            passport: x.passport,
            visa: x.visa,
            tatooNumber: x.tatooNumber,
            segmentLine: x.segmentLine
          })
        );
      });
      this.changedOriginDestination();
    }
  }

  getVisaChecked(destination: string): boolean {
    const pnr = this.pnrService.pnrObj;
    const rem = destination.toUpperCase() + ' - A VALID PASSPORT AND VISA ARE REQUIRED';
    let hasVisa: boolean;
    hasVisa = false;
    pnr.rirElements.forEach((x) => {
      if (x.fullNode.miscellaneousRemarks.remarks.freetext === rem) {
        hasVisa = true;
      }
    });
    return hasVisa;
  }

  hasAdvisoryLine(): boolean {
    this.hasRemarkLine = this.pnrService.getRemarkLineNumber('INTERNATIONAL TRAVEL ADVISORY SENT');
    if (this.hasRemarkLine !== '') {
      this.advisoryClicked = true;
      return true;
    } else {
      return false;
    }
  }
}
