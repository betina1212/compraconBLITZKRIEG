import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/tienda/producto.service';

@Component({
  selector: 'app-cliente-ver-productos',
  templateUrl: './cliente-ver-productos.component.html',
  styleUrls: ['./cliente-ver-productos.component.css']
})
export class ClienteVerProductosComponent implements OnInit {

  public productos: Producto[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productoService: ProductoService
  ) { }

  ngOnInit() {
    this.productoService.getProductosStock()
      .subscribe( (data: Producto[]) => {
        this.productos = data;
      }, err => console.log(err));
  }


  public back() {
    this.router.navigate(['/cliente']);
  }

}
