import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-move-queue',
  templateUrl: './move-queue.component.html',
  styleUrls: ['./move-queue.component.scss']
})
export class MoveQueueComponent implements OnInit {

  moveQueueForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.moveQueueForm = new FormGroup({
      fromQueueNumber: new FormControl('', [Validators.required]),
      fromQueueCategory: new FormControl('', []),
      toQueueNumber: new FormControl('', [Validators.required]),
      toQueueCategory: new FormControl('', []),
      removeQueue: new FormControl('', []),
      agentSine: new FormControl('', []),
      carrier: new FormControl('', []),
      oid: new FormControl('', []),
      travelDate1: new FormControl('', []),
      travelDate2: new FormControl('', []),
      moveSegment: new FormControl('', []),
      creationDate: new FormControl('', []),
      moveTk: new FormControl('', [])
    });
  }

}
