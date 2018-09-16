import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from './auth.service';


@Injectable()
export class MessagesService {

  constructor(private http: Http, private authService: AuthService) { }

  sendMessage(message) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/contact/messages', message, {headers: headers})
    .map(res => res.json());
  }

  getMessages() {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.authToken);
    return this.http.get('http://localhost:3000/contact/messages', {headers: headers})
    .map(res => res.json());
  }

  removeMessage(_id) {
    let headers = new Headers();
    this.authService.loadToken();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authService.authToken);
    return this.http.delete(`http://localhost:3000/contact/messages/${_id}`, {headers: headers})
    .map(res => res.json());
  }

}
