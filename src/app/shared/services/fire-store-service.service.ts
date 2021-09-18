import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable} from 'rxjs'
import firebase  from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FireStoreServiceService {

  constructor( public firestore: AngularFirestore) { }


  public createUser(data:any) {
    return this.firestore.collection('Usuarios').add(data);
  }
  public getUser(uid: string) {
    return this.firestore.collection('users').doc(uid);
  }

  public async updloadFile(file: Blob, fileName: string, type: string): Promise<string>{
    var metadata = {
      contentType: type,
    };
    
    var storageRef = firebase.storage().ref();
    var docRef = storageRef.child(fileName);

    return new Promise((resolve, reject) => {
      docRef.put(file, metadata).then(snapshot => {
        docRef.getDownloadURL().then(url =>{
          resolve(url);
        });
      });
    });
  }
}
