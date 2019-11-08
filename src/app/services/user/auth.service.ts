import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router
  ) { }

  setUser(user: Usuario): void {
    const userString = JSON.stringify(user);
    localStorage.setItem('currentUser', userString);
  }

  getCurrentUser() {
    const userString = localStorage.getItem('currentUser');
    if ( userString ) {
      return JSON.parse(userString);
    } else {
      return null;
    }
  }

  getCurrentUserSubscribe() {
    return localStorage.getItem('currentUser');
  }

  logoutUser() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/user/login']);
  }
}
