import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { VendedorProductosItemComponent } from './vendedor-productos-item/vendedor-productos-item.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/tienda/producto.service';

@Component({
  selector: 'app-vendedor-productos',
  templateUrl: './vendedor-productos.component.html',
  styleUrls: ['./vendedor-productos.component.css']
})
export class VendedorProductosComponent implements OnInit {

  public productos: Producto[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private productoService: ProductoService
  ) { }

  ngOnInit() {

    this.productoService.getProductosVendedor(this.route.snapshot.params.id)
      .subscribe( (data: Producto[]) => {
        this.productos = data;
      }, err => console.log(err));
  }

  public back() {
    this.router.navigate(['/vendedor']);
  }

  public addProduct() {
    const dialogRef = this.dialog.open(VendedorProductosItemComponent, {
      disableClose: false,
      autoFocus: true,
      width: '80%',
      data: {
        id: this.route.snapshot.params.id,
        productos: this.productos,
        producto: [] as Producto
      }
    });

    dialogRef.afterClosed()
      .subscribe((data: any) => {
        console.log(data);
      }, err => console.log(err));
  }

  public editProduct(producto: Producto) {

    const dialogRef = this.dialog.open(VendedorProductosItemComponent, {
      disableClose: false,
      autoFocus: true,
      width: '80%',
      data: {
        id: this.route.snapshot.params.id,
        productos: this.productos,
        producto
      }
    });

    dialogRef.afterClosed()
      .subscribe((data: any) => {
        console.log(data);
      }, err => console.log(err));
  }


  public upload(producto: Producto, event: any) {

    const randomId = Math.random().toString(36).substring(2);

    this.productoService.updateProductoImagen(event).then(data => {
      this.productoService.readProductoImagen(data.metadata.fullPath).subscribe(info => {
        const editProducto: Producto = {
          imagen: info
        };

        this.productoService.updateProducto(producto.id, editProducto);
      });
    }, err => console.log(err));
  }
}
