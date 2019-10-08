import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { PnrService } from 'src/app/service/pnr.service';

@Component({
  selector: 'app-queue-minder',
  templateUrl: './queue-minder.component.html',
  styleUrls: ['./queue-minder.component.scss']
})
export class QueueMinderComponent implements OnInit {
  queueMinderForm: FormGroup;
  queues: FormArray;
  constructor(private fb: FormBuilder, private pnrService: PnrService) { }

  ngOnInit() {
    this.queueMinderForm = new FormGroup({
      queues: this.fb.array([this.createItem(this.pnrService.PCC, '50', '55')])
    });
  }

  createItem(oid?: string, queueNumber?: string, category?: string): FormGroup {
    const group = this.fb.group({
      applyQueue: new FormControl('', []),
      oid: new FormControl(oid, []),
      queueNumber: new FormControl(queueNumber, []),
      category: new FormControl(category, [])
    });
    return group;
  }

  addItem(): void {
    this.queues = this.queueMinderForm.get('queues') as FormArray;
    this.queues.push(this.createItem());
  }

  removeInputField(i: number): void {
    const control = this.queues;
    control.removeAt(i);
  }

}
