import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  modalRef = new BsModalRef();
  message = '';
  title = '';
  constructor(private modalService: BsModalService) { }

  ngOnInit() {


  }

}
