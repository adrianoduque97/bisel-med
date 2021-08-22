import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class FireStoreServiceService {

  constructor( public firestore: AngularFirestore) { }

  //Crea un nuevo gato
  public createUser(data:any) {
    return this.firestore.collection('users').add(data);
  }
}
