import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-admin-clientes',
  templateUrl: './admin-clientes.component.html',
  styleUrls: ['./admin-clientes.component.css']
})
export class AdminClientesComponent implements OnInit {

  public usuarios: Usuario[];

  constructor(
    private router: Router,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.userService.getUsersTipo('cliente').subscribe((clientes: Usuario[]) => {
      this.usuarios = clientes;
    }, err => console.log(err));
  }

  public back() {
    this.router.navigate(['/admin']);
  }

  public getEstadoActivo(usuario: Usuario) {
    if ( usuario.estado === 'activo') {
      return true;
    }
    return false;
  }

  public onChange(usuario: Usuario, valor: any) {
    let nuevoEstado = 'activo';
    if ( !valor.checked ) {
      nuevoEstado = 'baja';
    }

    this.userService.updateUser(usuario.id, {
      estado: nuevoEstado
    });
  }

}
