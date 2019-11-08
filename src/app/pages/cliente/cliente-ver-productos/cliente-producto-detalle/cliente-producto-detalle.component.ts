import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/tienda/producto.service';
import { Producto } from 'src/app/models/producto';
import swal from 'sweetalert2';
import { CompraService } from 'src/app/services/tienda/compra.service';
import { Compra } from 'src/app/models/compra';

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
    private productoService: ProductoService,
    private compraService: CompraService
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

  public saveVenta() {
    swal.fire({
      title: 'Confirmar Compra',
      text: `El monto total a pagar es de ${this.cantidad * this.producto.precio} Bs.-`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Comprar'
    }).then( (result) => {
      if (result.value) {

        const compra: Compra = {
          producto: this.producto.producto,
          detalle: this.producto.detalle,
          imagen: this.producto.imagen,
          cantidad: this.cantidad,
          precio: this.producto.precio,
          total: this.cantidad * this.producto.precio,
          estado: 'reservado',
          idVendedor: this.producto.idUsuario,
          idCliente: this.route.snapshot.params.id
        };

        const producto: Producto = {
          stock: this.producto.stock - this.cantidad
        };

        this.productoService.updateProducto(this.route.snapshot.params.idProducto, producto);
        this.compraService.addCompra(compra);
        swal.fire('Confirmado la compra', 'El Vendedor, preparara el pedido.', 'success');
        this.back();
      }
    });
  }
}
