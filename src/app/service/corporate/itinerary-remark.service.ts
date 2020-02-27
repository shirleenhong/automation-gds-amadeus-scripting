import { Injectable, OnInit } from '@angular/core';
import { PnrService } from '../pnr.service';
import { QueuePlaceModel } from '../../models/pnr/queue-place.model';
import { formatDate } from '@angular/common';
import { FormGroup, FormArray } from '@angular/forms';
import { AmadeusQueueService } from '../amadeus-queue.service';
import { RemarksManagerService } from './remarks-manager.service';

@Injectable({
  providedIn: 'root'
})
export class ItineraryRemarkService implements OnInit {
  destination = [];
  leisureOnDemandOID: any = '';

  constructor(private pnrService: PnrService, private amadeusQueue: AmadeusQueueService, private rms: RemarksManagerService) {}

  async ngOnInit() {}
  addPersonalQueue(frmGroup: FormGroup) {
    if (frmGroup.controls.queueNo.value && frmGroup.controls.queueCategory.value) {
      this.getQueueMinder('personalQueue', frmGroup.controls.queueNo.value, frmGroup.controls.queueCategory.value);
    } else if (frmGroup.controls.queueNo.value && !frmGroup.controls.queueCategory.value) {
      // this.getQueueMinder('personalQueue', frmGroup.controls.queueNo.value, '1');
    }
  }

  private getQueueMinder(controlname: string, queueno?: string, category?: string) {
    const queue = new QueuePlaceModel();
    const queuePlaceDescription = [
      // tslint:disable-next-line: object-literal-shorthand
      { control: 'personalQueue', queueNo: queueno, pcc: '', text: 'personal Queue', category: category },
      { control: 'invoice', queueNo: '66', pcc: 'YTOWL210E', text: 'invoice', category: '1' },
      { control: 'itinerary', queueNo: '65', pcc: 'YTOWL210E', text: 'itinerary', category: '1' },
      { control: 'vip', queueNo: '40', pcc: '', text: '', category: '224' },
      { control: 'pendingApproval', queueNo: '40', pcc: '', text: 'pendingApproval', category: '225' },
      { control: 'confPending', queueNo: '40', pcc: '', text: '', category: '226' },
      { control: 'leadMgr', queueNo: '40', pcc: '', text: '', category: '227' },
      { control: 'groups', queueNo: '40', pcc: '', text: '', category: '228' },
      { control: 'urgentFollowUp', queueNo: '40', pcc: '', text: '', category: '229' },
      { control: 'specialServiceWaivers', queueNo: '40', pcc: '', text: '', category: '230' },
      { control: 'cpmplexIntPending', queueNo: '40', pcc: '', text: '', category: '231' },
      { control: 'splitTickets', queueNo: '40', pcc: '', text: '', category: '232' },
      { control: 'clientOptions1', queueNo: '40', pcc: '', text: '', category: '233' },
      { control: 'clientOptions2', queueNo: '40', pcc: '', text: '', category: '234' },
      { control: 'acFlipghtPass', queueNo: '40', pcc: '', text: '', category: '235' },
      { control: 'optional1', queueNo: '40', pcc: '', text: '', category: '236' },
      { control: 'optional2', queueNo: '40', pcc: '', text: '', category: '237' },
      { control: 'optional3', queueNo: '40', pcc: '', text: '', category: '238' },
      { control: 'optional4', queueNo: '40', pcc: '', text: '', category: '239' },
      { control: 'EMD', queueNo: '40', pcc: 'YTOWL2106 ', text: '', category: '221' }
    ];

    const look = queuePlaceDescription.find((x) => x.control === controlname);
    if (look) {
      queue.queueNo = look.queueNo;
      if (queueno) {
        queue.queueNo = queueno;
      }
      queue.pcc = look.pcc;
      if (look.pcc === '') {
        queue.pcc = this.pnrService.PCC;
      }
      queue.freetext = look.text;
      queue.category = look.category;
      if (category) {
        queue.category = category;
      }
      queue.date = formatDate(Date.now(), 'ddMMyy', 'en').toString();
      this.amadeusQueue.addQueueCollection(queue);
    }
  }

