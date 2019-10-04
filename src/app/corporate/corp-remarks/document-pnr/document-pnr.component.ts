import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-document-pnr',
  templateUrl: './document-pnr.component.html',
  styleUrls: ['./document-pnr.component.scss']
})
export class DocumentPnrComponent implements OnInit {
  documentForm: FormGroup;
  items: FormArray;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.documentForm = new FormGroup({
      items: this.fb.array([this.createItem()])
    });
  }

  createItem(): FormGroup {
    const group = this.fb.group({
      documentation: new FormControl('', [])
    });
    return group;
  }

  addItem(): void {
    this.items = this.documentForm.get('items') as FormArray;
    if (this.items.length < 4) {
      this.items.push(this.createItem());
    }
  }

  removeInputField(i: number): void {
    const control = this.items;
    control.removeAt(i);
  }

}
