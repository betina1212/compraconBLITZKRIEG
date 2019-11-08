import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/tienda/producto.service';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-cliente-producto-detalle',
  templateUrl: './cliente-producto-detalle.component.html',
  styleUrls: ['./cliente-producto-detalle.component.css']
})
export class ClienteProductoDetalleComponent implements OnInit {

  public producto: Producto;
  public cantidad: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productoService: ProductoService
  ) { }

  ngOnInit() {

    this.cantidad = 0;

    this.productoService.getProducto(this.route.snapshot.params.idProducto)
      .subscribe( (p: Producto) => {
        this.producto = p;
      }, err => console.log(err));
  }

  public back() {
    this.router.navigate(['/cliente/verProducto', this.route.snapshot.params.id]);
  }

  public addCantidad(add: number) {
    this.cantidad = this.cantidad + add;
  }

}