  addItineraryQueue(frmGroup: FormGroup) {
    if (frmGroup.controls.typeTransaction.value) {
      let tanstype = '';
      if (frmGroup.controls.typeTransaction.value === 'invoice') {
        tanstype = 'invoice';
      } else if (frmGroup.controls.typeTransaction.value === 'itinerary') {
        tanstype = 'itinerary';
      }
      this.getQueueMinder(tanstype);
    }
  }

  addTeamQueue(frmGroup: FormGroup) {
    if (frmGroup.controls.teamQueue.value) {
      this.getQueueMinder(frmGroup.controls.teamQueue.value);
    }
  }
  getItineraryRemarks(frmGroup: FormGroup) {
    let arr = frmGroup.get('emailAddresses') as FormArray;
    for (const c of arr.controls) {
      const email = c.get('emailAddress').value;
      if (email) {
        const emailAddresses = new Map<string, string>();
        emailAddresses.set('CWTItineraryEmailRecipient', email);
        this.rms.createPlaceholderValues(emailAddresses);
      }
    }
    if (frmGroup.value.typeTransaction) {
      arr = frmGroup.get('services') as FormArray;
      for (const c of arr.controls) {
        const service = c.get('service').value;
        if (service) {
          const serviceValues = new Map<string, string>();
          serviceValues.set('Service', service);
          this.rms.createPlaceholderValues(serviceValues);
        }
      }
      arr = frmGroup.get('tickets') as FormArray;
      for (const c of arr.controls) {
        const ticket = c.get('ticket').value;
        if (ticket) {
          const ticketValues = new Map<string, string>();
          ticketValues.set('CWTItineraryTicketRemark', ticket);
          this.rms.createPlaceholderValues(ticketValues);
        }
      }
      arr = frmGroup.get('offers') as FormArray;
      for (const c of arr.controls) {
        if (frmGroup.value.typeTransaction === 'itinerary') {
          const offer = c.get('offer').value;
          if (offer) {
            const offerValues = new Map<string, string>();
            offerValues.set('Offer', offer);
            this.rms.createPlaceholderValues(offerValues);
          }
        }
      }
    }
    if (frmGroup.value.language) {
      const rirService = 'LANGUAGE-(EN-US|FR-CA)';
      const regx = new RegExp(rirService);
      const rems = this.pnrService.getRemarksFromGDSByRegex(regx, 'RM');
      if (rems.length === 0) {
        const languageMap = new Map<string, string>();
        // languageMap.set('Language', frmGroup.value.language);
        languageMap.set('ItineraryLanguageCulture', frmGroup.value.language);
        this.rms.createPlaceholderValues(languageMap);
      }
      if (rems.length > 0 && rems[0].remarkText.substr(-5) !== frmGroup.value.language) {
        const additionalLanguageMap = new Map<string, string>();
        additionalLanguageMap.set('ItineraryLanguage', frmGroup.value.language.substr(0, 2));
        this.rms.createPlaceholderValues(additionalLanguageMap);
      }
    }
    if (!this.pnrService.getRmqEmail()) {
      const aquaRmkConditions = new Map<string, string>();
      aquaRmkConditions.set('EmailAddNo', 'true');
      this.rms.createPlaceholderValues(null, aquaRmkConditions, null, null, 'EMAIL ADD-NO');
    }
  }
  addAquaOverrideRmk() {
    const enableAutoMail = new Map<string, string>();
    enableAutoMail.set('EnableAutoMail', 'NO');
    this.rms.createEmptyPlaceHolderValue(['EnableAutoMail'], null, 'AUTOMAIL-');
    this.rms.createPlaceholderValues(enableAutoMail, null, null, null, 'AUTOMAIL-');
  }
  addAquaQueue() {
    this.amadeusQueue.addQueueCollection(new QueuePlaceModel('YTOWL210E', '70', '1'));
  }
}
