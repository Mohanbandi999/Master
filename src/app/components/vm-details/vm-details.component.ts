import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  AbstractControl,FormControl,FormGroup,ValidationErrors,ReactiveFormsModule ,Validators,
ValidatorFn,FormBuilder} from '@angular/forms';
import { VirtualmachineService } from 'src/app/services/virtualmachine.service';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import { AngularFireList } from '@angular/fire/compat/database';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { AddVmComponent } from '../add-vm/add-vm.component';





@Component({
  selector: 'app-vm-details',
  templateUrl: './vm-details.component.html',
  styleUrls: ['./vm-details.component.scss']
})
export class VmDetailsComponent implements OnInit {
 
  vmForm = new FormGroup({
      
    vmname:new FormControl('',Validators.required),
    vmid:new FormControl('',Validators.required),
    vmusername:new FormControl('',Validators.required ),
    vmpassword: new FormControl('',Validators.required),
    vmtype: new FormControl('', ),
    
    
    
    
  }
  );

  vmformupdate= new FormGroup({
      
    
    firstName:new FormControl(''),
    userid:new FormControl('')
  });
  checked = true;  
  hide = true;
  error="";
  
  displayedColumns: string[] = ['id', 'name', 'isActive', 'user', 'delete'];
  

  dataSourceone:any;
    //dataSource:MatTableDataSource<Element>;
  customerArray:any[] = [];     
   vmidarray:any=[];
  datasoc:any;

  //for users for userservice:
  dataSourceU:any;
  datasocU:any;
  customerArrayU:any[]=[];




  onView(): void{
    this._router.navigate(['/user-detail']);    
  }

  constructor(private _router: Router, public vmservice:VirtualmachineService,public userservice:UserService,
    private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getvms();
    this.getusers();
  }

  createVM():void{
    this.vmservice.createvm(this.vmForm.value);
    this.error="Succesfully submitted"
    setTimeout(() => {
      this.error=""
  }, 3000);  //5s
    this.panelOpenState = false;
  }

  onBack(): void {
    this._router.navigate(['/flexy/home']);
  }

  onCheck(): void{
    this.checked = !this.checked;
  }

  panelOpenState = false;
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }


  getvms(){
      this.vmservice.getvms().subscribe(res=>{
      this.dataSourceone=res;
      this.datasoc =new MatTableDataSource(this.dataSourceone);
      console.log(this.datasoc.data);
      this.customerArray=this.datasoc.data;
    })
  }  


  getusers(){
      this.userservice.getAllUsers().subscribe(res=>{
      this.dataSourceU=res;
      this.datasocU =new MatTableDataSource(this.dataSourceU);
      //console.log(this.datasoc.data)
      this.customerArrayU=this.datasocU.data;
  })
  }


  assignvmtoUser(){
    
    this.vmservice.assignvmtoUser(this.vmformupdate.value.userid,this.vmformupdate.value.firstName);
    this.error="Succesfully updated"
    setTimeout(() => {
      this.error=""
  }, 3000);  //5s
    return;
  }
    
  // updatevmtouser() {
  //     this.userservice.updateVMDetails(this.vmformupdate.value.userid,this.vmformupdate.value.firstName);     
  //    return;
  //   }




}



