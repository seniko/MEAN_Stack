import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MessagesService } from '../services/messages.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  nameVal: String;
  emailVal: String;
  messageVal: String;

  constructor(private messagesService: MessagesService,
     private _flashMessagesService: FlashMessagesService, 
     private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.loggedIn()) {
      const user = JSON.parse(localStorage.getItem('user'));
      this.nameVal = user.name;
      this.emailVal = user.email;
    }
  }

  onSubmit(form) {
    const message = {
      name: this.nameVal,
      email: this.emailVal,
      message: this.messageVal
    }

    this.messagesService.sendMessage(message).subscribe(data => {
      if (data.success) {
        this._flashMessagesService.show('Message sent.', {cssClass: 'alert-success alert-container container flashfade', timeout: 5000});
        form.reset();
      }
    }, err => {
      this._flashMessagesService.show('Something went wrong.', {cssClass: 'alert-danger alert-container container flashfade', timeout: 5000});
    });
  }

}
