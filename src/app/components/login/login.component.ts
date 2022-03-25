import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { AuthenticationService } from 'src/app/services/authentication.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import {from,Observable, of, switchMap} from 'rxjs'
import { ProfileUser } from 'src/app/models/user-profile';
//import { HotToastService } from '@ngneat/hot-toast';public 

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
  user: Observable<ProfileUser> | undefined;
  constructor(private authService: AuthenticationService,private router: Router,) { }

  ngOnInit(): void {}

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

        if (result.user?.emailVerified !==true) {
          
          if (result.user?.emailVerified === false){
            this.error="Please validate your email address. Kindly check your inbox.";
            
          }
          else{
            window.alert("please give valid credentials")
          }
        }
        else{
          if(this.loginForm.value.email =='wabocim123@tonaeto.com')
        {this.router.navigate(['/dashboard']); }
        else
        this.router.navigate(['/dashboard']);
        }       
        })  
      .catch(err => {
        this.error="please give valid credentials";
       
       });
     }
    }}
