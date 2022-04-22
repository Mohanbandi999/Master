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
  selector: 'app-leaves-list',
  templateUrl: './leaves-list.component.html',
  styleUrls: ['./leaves-list.component.scss']
})
export class LeavesListComponent implements OnInit {

  
  
  

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
  dayscout=0;

  leaveslist:any;


  dayslist:any[]=[];

  


  constructor(private leaveservice:LeaveService,private _router: Router, public afs:AngularFirestore ) { }
  
  

  


  ngOnInit(): void {
    this.customerArray=  [];   
    //this.getleaves();
    this.fetchData()
    //this.lastuser();
    this.fetchDataDays();
    
    

  }
  
  

  

   getleaves(){
    this.customerArray=[];
      this.leaveservice.getleaves().subscribe(res=>{      
      for(var i=0;i<res.length;i++)
      {       
        if(localStorage.getItem('currentUser')==res[i].userId){
          console.log(res[i]); 
          this.customerArray.push(res[i]);     
        }}                                      
          this.dataleave =new MatTableDataSource(this.customerArray);          
    })
   }

   fetchData() {
    this.leaveservice.getLeaveList().subscribe(data => {             
      var selectedData= data.filter( (record) => {    
     return localStorage.getItem('currentUser') == record.payload.doc.get("userId")  
  });  

      this.leaveslist = selectedData.map(e => {
                     
        return {        
          id: e.payload.doc.id,                                                   
          datefrom:e.payload.doc.get("datefrom"),
          dateto:e.payload.doc.get("dateto"),
          leavereason:e.payload.doc.get("leavereason"),
          leavetype:e.payload.doc.get("leavetype"),
          days:e.payload.doc.get("days"),
          userId:e.payload.doc.get("userId"),   
         status:e.payload.doc.get("status"),  
         userName:e.payload.doc.get("userName")     
        } as leaveinfo;     
     })   
     this.dataleave =new MatTableDataSource(this.leaveslist);
     console.log(this.leaveslist);
    });      
  }


  fetchDataDays() {
    this.leaveservice.getLeaveList().subscribe(data => {             
      var selectedData= data.filter( (record) => {    
     return localStorage.getItem('currentUser') == record.payload.doc.get("userId")  
  });  

      this.dayslist = selectedData.map(e => {
                     
        return {        
          id: e.payload.doc.id,                                                   
          datefrom:e.payload.doc.get("datefrom"),
          dateto:e.payload.doc.get("dateto"),
          leavereason:e.payload.doc.get("leavereason"),
          leavetype:e.payload.doc.get("leavetype"),
          days:e.payload.doc.get("days"),
          userId:e.payload.doc.get("userId"),   
         status:e.payload.doc.get("status"),  
         userName:e.payload.doc.get("userName")     
        } as leaveinfo;     
     })  
     this.dayscout=this.dayslist.reduce(function (a,b) { return a + b.days; }, 0);
     console.log(this.dayscout);
     
    });      
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
        if(localStorage.getItem('currentUser')==result[i].userId){

         this.dayss.push(Number(result[i].days));
         console.log(this.dayss);
         this.dayscout= this.dayss.reduce((a, b) => a + b, 0) 
         console.log(this.dayscout);        
         }
        }
      })
    }    
}

