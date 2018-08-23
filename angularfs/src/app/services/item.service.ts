import {Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import {Observable} from 'rxjs/Observable';
import {Item} from '../models/Item';
import {map} from 'rxjs/operators';

@Injectable()
  //providedIn: 'root'
//})
export class ItemService {
  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  itemDoc:AngularFirestoreDocument<Item>;

  constructor(public afs: AngularFirestore) {
     //this.items = this.afs.collection('items').valueChanges();
    this.itemsCollection = this.afs.collection('items', ref => ref.orderBy('title', 'desc'));

      //, ref => ref.orderBy('title', 'desc'));

     this.items = this.itemsCollection.snapshotChanges().pipe(
      map(changes => changes.map(a => {
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc.id;
        return {id, ...data};
      })))﻿
  }

  getItems(){
    return this.items;
  }

  addItem(item:Item){
    this.itemsCollection.add(item);

  }

  deleteItem(item:Item){
    this.itemDoc = this.afs.doc(`items/${item.id}`);
    this.itemDoc.delete();

  }
}
