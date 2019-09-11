import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { MessageType } from './MessageType';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  callerName = '';
  modalRef = new BsModalRef();
  message = '';
  title = '';
  messageType: MessageType = MessageType.Default;
  response = '';
  iconClass = '';
  paramValue: any;
  note = '';
  constructor() {}
  ngOnInit() {
    this.setMessageType(MessageType.Default);
  }

  setMessageType(type: MessageType) {
    this.messageType = type;
    this.response = '';
    switch (type) {
      case MessageType.Default:
        this.iconClass = 'fas fa-exclamation-circle fa-w-16 fa-3x';
        break;
      case MessageType.YesNo:
        this.iconClass = 'fas fa-question-circle fa-w-16 fa-3x';
        break;
      case MessageType.Success:
        this.iconClass = 'fas fa-thumbs-up fa-w-16 fa-3x';
        break;
      case MessageType.Error:
        this.iconClass = 'fas fa-exclamation-triangle fa-w-16 fa-3x';
        break;
    }
  }

  close(response) {
    this.response = response;
    this.modalRef.hide();
  }
}
