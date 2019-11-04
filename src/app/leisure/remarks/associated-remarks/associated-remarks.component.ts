import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { SelectItem } from 'src/app/models/select-item.model';
import { PnrService } from 'src/app/service/pnr.service';

@Component({
  selector: 'app-associated-remarks',
  templateUrl: './associated-remarks.component.html',
  styleUrls: ['./associated-remarks.component.scss']
})
export class AssociatedRemarksComponent implements OnInit {
  items: FormArray;
  associatedRemarksForm: FormGroup;
  segments: Array<SelectItem>;

  constructor(private fb: FormBuilder, private pnrService: PnrService) {
    this.loadSegments();
  }

  ngOnInit() {
    this.associatedRemarksForm = new FormGroup({
      items: this.fb.array([this.createItem()])
    });
  }

  createItem(): FormGroup {
    const group = this.fb.group({
      segmentNo: new FormControl('', []),
      remarkText: new FormControl('', [])
    });
    return group;
  }

  addItem(): void {
    this.items = this.associatedRemarksForm.get('items') as FormArray;
    this.items.push(this.createItem());
  }

  removeInputField(i: number): void {
    const control = this.items;
    control.removeAt(i);
  }

  loadSegments(): void {
    this.segments = this.pnrService.getSegmentList();
  }
}
