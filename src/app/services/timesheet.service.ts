import { Injectable } from '@angular/core';
import { timesheetInfo } from '../models/timesheet-data'; 
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/compat/firestore';
//import { filter, from, map, Observable, of, switchMap, Timestamp } from 'rxjs';
import { fromEvent } from 'rxjs';
import { timestamp } from 'rxjs/operators';
import { id } from 'date-fns/locale';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  constructor(public firestore: AngularFirestore) { }

  getSheetList() {
    //alert("serv");
    return this.firestore.collection('timesheet').snapshotChanges();
}
saveApproveSheetList(timeSheet: timesheetInfo){  
  this.firestore.doc('timesheet/'+timeSheet.id).update(timeSheet);  
}
saveupdateSheetList(timeSheet: timesheetInfo){  
  
   if(timeSheet.id==0 || timeSheet.id==null || timeSheet.id=='') 
   {     
      this.firestore.collection('timesheet').add(timeSheet);
      alert("Inserted Successfully");
   }
   else{
    //alert(timeSheet.id);
     this.firestore.doc('timesheet/'+timeSheet.id).update(timeSheet);
   alert("Updated Successfully")
   }     
  }
  deleteEvent(id: string){
    this.firestore.doc('timesheet/' + id).delete();
}

}
