import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-access-queue',
  templateUrl: './access-queue.component.html',
  styleUrls: ['./access-queue.component.scss']
})
export class AccessQueueComponent implements OnInit {
  accessQueueForm: FormGroup;
  queueOptionList: Array<any>;
  trackingList: Array<any>;

  constructor(private formBuilder: FormBuilder) {
    this.loadStaticItems();
  }

  ngOnInit() {
    this.accessQueueForm = new FormGroup({
      queueOption: new FormControl('', []),
      accessQueueNumber: new FormControl('', []),
      accessQueueCat: new FormControl('', []),
      recordLocator: new FormControl('', []),
      branchTracking: new FormControl('', []),
      tracking: new FormControl('', []),
      action: new FormControl('', []),
      document1: new FormControl('', []),
      document2: new FormControl('', []),
      document3: new FormControl('', []),
      placeQueueNumber: new FormControl('', []),
      placeQueueCat: new FormControl('', []),
      alternateOid: new FormControl('', []),
      remarks: this.formBuilder.array([''])
    });
  }

  loadStaticItems() {
    this.queueOptionList = [
      { itemText: '', itemValue: '' },
      { itemText: 'Access Queue Number', itemValue: 'QUEUE' },
      { itemText: 'Enter PNR Locator to add Documentation and Tracking Code to 1 PNR Only', itemValue: 'PNR' }
    ];

    this.trackingList = [
      { itemText: '', itemValue: '' },
      { itemText: '24H - 24Hour Team/ESC', itemValue: '24H' },
      { itemText: 'ACC – Credit Card Rejects', itemValue: 'ACC' },
      { itemText: 'ACH – Credit Card Pending ', itemValue: 'ACH' },
      { itemText: 'ADB – Direct Bills (Conferma or Power Hotel)', itemValue: 'ADB' },
      { itemText: 'AHX – HX Cancelled PNRs', itemValue: 'AHX' },
      { itemText: 'APS – Paid Seats', itemValue: 'APS' },
      { itemText: 'AQC – QC/AT Rejects', itemValue: 'AQC' },
      { itemText: 'AUP – Upgrades', itemValue: 'AUP' },
      { itemText: 'CAR – Car/Hotel Confirmations', itemValue: 'CAR' },
      { itemText: 'CTQ – Team Queues', itemValue: 'CTQ' },
      { itemText: 'EXC – Exchange Team', itemValue: 'EXC' },
      { itemText: 'GSC – GSC Follow Up = GSC', itemValue: 'GSC' },
      { itemText: 'HTL – Hotel Cancellations Queue', itemValue: 'HTL' },
      { itemText: 'IRD – International Rate Desk', itemValue: 'IRD' },
      { itemText: 'MTT – Missed Ticket', itemValue: 'MTT' },
      { itemText: 'OBC – Making OB Calls', itemValue: 'OBC' },
      { itemText: 'OBT – Online Bookings', itemValue: 'OBT' },
      { itemText: 'REF – Refund Queue', itemValue: 'REF' },
      { itemText: 'SCH – Schedule Changes ', itemValue: 'SCH' },
      { itemText: 'SUP – Support', itemValue: 'SUP' },
      { itemText: 'VNQ – Vendor Message Queue', itemValue: 'VNQ' },
      { itemText: 'WTL – Waitlist Queue', itemValue: 'WTL' }
    ];
  }

  get f() {
    return this.accessQueueForm.controls;
  }

  get remarks(): FormArray { return this.accessQueueForm.get('remarks') as FormArray; }

  addRemark(index) {
    this.remarks.insert(index + 1, new FormControl(''));
  }

  removeRemark(index) {
    this.remarks.removeAt(index);
  }
}
