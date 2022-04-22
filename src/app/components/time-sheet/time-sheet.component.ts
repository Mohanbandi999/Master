import { Component, OnInit,Input,Output,EventEmitter,OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import {ChangeDetectionStrategy,ViewChild,TemplateRef,} from '@angular/core';
import {startOfDay,endOfDay,subDays,addDays,endOfMonth,isSameDay, isSameMonth, addHours, getDate,} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView,} from 'angular-calendar';
import startOfISOWeekYear from 'date-fns/startOfISOWeekYear';
import { TimesheetService } from 'src/app/services/timesheet.service';
import { timesheetInfo } from 'src/app/models/timesheet-data';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { id } from 'date-fns/locale';
import { DatePipe } from '@angular/common';
//import { UserService } from '../services/user.service';
import { MatTableDataSource } from '@angular/material/table';



const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      h3 {
        margin: 0 0 10px;
      }

      pre {
        background-color: #f5f5f5;
        padding: 15px;
      }
    `,
  ],
  // selector: 'app-time-sheet',
  templateUrl: './time-sheet.component.html',
  //styleUrls: ['./time-sheet.component.scss']
})
export class TimeSheetComponent implements OnInit {
  //view: CalendarView = CalendarView.Month;
  //CalendarView = CalendarView;
  viewDate: Date = new Date();
  
  refresh = new Subject<void>();
  events: CalendarEvent[] = [  
  ];    

  activeDayIsOpen: boolean = true;
  sheetList:any;
  //showListDate:any;

  addEvent(): void {
    this.sheetList = [
      ...this.sheetList,
      {        
        task:'',
        description:'',
        hours:'',
        modified: this.selectedDate,
        userId:'',

      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  // setView(view: CalendarView) {
  //   this.view = view;
  // }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  //End

  selectedDate = new Date();
  date = new Date();
  myDate = new Date();  
  constructor(private timesheetService : TimesheetService,public firestore: AngularFirestore) { }
  //,public userService:UserService
  //date1 = new Date((new Date().getTime() - 3888000000));
  maxDate = new Date();
  curDate = new Date();
  startDay = 1; //0=sunday, 1=monday etc.
  d = this.maxDate.getDay(); //get the current day
  weekStart = new Date(this.maxDate.valueOf() - (this.d<=0 ? 7-this.startDay:this.d-this.startDay)*86400000); //rewind to start day
  weekEnd = new Date(this.weekStart.valueOf() + 6*86400000); //add 6 days to get last day  
  weekStarttemp = this.weekStart;
  tasks:any;
  ngOnInit(): void {
  //this.myDate.setDate(this.date.getDate() + 7);
  this.selectedDate = new Date();
  this.fetchData(); 
  this.onChangeEvent(this.selectedDate);  
  }  

  //New
  convert(str:any) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }   

  fetchData() {
    this.timesheetService.getSheetList().subscribe(data => {             
      var selectedData= data.filter( (record) => {  
      return this.convert(record.payload.doc.get("modified").toDate()) == this.convert(this.selectedDate) && localStorage.getItem('currentUser') == record.payload.doc.get("userId");  
     
     });  

      this.sheetList = selectedData.map(e => {                  
        return {        
          id: e.payload.doc.id,                                                   
          description:e.payload.doc.get("description"),
          hours:e.payload.doc.get("hours"),
          task:e.payload.doc.get("task"),
          modified:e.payload.doc.get("modified").toDate(),
          userId:e.payload.doc.get("userId"),          
          status:e.payload.doc.get("status"),
          userName:e.payload.doc.get("userName")

        } as timesheetInfo;     
     })   
    });      
  } 
  onChangeEvent(event:any){ 
   this.selectedDate = event.target.value;
   this.fetchData();  
  }
update(timesht: timesheetInfo) {    
  //const user = localStorage.getItem('currentUser');
  timesht.userName=localStorage.getItem('logName'); 
  timesht.userId = localStorage.getItem('currentUser'); 
  timesht.status= "pending" ;
  timesht.project= localStorage.getItem('logProject');
  this.timesheetService.saveupdateSheetList(timesht); 
  
}
delete(id: string) {
  this.timesheetService.deleteEvent(id);     
  alert('The events was Deleted');
  this.ngOnInit();  
  for(let i = 0; i < this.sheetList.length; ++i){
    if (this.sheetList[i].id === id) {
        this.sheetList.splice(i,1);
   }
}
}

}
