import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendedorProductosItemComponent } from './vendedor-productos-item.component';

describe('VendedorProductosItemComponent', () => {
  let component: VendedorProductosItemComponent;
  let fixture: ComponentFixture<VendedorProductosItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendedorProductosItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendedorProductosItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
