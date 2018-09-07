import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService,
    private _flashMessagesService: FlashMessagesService, 
    private router: Router) { }

  ngOnInit() {
  }

  onLogout() {
    this.authService.logout();
    this._flashMessagesService.show('Logged out.', {cssClass: 'alert-success alert-container container flashfade', timeout: 6000});
    this.router.navigate(['/login']);
    return false;
  }
}
