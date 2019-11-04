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

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<VendedorProductosComponent>,
    @Inject ( MAT_DIALOG_DATA) public dataImport: any,
    private productoService: ProductoService
  ) { }

  ngOnInit() {

    console.log('dataImport: ', this.dataImport);

    this.formulario = this.formBuilder.group({
      producto: ['', Validators.required],
      detalle: ['', Validators.required],
      cantidad: ['', Validators.required],
      precio: ['', Validators.required]
    });
  }

  public cerrarProducto() {
    this.dialogRef.close();
  }

  public validarFormulario(form: FormGroup) {

    if ( !form.valid ) {
      swal.fire('Producto', 'Error al registrar el Producto', 'error');
    } else {
      console.log('podemos llegar hasta aqui...');

      const newProducto: Producto = {
        producto: form.controls.producto.value,
        detalle: form.controls.detalle.value,
        imagen: '',
        cantidad: form.controls.cantidad.value,
        stock: form.controls.cantidad.value,
        precio: form.controls.precio.value,
        estado: 'activo',
        idUsusario: this.dataImport.id
      };

      this.productoService.addProducto(newProducto);
      this.dialogRef.close();
    }
  }
}
