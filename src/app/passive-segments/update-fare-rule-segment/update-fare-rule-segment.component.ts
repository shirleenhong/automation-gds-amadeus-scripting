import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { PnrService } from 'src/app/service/pnr.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { SelectItem } from 'src/app/models/select-item.model';

@Component({
  selector: 'app-update-fare-rule-segment',
  templateUrl: './update-fare-rule-segment.component.html',
  styleUrls: ['./update-fare-rule-segment.component.scss']
})
export class UpdateFareRuleSegmentComponent implements OnInit {
  title: string;
  @Input()
  isSubmitted: boolean;
  fareRuleForm: FormGroup;
  fareRuleList: Array<SelectItem>;
  items: FormArray;

  constructor(private fb: FormBuilder, public activeModal: BsModalService, private pnrService: PnrService, private modalRef: BsModalRef) {

  }

  createItem(): FormGroup {
    return this.fb.group({
      remarkText: ''
    });
  }

  addItem(): void {
    this.items = this.fareRuleForm.get('items') as FormArray;
    this.items.push(this.createItem());
  }

  ngOnInit() {
    this.loadFareRule();
    this.fareRuleForm = this.fb.group({
      fareRuleList: new FormControl(''),
      items: this.fb.array([this.createItem()])
    });
    this.fareRuleForm.controls.fareRuleList.patchValue('S');
  }

  loadFareRule() {
    this.fareRuleList = [{ itemText: 'SELECT FARE RULE', itemValue: 'S' },
    { itemText: 'ECONO OR PLUS LOWEST FARE', itemValue: 'E' },
    { itemText: 'FLEX FARE', itemValue: 'FF' },
    { itemText: 'PLUS FLEXIBLE FARE', itemValue: 'PFF' }
    ];
  }
}
