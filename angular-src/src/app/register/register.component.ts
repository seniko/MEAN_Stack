import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  nameVal: String;
  emailVal: String;
  passwordVal: String;
  
  constructor(private authService: AuthService, 
    private router: Router, 
    private _flashMessagesService: FlashMessagesService) { }

  onSubmit() {
    const user = {
      name: this.nameVal,
      email: this.emailVal,
      password: this.passwordVal
    }
    
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this._flashMessagesService.show('Registered! Log in.', {cssClass: 'alert-success alert-container container flashfade', timeout: 5000});
        this.router.navigate(['/login']);
      }
    }, err => {
      this._flashMessagesService.show('Something went wrong.', {cssClass: 'alert-danger alert-container container flashfade', timeout: 5000});
      this.router.navigate(['/register']);
    });
  }

  

  ngOnInit() {
  }

}
