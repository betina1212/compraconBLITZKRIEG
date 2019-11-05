import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Producto } from 'src/app/models/producto';
import { map, reduce } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  productoCollection: AngularFirestoreCollection<Producto>;
  productoDoc: AngularFirestoreDocument<Producto>;

  constructor(
    private db: AngularFirestore
  ) { }

  public getProductos() {

    this.productoCollection = this.db.collection('productos');
    return this.productoCollection.snapshotChanges().pipe(map(actions => {
      return actions.map( a => {
        const data = a.payload.doc.data() as Producto;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  public getProductosVendedor(idVendedor: string) {

    this.productoCollection = this.db.collection('productos', ref => ref.where('idUsuario', '==', idVendedor)
    );

    return this.productoCollection.snapshotChanges().pipe(map(actions => {
      return actions.map( a => {
        const data = a.payload.doc.data() as Producto;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  public addProducto(producto: Producto) {
    this.productoCollection.add(producto);
  }

  public updateProducto(idProducto: string, producto: Producto) {
    this.productoDoc = this.db.doc(`productos/${idProducto}`);
    this.productoDoc.update(producto);
  }
}
