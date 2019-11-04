import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Producto } from 'src/app/models/producto';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  productoCollection: AngularFirestoreCollection<Producto>;

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

  public addProducto(producto: Producto) {
    this.productoCollection.add(producto);
  }
}
