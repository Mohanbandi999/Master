import { Injectable } from '@angular/core';
import { Calinfo } from '../models/calender-data';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { filter, from, map, Observable, of, switchMap, Timestamp } from 'rxjs';
import { fromEvent } from 'rxjs';
import { timestamp } from 'rxjs/operators';
import { id } from 'date-fns/locale';

@Injectable({
  providedIn: 'root'
})
export class CelenderServiceService {  
  constructor(public firestore: AngularFirestore) {}
  // createcalenderEvent(vm: Calinfo){
  //   return this.firestore.collection('calender').add(vm);
  // } 
 getPolicies() {
      return this.firestore.collection('calender').snapshotChanges();
  }
 
 saveupdateEvent(cal: Calinfo){  
  if(cal.id==0 || cal.id==null || cal.id=='') 
  {
    this.firestore.collection('calender').add(cal);
    alert("Inserted Successfully");
  }
  else{
    this.firestore.doc('calender/'+cal.id).update(cal);
  alert("Updated Successfully")
  } 
  
}
  deleteEvent(id: string){
      this.firestore.doc('calender/' + id).delete();
  }
}
  
   


