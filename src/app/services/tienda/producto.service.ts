import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Producto } from 'src/app/models/producto';
import { map } from 'rxjs/operators';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  productoCollection: AngularFirestoreCollection<Producto>;
  productoDoc: AngularFirestoreDocument<Producto>;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  constructor(
    private db: AngularFirestore,
    private afStorage: AngularFireStorage
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

  public getProductosStock() {

    this.productoCollection = this.db.collection('productos', ref => ref.where('stock', '>', 0)
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

  public updateProductoImagen(event: any) {

    const file = event.target.files[0];
    const id = Math.random().toString(36).substring(2);

    const path = `productos_imagen/${id}`;
    const customMetadata = { app: 'BLITZKRIEG' };

    return this.afStorage.upload(path, file, { customMetadata});

  }

  public readProductoImagen(url: string) {
    const ref = this.afStorage.ref(url);
    return ref.getDownloadURL();
  }
}
