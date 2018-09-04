import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  nameVal: String;
  emailVal: String;
  passwordVal: String;
  
  isRegistered: boolean;
  isRegisteredFailed: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    const user = {
      name: this.nameVal,
      email: this.emailVal,
      password: this.passwordVal
    }
    
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.isRegistered = true;
        this.router.navigate(['/login']);
      } else {
        this.isRegisteredFailed = true;
        this.router.navigate(['/register']);
      }
    });
  }

  

  ngOnInit() {
  }

}
