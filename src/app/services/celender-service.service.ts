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
  private dbPath = '/calender';
  tutorialsRef: AngularFirestoreCollection<Calinfo>;
  constructor(public firestore: AngularFirestore) {
    this.tutorialsRef = firestore.collection(this.dbPath);
    //alert(this.tutorialsRef.doc.name);
   }


  getcalenderEvents() {
    return this.firestore.collection('calender').snapshotChanges().pipe(
      map(actions => 
        actions.map(a => {
          const data = a.payload.doc.data() as Calinfo;
          const title = a.payload.doc.get("title");
          const startdate =  a.payload.doc.get("start");
          const enddate = a.payload.doc.get("end");
          const id = a.payload.doc.id;                            
          //const vmid=a.payload.doc.get("vmid")
          //alert(startdate);
        //  alert(enddate);
          return { id,...data };
        })
        )
      )   
  }

  createcalenderEvent(vm: Calinfo){
    return this.firestore.collection('calender').add(vm);
  }

 
getPolicies() {
      return this.firestore.collection('calender').snapshotChanges();
  }
 // You also need to add the createPolicy() method to persist an insurance policy in the Firestore database:
  
  // createPolicy(cal: Calinfo){
  //     return this.firestore.collection('calender').add(cal);
  // }
 // Next, you need to add the updatePolicy() method to update an insurance policy by its identifier:
  
  updatePolicy(cal: Calinfo){
      delete cal.id;
      alert(cal.id);
      this.firestore.doc('calender/' + cal.id).update(cal);
  }
 // Finally, you can add the deletePolicy() method to delete an insurance policy by its identifier:
  
  deletePolicy(id: string){
      this.firestore.doc('calender/' + id).delete();
  }
}
  
   //end


