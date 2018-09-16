import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: any;

  constructor(private messagesService: MessagesService) { }

  ngOnInit() {
    this.messagesService.getMessages().subscribe(list => {
      this.messages = list;
    }, err => {
      console.log(err);
      return false;
    });
  }

  onRemove(message) {
    this.messagesService.removeMessage(message._id).subscribe(data => {
      console.log(data.msg);
    }, err => {
      console.log(err);
      return false;
    });
    const index = this.messages.indexOf(message);
    this.messages.splice(index, 1);
  }

}
