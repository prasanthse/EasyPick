import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CRUDService {

  private objectCollection: AngularFirestoreCollection<any>;
  item: Observable<any[]>;

  bs: BehaviorSubject<any>;

  constructor(private readonly afs: AngularFirestore, private db: AngularFireDatabase) { }

  //Upload
  Add(collectionName, data){
    this.objectCollection = this.afs.collection<any>(collectionName);
    this.objectCollection.add(data);
  }

  //Get All
  GetAll(collectionName){
    return this.afs.collection(collectionName).valueChanges();
  }

  //Get By Id
  GetById(collectionName, field, value){
    return this.afs.collection(collectionName, ref => ref.where(field, '==', value)).valueChanges();
  }
}
