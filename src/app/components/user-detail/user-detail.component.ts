import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProfileUser } from 'src/app/models/user-profile';
import {  
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,ReactiveFormsModule ,
  Validators,
  ValidatorFn,
  FormBuilder
} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { firstValueFrom } from 'rxjs';
import { Observable, Subject } from 'rxjs';
import { map, finalize } from "rxjs/operators";
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  resetformone= new FormGroup({
    uid:new FormControl(''),  
    id:new FormControl(''),
    firstName:new FormControl(''),
    lastName:new FormControl(''),
    dob:new FormControl(''),
    doj:new FormControl(''),
    email:new FormControl(''),
    photoURL:new FormControl(''),
    role:new FormControl(''),
    userId:new FormControl(''),
    phone:new FormControl('',[ Validators.required,Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
    project:new FormControl(''),
    address:new FormControl(''),
    skillSet:new FormControl(''),
    officeEmail:new FormControl(''),    
  });

  uid:any;
  checked = true;  
  hide = true;
  selectedUserID = this.userService.selectedUser != null ? this.userService.selectedUser.uid : 0;
  photoURL = this.userService.editSelectedUser.photoURL;
  isEdit = false;
  isAdmin = this.userService.selectedUser.role == "1" ? true: false;
  isAdminEdit = this.isAdmin && !this.isEdit ? true : false;
  error="";
  
  

  //image
  fb:any;
  downloadURL:Observable<string> | undefined;
  ref:AngularFireStorageReference | undefined;
  task:AngularFireUploadTask | undefined;
  
  constructor(private _router: Router,public userService:UserService,private storage: AngularFireStorage,public afs:AngularFirestore) {
    console.log(this.userService.editSelectedUser)
   }

 // formControls=this.userService.form.controls;
    formControls=this.resetformone.controls;


  ngOnInit(): void {

   // this.populateForm(this.userService.editSelectedUser); 
      this.populateForm(JSON.parse(localStorage.getItem('userdata')!))
      this.photoURL=localStorage.getItem('logUrl');




    // debugger
    // if(this.isAdmin==true){
    //   this.populateForm(this.userService.editSelectedUser); 
    //    this.photoURL;
    // }
    // else{
    // console.log(this.userService.selectedUser);
    // this.uid=this.userService.selectedUser.id;
    // this.populateForm(this.userService.selectedUser);
    // this.photoURL=this.userService.selectedUser.photoURL;
    // }
    
  }
  get phone(){
    return this.resetformone.get("phone")
  }

  
  onBack(): void {
    //this._router.navigate(['/flexy/home']);
  }

  onCheck(): void{
    this.checked = !this.checked;
  }

  onEdit(): void{
    this.isEdit = true;
    //this._router.navigate(['/add-user']);
  }

  updateUser(){
    //this.userService.updateUser;
    this.isEdit = false;
    

  }
  
  deleteUser(){
    this.userService.deleteUser(this.userService.editSelectedUser.id);
    this._router.navigate(['/manage-users']);
  }

  //chips related code
  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];
  addOnBlur = true;
  selectable = true;
  removable = true;
  
  userSkillSet = [{ name: 'test framework' }];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.userSkillSet.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: any): void {
    const index = this.userSkillSet.indexOf(fruit);

    if (index >= 0) {
      this.userSkillSet.splice(index, 1);
    }
  }

  updateeditUser():void{
    debugger
    // this.userService.updateEditUser(this.userService.editSelectedUser.id,this.resetformone.value.firstName,this.resetformone.value.lastName,
    // this.resetformone.value.dob,this.resetformone.value.doj,this.resetformone.value.skillSet,this.resetformone.value.address,
    // this.resetformone.value.officeEmail,this.resetformone.value.phone,this.resetformone.value.project,this.photoUrl    
    // );
    //alert("testing");
    //this.ngOnInit();
    //this._router.navigate(['/manage-users']);

    console.log(this.userService.editSelectedUser)
    
    this.afs.collection('users').doc(this.userService.editSelectedUser.id).update({firstName: this.resetformone.value.firstName, lastName:this.resetformone.value.lastName, dob:this.resetformone.value.dob, doj:this.resetformone.value.doj,
      skillSet:this.resetformone.value.skillSet,
      role:this.resetformone.value.role,
      address: this.resetformone.value.address,
      officeEmail: this.resetformone.value.officeEmail,
      phone:this.resetformone.value.phone,
      project:this.resetformone.value.project,
      photoURL:this.photoUrl
    });
      localStorage.setItem('UpdateSt','Yes');
     
    this.error="Succesfully submitted";
    setTimeout(() => {
      this.error="";
  }, 5000);  //5s

    //this._router.navigate(['user-details']); 
    //this._router.navigate(['/user-detail']);   
  }

  populateForm(user:any){
    this.resetformone.setValue(user);
  }

  get photoUrl(){
    
    if(this.fb !=null){
        return this.fb;
        console.log(this.fb);
    }
    else{
    return this.userService.editSelectedUser.photoURL;
    }
    

  }


  onFileSelected(event:any) {
    
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
              this.photoURL=url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
    }




    getToday(): string {
      return new Date().toISOString().split('T')[0]
   }
}
