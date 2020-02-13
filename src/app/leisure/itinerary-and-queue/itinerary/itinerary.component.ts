import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { SelectItem } from 'src/app/models/select-item.model';
import { PnrService } from 'src/app/service/pnr.service';
import { UtilHelper } from 'src/app/helper/util.helper';
import { CounselorDetail } from 'src/app/globals/counselor-identity';
import { RulesEngineService } from 'src/app/service/business-rules/rules-engine.service';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.scss']
})
export class ItineraryComponent implements OnInit {
  itineraryForm: FormGroup;
  add = true;
  remove = false;
  addservice = true;
  removeservice = false;
  addticket = true;
  removeticket = false;
  addoffer = true;
  removeoffer = false;
  listEmail: Array<string>;
  languageList: Array<SelectItem>;
  transactionTypeList: Array<SelectItem>;
  // itineraryRemarks: ItineraryModel;
  listRemark: Array<string>;
  displayMessage = '';
  isLeisure = true;

  @Input()
  workflow;

  constructor(
    private formBuilder: FormBuilder,
    private pnrService: PnrService,
    private utilHelper: UtilHelper,
    private counselorDetail: CounselorDetail,
    private rulesEngine: RulesEngineService
  ) {
    this.itineraryForm = new FormGroup({
      emailAddresses: new FormArray([this.createFormGroup()]),
      // sendItinerary: new FormControl('', []),
      language: new FormControl('', []),
      test: new FormControl('', []),
      typeTransaction: new FormControl('', []),
      services: new FormArray([this.createServiceFormGroup('SERVICE')]),
      tickets: new FormArray([this.createServiceFormGroup('TICKET')]),
      offers: new FormArray([this.createServiceFormGroup('OFFER')])
    });
  }

  ngOnInit() {
    this.listEmail = this.pnrService.getEmailAddressesFromGds();
    this.loadLanguageRemarks();
    this.readServiceFromPnr();
    this.loadTransactionType();
    this.readDefaultLanguage();
    this.loadRulesEngine();
    this.isLeisure = !this.counselorDetail.isCorporate || this.showTypeOfTransaction();
  }

  showTypeOfTransaction() {
    if (this.workflow === 'wrap') {
      return false;
    } else {
      return true;
    }
  }
  loadRulesEngine() {
    if (this.counselorDetail.isCorporate) {
      const rules = this.rulesEngine.getRuleWithEntities(['UI_DISPLAY_CONTAINER', 'UI_SEND_ITIN_ALLOWED_EMAIL_ENTRY']);
      rules.forEach((rule) => {
        if (rule.getResultEntityValue('UI_DISPLAY_CONTAINER') === 'Send Itinerary') {
          const allowedEmail = rule.getResultEntityValue('UI_SEND_ITIN_ALLOWED_EMAIL_ENTRY');
          if (allowedEmail) {
            this.itineraryForm.get('emailAddresses').valueChanges.subscribe(() => {
              if (this.itineraryForm.get('emailAddresses').value.length >= Number(allowedEmail)) {
                this.add = false;
              }
            });
          }
          if (Number(allowedEmail) === 1) {
            this.add = false;
          }
          const msg = rule.getResultEntityValue('UI_DISPLAY_MESSAGE').replace('\\t\\n', '<BR>');
          this.displayMessage += msg + '<BR>';
        }
      });
    }
  }

  loadLanguageRemarks() {
    this.languageList = [
      { itemText: '', itemValue: '' },
      { itemText: 'English', itemValue: 'EN-US' },
      { itemText: 'French', itemValue: 'FR-CA' }
    ];
    this.listRemark = ['SERVICE', 'TICKET', 'OFFER'];
  }

  loadTransactionType() {
    this.transactionTypeList = [
      { itemText: '', itemValue: '' },
      { itemText: 'Invoice', itemValue: 'invoice' },
      { itemText: 'Itinerary', itemValue: 'itinerary' }
    ];
    const offer = '/*' + 'OFFER' + '/*/*(?<service>(.*))/*';
    const regx = new RegExp(offer);
    const rems = this.pnrService.getRemarksFromGDSByRegex(regx, 'RIR');
    if (rems.length > 0) {
      this.itineraryForm.controls.typeTransaction.setValue('itinerary');
    } else {
      this.itineraryForm.controls.typeTransaction.setValue('invoice');
    }
  }

