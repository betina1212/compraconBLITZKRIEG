import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteProductoPedidosComponent } from './cliente-producto-pedidos.component';

describe('ClienteProductoPedidosComponent', () => {
  let component: ClienteProductoPedidosComponent;
  let fixture: ComponentFixture<ClienteProductoPedidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteProductoPedidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteProductoPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
