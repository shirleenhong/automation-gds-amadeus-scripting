import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ItineraryRemarkService } from '../../../service/corporate/itinerary-remark.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {
  queueForm: FormGroup;
  transactionTypeList: { itemText: string; itemValue: string; }[];
  teamQueueList: { itemText: string; itemValue: string; }[];
  isLeisureOnDemadOid = false;
  constructor(private itineraryRemarkService : ItineraryRemarkService) {
    this.queueForm = new FormGroup({
      personalQueue: new FormControl('', []),
      queueNo: new FormControl('', []),
      typeTransaction: new FormControl('', []),
      queueCategory: new FormControl('', []),
      teamQueue:new FormControl('',[])
    });
  }

  ngOnInit() {
    this.isLeisureOnDemadOid = this.itineraryRemarkService.checkForLeisureOnDemandOID();
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
    this.teamQueueList= [
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
    ]
  }
  
}
