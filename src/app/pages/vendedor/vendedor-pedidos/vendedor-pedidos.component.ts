import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Compra } from 'src/app/models/compra';
import { CompraService } from 'src/app/services/tienda/compra.service';
import { UserService } from 'src/app/services/user/user.service';
import { Usuario } from 'src/app/models/usuario';
import { User } from 'firebase';
import swal from 'sweetalert2';

@Component({
  selector: 'app-vendedor-pedidos',
  templateUrl: './vendedor-pedidos.component.html',
  styleUrls: ['./vendedor-pedidos.component.css']
})
export class VendedorPedidosComponent implements OnInit {

  public pedidos: Compra[];
  public usuarios: Usuario[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private compraService: CompraService,
    private userService: UserService
  ) { }

  ngOnInit() {

    this.compraService.getPedidosVendedor(this.route.snapshot.params.id)
      .subscribe( (pedidos: Compra[]) => {
        this.pedidos = pedidos;
      }, err => console.log(err));

    this.userService.getUsersTipo('cliente')
      .subscribe( (usuarios: User[]) => {
        this.usuarios = usuarios;
      }, err => console.log(err));
  }

  public back() {
    this.router.navigate(['/vendedor']);
  }

  public getCliente(id: string) {
    const usuario = this.usuarios.filter( usuario1 => usuario1.id === id)[0];
    return `${usuario.nombre} ${usuario.apellido}`;
  }

  public confirmatPedido(pedido: Compra) {

    swal.fire({
      title: 'Confirmar Pedido',
      text: `El monto total a cobrar es de ${pedido.total} Bs.-`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then( (result) => {
      if (result.value) {

        const compra: Compra = {
          estado: 'enviado'
        };

        this.compraService.addCompra(compra);
        this.compraService.updateCompra(pedido.id, compra);
        swal.fire('Confirmado la venta', 'El Pedido, se esta enviando al Cliente.', 'success');
      }
    });
  }

}
