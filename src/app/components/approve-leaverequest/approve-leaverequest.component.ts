import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { leaveinfo } from 'src/app/models/leave-data';
import { LeaveService } from 'src/app/services/leave.service';
import { id } from 'date-fns/locale';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-approve-leaverequest',
  templateUrl: './approve-leaverequest.component.html',
  styleUrls: ['./approve-leaverequest.component.scss']
})
export class ApproveLeaverequestComponent implements OnInit {
  refresh = new Subject<void>();
 // maxDate = new Date();
  curDate = new Date();
  approveSheetList:any;
  selectedCheck: any=[];

  form: any;
 
  constructor(private leaveService:LeaveService) { }

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
    
    this.leaveService.getLeaveList().subscribe(data => { 
      
      var selectedData= data.filter( (record) => { 
        console.log(record.payload.doc.get("datefrom")); 
        //return this.convert(record.payload.doc.get("datefrom").toDate()) == this.convert("Thu Apr 14 2022 12:30:00 GMT+0530 (India Standard Time)");  
       return record.payload.doc.get("datefrom") == this.convert(this.selectedDate);
       

     //return this.convert(record.payload.doc.get("datefrom").toDate()) == this.convert(this.selectedDate) && localStorage.getItem('logProject') == record.payload.doc.get("project") && localStorage.getItem('currentUser') != record.payload.doc.get("userId"); 

      })
      this.approveSheetList = selectedData.map(e => {
        //alert(this.eventsList.id);
        return {        
          id: e.payload.doc.id,      
          leavetype:e.payload.doc.get("leavetype"),
          leavereason:e.payload.doc.get("leavereason"),
          datefrom:e.payload.doc.get("datefrom"),
          dateto:e.payload.doc.get("dateto"), 
          userId:e.payload.doc.get("userId"),   
          status:e.payload.doc.get("status"),      
        } as leaveinfo;     
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
  onCheckboxChange(event:any)
  {
  let index= this.selectedCheck.indexOf(event.target.value);
  if(index==-1)
  {
  
    this.selectedCheck.push(event.target.value); 
  }
  else{    
    this.selectedCheck.splice(index,1)  
  }
   
   console.log(this.selectedCheck);
}
approve(timesht: leaveinfo) { 
   
  for (let i = 0; i < this.selectedCheck.length; i++) {
    console.log(this.selectedCheck[i]);
    for (let j = 0; j < this.approveSheetList.length; j++) {
      if(this.approveSheetList[j].id == this.selectedCheck[i]){
        this.approveSheetList[j].status = "Approved";
        this.leaveService.saveupdateSheetList(this.approveSheetList[j]);     
      }
    }
  }  
    //alert("Updated Successfully")
}




}
