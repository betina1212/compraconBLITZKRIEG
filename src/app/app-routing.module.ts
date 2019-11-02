import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { Page404Component } from './pages/page404/page404.component';
import { LoginComponent } from './pages/user/login/login.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { VendedorComponent } from './pages/vendedor/vendedor.component';
import { VendedorProductosComponent } from './pages/vendedor/vendedor-productos/vendedor-productos.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/login',
    component: LoginComponent
  },
  {
    path: 'user/register',
    component: RegisterComponent
  },
  {
    path: 'vendedor',
    component: VendedorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'vendedorProductos/:id',
    component: VendedorProductosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: Page404Component,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
