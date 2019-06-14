import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-message',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  callerName = '';
  modalRef = new BsModalRef();
  message = '';
  title = '';
  response = '';
  iconClass = '';
  paramValue: any;
  constructor() {}
  ngOnInit() {}
}
