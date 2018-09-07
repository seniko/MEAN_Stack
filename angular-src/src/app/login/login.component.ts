import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailVal: String;
  passwordVal: String;

  constructor(private authService: AuthService,
    private _flashMessagesService: FlashMessagesService, 
    private router: Router) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      email: this.emailVal,
      password: this.passwordVal
    }

    this.authService.authenticateUser(user).subscribe( data => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this._flashMessagesService.show('Logged in.', {cssClass: 'alert-success alert-container container flashfade', timeout: 5000});
        this.router.navigate(['/dashboard']);
      }
    }, err => {
      this._flashMessagesService.show('Invalid email or password.', {cssClass: 'alert-danger alert-container container flashfade', timeout: 5000});
      this.router.navigate(['/login']); 
    });
  }

}
