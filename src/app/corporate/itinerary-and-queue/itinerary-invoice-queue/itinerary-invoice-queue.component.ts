import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DDBService } from '../../../service/ddb.service';
import { PnrService } from 'src/app/service/pnr.service';

@Component({
  selector: 'app-itinerary-invoice-queue',
  templateUrl: './itinerary-invoice-queue.component.html',
  styleUrls: ['./itinerary-invoice-queue.component.scss']
})
export class ItineraryInvoiceQueue implements OnInit {
  queueForm: FormGroup;
  transactionTypeList: { itemText: string; itemValue: string; }[];
  teamQueueList: { itemText: string; itemValue: string; }[];
  isLeisureOnDemadOid = false;
  pccList: any = "";

  constructor(private ddb: DDBService, private pnrService: PnrService) {
    this.queueForm = new FormGroup({
      personalQueue: new FormControl('', []),
      queueNo: new FormControl('', []),
      typeTransaction: new FormControl('', []),
      queueCategory: new FormControl('', []),
      teamQueue: new FormControl('', [])
    });
  }

  async ngOnInit() {
    this.pccList = await this.ddb.getLeisureOnDemandPCC();
    this.isLeisureOnDemadOid = this.checkForLeisureOnDemandOID();
    this.loadTransactionType();
    this.loadTeamQueueList();
  }

  get f() {
    return this.queueForm.controls;
  }


  loadTransactionType() {
    this.transactionTypeList = [
      { itemText: '', itemValue: '' },
      { itemText: 'Invoice', itemValue: 'invoice' },
      { itemText: 'Itinerary', itemValue: 'itinerary' }
    ];

  }

  loadTeamQueueList() {
    this.teamQueueList = [
      { itemText: '', itemValue: '' },
      { itemText: 'VIP', itemValue: 'vip' },
      { itemText: 'Pending Approval', itemValue: 'pendingApproval' },
      { itemText: 'Conf. Pending', itemValue: 'confPending' },
      { itemText: 'LEAD/MGR', itemValue: 'leadMgr' },
      { itemText: 'Groups', itemValue: 'groups' },
      { itemText: 'Urgent Follow-up', itemValue: 'urgentFollowUp' },
      { itemText: 'Special Service Waivers', itemValue: 'specialServiceWaivers' },
      { itemText: 'Complex Intl-rate pending', itemValue: 'cpmplexIntPending' },
      { itemText: 'Split Tickets', itemValue: 'splitTickets' },
      { itemText: 'Client Options 1', itemValue: 'clientOptions1' },
      { itemText: 'Client Options 2', itemValue: 'clientOptions2' },
      { itemText: 'AC-Flight Passes', itemValue: 'acFlipghtPass' },
      { itemText: 'Optional 1', itemValue: 'optional1' },
      { itemText: 'Optional 2', itemValue: 'optional2' },
      { itemText: 'Optional 3', itemValue: 'optional3' },
      { itemText: 'Optional 4', itemValue: 'optional4' },
      { itemText: 'EMD', itemValue: 'EMD' }
    ]
  }

  checkForLeisureOnDemandOID() {
    if (this.pccList.indexOf(this.pnrService.PCC) > 0) {
      return true;
    }
    else {
      return false;
    }
  }


}
