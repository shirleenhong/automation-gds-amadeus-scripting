import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { MessageType } from './MessageType';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  modalRef = new BsModalRef();
  message = '';
  title = '';
  messageType: MessageType = MessageType.Default;
  response = '';
  iconClass = '';
  paramValue: any;
  constructor(private modalService: BsModalService) { }
  ngOnInit() {
    this.setMessageType(MessageType.Default);

  }

  setMessageType(type: MessageType) {
    this.messageType = type;
    switch (type) {
      case MessageType.Default:
        this.iconClass = 'fas fa-exclamation-circle fa-w-16 fa-3x';
        break;
      case MessageType.YesNo:
        this.iconClass = 'fas fa-question-circle fa-w-16 fa-3x';
        break;

    }
  }

  close(response) {
    this.response = response;
    this.modalRef.hide();
  }
}
