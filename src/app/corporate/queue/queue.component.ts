import { Component, OnInit, ViewChild } from '@angular/core';
import { QueueMinderComponent } from './queue-minder/queue-minder.component';
import { CounselorDetail } from 'src/app/globals/counselor-identity';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {

  @ViewChild(QueueMinderComponent) queueMinderComponent: QueueMinderComponent;

  isEsc = false;
  constructor(private counselorDetail: CounselorDetail) { }

  ngOnInit() {
    this.counselorDetail.identityOnChange.subscribe((x) => {
      this.isEsc = x === 'ESC';
    });
  }

}
