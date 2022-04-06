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
  //update working
//   updatePolicy(cal: Calinfo){   
//     this.firestore.doc('calender/'+cal.id).update(cal);
// }
//update working
 
 // Finally, you can add the deletePolicy() method to delete an insurance policy by its identifier:
  
  deleteEvent(id: string){
      this.firestore.doc('calender/' + id).delete();
  }
//   updatePolicy(id: string){
//     this.firestore.doc('calender/' + id).update();
// }
}
  
   //end


