import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[];

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.getUsers().subscribe(list => {
      this.users = list;
    }, err => {
      console.log(err);
      return false;
    });
  }

}
