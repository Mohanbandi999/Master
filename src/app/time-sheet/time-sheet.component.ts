import { Component, OnInit,Input,Output,EventEmitter,OnChanges } from '@angular/core';

import { Router } from '@angular/router';

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
  // selector: 'app-time-sheet',
  templateUrl: './time-sheet.component.html',
  //styleUrls: ['./time-sheet.component.scss']
})
export class TimeSheetComponent implements OnInit {



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
    {
      start: subDays(endOfMonth(new Date()), 3),
      //end: addDays(endOfMonth(new Date()), 3),
      title: 'Test',
      //color: colors.blue,
      //allDay: true,
    }
  ];
  

  activeDayIsOpen: boolean = true;

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
        title: 'No of hours',
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



  date = new Date();
  myDate = new Date();

  
  // onDataChange(newdate) {
  //   const _ = moment();
  //   const date = moment(newdate).add({hours: _.hour(), minutes:_.minute() , seconds:_.second()})
  //   this.date = date.toDate();
  //   console.log({hours: _.hour(), minutes:_.minute() , seconds:_.second()})
  // }

  // myFunction(){
  //   this.date=new Date();
  //   let latest_date =this.datepipe.transform(this.date, 'yyyy-MM-dd');
  //  }

//   parseDate(dateString: string): Date {
//     if (dateString) {
//         return new Date(dateString);
//     }
//     return this.date;
// }

  constructor() { }
  //date1 = new Date((new Date().getTime() - 3888000000));
  maxDate = new Date();
  curDate = new Date();
  startDay = 1; //0=sunday, 1=monday etc.
  d = this.maxDate.getDay(); //get the current day
  weekStart = new Date(this.maxDate.valueOf() - (this.d<=0 ? 7-this.startDay:this.d-this.startDay)*86400000); //rewind to start day
  weekEnd = new Date(this.weekStart.valueOf() + 6*86400000); //add 6 days to get last day  
  weekStarttemp = this.weekStart;
  ngOnInit(): void {
  this.myDate.setDate(this.date.getDate() + 7);
  }

 
  onChangeEvent(event:any){
    let temp = this.weekStart.getDate();    
    for(let i=0; i<6;i++){      
            
        if( temp <= this.maxDate.getDate())
        {  let dd;     if(i == 2)  {
          dd = new Date(this.weekStarttemp.setDate(this.weekStart.getDate() + 1));          
        }else{
           dd = new Date(this.weekStarttemp.setDate(this.weekStart.getDate() + i));
        }
          //console.log(dd);
          let m = dd.getMonth()+1;
          console.log(dd.getDate()+'/'+m+'/'+dd.getFullYear());
        }
        this.weekStarttemp = this.weekStart;
    }
  }
}
