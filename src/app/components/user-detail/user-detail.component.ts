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
    phone:new FormControl(''),
    project:new FormControl(''),
    address:new FormControl(''),
    skillSet:new FormControl(''),
    officeEmail:new FormControl(''),


    
  });


  checked = true;  
  hide = true;
  selectedUserID = this.userService.selectedUser != null ? this.userService.selectedUser.uid : 0;
  photoURL = this.userService.editSelectedUser.photoURL;
  isEdit = false;
  isAdmin = this.userService.selectedUser.role == "1" ? true: false;
  isAdminEdit = this.isAdmin && !this.isEdit ? true : false;
  
  constructor(private _router: Router,public userService:UserService) {
    console.log(this.userService.editSelectedUser)
   }

 // formControls=this.userService.form.controls;
    formControls=this.resetformone.controls;


  ngOnInit(): void {
    console.log(this.userService.selectedUser);
    
    this.populateForm(this.userService.editSelectedUser); 
    
  }

  onBack(): void {
    this._router.navigate(['/flexy/home']);
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
  updateeditUser(){

    
    this.userService.updateEditUser(this.userService.editSelectedUser.id,this.resetformone.value.firstName,this.resetformone.value.lastName,
    this.resetformone.value.dob,this.resetformone.value.doj,this.resetformone.value.skillSet,this.resetformone.value.address,
    this.resetformone.value.officeEmail,this.resetformone.value.phone,this.resetformone.value.project
    );
    this._router.navigate(['/manage-users']);
  }

  populateForm(user:any){
    this.resetformone.setValue(user);
  }
}
