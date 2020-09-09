import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CRUDService {

  constructor(private readonly afs: AngularFirestore, private db: AngularFireDatabase) { }

  Add(collectionName, data){
    this.afs.collection<any>(collectionName).add(data);
  }

  GetAll(collectionName){
    return this.afs.collection(collectionName).valueChanges();
  }

  GetById(collectionName, field, value){
    return this.afs.collection(collectionName, ref => ref.where(field, '==', value)).valueChanges();
  }

  DeleteAll(){
    
  }

  DeleteById(){

    // const ref = this.afs.collection('Sales');
    // let documentId = ref.valueChanges({idField: 'salesId'});
    // documentId.subscribe(data => {console.log(data);})
    
    //this.afs.doc('Sales/' + documentId).delete();
  }
}
