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
  constructor(private _router: Router, private breakpointObserver: BreakpointObserver,
    public authService: AuthenticationService,public userService:UserService,public afAuth: AngularFireAuth) {
      this.userName = this.userService.selectedUser?.firstName;
      this.isAdmin = this.userService.selectedUser?.role == "1" ? true:false;      
      this.sidebarMenu= this.isAdmin ? this.adminSideBarMenu : this.userSideBarMenu;
      this.userIcon = this.userService.selectedUser?.photoURL ? this.userService.selectedUser?.photoURL : "assets/images/user2.webp";
    }
  

  routerActive: string = "activelink";

  adminSideBarMenu: sidebarMenu[] = [
    {
      link: "/home",
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
    }
  ]
  sidebarMenu:any = null;
  userName:string= "";

  onChangePassword() : void{
    this._router.navigate(['/change-password']);
  }
  
  onViewAccount() : void{
    this._router.navigate(['/user-detail']);
  }

  onLogout() : void{
    this._router.navigate(['/login']);
  }
}
