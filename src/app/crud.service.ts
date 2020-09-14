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

  DeleteAll(collectionName){
    const ref = this.afs.collection(collectionName);

    let docId = ref.valueChanges({idField: 'documentId'});

    docId.subscribe(data => {
      if(data != null){
        for(let i = 0; i < data.length; i++){
          this.afs.doc(collectionName + '/' + data[i].documentId).delete();
        }
      }
    });
  }

  DeleteById(collectionName, field, value){
    let ref = this.afs.collection(collectionName, ref => ref.where(field, '==', value));

    ref.snapshotChanges().pipe(
      map(changes => {
        changes.map(a => {
         const id = a.payload.doc.id; 
         this.afs.doc(collectionName + '/' + id).delete();
       })
     })
    ).subscribe();
  }

  Update(collectionName, field, value, updatableBody){
    let obj = this.afs.collection(collectionName, ref => ref.where(field, '==', value));

    obj.snapshotChanges().pipe(
      map(changes => {
        changes.map(a => {
         const id = a.payload.doc.id; 
         this.afs.collection(collectionName).doc(id).update(updatableBody);
       })
     })
    ).subscribe();
  }
}