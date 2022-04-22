import { Injectable } from '@angular/core';
import { leaveinfo } from '../models/leave-data';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { filter, from, map, Observable, of, switchMap } from 'rxjs';
import { id } from 'date-fns/locale';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(public firestore: AngularFirestore) { }



  applyleavemethod(leave: leaveinfo){
    return this.firestore.collection('leaves').add(leave);
  }

  getleaves() {
    return this.firestore.collection('leaves').snapshotChanges().pipe(
      map(actions => 
        actions.map(a => {
          const data = a.payload.doc.data() as leaveinfo;
          const id = a.payload.doc.id;
          //const vmid=a.payload.doc.get("vmid")

          return { id,...data };
        })
        )
      )   
  }


  getLeaveList() {  
    return this.firestore.collection('leaves').snapshotChanges();
}

saveupdateSheetList(leaveInfo: leaveinfo){   
    this.firestore.doc('leaves/'+leaveInfo.id).update(leaveInfo);    
 }
}
