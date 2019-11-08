import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/user/auth.service';

@Component({
  selector: 'app-vendedor',
  templateUrl: './vendedor.component.html',
  styleUrls: ['./vendedor.component.css']
})
export class VendedorComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public viewProductos() {
    this.router.navigate(['/vendedorProductos/', this.authService.getCurrentUser().id]);
  }

  public viewPedidos() {
    this.router.navigate(['/vendedorPedidos/', this.authService.getCurrentUser().id]);
  }

}
