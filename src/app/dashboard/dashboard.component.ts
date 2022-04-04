import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public authService: AuthenticationService,public userService:UserService) {
    console.log("userservice data:");
    console.log(this.userService.selectedUser);
  }

  ngOnInit(): void {
  }

  //selectedUser = this.authService.currentUser;
  selectedUserName:string =  "Welcome, "+ this.userService.selectedUser?.firstName;
}
