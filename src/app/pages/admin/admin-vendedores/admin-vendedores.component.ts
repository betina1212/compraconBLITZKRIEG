import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-admin-vendedores',
  templateUrl: './admin-vendedores.component.html',
  styleUrls: ['./admin-vendedores.component.css']
})
export class AdminVendedoresComponent implements OnInit {

  public usuarios: Usuario[];

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getUsersTipo('vendedor').subscribe((clientes: Usuario[]) => {
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
