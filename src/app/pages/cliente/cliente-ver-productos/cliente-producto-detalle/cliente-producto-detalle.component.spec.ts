import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteProductoDetalleComponent } from './cliente-producto-detalle.component';

describe('ClienteProductoDetalleComponent', () => {
  let component: ClienteProductoDetalleComponent;
  let fixture: ComponentFixture<ClienteProductoDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteProductoDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteProductoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
