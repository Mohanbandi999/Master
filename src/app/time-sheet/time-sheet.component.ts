import { Component, OnInit,Input,Output,EventEmitter,OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import {ChangeDetectionStrategy,ViewChild,TemplateRef,} from '@angular/core';
import {startOfDay,endOfDay,subDays,addDays,endOfMonth,isSameDay, isSameMonth, addHours, getDate,} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView,} from 'angular-calendar';
import startOfISOWeekYear from 'date-fns/startOfISOWeekYear';
import { TimesheetService } from '../services/timesheet.service';
import { timesheetInfo } from '../models/timesheet-data';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { id } from 'date-fns/locale';
import { DatePipe } from '@angular/common';



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
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
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
        title: '',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),        
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  //End

  selectedDate = new Date();
  date = new Date();


  myDate = new Date();  
  constructor(private timesheetService : TimesheetService,public firestore: AngularFirestore) { }
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
  this.myDate.setDate(this.date.getDate() + 7);
 this.fetchData();   

  //this.tasks = this.db.collection(config.collection_endpoint).valueChanges();



  } 
  // onChangeEvent(event:any){    
  //   let temp = this.weekStart.getDate();      
  //   for(let i=0; i<6;i++){      
            
  //       if( temp <= this.maxDate.getDate())
  //       {  let dd;     if(i == 2)  {
  //         dd = new Date(this.weekStarttemp.setDate(this.weekStart.getDate() + 1));          
  //       }else{
  //          dd = new Date(this.weekStarttemp.setDate(this.weekStart.getDate() + i));
  //       }
  //         //console.log(dd);
  //         let m = dd.getMonth()+1;
  //         console.log(dd.getDate()+'/'+m+'/'+dd.getFullYear());
  //       }
  //       this.weekStarttemp = this.weekStart;
  //   }

  // }

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
      console.log(record.payload.doc.get("modified").toDate());      
      //return this.convert(record.payload.doc.get("modified").toDate()) == this.convert("Thu Apr 14 2022 12:30:00 GMT+0530 (India Standard Time)");  
      return this.convert(record.payload.doc.get("modified").toDate()) == this.convert(this.selectedDate);  
     });  

      this.sheetList = selectedData.map(e => {
        console.log(e.payload.doc.get("modified").toDate());             
        return {        
          id: e.payload.doc.id,      
          description:e.payload.doc.get("description"),
          hours:e.payload.doc.get("hours"),
          task:e.payload.doc.get("task"),
          modified:e.payload.doc.get("modified").toDate(),          
        } as timesheetInfo;
     
     })   
    });  
    
  } 

  onChangeEvent(event:any){ 
   this.selectedDate = event.target.value;
   this.fetchData();  
  }






  //NewEnd





// fetchData() {
//   this.timesheetService.getSheetList().subscribe(data => { 
//     this.sheetList = data.map(e => {
//       //alert(this.eventsList.id);
//       return {        
//         id: e.payload.doc.id,      
//         task:e.payload.doc.get("task"),
//         description:e.payload.doc.get("description"),
//         hours:e.payload.doc.get("hours"),
//         modified:e.payload.doc.get("modified").toDate(),     
//       } as timesheetInfo;     
//     })   
//   });  
// } 
//save
update(timesht: timesheetInfo) {
 // alert("test");
  this.timesheetService.saveupdateSheetList(timesht);
 // alert('The events was Updated successfully!');
}

delete(id: string) {
  this.timesheetService.deleteEvent(id);     
  alert('The events was Deleted');
  this.ngOnInit();  
//New start
  for(let i = 0; i < this.sheetList.length; ++i){
    if (this.sheetList[i].id === id) {
        this.sheetList.splice(i,1);
    }
}
}

}
