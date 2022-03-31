import { Injectable } from '@angular/core';
import { Calinfo } from '../models/calender-data';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { filter, from, map, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CelenderServiceService {

  constructor(public firestore: AngularFirestore) { }


  getcalenderEvents() {
    return this.firestore.collection('calender').snapshotChanges().pipe(
      map(actions => 
        actions.map(a => {
          const data = a.payload.doc.data() as Calinfo;
          const id = a.payload.doc.id;
          
          //const vmid=a.payload.doc.get("vmid")

          return { id,...data };
        })
        )
      )   
  }

  createcalenderEvent(vm: Calinfo){
    return this.firestore.collection('calender').add(vm);
  }

  

}
