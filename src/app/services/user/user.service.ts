import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from '../../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersCollection: AngularFirestoreCollection<Usuario>;
  userDoc: AngularFirestoreDocument<Usuario>;


  constructor(
    private db: AngularFirestore
  ) {
  }

  public getUsers() {

    this.usersCollection = this.db.collection('users');
    return this.usersCollection.snapshotChanges().pipe(map(actions => {
      return actions.map( a => {
        const data = a.payload.doc.data() as Usuario;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  public getUser(id: string ) {

    return this.db.doc(`users/${id}`).valueChanges();
  }

  public addUser(user: Usuario) {
    this.usersCollection.add(user);
  }

  public deleteUser(user: Usuario) {
    this.userDoc = this.db.doc(`users/${user.id}`);
    this.userDoc.delete();
  }
}
