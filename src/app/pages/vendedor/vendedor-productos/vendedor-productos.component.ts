import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { VendedorProductosItemComponent } from './vendedor-productos-item/vendedor-productos-item.component';
import { ActivatedRoute } from '@angular/router';
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
    private dialog: MatDialog,
    private productoService: ProductoService
  ) { }

  ngOnInit() {

    this.productoService.getProductos()
      .subscribe( (data: Producto[]) => {
        this.productos = data;
      }, err => console.log(err));
  }

  public addProduct() {
    console.log('addProducto');
    const dialogRef = this.dialog.open(VendedorProductosItemComponent, {
      disableClose: false,
      autoFocus: true,
      width: '80%',
      data: {
        id: this.route.snapshot.params.id,
        productos: this.productos
      }
    });

    dialogRef.afterClosed()
      .subscribe((data: any) => {
        console.log(data);
      }, err => console.log(err));
  }

}