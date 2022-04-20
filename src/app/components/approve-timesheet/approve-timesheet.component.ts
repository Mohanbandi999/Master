import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TimesheetService } from 'src/app/services/timesheet.service';
import { timesheetInfo } from 'src/app/models/timesheet-data';
//import { AngularFirestore } from '@angular/fire/compat/firestore';
import { id } from 'date-fns/locale';
//import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-approve-timesheet',
  templateUrl: './approve-timesheet.component.html',
  styleUrls: ['./approve-timesheet.component.scss']
})
export class ApproveTimesheetComponent implements OnInit {
  refresh = new Subject<void>();
  maxDate = new Date();
  curDate = new Date();
  selectedCheck: any=[];

  approveSheetList:any;
  form: any;


  constructor(private timesheetService:TimesheetService) { }

  ngOnInit(): void {    
    this.fetchData();
  }


  selectedDate = new Date();
  onChangeEvent(event:any){ 
    this.selectedDate = event.target.value;
    this.fetchData();  
   }
   convert(str:any) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }   

   fetchData() {
    this.timesheetService.getSheetList().subscribe(data => {             
      var selectedData= data.filter( (record) => {  
      console.log(record.payload.doc.get("modified").toDate());      
      //return this.convert(record.payload.doc.get("modified").toDate()) == this.convert("Thu Apr 14 2022 12:30:00 GMT+0530 (India Standard Time)");  
      return this.convert(record.payload.doc.get("modified").toDate()) == this.convert(this.selectedDate) && localStorage.getItem('logProject') == record.payload.doc.get("project") && localStorage.getItem('currentUser') != record.payload.doc.get("userId");  
     });  

      this.approveSheetList = selectedData.map(e => {
        console.log(e.payload.doc.get("modified").toDate());             
        return {        
          id: e.payload.doc.id,                                                   
          description:e.payload.doc.get("description"),
          hours:e.payload.doc.get("hours"),
          task:e.payload.doc.get("task"),
          modified:e.payload.doc.get("modified").toDate(),
          userId:e.payload.doc.get("userId"),   
         status:e.payload.doc.get("status"),       
        } as timesheetInfo;     
     })   
    });      
  } 
 
   checkAll() {
    for (let i = 0; i < this.selectedCheck.length; i++) {
      this.selectedCheck.pop[i];
    }
    for (let i = 0; i < this.approveSheetList.length; i++) {
      this.approveSheetList[i].selected = true;
      this.selectedCheck.push(this.approveSheetList[i].id);
    }    

  }
  uncheckAll() {
    for (let i = 0; i < this.approveSheetList.length; i++) {
      this.approveSheetList[i].selected = false;      
    }    
    for (let i = 0; i < this.selectedCheck.length; i++) {
      this.selectedCheck.pop[i];
    }
  }



  approve(timesht: timesheetInfo) {     
   
    for (let i = 0; i < this.selectedCheck.length; i++) {
      console.log(this.selectedCheck[i]);
      for (let j = 0; j < this.approveSheetList.length; j++) {
        if(this.approveSheetList[j].id == this.selectedCheck[i]){
          this.approveSheetList[j].status = "Approved";
          this.timesheetService.saveApproveSheetList(this.approveSheetList[j]);     
        }
      }
    }  
      alert("Updated Successfully")
  }



  submit(){
    console.log(this.form.value);
  } 


onCheckboxChange(event:any)
  {
  let index= this.selectedCheck.indexOf(event.target.value);
  if(index==-1)
  {
  
    this.selectedCheck.push(event.target.value);
   
  //  this.selectedCheck.push(list.value);
  }
  else{
    //event.target.value="pending"
    this.selectedCheck.splice(index,1)
   // event.target.value="pending"
   //this.selectedCheck.push(event.target.value);
  }
    console.log(this.selectedCheck);
}



}

