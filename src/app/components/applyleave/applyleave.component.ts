import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireStorage, AngularFireUploadTask } from "@angular/fire/compat/storage";
import { AngularFireStorageReference } from '@angular/fire/compat/storage';
import { Observable, Subject } from 'rxjs';
import {AngularFirestore,AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import { map, finalize } from "rxjs/operators";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { leaveinfo } from 'src/app/models/leave-data';
import { LeaveService } from 'src/app/services/leave.service';
import {  
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,ReactiveFormsModule ,
  Validators,
  ValidatorFn,
  FormBuilder
} from '@angular/forms';
import { V } from '@angular/cdk/keycodes';
import { AngularFireList } from '@angular/fire/compat/database';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-applyleave',
  templateUrl: './applyleave.component.html',
  styleUrls: ['./applyleave.component.scss']
})
export class ApplyleaveComponent implements OnInit {


  error="";
  
  leaveform=new FormGroup({
       leavetype:new FormControl('',Validators.required),
       leavereason:new FormControl('',Validators.required),    
       datefrom:new FormControl('', Validators.required),
       dateto:new FormControl('',Validators.required),
       days:new FormControl('',[ Validators.required,Validators.max(8)]),
       userId:new FormControl(localStorage.getItem('currentUser')),
       status: new FormControl('pending'),
       project:new FormControl(localStorage.getItem('logProject')),
       userName:new FormControl(localStorage.getItem('logName')),

         
  })


  checked = true;  
  hide = true;
  displayedColumns: string[] = ['id', 'reason', 'name', 'isActive', 'user', 'delete'];
  dataSourceone:any;
    //dataSource:MatTableDataSource<Element>;
  customerArray:any[] = [];     
   vmidarray:any=[];
  dataleave:any;
  //for users for userservice:
  dataSourceU:any;
  datasocU:any;
  customerArrayU:any[]=[];
  dayss:any[] = []; 
  dayscout:any;


  constructor(private leaveservice:LeaveService,private _router: Router, public afs:AngularFirestore ) { }
  
  leavetypes =[ {id:"Planed",value:"Planed"},
  {id:"sick",value:"Sick"},
  {id:"Casual",value:"Casual"},
  {id:"other",value:"Other"}];

  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }


  ngOnInit(): void {
    this.customerArray=  [];    
    this.getleaves();    
    this.lastuser();

  }
  
  get leavetype(){
    return this.leaveform.get('leavetype');
   }
  get datefrom(){
    return this.leaveform.get('datefrom');
   }
  get dateto(){
    return this.leaveform.get('dateto');
   }
  get leavereason(){
    return this.leaveform.get('leavereason');
   }
   get days(){
    return this.leaveform.get('days');
   }


  submit(){
    this.leaveservice.applyleavemethod(this.leaveform.value);
    
    this.leaveform.reset();
    
    this.error="Leave Request succesfully Submitted"
    setTimeout(() => {this.error="";}, 3000);
   }

   getleaves(){
    this.customerArray=[];
      this.leaveservice.getleaves().subscribe(res=>{      
      for(var i=0;i<res.length;i++)
      {       
        if(localStorage.getItem('currentUser')==res[i].id){
          console.log(res[i]); 
          this.customerArray.push(res[i]);     
        }}                                      
          this.dataleave =new MatTableDataSource(this.customerArray);
          //console.log(this.dataleave.data);
         // this.customerArray=this.dataleave.data;
    })
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
  refresh(): void {
    window.location.reload();
  }

  
  lastuser() {
    this.leaveservice.getleaves()
     .subscribe( result => {
      for(var i=0;i<result.length;i++)
      {        
        if(localStorage.getItem('currentUser')==result[i].id){          
         this.dayss.push(Number(result[i].days));  
         this.dayscout= this.dayss.reduce((a, b) => a + b, 0)         
         }
        }
      })
    }    
}
