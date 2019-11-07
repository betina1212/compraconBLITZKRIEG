import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/user/auth.service';
import { Router } from '@angular/router';

import swal from 'sweetalert2';
import { Usuario } from 'src/app/models/usuario';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public login: FormGroup;
  private users: Usuario[];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {

    this.userService.getUsers()
      .subscribe( dataUsuarios => {
        this.users = dataUsuarios;
      }, err => console.log('error:   ', err)
    );

    this.login = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  public goToRegister() {
    this.router.navigate(['/user/register']);
  }

  onLogin(form: FormGroup) {

    if ( !form.valid ) {
      swal.fire('Login Usuario', 'Formulario no valido', 'error');
    } else {
      const usuarios = this.users.filter( user => user.email === form.controls.email.value);

      if ( usuarios.length === 0) {
        swal.fire('Email invalido', 'no existe el Usuario', 'error');
      } else {
        if ( usuarios[0].estado === 'baja') {
          swal.fire('Usuario dado de baja', 'El administrador dio de baja al usuario', 'error');
        } else {
          if ( usuarios[0].password === form.controls.password.value ) {
            this.authService.setUser(usuarios[0]);
            switch (usuarios[0].tipo) {
              case 'vendedor': {
                this.router.navigate(['/vendedor']);
                break;
              }
              case 'cliente': {
                this.router.navigate(['/cliente']);
                break;
              }
              case 'administrador': {
                this.router.navigate(['/admin']);
                break;
              }
              default: {
                this.router.navigate(['/']);
              }
            }
          } else {
            swal.fire('Password Incorrecto', 'la contraseña no corresponde al usuario', 'error');
          }
        }
      }
    }
  }
}
