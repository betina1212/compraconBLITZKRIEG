import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompraService } from 'src/app/services/tienda/compra.service';
import { Compra } from 'src/app/models/compra';

@Component({
  selector: 'app-cliente-producto-pedidos',
  templateUrl: './cliente-producto-pedidos.component.html',
  styleUrls: ['./cliente-producto-pedidos.component.css']
})
export class ClienteProductoPedidosComponent implements OnInit {

  public compras: Compra[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private compraService: CompraService
  ) {
    this.compraService.getComprasCliente(this.route.snapshot.params.id)
      .subscribe( ( compra: Compra[]) => {
        this.compras = compra;
        console.log('compras....', this.compras);
      }, err => console.log(err));
  }

  ngOnInit() {
  }

  public back() {
    this.router.navigate(['/cliente']);
  }

}
