import { Injectable,NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
//import { Auth,authState} from '@angular/fire/auth'
//import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile,} from '@angular/fire/auth';
import { ProfileUser } from 'src/app/models/user-profile';
import {AngularFirestore,AngularFirestoreDocument,} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import {from,Observable, of, switchMap} from 'rxjs'

import { AngularFireDatabase, AngularFireList  } from '@angular/fire/compat/database'
import { getDatabase ,ref,query, orderByChild} from "firebase/database";
import { Console, timeStamp } from 'console';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import{ init } from '@emailjs/browser';
init("CJY_uHzLjfzpR6lC6");

//import {FirebaseListObservable} from '@angular/fire/compat/database'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUser:any;
  
  userData: any;
  user: Observable<ProfileUser| undefined |null>;
  firstName?:any;
  doj?:any;
  dob?:any;
  photoURL?:any;
  emailVerified?:any;

  password:any;
  lastName: any;
  displayName: any;
  gender: any;
  hiredate: any;
  role: any;
  phone: any;
  address: any;

  userpostList:AngularFireList<ProfileUser>;
  error="";
   


  constructor( public afs: AngularFirestore,public afAuth: AngularFireAuth,public router: Router, public ngZone: NgZone,
    public db:AngularFireDatabase) 
    {
      
      
      this.userpostList = db.list('/users');
      


    this.user = this.afAuth.authState.pipe(switchMap(user => {
      
      if(user){
          console.log("lkop"+user)
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
         // JSON.parse(localStorage.getItem('user'));
          return this.afs.doc<ProfileUser>(`users/${user.uid}`).valueChanges();
      }
      else {
          localStorage.setItem('user',"");
         // JSON.parse(localStorage.getItem('user'));
          return of(null);
      } 
  })) 
   }

  
  
  signUp(email:string,password:string,firstName:string,lastName:string,doj:string,dob:string,photoURL:string,role:string){
    return (this.afAuth.createUserWithEmailAndPassword(email, password))
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        console.log(password)
        this.password=password;
        this.firstName=firstName;
        this.lastName=lastName;
        this.doj=doj;
        this.dob=dob;
        this.photoURL=photoURL;
        this.role=role;
       // this.emailVerified=this.emailVerified
        
       this.SendPasswordEmail(email,firstName,lastName,password);
        //this.SendVerificationMail();
         this.SetUserData(result.user);
      // })
      // .catch((error) => {
      //   window.alert(error.message);
      // 
        



    });
  }
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification());
    }

    SendPasswordEmail(email: string,firstName: string,lastName : string,password:string){
      var templateParams = {
        name: firstName + " " + lastName,
        to_mail: email,
        userpassword: password       
    };
     
    emailjs.send('service_62hd31e', 'template_softblobs_mail', templateParams)
        .then(function(response) {
           console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
           console.log('FAILED...', error);
        });      
    }

  SetUserData(user: any) {
    console.log(user)
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(
        `users/${user.uid}`
      );
      console.log(this.emailVerified)
      const userData: ProfileUser = {
        uid: user.uid,
        email: user.email,
        firstName:this.firstName,
        lastName:this.lastName,
        doj:this.doj,
        dob:this.dob,
        photoURL:this.photoURL,
        role:this.role,
        //emailVerified:this.emailVerified
        //password:this.password,
        
        
        

      };
      return userRef.set(userData, {
        merge: true,
      });
    }


    login(email: string, password: string) {
      
      return this.afAuth.signInWithEmailAndPassword(email, password);
      
     }
    
    get isLoggedIn(): boolean {
      const user = JSON.parse(localStorage.getItem('user')!);
      return user !== null && user.emailVerified !== false ? true : false;
    }

    getAllUser(): AngularFireList<ProfileUser> {
      console.log(this.userpostList)
      return this.userpostList;
    }


    passwordReset(email:string){
     return  this.afAuth.sendPasswordResetEmail(email)
    }
    
      
  }