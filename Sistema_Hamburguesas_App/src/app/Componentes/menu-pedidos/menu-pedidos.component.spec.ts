import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPedidosComponent } from './menu-pedidos.component';

describe('MenuPedidosComponent', () => {
  let component: MenuPedidosComponent;
  let fixture: ComponentFixture<MenuPedidosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuPedidosComponent]
    });
    fixture = TestBed.createComponent(MenuPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
