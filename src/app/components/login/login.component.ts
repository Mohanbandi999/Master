import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { AuthenticationService } from 'src/app/services/authentication.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import {from,Observable, of, switchMap} from 'rxjs'
import { ProfileUser } from 'src/app/models/user-profile';
//import { HotToastService } from '@ngneat/hot-toast';public
import { UserService } from 'src/app/services/user.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
   loginForm=new FormGroup({
    email:new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
  })
  error="";
  photoURL="";
  
  //photoURL = this.userService.editSelectedUser.photoURL;
  user: Observable<ProfileUser> | undefined;
  constructor(public authService: AuthenticationService,private router: Router,
    public userService:UserService) { }

  ngOnInit(): void {
    
    this.userService.editSelectedUser=this.userService.selectedUser;
    this.photoURL = this.userService.editSelectedUser.photoURL;
  }

  // onBack(): void {
  //   this.router.navigate(['/flexy/home']);
  // }
  
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  submit() {
    this.error="";
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value.email,this.loginForm.value.password)
      
    .   then(result => {

      this.userService.getAllUsers().subscribe(res=>{
        // this.dataSourceone=res;
        // this.datasoc =new MatTableDataSource(this.dataSourceone);
        for(var i=0;i<res.length;i++)
        {
          
          if(result.user?.uid == res[i].uid)
          {
            
            this.userService.selectedUser = res[i];
            localStorage.setItem('userdata',JSON.stringify(this.userService.selectedUser));
            localStorage.setItem('logRole',this.userService.selectedUser.role);
            localStorage.setItem('currentUser',this.userService.selectedUser.uid);
            localStorage.setItem('logName',this.userService.selectedUser.firstName);
            localStorage.setItem('logUrl',this.userService.selectedUser.photoURL);
            localStorage.setItem('logUrltime',this.userService.selectedUser.photoURL);
            localStorage.setItem('logProject',this.userService.selectedUser.project);

            console.log(this.userService.selectedUser);

            //this.userName = this.selectedUser.displayName;
            break;
          }
        }
      //this.authService.currentUser = result.user;
      // if (result.user?.emailVerified !==true) {
        
      //   if (result.user?.emailVerified === false){
      //     this.error="Please validate your email address. Kindly check your inbox.";
          
      //   }
      //   else{
      //     window.alert("please give valid credentials")
      //   }
      // }
      // else
      // {
        if(this.userService.selectedUser.role == "1")
        {
          if(localStorage.getItem('UpdateSt') != 'Yes')
          this.router.navigate(['/manage-users']);
        
        }
        else{
          
         // this.userService.editSelectedUser=this.userService.selectedUser;
         this.userService.editSelectedUser=JSON.parse(localStorage.getItem('userdata')!)
         console.log(this.userService.editSelectedUser);
          this.router.navigate(['/user-detail']);
        }
        
        
      })       
      })  
     .catch(err => {
       this.error="Invalid credentials!";
     
    //  });
       });
     }
}}
