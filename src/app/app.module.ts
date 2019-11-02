import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './pages/user/login/login.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { Page404Component } from './pages/page404/page404.component';
import { UserService } from './services/user/user.service';
import { HeaderComponent } from './dashboard/header/header.component';
import { VendedorComponent } from './pages/vendedor/vendedor.component';
import { VendedorProductosComponent } from './pages/vendedor/vendedor-productos/vendedor-productos.component';
// tslint:disable-next-line:max-line-length
import { VendedorProductosItemComponent } from './pages/vendedor/vendedor-productos/vendedor-productos-item/vendedor-productos-item.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    Page404Component,
    HeaderComponent,
    VendedorComponent,
    VendedorProductosComponent,
    VendedorProductosItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    VendedorProductosItemComponent
  ]
})
export class AppModule { }
