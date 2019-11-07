import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteVerProductosComponent } from './cliente-ver-productos.component';

describe('ClienteVerProductosComponent', () => {
  let component: ClienteVerProductosComponent;
  let fixture: ComponentFixture<ClienteVerProductosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteVerProductosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteVerProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
