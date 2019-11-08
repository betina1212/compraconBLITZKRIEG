import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import swal from 'sweetalert2';
import { UserService } from 'src/app/services/user/user.service';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public register: FormGroup;
  private users: Usuario[];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {

    this.userService.getUsers().subscribe( usuarios => {
      this.users = usuarios;
    }, err => {
      console.log('error:', err);
    });

    this.register = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('[^@]*@[^@]*')]],
      telefono: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      reply: ['', [Validators.required]]
    });
  }

  public goToLogin() {
    this.router.navigate(['/user/login']);
  }

  onRegister(form: FormGroup): void {

    if ( !form.valid ) {
      swal.fire('Registo Usuario.', 'Error en Registro de usuario', 'error');
    } else {

      if (form.controls.password.value !== form.controls.reply.value ) {
        swal.fire('Registro Usuario', 'Los datos ingresado del Password, no son iguales', 'error');
        return;
      }

      const newUser: Usuario = {
        nombre: form.controls.name.value,
        apellido: form.controls.lastname.value,
        email: form.controls.email.value,
        telefono: form.controls.telefono.value,
        direccion: form.controls.direccion.value,
        password: form.controls.password.value,
        tipo: form.controls.tipo.value,
        estado: 'activo'
      };

      if ( this.users !== undefined) {
        if ( this.users.filter( user => user.email === newUser.email).length !== 0) {
          swal.fire('Email ya registrado.', 'Existe otro usuario con el mismo email', 'error');
          return;
        }
      }

      this.userService.addUser(newUser);
      this.router.navigate(['/user/login']);
    }
  }

}
