import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-queue-minder',
  templateUrl: './queue-minder.component.html',
  styleUrls: ['./queue-minder.component.scss']
})
export class QueueMinderComponent implements OnInit {
  queueMinderForm: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
