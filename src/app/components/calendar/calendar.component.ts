import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {  AbstractControl,FormControl,FormGroup,ValidationErrors,ReactiveFormsModule ,Validators,
ValidatorFn,FormBuilder} from '@angular/forms';
import { CelenderServiceService } from 'src/app/services/celender-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import { AngularFireList } from '@angular/fire/compat/database';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { Calinfo } from 'src/app/models/calender-data';


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
//End

// @Component({
//   selector: 'app-calendar',
//   templateUrl: './calendar.component.html',
//   styleUrls: ['./calendar.component.scss']
// })
export class CalendarComponent implements OnInit {

  //Add Changes
// @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  // modalData: {
  //   action: string;
  //   event: CalendarEvent;
  // };

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
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[] = [
    // {
    //   start: subDays(startOfDay(new Date()), 1),
    //   end: addDays(new Date(), 1),
    //   title: 'A 3 day event',
    //   color: colors.red,
    //   actions: this.actions,
    //   allDay: true,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
    // {
    //   start: startOfDay(new Date()),
    //   title: 'An event with no end date',
    //   color: colors.yellow,
    //   actions: this.actions,
    // },
    // {
      
    //   start: subDays(endOfMonth(new Date()), 3),
    //   end: addDays(endOfMonth(new Date()), 3),
    //   title: 'A long event that spans 2 months',
    //   color: colors.blue,
    //   allDay: true,
    // },
    // {
    //  // start: addHours(startOfDay(new Date()),0),
    //   start: addHours(startOfDay(new Date().setHours(13,0,0,0)),0),
    //   end: addHours(endOfDay(new Date()), 5050),
    //  // end: addHours(new Date(), 11),
       
    //   title: 'Diwali',
    //   color: colors.yellow,
    //   actions: this.actions,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
  ];

  activeDayIsOpen: boolean = true;
  events1: any;

  //constructor(private modal: NgbModal) {}

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
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
    this.events = this.events.map((iEvent) => {
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
    // this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
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


  constructor(private _router: Router,private CalenderService : CelenderServiceService) { }
  

  ngOnInit(): void {    
   this.CalenderService.getcalenderEvents().subscribe(res=>{
    let dataSourceone=res;
    let temp =new MatTableDataSource(dataSourceone);
    console.log(temp.data);
    //this.customerArray=this.datasoc.data;
    //this.events = temp.data
    this.events1 = temp.data;

  });

  }

  // onBack(): void {
  //   this._router.navigate(['/flexy/home']);
  // }

  

  
}
