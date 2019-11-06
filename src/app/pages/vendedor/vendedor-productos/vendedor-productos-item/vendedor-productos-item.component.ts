import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { VendedorProductosComponent } from '../vendedor-productos.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import swal from 'sweetalert2';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/tienda/producto.service';

@Component({
  selector: 'app-vendedor-productos-item',
  templateUrl: './vendedor-productos-item.component.html',
  styleUrls: ['./vendedor-productos-item.component.css']
})
export class VendedorProductosItemComponent implements OnInit {

  public formulario: FormGroup;
  public titleProducto: string;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<VendedorProductosComponent>,
    @Inject ( MAT_DIALOG_DATA) public dataImport: any,
    private productoService: ProductoService
  ) { }

  ngOnInit() {

    console.log('dataImport: ', this.dataImport);

    this.formulario = this.formBuilder.group({
      producto: [this.dataImport.producto.producto, Validators.required],
      detalle: [this.dataImport.producto.detalle, Validators.required],
      cantidad: [this.dataImport.producto.cantidad, Validators.required],
      precio: [this.dataImport.producto.precio, Validators.required]
    });

    if ( !this.dataImport.producto.id ) {
      this.titleProducto = 'Nuevo Producto';
    } else {
      this.titleProducto = 'Editar Producto';
    }
  }

  public cerrarProducto() {
    this.dialogRef.close();
  }

  public validarFormulario(form: FormGroup) {

    if ( !form.valid ) {
      swal.fire('Producto', 'Error al registrar el Producto', 'error');
    } else {

      if ( !this.dataImport.producto.id ) {
        if ( this.dataImport.productos.filter( (producto: Producto) => producto.producto === form.controls.producto.value ).length !== 0 ) {
          swal.fire('Producto', 'Existe el producto repetido', 'error');
        } else {
          const newProducto: Producto = {
            producto: form.controls.producto.value,
            detalle: form.controls.detalle.value,
            imagen: '',
            cantidad: form.controls.cantidad.value,
            stock: form.controls.cantidad.value,
            precio: form.controls.precio.value,
            estado: 'activo',
            idUsuario: this.dataImport.id
          };

          this.productoService.addProducto(newProducto);
          this.dialogRef.close();
        }
      } else {
        if ( this.dataImport.productos.filter(
          (producto: Producto) => producto.id !== this.dataImport.producto.id && producto.idUsuario === this.dataImport.id).length !== 0 ) {
          swal.fire('Producto', 'Existe el producto repetido', 'error');
        } else {
          const editProducto: Producto = {
            producto: form.controls.producto.value,
            detalle: form.controls.detalle.value,
            cantidad: form.controls.cantidad.value,
            stock: form.controls.cantidad.value,
            precio: form.controls.precio.value,
            estado: 'activo',
            idUsuario: this.dataImport.id
          };

          this.productoService.updateProducto( this.dataImport.producto.id,  editProducto);
          this.dialogRef.close();
        }
      }
    }
  }
}
