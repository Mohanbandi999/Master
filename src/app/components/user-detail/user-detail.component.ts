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

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  checked = true;  
  hide = true;
  selectedUserID = this.userService.selectedUser != null ? this.userService.selectedUser.uid : 0;
  photoURL = this.userService.selectedUser.photoURL;
  isEdit = false;
  isAdmin = this.userService.selectedUser.role == "1" ? true: false;
  isAdminEdit = this.isAdmin && !this.isEdit ? true : false;
  
  constructor(private _router: Router,public userService:UserService) {
    console.log(this.userService.selectedUser)
   }
  formControls=this.userService.form.controls;
  ngOnInit(): void {
    
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
    this.userService.deleteUser(this.selectedUserID);
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
}
