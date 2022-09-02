import { Component, OnInit} from '@angular/core';
//import { UtilHelper } from '../../../helper/util.helper';

// import { ValidateModel } from 'src/app/models/validate-model';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { PnrService } from '../../../service/pnr.service';
import { formatDate } from '@angular/common';
//import { common } from 'src/environments/common';

@Component({
  selector: 'app-ird-invoice-request',
  templateUrl: './ird-invoice-request.component.html',
  styleUrls: ['./ird-invoice-request.component.scss']
})
export class IrdInvoiceRequestComponent implements OnInit {

  irdRequestForm: FormGroup;
  commentsForm: FormGroup;
  comments: FormArray;
  pnrObj: any;
  fareRequestList: { itemText: string; itemValue: string; }[];
  stops: FormArray;
  fareRequest = '';
  isUSOID = false;
  constructor(private pnrService: PnrService, private fb: FormBuilder) {
    let stops = [];
    stops.push(this.createStop());
    this.irdRequestForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      cnNumber: new FormControl('', [Validators.required]),
      officeId: new FormControl('', [Validators.required]),
      queue: new FormControl('', [Validators.required]),
      date: new FormControl(formatDate((new Date()), 'ddMMM', 'en-US').toUpperCase(), []),
      cfa: new FormControl('', []),
      fareRequest: new FormControl('', [Validators.required]),
      airFlexibility: new FormControl('', []),
      dateFlexibility: new FormControl('', []),
      scheduleFlexibility: new FormControl('', []),
      isTravel: new FormControl('', [Validators.required]),
      stops : this.fb.array(stops),
      totalFare : new FormControl('', [Validators.required, Validators.pattern('[0-9]*(.[0-9]+)')])
    });
    
  }

  ngOnInit() {
    const arr = []; 
    arr.push(this.createItem());
    this.commentsForm = new FormGroup({
        comments: this.fb.array(arr)
      });
    this.comments = this.commentsForm.get('comments') as FormArray;
    this.stops = this.irdRequestForm.get('stops') as FormArray;
    this.pnrObj = this.pnrService.pnrObj;
    this.getCFAValue();
    this.fareRequestList = [
        { itemText: 'F Class', itemValue: 'F Class' },
        { itemText: 'J Class', itemValue: 'J Class' },
        { itemText: 'Least Expensive', itemValue: 'Least Expensive' }
      ];
      this.isUSOID = (localStorage.getItem('isUSOID') == true.toString());
      if (this.isUSOID) {
        //this.irdRequestForm.get('officeId').setValue(common.defaultIRDOfficeIdUS);
        this.irdRequestForm.get('queue').setValue('50C02');
      }
      else {
        //this.irdRequestForm.get('officeId').setValue(common.defaultIRDOfficeIdCA);
        this.irdRequestForm.get('queue').setValue('50C231');
      }
      // // this.irdRequestForm.get('totalFare').valueChanges.subscribe((totalFareAmount) => {
      // //   this.irdRequestForm.get('officeId').setValue(this.defaultIRDOfficeIdCA);
      // // }
    
  }
  createStop(): FormGroup{
    const group = this.fb.group({
      stops: new FormControl('', []),
    
    });
    return group;
  }
  createItem(): FormGroup {
    const group = this.fb.group({
      comments: new FormControl('', []),
    
    });
    return group;
  }

  addItem(): void {
    this.comments = this.commentsForm.get('comments') as FormArray;
    if (this.comments.length <8 ) {
      this.comments.push(this.createItem());
    }
  }
  addStops(): void {
    this.stops = this.irdRequestForm.get('stops') as FormArray;
    if (this.stops.length <4 ) {
      this.stops.push(this.createStop());
    }
  }

  getCFAValue() {
    for (const rm of this.pnrObj.rmElements) {
      if (rm.freeFlowText.indexOf("CF") > -1) {
        let cfa = (rm.freeFlowText).split('-')[1];
        cfa = cfa.substr(0, 3);
        this.irdRequestForm.get('cfa').setValue(cfa);
      }
    }

  }

  removeInputField(i, type) {
    if (type == 'comments') {
      this.comments.removeAt(i);
    }
    else {
      this.stops.removeAt(i);
    }
  }

  fareRequestChanged(val) {
    this.irdRequestForm.get('fareRequest').setValue(val);
  }



 
}