  createFormGroup(): FormGroup {
    const group = this.formBuilder.group({
      emailAddress: new FormControl('', [Validators.required, Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,64}')])
    });

    return group;
  }

  readDefaultLanguage() {
    const rirService = 'LANGUAGE-(EN-US|FR-CA)';
    const regx = new RegExp(rirService);
    const rems = this.pnrService.getRemarksFromGDSByRegex(regx, 'RM');
    if (rems.length > 0) {
      this.itineraryForm.controls.language.setValue(rems[0].remarkText.substr(-5));
    }
  }

  readServiceFromPnr() {
    this.listRemark.forEach((element) => {
      const rirService = '\\*' + element + '\\*\\*(?<service>(.*))\\*';
      const regx = new RegExp(rirService);
      const rems = this.pnrService.getRemarksFromGDSByRegex(regx, 'RIR');
      const items = this.itineraryForm.get(element.toLowerCase() + 's') as FormArray;
      if (rems.length > 0) {
        items.controls = [];
      }
      rems.forEach((r) => {
        // const index = r.remarkText.lastIndexOf('*SERVICE**');
        const match = regx.exec(r.remarkText);
        let retText = '';
        if (match !== null) {
          retText = match.groups.service;
        }
        if (element === 'SERVICE') {
          items.push(this.createServiceFormGroup(element, { service: retText }));
          this.removeservice = rems.length > 1;
        }
        if (element === 'TICKET') {
          items.push(this.createServiceFormGroup(element, { ticket: retText }));
          this.removeticket = rems.length > 1;
        }
        if (element === 'OFFER') {
          items.push(this.createServiceFormGroup(element, { offer: retText }));
          this.removeoffer = rems.length > 1;
        }
      });
    });
  }

  checkValid() {
    this.utilHelper.validateAllFields(this.itineraryForm);
    if (!this.itineraryForm.valid) {
      return false;
    }
    return true;
  }

  createServiceFormGroup(element?: any, defaultValue?: any): FormGroup {
    let group = this.formBuilder.group({});
    if (element === 'SERVICE') {
      group = this.formBuilder.group({
        service: new FormControl('', [])
      });
    }

    if (element === 'TICKET') {
      group = this.formBuilder.group({
        ticket: new FormControl('', [])
      });
    }
    if (element === 'OFFER') {
      group = this.formBuilder.group({
        offer: new FormControl('', [])
      });
    }

    if (defaultValue !== undefined && defaultValue !== null) {
      group.setValue(defaultValue);
    }
    return group;
  }

  get f() {
    return this.itineraryForm.controls;
  }

  showEmailAddress() {
    const arr = this.itineraryForm.get('emailAddresses') as FormArray;
    if (this.itineraryForm.get('sendItinerary').value) {
      for (const c of arr.controls) {
        c.get('emailAddress').setValidators([Validators.required, Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,64}')]);
      }
    } else {
      for (const c of arr.controls) {
        c.get('emailAddress').clearValidators();
        c.get('emailAddress').setValidators([Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,64}')]);
      }
    }
  }

  addItems(type) {
    const maxRows = 11;
    let items;
    switch (type) {
      case 'email':
        items = this.itineraryForm.controls.emailAddresses as FormArray;
        items.push(this.createFormGroup());
        if (items.length < maxRows) {
          this.add = true;
          this.remove = true;
        } else {
          this.add = false;
        }
        break;
      case 'service':
        items = this.itineraryForm.controls.services as FormArray;
        items.push(this.createServiceFormGroup('SERVICE'));
        if (items.length < maxRows) {
          this.addservice = true;
          this.removeservice = true;
        } else {
          this.addservice = false;
        }
        break;
      case 'ticket':
        items = this.itineraryForm.controls.tickets as FormArray;
        items.push(this.createServiceFormGroup('TICKET'));
        if (items.length < maxRows) {
          this.addticket = true;
          this.removeticket = true;
        } else {
          this.addticket = false;
        }
        break;
      case 'offer':
        items = this.itineraryForm.controls.offers as FormArray;
        items.push(this.createServiceFormGroup('OFFER'));
        if (items.length < maxRows) {
          this.addoffer = true;
          this.removeoffer = true;
        } else {
          this.addoffer = false;
        }
        break;
      default:
        break;
    }
  }

  removeItems(i, type) {
    let items;
    switch (type) {
      case 'email':
        items = this.itineraryForm.controls.emailAddresses as FormArray;
        items.removeAt(i);
        if (items.length > 1) {
          this.remove = true;
        } else {
          this.remove = false;
        }
        break;
      case 'service':
        items = this.itineraryForm.controls.services as FormArray;
        items.removeAt(i);
        if (items.length > 1) {
          this.removeservice = true;
        } else {
          this.removeservice = false;
        }
        break;
      case 'ticket':
        items = this.itineraryForm.controls.tickets as FormArray;
        items.removeAt(i);
        if (items.length > 1) {
          this.removeticket = true;
        } else {
          this.removeticket = false;
        }
        break;
      case 'offer':
        items = this.itineraryForm.controls.offers as FormArray;
        items.removeAt(i);
        if (items.length > 1) {
          this.removeoffer = true;
        } else {
          this.removeoffer = false;
        }
        break;
      default:
        break;
    }
    // this.total = items.length;
  }
}
