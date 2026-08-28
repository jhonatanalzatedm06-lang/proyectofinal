import { TestBed } from '@angular/core/testing';

import { ServicioPedido } from './servicio-pedido';

describe('ServicioPedido', () => {
  let service: ServicioPedido;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioPedido);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
