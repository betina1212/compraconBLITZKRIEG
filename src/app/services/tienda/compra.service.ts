import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Compra } from 'src/app/models/compra';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  comprasCollection: AngularFirestoreCollection<Compra>;
  compraDoc: AngularFirestoreDocument<Compra>;

  constructor(
    private db: AngularFirestore
  ) {
  }

  public getComprasCliente(id: string) {

    this.comprasCollection = this.db.collection('compras', ref => ref.where('idCliente', '==', id).where('estado', '==', 'reservado'));

    return this.comprasCollection.snapshotChanges().pipe(map(actions => {
      return actions.map( a => {
        const data = a.payload.doc.data() as Compra;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  public getPedidosVendedor(id: string) {

    this.comprasCollection = this.db.collection('compras', ref => ref.where('idVendedor', '==', id).where('estado', '==', 'reservado'));

    return this.comprasCollection.snapshotChanges().pipe(map(actions => {
      return actions.map( a => {
        const data = a.payload.doc.data() as Compra;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  public addCompra(compra: Compra) {

    this.comprasCollection = this.db.collection('compras');
    this.comprasCollection.add(compra);
  }

  public updateCompra(idCompra: string, compra: Compra) {
    this.compraDoc = this.db.doc(`compras/${idCompra}`);
    this.compraDoc.update(compra);
  }
}
