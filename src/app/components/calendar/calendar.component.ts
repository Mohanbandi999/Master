import { Component, OnInit,Input,Output,EventEmitter,OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import {  AbstractControl,FormControl,FormGroup,ValidationErrors,ReactiveFormsModule ,Validators,
ValidatorFn,FormBuilder} from '@angular/forms';
import { CelenderServiceService } from 'src/app/services/celender-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import { AngularFireList } from '@angular/fire/compat/database';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { Calinfo } from 'src/app/models/calender-data';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { filter, from, map, Observable, of, switchMap, Timestamp } from 'rxjs';

//Add Changes
import {
 // Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import startOfISOWeekYear from 'date-fns/startOfISOWeekYear';

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
  templateUrl: './calendar.component.html',
})
export class CalendarComponent implements OnInit { 

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date(); 
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        // this.events = this.events.filter((iEvent) => iEvent !== event);
        this.eventsList = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[] = [
    
  ];
  activeDayIsOpen: boolean = true;
  eventsList: any; 

  // dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    dayClicked({ date, eventsList }: { date: Date; eventsList: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        eventsList.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    // this.events = this.events.map((iEvent) => {
      this.eventsList = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    
  }
  addEvent(): void {   
    this.eventsList = [
      ...this.eventsList,
      {
        title: 'New event',
        start: startOfDay(new Date(0)),
        end: endOfDay(new Date(0)),        
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }
  saveEvents(eventAdd: CalendarEvent){    
    const data = eventAdd as unknown as Calinfo;      
      this.CalenderService.createcalenderEvent(data); 
      //this.CalenderService.createcalenderEvent(data); 
      alert('The events was inserted successfully!');
      this.ngOnInit(); 
  }
  // deleteEvent(eventToDelete: CalendarEvent) {
  //   this.events = this.events.filter((event) => event !== eventToDelete); 
  //   this.fetchData();     
  // }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }  
  constructor(private _router: Router,private CalenderService : CelenderServiceService) {
    //this.fetchData();
   }
 // ngOnInit(): void {  
  ngOnInit():void {  
    this.fetchData();   
 } 

  ngOnChanges() {
    // this.message = '';
    // this.currentTutorial = { ...this.tutorial };
    this.fetchData();  
  }  
  delete(id: string) {
    this.CalenderService.deletePolicy(id);     
    alert('The events was Deleted');
    this.ngOnInit();  
     
  } 
update(cal: Calinfo) {
  this.CalenderService.updatePolicy(cal);
}

fetchData() {
  this.CalenderService.getPolicies().subscribe(data => {
 
    this.eventsList = data.map(e => {
      //alert(this.eventsList.id);
      return {        
        id: e.payload.doc.id,      
        title:e.payload.doc.get("title"),
        start:e.payload.doc.get("start").toDate(),
        end:e.payload.doc.get("end").toDate(),     
      } as Calinfo;
      
    })
  });
}  
}

  

