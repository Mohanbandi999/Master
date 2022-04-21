import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ProfileUser } from 'src/app/models/user-profile';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
}

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent {

  search: boolean = false;
  selectedUser:any;
  userIcon:string = "";
  isAdmin:boolean = false;
  


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    user$ = this.afAuth.user;

    rolee: string | null;
    photourl:string| null;
  
    
  constructor(private _router: Router, private breakpointObserver: BreakpointObserver,
    public authService: AuthenticationService,public userService:UserService,public afAuth: AngularFireAuth) {
      //this.userName = this.userService.selectedUser?.firstName;
      //this.isAdmin = this.userService.selectedUser?.role == "1" ? true:false;      
      //this.sidebarMenu= this.isAdmin ? this.adminSideBarMenu : this.userSideBarMenu;
      //this.userIcon = this.userService.selectedUser?.photoURL ? this.userService.selectedUser?.photoURL : "assets/images/user2.webp";
    
      // alert(this.userService.selectedUser?.firstName);
       //localStorage.setItem('userName', this.userService.selectedUser?.firstName);
       //console.log(localStorage.getItem('userName'));
       //this.userName=localStorage.getItem('userName');
       this.userName=localStorage.getItem('logName');
       
       console.log(localStorage.getItem('logRole')); 
       
       this.rolee=localStorage.getItem('logRole')
       this.isAdmin = this.rolee== "1" ? true:false;
       this.photourl=localStorage.getItem('logUrltime');
       console.log(localStorage.getItem('logUrltime'));

       this.sidebarMenu= this.isAdmin ? this.adminSideBarMenu : this.userSideBarMenu;

      this.userIcon = this.photourl ? this.photourl : "assets/images/user2.webp";
    }
  

  routerActive: string = "activelink";

  adminSideBarMenu: sidebarMenu[] = [
    {
      link: "/dashboard",
      icon: "home",
      menu: "Dashboard",
    },
    {
      link: "/manage-users",
      icon: "layout",
      menu: "Manage Users",
    },
    {
      link: "/calendar",
      icon: "layout",
      menu: "Calendar",
    },
    {
      link: "/vm-details",
      icon: "layout",
      menu: "Manage VMs",
    },
    {
      link: "/time-sheet",
      icon: "layout",
      menu: "Time Sheet",
    },
    {
      link: "/approve-timesheet",
      icon: "layout",
      menu: "Approve Timesheet",
    },
    {
      link: "/approve-leaverequest",
      icon: "layout",
      menu: "Approve Leave",
    }

  ]
  userSideBarMenu: sidebarMenu[] = [
    {
      link: "/user-detail",
      icon: "layout",
      menu: "User Details",
    },
    {
      link: "/change-password",
      icon: "layout",
      menu: "Change Password",
    },
    {
      link: "/calendar",
      icon: "layout",
      menu: "Calendar",
    },
    {
      link: "/time-sheet",
      icon: "layout",
      menu: "Time Sheet",
    },
    {
      link: "/applyleave",
      icon: "layout",
      menu: "Leave Request",
    },
    {
      link: "/leaves-list",
      icon: "layout",
      menu: "Leaves List",
    }

  ]
  sidebarMenu:any = null;
  userName:any;

  onChangePassword() : void{
    this._router.navigate(['/change-password']);
  }
  
  onViewAccount() : void{
    
    this._router.navigate(['/user-detail']);
  }

  onLogout(){ 

    localStorage.setItem('UpdateSt',''); 
    
    this._router.navigate(['/login']);    
  } 
}