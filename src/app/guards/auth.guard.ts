import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/user/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate() {
    if ( this.authService.getCurrentUser()) {
      return true;
    } else {
      this.router.navigate(['/user/login']);
      return false;
    }
  }
}
